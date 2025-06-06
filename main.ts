namespace SpriteKind {
    export const mouse = SpriteKind.create()
    export const sword = SpriteKind.create()
    export const enemyprojectile = SpriteKind.create()
    export const parryedprojectile = SpriteKind.create()
    export const damaging_sword = SpriteKind.create()
    export const homing_enemy_projectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.parryedprojectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbar2.value += -4
})
function challenger3_attack () {
	
}
function hitstunfunction () {
    hitstun = true
    pause(25)
    hitstun = false
}
function pause2 (time: number) {
    pause(time)
    return true
}
browserEvents.onMouseMove(function (x, y) {
    mySprite2.setPosition(x + (scene.cameraProperty(CameraProperty.X) - scene.screenWidth() / 2), y + (scene.cameraProperty(CameraProperty.Y) - scene.screenHeight() / 2))
})
function challenger2_attack () {
	
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.homing_enemy_projectile, function (sprite, otherSprite) {
    if (parrytriger == true) {
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, myoponent1), 200)
        otherSprite.setKind(SpriteKind.parryedprojectile)
        hitstunfunction()
    } else if (dash == true) {
        info.changeLifeBy(0)
    } else {
        info.changeLifeBy(-1)
        sprites.destroy(otherSprite)
    }
})
function challenger1_attack () {
    pause(650)
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
}
scene.onHitWall(SpriteKind.parryedprojectile, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.damaging_sword, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (swordstartup == true) {
        statusbar2.value += -1.5
        pause(100)
    } else {
        statusbar2.value += -0.03
    }
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemyprojectile, function (sprite, otherSprite) {
    if (parrytriger == true) {
        spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, myoponent1), 300)
        otherSprite.setKind(SpriteKind.parryedprojectile)
        hitstunfunction()
    } else if (dash == true) {
        info.changeLifeBy(0)
    } else {
        info.changeLifeBy(-1)
        sprites.destroy(otherSprite)
    }
})
let list: Sprite[] = []
let swordrot = 0
let projectile2: Sprite = null
let statusbar2: StatusBarSprite = null
let mySprite3: Sprite = null
let myoponent1: Sprite = null
let mySprite: Sprite = null
let mySprite2: Sprite = null
let dash = false
let parrytriger = false
let swordstartup = false
let hitstun = false
let challenger1 = true
let challenger2 = false
let challenger3 = false
hitstun = false
swordstartup = false
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
for (let value of tiles.getTilesByType(sprites.dungeon.collectibleBlueCrystal)) {
    mySprite3 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . 5 1 1 5 . . . . . . 
        . . . . . 7 1 1 1 1 7 . . . . . 
        . . . . . 7 1 1 1 1 7 . . . . . 
        . . . . . . 5 1 1 5 . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.homing_enemy_projectile)
    tiles.placeOnTile(mySprite3, value)
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
    if (browserEvents.MouseLeft.isPressed()) {
        spriteutils.placeAngleFrom(
        playersword,
        spriteutils.degreesToRadians(swordrot),
        randint(25, 37),
        mySprite
        )
        playersword.setKind(SpriteKind.damaging_sword)
    } else {
        spriteutils.placeAngleFrom(
        playersword,
        spriteutils.degreesToRadians(swordrot),
        11,
        mySprite
        )
        playersword.setKind(SpriteKind.sword)
    }
    playersword.setImage(sword_rotations[Math.round(swordrot)])
})
game.onUpdate(function () {
    if (hitstun == true) {
        pause(25)
    }
})
game.onUpdateInterval(2000, function () {
    if (dash == false) {
        statusbar.value += 1
    }
})
forever(function () {
    pauseUntil(() => browserEvents.MouseLeft.isPressed())
    swordstartup = true
    pause(100)
    swordstartup = false
    pauseUntil(() => !(browserEvents.MouseLeft.isPressed()))
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
    pauseUntil(() => hitstun || pause2(200))
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
        dash = false
        pause(100)
    }
})
forever(function () {
    if (challenger1 == true) {
        challenger1_attack()
    } else if (challenger2 == true) {
        challenger2_attack()
    } else if (challenger3 == true) {
        challenger3_attack()
    }
})
game.onUpdateInterval(500, function () {
    for (let value of sprites.allOfKind(SpriteKind.homing_enemy_projectile)) {
        list = spriteutils.getSpritesWithin(SpriteKind.Player, 100, value)
        list.reverse()
        for (let value2 of list) {
            spriteutils.setVelocityAtAngle(value, spriteutils.angleFrom(value, value2), 100)
        }
    }
})
