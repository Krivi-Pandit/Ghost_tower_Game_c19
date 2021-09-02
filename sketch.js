var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,40,40);
  ghost.addImage("ghostStanding", ghostImg);
  ghost.scale = 0.4;

  invisibleBlockGroup = new Group ();
  doorsGroup = new Group ();
  climbersGroup = new Group ();
 
  ghost.setCollider("rectangle",0,20,130,250);
  ghost.debug = true;
}

function draw() {
  background(0);
  
  if(gameState === "play"){
    
    


    if(tower.y > 400){
      tower.y = 300
   }
    
    if(keyDown("SPACE")){
      ghost.velocityY = -12;
    }


    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4
    }
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -4;
    }
    
    

    spawnDoors();

    ghost.velocityY = ghost.velocityY + 0.8;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost)){
      gameState = "end"

    }


    drawSprites();
  }
  
  
  if(gameState === "end"){
    
    textSize(45);
    text("Game Over",175,200);

  }
  console.log(gameState);
}


function spawnDoors(){
  if(frameCount%350 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(100,500));
    
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = climber.x;
    invisibleBlock.visible = false;


    ghost.depth = door.depth;
    ghost.depth += 1;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);


    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;

    //climber.debug = true;
  }

}