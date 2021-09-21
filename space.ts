
type point = [number, number, number]

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

class Space {
    points: point[] = []
    euclid: boolean[][][] = []

    exists(p: point): boolean {
        return this.euclid[p[0]] && this.euclid[p[0]][p[1]] && this.euclid[p[0]][p[1]][p[2]]
    }

    addPoints(points: point[]) {
        const newPoints = points.filter((e) => !this.exists(e))
        
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

const s = new Space()

console.log(s.exists([1, 0, 0]));

s.addPoints([[1, 0, 0], [0, 1, 0], [0, 0, 1]])