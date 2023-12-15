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
    this.populateDropdown('ancestrySelector', this.ancestryModule.getAncestryOptions());
    this.populateDropdown('classSelector', this.classesModule.getClassOptions());
  }

  initEventListeners() {
    document.getElementById('ancestrySelector').addEventListener('change', this.handleAncestryChange.bind(this));
    document.getElementById('classSelector').addEventListener('change', this.handleClassChange.bind(this));
    document.getElementById('rollDiceButton').addEventListener('click', this.handleRollStats.bind(this));
    document.getElementById('createCharacterButton').addEventListener('click', this.handleFinalizeCharacter.bind(this));
  }

  populateDropdown(selectorId, options) {
    const selector = document.getElementById(selectorId);
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      selector.appendChild(opt);
    });
  }

  handleAncestryChange(event) {
    const ancestryName = event.target.value;
    this.characterCreation.chooseAncestry(ancestryName);
    this.updateAncestryInfo(ancestryName);
    this.updateCharacterSheet();
  }

  handleClassChange(event) {
    const className = event.target.value;
    this.characterCreation.chooseClass(className);
    this.updateClassInfo(className);
    this.updateCharacterSheet();
  }

  handleRollStats() {
    this.characterCreation.rollStats();
    this.updateCharacterSheet();
  }

  handleFinalizeCharacter() {
    const finalCharacter = this.characterCreation.finalizeCharacter();
    console.log(finalCharacter);
    alert('Character created! Check console for details.');
  }

  updateAncestryInfo(ancestryName) {
    const ancestryInfo = this.ancestryModule.getAncestryDescription(ancestryName);
    document.getElementById('ancestryInfo').textContent = ancestryInfo;
  }

  updateClassInfo(className) {
    const classInfo = this.classesModule.getClassDescription(className);
    document.getElementById('classInfo').textContent = classInfo;
  }

  updateCharacterSheet() {
    const character = this.characterCreation.character;
    this.updateStatsDisplay(character);
    this.updateInventoryDisplay(character);
    this.updateSpellsDisplay(character);
    // Additional UI updates can be added here
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


  updateInventoryDisplay(character) {
    const inventoryList = document.getElementById('playerInventory');
    inventoryList.innerHTML = '';
    character.inventory.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.textContent = item.name; // Add more details if needed
      inventoryList.appendChild(itemElement);
    });
  }

  updateSpellsDisplay(character) {
    const spellsList = document.getElementById('classSpells');
    spellsList.innerHTML = '';
    character.spells.forEach(spell => {
      const spellElement = document.createElement('li');
      spellElement.textContent = spell.name; // Add more details if needed
      spellsList.appendChild(spellElement);
    });
  }
}

export default FrontEndHandler;
