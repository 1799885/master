let moveImage: Image = null
moveImage = image.create(scene.screenWidth(), 8)
let moveSprite = sprites.create(moveImage, 0)
moveSprite.x = scene.screenWidth() / 2
moveSprite.y = 4
moveSprite.setFlag(SpriteFlag.Ghost, true)

let currMove: CubeTransform = CubeTransform.Front
writeCurrMove()

let myCube: cube.Cube = cube.buildCube(3)

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    currMove += -1
    if (currMove == CubeTransform.None) {
        currMove = CubeTransform.Standing
    }  // if (currMove === CubeTransform.None)
    writeCurrMove()
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    currMove += 1
    if (currMove == CubeTransform.InsideFront) {
        currMove = CubeTransform.Front
    }  // if (currMove === CubeTransform.InsideFront)
    writeCurrMove()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    myCube.move({transform: currMove, inverse: false})
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    myCube.move({transform: currMove, inverse: true})
})

function writeCurrMove () {
    moveImage.fill(0)
    let m: string = cube.MOVE_NAMES[currMove]
    moveImage.printCenter(m, 1, 5, image.font8)
}   // writeCurrMove()
