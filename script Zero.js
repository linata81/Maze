/* генерация лабиринта */
const COLUMNS_SIZE = 51 //КОЛИЧЕСТВО СТОЛБЦОВ
const ROWS_SIZE = 51 //КОЛИЧЕСТВО строк
const FIELD_SIZE = 10 //Размер клеточек
const PADDING = 10 //ОТСТУП внутри канваса
const TRACTORS_NUMBER = 100

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const map = createMap()

const tractors = []
setField(0, 0, 'space')

init()
start()

//запрускает игру
function start(){
  requestAnimationFrame(tick) //встроенная в js ф-ция, кот. позволяет регистрировать перед след.обновлением экрана ф-цию 60 раз в сек
}

//основная логика отрисовки
function tick(timestamp){
  moveTractors()
  clearCanvas()
  drawMap()

  if(!isMaze()){
    drawTractors()
    requestAnimationFrame(tick)
  }
}

//инициализируем стартовые данные
function init(){
  canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE
  canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE

  for(let i = 0; i < TRACTORS_NUMBER; i++) {
    tractors.push({ x: 0, y: 0})
  }
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

//создание белых ячеек
function drawTractors(){
  for(const tractor of tractors) {
    context.fillStyle = 'red'
    context.beginPath()
    context.rect(PADDING + tractor.x * FIELD_SIZE, PADDING + tractor.y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
    context.fill()
  }
}

//заставляем двигаться трактор
function moveTractors() {
  for(const tractor of tractors) {
    const directs = []

    if(tractor.x > 0) {
      directs.push('left')
    }
    if(tractor.x < COLUMNS_SIZE - 2) {
      directs.push('right')
    }
    if(tractor.y > 0) {
      directs.push('up')
    }
    if(tractor.y < ROWS_SIZE - 2) {
      directs.push('down')
    }
  
    const direct = getRandomFrom(directs)
  
    switch(direct) {
      case 'left':
        if(getField(tractor.x - 2, tractor.y) === 'wall') {
          setField(tractor.x - 1, tractor.y, 'space')
          setField(tractor.x - 2, tractor.y, 'space')
        }
        tractor.x -= 2
        break
      case 'right':
          if(getField(tractor.x + 2, tractor.y) === 'wall') {
            setField(tractor.x + 1, tractor.y, 'space')
            setField(tractor.x + 2, tractor.y, 'space')
          }
          tractor.x += 2
        break
      case 'up':
          if(getField(tractor.x, tractor.y - 2) === 'wall') {
            setField(tractor.x, tractor.y - 1, 'space')
            setField(tractor.x, tractor.y - 2, 'space')
          }
          tractor.y -= 2
        break
      case 'down':
          if(getField(tractor.x, tractor.y + 2) === 'wall') {
            setField(tractor.x, tractor.y + 1, 'space')
            setField(tractor.x, tractor.y + 2, 'space')
          }
          tractor.y += 2
        break
    }
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

//создает стартовую карту
function createMap(){
  const map = []

  for(let y = 0; y < ROWS_SIZE; y++) {
    const row = []

    for(let x = 0; x < COLUMNS_SIZE; x++) {
      row.push('wall')
    }

    map.push(row)
  }

  return map
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

//возвращает случайный элемент из массива
function getRandomFrom(array){
  const index = Math.floor(Math.random() * array.length)
  return array[index]
} 

//проверяем число на четность
function isEven(n) {
  return n % 2 === 0
}

//Проверяет карту на готовность,если карта готова возвращает true и false, если карта не готова
function isMaze() {
  for(let x = 0; x < COLUMNS_SIZE; x++) {
    for(let y = 0; y < ROWS_SIZE; y++) {
      if(isEven(x) && isEven(y) && getField(x, y) === 'wall') {
        return false
      }
    }
  }
  return true
}

// console.log('fired')
