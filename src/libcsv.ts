export module libcsv {
    export class csv {
        static parse(body: string, sep: string, quote: string, reader: (text: string, nextRow: boolean) => void): void {
            var x: number = 0;
            const cx = body.length;
            var colNum: number = 0;
            var part: string;
            while (x < cx) {
                if (body.charAt(x) == sep) {
                    reader("", false);
                    x++;
                    colNum++;
                    continue;
                }
                else if (body.charAt(x) == quote) {
                    x++;
                    part = "";
                    while (x < cx) {
                        if (body.charAt(x) == quote) {
                            x++;
                            if (x < cx) {
                                if (body.charAt(x) == quote) {
                                    x++;
                                    part += quote;
                                    continue;
                                }
                                else {
                                    reader(part, false);
                                    if (body.charAt(x) == sep) {
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
                            part += body.charAt(x);
                            x++;
                        }
                    }
                    continue;
                }
                else if (body.charAt(x) == '\n') {
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
                        if (body.charAt(x) == sep) {
                            reader(part, false);
                            x++;
                            colNum++;
                            break;
                        }
                        else if (body.charAt(x) == "\n") {
                            reader(part, false);
                            break;
                        }
                        else {
                            part += body.charAt(x);
                            x++;
                        }
                    }
                    continue;
                }
            }
            if (colNum != 0) {
                reader("", true);
            }
        }
        static parseWithHeader(body: string, sep: string, quote: string): { [key: string]: string; }[] {
            var lines: { [key: string]: string; }[] = [];
            var x = 0;
            var y = 0;
            var header = [];
            var dict: { [key: string]: string; } = {};
            csv.parse(body, sep, quote, (text, nextRow) => {
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
        }
    }
}