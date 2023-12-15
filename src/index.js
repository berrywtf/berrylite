// Assuming all modules are correctly imported and available
import { CharacterCreation } from './modules/characterCreation.js';
import { Ancestry } from './modules/Ancestry.js';
import { Classes } from './modules/Classes.js';
import { Dice } from './utils/dice.js';
import { Character } from './modules/Character.js'; // Import the Character class

class FrontEndHandler {
    constructor() {
        this.characterCreation = new CharacterCreation();
        this.ancestryModule = new Ancestry();
        this.classesModule = new Classes();
        this.initEventListeners();
        this.populateOptions();
    }

    initEventListeners() {
        document.getElementById("ancestrySelector").addEventListener("change", this.handleAncestryChange.bind(this));
        document.getElementById("classSelector").addEventListener("change", this.handleClassChange.bind(this));
        document.getElementById("rollDiceButton").addEventListener("click", this.handleRollDice.bind(this));
        document.getElementById("createCharacterButton").addEventListener("click", this.handleCreateCharacter.bind(this));
    }

    populateOptions() {
        const ancestryOptions = this.ancestryModule.getAncestryOptions();
        const classOptions = this.classesModule.getClassOptions();

        this.populateSelector("ancestrySelector", ancestryOptions);
        this.populateSelector("classSelector", classOptions);
    }

    populateSelector(selectorId, options) {
        const selector = document.getElementById(selectorId);
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selector.appendChild(opt);
        });
    }

    handleAncestryChange(event) {
        const ancestryName = event.target.value;
        this.characterCreation.chooseAncestry(ancestryName);
        this.updateAncestryInfo(ancestryName);
    }

    handleClassChange(event) {
        const className = event.target.value;
        this.characterCreation.chooseClass(className);
        this.updateClassInfo(className);
    }

    handleRollDice() {
        this.characterCreation.rollStats();
        this.updateStatsDisplay();
    }

    handleCreateCharacter() {
        const finalCharacter = this.characterCreation.finalizeCharacter();
        console.log("Character created:", finalCharacter);
        alert("Character created successfully!");
    }

    updateAncestryInfo(ancestryName) {
        const ancestryInfo = this.ancestryModule.getAncestryDescription(ancestryName);
        document.getElementById("ancestryInfo").textContent = ancestryInfo;
    }

    updateClassInfo(className) {
        const classInfo = this.classesModule.getClassDescription(className);
        document.getElementById("classInfo").textContent = classInfo;
    }

   updateStatsDisplay(character) {
    // Update basic stats and their modifiers
    document.getElementById("strStat").textContent = `${character.stats.strength.score} (${character.stats.strength.modifier})`;
    document.getElementById("dexStat").textContent = `${character.stats.dexterity.score} (${character.stats.dexterity.modifier})`;
    document.getElementById("mindStat").textContent = `${character.stats.mind.score} (${character.stats.mind.modifier})`;
    document.getElementById("chaStat").textContent = `${character.stats.charisma.score} (${character.stats.charisma.modifier})`;

    // Update derived stats like health, defense, etc.
    document.getElementById("hpStat").textContent = character.vitals.hitPoints;
    document.getElementById("defenseStat").textContent = character.armorClass;

    // Update combat-related stats
    // Note: You might need to adjust these based on your game's mechanics
    document.getElementById("hitChanceStat").textContent = character.attacks.melee; // or ranged, depending on character class
    document.getElementById("damageStat").textContent = `${character.attacks.minDamage} - ${character.attacks.maxDamage}`;

    // Update spell-related stats if applicable
    document.getElementById("spellSaveStat").textContent = character.spells.spellSaveDC;
    document.getElementById("spellHitChanceStat").textContent = character.spells.spellHitChance;
}

}

// Initialize the handler
window.onload = () => {
    new FrontEndHandler();
};
