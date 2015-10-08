//画一个弧形
let drawCircle=(ctx,option)=>{
  "use strict"
  ctx.beginPath()
  ctx.fillStyle = option.fillStyle
  ctx.moveTo(0, 0);
  ctx.arc(option.x||0, option.y||0, option.r||0, option.startAngle||1, option.endAngle||(Math.PI*2+1), option.isAnticlockwise||false)
  ctx.fill()
  ctx.closePath()
}
//画一段文本
let drawText=(ctx,text,option)=>{
  "use strict";
  option=option||{}
  let fontSize=option.fontSize||48
  ctx.globalCompositeOperation='source-over';
  ctx.font=fontSize+"px Arial";
  ctx.textAlign="center"
  ctx.fillText(text,0,fontSize/4);
}
//清除画板
let clear=(ctx,size)=>{
  ctx.globalCompositeOperation='destination-out';
  ctx.clearRect(-size,-size,size*2,size*2);
}
module.exports={drawCircle:drawCircle,drawText:drawText,clear:clear}