import { Dice } from './utils/dice.js';
import { Modifiers } from './utils/modifiers.js';
import { Spells } from './modules/spells.js'; // Assuming Spells.js is in the same directory

export class GameMechanics {
    static skillCheck(character, ability, backgroundPoints, difficultyClass) {
        const abilityModifier = Modifiers.calculateModifier(character.stats[ability].score);
        const level = character.class.level;
        const roll = Dice.roll("1d20");
        const total = roll + abilityModifier + level + backgroundPoints;
        return total >= difficultyClass;
    }

    static savingThrow(character, ability, difficultyClass) {
        return this.skillCheck(character, ability, 0, difficultyClass);
    }

    static castSpell(character, spellName) {
        const spell = Spells.getSpellByName(spellName);
        if (!spell) throw new Error("Spell not found");

        const spellLevel = spell.level;
        const hpCost = 1 + 2 * spellLevel;
        const signatureSpellReduction = character.signatureSpells.includes(spellName) ? 1 : 0;
        const finalHpCost = Math.max(1, hpCost - signatureSpellReduction);

        if (character.vitals.hitPoints <= finalHpCost) {
            throw new Error("Not enough hit points to cast the spell");
        }

        character.vitals.hitPoints -= finalHpCost;
        const spellDC = 10 + character.class.level + character.stats.mind.modifier;
        // Additional logic for spell effects
    }

    static rollInitiative(character) {
        const dexBonus = Modifiers.calculateModifier(character.stats.dexterity.score);
        const levelBonus = character.class.name === "Fighter" ? character.class.level : 0;
        return Dice.roll("1d20") + dexBonus + levelBonus;
    }

    static attackRoll(character, targetAC, isMelee = true) {
        const attackBonus = isMelee ? character.attacks.melee : character.attacks.ranged;
        const roll = Dice.roll("1d20");
        const total = roll + attackBonus;
        const isCritical = roll === 20;
        return { hit: total >= targetAC || isCritical, critical: isCritical };
    }

    static calculateDamage(character, weapon, isCritical) {
        const damageRoll = Dice.roll(weapon.diceRoll);
        const strengthBonus = Modifiers.calculateModifier(character.stats.strength.score);
        const totalDamage = isCritical ? damageRoll + strengthBonus : damageRoll;
        return totalDamage;
    }

    static fallingDamage(distance) {
        const damage = Math.floor(distance / 10) * Dice.roll("1d6");
        return damage;
    }

    static poisonEffect(character, poisonType) {
        // Implement based on poison type
    }

    static recoverHitPoints(character) {
        character.vitals.hitPoints = character.vitals.maxHitPoints;
    }

    static healWoundPoints(character, amount) {
        character.vitals.woundPoints = Math.min(character.vitals.woundPoints + amount, character.stats.strength.score);
    }
}
