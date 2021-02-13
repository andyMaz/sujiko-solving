
class Sujiko {
    constructor(puzzle, corners) {
        this.puzzle = puzzle;
        this.corners = corners;
        this.value = '';
        this.given = this.initial_entry();
    }

    initial_entry() {
        let r = []
        for (let i = 0; i < this.puzzle.length; i++) {
            for (let j = 0; j < this.puzzle[0].length; j++) {
                if (this.puzzle[i][j] !== 0)
                    r.push(this.puzzle[i][j])
            }
        }
        return r;
    }



    toString() {
        let temp = "";
        temp += this.puzzle[0][0] + " ";
        temp += "(" + this.corners[0] + ") ";
        temp += this.puzzle[0][1] + " ";
        temp += "(" + this.corners[1] + ") ";
        temp += this.puzzle[0][2] + " ";
        temp += "\n"

        temp += this.puzzle[1][0] + "      ";
        temp += this.puzzle[1][1] + "      ";
        temp += this.puzzle[1][2] + "      ";
        temp += "\n"

        temp += this.puzzle[2][0] + " ";
        temp += "(" + this.corners[2] + ") ";
        temp += this.puzzle[2][1] + " ";
        temp += "(" + this.corners[3] + ") ";
        temp += this.puzzle[2][2] + " ";
        temp += "\n";

        return temp;
    }

    log_print() {
        let temp = "";
        for (let i = 0; i <this.puzzle.length; i++) {
            for (let j = 0; j < this.puzzle[0].length; j++) {
                temp +=  + this.puzzle[i][j] + " ";
            }
            temp += "\n";
        }
        console.log(temp);
    }

    isGiven(n) {
        for (let i = 0; i < this.corners.length; i++) {
            if (this.given[i] === n)
                return true;
        }
        return false;
    }

    toHTML() {
        let temp = "<table class=\"center\">";
        temp += "<tbody>"
        for (let i = 0; i <this.puzzle.length; i++) {
            temp += "<tr>";
            for (let j = 0; j < this.puzzle[0].length; j++) {
                if (i % 2 === 0 && j % 2 === 0) {
                    if (this.isGiven(this.puzzle[i][j]))
                        temp += "<td class='aqua given' >" + this.puzzle[i][j] + "</td>";
                    else
                        temp += "<td class='aqua not_given' >" + this.puzzle[i][j] + "</td>";
                }
                else {
                    if (this.isGiven(this.puzzle[i][j]))
                        temp += "<td class='bisque given'>" + this.puzzle[i][j] + "</td>";
                    else
                        temp += "<td class='bisque not_given'>" + this.puzzle[i][j] + "</td>";
                }
            }
            temp += "</tr>";
        }
        temp += "</tbody>"
        temp += "</table>";
        return temp;
    }

    isCorners(i, j) {
        if (i === 1 && j === 1) return true;
        if (i === 1 && j === 3) return true;
        if (i === 3 && j === 1) return true;
        return i === 3 && j === 3;

    }

    toHTML2() {
        let temp = "<table class=\"center\">";
        temp += "<tbody>"
        let c = 0
        for (let i = 0; i < this.puzzle.length+2; i++) {
            temp += "<tr>";
            for (let j = 0; j < this.puzzle[0].length+2; j++) {
                if (this.isCorners(i, j)) {
                    temp += "<td class='pink'>" + this.corners[c++] + "</td>";
                }
                else {
                    if (i % 2 === 0 && j % 2 === 0 ) {
                        let num = this.puzzle[i - Math.trunc(i/2)][j - Math.trunc(j/2)];
                        if (this.isGiven(num))
                            temp += "<td class='bisque given'>" + num + "</td>";
                        else
                            temp += "<td class='bisque not_given'>" + num + "</td>";
                    }
                    else {
                        temp += "<td class='bisque'>" + "    " + "</td>";
                    }
                }
            }
            temp += "</tr>";
        }
        temp += "</tbody>"
        temp += "</table>";
        return temp;
    }

    is_solved() {
        let a1 = (this.puzzle[0][0] + this.puzzle[0][1] + this.puzzle[1][0] + this.puzzle[1][1]) === (this.corners[0]);
        let a2 = (this.puzzle[0][1] + this.puzzle[0][2] + this.puzzle[1][1] + this.puzzle[1][2]) === (this.corners[1]);
        let a3 = (this.puzzle[1][0] + this.puzzle[1][1] + this.puzzle[2][0] + this.puzzle[2][1]) === (this.corners[2]);
        let a4 = (this.puzzle[1][1] + this.puzzle[1][2] + this.puzzle[2][1] + this.puzzle[2][2]) === (this.corners[3]);
        return a1 && a2 && a3 && a4;
    }

    index(n) {
        return [Math.trunc(n / 3), n % 3];
    }



    possibilities() {
        /*
        *   param i: row index
        *   param j: column index
        *   return: for cell (i, j) it returns, list of potential possible values given numbers already on the board
        */
        let s = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.puzzle[i][j] !== 0) {
                    s.push(this.puzzle[i][j]);
                }
            }
        }
        let r = [];
        for (let p = 1; p < 10; p++) {
            if (!s.includes(p)) {
                r.push(p);
            }
        }
        return r;
    }


    sujiko(n) {
        if (n < 9) {
            let tuple = this.index(n);
            let r = tuple[0];
            let c = tuple[1];

            if (this.puzzle[r][c] === 0) {
                let ps = this.possibilities();
                for (let x = 0; x < ps.length; x++) {
                    this.puzzle[r][c] = ps[x];  // tentative placing of value x at position n
                    this.sujiko(n + 1);
                    if (n+1 === 9 && this.is_solved()) {
                        this.value = this.toHTML2();
                        //this.log_print();
                        console.log(this.toString());
                    }
                    this.puzzle[r][c] = 0;  // backtracking
                }
            }
            else {
                // checking if the board is full
                if (n+1 === 9 && this.is_solved()) {
                    this.value = this.toHTML2();
                    //this.log_print();
                    console.log(this.toString());
                }
                this.sujiko(n + 1);
            }
        }
    }
}

(function main(){
    let puzzle = [[0, 0, 8], [0, 0, 0], [2, 0, 0]];
    let corners = [23, 30, 17, 18];
    let p = new Sujiko(puzzle, corners);
    p.sujiko(0);
    document.body.innerHTML = p.value;
    //document.body.innerHTML = s.printSujiko();
})();

