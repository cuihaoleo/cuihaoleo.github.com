$(document).ready(function(e) {
    var canvas=document.getElementById("canvas");//获取画布
        var particles=[];//存放雪花
        var tick=0;//计数
        function loop()
    {
                //创建雪花
                createParticles();
                //更新雪花
                updateParticles();
                //移除雪花
                killParticles();
                //绘制雪花
                drawParticles();        
    }
        //创建雪花
    function createParticles() {
    if(tick % 10 == 0) {
        if(particles.length <30) {
            particles.push({
                    x: Math.random()*canvas.width,//在canvas宽度内随机出现
                    y: 0,
                    speed: 1+Math.random()*2, //between 1 and 3
                    radius: 1+Math.random()*5, //between 1 and 5
                    color: "white",
            });
        }
    }
}
//更新雪花
function updateParticles() {
    for(var i in particles) {
        var part = particles[i];
        part.y += part.speed;
    }
}
//移除雪花
function killParticles() {
    for(var i in particles) {
        var part = particles[i];
        if(part.y > canvas.height) {
            part.y = 0;
        }
    }
}
//绘制雪花
function drawParticles() {
    var c = canvas.getContext('2d');
    c.fillStyle ="#ccc";
    c.fillRect(0,0,canvas.width,canvas.height);
    for(var i in particles) {
        var part = particles[i];
        c.beginPath();
        c.arc(part.x,part.y, part.radius, 0, Math.PI*2);
        c.closePath();
        c.fillStyle = part.color;
        c.fill();
    }
}
        setInterval(loop,30);
});