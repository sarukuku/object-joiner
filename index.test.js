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

test("handles more than two objects correctly", () => {
  expect(
    joinObjects(
      { a: { b: "a", c: "a" } },
      { a: { b: "b", c: "b" } },
      { a: { b: "c", c: "c" } }
    )
  ).toEqual({ a: { b: ["a", "b", "c"], c: ["a", "b", "c"] } });
});

test("handles existing arrays correctly", () => {
  expect(
    joinObjects({ a: { b: ["a", "b"], c: ["a"] } }, { a: { b: "c", c: "b" } })
  ).toEqual({ a: { b: ["a", "b", "c"], c: ["a", "b"] } });
});

test("handles merging arrays on both objects correctly", () => {
  expect(
    joinObjects(
      { a: { b: ["a", "b"], c: ["a"] } },
      { a: { b: ["c"], c: ["b", "c"] } }
    )
  ).toEqual({ a: { b: ["a", "b", "c"], c: ["a", "b", "c"] } });
});

test("handles circular references in objects gracefully", () => {
  const x = { a: { b: "a" } };
  const y = { a: { b: {} } };
  y.a.b.c = y.a; // const y = { a: { b: { c: [Cyclic] } } };
  expect(joinObjects(x, y)).toEqual({ a: { b: ["a", { c: "[Cyclic]" }] } });
});

test("returns the object back if only one object passed in", () => {
  expect(joinObjects({ a: { b: "b", c: "b" } })).toEqual({
    a: { b: "b", c: "b" }
  });
});

test("throws an error if less than one object passed", () => {
  expect(() => {
    joinObjects();
  }).toThrowError();
});
