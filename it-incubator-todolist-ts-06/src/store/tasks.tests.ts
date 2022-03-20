import {div, mult, sub, sum} from "./tasks";

test("sum should be correct", () => {
    // 1. tests data: in or out function
    const a = 10
    const b = 20

    // 2. function with tests data
    const result = sum(a, b)

    // 3. check results
    expect(result).toBe(30)
})

test("subtract should be correct", () => {
    expect(sub(20,10)).toBe(10)
})
test("multiple should be correct", () => {
    expect(mult(10,20)).toBe(200)
})
test("division should be correct", () => {
    expect(div(20,10)).toBe(2)
})