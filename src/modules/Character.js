export class Character {
    constructor() {
        this.name = "";
        this.gender = "";
        this.ancestry = "";
        this.height = "";
        this.weight = "";
        this.hair = "";
        this.eyes = "";
        this.ancestryAbilityBP = 0;
        this.backgroundsBP = 0;
        this.class = { name: "", level: 0, experience: 0 };
        this.items = [];
        this.stats = {
            strength: { score: 0, modifier: 0 },
            dexterity: { score: 0, modifier: 0 },
            mind: { score: 0, modifier: 0 },
            charisma: { score: 0, modifier: 0 }
        };
        this.vitals = {
            currentWoundPoints: 0,
            maxWoundPoints: 0,
            hitPoints: 0
        };
        this.initiative = 0;
        this.armorClass = 0;
        this.shieldACBonus = 0;
        this.armorACBonus = 0;
        this.attacks = {
            combatBonus: 0,
            magicCombatBonus: 0,
            melee: 0,
            finesse: 0,
            ranged: 0,
            magic: 0
        };
        this.weapons = [];
        this.equipment = [];
        this.classAbilities = [];
        this.spells = [];
        this.wealth = {
            pomegranium: 0,
            goldenberrium: 0,
            silverpeelium: 0,
            copperseedium: 0
        };
        this.inventory = [];
        this.notes = "";
    }

    // ... [Other methods remain the same]

    // Method to calculate and update character's combat stats
    calculateCombatStats() {
        // Example logic to calculate initiative, armor class, attacks, etc.
        this.initiative = Dice.roll("1d20") + this.stats.dexterity.modifier;
        this.armorClass = 10 + this.stats.dexterity.modifier + this.armorACBonus + this.shieldACBonus;
        this.attacks.melee = this.stats.strength.modifier + this.class.level; // Example calculation
        // Add more calculations as needed
    }

    // Method to update character's stats and recalculate related values
    updateStats({ strength, dexterity, mind, charisma }) {
        this.stats.strength.score = strength;
        this.stats.dexterity.score = dexterity;
        this.stats.mind.score = mind;
        this.stats.charisma.score = charisma;

        // Recalculate modifiers and other dependent values
        this.calculateModifiers();
        this.calculateCombatStats();
    }

    // Method to calculate modifiers based on stats
    calculateModifiers() {
        for (const stat in this.stats) {
            this.stats[stat].modifier = Math.floor((this.stats[stat].score - 10) / 2);
        }
    }

    // Method to update character's equipment and recalculate related values
    updateEquipment({ armor, weapons }) {
        this.armor = armor;
        this.weapons = weapons;
        // Recalculate armor class, etc.
        this.calculateCombatStats();
    }

    // Method to add spells to the character
    addSpell(spell) {
        this.spells.push(spell);
    }

    // Method to remove a spell from the character
    removeSpell(spellName) {
        this.spells = this.spells.filter(spell => spell.name !== spellName);
    }

    // Method to serialize character data for saving
    serialize() {
        return JSON.stringify(this);
    }

    // Method to deserialize character data for loading
    static deserialize(data) {
        const characterData = JSON.parse(data);
        const character = new Character();
        Object.assign(character, characterData);
        return character;
    }
    updateAncestryBonuses(bonuses) {
        for (const stat in bonuses) {
            this.stats[stat].score += bonuses[stat];
        }
    }

    // New method to update character's background bonuses
    updateBackgroundBonuses(bonuses) {
        // Logic to apply background bonuses
    }

    // New method to update character's class abilities and spells
    updateClassDetails({ abilities, spells }) {
        this.classAbilities = abilities;
        this.spells = spells;
    }

    // New method to update character's equipment (armor, weapons, etc.)
    updateEquipment({ armor, weapons }) {
        this.armor = armor;
        this.weapons = weapons;
    }

    // New method to roll for wealth
    rollForWealth() {
        this.wealth = Dice.roll('1d42') + 5; // Example: Roll 1d42 and add 5
    }
}

// Example usage:
// const myCharacter = new Character();
// myCharacter.updateBasicInfo({ name: "Berry", gender: "Female", ancestry: "Applekin", height: "5ft", weight: "130lbs", hair: "Green", eyes: "Brown" });
// myCharacter.updateClass({ name: "Juicer", level: 1, experience: 0 });
// myCharacter.updateStats({ strength: 10, agility: 12, mind: 14, charisma: 8 });
// myCharacter.addItemToInventory({ name: "Magic Wand", type: "Weapon", effect: "Increase spell power" });
// const serializedCharacter = myCharacter.serialize();
// console.log(serializedCharacter);
