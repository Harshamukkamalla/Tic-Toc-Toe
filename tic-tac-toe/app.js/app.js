(
    document.onreadystatechange = () => {
        if(document.readyState === 'complete') {
            const X = 'X';
            const O = 'O';
            const rows = document.getElementsByClassName('row');
            const status = document.getElementById('status')
            const model = {
                currentplayer: X,
                box: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                inprogress: true,
            };
            const gameBoxView = {
                init() { 
                  for (let row = 0; row < 3; row += 1) {
                    const colmn = rows[row].children;
                    for(let col = 0; col < colmn.length; col += 1){
                        const box = colmn[col];
                        box.onclick = () => {
                           controller.handleBoxClick(row, col);
                        };
                    }
                  }
                   gameBoxView.render();
                },
                render() {
                    for (let row = 0; row < 3; row += 1) {
                        const colmn = rows[row].children;
                        for(let col = 0; col < colmn.length; col += 1){
                            const box = colmn[col];
                            box.innerText = model.box[row][col];
                        }
                      }
                },
            };
            const statusView = {
                init() {
                    const reset = document.getElementById('reset');
                    reset.onclick = () => {
                        controller.reset();
                    };
                    statusView.render();
                },
                render() {
                    status.innerText = `player ${model.currentplayer} to move`;
                },
            };
            const controller = {
                reset() {
                    model.currentplayer = X;
                    model.box = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', ''],   
                    ];
                    controller.init();
                },
                checkGameStatus() {
                    for(let row = 0; row < 3; row +=1) {
                        const current = model.box[row][0];
                        if (current !== '' && model.box[row][1] === current && model.box[row][2] === current) {
                            return `${current} wins`;
                        }
                    }
                    for(let col = 0; col < 3; col += 1) {
                        const current = model.box[col][0];
                        if (current !== '' && model.box[1][col] === current && model.box[2][col] === current) {
                            return `${current} wins`;
                        }  
                    }
                    const current = model.box[1][1];
                    if (current !== '' && model.box[0][0] === current && model.box[2][2] === current) {
                        return `${current} wins`;
                    }
                    if (current !== '' && model.box[0][2] === current && model.box[2][0] === current) {
                        return `${current} wins`;
                    }    
                },
                handleBoxClick(row, colmn){
                    if(model.box[row][colmn] === ''){
                        model.box[row][colmn] = model.currentplayer;
                        model.currentplayer = model.currentplayer === X ? 0 : X;
                        const gameStatus = controller.checkGameStatus();
                        if(gameStatus) {
                            model.inprogress = false;

                        }
                        gameBoxView.render();
                        statusView.render();
                    } else {
                        alert('wrong move')
                    }
                },
                init() {
                    gameBoxView.init();
                    statusView.init();
                },
            };
            controller.init();
        }
    }
)();