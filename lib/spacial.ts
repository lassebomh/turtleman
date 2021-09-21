
export type point = [number, number, number]

export function getNeighbors(point: point): point[] {
    
    const diffs = [
        [1,0,0],
        [-1,0,0],
        [0,1,0],
        [0,-1,0],
        [0,0,1],
        [0,0,-1],
    ]

    return diffs.map((dp) => [point[0] - dp[0], point[1] - dp[1], point[2] - dp[2]])
}

// function pointsToEuclid(points: point[]): boolean[][][] {
//     const euclid: boolean [][][] = []

//     for (let i = 0; i < points.length; i++) {
//         const p: point = points[i];
//         if (euclid[p[0]] == null) {
//             euclid[p[0]] = []
//         }
//         if (euclid[p[0]][p[1]] == null) {
//             euclid[p[0]][p[1]] = []
//         }
//         if (euclid[p[0]][p[1]][p[2]] == null) {
//             euclid[p[0]][p[1]][p[2]] = true
//         }
//     }

//     return euclid
// }

export class Space {
    points: point[] = []
    euclid: boolean[][][] = []

    constructor(points?: point[]) {
        if (points != null) {

            if (points.length == 0) {
                throw Error("no points")
            }

            const newPoints = points.flatMap(p => !this.exists(p) ? [<point>[p[0], p[1], p[2]]] : []);
            
            for (let i = 0; i < newPoints.length; i++) {
                const p = newPoints[i];

                if (this.euclid[p[0]] == null) {
                    this.euclid[p[0]] = []
                }
                if (this.euclid[p[0]][p[1]] == null) {
                    this.euclid[p[0]][p[1]] = []
                }
                if (this.euclid[p[0]][p[1]][p[2]] == null) {
                    this.euclid[p[0]][p[1]][p[2]] = true
                }
            }

            this.points = this.points.concat(newPoints)
        }
    }

    count(): number {
        return this.points.length
    }

    isEmpty(): boolean {
        return this.count() === 0
    }

    exists(p: point): boolean {
        return !!(this.euclid[p[0]] && this.euclid[p[0]][p[1]] && this.euclid[p[0]][p[1]][p[2]])
    }

    indexOf(p: point): number {
        for (let i = 0; i < this.points.length; i++) {
            if (p[0] == this.points[i][0] && p[1] == this.points[i][1] && p[2] == this.points[i][2]) {
                return i
            }
        }
        return -1
    }

    // addPoints(points: point[]) {
    //     // const newPoints = points.filter((e) => !this.exists(e))
    //     const newPoints = points.flatMap(p => !this.exists(p) ? [<point>[p[0], p[1], p[2]]] : []);
        
    //     for (let i = 0; i < newPoints.length; i++) {
    //         const p = newPoints[i];

    //         if (this.euclid[p[0]] == null) {
    //             this.euclid[p[0]] = []
    //         }
    //         if (this.euclid[p[0]][p[1]] == null) {
    //             this.euclid[p[0]][p[1]] = []
    //         }
    //         if (this.euclid[p[0]][p[1]][p[2]] == null) {
    //             this.euclid[p[0]][p[1]][p[2]] = true
    //         }
    //     }

    //     this.points = this.points.concat(newPoints)
    // }

    // removePoints(points: point[]) {
    //     for (let i = 0; i < points.length; i++) {
    //         const p = points[i];
    //         this.points.splice(this.indexOf(p), 1);
    //         this.euclid[p[0]][p[1]][p[2]] = false
    //     }
    // }

    inBoth(space: Space): Space {
        return new Space(space.points.flatMap(p => this.exists(p) ? [<point>[p[0], p[1], p[2]]] : []))
    }

    onlyLeft(space: Space): Space {
        return new Space(this.points.flatMap(p => !space.exists(p) ? [<point>[p[0], p[1], p[2]]] : []))
    }

    onlyRight(space: Space): Space {
        return new Space(space.points.flatMap(p => !this.exists(p) ? [<point>[p[0], p[1], p[2]]] : []))
    }

    getBounds(): number[][] {
                
        let [minX, minY, minZ] = this.points[0]
        let [maxX, maxY, maxZ] = this.points[0]

        for (let i = 0; i < this.points.length; i++) {
            const p: point = this.points[i];

            if (p[0] < minX) {
                minX = p[0]
            } else if (p[0] > maxX) {
                maxX = p[0]
            }

            if (p[1] < minY) {
                minY = p[0]
            } else if (p[1] > maxY) {
                maxY = p[0]
            }

            if (p[2] < minY) {
                minY = p[2]
            } else if (p[2] > maxY) {
                maxY = p[2]
            }
        }

        return [[minX, maxX], [minY, maxY], [minZ, maxZ]]
    }
}
