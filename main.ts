namespace SpriteKind {
    export const Switch = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    if (isFlipped) {
        scrola.ay = GRAVITY
        isFlipped = 0
    } else {
        scrola.ay = FLIPPED_GRAVITY
        isFlipped = 1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scrola.vy == 0) {
        if (isFlipped) {
            scrola.vy = JUMPED_FLIPPED
        } else {
            scrola.vy = JUMP
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isFlipped) {
        scrola.setImage(assets.image`walkLeftFlipped`)
    } else {
        scrola.setImage(assets.image`walkLeft`)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isFlipped) {
        scrola.setImage(assets.image`walkRightFlipped`)
    } else {
        scrola.setImage(assets.image`walkRight`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`fireBottom`, function (sprite, location) {
    game.over(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Switch, SpriteKind.Player, function (sprite, otherSprite) {
    if (isFlipped) {
        scrola.ay = GRAVITY
        isFlipped = 0
    } else {
        scrola.ay = FLIPPED_GRAVITY
        isFlipped = 1
    }
    sprite.destroy(effects.fire, 300)
    music.magicWand.play()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    game.over(true, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`fireTop`, function (sprite, location) {
    game.over(false, effects.melt)
})
let isFlipped = 0
let scrola: Sprite = null
let JUMPED_FLIPPED = 0
let JUMP = 0
let FLIPPED_GRAVITY = 0
let GRAVITY = 0
GRAVITY = 300
FLIPPED_GRAVITY = -300
JUMP = -150
JUMPED_FLIPPED = 150
scene.setBackgroundColor(14)
scrola = sprites.create(assets.image`walkRight`, SpriteKind.Player)
scrola.ay = GRAVITY
scene.cameraFollowSprite(scrola)
tiles.setTilemap(tilemap`level2`)
controller.moveSprite(scrola, 100, 0)
tiles.placeOnTile(scrola, tiles.getTileLocation(1, 10))
let switch1 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
tiles.placeOnTile(switch1, tiles.getTileLocation(56, 11))
let switch2 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
tiles.placeOnTile(switch2, tiles.getTileLocation(50, 8))
let switch3 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
tiles.placeOnTile(switch3, tiles.getTileLocation(72, 8))
let switch4 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
tiles.placeOnTile(switch4, tiles.getTileLocation(25, 7))
