//获取当前时间
function formatTime() {
  var date = new Date();
  var month = date.getMonth() + 1
  var day = date.getDate()



  return [month, day]
}
//获取月 日
function getnum(num){
  var data=[];
  switch(num){
    case 0:
      for (let n = 1; n <= 12; n++) {
     //   n = n.toString()[1] ? n : '0' + n
        data.push(n + '月')
      }
    break;
    case 1:
      for (let n = 1; n <= 31; n++) {
      //  n = n.toString()[1] ? n : '0' + n
        data.push(n + '日')
      }
    break;
    case 2:
      for (let n = 1; n <= 30; n++) {
      //  n = n.toString()[1] ? n : '0' + n
        data.push(n + '日')
      }

    default:
      for (let n = 1; n <= 28; n++) {
      //  n = n.toString()[1] ? n : '0' + n
        data.push(n + '日')
      }
      break
    break;
  }
  return data;
}
//将方法暴露出来
module.exports = {
  formatTime: formatTime,
  getnum:getnum
}

