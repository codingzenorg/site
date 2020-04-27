/*
TODOS:
- review access to global variables
- separate drawing from calculing
*/


//TODO: out of here
document.body.style.margin = "0px"
document.body.style.borderColor = "blue"
document.body.style.borderStyle = "solid"
document.body.style.borderWidth = "5px"

//
var canv = document.createElement('canvas')
canv.width = window.innerWidth - 10 // - 2x border width
canv.height = window.innerHeight - 10
document.body.appendChild(canv)


window.onload = () => {
	document.addEventListener("keydown", keyPush)

	board.calcSize(canv)

	setInterval(game, 1000 / 15) //game rhythm 1s/15
}


const board = {
	cellSize: 10,
	calcSize: function (coordinate) {
		this.width = Math.floor(coordinate.width / this.cellSize)
		this.height = Math.floor(coordinate.height / this.cellSize)
	},
	backcolor = 'black'
}

const snake = {
	x: 10,
	y: 10,
	trail: [],
	tail: 5,
	color: 'lime'
}

const apple = {
	x: 15,
	y: 15
}

let dpos = [0,0]

const ctx = canv.getContext("2d")



const game = () => {
	//capture direction
	snake.x += dpos[0]
	snake.y += dpos[1]

	//boundaries
	if (snake.x < 0) { //player position < 0 -> put player on the other side
		snake.x = board.width - 1
	}
	if (snake.x > board.width - 1) { //player position > scene size -> put player on the other side
		snake.x = 0
	}
	if (snake.y < 0) {
		snake.y = board.height - 1
	}
	if (snake.y > board.height - 1) {
		snake.y = 0
	}

	//----------------------------------------------------------------------------
	//drawing the scene 
	//----------------------------------------------------------------------------
	//clear
	ctx.fillStyle = board.backcolor
	ctx.fillRect(0, 0, canv.width, canv.height)
	//drawing the player
	ctx.fillStyle = snake.color 
	//snake & trail
	for (var i = 0; i < snake.trail.length; i++) {
		ctx.fillRect(snake.trail[i].x * board.cellSize, snake.trail[i].y * board.cellSize, board.cellSize - 2, board.cellSize - 2)
	}
	//----------------------------------------------------------------------------

	//some calculations about trail/tail
	//add current player position for trail (Xoooooo)	
	snake.trail.push({
		x: snake.x,
		y: snake.y
	})
	//adjust tail size... trail must be the same site of tail
	while (snake.trail.length > snake.tail) {
		snake.trail.shift()
	}
	//
	if (apple.x == snake.x && apple.y == snake.y) { //if player colide with the apple
		snake.tail++ //increase tail
		apple.x = Math.floor(Math.random() * board.width) 	//new position for apple
		apple.y = Math.floor(Math.random() * board.height) 	//new position for apple
	}
	//paint apple
	ctx.fillStyle = "red"
	ctx.fillRect(apple.x * board.cellSize, apple.y * board.cellSize, board.cellSize - 2, board.cellSize - 2)
}

const keyPush = e => {
	dpos = keymap[e.keyCode] || dpos
	e.preventDefault()
}

const keymap = {
	37: [-1,0],
	38: [0,-1],
	39: [1,0],
	40: [0,1]
}