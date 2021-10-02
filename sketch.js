var fantasma, fanatasmaImg;
var torre, torreImg;
var ventana, ventanaImg, ventanaGroup;
var barandal, barandalImg, berandalGroup;
var bloque, bloqueGroup;

var Gamestate= "play";

var musicaBoo;
var puntaje;

function preload(){
  fantasmaImg=loadImage("ghost-standing.png");
  torreImg=loadImage("tower.png");
  ventanaImg=loadImage("door.png");
  barandalImg=loadImage("climber.png");
  musicaBoo=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  musicaBoo.loop();
  
  torre=createSprite(300,300);
  torre.addImage("torre",torreImg);
  torre.velocityY=30;
  
  ventanaGroup=new Group();
  barandalGroup=new Group();
  bloqueGroup=new Group();
  
  fantasma=createSprite(200,200,50,50);
  fantasma.addImage("fantasma",fantasmaImg);
  fantasma.scale=0.3;
  
  puntaje=0;
  
}
function draw(){
  background(0);
  stroke("purple");
  strokeWeight(6);
  fill("orange");
  textSize(30);
  text("PUNTACION: "+puntaje,60,60);
  
  if(Gamestate==="play"){
    puntaje=puntaje+Math.round(getFrameRate()/60);
    if(keyDown("left_arrow")){
      fantasma.x=fantasma.x-10;
    }
    if(keyDown("right_arrow")){
      fantasma.x=fantasma.x+10;
    }
    if(keyDown("space")){
      fantasma.velocityY=-10;
    }
    fantasma.velocityY=fantasma.velocityY+1 ;
    if(torre.y>400){
      torre.y=300;
    }
    if(barandalGroup.isTouching(fantasma)){
      fantasma.velocityY=0;
    }
    if(bloqueGroup.isTouching(fantasma)||fantasma.y>600){
      fantasma.destroy();
      ventanaGroup.setLifetimeEach(0);
      barandalGroup.setLifetimeEach(0);
      Gamestate="end";
    }
    spawnventana();
    drawSprites();
  }
  
  if(Gamestate==="end"){
    stroke("purple");
    strokeWeight(6);
    fill("orange");
    textSize(30);
    text("FIN DEL CAMINO   "+puntaje,230,250);
  }  
}
function spawnventana(){
  if(frameCount %50===0){
    ventana=createSprite(200,-50);
    ventana.addImage("ventana",ventanaImg);
    barandal=createSprite(200,10);
    barandal.addImage("barandal",barandalImg);
    bloque=createSprite(200,15);
    bloque.width=barandal.width;
    bloque.height=2;
    
    ventana.x=Math.round(random(120,400));
    ventana.velocityY=25;
    
    barandal.x=ventana.x;
    barandal.velocityY=25;
    
    bloque.x=ventana.x;
    bloque.velocityY=25;
    
    fantasma.depth=ventana.depth;
    fantasma.depth=fantasma.depth+1
    
    ventana.lifetime=800;
    barandal.lifetime=800;
    bloque.lifetime=800;
    
    bloque.debug=true;
    
    ventanaGroup.add(ventana);
    barandalGroup.add(barandal);
    bloqueGroup.add(bloque);
  }
}
