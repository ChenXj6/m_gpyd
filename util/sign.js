let obj = {
  makeSign(data){
    var timestamp = Date.parse(new Date()) / 1000;
    data.timestamp = timestamp
    var newkey = Object.keys(data).sort();
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
     newObj[newkey[i]] = data[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    var arr  = JSON.stringify(newObj)
    let len = arr.length;
    var data1 = arr.substring(1,len-1); //截取字符串中不包括‘{}’部分
		var data2 = data1.split(','); //以','分割字符串
		var jsonArr = []; //创建一个新数组
		for(let i=0;i<data2.length;i++){
			var str2 = data2[i].replace(/"/g, ""); //去掉data2数据中每一项的""
			var str3 = str2.replace(/:/,'='); //将str2数据中的每一项中':'替换为'='
			jsonArr.push(str3); //将str3数据存入数组里面
		}
    var result = jsonArr.join('&'); //将两个数据拼接起来
    return result;
  }
}

export default obj;


