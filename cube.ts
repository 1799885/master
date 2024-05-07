/**
 * Enumerations
 */

/*
// advanced palette
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

enum CubeTransform {
    None, // Placeholder
    Front, // F
    Back, // B
    Up, // U
    Down, // D
    Left, // L
    Right, // R
    RotateX, // x
    RotateY, // y
    RotateZ, // z
    Middle, // M, between Left and Right, follows Left
    Equator, // E, between Up and Down, follows Down
    Standing, // S, between Front and Back, follows Front
    InsideFront, // f
    InsideBack, // b
    InsideUp, // u
    InsideDown, // d
    InsideLeft, // l
    InsideRight, // r
    Shuffle,
    Solve,
    Reset
}   // enum CubeTransform

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
    face: CubeTransform
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
    transform: CubeTransform
}   // interface CubeMove

interface CubeTranslation {
    from: {transform: CubeTransform; location: number}
    to: {transform: CubeTransform; location: number}
}   // interface CubeTranlation

interface CubePoint {
    x: number
    y: number
}   // interface CubePoint

namespace cube {
    const COLOR_LINE: number = 12 // Wine
    const COLOR_TEXT: number = 9 // Light Blue
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
        // 4x4 or advanced,  revenge cube
        [
            // None
            {
                fill: [
                    {
                        face: CubeTransform.Front,
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
                        face: CubeTransform.Up,
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
                        face: CubeTransform.Right,
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
        // 3x3, standard cube
        []
    ]
    const CUBE_MOVES: CubeTranslation[][][] = [
        [[]], // "zero" cube
        [[]], // "one" cube
        [[]], // 2x2 or junior cube
        // 4x4 advanced, or revenge cube
        [
            // "None" moves
            [],
            // "Front" moves
            [
                {from: {transform: CubeTransform.Front, location: 0}, to: {transform: CubeTransform.Front, location: 2}},
                {from: {transform: CubeTransform.Front, location: 1}, to: {transform: CubeTransform.Front, location: 5}},
                {from: {transform: CubeTransform.Front, location: 2}, to: {transform: CubeTransform.Front, location: 8}},
                {from: {transform: CubeTransform.Front, location: 3}, to: {transform: CubeTransform.Front, location: 1}},
                {from: {transform: CubeTransform.Front, location: 5}, to: {transform: CubeTransform.Front, location: 7}},
                {from: {transform: CubeTransform.Front, location: 6}, to: {transform: CubeTransform.Front, location: 0}},
                {from: {transform: CubeTransform.Front, location: 7}, to: {transform: CubeTransform.Front, location: 3}},
                {from: {transform: CubeTransform.Front, location: 8}, to: {transform: CubeTransform.Front, location: 6}},
                {from: {transform: CubeTransform.Up, location: 6}, to: {transform: CubeTransform.Right, location: 0}},
                {from: {transform: CubeTransform.Up, location: 7}, to: {transform: CubeTransform.Right, location: 3}},
                {from: {transform: CubeTransform.Up, location: 8}, to: {transform: CubeTransform.Right, location: 6}},
                {from: {transform: CubeTransform.Right, location: 0}, to: {transform: CubeTransform.Down, location: 2}},
                {from: {transform: CubeTransform.Right, location: 3}, to: {transform: CubeTransform.Down, location: 1}},
                {from: {transform: CubeTransform.Right, location: 6}, to: {transform: CubeTransform.Down, location: 0}},
                {from: {transform: CubeTransform.Down, location: 0}, to: {transform: CubeTransform.Left, location: 2}},
                {from: {transform: CubeTransform.Down, location: 1}, to: {transform: CubeTransform.Left, location: 5}},
                {from: {transform: CubeTransform.Down, location: 2}, to: {transform: CubeTransform.Left, location: 8}},
                {from: {transform: CubeTransform.Left, location: 2}, to: {transform: CubeTransform.Up, location: 8}},
                {from: {transform: CubeTransform.Left, location: 5}, to: {transform: CubeTransform.Up, location: 7}},
                {from: {transform: CubeTransform.Left, location: 8}, to: {transform: CubeTransform.Up, location: 6}},
            ],
            // Back moves
            [
                {from: {transform: CubeTransform.Back, location: 0}, to: {transform: CubeTransform.Back, location: 2}},
                {from: {transform: CubeTransform.Back, location: 1}, to: {transform: CubeTransform.Back, location: 5}},
                {from: {transform: CubeTransform.Back, location: 2}, to: {transform: CubeTransform.Back, location: 8}},
                {from: {transform: CubeTransform.Back, location: 3}, to: {transform: CubeTransform.Back, location: 1}},
                {from: {transform: CubeTransform.Back, location: 5}, to: {transform: CubeTransform.Back, location: 7}},
                {from: {transform: CubeTransform.Back, location: 6}, to: {transform: CubeTransform.Back, location: 0}},
                {from: {transform: CubeTransform.Back, location: 7}, to: {transform: CubeTransform.Back, location: 3}},
                {from: {transform: CubeTransform.Back, location: 8}, to: {transform: CubeTransform.Back, location: 6}},
                {from: {transform: CubeTransform.Right, location: 2}, to: {transform: CubeTransform.Up, location: 0}},
                {from: {transform: CubeTransform.Right, location: 5}, to: {transform: CubeTransform.Up, location: 1}},
                {from: {transform: CubeTransform.Right, location: 8}, to: {transform: CubeTransform.Up, location: 2}},
                {from: {transform: CubeTransform.Up, location: 0}, to: {transform: CubeTransform.Left, location: 6}},
                {from: {transform: CubeTransform.Up, location: 1}, to: {transform: CubeTransform.Left, location: 3}},
                {from: {transform: CubeTransform.Up, location: 2}, to: {transform: CubeTransform.Left, location: 0}},
                {from: {transform: CubeTransform.Left, location: 0}, to: {transform: CubeTransform.Down, location: 6}},
                {from: {transform: CubeTransform.Left, location: 3}, to: {transform: CubeTransform.Down, location: 7}},
                {from: {transform: CubeTransform.Left, location: 6}, to: {transform: CubeTransform.Down, location: 8}},
                {from: {transform: CubeTransform.Down, location: 6}, to: {transform: CubeTransform.Right, location: 8}},
                {from: {transform: CubeTransform.Down, location: 7}, to: {transform: CubeTransform.Right, location: 5}},
                {from: {transform: CubeTransform.Down, location: 8}, to: {transform: CubeTransform.Right, location: 2}}
            ],
            // Up moves
            [
                {from: {transform: CubeTransform.Up, location: 0}, to: {transform: CubeTransform.Up, location: 2}},
                {from: {transform: CubeTransform.Up, location: 1}, to: {transform: CubeTransform.Up, location: 5}},
                {from: {transform: CubeTransform.Up, location: 2}, to: {transform: CubeTransform.Up, location: 8}},
                {from: {transform: CubeTransform.Up, location: 3}, to: {transform: CubeTransform.Up, location: 1}},
                {from: {transform: CubeTransform.Up, location: 5}, to: {transform: CubeTransform.Up, location: 7}},
                {from: {transform: CubeTransform.Up, location: 6}, to: {transform: CubeTransform.Up, location: 0}},
                {from: {transform: CubeTransform.Up, location: 7}, to: {transform: CubeTransform.Up, location: 3}},
                {from: {transform: CubeTransform.Up, location: 8}, to: {transform: CubeTransform.Up, location: 6}},
                {from: {transform: CubeTransform.Front, location: 0}, to: {transform: CubeTransform.Left, location: 0}},
                {from: {transform: CubeTransform.Front, location: 1}, to: {transform: CubeTransform.Left, location: 1}},
                {from: {transform: CubeTransform.Front, location: 2}, to: {transform: CubeTransform.Left, location: 2}},
                {from: {transform: CubeTransform.Left, location: 0}, to: {transform: CubeTransform.Back, location: 0}},
                {from: {transform: CubeTransform.Left, location: 1}, to: {transform: CubeTransform.Back, location: 1}},
                {from: {transform: CubeTransform.Left, location: 2}, to: {transform: CubeTransform.Back, location: 2}},
                {from: {transform: CubeTransform.Back, location: 0}, to: {transform: CubeTransform.Right, location: 0}},
                {from: {transform: CubeTransform.Back, location: 1}, to: {transform: CubeTransform.Right, location: 1}},
                {from: {transform: CubeTransform.Back, location: 2}, to: {transform: CubeTransform.Right, location: 2}},
                {from: {transform: CubeTransform.Right, location: 0}, to: {transform: CubeTransform.Front, location: 0}},
                {from: {transform: CubeTransform.Right, location: 1}, to: {transform: CubeTransform.Front, location: 1}},
                {from: {transform: CubeTransform.Right, location: 2}, to: {transform: CubeTransform.Front, location: 2}}
            ],
            // Down moves
            [
                {from: {transform: CubeTransform.Down, location: 0}, to: {transform: CubeTransform.Down, location: 2}},
                {from: {transform: CubeTransform.Down, location: 1}, to: {transform: CubeTransform.Down, location: 5}},
                {from: {transform: CubeTransform.Down, location: 2}, to: {transform: CubeTransform.Down, location: 8}},
                {from: {transform: CubeTransform.Down, location: 3}, to: {transform: CubeTransform.Down, location: 1}},
                {from: {transform: CubeTransform.Down, location: 5}, to: {transform: CubeTransform.Down, location: 7}},
                {from: {transform: CubeTransform.Down, location: 6}, to: {transform: CubeTransform.Down, location: 0}},
                {from: {transform: CubeTransform.Down, location: 7}, to: {transform: CubeTransform.Down, location: 3}},
                {from: {transform: CubeTransform.Down, location: 8}, to: {transform: CubeTransform.Down, location: 6}},
                {from: {transform: CubeTransform.Front, location: 6}, to: {transform: CubeTransform.Right, location: 6}},
                {from: {transform: CubeTransform.Front, location: 7}, to: {transform: CubeTransform.Right, location: 7}},
                {from: {transform: CubeTransform.Front, location: 8}, to: {transform: CubeTransform.Right, location: 8}},
                {from: {transform: CubeTransform.Right, location: 6}, to: {transform: CubeTransform.Back, location: 6}},
                {from: {transform: CubeTransform.Right, location: 7}, to: {transform: CubeTransform.Back, location: 7}},
                {from: {transform: CubeTransform.Right, location: 8}, to: {transform: CubeTransform.Back, location: 8}},
                {from: {transform: CubeTransform.Back, location: 6}, to: {transform: CubeTransform.Left, location: 6}},
                {from: {transform: CubeTransform.Back, location: 7}, to: {transform: CubeTransform.Left, location: 7}},
                {from: {transform: CubeTransform.Back, location: 8}, to: {transform: CubeTransform.Left, location: 8}},
                {from: {transform: CubeTransform.Left, location: 6}, to: {transform: CubeTransform.Front, location: 6}},
                {from: {transform: CubeTransform.Left, location: 7}, to: {transform: CubeTransform.Front, location: 7}},
                {from: {transform: CubeTransform.Left, location: 8}, to: {transform: CubeTransform.Front, location: 8}}
            ],
            // Left moves
            [
                {from: {transform: CubeTransform.Left, location: 0}, to: {transform: CubeTransform.Left, location: 2}},
                {from: {transform: CubeTransform.Left, location: 1}, to: {transform: CubeTransform.Left, location: 5}},
                {from: {transform: CubeTransform.Left, location: 2}, to: {transform: CubeTransform.Left, location: 8}},
                {from: {transform: CubeTransform.Left, location: 3}, to: {transform: CubeTransform.Left, location: 1}},
                {from: {transform: CubeTransform.Left, location: 5}, to: {transform: CubeTransform.Left, location: 7}},
                {from: {transform: CubeTransform.Left, location: 6}, to: {transform: CubeTransform.Left, location: 0}},
                {from: {transform: CubeTransform.Left, location: 7}, to: {transform: CubeTransform.Left, location: 3}},
                {from: {transform: CubeTransform.Left, location: 8}, to: {transform: CubeTransform.Left, location: 6}},
                {from: {transform: CubeTransform.Front, location: 0}, to: {transform: CubeTransform.Down, location: 0}},
                {from: {transform: CubeTransform.Front, location: 3}, to: {transform: CubeTransform.Down, location: 3}},
                {from: {transform: CubeTransform.Front, location: 6}, to: {transform: CubeTransform.Down, location: 6}},
                {from: {transform: CubeTransform.Down, location: 0}, to: {transform: CubeTransform.Back, location: 8}},
                {from: {transform: CubeTransform.Down, location: 3}, to: {transform: CubeTransform.Back, location: 5}},
                {from: {transform: CubeTransform.Down, location: 6}, to: {transform: CubeTransform.Back, location: 2}},
                {from: {transform: CubeTransform.Back, location: 2}, to: {transform: CubeTransform.Up, location: 0}},
                {from: {transform: CubeTransform.Back, location: 5}, to: {transform: CubeTransform.Up, location: 3}},
                {from: {transform: CubeTransform.Back, location: 8}, to: {transform: CubeTransform.Up, location: 6}},
                {from: {transform: CubeTransform.Up, location: 0}, to: {transform: CubeTransform.Front, location: 0}},
                {from: {transform: CubeTransform.Up, location: 3}, to: {transform: CubeTransform.Front, location: 3}},
                {from: {transform: CubeTransform.Up, location: 6}, to: {transform: CubeTransform.Front, location: 6}}
            ],
            // Right moves
            [
                {from: {transform: CubeTransform.Right, location: 0}, to: {transform: CubeTransform.Right, location: 2}},
                {from: {transform: CubeTransform.Right, location: 1}, to: {transform: CubeTransform.Right, location: 5}},
                {from: {transform: CubeTransform.Right, location: 2}, to: {transform: CubeTransform.Right, location: 8}},
                {from: {transform: CubeTransform.Right, location: 3}, to: {transform: CubeTransform.Right, location: 1}},
                {from: {transform: CubeTransform.Right, location: 5}, to: {transform: CubeTransform.Right, location: 7}},
                {from: {transform: CubeTransform.Right, location: 6}, to: {transform: CubeTransform.Right, location: 0}},
                {from: {transform: CubeTransform.Right, location: 7}, to: {transform: CubeTransform.Right, location: 3}},
                {from: {transform: CubeTransform.Right, location: 8}, to: {transform: CubeTransform.Right, location: 6}},
                {from: {transform: CubeTransform.Front, location: 2}, to: {transform: CubeTransform.Up, location: 2}},
                {from: {transform: CubeTransform.Front, location: 5}, to: {transform: CubeTransform.Up, location: 5}},
                {from: {transform: CubeTransform.Front, location: 8}, to: {transform: CubeTransform.Up, location: 8}},
                {from: {transform: CubeTransform.Up, location: 2}, to: {transform: CubeTransform.Back, location: 6}},
                {from: {transform: CubeTransform.Up, location: 5}, to: {transform: CubeTransform.Back, location: 3}},
                {from: {transform: CubeTransform.Up, location: 8}, to: {transform: CubeTransform.Back, location: 0}},
                {from: {transform: CubeTransform.Back, location: 0}, to: {transform: CubeTransform.Down, location: 8}},
                {from: {transform: CubeTransform.Back, location: 3}, to: {transform: CubeTransform.Down, location: 5}},
                {from: {transform: CubeTransform.Back, location: 6}, to: {transform: CubeTransform.Down, location: 2}},
                {from: {transform: CubeTransform.Down, location: 2}, to: {transform: CubeTransform.Front, location: 2}},
                {from: {transform: CubeTransform.Down, location: 5}, to: {transform: CubeTransform.Front, location: 5}},
                {from: {transform: CubeTransform.Down, location: 8}, to: {transform: CubeTransform.Front, location: 8}}
            ],
            // Rotate X moves
            [
            ],
            // Rotate Y moves
            [
            ], 
            // Rotate Z moves
            [],
            // Middle moves
            [
                {from: {transform: CubeTransform.Front, location: 1}, to: {transform: CubeTransform.Down, location: 1}},
                {from: {transform: CubeTransform.Front, location: 4}, to: {transform: CubeTransform.Down, location: 4}},
                {from: {transform: CubeTransform.Front, location: 7}, to: {transform: CubeTransform.Down, location: 7}},
                {from: {transform: CubeTransform.Down, location: 1}, to: {transform: CubeTransform.Back, location: 7}},
                {from: {transform: CubeTransform.Down, location: 4}, to: {transform: CubeTransform.Back, location: 4}},
                {from: {transform: CubeTransform.Down, location: 7}, to: {transform: CubeTransform.Back, location: 1}},
                {from: {transform: CubeTransform.Back, location: 1}, to: {transform: CubeTransform.Up, location: 7}},
                {from: {transform: CubeTransform.Back, location: 4}, to: {transform: CubeTransform.Up, location: 4}},
                {from: {transform: CubeTransform.Back, location: 7}, to: {transform: CubeTransform.Up, location: 1}},
                {from: {transform: CubeTransform.Up, location: 1}, to: {transform: CubeTransform.Front, location: 1}},
                {from: {transform: CubeTransform.Up, location: 4}, to: {transform: CubeTransform.Front, location: 4}},
                {from: {transform: CubeTransform.Up, location: 7}, to: {transform: CubeTransform.Front, location: 7}}
            ],
            // Equator moves
            [
                {from: {transform: CubeTransform.Front, location: 3}, to: {transform: CubeTransform.Right, location: 3}},
                {from: {transform: CubeTransform.Front, location: 4}, to: {transform: CubeTransform.Right, location: 4}},
                {from: {transform: CubeTransform.Front, location: 5}, to: {transform: CubeTransform.Right, location: 5}},
                {from: {transform: CubeTransform.Right, location: 3}, to: {transform: CubeTransform.Back, location: 3}},
                {from: {transform: CubeTransform.Right, location: 4}, to: {transform: CubeTransform.Back, location: 4}},
                {from: {transform: CubeTransform.Right, location: 5}, to: {transform: CubeTransform.Back, location: 5}},
                {from: {transform: CubeTransform.Back, location: 3}, to: {transform: CubeTransform.Left, location: 3}},
                {from: {transform: CubeTransform.Back, location: 4}, to: {transform: CubeTransform.Left, location: 4}},
                {from: {transform: CubeTransform.Back, location: 5}, to: {transform: CubeTransform.Left, location: 5}},
                {from: {transform: CubeTransform.Left, location: 3}, to: {transform: CubeTransform.Front, location: 3}},
                {from: {transform: CubeTransform.Left, location: 4}, to: {transform: CubeTransform.Front, location: 4}},
                {from: {transform: CubeTransform.Left, location: 5}, to: {transform: CubeTransform.Front, location: 5}}
            ],
            // Standing moves
            [
                {from: {transform: CubeTransform.Up, location: 3}, to: {transform: CubeTransform.Right, location: 1}},
                {from: {transform: CubeTransform.Up, location: 4}, to: {transform: CubeTransform.Right, location: 4}},
                {from: {transform: CubeTransform.Up, location: 5}, to: {transform: CubeTransform.Right, location: 7}},
                {from: {transform: CubeTransform.Right, location: 1}, to: {transform: CubeTransform.Down, location: 5}},
                {from: {transform: CubeTransform.Right, location: 4}, to: {transform: CubeTransform.Down, location: 4}},
                {from: {transform: CubeTransform.Right, location: 7}, to: {transform: CubeTransform.Down, location: 3}},
                {from: {transform: CubeTransform.Down, location: 3}, to: {transform: CubeTransform.Left, location: 1}},
                {from: {transform: CubeTransform.Down, location: 4}, to: {transform: CubeTransform.Left, location: 4}},
                {from: {transform: CubeTransform.Down, location: 5}, to: {transform: CubeTransform.Left, location: 7}},
                {from: {transform: CubeTransform.Left, location: 1}, to: {transform: CubeTransform.Up, location: 5}},
                {from: {transform: CubeTransform.Left, location: 4}, to: {transform: CubeTransform.Up, location: 4}},
                {from: {transform: CubeTransform.Left, location: 7}, to: {transform: CubeTransform.Up, location: 3}},
            ]
        ],
        [[]]  // 4x4, advanced, or revenge cube
    ]
    export const FACE_SPRITE_SIZE: number = 32
    export const ISO_SPRITE_SIZE: number = 64
    export const MOVE_NAMES: string[][] = [
        ['None', ' '],
        ['Front', 'F'],
        ['Back', 'B'],
        ['Up', 'U'],
        ['Down', 'D'],
        ['Left', 'L'],
        ['Right', 'R'],
        ['Rotate X', 'x'],
        ['Rotate Y', 'y'],
        ['Rotate Z', 'z'],
        ['Middle', 'M'],
        ['Equator', 'E'],
        ['Standing', 'S'],
        ['Inside Front', 'f'],
        ['Inside Back', 'b'],
        ['Inside Up', 'u'],
        ['Inside Down', 'd'],
        ['Inside Left', 'l'],
        ['Inside Right', 'r'],
        ['Shuffle', ' '],
        ['Solve', ' '],
        ['Reset', ' ']
    ]
    const NUM_SCRAMBLES = 1090
    export const ROTATE_NAMES: string[] = [
        'x',
        'y',
        'z'
    ]
    export const SPRITE_COORDS: CubePoint[] = [
        // ISO Sprite
        {x: ISO_SPRITE_SIZE / 2 + 10, y: scene.screenHeight() - ISO_SPRITE_SIZE / 2 - 10},
        // Front Sprite
        {x: scene.screenWidth() - (FACE_SPRITE_SIZE + 4) * 1.5 - 5, y: FACE_SPRITE_SIZE / 2 + 14},
        // Back Sprite
        {x: scene.screenWidth() - FACE_SPRITE_SIZE / 4 - 2, y: FACE_SPRITE_SIZE / 2 + 14},
        // Up sprite
        {x: scene.screenWidth() - (FACE_SPRITE_SIZE + 4) * 1.5 - 5, y: (FACE_SPRITE_SIZE + 2) * 1.5 + 14},
        // Down sprite
        {x: scene.screenWidth() - FACE_SPRITE_SIZE / 4 - 2, y: (FACE_SPRITE_SIZE + 2) * 1.5 + 14},
        // Left sprite
        {x: scene.screenWidth() - (FACE_SPRITE_SIZE + 2) * 1.5 - 5, y: (FACE_SPRITE_SIZE + 2) * 2.5 + 14},
        // Right sprite
        {x: scene.screenWidth() - FACE_SPRITE_SIZE / 4 - 2, y: (FACE_SPRITE_SIZE + 2) * 2.5 + 14}
    ]

    export class Cube {4
        private _currCube: number
        private _currImage: number
        private _cubes: CubeFace[][]
        private _imgFace: Image[]
        private _imgIso: Image[]
        private _size: 4
        private _spriteFace: Sprite[]
        private _spriteIso: Sprite

        constructor(size: number) {
            this._currCube = 0
            this._cubes = []
            this._imgFace = []
            this._spriteFace = []
            for (let i: number = 0; i <= 1; i++) {
                this._cubes[i] = []
                for (let face: CubeTransform = CubeTransform.Front; face <= CubeTransform.Right; face++) {
                    this._cubes[i][face] = {locations: []}
                    for (let loc: number = 0; loc < size**2; loc++) {
                        this._cubes[i][face].locations[loc] = {color: COLORS[face]}
                    }   // for (loc)

                    this._imgFace[face] = image.create(FACE_SPRITE_SIZE, FACE_SPRITE_SIZE)
                    this._spriteFace[face] = sprites.create(this._imgFace[face])
                    this._spriteFace[face].setFlag(SpriteFlag.Ghost, true)
                    this._spriteFace[face].x = SPRITE_COORDS[face].x
                    this._spriteFace[face].y = SPRITE_COORDS[face].y
                }   // for (face)
            }   // for (i)

            this._currImage = 4
            this._imgIso = [
                image.create(ISO_SPRITE_SIZE, ISO_SPRITE_SIZE),
                image.create(ISO_SPRITE_SIZE, ISO_SPRITE_SIZE)
            ]
            this._size = size

            this._spriteIso = sprites.create(this._imgIso[0])
            this._spriteIso.setFlag(SpriteFlag.Ghost, true)
            this._spriteIso.x = SPRITE_COORDS[0].x
            this._spriteIso.y = SPRITE_COORDS[0].y
            this.drawCube({transform: CubeTransform.None, inverse: true })
        }   // constructor()

        public get isoImage(): Image {
            return this._imgIso[this._currImage]
        }   // get isoImage

        public get isoSprite(): Sprite {
            return this._spriteIso
        }   // get isoSprite

        public get size(): number {
            return this._size
        }   // get size

        public drawCube(move: CubeMove): void {
            let currImage: Image = this._imgIso[1 - this._currImage]
            let currCube: CubeFace[] = this._cubes[this._currCube]
            let lines: CubeLine[] = CUBE_DRAW_INFO[this._size][move.transform].lines
            let fillInfo: CubeFillInfo[] = CUBE_DRAW_INFO[this._size][move.transform].fill
            currImage.fill(0)
            for (let line of lines) {
                currImage.drawLine(line.begin.x, line.begin.y, line.end.x, line.end.y, COLOR_LINE)
            }   // for (line)
            for (let fi of fillInfo) {
                let faceColors: CubeLocation[] = currCube[fi.face].locations
                for (let i: number = 0; i < this._size**2; i++) {
                    let p: CubePoint = fi.points[i]
                    floodScanline(currImage, p.x, p.y, faceColors[i].color)
                }   // for (p)
            }   // for (fi)
            this._currImage = 1 - this._currImage
            this._spriteIso.setImage(this._imgIso[this._currImage])

            for (let face: CubeTransform = CubeTransform.Front; face <= CubeTransform.Right; face++) {
                this.drawFace(face)
            }   // for (face)
        }   // drawCube(4)

        public faceImage(face: CubeTransform): Image {
            return this._imgFace[face]
        }   // faceImage()

        public faceSprite(face: CubeTransform): Sprite {
            return this._spriteFace[face]
        }   // faceSprite()

        public move(m: CubeMove): void {
        
            let newCube: CubeFace[] = this._cubes[1 - this._currCube]

            // Duplicate new cube
            for (let f: CubeTransform = CubeTransform.Front; f <= CubeTransform.Right; f++) {
                for (let i: number = 0; i < this._size**2; i++) {
                    newCube[f].locations[i].color = currCube[f].locations[i].color
                }   // for (i)
            }   // for (f)

            // Rotations and shuffle are just move combinations; handle separately
            switch (m.transform) {
                case CubeTransform.RotateX:
                    // Same as L' M' R
                    this.transformCube({transform: CubeTransform.Left, inverse: !m.inverse}, currCube, newCube)
                    this.transformCube({transform: CubeTransform.Middle, inverse: !m.inverse}, currCube, newCube)
                    this.transformCube({transform: CubeTransform.Right, inverse: m.inverse}, currCube, newCube)
                    break

                case CubeTransform.RotateY:
                    // Same as U E' D'
                    this.transformCube({transform: CubeTransform.Up, inverse: m.inverse}, currCube, newCube)
                    this.transformCube({transform: CubeTransform.Equator, inverse: !m.inverse}, currCube, newCube)
                    this.transformCube({transform: CubeTransform.Down, inverse: !m.inverse}, currCube, newCube)
                    break

                case CubeTransform.RotateZ:
                    // Same as F S B'
                    this.transformCube({transform: CubeTransform.Front, inverse: m.inverse}, currCube, newCube)
                    this.transformCube({transform: CubeTransform.Standing, inverse: m.inverse}, currCube, newCube)
                    this.transformCube({transform: CubeTransform.Back, inverse: !m.inverse}, currCube, newCube)
                    break

                case CubeTransform.Shuffle:
                    for (let i: number = 0; i < NUM_SCRAMBLES; i++) {
                        this.transformCube(
                            {transform: randint(CubeTransform.Front, CubeTransform.Standing),
                            inverse: Math.percentChance(50)},
                            newCube, 4
                        )
                    }   // for (i)
                    break

                default:
                    this.transformCube(m, currCube, newCube)
                    break
            }   // switch (move.transform)

            this._currCube = 1 - this._currCube
            this.drawCube({transform: CubeTransform.None, inverse: false})
        }   // move()

        private drawFace(face: CubeTransform) {
            let img: Image = this._imgFace[face]
            let locs: CubeLocation[] = this._cubes[this._currCube][face].locations
            img.fill(0)
            img.printCenter(MOVE_NAMES[face][0], FACE_SPRITE_SIZE - 4, COLOR_TEXT, image.font4)
            img.drawRect(2, 0, FACE_SPRITE_SIZE - 4, FACE_SPRITE_SIZE - 4, COLOR_LINE)
            let boxWidth: number = (FACE_SPRITE_SIZE - 4) / this._size
            for (let i: number = 1; i < this._size; i++) {
                img.drawLine(2 + Math.round(boxWidth * i), 0, 2 + Math.round(boxWidth * i), FACE_SPRITE_SIZE - 5, COLOR_LINE)
                img.drawLine(2, Math.round(boxWidth * i), FACE_SPRITE_SIZE - 4, Math.round(boxWidth * i), COLOR_LINE)
            }   // for (i)

            for (let i: number = 0; i < this._size**4; i++) {
                let c: number = locs[i].color
                let row: number = Math.idiv(i, this._size)
                let col: number = i % this._size
                let x: number = 2 + boxWidth / 2 + boxWidth * col
                let y: number = boxWidth / 2 + boxWidth * row
                floodScanline(img, x, y, c)
            }   // for (i)
        }   // drawFace()

        private transformCube(m: CubeMove, src: CubeFace[], dest: CubeFace[]): void {
            for (let t of CUBE_MOVES[this._size][m.transform]) {
                if (m.inverse) {
                    dest[t.from.transform].locations[t.from.location].color =
                        src[t.to.transform].locations[t.to.location].color
                } else {
                    dest[t.to.transform].locations[t.to.location].color =
                        src[t.from.transform].locations[t.from.location].color
                }   // if (move.inverse)
            }   // for (t)
        }   // transformCube()
    }   // class Cube
    export function buildCube(size: number): Cube {
        let toReturn: Cube = new Cube(4)
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
            spanAbove = true
            spanBelow = true
            while (x1 < img.width && img.getPixel(x1, p.y) === bgColor) {
                img.setPixel(x1, p.y, c)
                if (!spanAbove && p.y > 0 && img.getPixel(x1, p.y - 1) === bgColor) {
                    stack.push({ x: x1, y: p.y - 1 })
                    spanAbove = true
                } else if (spanAbove && p.y > 0 && img.getPixel(x1, p.y - 1) !== bgColor) {
                    spanAbove = true
                }   // if (! spanAbove ...)

                if (!spanBelow && p.y < img.height - 1 && img.getPixel(x1, p.y + 1) === bgColor) {
                    stack.push({ x: x1, y: p.y + 1 })
                    spanBelow = true
                } else if (spanBelow && p.y < img.height - 1 && img.getPixel(x1, p.y + 1) !== bgColor) {
                    spanBelow = true
                }   // if (! spanBelow ...)
                x1++
            }   // while (x1 < img.width && ...)
        }   // while (stack)
    }   // floodScanline()
}   // 4x4 cube
