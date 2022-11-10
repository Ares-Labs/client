import EventBus from "vertx3-eventbus-client";
import { v4 as uuid } from "uuid";

const INBOUND_CHNL = "events.to.martians";
const OUTBOUND_CHNL = "events.from.martians";
const EVENTBUS_PATH = "http://localhost:8080/events";

const EVENTS_PREFIX = "events";
const QUERIES_PREFIX = "queries";

/**
 * @typedef {Object} Events
 * @property {string} ALL
 *
 * @typedef {Object} Queries
 * @property {string} ADD_PROPERTY
 * @property {string} REMOVE_PROPERTY
 * @property {string} GET_PROPERTY
 * @property {string} GET_ALLOWED_USERS
 *
 * @typedef {Object} EventBusMessage
 * @property {string} type
 * @property {string} address
 * @property {Object} body
 */

/**
 * All subscribable events.
 *
 * @type {Events}
 */
const EVENT_TYPE = {
  ALL: `${EVENTS_PREFIX}.all`,
};

/**
 * All queryable events.
 *
 * @type {Queries}
 */
const QUERY_TYPE = {
  ADD_PROPERTY: `${QUERIES_PREFIX}.add-property`,
  REMOVE_PROPERTY: `${QUERIES_PREFIX}.remove-property`,
  GET_PROPERTY: `${QUERIES_PREFIX}.get-property`,
  GET_ALLOWED_USERS: `${QUERIES_PREFIX}.get-allowed-users`,
};

/**
 * Handle the WebSocket connection to the event bus.
 * This is a singleton class, which should be used in each component that requires some data from the server.
 * At **NO POINT** should this be passed as a property/argument.
 *
 * Requires initialization through the `init` method.
 *
 * ## Example
 * ```js
 * import Gateway from "./utils/events";
 *
 * Gateway.init("my-id");
 * Gateway.subscribe("my-event", (data) => {
 *   console.log(data);
 * });
 * ```
 */
class Gateway {
  /** @type {EventBus.EventBus} */
  #eb;

  /** @type {{[key: string]: array<function(object): void>}}*/
  #subscribers;

  /** @type {{[key: string]: array<function(object): void>}}*/
  #requestIdentifiers;

  /** @type {string} */
  #id;

  /** @type {string} */
  #inbound;

  /** @type {string} */
  #outbound;

  /** @type {boolean} */
  #isConnectionOpen = false;

  /** @type {boolean} */
  #isInitialized = false;

  /** @type {string} */
  #url;

  /** @type {Events} */
  #events = EVENT_TYPE;

  /** @type {Queries} */
  #queries = QUERY_TYPE;

  /** @type {array<function>} */
  #onReadyEvents = [];

  /** @type {boolean} */
  #connIsReady = false;

  /**
   * Create a new gateway for a vert.x event bus.
   *
   * @param {string} url The URL of the event bus.
   */
  constructor(url) {
    this.#isInitialized = false;
    this.#url = url;
  }

