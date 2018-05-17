
const winingCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let flag = false;
const divStatus = new Array(9);
divStatus.fill(false);
console.log(divStatus);

const restartButton = document.getElementById('restart-button');
function restart() {
    location.reload();
}

function divClicked(divNumber) {
    if (!divStatus[divNumber - 1]) {
        const clickedDiv = document.getElementById('div' + divNumber);
        clickedDiv.className = 'clicked';
        clickedDiv.innerHTML = "X";
        divStatus[divNumber - 1] = true;
        if (!flag) {
            computerFirstPos();
            flag = true;
            return;
        }
        let upos = isUserWining();
        let cpos = isComputerWining();
        if (cpos !== -1) {
            divStatus[cpos - 1] = true;
            const computerDiv = document.getElementById('div' + (cpos));
            computerDiv.className = 'clicked';
            computerDiv.innerHTML = '0';
            alert('You loose');
        }
        else if (upos !== -1) {
            divStatus[upos - 1] = true;
            const computerDiv = document.getElementById('div' + (upos));
            computerDiv.className = 'clicked';
            computerDiv.innerHTML = '0';

        }
        
        else {
            if (divStatus.includes(false)) {
                while (true) {
                    const random = Math.floor((Math.random() * 8));
                    if (divStatus[random] === false) {
                        const computerDiv = document.getElementById('div' + (random + 1));
                        computerDiv.className = 'clicked';
                        divStatus[random] = true;
                        computerDiv.innerHTML = '0';
                        break;
                    }
                }
            }
            else {
                alert('Game Over');
            }

        }
    }
}

function isUserWining() {
    let pos = -1;
    for (x of winingCombinations) {
        let no_of_blank = 0;
        let numberOfX = 0;
        for (y of x) {
            if (divStatus[y - 1] === false) {
                no_of_blank++;
                pos = y;
            }
            else {
                const div = document.getElementById('div' + y);
                if (div.innerHTML === 'X') {
                    numberOfX++;
                }
            }
        }
        if (no_of_blank === 1 && numberOfX === 2) {
            return pos;
        }
    }

    return -1;
}
function isComputerWining() {
    let pos = -1;
    for (x of winingCombinations) {
        let no_of_blank = 0;
        let numberOfY = 0;
        for (y of x) {
            if (divStatus[y - 1] === false) {
                no_of_blank++;
                pos = y;
            }
            else {
                const div = document.getElementById('div' + y);
                if (div.innerHTML === '0') {
                    numberOfY++;
                }
            }
        }
        if (no_of_blank === 1 && numberOfY === 2) {
            return pos;
        }
    }

    return -1;
}

function computerFirstPos() {
    if (divStatus[0] === true || divStatus[2] === true || divStatus[6] === true || divStatus[8] === true) {
        divStatus[5] = true;
        const computerDiv = document.getElementById('div5');
        computerDiv.className = 'clicked';
        computerDiv.innerHTML = '0';
    }
    else if (divStatus[4] === true) {

        while (true) {

            let randomNumber = Math.floor(Math.random() * 9);
            if ((randomNumber % 2 === 0) && (randomNumber !== 4)) {
                divStatus[randomNumber] = true;
                const computerDiv = document.getElementById('div' + (randomNumber + 1));
                computerDiv.className = 'clicked';
                computerDiv.innerHTML = '0';
                break;
            }

        }

    }
    else if (divStatus[3] === true) {
        divStatus[6] = true;
        const computerDiv = document.getElementById('div7');
        computerDiv.className = 'clicked';
        computerDiv.innerHTML = '0';
    }
    else if (divStatus[1] === true) {
        divStatus[0] = true;
        const computerDiv = document.getElementById('div1');
        computerDiv.className = 'clicked';
        computerDiv.innerHTML = '0';
    }
    else if (divStatus[5] === true) {
        divStatus[2] = true;
        const computerDiv = document.getElementById('div3');
        computerDiv.className = 'clicked';
        computerDiv.innerHTML = '0';
    }
    else if (divStatus[7] === true) {
        divStatus[8] = true;
        const computerDiv = document.getElementById('div9');
        computerDiv.className = 'clicked';
        computerDiv.innerHTML = '0';
    }
}