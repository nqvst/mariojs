
export class Matrix {
    constructor() {
        this.grid = [];

    }

    forEach(cb) {
        this.grid.forEach((col, x) => {
            col.forEach((value, y) => {
                cb(value, x, y);
            });
        })
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
    }

    set(x, y, value) {
        if(!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}

export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}