export const coordinateMap = (cellSize) => {
	cellSize = cellSize || 20
	return {
		cellSize,
		limit: (x, y) => {
			return {
				h: Math.floor(x / cellSize),
				v: Math.floor(y / cellSize)
			}
		},
		f: (v) => v * cellSize
	}
}

export const boardCreator = (limits) => {
	return {
		apple: appleCreator(limits),
		snake: snakeCreator(limits),
		h: limits.h,
		v: limits.v
	}
}

const snakeCreator = ({
	h,
	v
}) => {
	return {
		x: Math.floor(Math.random() * h),
		y: Math.floor(Math.random() * v),
		trail: [],
		tail: 5
	}
}

const appleCreator = ({
	h,
	v
}) => {
	return {
		x: Math.floor(Math.random() * h),
		y: Math.floor(Math.random() * v)
	}
}

const correctHorizAxis = ({
	h
}) => (x) => {
	if (x < 0) return h - 1
	if (x > h - 1) return 0
	return x
}

const correctVerticalAxis = ({
	v
}) => (y) => {
	if (y < 0) return v - 1
	if (y > v - 1) return 0
	return y
}

export const gameBuilder = (board, sceneRenderer) => {
	let hCorrection = correctHorizAxis(board)
	let vCorrection = correctVerticalAxis(board)

	return () => {
		let snake = board.snake
		getCurrentPos(snake)
		snake.x = hCorrection(snake.x)
		snake.y = vCorrection(snake.y)
		sceneRenderer(board)
		blablaTail(board)
		adjustTailTrail(board)
		increaseTail(board)
		appleReplacement(board)
	}
}


const adjustTailTrail = ({
	snake
}) => {
	while (snake.trail.length > snake.tail) {
		snake.trail.shift()
	}
}

const blablaTail = ({
	snake
}) => {
	snake.trail.push({
		x: snake.x,
		y: snake.y
	})
}

const increaseTail = (board) => {
	let snake = board.snake
	if (checkColision(board)) {
		snake.tail++
	}
}

const appleReplacement = (board) => {
	if (checkColision(board)) {
		board.apple = appleCreator(board)
	}
}

const checkColision = ({
	apple,
	snake
}) => (apple.x == snake.x && apple.y == snake.y)

const getCurrentPos = (snake) => {
	let [nx, ny] = dpos
	snake.x += nx
	snake.y += ny
}

//global
let dpos = [0, 0]

export const keyDown = e => {
	dpos = {
		37: [-1, 0],
		38: [0, -1],
		39: [1, 0],
		40: [0, 1]
	} [e.keyCode] || dpos
}