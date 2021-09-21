import { Space, getNeighbors } from './lib/spacial.ts'

console.log("creating mesh");

let s = new Space(JSON.parse(Deno.readTextFileSync('./static/data.json')))
s = new Space(s.points.filter((p) => new Space(getNeighbors(p)).inBoth(s).count() !== 6))

const bs = s.getBounds()
const listOut = s.points.map((e) => {
    return [e[0] - (bs[0][0] + bs[0][1])/2, e[1] - (bs[1][0] + bs[1][1])/2, e[2] - (bs[2][0] - bs[2][1])]
})
Deno.writeTextFileSync('./static/data.json', JSON.stringify(listOut));

console.log("written to data.json");
