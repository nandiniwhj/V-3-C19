var stone,boy,ground,bird,gameover,coin,restart;
var stoneImg,boyImg,groundImg,birdImg,stone2Img,stone3Img,gameoverImg,invisibleGround,coinImg,endImg,restartImg;
var stonesGroup,birdGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var CoinCollection=0;
var bird
var coin

function preload(){
stoneImg=loadImage("stone.png")
stone2Img=loadImage("stone2.png")
stone3Img=loadImage("stone3.png")
boyImg=loadAnimation("boy.png","boy1.png","boy2.png","boy3.png");
backgroundImg=loadImage("background3.jpg");
birdImg=loadAnimation("bird.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png")
  gameoverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart-1.png")
groundImg=loadImage("ground2.png");
  endImg=loadAnimation("boy.png");
  birdStopImg=loadAnimation("bird.png")
   coinImg=loadAnimation("coin.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
  coinStopImg=loadAnimation("coin.png")
}

function setup() {
 createCanvas(450,450)
  
  boy=createSprite(100,50,50,50);
  boy.addAnimation("running",boyImg)
  boy.addAnimation("collided",endImg)
  boy.scale=0.5;
  
  ground = createSprite(250,480,400,20);
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;
  ground.scale=1
   
  gameover=createSprite(230,200);
  gameover.addImage(gameoverImg);
  
  restart=createSprite(225,250);
  restart.addImage(restartImg);
  
  invisibleGround = createSprite(0,365,800,10);
  invisibleGround.visible = false;
  
  gameover.visible=false;
  
  stonesGroup=new Group();
  birdsGroup=new Group();
  coinsGroup=new Group();
  boy.setCollider("rectangle",0,0,1,1);
  boy.debug = false
  
}

function draw() {
  background(backgroundImg)
  
  stroke("red")
   text("Coin: "+ CoinCollection,10,30);
  
  if(gameState===PLAY){
    gameover.visible=false;
    restart.visible=false;
    
  ground.velocityX=-3
    
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }
     boy.velocityY = boy.velocityY + 0.8
    
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
 boy.collide(invisibleGround);
    
    spawnStones();
    spawnbirds();
    spawncoins();
    
if(coinsGroup.isTouching(boy)){
  coinsGroup.destroyEach();
  CoinCollection=CoinCollection+1
}
     if(birdsGroup.isTouching(boy)||stonesGroup.isTouching(boy)){
    gameState=END;
  }
   ground.depth = boy.depth;
    boy.depth = boy.depth + 1
  }
  else if(gameState===END){
    
    gameover.visible=true;
    restart.visible=true;
    restart.scale=0.5;
    
    gameover.scale=0.8;
    ground.velocityX=0;
    boy.velocityY=0;
    boy.changeAnimation("collided",endImg)
    bird.changeAnimation("stop",birdStopImg)
    coin.changeAnimation("stopC",coinStopImg)
    stonesGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0)
    birdsGroup.setLifetimeEach(-1);
    stonesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    coinsGroup.setVelocityXEach(0)
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
   drawSprites()
}
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  boy.changeAnimation("running",boyImg);
   // bird.addAnimation("sting",birdImg);
//  coin.addAnimation("round",coinImg);
    
   birdsGroup.destroyEach();
   coinsGroup.destroyEach();
   stonesGroup.destroyEach();
  Coin=0
}
function spawnStones() {
  if (frameCount % 200 === 0) {
    var stone = createSprite(500,370,40,10);
    stone.setCollider("circle",0,0,100);
    stone.velocityX=-3;
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1:stone.addImage(stoneImg)
             break;
      case 2: stone.addImage(stone2Img) 
             break;
      case 3: stone.addImage(stone3Img);
             break;
      default: break;    
    }
     stone.scale = 0.3;
     stone.lifetime = 300;
    stone.depth=boy.depth
    boy.depth+=1;
   //add each stone to the group
    stonesGroup.add(stone);
  }
  
}

function spawnbirds() {
  //write code here to spawn the birds
  if (frameCount % 170 === 0) {
    bird = createSprite(500,200,40,10);
    bird.addAnimation("sting",birdImg);
       bird.addAnimation("stop",birdStopImg);
 
    bird.y=Math.round(random(100,250));
    bird.scale = 0.3;
    bird.velocityX = -3;
    bird.lifetime=300;
    bird.depth=boy.depth
    boy.depth+=1;
    birdsGroup.add(bird);
  }
}
function spawncoins() {
  //write code here to spawn the birds
  if (frameCount % 150 === 0) {
    coin = createSprite(500,350,40,10);
    coin.y=Math.round(random(150,350));
    coin.addAnimation("round",coinImg);
    coin.addAnimation("stopC",coinStopImg)
    coin.scale = 0.2;
    coin.velocityX = -3;
    coin.lifetime=300;
    coin.depth=boy.depth
    boy.depth+=1;
    coinsGroup.add(coin);
  }
}
