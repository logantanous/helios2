var mapLayout = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+
'x________________________________________________x'+
'x________________________@_______________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________!_______________________________x'+
'x_________[]_______________________________[]____x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x____!________________________x__________________x'+
'x_______________________[]_______________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x______________________[]________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x_____________[]____________________________!____x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x________________________________________________='+
'x_____________________[]_________________________='+
'x________________________________________________='+
'x_________________________________________[]_____x'+
'x_______!___________________[]___________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x_________________________x________________!_____x'+
'x____[]__________________________________________x'+
'x________________________________________________x'+
'x______________________________________[]________x'+
'x____________&___________________________________x'+
'x________________________________________________x'+
'x________________________________________________x'+
'x____[]___________8_____________[]_______________x'+
'xxxxxxxxxxxxxxxxx===xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

function Player(xCoord, yCoord, facing) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.currentSpot = 2018;
  this.nextSpot = "";
  this.facing = "up";
  this.pause = false;
  this.nextX = xCoord;
  this.nextX2 = xCoord-1;
  this.nextY = yCoord;
  this.nextY2 = yCoord;
}

function Robot(xCoord, yCoord, facing) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.currentSpot = "";
  this.nextSpot = "";
  this.status = true;
  this.facing = "top";
  this.sight = "nothing";
  this.nextX = xCoord;
  this.nextX2 = xCoord-1;
  this.nextY = yCoord;
  this.nextY2 = yCoord;
  this.randomStore = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  this.randomZero = 0;
  this.isFunctional = true;
}

var player1 = new Player(18,40, "down");

var robot1 = new Robot(5,10);
var robot2 = new Robot(44,23);
var robot3 = new Robot(8,30);
var robot4 = new Robot(43,33);


Robot.prototype.checkForPlayers = function() {
  this.currentSpot = passConvertCoordinates(this.xCoord,this.yCoord);
  var spotSelector = this.currentSpot+1;


  if (this.randomZero < 5){
    this.randomZero++;
  } else {
    this.randomStore = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    this.randomZero = 0;
  }

  if (this.randomStore == 1) {
  //right
    this.facing = "right";
    while (this.nextX < 48) {
      this.nextX = this.nextX+1;
      replaceSpot = passConvertCoordinates(this.nextX,this.yCoord);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextX = 48;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextX = this.xCoord;
  }
  if (this.randomStore == 2) {
    //left
    this.facing = "left";
    while (this.nextX2 > 1) {
      this.nextX2 = this.nextX2-1;
      replaceSpot = passConvertCoordinates(this.nextX2,this.yCoord);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextX2 = 1;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextX2 = this.xCoord;
  }
  if (this.randomStore == 3) {
    //up
    this.facing = "top";
    while (this.nextY > 1) {
      this.nextY = this.nextY-1;
      replaceSpot = passConvertCoordinates(this.xCoord,this.nextY);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextY = 1;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextY = this.yCoord;
  }
  if (this.randomStore == 4) {
    //down
    this.facing = "bottom";
    while (this.nextY2 < 40) {
      this.nextY2 = this.nextY2+1;
      replaceSpot = passConvertCoordinates(this.xCoord,this.nextY2);
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        this.nextY2 = 40;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "*");
      }
      if (mapLayout.charAt(replaceSpot) == 8) {this.sight="player"}
    }
    this.nextY2 = this.yCoord;
  }
  $("span:nth-of-type("+spotSelector+")").css('border-'+this.facing, '5px solid black');
}

Robot.prototype.move = function() {


  this.currentSpot = passConvertCoordinates(this.xCoord,this.yCoord);

  var spotSelector = this.currentSpot+1;
  $("span:nth-of-type("+spotSelector+")").css('background', 'red');

  if (this.status == true) {
    if (this.yCoord < player1.yCoord) {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1)}
    if (this.yCoord > player1.yCoord) {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1)}
    if (mapLayout.charAt(this.nextSpot) == "_" || mapLayout.charAt(this.nextSpot) == "*") {
      mapLayout = mapLayout.replaceAt(this.currentSpot, "_");
      mapLayout = mapLayout.replaceAt(this.nextSpot, "!");
      this.currentSpot = this.nextSpot;
      this.nextSpot = "";
      if (this.yCoord < player1.yCoord) {
        this.yCoord = this.yCoord+1;
        this.facing = "bottom";
      }
      if (this.yCoord > player1.yCoord) {
        this.yCoord = this.yCoord-1;
        this.facing = "top";
      }
      else {this.yCoord = this.yCoord}
    } else {
      this.status = false;
    }
  }
  else {
    if (this.xCoord < player1.xCoord) {this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord)}
    if (this.xCoord > player1.xCoord) {this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord)}
    if (mapLayout.charAt(this.nextSpot) == "_" || mapLayout.charAt(this.nextSpot) == "*") {
      mapLayout = mapLayout.replaceAt(this.currentSpot, "_");
      mapLayout = mapLayout.replaceAt(this.nextSpot, "!");
      this.currentSpot = this.nextSpot;
      this.nextSpot = "";
      if (this.xCoord < player1.xCoord) {
        this.xCoord = this.xCoord+1;
        this.facing = "right";
      }
      if (this.xCoord > player1.xCoord) {
        this.xCoord = this.xCoord-1;
        this.facing = "left";
      }
      else {this.xCoord = this.xCoord}
    }
    else {
      this.status = true;
    }
  }

  var width = $(window).width();
  var height = $(window).height();

    $("span:nth-of-type("+spotSelector+")").css('border-'+this.facing, '10px solid black');



}

