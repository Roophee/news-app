let Component, Target;

export const render = (data, componentFunction, targetElementID) => {
  if (componentFunction) Component = componentFunction;
  if (targetElementID) Target = targetElementID;
  document.querySelector(Target).innerHTML = `${Component()}`;
};
