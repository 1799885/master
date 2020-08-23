/**
 * Enumerations
 */

/*
// Standard palette
enum Color {
    Transparent, // 0
    White, // 1 = RGB(255, 255, 255)
    Red, // 2 = RGB(255, 33, 33)
    Pink, // 3 = RGB(255, 147, 196)
    Orange, // 4 = RGB(255, 129, 53)
    Yellow, // 5 = RGB(255, 246, 9)
    Aqua, // 6 = RGB(36, 156, 163)
    BrightGreen, // 7 = RGB(120, 220, 82)
    Blue, // 8 = RGB(0, 63, 173)
    LightBlue, // 9 = RGB(135, 242, 255)
    Purple, // 10 = RGB(142, 46, 196)
    RoseBouquet, // 11 = RGB(164, 131, 159)
    Wine, // 12 = RGB(92, 64, 108)
    Bone, // 13 = RGB(229, 205, 196)
    Brown, // 14 = RGB(145, 70, 61)
    Black // 15 = RGB(0, 0, 0)
}   // enum Color
*/

enum CubeRotation {
    x,
    y,
    z
}

enum CubeSlice {
    None, // Placeholder
    Front, // F
    Back, // B
    Up, // U
    Down, // D
    Left, // L
    Right, // R
    Middle, // M, between Left and Right, follows Left
    Equator, // E, between Up and Down, follows Down
    Standing, // S, between Front and Back, follows Front
    InsideFront, // f
    InsideBack, // b
    InsideUp, // u
    InsideDown, // d
    InsideLeft, // l
    InsideRight // r
}   // enum CubeSlice

/**
 * Interfaces
 */

interface CubeDrawInfo {
    fill: CubeFillInfo[]
    lines: CubeLine[]
}   // interface CubeDrawInfo

interface CubeFace {
    locations: CubeLocation[]
}   // interface CubeFace

interface CubeFillInfo {
    face: CubeSlice
    points: CubePoint[]
}   // interface CubeFillInfo

interface CubeFloodPoint {
    color: number[][] // First index is a CubeFace; second index is a location index
    point: CubePoint
}   // interface CubeFloodPoint

interface CubeLine {
    begin: CubePoint
    end: CubePoint
}   // interface CubeLine

interface CubeLocation {
    color: number
}   // interface CubeLocation

interface CubeMove {
    inverse: boolean
    slice: CubeSlice
}   // interface CubeMove

interface CubeTranslation {
    from: {slice: CubeSlice; location: number}
    to: {slice: CubeSlice; location: number}
}   // interface CubeTranlation

interface CubePoint {
    x: number
    y: number
}   // interface CubePoint

