const fs = require('fs')

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
      date: new Date(date),
      method: arr3[0].slice(1),
      path: arr3[1],
      protocol: arr3[2] && arr3[2].slice(0, -1) || '',
      status: +arr4[0],
      size: +arr4[1],
      ua: arr2[2].slice(1, -1)
    }
  })
  console.log(arr2.length)
  let arr3 = arr2.filter(item => ['POST', 'GET'].includes(item.method))
  console.log(arr3.length)
})