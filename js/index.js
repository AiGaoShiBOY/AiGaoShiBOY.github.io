
//格式化日期时间
Date.prototype.Format = function (fmt) { 
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      'T+':'T',
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
}


/*
    启动函数，完成第一次页面初始化
*/
//页面数据
var data;
//当前时间
var now = new Date().Format("yyyy-MM-dd");
renderAllTodo();
initInput();
showContent("z")


/*
    初始化输入框
*/
function initInput(){
    document.getElementById("inputtitle").innerHTML = "<i class=\"fa fa-smile-o\"></i> 添加一条事项或纪念时刻";
    document.getElementById("info").style.display = "block";
    document.getElementsByClassName("submitBtn")[0].style.display="block";
    document.getElementsByClassName("submitBtn")[1].style.display="none";
    var form = document.getElementById("form");
    form.reset();
    var datetime = document.getElementById("datetime");
    var time = new Date().Format("yyyy-MM-ddThh:mm");
    datetime.value =time;
}


/*
    展示导航栏
*/
function showContents(){
    document.getElementsByClassName('content-container')[0].style.visibility = 'visible';
    document.getElementsByClassName('content-container')[0].style.opacity = 1;
    document.getElementsByClassName('content-container')[0].style.height = '550px';
    document.getElementsByClassName("left-item")[0].style.visibility = 'hidden';
    document.getElementsByClassName("left-item")[1].style.visibility = 'visible';
    document.getElementsByClassName("right-item")[0].style.visibility = 'hidden';
}

/*
关闭对话框
*/
function closeDialog(){
    console.log('1');
    document.getElementsByClassName('content-container')[0].style.visibility = 'hidden';
    document.getElementsByClassName('content-container')[0].style.opacity = 0;
    document.getElementsByClassName('content-container')[0].style.height = '0px';
    document.getElementsByClassName("left-item")[0].style.visibility = 'visible';
    document.getElementsByClassName("left-item")[1].style.visibility = 'hidden';
    document.getElementsByClassName("right-item")[0].style.visibility = 'visible';
}

function showInput(){
    var inputList = document.getElementsByClassName('input-div')[0];
    inputList.style.height = '300px';
    inputList.style.opacity = 1;
    inputList.style.visibility = 'visible';
    document.getElementsByClassName("left-item")[0].style.visibility = 'hidden';
    document.getElementsByClassName("left-item")[1].style.visibility = 'hidden';
    document.getElementsByClassName("right-item")[0].style.display = 'none';
    document.getElementsByClassName("right-item")[1].style.display='block';
}

function closeInput(){
    var inputList = document.getElementsByClassName('input-div')[0];
    inputList.style.height = '0px';
    inputList.style.opacity = 0;
    inputList.style.visibility = 'hidden';
    initInput();
    document.getElementsByClassName("left-item")[0].style.visibility = 'visible';
    document.getElementsByClassName("left-item")[1].style.visibility = 'hidden';
    document.getElementsByClassName("right-item")[0].style.display = 'block';
    document.getElementsByClassName("right-item")[1].style.display='none';
}

/*
    展示提示组件
*/

function showHint(content,type){
    if(type==1){
        txt = "<i class = 'fa fa-check'></i>" +' ' + content;
        document.getElementsByClassName("hint")[0].style.backgroundColor='seagreen';
    }
    if(type==2){
        txt = "<i class = 'fa fa-warning'></i>" +' ' + content;
        document.getElementsByClassName("hint")[0].style.backgroundColor='orange';
    }
    if(type==3){
        txt = "<i class = 'fa fa-close'></i>" +' ' + content;
        document.getElementsByClassName("hint")[0].style.backgroundColor='red';
    }
    document.getElementsByClassName("hint")[0].innerHTML = txt;
    document.getElementsByClassName("hint")[0].style.height='48px';
    document.getElementsByClassName("hint")[0].style.opacity=1;
    document.getElementsByClassName("hint")[0].style.visibility = "visible";
    setTimeout("hideHint()",3000);
}


function hideHint(){
    document.getElementsByClassName("hint")[0].style.height='0px';
    document.getElementsByClassName("hint")[0].style.opacity=0;
    document.getElementsByClassName("hint")[0].style.visibility = "hidden";
}

/*
    删除todo
*/

