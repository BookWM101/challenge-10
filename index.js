const inquirer = require('inquirer');
const fs = require('fs');

// Test Functions!
function validateText(input) {
  return input.length <= 3;
}

function validateColorInput(input) {
  // Regular expression to test if input is a valid hex color or color keyword!
  const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
  const colorKeywords = ["red", "blue", "green", "yellow", "black", "white"];

  return hexColorRegex.test(input) || colorKeywords.includes(input.toLowerCase());
}

function validateShapeInput(input) {
  const validShapes = ["circle", "triangle", "square"];
  return validShapes.includes(input.toLowerCase());
}

// Main Function to Run App!
function generateLogo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "text",
        message: "Enter up to 3 characters for your logo:",
        validate: validateText
      },
      {
        type: "input",
        name: "textColor",
        message: "Enter the text color (color keyword or hex value):",
        validate: validateColorInput
      },
      {
        type: "list",
        name: "shape",
        message: "Choose a shape for your logo:",
        choices: ["circle", "triangle", "square"],
        validate: validateShapeInput
      },
      {
        type: "input",
        name: "shapeColor",
        message: "Enter the shape background color (color keyword or hex value):",
        validate: validateColorInput
      }
    ])
    .then(answers => {
      const { text, textColor, shape, shapeColor } = answers;

      // Generate SVG Using User Input!
      let svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;

      if (shape === "circle") {
        svgContent += `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
      } else if (shape === "triangle") {
        svgContent += `<polygon points="150,20 270,180 30,180" fill="${shapeColor}" />`;
      } else if (shape === "square") {
        svgContent += `<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />`;
      }

      svgContent += `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}" font-family="Arial">${text}</text>`;
      svgContent += `</svg>`;

      // Write Content Into File!
      fs.writeFileSync("logo.svg", svgContent);

      console.log("Generated logo.svg");
    });
}

// Export Functions to Test!
module.exports = { validateText, validateColorInput, validateShapeInput, generateLogo };

generateLogo();