var bullets = [];
var bulletsNumber = 0;

function Bullet(xCoord, yCoord, facing) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.facing = facing;
  this.nextX = this.xCoord;
  this.nextY = this.yCoord-2;
  this.nextY2 = this.yCoord;
}

Bullet.prototype.changeX = function() {this.xCoord = player1.xCoord}
Bullet.prototype.changeY = function() {this.yCoord = player1.yCoord}
Bullet.prototype.changeFacing = function() {this.facing = player1.facing}

var moveCount = 0;

Player.prototype.shoot = function() {

  bullets[bulletsNumber] = new Bullet(this.xCoord, 2, "up");
  bullets[bulletsNumber].changeX();
  bullets[bulletsNumber].changeY();
  bullets[bulletsNumber].changeFacing();
  //bulletsNumber = bulletsNumber + 1;

  // console.log(bullets[0].xCoord);

  if (bullets[bulletsNumber].facing == "right") {

    while (bullets[bulletsNumber].nextX < 48) {

      bullets[0].nextX = bullets[bulletsNumber].nextX+1;
      replaceSpot = passConvertCoordinates(bullets[0].nextX,this.yCoord);
      replacePrevious = replaceSpot;
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        bullets[0].nextX = 48;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "b");
      }
      //console.log(replaceSpot+" "+robot1.currentSpot+" "+robot2.currentSpot+" "+robot3.currentSpot+" "+robot4.currentSpot);
      if (mapLayout.charAt(replaceSpot) == "!") {

        if (robot1.currentSpot == replaceSpot) {robot1.isFunctional = false;}
        if (robot2.currentSpot == replaceSpot) {robot2.isFunctional = false;}
        if (robot3.currentSpot == replaceSpot) {robot3.isFunctional = false;}
        if (robot4.currentSpot == replaceSpot) {robot4.isFunctional = false;}
      }
    }
    bullets[bulletsNumber].nextX = bullets[bulletsNumber].xCoord;
  }

  if (bullets[bulletsNumber].facing == "left") {

    while (bullets[bulletsNumber].nextX > 1) {
      //console.log(bullets[bulletsNumber].nextX-1);
      bullets[0].nextX = bullets[bulletsNumber].nextX-1;
      replaceSpot = passConvertCoordinates(bullets[0].nextX,this.yCoord);
      replacePrevious = replaceSpot;
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        bullets[0].nextX = 1;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "b");
      }
      if (mapLayout.charAt(replaceSpot) == "!") {
        if (robot1.currentSpot == replaceSpot) {robot1.isFunctional = false;}
        if (robot2.currentSpot == replaceSpot) {robot2.isFunctional = false;}
        if (robot3.currentSpot == replaceSpot) {robot3.isFunctional = false;}
        if (robot4.currentSpot == replaceSpot) {robot4.isFunctional = false;}
      }
    }
    bullets[bulletsNumber].nextX = bullets[bulletsNumber].xCoord;
  }

  // while (this.nextY2 < 40) {
  //   this.nextY2 = this.nextY2+1;

  if (bullets[bulletsNumber].facing == "up") {

    while (bullets[bulletsNumber].nextY < 40) {
      //console.log(bullets[bulletsNumber].nextX+1);
      bullets[0].nextY = bullets[bulletsNumber].nextY+1;
      replaceSpot = passConvertCoordinates(this.xCoord,bullets[0].nextY);
      replacePrevious = replaceSpot;
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        bullets[0].nextY = 40;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "b");
      }
      if (mapLayout.charAt(replaceSpot) == "!") {
        if (robot1.currentSpot == replaceSpot) {robot1.isFunctional = false;}
        if (robot2.currentSpot == replaceSpot) {robot2.isFunctional = false;}
        if (robot3.currentSpot == replaceSpot) {robot3.isFunctional = false;}
        if (robot4.currentSpot == replaceSpot) {robot4.isFunctional = false;}
      }
    }
    bullets[bulletsNumber].nextY = bullets[bulletsNumber].yCoord;
  }
  bullets[bulletsNumber].nextY = player1.yCoord;

  if (bullets[bulletsNumber].facing == "down") {
    //console.log(bullets[bulletsNumber].nextY);
    while (bullets[bulletsNumber].nextY > 1) {

      bullets[0].nextY = bullets[bulletsNumber].nextY+1;
      replaceSpot = passConvertCoordinates(this.xCoord,bullets[0].nextY);
      replacePrevious = replaceSpot;
      if (mapLayout.charAt(replaceSpot) !== "_" && mapLayout.charAt(replaceSpot) !== "*") {
        bullets[0].nextY = 1;
      }
      else {
        mapLayout = mapLayout.replaceAt(replaceSpot, "b");
      }
      if (mapLayout.charAt(replaceSpot) == "!") {
        if (robot1.currentSpot == replaceSpot) {robot1.isFunctional = false;}
        if (robot2.currentSpot == replaceSpot) {robot2.isFunctional = false;}
        if (robot3.currentSpot == replaceSpot) {robot3.isFunctional = false;}
        if (robot4.currentSpot == replaceSpot) {robot4.isFunctional = false;}
      }
    }
    bullets[bulletsNumber].nextY2 = bullets[bulletsNumber].yCoord;
  }

}

