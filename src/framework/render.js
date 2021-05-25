let Component, Target;

export const render = (componentFunction, targetElementID) => {
  if (componentFunction) Component = componentFunction;
  if (targetElementID) Target = targetElementID;
  // console.log('Target', Target);
  // console.log('Component', Component);
  // console.log(document.getElementById(Target));
  document.getElementById(Target).innerHTML = '';
  document.getElementById(Target).appendChild(Component());
};
