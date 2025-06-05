namespace SpriteKind {
    export const mouse = SpriteKind.create()
    export const sword = SpriteKind.create()
    export const enemyprojectile = SpriteKind.create()
    export const parryedprojectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.parryedprojectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbar2.value += -4
})
function hitstun2 () {
    hitstun = true
    pause(100)
    hitstun = false
}
browserEvents.onMouseMove(function (x, y) {
    mySprite2.setPosition(x + (scene.cameraProperty(CameraProperty.X) - scene.screenWidth() / 2), y + (scene.cameraProperty(CameraProperty.Y) - scene.screenHeight() / 2))
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemyprojectile, function (sprite, otherSprite) {
    if (parrytriger == true) {
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, myoponent1), 250)
        otherSprite.setKind(SpriteKind.parryedprojectile)
        hitstun()
    } else if (dash == true) {
        info.changeLifeBy(0)
    } else {
        info.changeLifeBy(-1)
        sprites.destroy(otherSprite)
    }
})
let projectile2: Sprite = null
let swordrot = 0
let statusbar2: StatusBarSprite = null
let myoponent1: Sprite = null
let mySprite2: Sprite = null
let dash = false
let parrytriger = false
let hitstun = false
hitstun = false
parrytriger = false
dash = false
info.setLife(5)
mySprite2 = sprites.create(img`
    3 
    `, SpriteKind.mouse)
mySprite2.setFlag(SpriteFlag.Invisible, true)
let playersword = sprites.create(img`
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    .......cccc.................................
    .........bbcccc.............................
    ..........dddddccccccccccccccccccccdddddbbbb
    696eeeeee4bbbbbbbbbbbddddddddddddddbbb......
    .6eeee224dbbdddddddddbbb....................
    ........bdddbb..............................
    .......bdbbb................................
    .....dddd...................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    ............................................
    `, SpriteKind.sword)
let mySprite = sprites.create(img`
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
myoponent1 = sprites.create(img`
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
statusbar2 = statusbars.create(60, 4, StatusBarKind.EnemyHealth)
statusbar2.max = 40
statusbar2.value = 40
statusbar2.setColor(2, 1)
statusbar2.positionDirection(CollisionDirection.Bottom)
let sword_rotations = scaling.createRotations(playersword.image, 360)
game.onUpdate(function () {
    swordrot = spriteutils.radiansToDegrees(spriteutils.angleFrom(mySprite, mySprite2))
    if (swordrot < 0) {
        swordrot += 360
    }
    spriteutils.placeAngleFrom(
    playersword,
    spriteutils.degreesToRadians(swordrot),
    11,
    mySprite
    )
    playersword.setImage(sword_rotations[Math.round(swordrot)])
})
game.onUpdate(function () {
    if (hitstun == true) {
        pause(200)
    }
})
game.onUpdateInterval(2000, function () {
    if (dash == false) {
        statusbar.value += 1
    }
})
game.onUpdateInterval(4000, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, myoponent1, 0, 0)
    projectile2.setKind(SpriteKind.enemyprojectile)
    spriteutils.setVelocityAtAngle(projectile2, spriteutils.angleFrom(myoponent1, mySprite), 150)
    projectile2.setFlag(SpriteFlag.AutoDestroy, false)
})
forever(function () {
    pauseUntil(() => controller.A.isPressed())
    parrytriger = true
    mySprite.setImage(img`
        . . . . . . 5 5 5 5 . . . . . . 
        . . . . 5 5 5 5 5 5 5 5 . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . . 5 5 5 5 5 5 5 5 . . . . . 
        . . . . . 5 5 . . 5 5 . . . . . 
        `)
    pause(100)
    parrytriger = false
    mySprite.setImage(img`
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
        `)
    pause(200)
})
forever(function () {
    pauseUntil(() => browserEvents.Shift.isPressed())
    if (statusbar.value > 0) {
        dash = true
        controller.moveSprite(mySprite, 0, 0)
        spriteutils.setVelocityAtAngle(mySprite, spriteutils.angleFrom(mySprite, mySprite2), 800)
        statusbar.value += -1
        pause(100)
        mySprite.setVelocity(0, 0)
        controller.moveSprite(mySprite, 150, 150)
        pause(200)
        dash = false
    }
})
