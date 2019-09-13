/* Logic */

class Archer {
    constructor(id, initialAccuracy) {
        /*create new archer with individual id and initial accuracy*/
        this.id = id;
        this.accuracy = initialAccuracy;
        this.accuracyIncrement = (1 - initialAccuracy) / 10;
        this.distance = 10;
    }

    move() {
        /*move this archer one step forward*/
        if (this.distance > 0) {
            this.distance--;
            this.accuracy += this.accuracyIncrement;
        } else {
            console.log(`archer ${this.id} can't move!`);
        }
    }

    getArcherInfo() {
        /*get this archer's id and current accuracy*/
        return {
            id: this.id,
            accuracy: parseFloat(this.accuracy.toFixed(2))
        }
    }
}

class App {
    constructor(firstArcherInitialAccuracy, secondArcherInitialAccuracy) {
        /*create new app with initial accuracies for first and second archers*/
        this.firstArcher = new Archer(1, firstArcherInitialAccuracy);
        this.secondArcher = new Archer(2, secondArcherInitialAccuracy);

    }

    getTurnsLog() {
        /*calculate all accuracies per turn for both archers and make duel log*/
        const turns = [];
        for (let turn = 0; turn <= 10; turn++) {
            const firstArcherInfo = this.firstArcher.getArcherInfo();
            const secondArcherInfo = this.secondArcher.getArcherInfo();
            //calculate chances of missing
            const missFirst = parseFloat((1 - firstArcherInfo.accuracy).toFixed(2));
            const missSecond = parseFloat((1 - secondArcherInfo.accuracy).toFixed(2));
            //log this turn
            const turnLog = [
                {turn, ...firstArcherInfo, miss: missFirst},
                {turn, ...secondArcherInfo, miss: missSecond}
            ];
            turns.push(turnLog);
            //if archers not in end point, move them.
            if (turn < 10) {
                this.firstArcher.move();
                this.secondArcher.move();
            }
        }
        return turns;
    }

    run() {
        /*run this app*/
        let turnsLog = this.getTurnsLog(), //get info about all turns
            bestTurnForFirst = null,
            bestTurnForSecond = null;
        //find best turns for every archer
        for (let i = 0; i < 10; i++) {
            const firstArcher = turnsLog[i][0],
                firstArcherNextTurn = turnsLog[i + 1][0],
                secondArcher = turnsLog[i][1];
            if (firstArcher.accuracy > secondArcher.miss && !bestTurnForFirst) {
                bestTurnForFirst = firstArcher.turn;
            }
            if (secondArcher.accuracy > firstArcherNextTurn.miss && !bestTurnForSecond) {
                bestTurnForSecond = secondArcher.turn;
            }
        }
        return {bestTurnForFirst, bestTurnForSecond};
    }
}

/*console.clear();
app = new App(0.1, 0.1);
console.log(app.run());*/

/*Render*/

function updatePage(newData) {
    /*update elements with new converted values*/
    const resultList = document.getElementById('result'),
        {bestTurnForFirst, bestTurnForSecond} = newData;
    resultList.innerHTML = '';
    resultList.innerHTML += `<li class="list-group-item">For first archer: ${bestTurnForFirst}</li>`;
    resultList.innerHTML += `<li class="list-group-item">For second archer: ${bestTurnForSecond}</li>`;
}


const inputForm = document.getElementById('input-form');

inputForm.addEventListener('submit', event => {
    event.preventDefault();
    const firstArcherAccuracy = Number(document.getElementById('firstArcherAccuracy').value),
        secondArcherAccuracy = Number(document.getElementById('secondArcherAccuracy').value),
        app = new App(firstArcherAccuracy, secondArcherAccuracy),
        solution = app.run();
    updatePage(solution);
});