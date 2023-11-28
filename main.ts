namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Shooter = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    Set_level()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shooter, function (sprite, otherSprite) {
    Set_level()
})
function Set_level () {
    if (Level == 0) {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile11`)
    }
    if (Level == 1) {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile19`)
    }
    if (Level == 2) {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile27`)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile18`, function (sprite, location) {
    Level = 1
    tiles.setTileAt(location, assets.tile`myTile19`)
    Set_level()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile20`, function (sprite, location) {
    Level = 2
    tiles.setTileAt(location, assets.tile`myTile27`)
    Set_level()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    Set_level()
})
let Shooter: Sprite = null
let bumper: Sprite = null
let mySprite: Sprite = null
let Level = 0
music.play(music.createSong(hex`0078000408040106001c00010a006400f401640000040000000000000000000000000000000002780000000400012208000c0001220c001000012210001400012514001800012220002400012528002c0001252c003000012530003400012934003800012540004400012948004c0001294c005000012950005400012c54005800012960006400012268006c0001226c0070000122700074000125740078000122`), music.PlaybackMode.LoopingInBackground)
Level = 0
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f f f f f f f f f 1 . . 
    . . 1 f f 1 1 1 1 1 1 f f 1 . . 
    . . 1 f f 1 . . . . 1 f f 1 . . 
    . . 1 1 1 1 . . . . 1 1 1 1 . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.ay = 300
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
tiles.placeOnRandomTile(mySprite, assets.tile`myTile11`)
for (let value of tiles.getTilesByType(assets.tile`myTile10`)) {
    bumper = sprites.create(img`
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 f f f f f f f f f f f f f f 4 
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
        `, SpriteKind.Bumper)
    tiles.placeOnTile(bumper, value)
    bumper.vx = 50
}
for (let value of tiles.getTilesByType(assets.tile`myTile29`)) {
    Shooter = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . 2 f f f f 2 . . . . . 
        . . . . . 2 f f f f 2 . . . . . 
        . . . . . 2 f f f f 2 . . . . . 
        . . . . . 2 f f f f 2 . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Shooter)
    tiles.placeOnTile(Shooter, value)
    Shooter.vy = 50
}
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 50
        }
        if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -50
        }
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Shooter)) {
        if (value.isHittingTile(CollisionDirection.Top)) {
            value.vy = 100
        }
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            value.vy = -100
        }
    }
})
