const { assert } = require('chai');
const { libcsv } = require("../dist/libcsv");

var csv = libcsv.csv;

describe("csv.parseWithHeader", () => {
    it("comma", () => {
        assert.deepEqual(csv.parseWithHeader("a,b,c\n1,2,3", ",", "\""),
            [{ a: '1', b: '2', c: '3' }]);
    });
    it("sep in quote", () => {
        assert.deepEqual(csv.parseWithHeader("\"a,b,c\"\n\"1,2,3\"", ",", "\""),
            [{ 'a,b,c': '1,2,3' }]);
    });
    it("each quote", () => {
        assert.deepEqual(csv.parseWithHeader("\"a\",\"b\",\"c\"\n\"1\",\"2\",\"3\"", ",", "\""),
            [{ a: '1', b: '2', c: '3' }]);
    });
    it("quote escape", () => {
        assert.deepEqual(csv.parseWithHeader("\"a\"\"b\"\"c\"\n\"1\"\"2\"\"3\"", ",", "\""),
            [{ 'a"b"c': '1"2"3' }]);
    });
    it("line feed in quote", () => {
        assert.deepEqual(csv.parseWithHeader("\"a\nb\nc\"\n\"1\n2\n3\"", ",", "\""),
            [{ 'a\nb\nc': '1\n2\n3' }]);
    });
});
