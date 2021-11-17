# Canvas
>canvas 最早由Apple引入WebKit,用于Mac OS X 的 Dashboard,后来又在Safari和Google Chrome被实现。 
>基于 Gecko 1.8的浏览器,比如 Firefox 1.5, 同样支持这个元素。  
>&lt;canvas&gt; 元素是WhatWG Web applications 1.0规范的一部分,也包含于HTML 5中。  

### 体验Canvas

#### 什么是Canvas？
HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。  
画布是一个矩形区域，您可以控制其每一像素。  
canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

#### 创建Canvas元素 
向 HTML5 页面添加 canvas 元素。  
规定元素的 id、宽度和高度：

```html
    <canvas id="myCanvas" width="200" height="100"></canvas>
```
#### Canvas坐标系
![](images/location.jpg)

#### 通过JavaScript来绘制
```javascript
    /*获取元素*/
    var myCanvas = document.querySelector('#myCanvas');
    /*获取绘图工具*/
    var context = myCanvas.getContext('2d');
    /*设置绘图的起始位置*/
    context.moveTo(100,100);
    /*绘制路径*/
    context.lineTo(200,200);
    /*描边*/
    context.stroke();

```

#### 使用canvas绘制不同颜色的平行线

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="900px" height="1000px"></canvas>
<script>
    var canvas=document.getElementById('canvas')
    var ctx=canvas.getContext('2d')
    // 设置画笔的位置
    ctx.beginPath();

    ctx.moveTo(100,200)
    // 设置绘制的路径
    ctx.lineTo(600,200)
    // 设置描绘的颜色
    ctx.strokeStyle='red'
    //设置线条的宽度
    ctx.lineWidth=20
    ctx.stroke()

    ctx.beginPath();
    ctx.moveTo(100,100);
    /*4.绘制直线 (轨迹，绘制路径)*/
    ctx.lineTo(200,100);
    /*5.描边*/
    ctx.strokeStyle='blue'
    //设置线条的宽度
    ctx.lineWidth=10
    ctx.stroke()

    ctx.beginPath();
    ctx.moveTo(100,300);
    /*4.绘制直线 (轨迹，绘制路径)*/
    ctx.lineTo(200,300);
    ctx.strokeStyle='green'
    //设置线条的宽度
    ctx.lineWidth=25
    /*5.描边*/
    // 进行描绘
    ctx.stroke()

</script>
</body>
</html>
```

#### 绘制三角形,并填充

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas width="600" height="900" id="canvas"></canvas>
    <script>
        var  canvas=document.getElementById('canvas')
        var ctx=canvas.getContext('2d')
        ctx.moveTo(100,100);
        ctx.lineTo(200,100);
        ctx.lineTo(200,300)
        // ctx.lineTo(100,100)
        // 自动闭合
        ctx.closePath();

        // ctx.stroke();
        // 填充
        ctx.fill();




    </script>
</body>
</html>
```



### Canvas的基本使用

#### 图形绘制
需要理解些概念：  
- 路径的概念

    图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

    1. 首先，你需要创建路径起始点。
    2. 然后你使用[画图命令](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths)去画出路径。
    3. 之后你把路径封闭。
    4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

    以下是所要用到的函数：

    - `beginPath()`

      新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

    - `closePath()`

      闭合路径之后图形绘制命令又重新指向到上下文中。

    - `stroke()`

      通过线条来绘制图形轮廓。

    - `fill()`

      通过填充路径的内容区域生成实心的图形。

    生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

    **注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。**

    第二步就是调用函数指定绘制路径。

    第三，就是闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

    **注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合****。**

    ctx.beginPath()绘制新的开始路径

- 路径的绘制
    + 描边 stroke()  
    + 填充 fill()  
      ![](images/path(1).jpg)  

- 闭合路径
    + 手动闭合
    + 程序闭合 closePath()

- 填充规则(非零环绕)  
  ![](images/zero(1).jpg)

![](./images/1.png)

**利用非零环绕实现镂空正方形**

实现原理：根据绘图的方向来进行判断，若绘制的两个图形都是顺指针绘制，则出现的是一个被填充的矩形

