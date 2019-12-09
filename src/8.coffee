fs = require("fs")
list = "#{fs.readFileSync("./src/8.txt")}".split("").map(Number)

width = 25
height = 6

layerr = 0

byLayer = {}

stack = {}

x = 0
y = 0
while x < list.length
  unless y % height
    ++layerr

  unless byLayer[layerr]
    byLayer[layerr] = []

  lineData = list.slice x, x + width
  byLayer[layerr].push lineData

  curY = y % height

  unless stack[curY]
    stack[curY] = {}

  curX = 0
  while curX < lineData.length
    digit = lineData[curX]
    unless digit == 2
      unless stack[curY][curX]
        stack[curY][curX] = []
      stack[curY][curX].push digit
    curX++

  x += width
  y++


lowestZero = [Infinity]

for layer of byLayer
  d = (n) ->
    byLayer[layer].flat().filter((x) ->
      x == n
    ).length
  if d(0) < lowestZero[0]
    lowestZero = [
      d(0)
      layer
      d(1) * d(2)
    ]

# part 1
console.log lowestZero[2]

# part 2
OO = Object.values(stack).map((O) ->
  Object.values(O).map((n) ->
    if n[0] == 1 then '*' else ' '
  ).join ''
).join('\n')
console.log OO
