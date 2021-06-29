let eventHelper;
class EventHelper {
  constructor() {
    /**
     * listener has表
     * {
     *  instance: {
     *              eventName: [...handlers]
     *            }
     * }
     */
    this._listener = new Map();
  }

  addListener(instance, eventName, handler, context) {
    if (!window.AMap.event) { throw new Error('please wait for Map API load'); }
    const listener = window.AMap.event.addListener(instance, eventName, handler, context);
    if (!this._listener.get(instance)) { this._listener.set(instance, {}); }
    const listenerMap = this._listener.get(instance);
    if (!listenerMap[eventName]) { listenerMap[eventName] = []; }
    listenerMap[eventName].push(listener);
  }

  removeListener(instance, eventName, handler) {
    if (!window.AMap.event) { throw new Error('please wait for Map API load'); }
    if (!this._listener.get(instance) || !this._listener.get(instance)[eventName]) { return; }
    const listenerArr = this._listener.get(instance)[eventName];
    if (handler) {
      const l_index = listenerArr.indexOf(handler);
      window.AMap.event.removeListener(listenerArr[l_index]);
      listenerArr.splice(l_index, 1);
    }
    else {
      listenerArr.forEach((listener) => {
        window.AMap.event.removeListener(listener);
      });
      this._listener.get(instance)[eventName] = [];
    }
  }

  addListenerOnce(instance, eventName, handler, context) {
    return window.AMap.event.addListenerOnce(instance, eventName, handler, context);
  }

  trigger(instance, eventName, args) {
    return window.AMap.event.trigger(instance, eventName, args);
  }

  clearListeners(instance) {
    const listeners = this._listener.get(instance);
    if (!listeners) { return; }
    Object.keys(listeners).map((eventName) => {
      this.removeListener(instance, eventName);
    });
  }
}

eventHelper = eventHelper || new EventHelper();

export default eventHelper;
