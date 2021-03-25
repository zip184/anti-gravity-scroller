namespace SpriteKind {
    export const Switch = SpriteKind.create()
}
/**
 * Setup Controllers
 */
function placeSwitches () {
    switch1 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
    tiles.placeOnTile(switch1, tiles.getTileLocation(56, 11))
    switch2 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
    tiles.placeOnTile(switch2, tiles.getTileLocation(50, 8))
    switch3 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
    tiles.placeOnTile(switch3, tiles.getTileLocation(72, 8))
    switch4 = sprites.create(assets.tile`myTile`, SpriteKind.Switch)
    tiles.placeOnTile(switch4, tiles.getTileLocation(25, 7))
}
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
/**
 * Overlap Events
 */
scene.onOverlapTile(SpriteKind.Player, assets.tile`fireBottom`, function (sprite, location) {
    game.over(false, effects.melt)
})
function setupPlayer () {
    scrola = sprites.create(assets.image`walkRight`, SpriteKind.Player)
    tiles.placeOnTile(scrola, tiles.getTileLocation(1, 10))
    controller.moveSprite(scrola, 100, 0)
    scrola.ay = GRAVITY
    scene.cameraFollowSprite(scrola)
}
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
function setConstants () {
    GRAVITY = 300
    FLIPPED_GRAVITY = -300
    JUMP = -150
    JUMPED_FLIPPED = 150
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    game.over(true, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`fireTop`, function (sprite, location) {
    game.over(false, effects.melt)
})
let FLIPPED_GRAVITY = 0
let GRAVITY = 0
let JUMP = 0
let JUMPED_FLIPPED = 0
let isFlipped = 0
let scrola: Sprite = null
let switch4: Sprite = null
let switch3: Sprite = null
let switch2: Sprite = null
let switch1: Sprite = null
setConstants()
scene.setBackgroundColor(14)
tiles.setTilemap(tilemap`level2`)
placeSwitches()
setupPlayer()
game.splash("Anti-Gravity Scroller")
