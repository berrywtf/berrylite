import consumableData from './data/Consumables.json';

export class Consumables {
    constructor() {
        this.consumableList = consumableData.Consumables;
    }

    getConsumableByName(name) {
        return this.consumableList.find(consumable => consumable.name === name);
    }

    getAllConsumables() {
        return this.consumableList;
    }
}

// Example usage:
// const consumableManager = new Consumables();
// const healingBerryJuice = consumableManager.getConsumableByName("Healing Berry Juice");
// console.log(healingBerryJuice);
