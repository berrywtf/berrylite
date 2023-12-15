import BackgroundsData from '../data/BackgroundsData.json' assert { type: 'json' };

export class Backgrounds {
    constructor() {
        this.backgrounds = BackgroundsData.Backgrounds;
    }

    getBackgroundOptions() {
        return this.backgrounds.map(background => background.name);
    }

    findBackgroundByName(name) {
        return this.backgrounds.find(background => background.name === name);
    }

    applyBackgroundBonuses(character, backgroundName) {
        const background = this.findBackgroundByName(backgroundName);
        if (background && background.bonus) {
            const bonusValue = this.calculateBonus(background.bonus.formula, character.stats, character.level);
            const dependency = background.bonus.stat_dependency;
            if (dependency && dependency !== "none") {
                character.stats[dependency] = (character.stats[dependency] || 0) + bonusValue;
            }
        }
    }

    calculateBonus(formula, stats, level) {
        // Implementation of bonus calculation
        if (formula.includes('modifier')) {
            const stat = formula.split('_')[0];
            return stats[stat].modifier;
        } else if (formula.includes('/')) {
            const [numerator, denominator] = formula.split('/').map(Number);
            return Math.floor((level * numerator) / denominator);
        }
        // Additional formula patterns
    }
}

// Example usage:
// const backgroundsModule = new Backgrounds();
// const options = backgroundsModule.getBackgroundOptions();
// backgroundsModule.applyBackgroundBonuses(character, 'Orchard Tactician');
