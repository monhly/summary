//vue模板编译的过程主要如下:template => ast ==> render 函数
//vue在模板编译的码中自行compileToFunctions 将template转化为render函数

//// 将模板编译为render函数const { render, staticRenderFns } = compileToFunctions(template,options//省略}, this)
/**
 * compileToFunctions的主要逻辑
 * 1.调用parse方法将template转化为ast(抽象语法树)
 * parse的目标:吧template转换为ast树,它是一种用js对象的形式来描述整个模板
 * 解析过程:利用正则表达式顺序解析模板,当解析到开始标签,闭合标签,文本的时候,都会分别执行对应的回调函数,来构建ast树的目的
 * ast元素节点总共有三种类型,type1表示普通节点,2为表达式,3位纯文本

 * 2.对静态节点做优化
  这个过程主要分析出哪些是静态节点,给其打一个标记,为后续更新渲染做优化,
  深度遍历ast,查看每个子树的节点元素,
  3,生成代码
  

 */