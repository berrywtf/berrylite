import AncestryData from '../data/AncestryData.json' assert { type: 'json' };

export class Ancestry {
    constructor() {
        this.ancestries = AncestryData.AncestryData;
    }

    getAncestryOptions() {
        return Object.keys(this.ancestries);
    }

    findAncestryByName(name) {
        return this.ancestries[name];
    }

    applyAncestryBonuses(character, ancestryName) {
        const ancestry = this.findAncestryByName(ancestryName);
        if (ancestry && ancestry.bonuses) {
            for (const stat in ancestry.bonuses) {
                character.stats[stat] = (character.stats[stat] || 0) + ancestry.bonuses[stat];
            }
        }
    }

    getAncestryDescription(name) {
        const ancestry = this.findAncestryByName(name);
        return ancestry ? ancestry.description : '';
    }

    getAncestryElement(name) {
        const ancestry = this.findAncestryByName(name);
        return ancestry ? ancestry.element : '';
    }
}


// Example usage:
// const ancestryModule = new Ancestry();
// const options = ancestryModule.getAncestryOptions();
// ancestryModule.applyAncestryBonuses(character, 'Applekin');
