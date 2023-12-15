// CharacterCreation.js
import { Dice } from "../utils/dice.js";
import { Ancestry } from './Ancestry.js';
import { Backgrounds } from "./Backgrounds.js";
import { Classes } from "./Classes.js";
import { Character } from "./Character.js";
import { Weapons } from "./Weapons.js";
import { Armor } from "./Armor.js";

export class CharacterCreation {
  constructor() {
    this.ancestryModule = new Ancestry();
    this.backgroundsModule = new Backgrounds();
    this.classesModule = new Classes();
    this.character = new Character();
    this.initializeCharacterStats();
}

initializeCharacterStats() {
  const defaultStats = {
      strength: { score: 0, modifier: 0 },
      dexterity: { score: 0, modifier: 0 },
      mind: { score: 0, modifier: 0 },
      charisma: { score: 0, modifier: 0 }
  };
  this.character.stats = { ...defaultStats };
}

rollStats() {
  const stats = ['strength', 'dexterity', 'mind', 'charisma'];
  stats.forEach(stat => {
      if (this.character.stats[stat]) {
          this.character.stats[stat].score = Dice.rollStat();
      } else {
          console.error(`Stat ${stat} not found in character stats`);
      }
  });
}

  // Calculate modifier
  calculateModifier(statScore) {
    return Math.floor((statScore - 10) / 2);
  }

  // Step 2: Choose Ancestry
  chooseAncestry(ancestryName) {
    this.character.ancestry = ancestryName;
    this.ancestryModule.applyAncestryBonuses(this.character, ancestryName);
  }

  // Step 3: Choose Class
  chooseClass(className) {
    this.character.class.name = className;
    this.classesModule.applyClassBonuses(this.character, className);
  }

  // Step 4: Choose Background
  chooseBackground(backgroundName) {
    this.character.backgroundsBP = backgroundName;
    this.backgroundsModule.applyBackgroundBonuses(
      this.character,
      backgroundName
    );
  }

    // Step 5: Assign Background Points
    assignBackgroundPoints(backgroundPointsAllocation) {
        // Ensure the total points do not exceed 8 and no single background exceeds 5 points
        const totalPoints = Object.values(backgroundPointsAllocation).reduce((sum, points) => sum + points, 0);
        const isValidAllocation = totalPoints <= 8 && Object.values(backgroundPointsAllocation).every(points => points <= 5);

        if (!isValidAllocation) {
            throw new Error("Invalid background points allocation. Total points must not exceed 8 and no more than 5 points per background.");
        }

        // Reset any existing background points
        this.character.backgroundsBP = {};

        // Loop through each background in the allocation and assign points
        for (const [backgroundName, points] of Object.entries(backgroundPointsAllocation)) {
            if (points > 0) {
                this.character.backgroundsBP[backgroundName] = points;
                // Optionally, apply the bonuses for each background here
                this.backgroundsModule.applyBackgroundBonuses(this.character, backgroundName, points);
            }
        }
    }

 
    assignAdventurerBag() {
        const weaponName = this.getRandomWeaponForClass(this.character.class.name);
        const armorType = this.classesModule.findClassByName(this.character.class.name).armor;
        const armorName = this.getRandomArmor(armorType);
        const shieldName = this.classRequiresShield(this.character.class.name) ? this.getRandomArmor('shield') : null;

        this.character.addItemToInventory({ name: weaponName, type: 'Weapon' });
        this.character.addItemToInventory({ name: armorName, type: 'Armor' });
        if (shieldName) {
            this.character.addItemToInventory({ name: shieldName, type: 'Shield' });
        }
        this.addMagicBerryJuices();
    }

  // Helper method to get a random low-level weapon based on class
  getRandomWeaponForClass(className) {
    const weaponManager = new Weapons();
    const weaponsByClass = {
      Juicer: ["Dagger", "Quarterstaff of the Orchard Sage"],
      Peeler: ["Short Sword of the Nimble Vine", "Dagger of the Swift Cut"],
      Slicer: ["Scimitar of the Wind's Curve", "Rapier of the Swift Thorn"],
      Ripener: ["Sickle of the Crescent Moon", "Light Mace of the Morning Dew"],
      Harvester: [
        "Great Axe of Orchard's Might",
        "Battle Axe of the Forest Warrior",
      ],
      Seedcaster: ["Wand of the Seed Sower", "Staff of the Sprouting Seed"],
      // Add more classes and their respective starting weapons as needed
    };

    const availableWeapons = weaponsByClass[className] || [
      "Club of the Wild Orchard",
    ];
    const randomIndex = Math.floor(Math.random() * availableWeapons.length);
    return weaponManager.getWeaponByName(availableWeapons[randomIndex]);
  }

  // Helper method to get a random armor based on armor type
  getRandomArmor(armorType) {
    const armorManager = new Armor();
    const armorsByType = {
      light: ["Padded Vine Armor", "Leather Berry Armor"],
      medium: [
        "Hide Armor of the Forest Beast",
        "Scale Mail of the Dragonfruit",
      ],
      heavy: [
        "Splint Mail of the Thorned Guardian",
        "Banded Mail of the Rind Warrior",
      ],
      shield: [
        "Buckler of the Quick Vine",
        "Light Wooden Shield of the Sapling",
      ],
    };

    const availableArmors = armorsByType[armorType];
    if (!availableArmors) return null;

    const randomIndex = Math.floor(Math.random() * availableArmors.length);
    return armorManager.getArmorByName(availableArmors[randomIndex]);
  }

  // Helper method to determine if the class requires a shield
  classRequiresShield(className) {
    const classesRequiringShield = ["Peeler", "Slicer", "Harvester"];
    return classesRequiringShield.includes(className);
  }

  addMagicBerryJuices() {
    // Add 3 Magic Berry Juices to inventory
    for (let i = 0; i < 3; i++) {
      this.character.addItemToInventory({
        name: "Magic Berry Juice",
        type: "Consumable",
      });
    }
  }

  finalizeCharacter() {
    this.calculateDerivedStats();
    this.rollForWealth();
    this.assignAdventurerBag(); // Assign starting equipment
    return this.character;
}

rollForWealth() {
    this.character.wealth = Dice.roll('1d42') + 5;
}


  // Calculate derived stats like hit points, initiative, armor class
  calculateDerivedStats() {
    // Example: Calculate hit points
    this.character.vitals.hitPoints =
      10 + this.character.stats.strength.modifier;

    // Example: Calculate initiative
    this.character.initiative = 10 + this.character.stats.dexterity.modifier;

    // Example: Calculate armor class
    this.character.armorClass = 10 + this.character.stats.dexterity.modifier;
    // Add logic for armor and shield bonuses if applicable
  }
}

// Example usage:
// const gameMechanics = new GameMechanics();
// gameMechanics.rollStats();
// gameMechanics.chooseAncestry('Applekin');
// gameMechanics.chooseClass('Juicer');
// gameMechanics.chooseBackground('Orchard Tactician');
// const finalCharacter = gameMechanics.finalizeCharacter();
// console.log(finalCharacter);