若绘制的两个图形一个是顺时针绘制，一个是逆时针绘制，则会出现镂空的现象

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas width="600" height="900" id="canvas"></canvas>
    <script>
        var  canvas=document.getElementById('canvas')
        var ctx=canvas.getContext('2d')
        //外面大的矩形
        ctx.moveTo(100,100);
        ctx.lineTo(400,100);
        ctx.lineTo(400,400)
        ctx.lineTo(100,400)
        //里面小的矩形
        ctx.moveTo(150,100);
        ctx.lineTo(150,200);
        ctx.lineTo(250,200)
        ctx.lineTo(250,100)
        // 填充
        ctx.fill();
    </script>
</body>
</html>
```

效果如下:

![](./images/2.png)

- 开启新的路径 beginPath()
- 

#### 设置样式
- 画笔的状态
    + lineWidth 线宽，默认1px
    + lineCap 线末端类型：(butt默认)、round、square 
    + lineJoin 相交线的拐点 miter(默认)、round、bevel
    + strokeStyle 线的颜色
    + fillStyle 填充颜色
    + setLineDash() 设置虚线(数组)
    + getLineDash() 获取虚线宽度集合
    + lineDashOffset 设置虚线偏移量（负值向右偏移）
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            canvas {
                border: 1px solid #ccc;
            }
        </style>
    </head>
    <body>
    <canvas width="600" height="400">123456</canvas>
    <script>
        var myCanvas = document.querySelector('canvas');
        var ctx = myCanvas.getContext('2d');
        ctx.fillStyle = "green"
        ctx.fillRect(10, 10, 100, 100);
        // ctx.stroke()
    //     /*画平行线*/
    //     ctx.beginPath();
    //     ctx.moveTo(100,100);
    //     ctx.lineTo(200,20);
    //     // ctx.lineTo(500,50)
    //     ctx.lineWidth=10
    //     // 设置线段的样式
    //     // ctx.lineCap="round"//环绕
    //     // ctx.lineCap="square"//平行
    //     ctx.lineCap="butt"//增高
    //     //设置虚线和实线的宽度大小,里面传入数组,一个数是虚线个实线的距离,
    //     ctx.setLineDash([5,10,15])
    //   console.log(  ctx.getLineDash());
    
    //     // ctx.closePath()
    //     // // 设置相交线拐点的样式
    //     // ctx.lineJoin="round"//环绕
    //     // ctx.lineJoin="bevel"//
    //     ctx.stroke()
    
    </script>
    </body>
    </html>
    ```
    
    

#### 实例练习
- 渐变色绘制

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <style>
          canvas {
              border: 1px solid #ccc;
          }
      </style>
  </head>
  <body>
  <canvas width="600" height="400">123456</canvas>
  <script>
      var myCanvas = document.querySelector('canvas');
      var ctx = myCanvas.getContext('2d');
  
      ctx.lineWidth=10
      // 设置渐变色
      // 根据点组成的线进行循环遍历
      for (let index = 0; index < 255; index++) {
         ctx.beginPath()//给每一个点设置新的绘制路劲
         ctx.moveTo(100+index-1,100)
          ctx.lineTo(100+index,100)
          // 设置样式
          ctx.strokeStyle=`rgb(${index},${index},0)`
          ctx.stroke()
      }
  </script>
  </body>
  </html>
  ```

  

- 镂空的房子

- 绘制坐标网格

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
    canvas{
    border: 1px #ccc solid;
    }</style>
<canvas id="canvas" width="500px" height="600px"></canvas>
<script>
    var canvas=document.getElementById('canvas')
    var ctx=canvas.getContext('2d')
    // 设置绘制网格的间距
    const size=10
    // 获取画布的宽度和高度
    const w=ctx.canvas.width
    const h=ctx.canvas.height
    //对表格进行绘制
    // 需要绘制的次数
    const xcount=Math.floor(h/size)
    for (let index = 0; index < xcount; index++) {
        // 设置绘制的新路径
        ctx.beginPath();
        // 设置开始绘制的位置
        ctx.moveTo(0,index*size-.5)
        // 设置line位置
        ctx.lineTo(w,index*size-.5)
        ctx.strokeStyle='#ccc'
        ctx.stroke()

    }
    // 设置y轴绘制的位置
    const ycount=Math.floor(w/size)
    for (let index = 0; index < ycount; index++) {
    //   设置起点位置
    ctx.beginPath()
    ctx.moveTo(index*size-.5,0)
    ctx.lineTo(index*size-.5,h)
    ctx.stroke()

    }


</script>
</body>
</html>
```

效果图如下:

![](./images/3.png)

- 绘制坐标系

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
    canvas{
    border: 1px #ccc solid;
    }</style>
