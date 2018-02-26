import Entity from './entity.js';
import { loadCharacterSprite } from './sprites.js'
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';

export function createMario() {
	return loadCharacterSprite()
	.then(sprite => {
		const mario = new Entity();

		mario.addTrait(new Velocity());
		mario.addTrait(new Jump());

	    mario.draw = function drawMario(context) {
	        sprite.draw('idle', context, this.pos.x, this.pos.y);
	    }

	    return mario;
	});
}
