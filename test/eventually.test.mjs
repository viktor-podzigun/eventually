import assert from "node:assert/strict";
import eventually from "../src/eventually.mjs";

const { describe, it } = await (async () => {
  // @ts-ignore
  const module = process.isBun ? "bun:test" : "node:test";
  // @ts-ignore
  return process.isBun // @ts-ignore
    ? Promise.resolve({ describe: (_, fn) => fn(), it: test })
    : import(module);
})();

/**
 * @param {() => void} voidFn
 */
function callVoidFn(voidFn) {
  voidFn();
}

/**
 * @param {(a: number, b: number) => number} fn
 */
function callFn(fn) {
  return fn(1, 2);
}

describe("eventually.test.mjs", () => {
  it("should mock void function", () => {
    //given
    const voidFnMock = eventually();

    //when
    callVoidFn(voidFnMock);

    //then
    assert.deepEqual(voidFnMock.times, 1);
  });

  it("should mock non-void function", () => {
    //given
    const fnMock = eventually((a, b) => {
      assert.deepEqual(fnMock.times, 1);
      assert.deepEqual(a, 1);
      assert.deepEqual(b, 2);
      return 123;
    });

    //when
    const result = callFn(fnMock);

    //then
    assert.deepEqual(fnMock.times, 1);
    assert.deepEqual(result, 123);
  });
});
