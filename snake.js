function init(){
    var canvas = document.getElementById("mycanvas"); //canvas is used to draw object
    W = canvas.width = H = canvas.height = 630;
    pen = canvas.getContext('2d');
    cs=30; //cell size
    food= randomFood();
    foodImage = new Image();
    foodImage.src = "Assets/foodimg.png";
    snakeScales = new Image();
    snakeScales.src = "Assets/scales.png";
    gameOver = false;
    score = 0;

    snake = {
        init_len:5,
        color:"pink",
        facecolor:"red",
        cells:[],
        direction:"right",


        createSnake:function(){
            for(let i=this.init_len;i>0;i--){    //saap bnane k liye
                this.cells.push({x : i, y : 0});
            }
            
        },


        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){  
                pen.fillStyle = this.color;  // saap m rang bhrne k liye

                if(i==0){
                   pen.fillStyle = this.facecolor;
                }
                pen.drawImage(snakeScales,this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);      
            }
        },

        updateSnake:function(){        // snake ko aage chlane k liye aur khana khilane k liye
            //console.log("update called")
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x && headY==food.y){
                food = randomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            var nextX, nextY;

            if(this.direction=="right"){
            nextX = headX + 1;
            nextY = headY;
            }
            else if(this.direction=="left"){
            nextX = headX - 1;
            nextY = headY;
            }
            else if(this.direction=="down"){
            nextX = headX;
            nextY = headY + 1;
            }
            else{
            nextX = headX;
            nextY = headY - 1;
            }

            this.cells.unshift({x:nextX,y:nextY});

            var lastX = Math.round(W/cs);
            var lastY = Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
                gameOver = true;
            }
        }
    };

    snake.createSnake();

function keyPress(e){
    if(e.key=="ArrowRight"){
        snake.direction= "right";
        }
    else if(e.key=="ArrowLeft"){
        snake.direction= "left";
    }
    else if(e.key=="ArrowUp"){
        snake.direction= "up";
    }
    else{
        snake.direction= "down";
    }
}        
    

    document.addEventListener('keydown',keyPress);

}

function draw(){
    pen.clearRect(0,0,W,H);//to clear screen after every update
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(foodImage,food.x*cs,food.y*cs,cs-3,cs-3);

    pen.fillStyle = "black";
    pen.font = "20px Roboto"
    pen.fillText(score,30,30);
}

function update(){
     snake.updateSnake();
}

function gameloop(){
    if(gameOver==true){
        clearInterval(f);
        alert("GAME OVER");
    }
    draw();
    update();
}

function randomFood(){
    var foodX = Math.round(Math.random()*(W - cs)/cs);
    var foodY = Math.round(Math.random()*(W - cs)/cs);

    var food = {
        x:foodX,
        y:foodY,
        color: "blue",
    }
    return food;
}
init();
var f = setInterval(gameloop,100);