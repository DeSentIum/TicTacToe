var points = new Array(9);
for(let i = 0; i < 9; i++) {
    points[i] = 0;
}
document.addEventListener("DOMContentLoaded", () => {
    let fields = Array.from(document.getElementsByClassName("field"));
    var counter = 0;
    
    console.log(points);
    fields.forEach((ele, i) => {
        ele.addEventListener("click", function changeTile() {
            counter++;

            if(counter % 2 == 0) {
                this.style.backgroundColor = "red";
                points[i] = 1;
                this.removeEventListener("click", changeTile);
            } else {
                this.style.backgroundColor = "blue";
                points[i] = -1;
                this.removeEventListener("click", changeTile);
            }
            
            
            checkforWin();
        });
    });
});

function checkforWin() {
    //Columns
    for(let i = 0; i < 3; i++) {
        let col = 0;
        for(let j = i; j < 9; j+=3) col += points[j];

        if(col == 3) playerWon(2);
        if(col == -3) playerWon(1);
    }

    //Rows
    for(let i = 0; i < 9; i+=3) {
        let row = 0;
        for(let j = i; j < 3; j++) row += points[j];

        if(row == 3) playerWon(2);
        if(row == -3) playerWon(1);
    }
    
    //Diagonals
    {
        let diag = 0;
        for(let j = 0; j < 9; j+=4) diag += points[j];

        if(diag == 3) playerWon(2);
        if(diag == -3) playerWon(1);
    }
    {
        let diag = 0;
        for(let j = 2; j < 7; j+=2) diag += points[j];

        if(diag == 3) playerWon(2);
        if(diag == -3) playerWon(1);
    }

    //Tie
    let blank = 0;
    for(let i = 0; i < 9; i++) {
        if(points[i] == 0) blank++;
    }
    
    if(!blank) tie();
}

function tie() {
    document.getElementById("res").textContent = "It's a tie.";
    freezeClic = true;
}

function playerWon(x) {
    document.getElementById("res").textContent = "Player " + x + " has won the game";
    freezeClic = true;
}

var freezeClic = false;

document.addEventListener("click", e => {
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);