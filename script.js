/* модифицируем script.js перенося отрисовку лабиринта в отдельный файл*/ 
const COLUMNS_SIZE = 51 //КОЛИЧЕСТВО СТОЛБЦОВ
const ROWS_SIZE = 51 //КОЛИЧЕСТВО строк
const FIELD_SIZE = 10 //Размер клеточек
const PADDING = 10 //ОТСТУП внутри канваса
const TRACTORS_NUMBER = 100

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const map = generatMaze(COLUMNS_SIZE, ROWS_SIZE, TRACTORS_NUMBER)
let startPosition = null
let finishPosition = null

init()
start()

//запрускает игру
function start(){
  requestAnimationFrame(tick) //встроенная в js ф-ция, кот. позволяет регистрировать перед след.обновлением экрана ф-цию 60 раз в сек
  mouseWatcher(canvas, function(mouse){ //принимает DOM-элемент, над которым нужно следить за мышью и 2арг ф-ция, кот принимает арг маус можно делать всякие манипуляции
    if(mouse.x <= PADDING || mouse.y <= PADDING || mouse.x >= canvas.width - PADDING || mouse.y >= canvas.height - PADDING) {
      return
    }
    const coordinats = {
      x: parseInt((mouse.x - PADDING) / FIELD_SIZE),
      y: parseInt((mouse.y - PADDING) / FIELD_SIZE)
    }

    if(getField(coordinats.x, coordinats.y) === 'space') {
      finishPosition = coordinats
    }
  })
}

//основная логика отрисовки
function tick(timestamp){
  clearCanvas()
  drawMap()

  if(startPosition && finishPosition) {
    const way = getWay(map, startPosition, finishPosition)
    drawWay(way)
  }

  requestAnimationFrame(tick)
}

//инициализируем стартовые данные
function init(){
  canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE
  canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE

  canvas.addEventListener('click', function(event){
    if(finishPosition) {
      startPosition = {
        x: finishPosition.x,
        y: finishPosition.y
      }
    }
    
  })
}

//создание карты
function drawMap(){
  for(let x = 0; x < COLUMNS_SIZE; x++) {
    for(let y = 0; y < ROWS_SIZE; y++) {
      if(getField(x, y) === 'wall') {
        context.fillStyle = 'black'
        context.beginPath()
        context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
        context.fill()
      }
    }
  }
}

//отрисовываем путь
function drawWay(way){
  for(const [x, y] of way) {
    context.fillStyle = 'red'
    context.beginPath()
    context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
    context.fill()
  }
}

//очищает канвас
function clearCanvas(){
  context.fillStyle = 'black' //устанавливает цвет заливки
  context.beginPath()  //создаем новую элементарную геометрическую фигуру
  context.rect(0, 0, canvas.width, canvas.height) //указываем какую: rect - от англ "прямоугольник", указываем верхний левый угол и ширину и высоту прямоугольника
  context.fill() //заливаем нашу новую фигуру черным цветом

  context.fillStyle = 'white'
  context.beginPath()
  context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2)
  context.fill()
}

//возвращает значение матрицы с координатами x, y, т.e. ячейку
function getField(x, y) {
  if(x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
    return null
  }

  return map[y][x]
}

//принимает x, y , чтобы задать значение ячейки
function setField(x, y, value) {
  if(x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
    return null
  }

  return map[y][x] = value
}

// //возвращает случайный элемент из массива
// function getRandomFrom(array){
//   const index = Math.floor(Math.random() * array.length)
//   return array[index]
// } 

// //проверяем число на четность
// function isEven(n) {
//   return n % 2 === 0
// }

