import Compositor from './compositor.js';
import Entity from './entity.js';
import Timer from './timer.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites } from './sprites.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

import { createMario } from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
]).then(([mario, bgSprite, level])=> {

    const comp = new Compositor();

    const bgLayer = createBackgroundLayer(level.backgrounds, bgSprite);

    //comp.layers.push(bgLayer);

    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const deltaTime = 1/60;
    let accTime = 0;
    let lastTime = 0;

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
        accTime -= deltaTime;
    
    }

    timer.start();
});

