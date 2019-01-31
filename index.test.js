const joinObjects = require("./index");

test("merges conflicting keys to an array", () => {
  expect(
    joinObjects(
      {
        a: "a",
        b: {
          a: "a"
        },
        c: {
          a: {
            a: "a"
          }
        }
      },
      {
        a: "b",
        b: {
          a: "b"
        },
        c: {
          a: {
            a: "b"
          }
        }
      }
    )
  ).toEqual({
    a: ["a", "b"],
    b: {
      a: ["a", "b"]
    },
    c: {
      a: {
        a: ["a", "b"]
      }
    }
  });
});

test("merges all keys", () => {
  expect(
    joinObjects(
      {
        a: "a",
        c: {
          a: "a"
        }
      },
      {
        b: {
          a: "b",
          b: "b"
        },
        c: {
          b: "b",
          c: "b"
        },
        d: "b"
      }
    )
  ).toEqual({
    a: "a",
    b: {
      a: "b",
      b: "b"
    },
    c: {
      a: "a",
      b: "b",
      c: "b"
    },
    d: "b"
  });
});

test("handles objects on value conflict", () => {
  expect(
    joinObjects(
      {
        a: "a"
      },
      {
        a: { b: "b", c: "b" }
      }
    )
  ).toEqual({
    a: ["a", { b: "b", c: "b" }]
  });
});

test("returns the object back if only one object passed in", () => {
  expect(joinObjects({ a: { b: "b", c: "b" } })).toEqual({
    a: { b: "b", c: "b" }
  });
});

test("throws an error less than one object passed", () => {
  expect(joinObjects()).toThrow();
});

test("handles more than two objects correctly", () => {
  expect(
    joinObjects(
      { a: { b: "a", c: "a" } },
      { a: { b: "b", c: "b" } },
      { a: { b: "c", c: "c" } }
    )).toEqual(
      { a: { b: ["a", "b", "c"], c: ["a", "b", "c"] } }
    );
});