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
        return this.accuracy;
    }

}