function del(obj){
    let target = obj.parentNode.parentNode;
    index = target.id.substr(1);
    if(data[index].done==3){
        showHint("您成功删除了一个纪念时刻！",1);
    }else{
        showHint("您成功删除了一个代办事项",1);
    }
    data.splice(index,1);
    saveData(data);
    renderAllTodo();
}

/* 
    完成todo
*/

function finish(obj){
    let target = obj.parentNode.parentNode;
    index = target.id.substr(1);
    data[index].done = 1;
    data[index].date = new Date().Format("yyyy-MM-ddThh:mm").substring(0,10);
    data[index].time = new Date().Format("yyyy-MM-ddThh:mm").substring(11,16);
    saveData(data);
    showHint("😄 您完成了一项代办事项！",1)
    renderAllTodo();
}

/* 
    编辑todo，首先会修改输入框布局/按钮
*/

function edit(obj){
    let target = obj.parentNode.parentNode;
    index = target.id.substr(1);
    document.getElementById("title").value = data[index].title;
    document.getElementById("datetime").value = data[index].date+'T'+data[index].time;
    document.getElementById("tag").value = data[index].tag;
    document.getElementById("inputtitle").innerHTML = "<i class=\"fa fa-pencil\"></i> 编辑您的代办事项";
    document.getElementById("info").style.display = "none";
    document.getElementsByClassName("submitBtn")[0].style.display="none";
    document.getElementsByClassName("submitBtn")[1].style.display="block";
    document.getElementsByClassName("submitBtn")[1].id="%"+index;
    showInput();
} 

/*
    编辑数据并返回后端
*/

function edit_data(id){
    i = id.substr(1);
    //获取名字
    var _title = document.getElementById("title");
    //获取时间表
    var _datetime = document.getElementById("datetime");
    var _tag = document.getElementById("tag");
    var y = _datetime.value.substring(0,10);
    var t = _datetime.value.substring(11,16);
    var k = Date.parse((y+' '+t).replace(/-/g, '/'))-new Date().getTime();
    console.log(k);
    if(k<=0){
        showHint("请选择未来的时间！",3);
        return;
    }
    
    if (_title.value.trim() == "") {
        showHint("请填写代办事项！",2);
        return;
    } 
    if(_datetime.value.trim()==''){
        showHint("请选择截止时间！",2);
        return;
    }
    if(_tag.value.trim() ==''){
        showHint("请选择一个标签！",2);
        return;
    }
    data[i].title = _title.value;
    data[i].date = _datetime.value.substring(0,10);
    data[i].time = _datetime.value.substring(11,16);
    data[i].tag = _tag.value;
    saveData(data);
    closeInput();
    showHint("修改成功！",1)
    renderAllTodo();
}

/*
    储存数据
*/

function post_data(){
    //获取名字
    var title = document.getElementById("title");
    //获取时间表
    var datetime = document.getElementById("datetime");
    var tag = document.getElementById("tag");
    if (title.value.trim() == "") {
        showHint("请填写事件",2);
        return;
    } 
    if(datetime.value.trim()==''){
        showHint("请选择时间！",2);
        return
    }
    if(tag.value.trim() ==''){
        alert("请选择一个标签！",2);
        return;
    }
    var todo = {
        "title": title.value,
        "done":0,
        "date":datetime.value.substring(0,10),
        "time": datetime.value.substring(11,16),
        "tag":tag.value,
    }
    var flag = Date.parse((todo.date+' '+todo.time).replace(/-/g, '/'))-new Date().getTime();
    if(flag>0){
        showHint("成功添加了一条代办事项！",1);
    }
    else{
        todo.done = 3;
        showHint("成功添加了一个纪念时刻！",1)
    }
    data.push(todo);
    saveData(data);
    closeInput();
    renderAllTodo();
}

/*
    从localStorage获取data
*/
function loadData(data_name){
    var collection = localStorage.getItem(data_name);
    if (collection != null) {
        return JSON.parse(collection);
    } else return [];
}

/* 
    存储数据
*/
function saveData(data){
    localStorage.setItem("todo", JSON.stringify(data));
}

/*
根据时间排序
*/
function sortTime(data){
    data.sort((a,b)=>{
        return Date.parse((a.date+' '+a.time).replace(/-/g, '/'))-Date.parse((b.date+' '+b.time).replace(/-/g, '/'))
    })
}

