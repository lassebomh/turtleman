
import bpy
from mathutils import *
import json

print("----------")

def frange(start, stop=None, step=None):
    # if set start=0.0 and step = 1.0 if not specified
    start = float(start)
    if stop == None:
        stop = start + 0.0
        start = 0.0
    if step == None:
        step = 1.0

    count = 0
    while True:
        temp = float(start + count * step)
        if step > 0 and temp >= stop:
            break
        elif step < 0 and temp <= stop:
            break
        yield temp
        count += 1

def mult(vec, vec2):
    temp = []

    for x, i in enumerate(vec):
        temp.append(i * vec2[x])

    return Vector(temp)

def point_inside(point,obj):
    axes = [ Vector((1,0,0)), Vector((0,1,0)), Vector((0,0,1)) ]
    outside = False
    mat = obj.matrix_world.copy()
    mat.invert()
    for axis in axes:
        orig = mat@point
        count = 0
        while True:
            _, location,normal,index = obj.ray_cast(orig,orig+mult(axis, Vector((1.84467e+19, 1.84467e+19, 1.84467e+19))))
            if index == -1:
                break
            count += 1
            orig = location + axis*0.00001
        if count%2 == 0:
            outside = True
            break
    return not outside

def inside_to_closest_point(p, obj):
    inv = obj.matrix_world.copy()
    inv.invert()
    point, normal, face = obj.closest_point_on_mesh(inv*p, 1.84467e+19)
    return (point-inv*p).dot(normal) <= 0.0

selection_cube = bpy.data.objects['Bounds']
target_object = bpy.data.objects['Suzanne']

#print(point_inside(Vector((1, 0, 0)), target_object))

step = 0.2

startX = selection_cube.location.x - selection_cube.scale.x
stopX = selection_cube.location.x + selection_cube.scale.x

startY = selection_cube.location.y - selection_cube.scale.y
stopY = selection_cube.location.y + selection_cube.scale.y

startZ = selection_cube.location.z - selection_cube.scale.z
stopZ = selection_cube.location.z + selection_cube.scale.z

data = []

for x in frange(startX, stopX, step):
    for y in frange(startY, stopY, step):
        for z in frange(startZ, stopZ, step):
            point = Vector((x, y, z))
            if point_inside(point, target_object):
                data.append([round((x-startX)/step), round((y-startY)/step), round((z-startZ)/step)])

with open('C:\\Users\\lasse\\Code\\turtleman\\lib\\static\\data.json', 'w') as f:
    f.write(json.dumps(data))
