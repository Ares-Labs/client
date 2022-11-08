import EventBus from "vertx3-eventbus-client";

const OUTBOUND_CHNL = "events.to.martians";
const INBOUND_CHNL = "events.from.martians";
const EVENTBUS_PATH = "http://localhost:8080/events";

/**
 * @typedef {Object} Events
 * @property {string} ALL
 */

/**
 * All subscribable events.
 *
 * @type {Events}
 */
const EventType = {
  ALL: "events.all",
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
  #is_connection_open = false;
  #is_initialized = false;
  #url;
  #events = EventType;

  /**
   * Create a new gateway for a vert.x event bus.
   *
   * @param {string} url The URL of the event bus.
   */
  constructor(url) {
    this.#is_initialized = false;
    this.#url = url;
  }

  /**
   * Define the id of the user that is currently "signed in".
   *
   * @param {string} id The ID of the user
   */
  init(id) {
    if (this.#is_initialized) {
      throw new Error("Gateway is already initialized");
    }

    this.#id = id;
    this.#is_initialized = true;
    this.#eb = new EventBus(this.#url);
    this.#subscribers = {};
    this.#inbound = `${OUTBOUND_CHNL}.${this.#id}`;
    this.#outbound = `${INBOUND_CHNL}.${this.#id}`;

    this.#eb.onopen = () => {
      this.#registerHandler(this.#inbound, this.#onMessage);
      this.#is_connection_open = true;

      Object.keys(this.#subscribers)
        .filter((event) => event !== this.ALL_EVENTS)
        .forEach((event) => this.send("subscribe", event));
    };
  }

  /**
   * Get whether the Gateway has been initialized.
   *
   * @returns {boolean} Whether the Gateway has been initialized.
   */
  get is_initialized() {
    return this.#is_initialized;
  }

  /**
   * The event for all events. This means that this gets triggered for every event the client has registered. Can be used for logging purposes.
   *
   * ## Example
   * ```js
   * import Gateway from "./utils/events";
   *
   * Gateway.init("my-id");
   * Gateway.subscribe(Gateway.ALL_EVENTS, (data) => {
   *  console.log(data);
   * });
   * ```
   *
   * @returns {string} The event for all events.
   */
  get ALL_EVENTS() {
    return this.#events.ALL;
  }

  /**
   * All events that have been reserved. Every subscription must be one of these events.
   *
   * @returns {Events} All events that have been reserved.
   */
  get EVENTS() {
    return this.#events;
  }

  /**
   * Simple method to ensure that the gateway is initialized before any other method is called.
   */
  #requiresInitialization() {
    if (!this.#is_initialized) {
      throw new Error("Gateway is not initialized");
    }
  }

  /**
   * Send a message to the server in the appropriate format.
   *
   * @param {string} event The event that the server should identify the message with
   * @param {Object} data The data that the server should process
   */
  send(event, data) {
    this.#requiresInitialization();
    this.#eb.send(this.#outbound, JSON.stringify({ event, data }));
  }

  /**
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} channel The vert.x event channel to subscribe to
   * @param {function(string, string): void} callback The callback to call when a message has been received on that channel
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
   * @param {string} message The message received from the server
   */
  #onMessage(error, message) {
    if (error) {
      // TODO: return error
      return;
    }

    const { event, data } = message.body;

    if (event === undefined || data === undefined) {
      // Invalid event
      return;
    }

    this.#invokeSubscriptions(this.ALL_EVENTS, data);
    this.#invokeSubscriptions(event, data);
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
    if (!this.EVENTS[event]) {
      throw new Error(`Event '${event}' is not a valid event`);
    }

    if (this.#subscribers[event] === undefined) {
      this.#subscribers[event] = [];

      if (
        this.#is_initialized &&
        this.#is_connection_open &&
        event !== this.ALL_EVENTS
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
      return this.subscribe(event, callback);
    }

    event_subscribers.push(callback);
  }
}

export default new Gateway(EVENTBUS_PATH);