  /**
   * Define the id of the user that is currently "signed in".
   *
   * @param {string} id The ID of the user
   * @returns {void}
   */
  init(id) {
    if (this.#isInitialized) {
      throw new Error("Gateway is already initialized");
    }

    this.#id = id;
    this.#isInitialized = true;
    this.#eb = new EventBus(this.#url);
    this.#subscribers = {};
    this.#requestIdentifiers = {};
    this.#inbound = `${INBOUND_CHNL}.${this.#id}`;
    this.#outbound = `${OUTBOUND_CHNL}.${this.#id}`;

    this.#eb.onopen = () => {
      this.#isConnectionOpen = true;
      this.#registerHandler(this.#inbound, this.#onMessage);

      this.#executeQuery(OUTBOUND_CHNL, "session", { id: this.#id }).then(
        (data) => {
          console.log(data);
          Object.keys(this.#subscribers)
            .filter((event) => event !== this.allEvents)
            .forEach((event) => this.send("subscribe", { id: event }));

          this.#connIsReady = true;
          this.#onReadyEvents.forEach((event) => event());
        }
      );
    };
  }

  /**
   * Get whether the Gateway has been initialized.
   *
   * @returns {boolean} Whether the Gateway has been initialized.
   */
  get isInitialized() {
    return this.#isInitialized;
  }

  /**
   * The event for all events. This means that this gets triggered for every event the client has registered. Can be used for logging purposes.
   *
   * ## Example
   * ```js
   * import Gateway from "./utils/events";
   *
   * Gateway.init("my-id");
   * Gateway.subscribe(Gateway.allEvents, (data) => {
   *  console.log(data);
   * });
   * ```
   *
   * @returns {string} The event for all events.
   */
  get allEvents() {
    return this.#events.ALL;
  }

  /**
   * All events that have been reserved. Every subscription must be one of these events.
   *
   * @returns {Events} All events that have been reserved.
   */
  get events() {
    return this.#events;
  }

  /**
   * All available query types. Every executed query must be one of these.
   *
   * @returns {Queries} All available query types.
   */
  get queries() {
    return this.#queries;
  }

  /**
   * Simple method to ensure that the gateway is initialized before any other method is called.
   *
   * @returns {void}
   */
  #requiresInitialization() {
    if (!this.#isInitialized) {
      throw new Error("Gateway is not initialized");
    }
  }

  /**
   * Check if a connection has been established.
   *
   * @returns {void}
   */
  #requiresConnection() {
    this.#requiresInitialization();

    if (!this.#isConnectionOpen) {
      throw new Error("Gateway is not connected");
    }
  }

  /**
   * Send a message to the server in the appropriate format on a specific channel.
   *
   * @param {string} channel The channel to send the message over.
   * @param {string} type The type of the message.
   * @param {Object} data The data that the server should process
   * @returns {void}
   */
  #sendPayload(channel, type, data) {
    this.#requiresConnection();
    this.#eb.send(channel, JSON.stringify({ type, data }));
  }

  /**
   * Send a message to the server in the appropriate format.
   * These messages are sent in the private channel.
   *
   * @param {string} type The type of the message.
   * @param {Object} data The data that the server should process
   * @returns {void}
   */
  send(type, data) {
    this.#sendPayload(this.#outbound, type, data);
  }

  /**
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} channel The vert.x event channel to subscribe to
   * @param {function(string, EventBusMessage): void} callback The callback to call when a message has been received on that channel
   * @returns {void}
   */
  #registerHandler(channel, callback) {
    this.#requiresInitialization();
    const bound_callback = callback.bind(this);
    this.#eb.registerHandler(channel, bound_callback);
  }

  /**
   * Event triggered when a message is received from the server.
   * This invokes all registered subscriptions.
   *
   * @param {string} error The error message, if any.
   * @param {EventBusMessage} message The message received from the server
   * @returns {void}
   */
  #onMessage(error, message) {
    if (error) {
      // TODO: return error
      return;
    }

    const { type, data } = message.body;

    if (type === undefined || data === undefined) {
      // Invalid event
      return;
    }

    if (type === "error") {
      // Event returned error.
      // TODO: Make error visible for frontend
      console.error(data.message);
      return;
    }

    const id = data.requestIdentifier;
    const hasExistingRequestIdentifier = id && id in this.#requestIdentifiers;

    if (hasExistingRequestIdentifier) {
      delete data.requestIdentifier;
      this.#requestIdentifiers[id](data);
      delete this.#requestIdentifiers[id];
      return;
    }

    this.#invokeSubscriptions(this.allEvents, data);
    this.#invokeSubscriptions(type, data);
  }

  /**
   * Invoke all subscriptions for a particular event.
   *
   * @param {string} event The event to invoke subscriptions for
   * @param {object} data The data to pass to the subscription callbacks
   * @returns {void}
   */
  #invokeSubscriptions(event, data) {
    this.#subscribers[event]?.forEach((callback) => callback(data));
  }

  /**
   * Initializes the array in the subscribers object if none exists yet.
   *
   * @param {string} event The event to add.
   * @returns {void}
   */
  #addEvent(event) {
    this.#requiresInitialization();

    if (this.#subscribers[event] === undefined) {
      this.#subscribers[event] = [];

      if (event !== this.allEvents) {
        this.send("subscribe", { id: event });
      }
    }
  }

  /**
   * Subscribe to a particular message with a type. The callback will be called every time when a match is received.
   *
   * @param {string} type The message type to subscribe to
   * @param {function(object): void} callback The callback to call when a message with the specified type is received
   * @returns {void}
   */
  #subscribeToMessage(type, callback) {
    this.#requiresInitialization();
    const event_subscribers = this.#subscribers[type];

    // Create new event if it doesn't exist
    if (event_subscribers === undefined) {
      this.#addEvent(type);
      this.#subscribeToMessage(type, callback);
      return;
    }

    event_subscribers.push(callback);
  }

  /**
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} event The event to subscribe to
   * @param {function(object): void} callback The callback to call when the event is received
   * @returns {void}
   */
  subscribe(event, callback) {
    if (!Object.values(this.events).includes(event)) {
      throw new Error(`Event '${event}' is not a valid event`);
    }

    this.#subscribeToMessage(event, callback);
  }

  /**
   * Execute a query and wait for its response.
   *
   * @param {string} channel The channel to send the query over.
   * @param {string} query The query to execute.
   * @param {Object} data The data to send with the query.
   *
   * @template T
   * @returns {Promise<T>} The response from the server.
   */
  #executeQuery(channel, query, data) {
    if (data.requestIdentifier === undefined) {
      data.requestIdentifier = uuid();
    }

    return new Promise((resolve, reject) => {
      try {
        this.#sendPayload(channel, query, data);
        this.#requestIdentifiers[data.requestIdentifier] = resolve;
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Execute a query and wait for its response, the query must be a valid `Queries` type.
   * Sends the query over the session channel.
   *
   * ## Example
   * ```js
   * import Gateway from "./utils/events";
   *
   * Gateway.execute('my-query', { data: 'to send' }).then((res) => {
   *  console.log(res);
   * });
   * ```
   *
   * @param {String} query The query to execute.
   * @param {Object} data The data to send with the query.
   *
   * @template T
   * @returns {Promise<T>} The response from the server.
   */
  execute(query, data) {
    if (!Object.values(this.queries).includes(query)) {
      throw new Error(`Query '${query}' is not a valid query`);
    }

    return this.#executeQuery(this.#outbound, query, data);
  }

  /**
   * Add a callback to the callbacks that should be executed when the connection is opened.
   *
   * ## Example
   * ```js
   * import Gateway from "./utils/events";
   *
   * Gateway.onReady(() => {
   *  console.log("Gateway is ready!");
   * });
   * ```
   *
   * @param {function(): void} callback The callback to execute when the connection is opened.
   * @returns {void}
   */
  onReady(callback) {
    if (this.#connIsReady) {
      callback();
      return;
    }

    this.#onReadyEvents.push(callback);
  }
}

export default new Gateway(EVENTBUS_PATH);
