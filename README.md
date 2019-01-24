# object-joiner

A tiny utility that merges JavaScript objects and bundles clashing property values to an array instead of overwriting them.

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

const result = joinObjects([x, y])

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