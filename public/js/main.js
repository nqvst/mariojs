import { loadLevel } from './loaders.js';
import { loadCharacterSprite, loadBackgroundSprites } from './sprites.js'

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context);
        });
    }
}

function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;


    backgrounds.forEach( bg => {
        drawBackground(bg, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

function createSpriteLayer(sprite, pos) {
    return function drawPriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    }
}

Promise.all([
    loadCharacterSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
]).then(([characterSprite, sprites, level])=> {

    const comp = new Compositor();

    const bgLayer = createBackgroundLayer(level.backgrounds, sprites);

    comp.layers.push(bgLayer);

    const pos = {
        x: 64,
        y: 64,
    };
    const spriteLayer = createSpriteLayer(characterSprite, pos);
    comp.layers.push(spriteLayer);


    function update() {
        comp.draw(context);
        characterSprite.draw('idle', context, pos.x, pos.y);
        pos.x += 2;
        requestAnimationFrame(update);
    }

    update();
});