/*
    渲染所有的todo，这相当于页面的刷新函数
*/
function renderAllTodo(){
    now = new Date().Format("yyyy-MM-dd");

    data = loadData("todo");
    sortTime(data);
    console.log(data);
    var todoHtml = '';
    var todoHtmlcount=0;
    var taglist = {
        '0':"<i class=\"fa fa-certificate fa-lg\">",
        '1':"<i class=\"fa fa-book fa-lg\">",
        '2':"<i class=\"fa fa-briefcase fa-lg\">",
        '3':"<i class=\"fa fa-soccer-ball-o fa-lg\">",
        '4':"<i class=\"fa fa-camera-retro fa-lg fa-fw\">",
    }
    var emHtml = '';
    var emHtmlcount=0;
    var finishHtml = '';
    var finishHtmlcount=0;
    var outdateHtml = '';
    var outdateHtmlcount = 0;
    var remHtml = '';
    var remHtmlcount = 0;
    var dic = {
        'todo1':'',
        'todo2':'',
        'todo3':'',
        'todo4':'',
        'todocount1':0,
        'todocount2':0,
        'todocount3':0,
        'todocount4':0,
    }
    var dic1 = {
        'fi1':'',
        'fi2':'',
        'fi3':'',
        'fi4':'',
        'ficount1':0,
        'ficount2':0,
        'ficount3':0,
        'ficount4':0,
    }

    var dic2 = {
        'fi1':'',
        'fi2':'',
        'fi3':'',
        'fi4':'',
        'ficount1':0,
        'ficount2':0,
        'ficount3':0,
        'ficount4':0,
    }
    
    var dic3 = {
        'fi1':'',
        'fi2':'',
        'fi3':'',
        'fi4':'',
        'ficount1':0,
        'ficount2':0,
        'ficount3':0,
        'ficount4':0,
    }
    for(let i = 0;i<data.length;i++){
        var flag = Date.parse((data[i].date+' '+data[i].time).replace(/-/g, '/'))-new Date().getTime();
        //阈值为2min
        if(data[i].done==0&&flag>=0){
            var gap = Date.parse((data[i].date+' '+data[i].time).replace(/-/g, '/'))-new Date().getTime();
            var day = parseInt(gap/(24*60*60*1000));
            gap = gap - day*(24*60*60*1000);
            var h = parseInt(gap/(60*60*1000));
            gap = gap - h*(60*60*1000);
            var m = parseInt(gap/(60*1000));
            todoHtml += "<div class=\"todoitem\" style='height:150px' id=\"a"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
           "            <div class=\"todotitle\" ondblclick='ShowElement(this)'>"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\" ondblclick='showTag(this)' draggable='true' ondragend='hidetag(this)' >"+taglist[data[i].tag]+"</i></div>\n" + 
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;' ondblclick='showDate(this)'><i class=\"fa fa-clock-o\"></i>&nbsp;截止时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-warning\"></i>&nbsp;剩余时间: &nbsp;<span style='font-weight:normal'>"+day +' 天 ' + h+' 时 ' +m+' 分 ' +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button edit\" onclick = 'edit(this)' style=\"margin-right:20px;\"><i class=\"fa fa-pencil fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button check\" onclick = 'finish(this)'><i class=\"fa fa-check fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)'><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            todoHtmlcount++;
        }
        if(data[i].done==0&&data[i].date == now&&flag>=0){
            var gap = Date.parse((data[i].date+' '+data[i].time).replace(/-/g, '/'))-new Date().getTime();
            var day = parseInt(gap/(24*60*60*1000));
            gap = gap - day*(24*60*60*1000);
            var h = parseInt(gap/(60*60*1000));
            gap = gap - h*(60*60*1000);
            var m = parseInt(gap/(60*1000));
            emHtml += "<div class=\"todoitem\" style='height:150px' id=\"a"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\" ondblclick='ShowElement(this)'>"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\" ondblclick='showTag(this)' draggable='true' ondragend='hidetag(this)' >"+taglist[data[i].tag]+"</i></div>\n" + 
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;截止时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-warning\"></i>&nbsp;剩余时间: &nbsp;<span style='font-weight:normal'>"+day +' 天 ' + h+' 时 ' +m+' 分 ' +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button edit\" onclick = 'edit(this)' style=\"margin-right:20px;\"><i class=\"fa fa-pencil fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button check\" onclick = 'finish(this)'><i class=\"fa fa-check fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)'><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            emHtmlcount++;
        }
        if(data[i].done==1){
            finishHtml += "<div class=\"todoitem\" id=\"c"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\">"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\">"+taglist[data[i].tag]+"</i></div>\n" +
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;完成时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)' style=\"margin-right:20px;\"><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            finishHtmlcount++;
        }
        if((data[i].done==0&& flag < 0)||data[i].done==2){
            data[i].done = 2;
            outdateHtml += "<div class=\"todoitem\" id=\"c"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\">"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\">"+taglist[data[i].tag]+"</i></div>\n" +
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;截止时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)' style=\"margin-right:20px;\"><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            outdateHtmlcount++;
        }
        if(data[i].done==0&&data[i].tag!=0){
            var gap = Date.parse((data[i].date+' '+data[i].time).replace(/-/g, '/'))-new Date().getTime();
            var day = parseInt(gap/(24*60*60*1000));
            gap = gap - day*(24*60*60*1000);
            var h = parseInt(gap/(60*60*1000));
            gap = gap - h*(60*60*1000);
            var m = parseInt(gap/(60*1000));
            dic['todo'+data[i].tag] += "<div class=\"todoitem\" style='height:150px' id=\"a"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\" ondblclick='ShowElement(this)'>"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\" ondblclick='showTag(this)' draggable='true' ondragend='hidetag(this)' >"+taglist[data[i].tag]+"</i></div>\n" + 
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;截止时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-warning\"></i>&nbsp;剩余时间: &nbsp;<span style='font-weight:normal'>"+day +' 天 ' + h+' 时 ' +m+' 分 ' +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button edit\" onclick = 'edit(this)' style=\"margin-right:20px;\"><i class=\"fa fa-pencil fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button check\" onclick = 'finish(this)'><i class=\"fa fa-check fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)'><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            dic['todocount'+data[i].tag]++;
        }
        if(data[i].done==1&&data[i].tag!=0){
            dic1['fi'+data[i].tag] += "<div class=\"todoitem\" id=\"c"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\">"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\">"+taglist[data[i].tag]+"</i></div>\n" +
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;完成时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)' style=\"margin-right:20px;\"><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            dic1['ficount'+data[i].tag]++;
        }
        if(data[i].done==3){
            var gap = new Date().getTime()-Date.parse((data[i].date+' '+data[i].time).replace(/-/g, '/'));
            var day = parseInt(gap/(24*60*60*1000));
            gap = gap - day*(24*60*60*1000);
            var h = parseInt(gap/(60*60*1000));
            gap = gap - h*(60*60*1000);
            var m = parseInt(gap/(60*1000));
            remHtml += "<div class=\"todoitem\" style='height:150px' id=\"c"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\">"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\">"+taglist[data[i].tag]+"</i></div>\n" +
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;纪念时刻: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-calendar\"></i>&nbsp;据现在已经: &nbsp;<span style='font-weight:normal'>"+day +' 天 ' + h+' 时 ' +m+' 分 ' +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)' style=\"margin-right:20px;\"><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            remHtmlcount++;
        }
        if(((data[i].done==0&& flag < 0)||data[i].done==2)&&data[i].tag!=0){
            dic2['fi'+data[i].tag] +="<div class=\"todoitem\" id=\"b"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\">"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\">"+taglist[data[i].tag]+"</i></div>\n" +
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;截止时间: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button edit\" onclick = 'edit(this)' style=\"margin-right:20px;\"><i class=\"fa fa-pencil fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button check\" onclick = 'finish(this)'><i class=\"fa fa-check fa-lg fa-fw\"></i></button>\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)'><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            dic2['ficount'+data[i].tag]++;

        }
        if(data[i].done==3&&data[i].tag!=0){
            var gap = new Date().getTime()-Date.parse((data[i].date+' '+data[i].time).replace(/-/g, '/'));
            var day = parseInt(gap/(24*60*60*1000));
            gap = gap - day*(24*60*60*1000);
            var h = parseInt(gap/(60*60*1000));
            gap = gap - h*(60*60*1000);
            var m = parseInt(gap/(60*1000));
            dic3['fi'+data[i].tag] += "<div class=\"todoitem\" style='height:150px' id=\"c"+i+"\">\n" +
            "            <div class=\"firstline\"style=\"height: 55px;overflow: hidden;\">\n" +
            "            <div class=\"todotitle\">"+data[i].title+"</div>\n" +
            "            <div class=\"thetag tag"+data[i].tag+"\">"+taglist[data[i].tag]+"</i></div>\n" +
            "            </div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-clock-o\"></i>&nbsp;纪念时刻: &nbsp;<span style='font-weight:normal'>"+data[i].date +'&nbsp;' +data[i].time +"</span></div>\n" +
            "            <div style='margin-left: 5%;font-weight: bold;'><i class=\"fa fa-calendar\"></i>&nbsp;据现在已经: &nbsp;<span style='font-weight:normal'>"+day +' 天 ' + h+' 时 ' +m+' 分 ' +"</span></div>\n" +
            "            <div class=\"firstline\">\n" +
            "                <button class=\"operate-button close\" onclick = 'del(this)' style=\"margin-right:20px;\"><i class=\"fa fa-close fa-lg fa-fw\"></i></button>\n" +
            "            </div>\n" +
            "        </div>"
            dic3['ficount'+data[i].tag]++;
        }
        
    }

    setDom('l',1,emHtml,emHtmlcount);
    setDom('l',2,todoHtml,todoHtmlcount);
    setDom('l',3,finishHtml,finishHtmlcount);
    setDom('l',4,outdateHtml,outdateHtmlcount);
    setDom('l',5,remHtml,remHtmlcount);

    console.log(dic)

    for(let i = 1;i<=4;i++){
        setDom('x',i,dic['todo'+i],dic['todocount'+i]);
        setDom('y',i,dic1['fi'+i],dic1['ficount'+i]);
        setDom('z',i,dic2['fi'+i],dic2['ficount'+i]);
        setDom('t',i,dic3['fi'+i],dic3['ficount'+i]);
    }
    
}