<canvas id="canvas" width="500px" height="600px"></canvas>
<script>
    var canvas=document.getElementById('canvas')
    var ctx=canvas.getContext('2d')
    // 设置绘制网格的间距
    const size=10
    // 获取画布的宽度和高度
    const w=ctx.canvas.width
    const h=ctx.canvas.height
    //对表格进行绘制
    // 需要绘制的次数
    const xcount=Math.floor(h/size)
    for (let index = 0; index < xcount; index++) {
        // 设置绘制的新路径
        ctx.beginPath();
        // 设置开始绘制的位置
        ctx.moveTo(0,index*size-.5)
        // 设置line位置
        ctx.lineTo(w,index*size-.5)
        ctx.strokeStyle='#ccc'
        ctx.stroke()

    }
    // 设置y轴绘制的位置
    const ycount=Math.floor(w/size)
    for (let index = 0; index < ycount; index++) {
    //   设置起点位置
    ctx.beginPath()
    ctx.moveTo(index*size-.5,0)
    ctx.lineTo(index*size-.5,h)
    ctx.stroke()

    }
    // 绘制坐标
    ctx.beginPath()
    // 设置坐标原点
    var yuan=20
    var x=yuan
    var y=h-20
    ctx.moveTo(x,y)
    ctx.lineTo(w-20,y)
    ctx.lineWidth =2;
    ctx.strokeStyle="#000"
    ctx.stroke()
    // 绘制x轴方向的三角形
    ctx.moveTo(w-15,y)
    ctx.lineTo(w-20,y-5)
    ctx.lineTo(w-20,y+5)
    ctx.fill()
    // 设置y轴重点
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(x,20)
    ctx.lineWidth =2;
    ctx.strokeStyle="#000"
    ctx.stroke()
    // 绘制y轴三角形
    ctx.moveTo(x,x-5)
    ctx.lineTo(x+5,x)
    ctx.lineTo(x-5,x)
    ctx.fill()


</script>
</body>
</html>
```

![](./images/4.png)

- 绘制坐标点

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
    canvas{
    border: 1px #ccc solid;
    }</style>
<canvas id="canvas" width="500px" height="600px"></canvas>
<script>
    var canvas=document.getElementById('canvas')
    var ctx=canvas.getContext('2d')
    // 设置绘制网格的间距
    const size=10
    // 获取画布的宽度和高度
    const w=ctx.canvas.width
    const h=ctx.canvas.height
    //对表格进行绘制
    // 需要绘制的次数
    const xcount=Math.floor(h/size)
    for (let index = 0; index < xcount; index++) {
        // 设置绘制的新路径
        ctx.beginPath();
        // 设置开始绘制的位置
        ctx.moveTo(0,index*size-.5)
        // 设置line位置
        ctx.lineTo(w,index*size-.5)
        ctx.strokeStyle='#ccc'
        ctx.stroke()

    }
    // 设置y轴绘制的位置
    const ycount=Math.floor(w/size)
    for (let index = 0; index < ycount; index++) {
    //   设置起点位置
    ctx.beginPath()
    ctx.moveTo(index*size-.5,0)
    ctx.lineTo(index*size-.5,h)
    ctx.stroke()

    }
    // 绘制坐标
    ctx.beginPath()
    // 设置坐标原点
    var yuan=20
    var x=yuan
    var y=h-20
    ctx.moveTo(x,y)
    ctx.lineTo(w-20,y)
    ctx.lineWidth =2;
    ctx.strokeStyle="#000"
    ctx.stroke()
    // 绘制x轴方向的三角形
    ctx.moveTo(w-15,y)
    ctx.lineTo(w-20,y-5)
    ctx.lineTo(w-20,y+5)
    ctx.fill()
    // 设置y轴重点
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(x,20)
    ctx.lineWidth =2;
    ctx.strokeStyle="#000"
    ctx.stroke()
    // 绘制y轴三角形
    ctx.moveTo(x,x-5)
    ctx.lineTo(x+5,x)
    ctx.lineTo(x-5,x)
    ctx.fill()
    // 设置数据
    const data=[
        {
            x:100,
            y:105,

        },
        {
            x:200,
            y:205,

        },
        {
            x:300,
            y:305,

        },
        {
            x:400,
            y:105,

        },
        {
            x:450,
            y:305,

        }
    ]
        // 对数据进行遍历后转换成绘图需要的点
    //设置点的大小
        var dottedSize=6
        //记录数据的位置
       var prevCanvasX=0
       var prevCanvasY=0
        // 遍历选择的点
    data.forEach((i,index)=>{
        var canvasX = x + i.x;
        var canvasY = y - i.y;
       /*绘制点*/
        ctx.beginPath();
        ctx.moveTo(canvasX - dottedSize / 2, canvasY - dottedSize / 2);
        ctx.lineTo(canvasX + dottedSize / 2, canvasY - dottedSize / 2);
        ctx.lineTo(canvasX + dottedSize / 2, canvasY + dottedSize / 2);
        ctx.lineTo(canvasX - dottedSize / 2, canvasY + dottedSize / 2);
        ctx.closePath();
        ctx.fill();
        // 根据索引进行连线
	


    })
```

