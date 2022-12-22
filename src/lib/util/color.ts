class Rgb {
    r: number;
    g: number;
    b: number;

    constructor(r, g, b) {
        let items = [r, g, b];
        if (Math.max(r, g, b) > 255 || Math.min(r, g, b) < 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i] > 255) {
                    items[i] = 255;
                }

                if (items[i] < 0) {
                    items[i] = 0;
                }
            }
        }

        this.r = items[0];
        this.g = items[1];
        this.b = items[2];
    }

    max() {
        let largestRange = Math.max(this.r, this.g, this.b);

        let maxRangeIndex;
        switch (largestRange) {
            case this.r:
                maxRangeIndex = 0;
                break;
            case this.g:
                maxRangeIndex = 1;
                break;
            case this.b:
                maxRangeIndex = 2;
                break;
        }

        if (this.r === this.g && this.r === this.b && this.g === this.b) {
            maxRangeIndex = Math.round(Math.random() * 3);
        }

        return maxRangeIndex;
    }

    key() {
        switch (this.max()) {
            case 0:
                return "r";
            case 1:
                return "g";
            case 2:
                return "b";
        }
    }

    rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    hex() {
        let hexStr = "";
        [this.r, this.g, this.b].forEach((c) => {
            let hex = c.toString(16);
            let val = hex.length == 1 ? "0" + hex : hex;

            hexStr += val;
        });

        return hexStr;
    }

    lum() {
        return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
    }
}

function hexlistToRgbObj(hexList) {
    let rgbList = [];

    for (let i = 0; i < hexList.length; i++) {
        let sections = hexList[i].match(/.{1,2}/g);
        let rgb = new Rgb(
            parseInt(sections[0], 16),
            parseInt(sections[1], 16),
            parseInt(sections[2], 16)
        );

        rgbList.push(rgb);
    }

    return rgbList;
}

function rgbaToRgbObj(data: number[]) {
    let rgbValues = [];

    for (let i = 0; i < data.length; i += 4) {
        const rgb = new Rgb(data[i], data[i + 1], data[i + 2]);
        rgbValues.push(rgb);
    }
    return rgbValues;
}

function quantizeRgbObj(data) {
    data = preprocessSortQuantizeData(data);

    data = splitSortedData(data);

    data = splitDataFor(data, 2);

    return getColors(data);
}

function preprocessSortQuantizeData(data) {
    const colorIndex = getLargestColorRange(data);

    data.sort((a, b) => {
        return a[colorIndex] - b[colorIndex];
    });

    return data;
}

function getLargestColorRange(data) {
    let rgbMax = new Rgb(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

    let rgbMin = new Rgb(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);

    data.forEach((pixel) => {
        rgbMax.r = Math.max(rgbMax.r, pixel.r);
        rgbMax.g = Math.max(rgbMax.g, pixel.g);
        rgbMax.b = Math.max(rgbMax.b, pixel.b);

        rgbMin.r = Math.min(rgbMin.r, pixel.r);
        rgbMin.g = Math.min(rgbMin.g, pixel.g);
        rgbMin.b = Math.min(rgbMin.b, pixel.b);
    });

    let rgbRange = new Rgb(
        rgbMax.r - rgbMin.r,
        rgbMax.g - rgbMin.g,
        rgbMax.b - rgbMin.b
    );

    return rgbRange.key();
}

function splitSortedData(data) {
    const middle = data.length / 2;
    return [data.slice(0, middle), data.slice(middle + 1)];
}

function splitDataFor(data, count) {
    let total = [];
    for (let i = 0; i < count; i++) {
        if (i == 0) {
            data.forEach((block) => {
                block = preprocessSortQuantizeData(block);
                total = total.concat(splitSortedData(block));
            });
        } else {
            total.forEach((block) => {
                block = preprocessSortQuantizeData(block);
                total = total.concat(splitSortedData(block));
            });
        }
    }

    return total;
}

function getColors(data) {
    let colors = [];
    data.forEach((block) => {
        let color = block.reduce((prev, curr) => {
            prev.r += curr.r;
            prev.g += curr.g;
            prev.b += curr.b;

            return prev;
        }, new Rgb(0, 0, 0));

        color.r = Math.round(color.r / block.length);
        color.g = Math.round(color.g / block.length);
        color.b = Math.round(color.b / block.length);

        colors.push(color);
    });

    return colors;
}

export { hexlistToRgbObj, rgbaToRgbObj, quantizeRgbObj };
