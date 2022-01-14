const GameResult = Object.freeze({
    DRAW: 0,
    WIN: 1,
    LOSE: 2
});

const Move = Object.freeze({
    ROCK: 0,
    PAPER: 1,
    SCISSOR: 2
});

const GameWinner = Object.freeze({
    DRAW: 0,
    HUMAN: 1,
    COMPUTER: 2
});

class Player {
    constructor() {
        this.winCount = 0;
        this.previousGameWon = undefined;
        this.previousMove = undefined;
    }
}

class RockPaperScissor {
    constructor() {
        this.human = new Player();
        this.computer = new Player();
    }

    playRandom() {
        return Math.floor(Math.random() * 3);
    }

    getComputerMove() {
        console.log(this.computer.previousGameWon);
        switch (this.computer.previousGameWon) {
            case GameResult.DRAW:
                return this.playRandom();
            case GameResult.WIN:
                return this.human.previousMove;
            case GameResult.LOSE:
                return 3 - this.human.previousMove - this.computer.previousMove;
            default:
                // First game
                return this.playRandom();
        }
    }

    getWinner(humanMove, computerMove) {
        if (humanMove == computerMove) {
            return GameWinner.DRAW;
        } else {
            if (humanMove == 0 && computerMove == 1) {
                return GameWinner.COMPUTER;
            } else if (humanMove == 0 && computerMove == 2) {
                return GameWinner.HUMAN;
            } else if (humanMove == 1 && computerMove == 0) {
                return GameWinner.HUMAN;
            } else if (humanMove == 1 && computerMove == 2) {
                return GameWinner.COMPUTER;
            } else if (humanMove == 2 && computerMove == 0) {
                return GameWinner.COMPUTER;
            } else if (humanMove == 2 && computerMove == 1) {
                return GameWinner.HUMAN;
            }
        }
    }

    play(humanMove) {
        let computerMove = this.getComputerMove();
        let winner = this.getWinner(humanMove, computerMove);

        this.computer.previousMove = computerMove;
        this.human.previousMove = humanMove;

        switch (winner) {
            case GameWinner.DRAW:
                this.computer.previousGameWon = GameResult.DRAW;
                break;
            case GameWinner.HUMAN:
                this.computer.previousGameWon = GameResult.LOSE;
                this.human.winCount += 1;
                break;
            case GameWinner.COMPUTER:
                this.computer.previousGameWon = GameResult.WIN;
                this.computer.winCount += 1;
                break;
            default:
                break;
        }
        return winner;
    }
};

let game = new RockPaperScissor();

document.getElementById("playButton").addEventListener("click", function() {
    let humanMove = document.getElementById("humanMove").value;
    document.getElementById("result").innerHTML = game.play(humanMove);
});