效果如下:

![](./images/5.png)

- 绘制折线图

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
    canvas{
    border: 1px #ccc solid;
    }</style>
<canvas id="canvas" width="500px" height="600px"></canvas>
<script>
    var canvas=document.getElementById('canvas')
    var ctx=canvas.getContext('2d')
    // 设置绘制网格的间距
    const size=10
    // 获取画布的宽度和高度
    const w=ctx.canvas.width
    const h=ctx.canvas.height
    //对表格进行绘制
    // 需要绘制的次数
    const xcount=Math.floor(h/size)
    for (let index = 0; index < xcount; index++) {
        // 设置绘制的新路径
        ctx.beginPath();
        // 设置开始绘制的位置
        ctx.moveTo(0,index*size-.5)
        // 设置line位置
        ctx.lineTo(w,index*size-.5)
        ctx.strokeStyle='#ccc'
        ctx.stroke()

    }
    // 设置y轴绘制的位置
    const ycount=Math.floor(w/size)
    for (let index = 0; index < ycount; index++) {
    //   设置起点位置
    ctx.beginPath()
    ctx.moveTo(index*size-.5,0)
    ctx.lineTo(index*size-.5,h)
    ctx.stroke()

    }
    // 绘制坐标
    ctx.beginPath()
    // 设置坐标原点
    var yuan=20
    var x=yuan
    var y=h-20
    ctx.moveTo(x,y)
    ctx.lineTo(w-20,y)
    ctx.lineWidth =2;
    ctx.strokeStyle="#000"
    ctx.stroke()
    // 绘制x轴方向的三角形
    ctx.moveTo(w-15,y)
    ctx.lineTo(w-20,y-5)
    ctx.lineTo(w-20,y+5)
    ctx.fill()
    // 设置y轴重点
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(x,20)
    ctx.lineWidth =2;
    ctx.strokeStyle="#000"
    ctx.stroke()
    // 绘制y轴三角形
    ctx.moveTo(x,x-5)
    ctx.lineTo(x+5,x)
    ctx.lineTo(x-5,x)
    ctx.fill()
    // 设置数据
    const data=[
        {
            x:100,
            y:105,

        },
        {
            x:200,
            y:205,

        },
        {
            x:300,
            y:305,

        },
        {
            x:400,
            y:105,

        },
        {
            x:450,
            y:305,

        }
    ]
        // 对数据进行遍历后转换成绘图需要的点
        var dottedSize=6
       var prevCanvasX=0
       var prevCanvasY=0
        // 遍历选择的点
    data.forEach((i,index)=>{
        var canvasX = x + i.x;
        var canvasY = y - i.y;
       /*绘制点*/
        ctx.beginPath();
        ctx.moveTo(canvasX - dottedSize / 2, canvasY - dottedSize / 2);
        ctx.lineTo(canvasX + dottedSize / 2, canvasY - dottedSize / 2);
        ctx.lineTo(canvasX + dottedSize / 2, canvasY + dottedSize / 2);
        ctx.lineTo(canvasX - dottedSize / 2, canvasY + dottedSize / 2);
        ctx.closePath();
        ctx.fill();
        // 根据索引进行连线
         if(index== 0){

            ctx.beginPath()
            ctx.moveTo(x,y)
            // 移动到下一个节点
            ctx.lineTo(canvasX,canvasY)
            ctx.stroke()
            }else {
                /*上一个点*/
                ctx.beginPath();
                ctx.moveTo(prevCanvasX,prevCanvasY);
                ctx.lineTo(canvasX,canvasY);
                ctx.stroke();
            }
            // /*记录当前的坐标，下一次要用*/
            prevCanvasX = canvasX;
            prevCanvasY = canvasY;


    })

