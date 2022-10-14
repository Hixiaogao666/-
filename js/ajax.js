//疯转ajax
// ajax({
//     method: "post",
//     url: 'http://localhost:8888/users/login',
//     // boolean: false,
//     data: {
//         name: '张三',
//         age: 20
//     },
//     header: {
//         "content-type": 'application/json'
//     }
// })


// 参数对象形式转查询字符串的形式 
function toParams(dataobj) {
    let str = ''
    for (let key in dataobj) {
        str += `${key}=${dataobj[key]}&`
    }

    return str.slice(0, str.length - 1)
}

// 基础的域名地主
function ajax(obj) {
    // 假设这个是处理好的obj
    let default_obj = {
        method: obj.method || 'get', // 默认参数为get 请求
        url: obj.url,
        // boolean: obj.boolean == undefined ? true : obj.boolean ? true : false
        boolean: obj.boolean !== false ? true : false,
        data: null,
        header: obj.header ? obj.header : null
    }
    //表示传递了参数的时候,判断get 和post ,否则不改动
    if (obj.data) {
        if (default_obj.method == 'get') {
            default_obj.data = toParams(obj.data)
            default_obj.url = obj.url + '?' + toParams(obj.data)
        } else {
            default_obj.data = obj.data
            // 当前post 方式有参数的情况
            // 判断当前的header 中规定的参数的格式
            if (obj.header['content-type'] == 'application/x-www-form-urlencoded') {
                default_obj.data = toParams(obj.data)
            } else {
                default_obj.data = obj.data
            }
        }
    }

    // 目前为止 default_obj 中的数据都是可以直接拿来用的
    // console.log(default_obj);

    // 定义promise
    let p = new Promise((resolve, reject) => {
        // 定义ajax
        const xhr = new XMLHttpRequest();
        xhr.open(default_obj.method, default_obj.url, default_obj.boolean);
        xhr.onreadystatechange = function () {
            // console.log(xhr.readyState, xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText)
                // console.log(res);
                // resolve(JSON.parse(xhr.responseText))
                // reject({ code: 0, msg: '请求失败' })
               
                    resolve(res)
        
                 
           
            }
        }
        if (default_obj.header) {
            // xhr.setRequestHeader('content-type', default_obj.header['content-type'])
            for (let key in default_obj.header) {
                xhr.setRequestHeader(key, default_obj.header[key])
            }
            xhr.send(default_obj.data)
        } else {
            xhr.send()
        }
    })

    // 将promise 对象返回出去
    return p

}

export default ajax