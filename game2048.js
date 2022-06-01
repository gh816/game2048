//思路
var gameArray
var score
var max
var time
var t
var color = ["aqua", "red", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", "purple", "red",
	"silver", "teal", "white", "yellow"
]
var keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]

/*初始化*/
function init() {
	max = 0;
	time = 0
	score = 0
	clearInterval(t)
	t = setInterval(showtime, 1000)
	gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	gameArray[randomPos()] = randomNum()
	gameArray[randomPos()] = randomNum()
	paint()
}

window.onkeydown = function(e) {
	var keyCode
	if (!e) {
		e = window.event
	}
	if (document.all) {
		keyCode = e.keyCode
	} else {
		keyCode = e.which
	}
	//左箭头或A
	if (keyCode == 37 || keyCode == 65) {
		toLeft()
		isEnd()
	}
	//右箭头或d
	if (keyCode == 39 || keyCode == 68) {
		toRight()
		isEnd()
	}
	//上箭头或w
	if (keyCode == 38 || keyCode == 87) {
		toUp()
		isEnd()
	}
	//下箭头或s
	if (keyCode == 40 || keyCode == 83) {
		toDown()
		isEnd()
	}
}
//主体程序
function isEnd() {
	let flag = false
	if (gameArray.indexOf(0) == -1 ) {
		$("#danger").text("")
		if (isEndX()==false && isEndY()==false) {
			clearTimeout(t)
			if (window.confirm("结束了!\n当前分数: " + score + ";\n用时: " + time +
					"S;\n最大数是: " + max + "。\n是否开始新的游戏?")) {
				init();
			} else {
				window.close()
			}
		} else {
			$("#danger").text("这不能走了");
		}
			return flag
	}

}

function isEndX() {
	let flag = false
	var w = new Array()
	for (let j = 0; j < 4; j++) {
		for (var i = 0; i < 4; i++) {
			w[i] = gameArray[4 * j + i]
		}
		flag = (w[0] == w[1] || w[1] == w[2] || w[2] == w[3])&&w[i]!=0
		if (flag===false) {
			break
		}
		return flag
	}
	
}

function isEndY() {
	let flag = false
	var w = new Array()
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 4; i++) {
			w[i] = gameArray[4 * i + j]
		}
		flag = (w[0] == w[1] || w[1] == w[2] || w[2] == w[3])&&w[i]!=0
		if (flag===false) {
			break
		}
		return flag
	}
	
}
//向上
function toUp() {
	for (let i = 0; i < 4; i++) {
		var row = [gameArray[i], gameArray[4 + i], gameArray[8 + i], gameArray[12 + i]]
			configU(i, row)
	}
		gameArray[randomPos()] = randomNum()
	  paint()
}

function configD(i, r) {
	makeArray(r)
	for (let j = 0; j < 4; j++) {
		gameArray[4 * (3 - j) + i] = r[j]
	}
}
//向下
function toDown() {
	for (let i = 0; i < 4; i++) {
		var row = [gameArray[i + 12], gameArray[8 + i], gameArray[4 + i], gameArray[i]]
		configD(i, row)
	}
	gameArray[randomPos()] = randomNum()
	paint()
}

function configU(i, r) {
	makeArray(r)
	for (let j = 0; j < 4; j++) {
		gameArray[4 * j + i] = r[j]
	}
}
//向左
function toLeft() {
	for (let i = 0; i < 4; i++) {
		var row = [gameArray[i * 4], gameArray[i * 4 + 1], gameArray[i * 4 + 2], gameArray[i * 4 + 3]]
		configL(i, row)
	}
	gameArray[randomPos()] = randomNum()
	paint()
}

function configR(i, r) {
	makeArray(r)
	for (let j = 0; j < 4; j++) {
		gameArray[4 * i + (3 - j)] = r[j]
	}
}
//向右
function toRight() {
	for (let i = 0; i < 4; i++) {
		var row = [gameArray[i * 4 + 3], gameArray[i * 4 + 2], gameArray[i * 4 + 1], gameArray[i * 4]]
		configR(i, row)
	}
	gameArray[randomPos()] = randomNum()
	paint()
}

function configL(i, r) {
	makeArray(r)
	for (let j = 0; j < 4; j++) {
		gameArray[4 * i + j] = r[j]
	}
}
//创建数组--判断为空
function isZore(r) {
	return r[0] == null && r[1] == null && r[2] == 0 && r[3] == null
}

function makeArray(r) {
	//移动
	if (!isZore(r)) {
		for (var m = 0; m < 4; m++) {
			for (let n = 0; n < 3; n++) {
				if (r[n] == 0) {
					r[n] = r[n + 1]
					r[n + 1] = 0
				}
			}
		}
	}
	//移动第二轮
	for (let m = 0; m < 3; m++) {
		if (r[m] == r[m + 1]) {
			var k = m
			r[k] += r[k + 1]
			score += r[k]
			while (++k < 3) {
				r[k] = r[k + 1]
			}
			r[3] = 0
		}
	}
	return r
}

function paint() {
	for (let i = 0; i < 16; i++) {
		//当数组内容为0时，显示空：当不为0时显示数组内容
		$("#box" + keys[i]).text((gameArray[i] == 0) ? "" : gameArray[i])
		//不同数字显示不同背景颜色
		var index = (gameArray[i] == 0) ? 0 : (gameArray[i].toString(2).length - 1)
		$("#box" + keys[i]).css("backgroundColor", color[index])
		if (gameArray[i] > max) {
			max = gameArray[i]
		}
	}

	$("#score").text("总分为" + score)
	$("#max").text("最大数" + max)
}
//计时功能
function showtime() {
	$("#time").text("当前用时：" + (++time) + "秒")
}

//随机数
function randomNum() {
	//二选一，用概念完成二选一，三选一
	//随机产生2或4
	return Math.random() < 0.8 ? 2 : 4
}

function randomPos() {
	var num = Math.floor(Math.random() * 16)
	while (gameArray[num] != 0) {
		num = Math.floor(Math.random() * 16)
	}
	return num
}
