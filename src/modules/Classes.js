import ClassesData from '../data/ClassesData.json' assert {type: 'json'};
import { Spells } from './Spells.js'

export class Classes {
    constructor() {
        this.classes = ClassesData.ClassesData;
        console.log('Loaded Classes:', this.classes); // Debugging line
        this.spellManager = new Spells(); // Ensure this is correctly initialized
    }

    getClassOptions() {
        // Ensure that this.classes is defined and is an object
        if (!this.classes || typeof this.classes !== 'object') {
            console.error('Classes data is not loaded correctly:', this.classes);
            return [];
        }

        return Object.keys(this.classes);
    }

    findClassByName(name) {
        return this.classes[name];
    }

    applyClassBonuses(character, className) {
        const cls = this.findClassByName(className);
        if (cls) {
            this.applyStatBonuses(character, cls);
            this.addAbilities(character, cls);
            this.addSpells(character, cls);
        }
    }

    getClassDescription(name) {
        const cls = this.findClassByName(name);
        return cls ? cls.description : '';
    }

    applyStatBonuses(character, cls) {
        if (cls.stat_bonus) {
            for (const stat in cls.stat_bonus) {
                console.log(`Applying bonus to ${stat}:`, cls.stat_bonus[stat]);
                if (character.stats[stat]) {
                    console.log(`Current score for ${stat}:`, character.stats[stat].score);
                    character.stats[stat].score += cls.stat_bonus[stat];
                } else {
                    console.error(`Stat ${stat} not found in character stats`);
                }
            }
        }
    }
    

    addAbilities(character, cls) {
        character.classAbilities = cls.abilities.map(ability => ({
            ...ability,
            currentUses: this.calculateCurrentUses(ability, character.level)
        }));
    }


    addSpells(character, cls) {
        if (cls.spells && Array.isArray(cls.spells)) {
            character.spells = cls.spells.map(spellName => {
                const spell = this.spellManager.getSpellByName(spellName);
                if (!spell) {
                    console.error(`Spell '${spellName}' not found.`);
                    return null;
                }
                return spell;
            }).filter(spell => spell !== null);
        } else {
            console.error(`Spells data is not an array or is missing for class '${cls.name}':`, cls.spells);
        }
    }
    

    calculateCurrentUses(ability, level) {
        // Check if uses_per_combat is a string and contains 'level'
        if (typeof ability.uses_per_combat === 'string' && ability.uses_per_combat.includes('level')) {
            // Replace 'level' with the actual level value and evaluate the expression
            return eval(ability.uses_per_combat.replace('level', level));
        } else if (typeof ability.uses_per_combat === 'number') {
            // If uses_per_combat is already a number, return it directly
            return ability.uses_per_combat;
        }
        return 0; // Default return value if none of the above conditions are met
    }
    async loadClassesData() {
        try {
            const response = await fetch('../data/ClassesData.json');
            const data = await response.json();
            this.classes = data.Classes;
        } catch (error) {
            console.error('Error loading classes data:', error);
        }
    }
}



// Example usage:
// const classesModule = new Classes();
// const options = classesModule.getClassOptions();
// classesModule.applyClassBonuses(character, 'Juicer');
