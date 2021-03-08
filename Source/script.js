let scoreBlock;
let score = 0;

const Config = {
    step: 0,
    maxstep: 6,
    sizeCell: 16,
    sizeBerry: 16/4
}

const Snake = {
    x: 160,
    y: 160,
    dx: Config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3
}

let berry = {
    x: 0,
    y: 0
}

let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

function gameLoop() 
{
    requestAnimationFrame(gameLoop);
    if (++Config.step < Config.maxstep)
    {
        return;
    }
    Config.step = 0;
    context.clearRect(0,0, canvas.width, canvas.height);
    drawBerry();
    drawSnake();
}

requestAnimationFrame(gameLoop);


function drawSnake()
{
    Snake.x += Snake.dx;
    Snake.y += Snake.dy;

    collishionBorder();

    Snake.tails.unshift({x: Snake.x, y: Snake.y});
    if (Snake.tails.length > Snake.maxTails)
    {
        Snake.tails.pop();
    }

    Snake.tails.forEach( function(el, index)
    {
        if (index == 0)
        {
            context.fillStyle = "#4dff00";
        }
        else 
        {
            context.fillStyle = "#49b01c";
        }
        context.fillRect( el.x, el.y, Config.sizeCell, Config.sizeCell);

        if (el.x === berry.x && el.y === berry.y)
        {
            Snake.maxTails++;
            incScore();
            RandomPositionBerry();
        }

        for( let i = index + 1; i<Snake.tails.length; i++) 
        {
            if (el.x == Snake.tails[i].x && el.y == Snake.tails[i].y)
            {
                refreshGame();
            }
        }
    });
}

function collishionBorder()
{
    if(Snake.x < 0) 
    {
        Snake.x = canvas.width - Config.sizeCell;
    }
    else if (Snake.x >= canvas.width)
    {
        Snake.x = 0;
    }

    if(Snake.y <0)
    {
        Snake.y = canvas.height - Config.sizeCell;
    }
    else if (Snake.y >= canvas.height)
    {
        Snake.y = 0;
    }
}

function refreshGame()
{
    score = 0;
    drawScore();

    Snake.x=160;
    Snake.y=160;
    Snake.tails = [];
    Snake.maxTails = 3;
    Snake.dx = Config.sizeCell;
    Snake.dy = 0;

    RandomPositionBerry();
}

function drawBerry()
{
    context.beginPath();
    context.fillStyle = "#A00034";
    context.arc( berry.x +(Config.sizeCell / 2), berry.y + (Config.sizeCell / 2), Config.sizeBerry, 0, 2* Math.PI);
    context.fill();
}

function RandomPositionBerry()
{
    berry.x = getRandomInt (0, canvas.width/ Config.sizeCell) * Config.sizeCell;
    berry.y = getRandomInt (0, canvas.height/ Config.sizeCell) * Config.sizeCell;
}

function incScore()
{
    score++;
    drawScore();
}

function drawScore()
{
    scoreBlock.innerHTML = score;
}

 function getRandomInt(min, max)
 {
     return Math.floor ( Math.random() * (max - min) + min);
 }

 document.addEventListener("keydown", function (e) 
 {
     if ( e.code == "ArrowUp")
     {
         Snake.dy = -Config.sizeCell;
         Snake.dx = 0;
     }
     else if ( e.code == "ArrowLeft")
     {
         Snake.dx = -Config.sizeCell;
         Snake.dy = 0;
     }
     else if ( e.code == "ArrowDown")
     {
         Snake.dy = Config.sizeCell;
         Snake.dx = 0;
     }
     else if ( e.code == "ArrowRight")
     {
         Snake.dx = Config.sizeCell;
         Snake.dy = 0;
     }
 });