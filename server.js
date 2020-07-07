const fs = require('fs')
const path = require('path')

fs.readFile('./static/20200706.log', 'utf8', (err, data) => {
  if(err) throw err
  // console.log(data)
  let arr = data.split(/\n/)
  // let arr = str.split('$$')
  let arr2 = arr.map(item => {
    let arr = item.split(' - - ')
    if(arr.length < 2) {
      return ''
    }
    let date = arr[1].slice(1, 21).replace(':', ' ')
    let arr2 = arr[1].slice(29).split(/(?<=")\s/)
    let arr3 = arr2[0].split(/\s/)
    let arr4 = arr2[1].split(/\s/)
   
    return {
      ip: arr[0],
      date: getDate(new Date(date)),
      method: arr3[0].slice(1),
      path: arr3[1],
      protocol: arr3[2] && arr3[2].slice(0, -1) || '',
      status: +arr4[0],
      size: +arr4[1],
      currentUrl: arr4[2].length > 2 ? arr4[2].slice(1, -1) : arr4[2],
      ua: arr2[2].slice(1, -1)
    }
  })
  // console.log(arr2.length)
  let arr3 = arr2.filter(item => ['POST', 'GET'].includes(item.method))
  let arr4 = arr3.filter(item => item.currentUrl && item.currentUrl !== '-')
  // console.log(arr4.length)
  const filePath = path.join(__dirname, './static/test.json')
  fs.writeFile(filePath, JSON.stringify(arr4, null, 2), {encoding: 'utf-8', flag: 'w'}, (err) => {
    if(err) throw err
  })
})

function getDate (date) {
  let hour = date.getHours()
  hour += 8
  date.setHours(hour)
  return date
}