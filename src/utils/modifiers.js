export class Modifiers {
    // Calculate and return modifier based on a stat
    static calculateModifier(stat) {
        return Math.floor((stat - 10) / 2);
    }

    // Additional modifier utility methods can be added here if needed
}

// Example usage:
// const strengthModifier = Modifiers.calculateModifier(character.stats
