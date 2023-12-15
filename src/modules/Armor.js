import ArmorData from '../data/ArmorData.json' assert {type: 'json'};

export class Armor {
    constructor() {
        this.armorList = ArmorData.Armor;
    }

    getArmorByName(name) {
        for (const category of this.armorList) {
            for (const type in category) {
                const found = category[type].find(armor => armor.name === name);
                if (found) return this.formatArmorData(found);
            }
        }
        return null;
    }

    getAllArmor() {
        let allArmor = [];
        for (const category of this.armorList) {
            for (const type in category) {
                allArmor = allArmor.concat(category[type].map(this.formatArmorData));
            }
        }
        return allArmor;
    }

    formatArmorData(armor) {
        return {
            name: armor.name,
            cost: armor.cost,
            description: armor.description,
            acBonus: armor.ac_bonus
        };
    }
}

// Example usage:
// const armorManager = new Armor();
// const paddedVineArmor = armorManager.getArmorByName("Padded Vine Armor");
// console.log(paddedVineArmor);
// const allArmor = armorManager.getAllArmor();
// console.log(allArmor);