namespace cube {
    const COLORS: number[] = [
        15, // None = Black
        8, // Front = Blue
        7, // Back = Green
        1, // Up = White
        5, // Down = Yellow
        2, // Left = Red
        4  // Right = Orange
    ]
    const CUBE_DRAW_INFO: CubeDrawInfo[][] = [
        [], // "zero" cube
        [], // "one" cube
        // 2x2 or junior cube
        [],
        // 3x3 or standard cube
        [
            // None
            {
                fill: [
                    {
                        face: CubeSlice.Front,
                        points: [
                            {x: 7, y: 28},
                            {x: 21, y: 28},
                            {x: 35, y: 28},
                            {x: 7, y: 42},
                            {x: 21, y: 42},
                            {x: 35, y: 42},
                            {x: 7, y: 56},
                            {x: 21, y: 56},
                            {x: 35, y: 56},
                        ]
                    }, {
                        face: CubeSlice.Up,
                        points: [
                            {x: 21, y: 4},
                            {x: 35, y: 4},
                            {x: 49, y: 4},
                            {x: 14, y: 10},
                            {x: 28, y: 10},
                            {x: 42, y: 10},
                            {x: 7, y: 18},
                            {x: 21, y: 18},
                            {x: 35, y: 18},
                        ]
                    }, {
                        face: CubeSlice.Right,
                        points: [
                            {x: 45, y: 25},
                            {x: 49, y: 18},
                            {x: 53, y: 10},
                            {x: 45, y: 39},
                            {x: 49, y: 32},
                            {x: 53, y: 25},
                            {x: 45, y: 53},
                            {x: 49, y: 46},
                            {x: 53, y: 39},
                        ]
                    }
                ],
                lines: [
                    {begin: {x: 0, y: 21}, end: {x: 42, y: 21}},
                    {begin: {x: 0, y: 35}, end: {x: 42, y: 35}},
                    {begin: {x: 0, y: 49}, end: {x: 42, y: 49}},
                    {begin: {x: 0, y: 63}, end: {x: 42, y: 63}},
                    {begin: {x: 0, y: 21}, end: {x: 0, y: 63}},
                    {begin: {x: 14, y: 21}, end: {x: 14, y: 63}},
                    {begin: {x: 28, y: 21}, end: {x: 28, y: 63}},
                    {begin: {x: 42, y: 21}, end: {x: 42, y: 63}},
                    {begin: {x: 14, y: 0}, end: {x: 56, y: 0}},
                    {begin: {x: 14, y: 0}, end: {x: 56, y: 0}},
                    {begin: {x: 9, y: 7}, end: {x: 51, y: 7}},
                    {begin: {x: 5, y: 14}, end: {x: 47, y: 14}},
                    {begin: {x: 14, y: 0}, end: {x: 0, y: 21}},
                    {begin: {x: 28, y: 0}, end: {x: 14, y: 21}},
                    {begin: {x: 42, y: 0}, end: {x: 28, y: 21}},
                    {begin: {x: 56, y: 0}, end: {x: 42, y: 21}},
                    {begin: {x: 47, y: 14}, end: {x: 47, y: 56}},
                    {begin: {x: 51, y: 7}, end: {x: 51, y: 49}},
                    {begin: {x: 56, y: 0}, end: {x: 56, y: 42}},
                    {begin: {x: 42, y: 35}, end: {x: 56, y: 14}},
                    {begin: {x: 42, y: 49}, end: {x: 56, y: 28}},
                    {begin: {x: 42, y: 63}, end: {x: 56, y: 42}}
                ]
            }
        ],
        // 4x4, advanced, or revenge cube
        []
    ]
    const CUBE_MOVES: CubeTranslation[][][] = [
        [[]], // "zero" cube
        [[]], // "one" cube
        [[]], // 2x2 or junior cube
        // 3x3 or stadard cube
        [
            // "None" moves
            [],
            // "Front" moves
            [
                {from: {slice: CubeSlice.Front, location: 0}, to: {slice: CubeSlice.Front, location: 2}},
                {from: {slice: CubeSlice.Front, location: 1}, to: {slice: CubeSlice.Front, location: 5}},
                {from: {slice: CubeSlice.Front, location: 2}, to: {slice: CubeSlice.Front, location: 8}},
                {from: {slice: CubeSlice.Front, location: 3}, to: {slice: CubeSlice.Front, location: 1}},
                {from: {slice: CubeSlice.Front, location: 5}, to: {slice: CubeSlice.Front, location: 7}},
                {from: {slice: CubeSlice.Front, location: 6}, to: {slice: CubeSlice.Front, location: 0}},
                {from: {slice: CubeSlice.Front, location: 7}, to: {slice: CubeSlice.Front, location: 3}},
                {from: {slice: CubeSlice.Front, location: 8}, to: {slice: CubeSlice.Front, location: 6}},
                {from: {slice: CubeSlice.Up, location: 6}, to: {slice: CubeSlice.Right, location: 0}},
                {from: {slice: CubeSlice.Up, location: 7}, to: {slice: CubeSlice.Right, location: 3}},
                {from: {slice: CubeSlice.Up, location: 8}, to: {slice: CubeSlice.Right, location: 6}},
                {from: {slice: CubeSlice.Right, location: 0}, to: {slice: CubeSlice.Down, location: 6}},
                {from: {slice: CubeSlice.Right, location: 3}, to: {slice: CubeSlice.Down, location: 7}},
                {from: {slice: CubeSlice.Right, location: 6}, to: {slice: CubeSlice.Down, location: 8}},
                {from: {slice: CubeSlice.Down, location: 6}, to: {slice: CubeSlice.Left, location: 8}},
                {from: {slice: CubeSlice.Down, location: 7}, to: {slice: CubeSlice.Left, location: 5}},
                {from: {slice: CubeSlice.Down, location: 8}, to: {slice: CubeSlice.Left, location: 2}},
                {from: {slice: CubeSlice.Left, location: 2}, to: {slice: CubeSlice.Up, location: 8}},
                {from: {slice: CubeSlice.Left, location: 5}, to: {slice: CubeSlice.Up, location: 7}},
                {from: {slice: CubeSlice.Left, location: 8}, to: {slice: CubeSlice.Up, location: 6}},
            ],
            // Back moves
            [],
            // Up moves
            [],
            // Down moves
            [],
            // Left moves
            [],
            // Right moves
            [],
            // Middle moves
            [],
            // Equator moves
            [],
            // Standing moves
            []
        ],
        [[]]  // 4x4, advanced, or revenge cube
    ]
    export const ISO_SPRITE_SIZE: number = 64
    export const FACE_SPRITE_SIZE: number = 16
    const LINE_COLOR: number = 12 // Wine
    export const ROTATE_NAMES: string[] = [
        'x',
        'y',
        'z'
    ]
    export const SLICE_NAMES: string[] = [
        'None',
        'Front',
        'Back',
        'Up',
        'Down',
        'Left',
        'Right',
        'Middle',
        'Equator',
        'Standing'
    ]

