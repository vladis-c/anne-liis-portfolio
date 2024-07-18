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
