import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Timer from './Timer.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';
import { loadLevel } from './loaders.js';
import { createMario } from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
]).then(([mario, level])=> {
    mario.pos.set(64, 180);

    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    // ================= Debugging ======================
        debuggMove(mario);
    // ==================================================

    const deltaTime = 1 / 60;
    const timer = new Timer(deltaTime);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context);
    }

    timer.start();
});

const debuggMove = (entity) => {
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
}