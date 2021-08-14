import assert from 'assert';
import { libcsv } from '../libcsv';

describe("csv.parseWithHeader", () => {
    const { csv } = libcsv;
    it("comma", () => {
        assert.deepStrictEqual(csv.parseWithHeader("a,b,c\n1,2,3", ",", "\""),
            [{ a: '1', b: '2', c: '3' }]);
    });
    it("sep in quote", () => {
        assert.deepStrictEqual(csv.parseWithHeader("\"a,b,c\"\n\"1,2,3\"", ",", "\""),
            [{ 'a,b,c': '1,2,3' }]);
    });
    it("each quote", () => {
        assert.deepStrictEqual(csv.parseWithHeader("\"a\",\"b\",\"c\"\n\"1\",\"2\",\"3\"", ",", "\""),
            [{ a: '1', b: '2', c: '3' }]);
    });
    it("quote escape", () => {
        assert.deepStrictEqual(csv.parseWithHeader("\"a\"\"b\"\"c\"\n\"1\"\"2\"\"3\"", ",", "\""),
            [{ 'a"b"c': '1"2"3' }]);
    });
    it("line feed in quote", () => {
        assert.deepStrictEqual(csv.parseWithHeader("\"a\nb\nc\"\n\"1\n2\n3\"", ",", "\""),
            [{ 'a\nb\nc': '1\n2\n3' }]);
    });
});
