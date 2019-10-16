function generatMaze(columnsNumber, rowsNumber, tractorsNumber = 1){ 
  const map = []
  const tractors = []

  
  for(let y = 0; y < rowsNumber; y++) {
    const row = []
    
    for(let x = 0; x < columnsNumber; x++) {
      row.push('wall')
    }
    
    map.push(row)
  }
  
  /*создаем массив размером с columnsNumber, заполним его полностью нулями, сгенерируем из него мап и выберем все индексы,
   и выберем из ни х только четные. А потом с помощью getRandomFrom() выберем случайный элемент из всего набора цифр*/
  const startX = getRandomFrom(Array(columnsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))
  const startY = getRandomFrom(Array(rowsNumber).fill(0).map((item, index) => index).filter(y => isEven(y)))

  for(let i = 0; i < tractorsNumber; i++) {
    tractors.push({ x: startX, y: startY})
  }
  
  setField(startX, startY, 'space')

  while(!isMaze()){
    moveTractors()
  }

  return map

  //возвращает значение матрицы с координатами x, y, т.e. ячейку
  function getField(x, y) {
    if(x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
      return null
    }

    return map[y][x]
  }

  //принимает x, y , чтобы задать значение ячейки
  function setField(x, y, value) {
    if(x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
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
    for(let x = 0; x < columnsNumber; x++) {
      for(let y = 0; y < rowsNumber; y++) {
        if(isEven(x) && isEven(y) && getField(x, y) === 'wall') {
          return false
        }
      }
    }
    return true
  }

  //заставляем двигаться трактор
  function moveTractors() {
    for(const tractor of tractors) {
      const directs = []

      if(tractor.x > 0) {
        directs.push('left')
      }
      if(tractor.x < columnsNumber - 2) {
        directs.push('right')
      }
      if(tractor.y > 0) {
        directs.push('up')
      }
      if(tractor.y < rowsNumber - 2) {
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
}