/*
    根据字符串内容渲染dom元素
*/

function setDom(type,i,string,count){
    document.getElementById(type+i).innerHTML = string;
    document.getElementById(type+type+i).innerText = count;
    var stringdic = {
        '1':"🥳 没有今天内的DDL!</br> 可以松口气啦！",
        '2':"🤩 没有代办事项!</br> 好好休息吧！",
        '3':"👀 这里空空如也...</br> 快去完成任务吧！",
        '4':"👯‍♀️ 没有过时未完成的任务！",
        '5':"👀 这里空空如也...</br> 快去记录一些生活中的纪念时刻吧！",
        'x':"🤩 没有代办事项!</br> 好好休息吧！",
        'y':"👀 这里空空如也...</br> 快去完成任务吧！",
        'z':"👯‍♀️ 没有过时未完成的任务！",
        't':"👀 这里空空如也...</br> 快去记录一些生活中的纪念时刻吧！",

    }
    if(count == 0){
        if(type=='l'){
            document.getElementById(type+i).innerHTML = "<div class = 'emptydiv'>"+stringdic[i]+"</div>"
        }else{
            document.getElementById(type+i).innerHTML = "<div class = 'emptydiv'>"+stringdic[type]+"</div>"
        }
    }
}

/*
    改变页面dom元素，实现过滤效果
*/

