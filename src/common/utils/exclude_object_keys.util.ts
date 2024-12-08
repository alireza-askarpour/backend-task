import { copyObject } from './copy-object.util';

export const excludeObjectKeys = <TObj extends Record<string, any>>(object: TObj, ...keys: (keyof TObj)[]) => {
  const temp = copyObject(object);
  const objectEntries = Object.entries(temp).filter(([key]) => !keys.includes(key as keyof TObj));
  return Object.fromEntries(objectEntries) as TObj;
};
