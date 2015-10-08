//引用css
require('../../stylus/index.styl')

//引用进度条类
import CurveProcessor from './../curve-processor/curve-processor.js'

//定义画布
let canvas=document.getElementById('curve-processor')
let ctx=canvas.getContext('2d')
//配置项
let option={
  size:100,
  width:20,
  startAngle:Math.PI * 3/4,
  endAngle:Math.PI /4,
  primaryColor:'red',
  activeColor:'#99ccff'
}
//进度条实例化
let processor=new CurveProcessor(ctx,option)
//监听input值同步进度条
let handler=document.getElementById('handler')
handler.oninput=function(){
  "use strict";
  processor.setProgress(this.value/100)
}