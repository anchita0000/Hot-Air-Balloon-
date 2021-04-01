var balloon1,balloon2,balloon3;
var database,height;

function preload(){
  bg=loadImage("Images/city.png");
  balloonImg=loadImage("Images/1.png","Images/2.png","Images/3.png")
}
function setup(){
  database=firebase.database();
  console.log(database);
  createCanvas(1000,500);

  balloon=createSprite(100,400,150,150);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale=0.5;

  var balloonHeight=database.ref('ball/position');
  balloonHeight.on("value",readHeight,showError);
}
function draw(){
  background(bg);

if(keyDown(LEFT_ARROW)){
  moveHeight(-10,0);
}
else if(keyDown(RIGHT_ARROW)){
  moveHeight(10,0);
}
else if(keyDown(UP_ARROW)){
  moveHeight(0,-10);
}
else if(keyDown(DOWN_ARROW)){
  moveHeight(0,10);
}
drawSprites();
}

function moveHeight(x,y){
  database.ref('balloon/height').set({
    'x': position.x+x ,
    'y': position.y+y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}


