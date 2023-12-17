var turn = 0;
var alphabet = ['a', 'b', 'c'];

document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');

    // 3x3 그리드 생성
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', alphabet[i]); 
            cell.setAttribute('data-col', j + 1); 
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
});

function handleCellClick(event) {
    const cell = event.target;
    const row = cell.getAttribute('data-row');
    const col = cell.getAttribute('data-col');

    if (turn == 0) {
        gamePrompt = `I'll go First [${row}${col}]`;
    } else if (turn == 1){        
        gamePrompt = `my move is [${row}${col}] make sure to only say the format. no board what's your next move?`;
    } else {
        gamePrompt = `my next move is  [${row}${col}]`;
    }

    // 클릭당 번갈아가며 빨간색과 초록색을 부여함
    if (turn % 2 == 1) {
        cell.classList.add('red');
    } else {
        cell.classList.add('green');
    }
    turn++;
    //debugger;
    Send();
}

// API호출로 받은 답변에서 그리드의 위치를 찾아내어 그리드에 적용
function clickCellByLocation(location) {
    const match = location.match(/\[([a-c])([1-3])\]/); // 정규식 이용 '[a3]' 과 같은 위치를 찾아냄

    if (match) {
        const row = match[1];
        const col = match[2];

        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.getAttribute('data-row') === row && cell.getAttribute('data-col') === col) {
                cell.click();
                break;
            }
        }
    }
}