// Import the Spells data from the JSON file
import SpellsData from '../data/SpellsData.json' assert {type: 'json'};

export class Spells {
    constructor() {
        this.spellList = SpellsData.spell;
    }

    getSpellsByLevel(level) {
        return this.spellList.filter(spell => spell.level === level);
    }

    getSpellByName(name) {
        return this.spellList.find(spell => spell.name === name);
    }

    getAllSpells() {
        return this.spellList;
    }

    // Format spell data for easier use
    formatSpellData(spell) {
        return {
            level: spell.level,
            name: spell.name,
            description: spell.description,
            effect: spell.effect,
            diceRoll: spell.dice_roll,
            element: spell.element,
            durationMs: spell.duration_ms
        };
    }
}

// Example usage:
// const spellManager = new Spells();
// const dewSparkle = spellManager.getSpellByName("Dew Sparkle");
// console.log(dewSparkle);
// const level1Spells = spellManager.getSpellsByLevel(1);
// console.log(level1Spells);
