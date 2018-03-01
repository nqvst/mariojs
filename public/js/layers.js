export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

export function createSpriteLayer(entities) {
    return function drawPriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        })
    }
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOrig = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        // console.log(x,y);
        return getByIndexOrig.call(tileResolver, x, y);
    }

    return function drawCollisions(context) {
        context.strokeStyle = 'green';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();

        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        });
        resolvedTiles.length = 0;
    }
}
