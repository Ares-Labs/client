import EventBus from "vertx3-eventbus-client";

const INBOUND_CHNL = "events.to.martians";
const OUTBOUND_CHNL = "events.from.martians";
const EVENTBUS_PATH = "http://localhost:8080/events";

const EVENTS_PREFIX = "events";

/**
 * @typedef {Object} Events
 * @property {string} ALL
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
const EventType = {
  ALL: `${EVENTS_PREFIX}.all`,
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
  #eb;
  #subscribers;
  #id;
  #inbound;
  #outbound;
  #isConnectionOpen = false;
  #isInitialized = false;
  #url;
  #events = EventType;

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
    this.#inbound = `${OUTBOUND_CHNL}.${this.#id}`;
    this.#outbound = `${INBOUND_CHNL}.${this.#id}`;

    this.#eb.onopen = () => {
      this.#registerHandler(INBOUND_CHNL, this.#onMessage);
      this.#isConnectionOpen = true;

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
   * Simple method to ensure that the gateway is initialized before any other method is called.
   */
  #requiresInitialization() {
    if (!this.#isInitialized) {
      throw new Error("Gateway is not initialized");
    }
  }

  /**
   * Send a message to the server in the appropriate format.
   *
   * @param {string} type The type of the message.
   * @param {Object} data The data that the server should process
   */
  send(type, data) {
    this.#requiresInitialization();
    this.#eb.send(this.#outbound, JSON.stringify({ type, data }));
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

    if (message.startsWith(EVENTS_PREFIX)) {
      this.#invokeSubscriptions(this.ALL_EVENTS, data);
      this.#invokeSubscriptions(type, data);
    }
  }

  /**
   * Invoke all subscriptions for a particular event.
   *
   * @param {string} event The event to invoke subscriptions for
   * @param {object} data The data to pass to the subscription callbacks
   */
  #invokeSubscriptions(event, data) {
    this.#requiresInitialization();
    this.#subscribers[event]?.forEach((callback) => callback(data));
  }

  /**
   * Adds an event listener if it doesn't exist yet. Also initializes the array in the subscribers object.
   *
   * @param {string} event The event to add.
   */
  #addEvent(event) {
    if (!this.events[event]) {
      throw new Error(`Event '${event}' is not a valid event`);
    }

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
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} event The event to subscribe to
   * @param {function(object): void} callback The callback to call when the event is received
   */
  subscribe(event, callback) {
    this.#requiresInitialization();
    const event_subscribers = this.#subscribers[event];

    // Create new event if it doesn't exist
    if (event_subscribers === undefined) {
      this.#addEvent(event);
      this.subscribe(event, callback);
      return;
    }

    event_subscribers.push(callback);
  }
}

export default new Gateway(EVENTBUS_PATH);