Player.prototype.checkForRobots = function() {
  if (mapLayout.charAt(passConvertCoordinates(this.xCoord,this.yCoord+1)) == "!" ||
      mapLayout.charAt(passConvertCoordinates(this.xCoord,this.yCoord-1)) == "!" ||
      mapLayout.charAt(passConvertCoordinates(this.xCoord+1,this.yCoord)) == "!" ||
      mapLayout.charAt(passConvertCoordinates(this.xCoord-1,this.yCoord)) == "!") {
    //console.log("game over");
    $(".test").html("game over");
  } else {
    $(".test").html("");
  }
}

Player.prototype.interact = function(interactWith) {

  if (interactWith == "talk") {


    //check if space where you are facing is a npc and if so then alert or w/e
    var way = player1.facing;

    if (way == "left") {this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord);}
    if (way == "up") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1);}
    if (way == "right") {this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord);}
    if (way == "down") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1);}
    if(mapLayout.charAt(this.nextSpot) == "&") {console.log("hello");}
    if(mapLayout.charAt(this.nextSpot) == "t") {
      console.log("terminal");
    }
    //console.log(this.nextSpot+" "+getConvertCoordinates(this.nextSpot));
    player1.pause = true;
  }
}

Player.prototype.move = function(way) {

  //collision detection
  if (way == "left") {this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord);}
  if (way == "up") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1);}
  if (way == "right") {this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord);}
  if (way == "down") {this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1);}
  //console.log(mapLayout.charAt(this.nextSpot));
  this.facing = way;

  this.currentSpot = passConvertCoordinates(this.xCoord,this.yCoord);
  if (way == "left") {
    this.nextSpot = passConvertCoordinates(this.xCoord-1,this.yCoord);
  }
  if (way == "up") {
    this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord-1);
  }
  if (way == "right") {
    this.nextSpot = passConvertCoordinates(this.xCoord+1,this.yCoord);
  }
  if (way == "down") {
    this.nextSpot = passConvertCoordinates(this.xCoord,this.yCoord+1);
  }

  if (mapLayout.charAt(this.nextSpot) !== "_" && mapLayout.charAt(this.nextSpot) !== "*" && mapLayout.charAt(this.nextSpot) !== "b") {
    this.nextSpot = "";
  }
  else {
    if (way == "left") {
      this.xCoord = this.xCoord-1;
    }
    if (way == "up") {
      this.yCoord = this.yCoord-1;
    }
    if (way == "right") {
      this.xCoord = this.xCoord+1;
    }
    if (way == "down") {
      this.yCoord = this.yCoord+1;
    }
    mapLayout = mapLayout.replaceAt(this.currentSpot, "_");
    mapLayout = mapLayout.replaceAt(this.nextSpot, "8");
    this.currentSpot = this.nextSpot;
    this.nextSpot = "";
    return this.currentSpot;
  }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}