</script>
</body>
</html>
```

效果如下:

<img src="./images/6.png" style="zoom:80%;" />



#### 参考文档
- [w3school](http://www.w3school.com.cn/tags/html_ref_canvas.asp)
- [Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

### Canvas图形绘制

#### 矩形绘制
- rect(x,y,w,h) 没有独立路径
- strokeRect(x,y,w,h) 有独立路径，不影响别的绘制
- fillRect(x,y,w,h) 有独立路径，不影响别的绘制
- clearRect(x,y,w,h) 擦除矩形区域

绘制渐变色的矩形

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        var ctx=document.getElementById('canvas').getContext('2d')
        // 设置渐变色的矩形
        // x0,y0开始位置 x1,y1结束为止
        var linered =ctx.createLinearGradient(100, 100, 200, 100);
        linered.addColorStop(0, 'pink');
        linered.addColorStop(1,'yellow')
        ctx.fillStyle = linered;
        ctx.fillRect(100,100,100,100);

    </script>
</body>
</html>
```

![](./images/7.png)

#### 圆弧绘制
- 弧度概念

**注意：`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:**

**弧度=(Math.PI/180)\*角度。**

- arc()
    + x 圆心横坐标
    + y 圆心纵坐标
    + r 半径
    + startAngle 开始角度
    + endAngle 结束角度
    + anticlockwise 是否逆时针方向绘制（默认false表示顺时针；true表示逆时针）
    
    **arc方法，该方法有六个参数：`x,y`为绘制圆弧所在圆上的圆心坐标。`radius`为半径。`startAngle`以及`endAngle`参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数`anticlockwise`为一个布尔值。为true时，是逆时针方向，否则顺时针方向。**
    
    ```html
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <canvas id="canvas" ></canvas>
        <script>
            var ctx=document.getElementById('canvas').getContext('2d')
            ctx.beginPath();
            // 绘制一个○
            ctx.arc(100, 100, 20, 0,  Math.PI*2,true);
            ctx.stroke();
            //ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        </script>
    </body>
    </html>
    ```

#### 绘制扇形

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas" ></canvas>
    <script>
        var ctx=document.getElementById('canvas').getContext('2d')
        ctx.beginPath();
        // 绘制一个○
        ctx.moveTo(100,100)
        ctx.arc(100, 100, 20, 0,  Math.PI/2);
        ctx.closePath();

        ctx.stroke();
        //ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    </script>
</body>
</html>
```

![](./images/8.png)

在绘制扇形的基础上,设置moveTo的开始绘制的起点位置,

最后使用自动闭合就可以得到扇形

如果此时不设置moveTo的位置此时得到的效果是这样的

![](./images/9.png)

#### 园绘制成不同的扇形进行切割

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas" ></canvas>
    <script>
        var ctx=document.getElementById('canvas').getContext('2d')
    //    绘制等分的扇形
    // 设置分成几等分
    const num=30
    // 一个园占得份数
    const circle=Math.PI*2/num
    // 设置圆心
    const w=ctx.canvas.width
    const h=ctx.canvas.height
    for (let index = 0; index < num; index++) {
        // 重新绘制路径
        ctx.beginPath();
        ctx.moveTo(w/2,h/2)
        ctx.arc(w/2,h/2,20,index*circle,(index+1)*circle)
        ctx.closePath()
        ctx.stroke()

    }
    </script>
</body>
</html>
```

![](./images/10.png)



#### 根据数据绘制不同的饼图

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas" width="600px" height="900px"></canvas>
    <script>
        var ctx=document.getElementById('canvas').getContext('2d')
        // 设置数据
        const list=[10,50,80,90,50]
        // 求出数据的总和
       const total= list.reduce((old,newVa)=>old+newVa)
        // 根据总和设计每个数占得份数
        const listArr=[]
        list.forEach((i,index)=>{
            // const 份数
            listArr.push((i/total)*Math.PI*2)
        })
        // 进行遍历份数
        // 设置遍历的开始位置
        var star = 0;
        var x0=ctx.canvas.width/2
        var y0=ctx.canvas.height/2
        /*获取随机颜色*/
        var getRandomColor = function () {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }
        listArr.forEach(function (item,i) {
        /*上一次绘制的结束弧度等于当前次的起始弧度*/
        // var end = star + item;
        // 设置结束的位置,结束位置,是上一次开始的位置
        var end=star+item
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.arc(x0,y0,150,star,end);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        /*记录当前的结束位置作为下一次的起始位置*/
        star = end;
        });
        console.log(listArr);

    </script>
</body>
</html>
```

