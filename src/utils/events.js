import EventBus from "vertx3-eventbus-client";
import { v4 as uuid } from "uuid";

const CHNL_TO_SERVER = "events.to.martians";
const EVENTBUS_PATH = "http://localhost:8080/events";

/**
 * Handle the WebSocket connection to the event bus.
 * This is a singleton class, which should be used in each component that requires some data from the server.
 * At **NO POINT** should this be passed as a property/argument.
 *
 * ## Example
 * ```js
 * import Gateway from "./utils/events";
 *
 * Gateway.subscribe("my-event", (data) => {
 *   console.log(data);
 * });
 * ```
 */
class Gateway {
  #eb;
  #subscribers;
  #id;
  #channel;

  constructor() {
    this.#eb = new EventBus(EVENTBUS_PATH);
    this.#subscribers = {};
    this.#id = uuid();
    this.#channel = `${CHNL_TO_SERVER}.${this.#id}`;

    this.#eb.onopen = () => {
      this.#registerHandler(this.#channel, this.#onMessage);
    };
  }

  /**
   * Send a message to the server in the appropriate format.
   *
   * @param {string} event The event that the server should identify the message with
   * @param {Object} data The data that the server should process
   */
  send(event, data) {
    this.#eb.send(CHNL_TO_SERVER, JSON.stringify({ event, data }));
  }

  /**
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} event The event to subscribe to
   * @param {function(string, string): void} callback The callback to call when the event is received
   */
  #registerHandler(chanel, callback) {
    const bound_callback = callback.bind(this);
    this.#eb.registerHandler(chanel, bound_callback);
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

    this.#invokeSubscriptions("all", data);
    this.#invokeSubscriptions(event, data);
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
      this.send("subscribe", event);
    }
  }

  /**
   * Subscribe to a particular event. The callback will be called when the event is received.
   *
   * @param {string} event The event to subscribe to
   * @param {function(object): void} callback The callback to call when the event is received
   */
  subscribe(event, callback) {
    const event_subscribers = this.#subscribers[event];

    // Create new event if it doesn't exist
    if (event_subscribers === undefined) {
      this.#addEvent(event);
      return this.subscribe(event, callback);
    }

    event_subscribers.push(callback);
  }
}

export default new Gateway();