function showContent(i){
    var list = document.getElementsByClassName("todo-block");
    if(i == 'z'){
        document.getElementsByClassName('first-button')[0].style.display = 'block';
        for(let j=0;j<list.length;j++){
            if(j<5){
                console.log(list[j].childNodes)
                list[j].style.display = "block";
            }
            else{
                console.log(j);
                console.log(list[j].childNodes)
                list[j].style.display = "none";
            }
        }
        document.getElementsByClassName("footer")[0].style.display ='block';
        closeDialog();
        return;
    }
    document.getElementsByClassName('first-button')[0].style.display = 'none';
    for(let j = 0;j<list.length;j++){
        list[j].style.display='none';
    }
    list[i].style.display = 'block';
    document.getElementsByClassName("footer")[0].style.display ='none';
    closeDialog();
}

/*
    完成所有todo
*/

function finishall(){
    var j = 0;
    for(let i = 0; i<data.length;i++){
        if(data[i].done==0){
            data[i].done = 1;
            j++;
        }
    }
    if(j==0){
        showHint("您没有待完成的事项！",2);
        return;
    }
    saveData(data);
    showHint("😄 您成功完成了所有事项！",1)
    renderAllTodo();
}

/*
    删除所有已完成
*/

function deleteall(){
    var j = 0;
    for(let i = 0; i<data.length;i++){
        if(data[i].done==1){
            j++;
        }
    }
    if(j==0){
        showHint("您还没有已完成的事项",2);
        return;
    }
    for(let i=0;i<j;i++){
        for(let i = 0;i<data.length;i++){
            if(data[i].done==1){
                data.splice(i,1);
                break;
            }
        }
    }
    saveData(data);
    showHint("成功删除了已完成事项",1);
    renderAllTodo();
}

