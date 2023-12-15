import WeaponsData from '../data/WeaponsData.json' assert {type: 'json'};

export class Weapons {
    constructor() {
        this.weaponList = WeaponsData.Weapons.reduce((acc, category) => {
            Object.keys(category).forEach(type => {
                acc[type] = category[type];
            });
            return acc;
        }, {});
    }

    getWeaponByName(name) {
        for (const type in this.weaponList) {
            const found = this.weaponList[type].find(weapon => weapon.name === name);
            if (found) return found;
        }
        return null;
    }

    getWeaponsByType(type) {
        return this.weaponList[type] || [];
    }

    getAllWeapons() {
        return Object.values(this.weaponList).flat();
    }

    // Additional methods as needed
}

// Example usage:
// const weaponManager = new Weapons();
// const thornedVineChain = weaponManager.getWeaponByName("Thorned Vine Chain");
// console.log(thornedVineChain);
// const twoHandedWeapons = weaponManager.getWeaponsByType("Two-Handed");
// console.log(twoHandedWeapons);
