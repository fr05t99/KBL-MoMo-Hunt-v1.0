function loadImages()
{
kblImage= new Image;
sumoImage= new Image;
momoImage= new Image;
kblImage.src= "assets/boy.png";
sumoImage.src= "assets/sumo.jpg";
momoImage.src= "assets/momo.jpg";    
}
function init()
{
    console.log("Initialisation Ho ra");
    canvas = document.getElementById('mycanvas');
    pen=canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    GAME_OVER=false;
    g=0;
    sumo1={
        x : 350,
        y : 0,
        w : 80,
        h : 80,
        speedX:10,
        speedY:10,
    };
     sumo2={
        x : 850,
        y : 0,
        w : 80,
        h : 80,
        speedX:8,
        speedY:10,
    };
     kbl={
        x : 0,
        y : H/2,
        w : 80,
        h : 80,
        speedX:0,
        speedY:10,
    };
     momo={
        x : W-80,
        y : H/2,
        w : 80,
        h : 80,
        speedX:10,
        speedY:10,
    };
    function movePlayer(){
        kbl.speedX = 10;
    }
    function stopPlayer(){
    kbl.speedX = 0;
    }
    
    // Add Event Listener for mouse click
    canvas.addEventListener('mousedown',movePlayer);
    canvas.addEventListener('mouseup',stopPlayer);
    
}
function draw()
{
    pen.clearRect(0,0,W,H);
    console.log("Bana rha hoon drawing");
    pen.drawImage(sumoImage,sumo1.x,sumo1.y,sumo1.w,sumo1.h);
    pen.drawImage(sumoImage,sumo2.x,sumo2.y,sumo2.w,sumo2.h);
    pen.drawImage(kblImage,kbl.x,kbl.y,kbl.w,kbl.h);
    pen.drawImage(momoImage,momo.x,momo.y,momo.w,momo.h);
}
function update()
{
    console.log("Update ho ra");
    sumo1.y+=sumo1.speedY;
    sumo2.y+=sumo2.speedY;
    sumo1.x+=sumo1.speedX;
    sumo2.x+=sumo2.speedX;
    if(sumo1.x<=0 || sumo1.x>=W-sumo1.h)
        {
            sumo1.speedX=-1*sumo1.speedX;
        }
    if(sumo2.x<=0 || sumo2.x>=W-sumo2.h)
        {
            sumo2.speedX=-1*sumo2.speedX;
        }
   
    if(sumo1.y>=H-sumo1.w || sumo1.y<=0)
        {
            sumo1.speedY=-1*sumo1.speedY;
        }
    if(sumo2.y>=H-sumo2.w || sumo2.y<=0)
        {
            sumo2.speedY=-1*sumo2.speedY;
        }
    kbl.x+=kbl.speedX;
    if(isColliding(kbl,sumo1)){
        console.log("Player collided with enemy");
        alert("Game Over");
        GAME_OVER = true;}
if(isColliding(kbl,sumo2)){
        console.log("Player collided with enemy");
        alert("Game Over");
        GAME_OVER = true;}
            if(isColliding(kbl,momo)){
        console.log("Player reached goal");
        alert("Mil GAYA MoMo :)");
        GAME_OVER = true;
                g=1;}
                
    }
        function isColliding(r1,r2){
    var firstCond = Math.abs(r1.x - r2.x) <= Math.max(r1.w,r2.w)-20;
    var secondCond = Math.abs(r1.y - r2.y) <= Math.max(r1.h,r2.h)-20;
    
    return firstCond && secondCond;
}

function gameLoop()
{
    draw();
    update();
    if(GAME_OVER==false){
            window.requestAnimationFrame(gameLoop);
        }
        else{
            
            if(g==1)
                {
                    alert("Let's play next level");
                    window.open("level3.html","_self");
                }
            else if(g!=1)
                {
                    choice = confirm("Phir se khelega?");
                    if(choice)
                        {
                            restartGame();
                        }
                    else{
                        alert("Thankyou for Playing!");
                    }
                }
        }
}

function restartGame(){
    init();
    gameLoop();
}
loadImages();
restartGame();