/*
    删除所有已过时
*/

function outdateall(){
    var j = 0;
    for(let i = 0; i<data.length;i++){
        if(data[i].done==2){
            j++;
        }
    }
    if(j==0){
        showHint("您还没有已过时的事项",2);
        return;
    }
    for(let i=0;i<j;i++){
        for(let i = 0;i<data.length;i++){
            if(data[i].done==2){
                data.splice(i,1);
                break;
            }
        }
    }
    saveData(data);
    showHint("成功删除了已过时的事项",1);
    renderAllTodo();
}

/*
    双击展示输入框，修改
*/


function ShowElement(element) {
    var oldhtml = element.innerHTML;
    var newobj = document.createElement('input');
    newobj.type = 'text';
    newobj.value = oldhtml;
    newobj.onblur = function() {
        element.setAttribute("ondblclick", "ShowElement(this);");
        if(this.value==''){
            element.innerHTML = oldhtml;
            element.setAttribute("ondblclick", "ShowElement(this);");
            return;
        }
        if(this.value==oldhtml){
            element.innerHTML = oldhtml;
            element.setAttribute("ondblclick", "ShowElement(this);");
            return;
        }
        element.innerHTML = this.value;
        showHint('修改成功！',1);
        i = element.parentNode.parentNode.id.substr(1);
        data[i].title = this.value;
        saveData(data);
        renderAllTodo();
    }
    element.innerHTML = '';
    element.appendChild(newobj);
    newobj.setSelectionRange(0, oldhtml.length);
    //设置获得光标
    newobj.focus();
    //不能重复点击
    newobj.parentNode.setAttribute("ondblclick", "");
}

/*
    双击展示日期输入
*/

function showDate(element) {
    var ohtml =element.innerHTML;
    var oldtext = element.innerText;
    var oldhtml = element.innerText.substring(8,24);
    year=oldhtml.substring(0,10);
    time=oldhtml.substring(11,16)
    var newobj = document.createElement('input');
    newobj.type = 'datetime-local';
    newobj.value = year+'T'+time;
    newobj.required='required';

    newobj.onblur = function() {
        element.setAttribute("ondblclick", "showDate(this);");
        i = element.parentNode.id.substr(1);
        _year = this.value.substring(0,10);
        _time = this.value.substring(11,16);
        console.log(Date.parse((_year+' '+_time).replace(/-/g, '/'))-new Date().getTime())
        if(Date.parse((_year+' '+_time).replace(/-/g, '/'))-new Date().getTime()<=0){
            showHint('不能设置过去的时间！',3);
            element.innerHTML = ohtml;
            return
        }
        if(_year+' '+_time==year+' '+time){
            element.innerHTML = ohtml;
            return
        }
        showHint("修改成功",1);
        element.innerHTML = ohtml;
        console.log(data[i])
        data[i].date = _year;
        data[i].time = _time;
        saveData(data);
        renderAllTodo();
    }

    element.innerHTML = '';

    element.appendChild(newobj);
  
    newobj.focus();
    newobj.parentNode.setAttribute("ondblclick", "");
}

/*
    双击更改标签
*/

function showTag(element){
    showHint("您成功更改了标签！",1)
    i = element.parentNode.parentNode.id.substr(1);
    data[i].tag++;
    if(data[i].tag>4){
        data[i].tag-=4;
    }
    saveData(data);
    renderAllTodo(); 
}

/*
    拖动删除标签
*/

function hidetag(element){
    showHint("您删除了标签！",1)
    console.log(element.parentNode.parentNode)
    i = element.parentNode.parentNode.id.substr(1);
    console.log(data[i])
    data[i].tag=0;
    saveData(data);
    renderAllTodo(); 
}
