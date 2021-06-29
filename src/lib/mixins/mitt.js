import mitt from 'mitt';

const emitter = mitt();
// 代替 $on 方法
export const onEvent = (eventName, eventMethod) => {
  // listen to an event
  emitter.on(eventName, eventMethod);
};

export const emitEvent = (eventName, eventParams) => {
  // use to an event
  emitter.emit(eventName, eventParams);
};
