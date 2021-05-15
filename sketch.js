var bomb;
var bowl;
var coin;
var fruit1 ,fruit2 ,fruit3 ,fruit4 ,fruit5;
var bg;
var wall1, wall2, wall3, wall4 ,wall5;
var fruits;
var foodGroup;
var score=0;
var bombGroup;
var coinGroup;
var blast;
var gameover;
var gamefinish;
var trophy;
var youwin;
var leftbutton;
var rightbutton;
var resetbutton;

function preload() {
  fruit_1 = loadImage("fruit1.png");
  fruit_2 = loadImage("fruit2.png");
  fruit_3 = loadImage("fruit3.png");
  fruit_4 = loadImage("fruit4.png");
  fruit_5 = loadImage("fruit5.png");
  coin_1 = loadImage("coin.png");
  bomb_1 = loadImage("bomb.png");
  bowl_1 = loadImage("bowl.png");
  bg_image = loadImage("backg.jpg");
  blast_image = loadImage("bombblast.png");
  gameover_image = loadImage("gameover.png");
  trophy_image = loadImage("trophy.png");
  youwin_image = loadImage("youwin.png");
  reset_image = loadImage("reset.png");
  rightbutton_image = loadImage("rightarrow.png");
  leftbutton_image = loadImage("leftarrow.png");
}
  
function setup(){
    createCanvas(displayWidth,displayHeight);

    score=0;

    bowl = createSprite(displayWidth/2,displayHeight/1-70,50,50);
    bowl.addImage(bowl_1);
    bowl.scale=0.2;

    blast = createSprite(displayWidth/2,displayWidth/2-300,200,210);
    blast.addImage(blast_image);
    blast.scale=0.75;
    blast.visible=false;

    gameover = createSprite(displayWidth/2,displayWidth/2-300,200,210);
    gameover.addImage(gameover_image);
    gameover.visible=false;

    wall1 = createSprite(displayWidth/400,displayHeight/2,4,displayHeight);
    wall2 = createSprite(displayWidth-2,displayHeight/2,4,displayHeight);  
    wall3 = createSprite(displayWidth/2,displayHeight,displayWidth,4);  
    wall4 = createSprite(displayWidth/2,displayHeight/400,displayWidth,4);  
    wall5 = createSprite(displayWidth/2,displayHeight/20,displayWidth,4);  

    leftbutton = createSprite(displayWidth/2-50,displayHeight/1-30,50,35); 
    leftbutton.addImage(leftbutton_image);
    leftbutton.scale=0.16;

    rightbutton = createSprite(displayWidth/2+50,displayHeight/1-30,50,35);  
    rightbutton.addImage(rightbutton_image);
    rightbutton.scale=0.16;

    resetbutton = createSprite(displayWidth/1.1,displayHeight/40,40,25);  
    resetbutton.addImage(reset_image);
    resetbutton.scale=0.15;


  
    trophy = createSprite(displayWidth/2,displayHeight/2-80,200,210);
    trophy.addImage(trophy_image);
    trophy.scale=0.55;
    trophy.visible=false;


    youwin = createSprite(displayWidth/2,displayHeight/2+50,200,210);
    youwin.addImage(youwin_image);
    youwin.scale=0.55;
    youwin.visible=false;


    foodGroup=new Group();
    bombGroup=new Group();
    coinGroup=new Group();
  }

function draw(){
  background(bg_image);
  fill("red");
  text("Score: "+ score, displayWidth/40,displayHeight/23);

  
  if (mousePressedOver(leftbutton)) {
    bowl.x=bowl.x-6
  }

  if (mousePressedOver(rightbutton)) {
    bowl.x=bowl.x+6
  }     
 
  if (mousePressedOver(resetbutton)) {
    score = 0; 
    blast.visible=false;
    gameover.visible=false;
    bowl.visible=true; 
    trophy.visible=false;
    youwin.visible=false;
  }
  
  bowl.collide(wall1);
  bowl.collide(wall2);

  if (foodGroup.isTouching(bowl)){
  foodGroup.destroyEach();
  score = score + 1; 
}
  
if (coinGroup.isTouching(bowl)){
  coinGroup.destroyEach();
  score = score + 10; 
}

if (bombGroup.isTouching(bowl)){
  score = 0; 
  foodGroup.velocityY=0;
  coinGroup.velocityY=0;
  bombGroup.velocityY=0;
  blast.visible=true;
  gameover.visible=true;
  bowl.visible=false;
}

if (score>100) {
  bowl.visible=false;
  trophy.visible=true;
  youwin.visible=true;
 
}

  if(frameCount%10 === 0){
    fruits = createSprite(random(displayWidth),random(displayHeight), 100, 100);
    fruits.velocityY = 6;
    fruits.scale = random(0.1,0.2);
    var rand = Math.round(random(1,5));
    switch(rand){
        case 1: fruits.addImage("fruit1",fruit_1);
        break;
        case 2: fruits.addImage("fruit2",fruit_2);
        break;
        case 3: fruits.addImage("fruit3",fruit_3);
        break;
        case 4: fruits.addImage("fruit4",fruit_4);
        break;
        case 5: fruits.addImage("fruit5",fruit_5);
        break;
    }
    foodGroup.add(fruits);      
    fruits.depth = bowl.depth;
    bowl.depth = bowl.depth + 1;         
 }




  rand = Math.round(random(1,1));
  if(frameCount%75===0){
      coinCreateFrame=frameCount;
      coin = createSprite(random(displayWidth),random(displayHeight), 10, 10);
      switch(rand){
          case 1: coin.addImage(coin_1);
          break;           
          default: break; }
          coin.scale = 0.1;
          coin.velocityY=+4;
          coinGroup.add(coin);      
  }

  rand = Math.round(random(1,1));
  if(frameCount%75===0){
      bombCreateFrame=frameCount;
      bomb = createSprite(random(displayWidth),random(displayHeight), 10, 10);
      switch(rand){
          case 1: bomb.addImage(bomb_1);
          break;           
          default: break; }
          bomb.scale = 0.1;
          bomb.velocityY=+4;
          bombGroup.add(bomb);      
  }

  
    drawSprites();
  }   
