let Component, Target;

export const render = (data, componentFunction, targetElementID) => {
  if (componentFunction) Component = componentFunction;
  if (targetElementID) Target = targetElementID;
  if (!data) {
    document.querySelector(Target).innerHTML = `${Component()}`;
  } else {
    document.querySelector(Target).innerHTML = `${Component(data)}`;
  }
};
