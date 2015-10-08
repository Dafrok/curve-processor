import {drawCircle,drawText,clear} from './draw.js'

class CurveProcessor{
  constructor(ctx,option) {
    this.context = ctx
    this.primaryColor=option.primaryColor
    this.activeColor=option.activeColor
    this.size=option.size
    this.width=option.width
    this.startAngle=option.startAngle
    this.endAngle=option.endAngle
    this.context.translate(this.size,this.size)
    this.setProgress()
  }
  getProgressBar(progress){
    "use strict";
    return this.startAngle+progress*(2*Math.PI-this.startAngle+this.endAngle)
  }
  setProgress(value){
    "use strict";
    //初始化
    this.progress=value&&value>1||value<0?0:value||0
    let ctx=this.context
    let length=this.size - this.width/2
    let progress=this.getProgressBar(this.progress)
    clear(ctx,this.size)
    ctx.globalCompositeOperation='source-over';

    //创建外圆
    drawCircle(ctx,{
      r:this.size,
      fillStyle:this.primaryColor,
      startAngle:this.startAngle,
      endAngle:this.endAngle,
      isAnticlockwise:false
    })
    //进度条两头的圆圈
    drawCircle(ctx,{
      x:length*Math.cos(this.startAngle),
      y:length*Math.sin(this.startAngle),
      r: this.width/2,
      fillStyle:this.activeColor
    })
    drawCircle(ctx,{
      x:length*Math.cos(this.endAngle),
      y:length*Math.sin(this.endAngle),
      r: this.width/2,
      fillStyle:this.primaryColor
    })
    //创建进度条
    drawCircle(ctx,{
      r:this.size,
      fillStyle:this.activeColor,
      startAngle:this.startAngle,
      endAngle:progress,
      isAnticlockwise:false
    })
    //创建进度圆
    drawCircle(ctx,{
      x:length*Math.cos(progress),
      y:length*Math.sin(progress),
      r: this.width/2,
      fillStyle:this.activeColor
    })
    //创建内圆
    ctx.globalCompositeOperation='destination-out';
    drawCircle(ctx,{
      r:this.size-this.width
    })
    drawText(ctx,parseInt(this.progress*100)+"%")
  }
}

module.exports=CurveProcessor