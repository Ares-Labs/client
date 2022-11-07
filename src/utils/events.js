import EventBus from "vertx3-eventbus-client";

const CHNL_TO_SERVER = "events.to.martians";
const EVENTBUS_PATH = "http://localhost:8080/events";

class Gateway {
  #eb;
  #subscribers;

  constructor() {
    this.#eb = new EventBus(EVENTBUS_PATH);
    this.#subscribers = {};

    this.#eb.onopen = () => {
      // TODO: Bind to individual event for user.
      this.#registerHandler(CHNL_TO_SERVER, this.#onMessage);
    };
  }

  send(event, data) {
    this.#eb.send(CHNL_TO_SERVER, JSON.stringify({ event, data }));
  }

  #registerHandler(chanel, callback) {
    const bound_callback = callback.bind(this);
    this.#eb.registerHandler(chanel, bound_callback);
  }

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

  #invokeSubscriptions(event, data) {
    this.#subscribers[event]?.forEach((callback) => callback(data));
  }

  /// Adds an event listener if it doesn't exist yet.
  #addEvent(event) {
    if (this.#subscribers[event] === undefined) {
      this.#subscribers[event] = [];
      this.send("subscribe", event);
    }
  }

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
