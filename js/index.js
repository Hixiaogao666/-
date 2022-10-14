import ajax from "./ajax.js";
// console.log(ajax);
let dataArr = [];
//获取元素
let title = document.querySelector('.title')
let author = document.querySelector('.author')
let date = document.querySelector('.date')
if (!localStorage.getItem('userarr') ) {
    //说明无数据
    ajax({
        url: 'https://api.iynn.cn/mock?t=2'
    }).then(res => {
        if (res.code == 0) {
            console.log(res);
            dataArr = res.data
            // console.log(dataArr);
            localStorage.setItem('userarr', JSON.stringify(dataArr))
        }
        render(dataArr)
    })
} else {
    dataArr = JSON.parse(localStorage.getItem('userarr'))
    render(dataArr)
}


//渲染函数

function render(arr) {
    let str = ``
    dataArr.forEach((item, index) => {
        // console.log(item);
        str += `
    <tr>
        <td> ${index + 1}</td>  
        <td>${item.title}</td>         
        <td>  ${item.user}</td>
        <td>${item.date.replace(/\//g,'-')}</td>
        <td>
        <button class="btn btn-success " id = ${item.id}>编辑</button>
            <button class="btn btn-danger" >删除</button>
            
        </td>
    </tr>
    `
    })
    document.querySelector('#tbody').innerHTML = str
}

//添加功能
let add = document.querySelector('#add')

add.onclick = () => {

    if (date.value && title.value && author.value) {
        dataArr.push({
            'title': title.value,
            'user': author.value,
            'date': date.value,
            "id": Number(dataArr[dataArr.length - 1].id) + 1
        })
        localStorage.setItem('userarr', JSON.stringify(dataArr))
        render(dataArr)

    } else {
        alert(`输入内容不能为空`)
    }
}


    //编辑功能
    let bj_btn = document.querySelectorAll('.bj_btn_1')
    let bookInp_1 = document.querySelector('.modelBookname_1');
    let authorInp_1 = document.querySelector('.modelAuthor_1');
    let dateInp_1 = document.querySelector('.modelInp_1');
    let id = ""
    let tbody = document.querySelector('tbody')
    tbody.addEventListener('click', (e) => {

        if (e.target.innerHTML == '编辑') {
            // console.log(123);
            $('#myModalbj').modal('show')
            //数据展示
            let parent = e.target.parentNode.parentNode
            // console.log(parent);
            bookInp_1.value = parent.children[1].innerHTML
            authorInp_1.value = parent.children[2].innerHTML
            dateInp_1.value = parent.children[3].innerHTML
            id = e.target.id
            console.log(id);
            

            // 点击确定按钮
            document.querySelector('.addsure1').onclick = () => {        
                dataArr.forEach(elem => {
                    if (elem.id == id) {
                        elem.title = bookInp_1.value
                        elem.user = authorInp_1.value
                        elem.date = dateInp_1.value
                    }
                })
                // 更新本地缓存
                localStorage.setItem('userarr', JSON.stringify(dataArr))
                // 重新渲染
                render(dataArr)
                $('#myModalbj').modal('hide')
            }
        }

        //删除功能
        if (e.target.innerHTML == '删除') {
            console.log(123);
            dataArr.forEach((elem, i) => {
                console.log(elem.id);
                if (elem.id == e.target.parentNode.children[0].id) {
                    dataArr.splice(i, 1)
                }
            })
            // 更新本地缓存
            localStorage.setItem('userarr', JSON.stringify(dataArr))
            // 重新渲染
            render(dataArr)
        }
    })



