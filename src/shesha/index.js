import {
	coordinateMap,
	keyDown,
	boardCreator,
	gameBuilder,
} from './game'

//configure body
document.body.style.margin = "0px"
document.body.style.borderColor = "gray"
document.body.style.borderStyle = "solid"
document.body.style.borderWidth = "5px"

//adj canvas for fullscreen
const canvas = document.createElement('canvas')
canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 10
document.body.appendChild(canvas)

//attach game after load
window.onload = () => {
	document.addEventListener("keydown", keyDown)

	const cmap = coordinateMap()

	const sceneRenderer = sceneRendererBuilder(canvas, cmap, {
		boardBackColor: 'black',
		snakeColor: 'blue',
		appleColor: 'red'
	})

	const board = boardCreator(cmap.limit(canvas.width, canvas.height))
	const game = gameBuilder(board, sceneRenderer)
	const gameRhythm = 1000 / 15 //1s/15

	setInterval(game, gameRhythm)
}

//presentation logic
const sceneRendererBuilder = (canvas, {
	f,
	cellSize
}, {
	boardBackColor,
	appleColor,
	snakeColor
}) => {
	const ctx = canvas.getContext("2d")
	const squareSize = cellSize - 2
	return ({
		snake,
		apple
	}) => {
		//clear-------------------------------
		ctx.fillStyle = boardBackColor
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		//snake-------------------------------
		ctx.fillStyle = snakeColor
		snake.trail.forEach(t => ctx.fillRect(f(t.x), f(t.y), squareSize, squareSize))
		//apple-------------------------------
		ctx.fillStyle = appleColor
		ctx.fillRect(f(apple.x), f(apple.y), squareSize, squareSize)
		//legend-------------------------------
		ctx.fillStyle = "blue"
		ctx.font = "bold 16px Arial"
		ctx.fillText("cell size :" + cellSize, (canvas.width) - 150, 50)
		ctx.fillText("snake size:" + snake.trail.length, (canvas.width) - 150, 70)
		ctx.fillText("apple (x,y):" + apple.x + ' ' + apple.y, (canvas.width) - 150, 90)
		ctx.fillText("snake (x,y):" + snake.x + ' ' + snake.y, (canvas.width) - 150, 110)
	}
}