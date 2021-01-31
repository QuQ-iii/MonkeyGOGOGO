var monkey, rock, ground, food, background0;
var monkeyIMG, monkeydedIMG, rockIMG, groundIMG, foodIMG, background0IMG;
var ground, foodGrp, obstacleGrp;

var score = 0;
var PLAY = 1;
var END = 0;

var gameState = PLAY;
var ground;

function preload(){
  background0IMG = loadImage("jungle.jpg");
  
  monkeyIMG = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
   monkeydedIMG = loadImage("Monkey_01.png");
  
  foodIMG = loadImage("banana.png");
  
  rockIMG = loadImage("stone.png");
  
}

function setup() {
  createCanvas(450, 300);
  
  background0 = createSprite(0,0,400,400);
  background0.addImage("bg", background0IMG);
  background0.velocityX = -4;
  
  monkey = createSprite(50,200,10,10);
  monkey.addAnimation("run",monkeyIMG);
  monkey.scale = 0.1;
  
  ground = createSprite(200,250,500,20);
  ground.visible = false;
  
  foodGrp = createGroup();
  obstacleGrp = createGroup();
  
  score = 0;

}

function draw() {
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(gameState === PLAY){
    monkey.addAnimation("runrun", monkeyIMG);
    
    background0.velocityX = -4;
    
    if(keyDown("space")){
      monkey.velocityY = -6;
    }
    
    if (background0.x < 0){
      background0.x = background0.width/2;
    }
    
    if(frameCount % 80 === 0){
      foods();
    }
    if(frameCount % 100 === 0){
      obstacles();
    }
    
    if(monkey.isTouching(foodGrp)){
      score = score + 1;
      monkey.scale += 0.1;
      foodGrp.destroyEach();
      
    }
    if(monkey.isTouching(obstacleGrp)){
     gameState = END;
    }
    
    
    monkey.collide(ground);
  }
  
  
  
  drawSprites();
  
  if(gameState === END){
    fill("white");
    textSize(20);
    text("click space to try again", 200,200);
    
    monkey.addImage("ded", monkeydedIMG);

    monkey.velocityY = 0;
    background0.velocityX = 0;
    
    foodGrp.setVelocityXEach(0);
    obstacleGrp.setVelocityXEach(0);
    
    foodGrp.setLifetimeEach(-1);
    obstacleGrp.setLifetimeEach(-1);
    
    if(keyDown("space")){
      gameState = PLAY;
      
      score = 0;
      monkey.scale = 0.1;
      foodGrp.destroyEach();
      obstacleGrp.destroyEach();
    }
  }
  
  fill("white");
  textSize(20);
  text("SCORE : " + score,300,40);
}


function obstacles(){
  rock = createSprite(500,200,10,10);
  rock.addImage("rock",rockIMG);
  rock.scale = 0.1;
  rock.velocityX = -5;
  
  rock.lifetime = 300;
  
  obstacleGrp.add(rock);
  
}

function foods(){
  food = createSprite(500,Math.round(random(10,200)),10,10);
  food.addImage("banana",foodIMG);
  food.scale = 0.05;
  food.velocityX = -5;
  
  food.lifetime = 300;
  
  foodGrp.add(food);
}