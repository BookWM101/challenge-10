const { validateColorInput, validateText, validateShapeInput } = require('./index.js');

describe("Logo Generator User Input Tests", () => {
  
  test("Validates text input - should be up to 3 characters", () => {
    expect(validateText("ABC")).toBe(true);
    expect(validateText("A")).toBe(true);
    expect(validateText("ABCD")).toBe(false); // Fails If More than 3 characters!
  });

  test("Validates color input - accepts valid color keywords or hex values", () => {
    expect(validateColorInput("red")).toBe(true);
    expect(validateColorInput("#ff0000")).toBe(true);
    expect(validateColorInput("invalid-color")).toBe(false); // Fails If Invalid color keyword!
    expect(validateColorInput("#gggggg")).toBe(false); // Fails If Invalid hex value!
  });

  test("Validates shape input - should accept only 'circle', 'triangle', or 'square'", () => {
    expect(validateShapeInput("circle")).toBe(true);
    expect(validateShapeInput("triangle")).toBe(true);
    expect(validateShapeInput("square")).toBe(true);
    expect(validateShapeInput("hexagon")).toBe(false); // Fails If Invalid shape!
  });
});
