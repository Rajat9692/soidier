var PLAY = 1;
var END = 0;
var gameState = PLAY;
var back,backImage;
var boy,boyImage;
var boyrunImage,boyrun;
var boyattackImage,boyattack;
var boygun,boygunImage;
var ground;
var enemy1,enemy1Image;
var enemy2,enemy2Image;
var enemy3,enemy3Image;
var score;
var enemysGroup,enemys2Group,enemys3Group;
var enemy;
var gameover,restart,gameoverImage,restartImage;

function preload(){

	backImage = loadImage("images/gameback.jpg");
	boyImage = loadImage("images/boyImage.png");
	boyrunImage = loadAnimation("images/Boyrun1.png","images/Boyrun2.png","images/Boyrun3.png","images/Boyrun4.png","images/Boyrun5.png","images/Boyrun6.png");
	boyattackImage = loadAnimation("images/boyattack1.png","images/Boyattack2.png","images/Boyattack3.png","images/Boyattack4.png");
	boygunImage = loadAnimation("images/Boygun1.png","images/Boygun2.png","images/Boygun3.png","images/Boygun4.png","images/Boygun5.png","images/Boygun6.png");
	enemy1Image = loadImage("images/Enemyno1.1.png");
    gameoverImage = loadImage("images/gmaeover.png");
    restartImage = loadImage("images/Restart.png");
    enemy3Image = loadImage("images/Enemyno3.4.png");

}

function setup(){

	createCanvas(windowWidth,windowHeight);

	back = createSprite(width/2,height/2);
	back.addImage(backImage);

	back.visible = false;

	boy = createSprite(100,600);
	boy.addImage(boyImage);
	boy.scale  = 2.4;

	boyrun = createSprite(100,690,2,2);

	boyattack = createSprite(100,690,2,2);

	boygun = createSprite(100,690,2,2);

	inground = createSprite(100,800,4000,20);
	inground.visible = false;

	score = 0;

	enemy = createSprite(1500,750,2,2);
	enemy.visible = false;

	restart = createSprite(800,800);
	restart.addImage(restartImage);
	restart.scale = 1;

	gameover = createSprite(800,500);
	gameover.addImage(gameoverImage);
	gameover.scale = 1;

	enemy3 = createSprite(1500,750,2,2);
    enemy.visible = false;

	enemysGroup = new Group();
	enemys2Group = new Group();
	enemys3Group = new Group();
}

function draw(){

	background(225);

	if (gameState === PLAY){
		if (keyDown("space") && boyrun.y >= 685){
       boyrun.velocityY = -12;
      
       
    }

    gameover.visible = false;
    restart.visible = false;

    boyrun.velocityY = boyrun.velocityY + 0.8;

	if (keyDown("s")){
	   boyrun.addAnimation("running",boyrunImage);
	   boyrun.scale  = 2.4;
	}

	if (keyDown("s")){
	   boy.visible = false;
	}

	if (keyWentDown("a")){
	   boyattack.addAnimation("attacking",boyattackImage);
	   boyattack.visible = true;
	   boyattack.scale = 2.4;
	}

	if (keyWentDown("a")){
	   boyrun.visible = false;
	}

	if (keyWentUp("a")){
	   boyrun.visible = true;
	}

	if (keyWentUp("a")){
	   boyattack.visible = false;
	}

    if (keyWentDown("g")){
       boyrun.visible = false;
    }

    if (keyWentUp("g")){
       boyrun.visible = true;
    }

    if (keyWentDown("g")){
       boygun.addAnimation("guning",boygunImage);
       boygun.scale = 2.4;
       boygun.visible = true;
    }
    
    if (keyWentUp("g")){
       boygun.visible = false;
    }

    if (back.x < width){
       back.x = width/2;
    }

    

    

  
    

   if (boygun.isTouching(enemysGroup)){
      enemysGroup.visible = false;
      score = score+1;
   }

    if (boyrun.isTouching(enemysGroup)){
    	boyrun.visible = false;
        gameState = END;
    }

    if (boyattack.isTouching(enemysGroup)){
    	boyattack.visible = false;
    	gameState = END;
    }

    if (boyattack.isTouching(enemys3Group)){
    	enemys3Group.visible = false;
    	score = score+1;
    }

    if (boygun.isTouching(enemys3Group)){
    	boygun.visible = false;
        gameState = END;
    }

    if (boyrun.isTouching(enemys3Group)){
    	boyrun.visible = false;
    	gameState = END;
    }

	}

	


		 
    if (gameState === END){
    	boyrun.visible = false;
    	boygun.visible = false;
    	boyattack.visible = false;
    	enemysGroup.visible = false;
    	enemys3Group.visible = false;
    	restart.visible = true;
    	gameover.visible = true;
    	if (mousePressedOver(restart)){
    		gameState = PLAY;
    		boyrun.visible = true;
    		
    		enemys3Group.visible = true;
    		enemysGroup.visible = true;

    	}
    }
    
    
   
   if (keyDown("s")){
       back.visible = true;
    }

    if (keyDown("s")){
       enemy.visible = true;
    }


    if (keyDown("s")){
       enemy3.visible = true;
    }
	

   
     
   

  


	





   
    boyrun.collide(inground);
    boy.collide(inground);
    drawSprites();
    stroke("white");
	textSize(40);
	fill("black");
	text("score --- " + score,800,50);
    
    enemys3();
     enemys();
}

function enemys(){

	if (frameCount % 100 === 0){
	  // enemy = createSprite(1500,750,2,2);
	   enemy.velocityX = -(6+score/1);
	   enemy.addImage(enemy1Image);
	   enemysGroup.add(enemy);
	   enemy.x = Math.round(random(800,600));
	   enemy.lifetime = 200;
	}
}


function enemys3(){

	if (frameCount % 60 === 0){
	   //enemy3 = createSprite(1500,750,2,2);
	   enemy3.velocityX = -(6+score/1);
	   enemy3.addImage(enemy3Image);
	   enemys3Group.add(enemy3);
	   enemy3.x = Math.round(random(400,800));
	   enemy3.lifetime = 200;
	}
}