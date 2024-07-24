const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("convertHandler getNum function", () => {
    test("Whole number input", (done) => {
      let input = "2mi";
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });

    test("Decimal number input", (done) => {
      let input = "3.1mi";
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    });

    test("Fractional input", (done) => {
      let input = "30/2mi";
      assert.equal(convertHandler.getNum(input), 30 / 2);
      done();
    });

    test("Fractional input with decimal", (done) => {
      let input = "30.2/2mi";
      assert.equal(convertHandler.getNum(input), 30.2 / 2);
      done();
    });

    test("Double Fraction invalid input", (done) => {
      let input = "30/3/3mi";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test("No numerical", (done) => {
      let input = "mi";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("units", () => {
    test("Read each valid input unit", (done) => {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach((inp, index) => {
        assert.equal(convertHandler.getUnit(inp), output[index]);
      });
      done();
    });

    test("Error on wrong unit", (done) => {
      let input = "wasd";
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    });

    test("convertHandler should return the correct return unit for each valid input unit", (done) => {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let output = ["L", "gal", "km", "mi", "kg", "lbs"];

      input.forEach((inp, index) => {
        assert.equal(convertHandler.getReturnUnit(inp), output[index]);
      });
      done();
    });
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", (done) => {
    let input = ["gal", "l", "mi", "km", "lbs", "kg"];
    let output = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];

    input.forEach((inp, index) => {
      assert.equal(convertHandler.spellOutUnit(inp), output[index]);
    });
    done();
  });
  suite("Number convertion", function () {
    test("Gal to L", function (done) {
      let input = [2.5, "gal"];
      let output = 9.46355;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        output,
        0.1,
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      let input = [10, "l"];
      let output = 2.64172;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        output,
        0.1,
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function (done) {
      let input = [3.2, "mi"];
      let output = 5.15072;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        output,
        0.1,
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function (done) {
      let input = [8.5, "km"];
      let output = 5.28205;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        output,
        0.1,
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function (done) {
      let input = [1.8, "lbs"];
      let output = 0.81648;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        output,
        0.1,
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function (done) {
      let input = [4.2, "kg"];
      let output = 9.25926;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        output,
        0.1,
      ); //0.1 tolerance
      done();
    });
  });
});
