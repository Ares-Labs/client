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
  /** @type {EventBus} */
  #eb;

  /** @type {{[key: string]: array<string>}}*/
  #subscribers;

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
   */
  init(id) {
    if (this.#isInitialized) {
      throw new Error("Gateway is already initialized");
    }

    this.#id = id;
    this.#isInitialized = true;
    this.#eb = new EventBus(this.#url);
    this.#subscribers = {};
    // this.#inbound = `${OUTBOUND_CHNL}.${this.#id}`;
    // this.#outbound = `${INBOUND_CHNL}.${this.#id}`;
    this.#inbound = `${INBOUND_CHNL}`;
    this.#outbound = `${OUTBOUND_CHNL}`;

    this.#eb.onopen = () => {
      this.#isConnectionOpen = true;

      this.#sendPayload(OUTBOUND_CHNL, "session", this.#id);
      this.#registerHandler(this.#inbound, this.#onMessage);

      Object.keys(this.#subscribers)
        .filter((event) => event !== this.allEvents)
        .forEach((event) => this.send("subscribe", event));
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
   */
  #requiresInitialization() {
    if (!this.#isInitialized) {
      throw new Error("Gateway is not initialized");
    }
  }

  /**
   * Check if a connection has been established.
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
   */
  send(type, data) {
    this.#sendPayload(this.#outbound, type, data);
  }

  /**
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} channel The vert.x event channel to subscribe to
   * @param {function(string, EventBusMessage): void} callback The callback to call when a message has been received on that channel
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

    this.#invokeSubscriptions(this.ALL_EVENTS, data);
    this.#invokeSubscriptions(type, data);
  }

  /**
   * Invoke all subscriptions for a particular event.
   *
   * @param {string} event The event to invoke subscriptions for
   * @param {object} data The data to pass to the subscription callbacks
   */
  #invokeSubscriptions(event, data) {
    this.#subscribers[event]?.forEach((callback) => callback(data));
  }

  /**
   * Adds an event listener if it doesn't exist yet. Also initializes the array in the subscribers object.
   *
   * @param {string} event The event to add.
   */
  #addEvent(event) {
    if (this.#subscribers[event] === undefined) {
      this.#subscribers[event] = [];

      if (
        this.#isInitialized &&
        this.#isConnectionOpen &&
        event !== this.allEvents
      ) {
        this.send("subscribe", event);
      }
    }
  }

  /**
   * Subscribe to a particular message with a type. The callback will be called every time when a match is received.
   *
   * @param {string} type The message type to subscribe to
   * @param {function(object): void} callback The callback to call when a message with the specified type is received
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
   */
  subscribe(event, callback) {
    if (!Object.values(this.events).includes(event)) {
      throw new Error(`Event '${event}' is not a valid event`);
    }

    this.#subscribeToMessage(event, callback);
  }

  /**
   * Execute a query and wait for its response, the query must be a valid `Queries` type.
   *
   * @param {Queries} query The query to execute.
   * @param {Object} data The data to send with the query.
   *
   * @template T
   * @returns {Promise<T>} The response from the server.
   */
  execute(query, data) {
    if (!Object.values(this.queries).includes(query)) {
      throw new Error(`Query '${query}' is not a valid query`);
    }

    if (data.id === undefined) {
      data.id = uuid();
    }

    return new Promise((resolve, reject) => {
      try {
        this.send(query, data);
        this.#subscribeToMessage(query, (res) => {
          // If the passed response is null, then we are requesting what id this callback is waiting for.
          // This is used to identify the callback that should be removed when a response is received.
          if (res === null) {
            return data.id;
          }

          if (res.id === data.id) {
            // Remove any callback that is waiting for a response in our query with the same ID.
            this.#subscribers[query] = this.#subscribers[query].filter(
              (cb) => cb(null) != data.id
            );

            // If no other callbacks are waiting for a response from the same query type remove the key from the object.
            if (this.#subscribers[query].length === 0) {
              delete this.#subscribers[query];
            }

            resolve(res);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default new Gateway(EVENTBUS_PATH);