function cleanScreen() {
  var coords = 0;
  var matches = mapLayout.match(/(.*?)\!/g);
  for (i=0; i<matches.length; i++) {
    coords = coords+matches[i].length;
    var questionsMarkXCoord = getXConvertCoordinates(coords-1);
    var questionsMarkYCoord = getYConvertCoordinates(coords-1);
    //console.log(questionsMarkXCoord+" "+questionsMarkYCoord);

    //if x and y coordinates are equal to each robot coordinates
    if (questionsMarkXCoord == robot1.xCoord && questionsMarkYCoord == robot1.yCoord ||
        questionsMarkXCoord == robot2.xCoord && questionsMarkYCoord == robot2.yCoord ||
        questionsMarkXCoord == robot3.xCoord && questionsMarkYCoord == robot3.yCoord ||
        questionsMarkXCoord == robot4.xCoord && questionsMarkYCoord == robot4.yCoord) {} else {
          mapLayout = mapLayout.replaceAt(coords-1, "_");
        }

  }
  mapLayout = mapLayout.replace(/b/g, '_');
}


var moveCount = 0;
function drawScreen() {

  var map1Layout = mapLayout;

  map1Layout = map1Layout.replace(/_/g, 'o')
    .replace(/\[\]/g, 'cc')
    .replace(/8/g, 'p')
    .replace(/&/g, 'n')
    .replace(/@/g, 't')
    .replace(/=/g, 'd')
    .replace(/!/g, 'r')
    .replace(/\*/g, 's');

    // console.log(map1Layout);

  $("#display").html("");
  //draw the screen
  var character = 0;
  for (var i = 0; i < 42; i++) {
    //row
    for (var x = 0; x < 50; x++) {

      if (map1Layout.charAt(character) == "p") {
        $("#display").append("<span class='"+map1Layout.charAt(character)+" "+player1.facing+" pixels'>"+"</span>");
      }
      else {
        $("#display").append("<span class='"+map1Layout.charAt(character)+" pixels'>"+"</span>");
       }
        character++;
    }
    $("#display").append("<br>");
  }
    if (player1.pause == false) {
      player1.checkForRobots();
      if (robot1.isFunctional == true) {
        if (robot1.sight !== "player") {robot1.checkForPlayers()}
        else {
          if (moveCount == 2) {
            robot1.move()
          }
        }
      }
      if (robot2.isFunctional == true) {
        if (robot2.sight !== "player") {robot2.checkForPlayers()}
        else {
          if (moveCount == 2) {
            robot2.move()
          }
        }
      }
      if (robot3.isFunctional == true) {
        if (robot3.sight !== "player") {robot3.checkForPlayers()}
        else {
          if (moveCount == 2) {
            robot3.move()
          }
        }
      }
      if (robot4.isFunctional == true) {
        if (robot4.sight !== "player") {robot4.checkForPlayers()}
        else {
          if (moveCount == 2) {
            robot4.move()
          }
        }
      }
      if (moveCount == 2) {
        moveCount = 0;
      }
      moveCount++;

    }
}

function getXConvertCoordinates(longCoord) {
  var y = Math.floor(longCoord/50);
  var x = longCoord - (y * 50);
  //console.log("x: "+x+" "+"y: "+y);
  return x;
}

function getYConvertCoordinates(longCoord) {
  var y = Math.floor(longCoord/50);
  var x = longCoord - (y * 50);
  //console.log("x: "+x+" "+"y: "+y);
  return y;
}

function passConvertCoordinates(xcoord,ycoord) {
  var y = ycoord * 50;
  return xcoord+y;
}

var Game = {};

if (player1.pause == true) {Game.fps = 0; console.log("0")}
else {Game.fps = 60;}


Game.run = function() {
  drawScreen();
  cleanScreen();
};

var change = {
  37: {
    left: "-=1"
  },

  38: {
    top: "-=1"
  },

  39: {
    left: "+=1"
  },

  40: {
    top: "+=1"
  },
}
$(document).on({
  keydown: keydown,
  keyup: keyup
})

var movement = []

function keydown(e) {
  var key = e.which
  var animation = change[key];
  if (!movement[key]) { // watch out for repeating keys!
      movement[key] = setInterval(keepGoing)

  }
  //  console.log("down", key, movement[key])
  function keepGoing() {
    //console.log(animation)
    if (player1.pause == false) {
      if (key == 37) {player1.move("left")}
      if (key == 38) {player1.move("up")}
      if (key == 39) {player1.move("right")}
      if (key == 40) {player1.move("down")}
      if (key == 84) {player1.interact("talk")}

  }

  }
}

function keyup(e) {
  var key = e.which
  movement[key] = clearInterval(movement[key]);
  if (player1.pause == false) {
    if (key == 32) {player1.shoot()}
  }
}

$(document).ready(function() {

    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);

})
