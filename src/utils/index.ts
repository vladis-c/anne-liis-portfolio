export const checkRendering = (message: string = '') => {
  if (process.browser) {
    console.log('client ' + message);
  } else {
    console.log('SSR ' + message);
  }

  // if (typeof window == 'undefined') {
  //   console.log('SSR');
  // } else {
  //   console.log('Client');
  // }
};

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  props: K[],
): Pick<T, Exclude<keyof T, K>> => {
  const result = {...obj};
  props.forEach(prop => {
    delete result[prop];
  });
  return result;
};