    export class Cube {
        private _currCube: number
        private _currImage: number
        private _cubes: CubeFace[][]
        private _imgs: Image[]
        private _size: number

        constructor(size: number) {
            this._currCube = 0
            this._cubes = []
            for (let i: number = 0; i <= 1; i++) {
                this._cubes[i] = []
                for (let face: CubeSlice = CubeSlice.Front; face <= CubeSlice.Right; face++) {
                    this._cubes[i][face] = {locations: []}
                    for (let loc: number = 0; loc < size**2; loc++) {
                        this._cubes[i][face].locations[loc] = {color: COLORS[face]}
                    }   // for (loc)
                }   // for (face)
            }   // for (i)

            this._currImage = 0
            this._imgs = [
                image.create(ISO_SPRITE_SIZE, ISO_SPRITE_SIZE),
                image.create(ISO_SPRITE_SIZE, ISO_SPRITE_SIZE)
            ]
            this._size = size
        }   // constructor()

        public get image(): Image {
            return this._imgs[this._currImage]
        }   // get image

        public get size(): number {
            return this._size
        }   // get size

        public drawCube(move: CubeMove): void {
            let currImage: Image = this._imgs[1 - this._currImage]
            let currCube: CubeFace[] = this._cubes[this._currCube]
            let lines: CubeLine[] = CUBE_DRAW_INFO[this._size][move.slice].lines
            let fillInfo: CubeFillInfo[] = CUBE_DRAW_INFO[this._size][move.slice].fill
            currImage.fill(0)
            for (let line of lines) {
                currImage.drawLine(line.begin.x, line.begin.y, line.end.x, line.end.y, LINE_COLOR)
            }   // for (line)
            for (let fi of fillInfo) {
                let faceColors: CubeLocation[] = currCube[fi.face].locations
                for (let i: number = 0; i < this._size**2; i++) {
                    let p: CubePoint = fi.points[i]
                    floodScanline(currImage, p.x, p.y, faceColors[i].color)
                }   // for (p)
            }   // for (fi)
            this._currImage = 1 - this._currImage
        }   // drawCube()

        public move(move: CubeMove): void {
            let currCube: CubeFace[] = this._cubes[this._currCube]
            let newCube: CubeFace[] = this._cubes[1 - this._currCube]

            // Duplicate current cube
            for (let f: CubeSlice = CubeSlice.Front; f <= CubeSlice.Right; f++) {
                for (let i: number = 0; i < this._size**2; i++) {
                    newCube[f].locations[i].color = currCube[f].locations[i].color
                }   // for (i)
            }   // for (f)

            for (let t of CUBE_MOVES[this._size][move.slice]) {
                if (move.inverse) {
                    newCube[t.from.slice].locations[t.from.location].color =
                        currCube[t.to.slice].locations[t.to.location].color
                } else {
                    newCube[t.to.slice].locations[t.to.location].color =
                        currCube[t.from.slice].locations[t.from.location].color
                }   // if (move.inverse)
            }   // for (t)

            this._currCube = 1 - this._currCube
        }   // move()
    }   // class Cube

    export function buildCube(size: number): Cube {
        let toReturn: Cube = new Cube(size)
        return toReturn
    }   // buildCube()

    // https://lodev.org/cgtutor/floodfill.html
    function floodScanline(img: Image, x: number, y: number, c: number) {
        let bgColor: number = img.getPixel(x, y)
        if (bgColor === c) {
            return
        }   // if (img.getPixel(x, y) === c)

        let x1: number
        let spanAbove: boolean
        let spanBelow: boolean
        let stack: CubePoint[] = [{ x: x, y: y }]
        while (stack.length > 0) {
            let p: CubePoint = stack.pop()
            x1 = p.x
            while (x1 >= 0 && img.getPixel(x1, p.y) === bgColor) {
                x1--
            }   // while (x1 >= 0 ...)
            x1++
            spanAbove = false
            spanBelow = false
            while (x1 < img.width && img.getPixel(x1, p.y) === bgColor) {
                img.setPixel(x1, p.y, c)
                if (!spanAbove && p.y > 0 && img.getPixel(x1, p.y - 1) === bgColor) {
                    stack.push({ x: x1, y: p.y - 1 })
                    spanAbove = true
                } else if (spanAbove && p.y > 0 && img.getPixel(x1, p.y - 1) !== bgColor) {
                    spanAbove = false
                }   // if (! spanAbove ...)

                if (!spanBelow && p.y < img.height - 1 && img.getPixel(x1, p.y + 1) === bgColor) {
                    stack.push({ x: x1, y: p.y + 1 })
                    spanBelow = true
                } else if (spanBelow && p.y < img.height - 1 && img.getPixel(x1, p.y + 1) !== bgColor) {
                    spanBelow = false
                }   // if (! spanBelow ...)
                x1++
            }   // while (x1 < img.width && ...)
        }   // while (stack)
    }   // floodScanline()
}   // namespace cube