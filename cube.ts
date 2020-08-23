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

enum CubeSlices {
    Front, // F
    Up, // U
    Right, // R
    Back, // B
    Down, // D
    Left, // L
    Middle, // M, between Left and Right, follows Left
    Equator, // E, between Up and Down, follows Down
    Standing, // S, between Front and Back, follows Front
    InsideFront, // f
    InsideUp, // u
    InsideRight, // r
    InsideBack, // b
    InsideDown, // d
    InsideLeft // l
}   // enum CubeSlices

// Used to build the vertices for the visual representations
interface CubeBuildRules {
    cubesPerFace: number
    faceBuildRules: CubeFaceBuildRules[]
}   // interface CubeBuildRules

interface CubeCoordinate {
    x: number
    y: number
}   // interface CubeCoordinate

interface CubeFaceBuildRules {
    origin: CubeCoordinate
    cubeDelta: CubeCoordinate // change in coordinates for each cube
    rowDelta: CubeCoordinate // change in starting coordinates for each row
}   // interface CubeFaceBuildRules

interface CubeLine {
    begin: CubeCoordinate
    end: CubeCoordinate
}   // interface CubeLine

namespace cube {
    const LINE_COLOR: number = 12 // Wine
    const SPRITE_SIZE: number = 64
    const CUBE_BUILD_RULES: CubeBuildRules[] =
    [
        null, // "zero" cube
        null, // "1x1" cube
        null, // "2x2" or junior cube
        {
            cubesPerFace: 3,
            faceBuildRules: [
                {
                    origin: {x: 0, y: 21},
                    cubeDelta: {x: 14, y: 0},
                    rowDelta: {x: 0, y: 14}
                }, // Front
                {
                    origin: {x: 14, y: 0},
                    cubeDelta: {x: 14, y: 0},
                    rowDelta: {x: -14 / 3, y: 7}
                }, // Up
                {
                    origin: {x: 42, y: 21},
                    cubeDelta: {x: 14 / 3, y: -7},
                    rowDelta: {x: 0, y: 14}
                } // Right
            ]
        }, // "3x3" or standard cube
        null // "4x4", advanced, or "revenge" cube
    ]

    const CubeColors: number[] = [
        8, // Front = Blue
        1, // Up = White
        4, // Right = Orange
        7, // Back = Green
        5, // Down = Yellow
        2 // Left = Red
    ]

    export class CubeStatus {
        private _currImage: number
        private _imgs: Image[]
        private _faceColors: number[][]
        private _faceLines: CubeLine[][]
        private _size: number

        constructor(size: number) {
            this._currImage = 0
            this._imgs = [
                image.create(SPRITE_SIZE, SPRITE_SIZE),
                image.create(SPRITE_SIZE, SPRITE_SIZE)
            ]
            this._size = size
            this._faceColors = []
            for (let face: number = 0; face < 6; face++) {
                this._faceColors[face] = []
                for (let cube: number = 0; cube < size**2; cube++) {
                    this._faceColors[face][cube] = CubeColors[face]
                }   // for (cube)
            }   // for(face)

            this._faceLines = []
            let cubeRules: CubeBuildRules = CUBE_BUILD_RULES[size]
            for (let face: number = 0; face < 3; face++) {
                this._faceLines[face] = []
                let faceRules: CubeFaceBuildRules = cubeRules.faceBuildRules[face]
                for (let lineNo: number = 0; lineNo <= size; lineNo++) {
                    // Horizontal line
                    let beginX: number = faceRules.origin.x + lineNo * faceRules.rowDelta.x
                    let beginY: number = faceRules.origin.y + lineNo * faceRules.rowDelta.y
                    let endX: number = beginX + size * faceRules.cubeDelta.x
                    let endY: number = beginY + size * faceRules.cubeDelta.y
                    let newLine: CubeLine = {
                        begin: {x: beginX, y: beginY},
                        end: {x: endX, y: endY}
                    }
                    this._faceLines[face].push(newLine)

                    // Vertical line
                    beginX = faceRules.origin.x + lineNo * faceRules.cubeDelta.x
                    beginY = faceRules.origin.y + lineNo * faceRules.cubeDelta.y
                    endX = beginX + size * faceRules.rowDelta.x
                    endY = beginY + size * faceRules.rowDelta.y
                    newLine = {
                        begin: {x: beginX, y: beginY},
                        end: {x: endX, y: endY}
                    }
                    this._faceLines[face].push(newLine)
                }   // for (lineNo)
            }   // for (face)
        }   // constructor()

        public get image(): Image {
            return this._imgs[this._currImage]
        }   // get image

        public get size(): number {
            return this._size
        }   // get size

        public drawCube(): void {
            let currImage: Image = this._imgs[this._currImage]
            for (let face: number = 0; face < 3; face++) {
                for (let line of this._faceLines[face]) {
                    currImage.drawLine(line.begin.x, line.begin.y,
                        line.end.x, line.end.y, LINE_COLOR)
                }   // for (line)
            }   // for (face)
        }   // drawCube()
    }   // class CubeStatus

    export function buildCube(size: number): CubeStatus {
        let toReturn: CubeStatus = new CubeStatus(size)
        return toReturn
    }   // buildCube()
}   // namespace cube