![](./images/11.png)

#### 绘制文本

canvas 提供了两种方法来渲染文本:

- [`fillText(text, x, y [, maxWidth\])`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText)

  在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.

- [`strokeText(text, x, y [, maxWidth\])`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText)

  在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

- ctx.font = '微软雅黑' 设置字体
- strokeText()
- fillText(text,x,y,maxWidth)
    + text 要绘制的文本
    + x,y 文本绘制的坐标（文本左下角）
    + maxWidth 设置文本最大宽度，可选参数
- ctx.textAlign文本水平对齐方式，相对绘制坐标来说的
    + left
    + center
    + right
    + start 默认
    + end
    + direction属性css(rtl ltr) start和end于此相关
        - 如果是ltr,start和left表现一致
        - 如果是rtl,start和right表现一致
- ctx.textBaseline 设置基线（垂直对齐方式  ）
    + top 文本的基线处于文本的正上方，并且有一段距离
    + middle 文本的基线处于文本的正中间
    + bottom 文本的基线处于文本的证下方，并且有一段距离
    + hanging 文本的基线处于文本的正上方，并且和文本粘合
    + alphabetic 默认值，基线处于文本的下方，并且穿过文字
    + ideographic 和bottom相似，但是不一样
- measureText() 获取文本宽度obj.width

#### 实例练习

三角函数:

![](./images/三角函数.png)

- 绘制扇形
- 绘制圆角矩形
- 绘制圆
- 绘制饼图

### 做动画
#### 绘制图片

绘制图片 图片的加载

引入图像到canvas里需要以下两步基本操作：

1. 获得一个指向[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片（参见[例子](http://www.html5canvastutorials.com/tutorials/html5-canvas-images/)）
2. 使用`drawImage()`函数将图片绘制到画布上

```html
<!DOCTYPE HTML>
<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="578" height="400"></canvas>
    <script>
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function() {
        context.drawImage(imageObj, 69, 50);
      };
      imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
    </script>
  </body>
</html>      
```

#### 由零开始创建图像

或者我们可以用脚本创建一个新的 [`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement) 对象。要实现这个方法，我们可以使用很方便的`Image()构造函数。`

```js
var img = new Image();   // 创建一个<img>元素
img.src = 'myImage.png'; // 设置图片源地址
```

当脚本执行后，图片开始装载。

若调用 `drawImage` 时，图片没装载完，那什么都不会发生（在一些旧的浏览器中可能会抛出异常）。因此你应该用load事件来保证不会在加载完毕之前使用这个图片：

```js
var img = new Image();   // 创建img元素
img.onload = function(){
  // 执行drawImage语句
}
img.src = 'myImage.png'; // 设置图片源地址
```

如果你只用到一张图片的话，这已经够了。但一旦需要不止一张图片，那就需要更加复杂的处理方法，但图片预加载策略超出本教程的范围。

- drawImage()
    + 三个参数drawImage(img,x,y)
        - img 图片对象、canvas对象、video对象
        - x,y 图片绘制的左上角
    + 五个参数drawImage(img,x,y,w,h)
        - img 图片对象、canvas对象、video对象
        - x,y 图片绘制的左上角
        - w,h 图片绘制尺寸设置(图片缩放，不是截取)
    + 九个参数drawImage(img,x,y,w,h,x1,y1,w1,h1)
        - img 图片对象、canvas对象、video对象
        - x,y,w,h 图片中的一个矩形区域
        - x1,y1,w1,h1 画布中的一个矩形区域

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas" width="600px" height="900px"></canvas>

    <script>
        var ctx=document.getElementById('canvas').getContext('2d')
        // 创建一个新的图片
        let img=new Image()
        img.onload=function(){
            console.log(img);
            // canvas中绘制image画布
            ctx.drawImage(img,100,100,200,200);

        }
        img.src="../image/01.jpg"
    </script>
</body>
</html>
```



#### 序列帧动画
- 绘制精灵图
- 动起来
- 控制边界
- 键盘控制

#### 坐标变换
- 平移 移动画布的原点
    + translate(x,y) 参数表示移动目标点的坐标
- 缩放
    + scale(x,y) 参数表示宽高的缩放比例
- 旋转
    + rotate(angle) 参数表示旋转角度



​    



