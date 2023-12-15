export class Dice {
    // Roll a single die of any number of sides
    static rollDie(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    // Roll multiple dice of the same type and sum their results
    static rollMultipleDice(number, sides) {
        let total = 0;
        for (let i = 0; i < number; i++) {
            total += this.rollDie(sides);
        }
        return total;
    }

    // Roll a stat - 4d6 drop the lowest
    static rollStat() {
        let rolls = [];
        for (let i = 0; i < 4; i++) {
            rolls.push(this.rollDie(6));
        }
        rolls.sort((a, b) => a - b).shift(); // Sort and remove the lowest roll
        return rolls.reduce((total, current) => total + current, 0);
    }

    // General purpose dice roll function that can handle expressions like "1d6+2"
    static roll(expression) {
        const parts = expression.split(/d|(\+\d+)|(-\d+)/).filter(Boolean);
        const number = parseInt(parts[0], 10);
        const sides = parseInt(parts[1], 10);
        const modifier = parts.length > 2 ? parseInt(parts[2], 10) : 0;

        const rollTotal = this.rollMultipleDice(number, sides);
        return rollTotal + modifier;
    }
}

// Example usage:
// const statRoll = Dice.rollStat();
// console.log(`Stat Roll: ${statRoll}`);

// const customRoll = Dice.roll("2d8+3");
// console.log(`Custom Roll: ${customRoll}`);
