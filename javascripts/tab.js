$=function(id){return document.getElementById(id);}

var oldSelectedTabId = null;//上次选中的选项卡

/*初始化日记的选项卡*/
initTab=function(t){
  var tab = $(t);//取得选项卡标签对象
  if (!tab)return;//没有这个东东就退出
  var hs = tab.getElementsByTagName('a');//取得所有的超链接
  var l = hs.length;//超链接长度
  for (var i = 0;i < l ;i++ ){//遍历超链接
    var a = hs[i];//取得一个超链接
    a.onclick=function(ev){//设置超链接的onclick事件
      this.blur();//先把超链接的焦点去了……
      toggleTab(this);//单击选项卡标签时，切换选项卡,调用自定义函数toggleTab
    }
    if (hasClass(a.parentNode,"s"))//如果这个超链接的上一层（li）的class是s的话
      toggleTab(a);//如果当前超链接是被选中的标签，切换选项卡
    else
     addClass(getTabObj(a.id,"content"),"hidden");//如果当前标签未被选中，隐藏当前标签显示内容
    
    a.href="javascript:void(0)"//将当前超链接的href清除，避免url中出现#...
  }
  if (!oldSelectedTabId)//如果没设置默认选中标签，则认为第一个标签被选中
    toggleTab(hs[0]);
}

//切换选项卡
toggleTab = function(a){
  if (!a)return;//如果没有对象，退出（可能的情况，选项卡为空……）
  if (oldSelectedTabId&&oldSelectedTabId==a.id)return;//如果还是选择当前选项卡，直接退出
  else if (oldSelectedTabId){//如果之前选择过选项卡标签而且不是当前选项卡
    removeClass(getTabObj(oldSelectedTabId,"href").parentNode,"s");//移除超链接上一层的被选中样式
    addClass(getTabObj(oldSelectedTabId,"content"),"hidden");//设置之前被选中选项卡内容隐藏
  }
  addClass(a.parentNode, "s");//设置该超链接上一层为被选中
  oldSelectedTabId = a.id;//设置之前被选中选项卡为当前选项卡
  removeClass(getTabObj(a.id,"content"),"hidden");//将当前选项卡的内容设置为不隐藏
}

//取得对应id的对象
getTabObj=function(id,type){//用来将给定的id替换成正确的id
  var TYPE = {content:"c_",href:"h_"}//类型:内容（content）和超链接(href)
  var r = /(c_|h_)/g//用于替换的正则
  return $(id.replace(r,TYPE[type]));//返回对应id的对象
}

//是否存在指定样式class
hasClass = function(obj,className){
  if (!obj||!obj.className)return false;//如果对象或者对象class不存在就退出
  return new RegExp("\\b"+className+"\\b","g").test(obj.className);//用正则判断对象是否有指定class
}

//增加样式class
addClass = function(obj,className){
  if (!obj)return false;//如果对象不存在就退出
  obj.className = obj.className + " " + className+" ";//给对象增加class
}

//删除指定样式class
removeClass = function(obj,className){
  if (!obj||!obj.className)return false;//如果对象或者对象class不存在就退出
  obj.className = obj.className.replace(new RegExp("\\b"+className+"\\b","g"),"").replace(/^\s*|\s$/g,"")//用正则替换掉原来的不要的class，并去除头尾多余的空格
}
