import Keyboard from './KeyboardState.js'

export function setupKeyboard(entity) {

    const SPACE = 'Space';
    const LEFT = 'KeyA';
    const RIGHT = 'KeyD';
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        console.log(keyState);
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping(LEFT, keyState => {
        entity.go.dir = -keyState;
    });

    input.addMapping(RIGHT, keyState => {
        entity.go.dir = keyState;
    });

    return input;
}