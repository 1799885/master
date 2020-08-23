let moveImage: Image = null
moveImage = image.create(scene.screenWidth(), 8)
let moveSprite = sprites.create(moveImage, 0)
moveSprite.x = scene.screenWidth() / 2
moveSprite.y = 4

let currMove: CubeSlice = CubeSlice.Front
writeCurrMove()

let myCube: cube.Cube = cube.buildCube(3)
let mySprite = sprites.create(img`.`)
drawCube()
mySprite.x = 42
mySprite.y = scene.screenHeight() - 42

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    currMove += -1
    if (currMove == CubeSlice.None) {
        currMove = CubeSlice.Standing
    }  // if (currMove === CubeSlice.None)
    writeCurrMove()
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    currMove += 1
    if (currMove == CubeSlice.InsideFront) {
        currMove = CubeSlice.Front
    }  // if (currMove === CubeSlice.InsideFront)
    writeCurrMove()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    myCube.move({slice: currMove, inverse: false})
    drawCube()
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    myCube.move({slice: currMove, inverse: true})
    drawCube()
})

function drawCube() {
    myCube.drawCube({slice: CubeSlice.None, inverse: false})
    mySprite.setImage(myCube.image)
}   // drawCube()

function writeCurrMove () {
    moveImage.fill(0)
    let m: string = cube.SLICE_NAMES[currMove]
    moveImage.printCenter(m, 1)
}   // writeCurrMove()
