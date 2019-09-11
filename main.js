class Archer {
    constructor(id, initialAccuracy) {
        this.id = id;
        this.accuracy = initialAccuracy;
        this.accuracyIncrement = (1 - initialAccuracy) / 10;
        this.distance = 10;
    }

    move() {
        if (this.distance > 0) {
            this.distance--;
            this.accuracy += this.accuracyIncrement;
        } else {
            console.log(`archer ${this.id} can't move!`);
        }
    }

    getDistance() {
        return this.distance;
    }

    getAccuracy() {
        return parseFloat(this.accuracy.toFixed(2));
    }

    getId() {
        return this.id;
    }
}

class App {
    constructor(firstArcherInitialAccuracy, secondArcherInitialAccuracy) {
        this.firstArcher = new Archer(1, firstArcherInitialAccuracy);
        this.secondArcher = new Archer(2, secondArcherInitialAccuracy);

    }

    getArcherInfo(archer) {
        return {
            id: archer.getId(),
            accuracy: archer.getAccuracy()
        }
    }

    getTurnsLog() {
        const turns = [];
        for (let turn = 0; turn <= 10; turn++) {
            const firstArcherInfo = this.getArcherInfo(this.firstArcher);
            const secondArcherInfo = this.getArcherInfo(this.secondArcher);
            const missFirst = parseFloat((1 - firstArcherInfo.accuracy).toFixed(2));
            const missSecond = parseFloat((1 - secondArcherInfo.accuracy).toFixed(2));
            const turnLog = [
                {turn, ...firstArcherInfo, miss: missFirst},
                {turn, ...secondArcherInfo, miss: missSecond}
            ];
            turns.push(turnLog);
            if (turn < 10) {
                this.firstArcher.move();
                this.secondArcher.move();
            }
        }
        return turns;
    }

    run() {
        let turnsLog = this.getTurnsLog(),
            bestTurnForFrist = null,
            bestTurnForSecond = null;
        for (let i = 0; i < 10; i++) {
            const firstArcher = turnsLog[i][0],
                firstArcherNextTurn = turnsLog[i + 1][0],
                secondArcher = turnsLog[i][1];
            if (firstArcher.accuracy > secondArcher.miss && !bestTurnForFrist) {
                bestTurnForFrist = firstArcher.turn;
            }
            if (secondArcher.accuracy > firstArcherNextTurn.miss && !bestTurnForSecond) {
                bestTurnForSecond = secondArcher.turn;
            }
        }
        return {bestTurnForFrist, bestTurnForSecond};
    }
}

console.clear();
app = new App(0.1, 0.1);
console.log(app.run());