namespace SpriteKind {
    export const mouse = SpriteKind.create()
    export const sword = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 50, 50)
    spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(mySprite, mySprite2), 150)
})
browserEvents.onMouseMove(function (x, y) {
    mySprite2.setPosition(x, y)
})
let dash = false
let projectile: Sprite = null
let mySprite: Sprite = null
let mySprite2: Sprite = null
mySprite2 = sprites.create(img`
    3 
    `, SpriteKind.mouse)
mySprite2.setFlag(SpriteFlag.Invisible, true)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f f f f d d d d d e e f . . 
    . f d d d d f 4 4 4 e e f . . . 
    . f b b b b f 2 2 2 2 f 4 e . . 
    . f b b b b f 2 2 2 2 f d 4 . . 
    . . f c c f 4 5 5 4 4 f 4 4 . . 
    . . . f f f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
let myoponent1 = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Enemy)
let playersword = sprites.create(img`
    ................................................................
    ................................................................
    ................................................................
    ................................................................
    ...........................cccc.................................
    .............................bbcccc.............................
    ..............................dddddccccccccccccccccccccdddddbbbb
    ....................696eeeeee4bbbbbbbbbbbddddddddddddddbbb......
    .....................6eeee224dbbdddddddddbbb....................
    ............................bdddbb..............................
    ...........................bdbbb................................
    .........................dddd...................................
    ................................................................
    ................................................................
    ................................................................
    `, SpriteKind.sword)
controller.moveSprite(mySprite, 150, 150)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`level1`)
scene.setBackgroundColor(13)
for (let value of tiles.getTilesByType(sprites.dungeon.collectibleInsignia)) {
    tiles.placeOnTile(mySprite, value)
}
for (let value of tiles.getTilesByType(sprites.dungeon.collectibleRedCrystal)) {
    tiles.placeOnTile(myoponent1, value)
}
let statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.setBarSize(2, 15)
statusbar.setColor(6, 5)
statusbar.max = 3
statusbar.value = 3
statusbar.attachToSprite(mySprite)
let sword_rotations = scaling.createRotations(playersword.image, 360)
game.onUpdateInterval(2000, function () {
    if (dash == false) {
        statusbar.value += 1
    }
})
forever(function () {
    pauseUntil(() => browserEvents.MouseRight.isPressed())
    if (statusbar.value > 0) {
        dash = true
        controller.moveSprite(mySprite, 0, 0)
        spriteutils.setVelocityAtAngle(mySprite, spriteutils.angleFrom(mySprite, mySprite2), 800)
        statusbar.value += -1
        pause(100)
        mySprite.setVelocity(0, 0)
        controller.moveSprite(mySprite, 150, 150)
        pause(500)
        dash = false
        pause(500)
    }
})
