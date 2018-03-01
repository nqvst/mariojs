import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(tilesMatrix) {
        this.tiles = new TileResolver(tilesMatrix);

    }

    checkAxis(axis, entity) {
        let { vel, pos, size } = entity;
        let matches;

        if (axis === 'x') {
            let x = (vel.x > 0) ? pos.x + size.x : pos.x;
            matches = this.tiles.searchByRange(
                x, x,
                pos.y, pos.y + size.y
            );
        } else if( axis === 'y') {
            let y = (vel.y > 0) ? pos.y + size.y : pos.y;
            matches = this.tiles.searchByRange(
                pos.x, pos.x + size.x,
                y, y
            );
        }

        matches.forEach(match => {
            if (match.tile.name != 'ground') return;
            if (vel[axis] > 0) {
                if (pos[axis] + size[axis] > match[`${axis}1`]) {
                    pos[axis] = match[`${axis}1`] - size[axis];
                    vel[axis] = 0;
                }
            } else if (vel[axis] < 0) {
                if (pos[axis] < match[`${axis}2`]) {
                    pos[axis] = match[`${axis}2`];
                    vel[axis] = 0;
                }
            }
        });
    }
}

// ====== backup =======
function checkY(entity) {
    let { vel, pos, size } = entity;
    let y = (vel.y > 0) ? pos.y + size.y : pos.y;

    if (!y) return;

    const matches = this.tiles.searchByRange(
        pos.x, pos.x + size.x,
        y, y
    );


    matches.forEach(match => {
        if (match.tile.name != 'ground') return;
        if (vel.y > 0) {
            if (pos.y + size.y > match.y1) {
                pos.y = match.y1 - size.y;
                vel.y = 0;
            }
        } else if (vel.y < 0) {
            if (pos.y < match.y2) {
                pos.y = match.y2;
                vel.y = 0;
            }
        }
    });
}

function checkX(entity) {

    let { vel, pos, size } = entity;

    let x = (vel.x > 0) ? pos.x + size.x : pos.x;

    if (!x) return;

    const matches = this.tiles.searchByRange(
        x, x,
        pos.y, pos.y + size.y
    );

    matches.forEach(match => {
        if (match.tile.name != 'ground') return;

        if (vel.x > 0) {
            if (pos.x + size.x > match.x1) {
                pos.x = match.x1 - size.x;
                vel.x = 0;
            }
        } else if (vel.x < 0) {
            if (pos.x < match.x2) {
                pos.x = match.x2;
                vel.x = 0;
            }
        }
    });
}