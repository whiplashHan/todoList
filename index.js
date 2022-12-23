window.addEventListener("load", load); //页面加载完调用load函数，即页面的初始化
document.getElementById("todo").onkeypress = function (event) {
    if (event.keyCode === 13) {/*13表示按下回车*/
        add(event);
    }
};
var todolist;//定义全局变量
 
function load() { //加载所有事项的函数
    var todo = document.getElementById("todolist");//获取DOM元素
    var done = document.getElementById("donelist");
    var todonum = document.getElementById("todocount");
    var donenum = document.getElementById("donecount");
    var todocontent = "";//设置初始值
    var donecontent = "";
    var todocount = 0;
    var donecount = 0;
    var list = localStorage.getItem("todolist");//获取本地上todolist的数据
    if (list != null) {//不为空时
        todolist = JSON.parse(list); //JSON对象转换为JS对象 
    } else {
        todolist = [];//置空
    }
    if (todolist != null) {
        for (var i = 0; i < todolist.length; i++) {//遍历已转化成js对象的todolist
            if (todolist[i].done == false) {//done为false即还未完成的情况
                todocontent += "<li>" + "<span>" + todolist[i].todo + "</span>" +  
                "<button onclick=" + "edit(" + i + ") class='edit'>修改</button>" + 
                 "<button onclick=" + "del(" + i + ") class='del1'>删除</button>" +
                "<button onclick=" + "changedone(" + i + ")>确认完成</button>"
                 + "</li>"; //拼接上字符串，以便后续使用
                 todocount++;//未完成的数量加一
            } else {
                donecontent += "<li>" + "<span>" + todolist[i].todo + "</span>" +  
                "<button onclick=" + "edit(" + i + ") class='edit'>修改</button>" +
                "<button onclick=" + "del(" + i + ") class='del1'>删除</button>" + 
                "<button onclick=" + "changetodo(" + i + ")>取消完成</button>"
                + "</li>";
                donecount++;//已完成的数量加一
            }
        }
        todo.innerHTML = todocontent;//往todo所代表标签添加内容
        done.innerHTML = donecontent;//往done所代表标签添加内容
        todonum.innerHTML = todocount;//往todonum所代表标签添加内容
        donenum.innerHTML = donecount;//往donenum所代表标签添加内容
    } else { //当todolist为空时
        todo.innerHTML = "";
        done.innerHTML = "";
        todonum.innerHTML = 0;
        donenum.innerHTML = 0;
    }
}
 
function add(e) { //添加事项的函数
    var newtodo = {
        todo: "", //用户输入的内容
        done: false //done表示是否完成该事项
    };
    var temp = document.getElementById("todo").value; //使用temp存储id为todo标签的value值
    if (temp.length == 0 && temp.trim() == "") { //当输入为空时
        alert('输入事项不能为空');
        return;
    }
    var flag = confirm('您确定要添加该事项吗?');//弹出确认框
    if(flag){//选择是
        newtodo.todo = temp; //将temp值赋给newtodo对象的todo属性
        todolist.push(newtodo); //往todolist中添加对象
        document.getElementById("todo").value = ""; //对输入框进行初始化
        save(); //保存
        alert('添加成功');
    }else{
        alert('操作出错');
        return ;
    }
}
 
function changedone(i){ //将未完成的事项改变成已完成
    var flag = confirm('您确定要完成该事项吗?');
    if(flag){
        todolist[i].done = true; //改变done的状态
        save();
        alert('修改成功');
    }else{
        alert('操作出错');
        return ;
    }
}
 
function changetodo(i){ //将已完成的事项改变成未完成
    var flag = confirm('您确定要取消完成该事项吗?');
    if(flag){
        todolist[i].done = false;//改变done的状态
        save();
        alert('修改成功');
    }else{
        alert('操作出错');
        return ;
    }
}
 
function edit(i) { //修改事项的内容
    var temp = prompt("请输入你想要修改的内容",todolist[i].todo); 
    if(temp != null && temp.trim() != ""){//当修改后内容不为空时
        todolist[i].todo = temp; //修改内容
        alert('修改成功');
        save();
    }else{
        alert('输入字符串为空,修改失败');
    }
}
 
function del(i) { //删除相应的事项
    var flag = confirm('您确定要删除该事项吗?');
    if(flag){
        todolist.splice(i, 1); //删除掉指定的一个元素
        save();
        alert('删除成功');
    }else{
        alert('操作出错');
        return ;
    }
}
 
function save(){ //保存事项的函数
    localStorage.setItem("todolist", JSON.stringify(todolist)); //将JS对象转化成JSON对象并保存到本地
    load(); //每次保存完都刷新页面
}