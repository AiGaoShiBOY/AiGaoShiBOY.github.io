# MR.Time——随身时间管家

👨🏻‍💻[Go to Mr.Time!](https://AiGaoShiBOY.github.io/)

📦 [View Scource Code](https://github.com/AiGaoShiBOY/AiGaoShiBOY.github.io)

## 使用的外部CSS库

🌝 [Font Awesome](http://www.fontawesome.com.cn)

采用Font-awesome 提供了图标支持。其css文件存储在font awesome4.7-4.0中。

## 目录

* [项目简介](#项目简介)
* [功能介绍](#功能介绍)
* [功能展示](#功能展示)
* [核心实现](#核心实现)
   * [语法优化](#语法优化)
      * [id选择器](#id选择器)
      * [创建DOM节点](#创建dom节点)
      * [css选择器](#css选择器)
      * [设置样式](#设置样式)
   * [数据持久化存储](#数据持久化存储)
   * [Model](#model)
   * [事件监听](#事件监听)
      * [手机端模拟double touch](#手机端模拟double-touch)
      * [手机端模拟long touch](#手机端模拟long-touch)
   * [便利贴Todo](#便利贴todo)
   * [浮动球](#浮动球)
   * [除此之外](#除此之外)
      * [系统主题自适应](#系统主题自适应)
      * [字体大小自适应](#字体大小自适应)
      * [safari浏览器优化](#safari浏览器优化)
* [开发环境](#开发环境)
* [关于作者](#关于作者)
* [项目结构](#项目结构)

## 项目简介

Mr.Time是一个随身时间管家。它将您的代办事项系统地管理起来，加以不同类型的分类和多样的提示，让您在时间管理上更佳得心应手。它还可以存储一些过去的纪念时刻，并告诉您纪念时刻已经过去了多久，方便您时刻回忆过去的点点滴滴。总之，Mr.Time旨在为用户提供一个方便的、精密的、友好的、交互时间管理工具。

Mr.Time采用纯Html+js+css实现，但是这不妨碍Mr.Time功能丰富。为了方便实现和部署，Mr.Time的数据存储采用浏览器的Local Storage存储，如果您喜欢Mr.Time，建议您不要切换浏览器或者手动清除浏览器数据。

Mr.Time的功能也是易于扩展的，localStorage很好地模拟了与数据库的链接。将Js的相应访问data数据更换为与数据库的交互即可。

Mr.Time是针对移动端设计的。您也可以在PC端使用它，但是移动端能获得最佳的布局体验。

## 功能介绍

### 基本功能

- [x] 新增代办事项
- [x] 删除代办事项
- [x] 展现代办事项列表
- [x] 全部完成
- [x] 删除已完成
- [x] 保存页面状态，刷新页面后可恢复

### 高级功能

- [x] 加入时间系统，包括已过期，倒计时等等功能
- [x] 加入标签系统
- [x] 加入页面菜单，在菜单中可以过滤当前表项
- [x] 最紧急提示
- [x] 加入纪念时刻系统
- [x] 两种编辑途径：编辑按钮一次性更改代办事项所有属性，双击单个属性改变取值
- [x] 严格的输入校验系统
- [x] 菜单、输入单下拉动画
- [x] 向下滑动的提示条交互
- [x] 如果没有代办事项/或者纪念时刻，加入贴心的提示
- [ ] 

## 功能展示

### 基本功能

* 代办事项的增加、删除、展现

<img src="Readme-image/1.png" />

* 全部已完成、删除已完成、删除已过时

<img src="Readme-image/2.png" />

* 数据持久化已经实现，可以点击链接体验

### 高级功能

* Mr.Time在简单的todo系统上加入了时间系统，用户只需要输入截止日期，就能自动看到剩余时间。如果用户超时，过时的代办事项会自动放入已经过时中，用户不需要手动进行操作。



双击todo进行编辑

<img src="https://upload-images.jianshu.io/upload_images/12014150-6dcf34b47e543a6b.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="IMG_3682" width="33%;" /><img src="https://upload-images.jianshu.io/upload_images/12014150-35e01f9866d65d93.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="IMG_3681" width="33%;" />

长按添加一条todo

<img src="https://upload-images.jianshu.io/upload_images/12014150-3671f4f07fa3a44c.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="IMG_3679" width="33%;" /><img src="https://upload-images.jianshu.io/upload_images/12014150-7b34ae2486ba922f.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="IMG_3677" width="33%;" />

横屏适配

<img src="https://upload-images.jianshu.io/upload_images/12014150-0f7ad09027bec78d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="image-20200626222240953" width="50%;" width="80%;" />

<br/>

## 核心实现

<details>
	<summary>核心实现代码</summary>
### 语法优化

#### id选择器

```js
/**
 * 通过id快速访问节点
 * @param {element id} id 
 */
function $(id){
    return document.getElementById(id);
}
```

#### 创建DOM节点

```js
/**
 * 通过类型快速创建节点
 * @param {节点类型} type 
 */
function $c(type){
    return document.createElement(type);
}
```

#### css选择器

```js
/**
 * 通过css选择器快速访问一组对象
 *    注意返回值为NodeList
 * @param {css选择器} css_selector 
 */
function $all(css_selector){
    return document.querySelectorAll(css_selector);
}
```

#### 设置样式

```js
/**
 * 快速设置节点样式
 * @param {节点对象} obj 
 * @param {一组css对象} css 
 */
function setStyle(obj, css){
    for(let atr in css){
        obj.style[atr] = css[atr];
    }
}
```

<br/>

### 数据持久化存储

```js
(function(){
    if(!window.localStorage){
        alert("您的浏览器不支持Local Storage");
        return false;
    } else {
        let key = "todos";
        Object.assign(model, {
            /**
             * 读取LocalStorage进行初始化
             **/
            init: function(callback){
                let data = window.localStorage.getItem(key);
                if(data){ 
                    model.data = JSON.parse(data);
                }
                if(callback) { callback(); }
            },
            /**
             * 写入LocalStorage进行持久化
             **/
            flush: function(callback){
                window.localStorage.setItem(key, JSON.stringify(model.data));
                if(callback) { callback(); }
            }
        });
    }
})();
```

### Model

```js
/**
 * Model层
 **/
window.model = {
    data: {
        todos: [
            /**
             * 【存储实例】
             * content: "this is a todo example"
             * time: 
             * completed: false
             */
        ],
        filter: "All",
    }
}
```

### 事件监听

#### 手机端模拟double touch

```js
var click_counter = 0;
elem.addEventListener("touchstart", function () {
    touchStartTimer = new Date();
    click_counter++;
    setTimeout(function () {
        click_counter = 0;
    }, dbltouch_interval);
    if (click_counter > 1) {
        console.log("simulate double touch on mobile...");

        click_counter = 0;
    }
});
```

#### 手机端模拟long touch

```js
let touchStartTimer, touchEndTimer;
btnGroupTouchHandler = {
    start: function(event){
        touchStartTimer = new Date();
    },
    end: function(event){
        touchEndTimer = new Date();
        let deltaTime = touchEndTimer.getTime() - touchStartTimer.getTime();

        /* 长按判定 */
        if(deltaTime > longtouch_interval){
           
        }
    }
}
```

<br/>

### 便利贴Todo

样式结构

```html
<div class="todo-group" id="todo-1">
    <div class="todo-shadow"></div>
    <div class="todo-paper" style="transform: rotate(1.3deg);">
        <div class="todo-paper-bg" id="todo-bgcolor-1">
        </div>
    </div>
    <div class="cover-content-container">
        <div class="cover-content">
            <p id="todo-text-0" class="todo-text" style="transform: rotate(1.3deg);">这里是一条测试todo</p>
            <input class="editing" type="text" autofocus style="transform: rotate(1.3deg);" />
        </div>
    </div>
</div>
```



touchstart

```js
let oldTouch, touchObj;
let isDelete = false;
elem.addEventListener('touchstart', function (event) {
    oldTouch = event.touches[0];
    touchObj = event.currentTarget;
    isDelete = false;
}, false);
```

touchmove

```js
elem.addEventListener('touchmove', function (event) {
    let freshTouch = event.touches[0];
    let verticalOffset = freshTouch.clientY - oldTouch.clientY;

    if (Math.abs(verticalOffset) < tolerateVerticalOffset) {    // 上下滑动容忍之内视作成功
        var horizontalOffset = freshTouch.clientX - oldTouch.clientX;
        touchObj.style.transition = ".2s linear";

        if (Math.abs(horizontalOffset) < deviceWidth / 3) {     //移动距离过短 不判定为删除
            touchObj.style.left = horizontalOffset + 'px';
        } else {
            if (horizontalOffset < 0) {     // 左滑
                touchObj.style.left = -deviceWidth * 2 + 'px';
            } else {                        // 右滑
                touchObj.style.left = deviceWidth * 2 + 'px';
            }
            isDelete = true;
        }
    }
}, false);
```

touchend

```js
elem.addEventListener('touchend', function (event) {
    /* 在DOM中和Model中删除该todo */
    if (isDelete && elem != null) {
        elem.parentNode.removeChild(elem);
        model.data.todos.splice(index, 1);

        model.flush();
        update();
    } else {
        touchObj.style.left = 0;
    }
}, false);
```



<br/>

### 浮动球

跟随手指移动

```js
let oldTouch;
btnGroupTouchHandler = {
    start: function(event){
        oldTouch = event.touches[0];
    },
    move: function(event){
        let freshTouch = event.touches[0];
    
        let deltaRight = oldTouch.clientX - freshTouch.clientX;
        let deltaBottom = oldTouch.clientY - freshTouch.clientY;
        let right = parseFloat(btnGroup.style.right || 0) + deltaRight;
        let bottom = parseFloat(btnGroup.style.bottom || 0) + deltaBottom;
    
        /* 跟随手指移动浮动球 */
        if(right < deviceWidth - 60 && right > 0        // 边界检测
            && bottom < deviceHeight - 300 && bottom > 0){
            setStyle(btnGroup, {
                right: right + "px",
                bottom: bottom + "px"
            });
        }
        
        oldTouch = freshTouch;
    }
}
```

适配屏幕左/右侧

```js
 /* 浮动球移动到左边进行反转 */
 if(right > (deviceWidth - 60) / 2){
    setStyle(btnGroup, {
        transform: "translateY(-30px) rotateY(180deg)"      // 先将整体翻转180
    });
    Array.from($all('.ButtonGroup a i')).forEach(function(elem){
        elem.style.transform = "rotateY(180deg)";           // 再将每个元素翻转180
    });
} else {
    btnGroup.style.transform = "translateY(-30px)";
    Array.from($all('.ButtonGroup a i')).forEach(function(elem){
        elem.style.transform = "none";
    });
}
```





<br/>

### 除此之外

#### 系统主题自适应

通过native CSS实现

```css
@media (prefers-color-scheme: dark) {
    .HeaderSubGroup span {
        color: rgba(255, 255, 255, 0.6);
    }
}

@media (prefers-color-scheme: light) {
    .HeaderSubGroup span {
        color: rgba(0, 0, 0, 0.6);
    }
}
```



#### 字体大小自适应

初始时使用vh和vw进行字体大小设定，“viewpoint” = window size

- 15vw = 15% 设置width（可以理解为宽度单位）
- 15vh = 15% 设置height（可以理解高度单位）

但由于兼容性不好，该用rem进行字体自适应，设定`html`根节点`25px`，其余字体大小通过`1.2rem`进行调整，只需要再通过`@media`进行根节点调整即可



#### safari浏览器优化

1. safari浏览器顶部的工具条会影响屏幕的`screen.height`，在css中设定`100vh`也部位定值，会导致抖动现象，非常影响用户体验。因此该用js绑定`innerHeight`和`innerWidth`

   ```js
   var deviceHeight = window.innerHeight;      // 屏幕高度
   var deviceWidth = window.innerWidth;        // 屏幕宽度
   
   /* 固定屏幕尺寸（手机safari infobar尺寸不固定） */
   $('bg').style.height = deviceHeight + "px";
   ```

2. safari浏览器不响应`:hover`伪类，因此通过`touchstart`和`touchend`进行替代

3. safari浏览器不支持`rotateY`，拥有该属性的dom节点会直接不显示。解决方法是在父节点上增加`perspective`属性，并确定位置

   ```css
   .float-btns {
       transform: perspective(400);
       position: fixed;
       bottom: 0;
       right: 0;
   }
   ```

   

</details>


<br/>

## 开发环境

- **操作系统**
  - **开发环境**：macOS Catalina 10.15.4
  - **部署环境**：Ubuntu 16.04.6 LTS
- **测试环境**: 
  - Safari on iPhone11
  - Chrome Device Simulator
- **IDE**：Visual Studio Code 1.45.1
- **开发语言**
  - HTML5
  - CSS3
  - JavaScript

<br/>

## 关于作者

| Item            | VALUE                                               |
| --------------- | --------------------------------------------------- |
| **Name**        | 张喆                                                |
| **ID**          | 1754060                                             |
| **Adviser**     | 徐凯老师(阿里巴巴) 梁爽老师                         |
| **Course Name** | Web系统与技术                                       |
| **Course Time** | 星期五 2-4 [1-8]<br/>星期六 3-6 [11-17]             |
| **Email**       | [dbzdbz@tongji.edu.cn](mailto:dbzdbz.tongji.edu.cn) |

<br/>

## 项目结构

```
.
├── README.md
├── TodoMVC.html
└── static
    ├── css
    │   ├── TodoMVC.css
    │   ├── button.css
    │   ├── footer.css
    │   ├── header.css
    │   ├── popup.css
    │   └── todo.css
    ├── img
    │   ├── dark-bg.jpg
    │   └── light-bg.jpg
    └── js
        ├── TodoMVC.js
        ├── button.js
        ├── model.js
        ├── popup.js
        ├── storage.js
        ├── todo.js
        └── util.js

4 directories, 17 files
```

