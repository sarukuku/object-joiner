[![](https://img.shields.io/npm/v/object-joiner.svg?style=flat)](https://www.npmjs.com/package/object-joiner) [![](https://img.shields.io/npm/dt/object-joiner.svg?style=flat)](https://www.npmjs.com/package/object-joiner)

# object-joiner

A tiny utility that merges JavaScript objects by bundling clashing property values to arrays instead of overwriting them. Variable number of objects can be passed as arguments.

**Other details**
- Clashing arrays are merged and order of array items preserved
- In objects when a cyclic reference is found it's replaced with a string containing `[Cyclic]`

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save object-joiner
```

## Usage

```js
const joinObjects = require('object-joiner')

const x = {
  a: "a",
  b: {
    a: "a"
  }
}

const y = {
  b: {
    a: "b"
  },
  c: "c"
}

const result = joinObjects(x, y)

/*
> console.log(result)
> {
    a: "a",
    b: {
      a: ["a", "b"]
    },
    c: "c"
  }
* /
```
(see the [`index.test.js`](https://github.com/sarukuku/object-joiner/blob/master/index.test.js) file for more examples)