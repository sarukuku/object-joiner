var get = require("lodash.get");

/**
 * Check if a passed variable is an object.
 * @param {*} x - Anything you want to check.
 */
const isObject = x => typeof x === "object" && x !== null;

/**
 * Check if variable is undefined.
 * @param {*} x - Anything you want to check.
 */
const isUndefined = x => typeof x === "undefined";

/**
 * Merges two objects to a single object. Values for clashing
 * paths are bundeled to arrays in order of appearance.
 * @param {object} a - A base object.
 * @param {object} b - An object to merge with the base object.
 */
const joinObjects = (a, b) => {
  const path = [];

  const recursivelyJoinObjects = (a, b) => {
    const base = JSON.parse(JSON.stringify(a));
    const toMerge = JSON.parse(JSON.stringify(b));
    const localPath = [];

    for (let key in toMerge) {
      path.push(key);
      localPath.push(key);

      const currentValue = get(base, localPath);
      const newValue = toMerge[key];

      if (isUndefined(currentValue)) {
        base[key] = newValue;
      } else {
        if (isObject(currentValue) && isObject(newValue)) {
          base[key] = recursivelyJoinObjects(currentValue, newValue);
        } else {
          if (isUndefined(currentValue) && isUndefined(newValue)) {
            base[key] = undefined;
          } else if (isUndefined(currentValue && !isUndefined(newValue))) {
            base[key] = newValue;
          } else if (!isUndefined(currentValue) && isUndefined(newValue)) {
            base[key] = currentValue;
          } else {
            base[key] = [currentValue, newValue];
          }
        }
      }

      localPath.pop();
      path.pop();
    }

    return base;
  };
};

/**
 * Merges all passed objects to a single object. Values for
 * clashing paths are bundeled to arrays in order of appearance.
 * @param {object} objectArray - All objects to be merged as arguments.
 */
module.exports = (...objectArray) => {
  if (objectArray.length === 0)
    throw new Error(
      "You'll need to provide at least two object to merge them."
    );
  if (objectArray.length === 1) return objectArray[0];
  const result = objectArray.shift();
  objectArray.forEach(object => {
    joinObjects(result, object);
  });
  return result;
};
