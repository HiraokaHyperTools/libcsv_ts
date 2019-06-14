"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var libcsv_1 = require("../dist/libcsv");
var csv = libcsv_1.libcsv.csv;
describe("csv.parseWithHeader", function () {
    it("comma", function () {
        chai_1.assert.deepEqual(csv.parseWithHeader("a,b,c\n1,2,3", ",", "\""), [{ a: '1', b: '2', c: '3' }]);
    });
    it("sep in quote", function () {
        chai_1.assert.deepEqual(csv.parseWithHeader("\"a,b,c\"\n\"1,2,3\"", ",", "\""), [{ 'a,b,c': '1,2,3' }]);
    });
    it("each quote", function () {
        chai_1.assert.deepEqual(csv.parseWithHeader("\"a\",\"b\",\"c\"\n\"1\",\"2\",\"3\"", ",", "\""), [{ a: '1', b: '2', c: '3' }]);
    });
    it("quote escape", function () {
        chai_1.assert.deepEqual(csv.parseWithHeader("\"a\"\"b\"\"c\"\n\"1\"\"2\"\"3\"", ",", "\""), [{ 'a"b"c': '1"2"3' }]);
    });
    it("line feed in quote", function () {
        chai_1.assert.deepEqual(csv.parseWithHeader("\"a\nb\nc\"\n\"1\n2\n3\"", ",", "\""), [{ 'a\nb\nc': '1\n2\n3' }]);
    });
});
