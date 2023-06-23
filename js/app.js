//Variables
let canvas = $("#game")
let ctx = canvas.getContext("2d")
let w = window.innerWidth
let h = window.innerHeight
let developer = false
canvas.width = w
canvas.height = h
ctx.imageSmoothingEnabled = false
ctx.imageSmoothingQuality = "low"

//Objects
let game = {
    images: [],
    prepare: function() {
        this.preloadImage("grass", "assets/blocks/grass.svg")
        this.preloadImage("dirt", "assets/blocks/dirt.svg")
        this.preloadImage("air", "assets/blocks/air.svg")
        this.preloadImage("stone", "assets/blocks/stone.svg")
        events.buttons()
        events.window()
    },
    start: function() {
        $("#info").style.display = "none"
	$("#github").style.display = "none"
        $("#discord").style.display = "none"
        $("#menu").style.display = "none"
	document.body.style.background = "none"
        $("#game").style.display = "block"
        this.loop()
    },
    preloadImage: function(id, url) {
        let img = new Image()
        img.src = url
        img.onload = () => {
        	this.images[id] = img
            log(`Loading ${id}: success`)
        }
    },
    loop: function() {
        ctx.clearRect(0, 0, w, h)
        map.draw()
        requestAnimationFrame(() => {
            	this.loop()
            }
        )
    }
}

let map = {
    data: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
    ],
    blocksize: v(100),
    draw: function() {
        for (let x = 0; x < this.data.length; x++) {
            for (let y = 0; y < this.data[x].length; y++) {
                let type = this.data[y][x]
                let block = image()
                function image() {
                    let image = null
                    switch(type) {
                        case 0:
                        	image = "air"
                            break
                        case 1:
                        	image = "grass"
                            break
                        case 2:
                        	image = "dirt"
                            break
                        case 3:
                        	image = "stone"
                            break
                    }
                    return image
                }
                draw.image(game.images[block], x * this.blocksize, y * this.blocksize, this.blocksize, this.blocksize)
                if (developer === true) {
                	draw.rectangle(x * this.blocksize, y * this.blocksize, this.blocksize, this.blocksize, null, "red", v(1))
                }
            }
        }
    }
}

let events = {
    buttons: function() {
        $("#info").addEventListener("click", () => {
            alert("Nothing here yet.")
        })
	$("#github").addEventListener("click", () => {
            window.open("https://github.com/fuindo")
        })
        $("#discord").addEventListener("click", () => {
            window.open("https://discord.gg/tKsmsDYER9")
        })
        $("#play").addEventListener("click", () => {
            game.start()
        })
    },
    window: function() {
        window.addEventListener("wheel", (event) => {
            event.preventDefault()
        }, {passive: false})
        window.addEventListener("touchmove", (event) => {
            event.preventDefault()
        }, {passive: false})
    }
}

let draw = {
    rectangle: function(x, y, width, height, fillcolor, strokecolor, linewidth) {
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        if (fillcolor) {
            ctx.fillStyle = fillcolor
            ctx.fill()
        }
        if (strokecolor) {
            ctx.lineWidth = linewidth
            ctx.strokeStyle = strokecolor
            ctx.stroke()
        }
        ctx.closePath()
    },
    circle: function(x, y, radius, fillcolor, strokecolor, linewidth) {
    	ctx.beginPath()
    	ctx.arc(x, y, radius, 0, 2 * Math.PI)
    	if (fillcolor) {
        	ctx.fillStyle = fillcolor
        	ctx.fill()
    	}
    	if (strokecolor) {
        	ctx.lineWidth = linewidth
        	ctx.strokeStyle = strokecolor
        	ctx.stroke()
    	}
    	ctx.closePath()
	},
    write: function(text, x, y, color, size) {
        ctx.beginPath()
    	ctx.fillStyle = color
  		ctx.font = `${size}px Arial`
 		ctx.fillText(text, x, y)
        ctx.closePath()
	},
    image: function(img, x, y, width, height) {
        ctx.beginPath()
        ctx.drawImage(img, x, y, width, height)
        ctx.closePath()
    }
}

game.prepare()

//Functions
function $(string) {
    return document.querySelector(string)
}
function log(string) {
    if (developer === true) {
        console.log(string)
    }
}
function v(string) {
    let diagonal = Math.sqrt(Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2))
    let numberH = null
    let numberW = null
    let number = null
    numberH = h / 910
    numberW = w / 1080
    if (numberH > numberW) {
        number = numberW
    }
    if (numberW > numberH) {
        number = numberH
    }
    let result = Math.floor(string * number)
    return result
}
