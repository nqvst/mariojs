import Compositor from './compositor.js';
import { Matrix } from './math.js';
import TileCollider from './TileCollider.js';

export default class Level {
    constructor() {
        this.gravity = 2000;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime) {
    	this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkAxis('x', entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkAxis('y', entity);

            entity.vel.y += this.gravity * deltaTime;
    	});
    }
}