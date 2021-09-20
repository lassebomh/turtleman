import { createRequire } from "https://deno.land/std@0.106.0/node/module.ts"

const require = createRequire(import.meta.url)
const PF = require("../modules/PathFinding3D.js-master/index.js")

// console.log(PF)

var nodes = [
    new PF.Node(0,0,0),
    new PF.Node(1,0,0),
    new PF.Node(2,0,0),
    new PF.Node(1,1,0),
    new PF.Node(2,1,0),
]

nodes[0].neighbors.push(nodes[1])
nodes[1].neighbors.push(nodes[0],nodes[2],nodes[3])
nodes[2].neighbors.push(nodes[1],nodes[4])
nodes[3].neighbors.push(nodes[1],nodes[4])
nodes[4].neighbors.push(nodes[3],nodes[2])

console.log(path)

var points = [
    [5+0,5+0,0],
    [5+1,5+0,0],
    [5+2,5+0,0],
    [5+1,5+1,0],
    [5+2,5+1,0],
]

const grid: any[][][] = []

for (let i = 0; i < points.length; i++) {
    const [x, y, z] = points[i]
    if (grid[x] == null) {
        grid[x] = []
    }
    if (grid[x][y] == null) {
        grid[x][y] = []
    }
    grid[x][y][z] = new PF.Node(x, y, z)
}

console.log(grid);

for (const x of grid.keys()) {
    if (grid[x] !== undefined) {

        for (const y of grid.keys()) {
            if (grid[x][y] !== undefined) {

                for (const z of grid.keys()) {
                    if (grid[x][y][z] !== undefined) {

                        console.log(x, y, z, `->`, grid[x][y][z])

                        const directions = [
                            [-1, 0, 0],
                            [0, -1, 0],
                            [0, 0, -1],
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1],
                        ]

                        directions.forEach((direction) => {
                            const [dx, dy, dz] = direction;

                            if (grid[x-dx] !== undefined && grid[x-dx][y-dy] !== undefined && grid[x-dx][y-dy][z-dz] !== undefined) {
                                grid[x][y][z].neighbors.push(grid[x-dx][y-dy][z-dz])
                                console.log("\tneighbor found " + grid[x-dx][y-dy][z-dz]);
                            } 
                        });
                    }
                }
            }
        }
    }
}

