let myCube: cube.CubeStatus = cube.buildCube(3)
myCube.drawCube()
let mySprite: Sprite = sprites.create(
    myCube.image
)
mySprite.x = 42
mySprite.y = scene.screenHeight() - 42