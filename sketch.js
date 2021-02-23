var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var food

function preload(){
  
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  collided  = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameover.png");
  restartImage  = loadImage("restart.png");
  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
  bg = loadImage("image.jpg");
 
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50,300,20,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided_m",collided);
  monkey.scale = 0.09;
  monkey.visible = true;
  
  
  
  ground = createSprite(200,350,900,5);
  ground.velocityX = -2;
  ground.scale = 1.5;
  ground.addImage("moving",groundImage);
  
  gameover  = createSprite(200,200);
  gameover.addImage("over",gameoverImage);
  gameover.visible = false;
  gameover.scale = 0.7;
  
  restart  = createSprite(200,370);
  restart.addImage("reload",restartImage);
  restart.visible = false;
  
  
  
  score = 0;
  food = 0;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;


  
}


function draw() {
  //console.log(ground.x);
  background(bg);
  fill("white")
  textSize(15);
  text("SCORE: "+ score, 300,50);
  fill("white");
  textSize(15);
  text("FOOD:"+ food,30,50);
  
  if(gameState === PLAY){
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60); 
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
      
    }
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      food = food + 1;
      monkey.scale += +0.02;
      
    }
    
    if(monkey.isTouching(obstaclesGroup)){
     gameState = END;
      
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    //spawn obstacles on the ground
    spawnObstacles();
    spawnbananas();
    //spawnClouds();
    
  }
    monkey.collide(ground);
  
  if (gameState === END){
    monkey.changeAnimation("collided_m",collided);
    
     gameover.visible = true;
     restart.visible = true;
    monkey.visible = false;
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(1);
    FoodGroup.setLifetimeEach(1);
    cloudsGroup.setLifetimeEach(1)
    
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);  
     
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();

  
  
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  gameover.visible = false;
  monkey.visible = true;
  monkey.scale = 0.09;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
 monkey.changeAnimation("running",monkey_running);
  score = 0;
  food = 0;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,290,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstaceImage);
              break;
      case 2: obstacle.addImage(obstaceImage);
              break;
      
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
     obstaclesGroup.add(obstacle);
 }
  
  
}
function spawnbananas() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(500,120,40,10);
    banana.y = Math.round(random(80,270));
    banana.x = Math.round(random(600,800));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(6 + score/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}











