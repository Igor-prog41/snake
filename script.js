const field = document.querySelector(".field");

let maxHeight = 20;
let maxWidth = 20;
let quantityBacteria = 10;
let fieldArray = [];
let numberOfIterations = 0;

const fullField = "<div class='ff'></div>";
const bacteria = "<div class='bac'></div>";
const snakeField = "<div class='snake'></div>";
const snakeHead = "<div class='snakeHead'></div>";

let outStr = '';

//--------snake
let snake = new Object();
snake.ch1 = [5, 9];
snake.ch2 = [4, 9];
snake.ch3 = [3, 9];
snake.ch4 = [2, 9];
snake.ch5 = [1, 9];
//console.log(snake);

//--------------- create fieldArray
function createFieldArray() {

    for (let i = 0; i < maxHeight; i++) {
        let fieldArrayStr = [];
        for (let k = 0; k < maxWidth; k++) {
            fieldArrayStr[k] = 0;
        }
        fieldArray[i] = fieldArrayStr;
    }
}

//---------------add bacteria to fieldArray
function addBacteria() {
    for (let i = 0; i < quantityBacteria; i++) {
        xCoordinates = Math.floor(Math.random() * maxHeight);
        yCoordinates = Math.floor(Math.random() * maxWidth);
        fieldArray[yCoordinates][xCoordinates] = 2;
    }
}

//---------------add snake
function addSnake() {

    let ss = fieldArray.map((elem) => {
        let rr = elem.map((elem) => {
            if (elem == 1) return 0;
            else return elem;

        })
        return rr;
    });
    console.log(ss);

    for (let i = 0; i < maxHeight; i++) {
        for (let k = 0; k < maxWidth; k++) {
            if (fieldArray[i][k] == 1) {
                fieldArray[i][k] = 0;
            }
        }
    }

    for (let key in snake) {
        fieldArray[snake[key][0]][snake[key][1]] = 1;
    }

}


//---------------- drow field
function drowField(arr) {
    outStr = '';
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
            if (arr[i][k] == 1) {
                outStr += snakeField;
            }
            else if (arr[i][k] == 2) {
                outStr += bacteria;
            }
            else {
                outStr += fullField;
            }
        }
    }
    field.innerHTML = outStr;
}

//............move bacteria
function moveBacteria(arr) {
    let newArray = [];
    let arrayStr = [];
    for (let i = 0; i < arr.length; i++) {
        arrayStr = [];
        for (let k = 0; k < arr[i].length; k++) {
            arrayStr[k] = 0;
        }
        newArray[i] = arrayStr;
    }
    let direction = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
            if (arr[i][k] == 1) {
                direction = Math.floor(Math.random() * 4 + 1);
                switch (direction) {
                    case 1:
                        if (i > 0) {
                            newArray[i - 1][k] = 1;
                        }
                        else {
                            newArray[i][k] = 1;
                        }
                        break;
                    case 2:
                        if (k < newArray[i].length - 1) {
                            newArray[i][k + 1] = 1;
                        }
                        else {
                            newArray[i][k] = 1;
                        }
                        break;
                    case 3:
                        if (i < newArray.length - 1) {
                            newArray[i + 1][k] = 1;
                        }
                        else {
                            newArray[i][k] = 1;
                        }
                        break;
                    case 4:
                        if (k > 0) {
                            newArray[i][k - 1] = 1;
                        }
                        else {
                            newArray[i][k] = 1;
                        }
                        break;
                }
            }
        }
    }

    for (let i = 0; i < newArray.length; i++) {
        for (let k = 0; k < newArray[i].length; k++) {
            fieldArray[i][k] = newArray[i][k];
        }
    }

    drowField(fieldArray);
}

//...........comparison head chain with snake
function comparisonChainOfSnake(ch0, ch1, snake) {

    let answer = false;

    for (let key in snake) {
        if (ch0 == snake[key][0] & ch1 == snake[key][1]) {
            answer = true;
        }
    }
    return answer;
}

//................move Snake
function moveSnake() {
    let step = true;
    let oldSnakeHead1 = snake.ch1[0];
    let oldSnakeHead2 = snake.ch1[1];
    let newSnakeHead0 = snake.ch1[0];
    let newSnakeHead1 = snake.ch1[1];

    let timesLockingForDirection = 0;

    while (step == true) {

        let direction = Math.floor(Math.random() * 4 + 1);
        //console.log(snake);
        console.log(direction);
        //snake.ch1 = [5, 9];

        switch (direction) {
            case 1:
                if (oldSnakeHead1 > 0) {
                    newSnakeHead0 = oldSnakeHead1 - 1;
                    newSnakeHead1 = oldSnakeHead2;
                }
                break;
            case 2:
                if (oldSnakeHead2 < maxWidth - 1) {
                    newSnakeHead0 = oldSnakeHead1;
                    newSnakeHead1 = oldSnakeHead2 + 1;
                }
                break;
            case 3:
                if (oldSnakeHead1 < maxHeight - 1) {
                    newSnakeHead0 = oldSnakeHead1 + 1;
                    newSnakeHead1 = oldSnakeHead2;
                }
                break;
            case 4:
                if (oldSnakeHead2 > 0) {
                    newSnakeHead0 = oldSnakeHead1;
                    newSnakeHead1 = oldSnakeHead2 - 1;
                }
                break;
        }
        // check for end locking first chain

        console.log(step);

        step = comparisonChainOfSnake(newSnakeHead0, newSnakeHead1, snake);

        console.log(step);
        numberOfIterations++;
        timesLockingForDirection++;
        console.log(timesLockingForDirection);

        if (timesLockingForDirection == 10) break;
    }

    if (timesLockingForDirection == 10) {
        clearInterval(move);
        alert('snake at dead end');
    };

    // prepere to add link in snake
    let lastLink0 = 100;
    let lastLink1 = 100;
    let newLink = '';

    if (fieldArray[newSnakeHead0][newSnakeHead1] == 2) {

        keyLastLink = '';
        let count = 1;
        for (let key in snake) {
            keyLastLink = key;
            count++;
        }
        lastLink0 = snake[keyLastLink][0];
        lastLink1 = snake[keyLastLink][1];
        newLink = 'chn' + count;
    }

    snake.ch1[0] = newSnakeHead0;
    snake.ch1[1] = newSnakeHead1;

    let count = 0;
    for (let key in snake) {
        if (count != 0) {
            let coordinat1 = snake[key][0];
            let coordinat2 = snake[key][1];
            snake[key][0] = oldSnakeHead1;
            snake[key][1] = oldSnakeHead2;
            oldSnakeHead1 = coordinat1;
            oldSnakeHead2 = coordinat2;
        }
        count++;
    }
    //   add link in snake
    if (lastLink0 != 100) {
        snake[newLink] = [lastLink0, lastLink1];
    }

    console.log(snake);
    console.log(numberOfIterations);
}

createFieldArray();
addBacteria()
addSnake();
drowField(fieldArray);




document.querySelector('.bt').onclick = () => {
    //moveBacteria(fieldArray);
    // createFieldArray();
    //console.log(snake);
    moveSnake();
    addSnake();
    drowField(fieldArray);
}

function moveBacteriaZ() {
    //moveBacteria(fieldArray);
    //createFieldArray();
    // console.log(snake);
    moveSnake()
    addSnake();
    drowField(fieldArray);
}

let move;

document.querySelector('.bt-m').onclick = () => {
    move = setInterval(moveBacteriaZ, 300);
}

document.querySelector('.bt-s').onclick = () => {
    clearInterval(move);
}