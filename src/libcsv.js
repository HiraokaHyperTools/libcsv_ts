"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = /** @class */ (function () {
    function csv() {
    }
    csv.parse = function (body, sep, quote, reader) {
        var x = 0;
        var cx = body.length;
        var colNum = 0;
        var part;
        while (x < cx) {
            if (body[x] == sep) {
                reader("", false);
                x++;
                colNum++;
                continue;
            }
            else if (body[x] == quote) {
                x++;
                part = "";
                while (x < cx) {
                    if (body[x] == quote) {
                        x++;
                        if (x < cx) {
                            if (body[x] == quote) {
                                x++;
                                part += quote;
                                continue;
                            }
                            else {
                                reader(part, false);
                                if (body[x] == sep) {
                                    x++;
                                }
                                colNum++;
                                break;
                            }
                        }
                        else {
                            reader(part, false);
                            colNum++;
                            break;
                        }
                    }
                    else {
                        part += body[x];
                        x++;
                    }
                }
                continue;
            }
            else if (body[x] == '\n') {
                reader("", true);
                colNum = 0;
                x++;
            }
            else {
                part = "";
                while (true) {
                    if (x >= cx) {
                        reader(part, false);
                        colNum++;
                        break;
                    }
                    if (body[x] == sep) {
                        reader(part, false);
                        x++;
                        colNum++;
                        break;
                    }
                    else if (body[x] == "\n") {
                        reader(part, false);
                        break;
                    }
                    else {
                        part += body[x];
                        x++;
                    }
                }
                continue;
            }
        }
        if (colNum != 0) {
            reader("", true);
        }
    };
    csv.parseWithHeader = function (body, sep, quote) {
        var lines = [];
        var x = 0;
        var y = 0;
        var header = [];
        var dict = {};
        csv.parse(body, sep, quote, function (text, nextRow) {
            if (nextRow) {
                if (y != 0) {
                    lines.push(dict);
                    dict = {};
                }
                y++;
                x = 0;
                return;
            }
            if (y == 0) {
                header.push(text);
            }
            else {
                if (x < header.length) {
                    dict[header[x]] = text;
                }
            }
            x++;
        });
        return lines;
    };
    return csv;
}());
exports.default = csv;
//# sourceMappingURL=libcsv.js.map