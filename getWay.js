function getWay(map, startPosition, finishPosition){
  map = JSON.parse(JSON.stringify(map))
  
  for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      if(getField(x, y) === 'space') {
        setField( x, y, Infinity)
      }
    }
  }
  
  setField(startPosition.x, startPosition.y, 0)

  while(!isWay()) {
    for(let y = 0; y < map.length; y++) {
      for(let x = 0; x < map[y].length; x++){
        const value = getField(x, y)
  
        if(typeof value === 'number' && value !== Infinity) {
          if(x > 0 && typeof getField(x - 1, y) === 'number') { //проверка позиции слева
            const currentValue = getField(x - 1, y)
            setField( x - 1, y, Math.min( currentValue, value +1))
          }
          if(x < map[y].length - 1 && typeof getField(x + 1, y) === 'number'){ //проверка позиции справа
            const currentValue = getField(x + 1, y)
            setField( x + 1, y, Math.min( currentValue, value +1))
          }
          if(y > 0 && typeof getField(x, y - 1) === 'number'){ //проверка позиции сверху
            const currentValue = getField(x , y - 1)
            setField( x, y - 1, Math.min( currentValue, value +1))
          }
          if(y < map.length - 1 && typeof getField(x, y + 1) === 'number'){ //проверка позиции снизу
            const currentValue = getField(x , y + 1)
            setField( x, y + 1, Math.min( currentValue, value +1))
          }
        }
      }
    }
  }

  const fields = []
  const position = {
    x: finishPosition.x,
    y: finishPosition.y
  }
  
  fields.push([position.x, position.y])
  let number = getField(position.x, position.y) - 1

  while(number > -1) {
    if(position.x > 0 && getField(position.x - 1, position.y) === number) {
      fields.push([position.x - 1, position.y])
      position.x--
    }
    else if(position.x < map[0].length - 1 && getField(position.x + 1, position.y) === number) {
      fields.push([position.x + 1, position.y])
      position.x++
    }
    else if(position.y > 0 && getField(position.x, position.y - 1) === number) {
      fields.push([position.x, position.y - 1])
      position.y--
    }
    else if(position.y < map.length - 1 && getField(position.x, position.y + 1) === number) {
      fields.push([position.x, position.y + 1])
      position.y++
    }
    number--
  }

  return fields

  function isWay(){
    return getField(finishPosition.x, finishPosition.y) !== Infinity
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

}