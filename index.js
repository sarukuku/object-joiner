/**
 * Check if a passed variable is an object.
 * @param {*} x - Anything you want to check.
 */
const isObject = x => typeof x === "object" && x !== null;

/**
 * Writes a given value to a given object to a given path in that object.
 * The path is an array of strings that represent the object keys. Deepest
 * key last. If the path exists and has a value set then the value is turned
 * into an array and the new values pushed to that array.
 * @param {array} path - An array of strings that describe the property path.
 * @param {*} value - Set to the value of the path in the passed object.
 * @param {object} object - The target object where to write the value.
 */
function addPropertyToObject(path, value, object) {
  const lastName = arguments.length === 3 ? path.pop() : false;

  for (let i = 0; i < path.length; i++) {
    object = object[path[i]] = object[path[i]] || {};
  }

  if (lastName) {
    if (typeof object[lastName] === "undefined") {
      object = object[lastName] = value;
    } else {
      if (Array.isArray(object[lastName])) {
        object = object[lastName].push(value);
      } else {
        object = object[lastName] = [object[lastName], value];
      }
    }
  }

  return object;
}

/**
 * Recurses over object values and calls a passed callback function
 * for each leaf node in the object with current pat, value and
 * additional arguments.
 * @param {object} object - The object to be recursed over.
 * @param {function} callback - A function that's called for each leaf node with path array, node value and callbackArgs.
 * @param {array} callbackArgs - An array of additional arguments passed to the callback.
 */
const recurseOverObjectValues = (object, callback, callbackArgs = []) => {
  const path = [];

  const recurse = o => {
    for (let key in o) {
      path.push(key);
      if (isObject(o[key])) {
        recurse(o[key]);
      } else {
        callback([...path], o[key], ...callbackArgs);
      }
      path.pop();
    }
  };

  recurse(object);
};

/**
 * Merges an array of objects to a single object. Values for
 * clashing paths are bundeled to arrays in order of appearance.
 * @param {array} objectArray - An array of objects to be merged.
 */
export default mergeObjects = (objectArray = []) => {
  const result = {};
  objectArray.forEach(object => {
    recurseOverObjectValues(object, addPropertyToObject, [result]);
  });
  return result;
};
