import { SEASON_CONFIG } from '../data/seasons';

export function tickPopulation(state) {
  const { population, stockpiles, meta, factions } = state;
  const seasonConfig = SEASON_CONFIG[meta.season];

  // Peasant consumption
  const peasantFoodNeeded = Math.ceil(population.peasants.total / 5);
  const foodAvailable = stockpiles.food.cabbage + stockpiles.food.wheat;
  
  if (foodAvailable >= peasantFoodNeeded) {
    stockpiles.food.cabbage = Math.max(0, stockpiles.food.cabbage - peasantFoodNeeded);
    population.peasants.happiness = Math.min(100, population.peasants.happiness + 1);
  } else {
    // Food shortage
    population.peasants.happiness = Math.max(0, population.peasants.happiness - 3);
    if (population.peasants.happiness === 0) {
      // Radicalization
      const radicalized = Math.floor(population.peasants.total * 0.1);
      population.peasants.radicalized += radicalized;
      population.peasants.total -= radicalized;
    }
  }

  // Artisan consumption (bread and ale)
  const artisanBreadNeeded = Math.ceil(population.artisans.total / 3);
  const artisanAleNeeded = Math.ceil(population.artisans.total / 5);
  
  let artisanFed = false;
  let artisanHappy = false;

  if (stockpiles.food.bread >= artisanBreadNeeded) {
    stockpiles.food.bread -= artisanBreadNeeded;
    artisanFed = true;
  }

  if (stockpiles.goods.ale >= artisanAleNeeded) {
    stockpiles.goods.ale -= artisanAleNeeded;
    artisanHappy = true;
  }

  if (artisanFed && artisanHappy) {
    population.artisans.happiness = Math.min(100, population.artisans.happiness + 2);
  } else if (!artisanFed || !artisanHappy) {
    population.artisans.happiness = Math.max(0, population.artisans.happiness - 2);
  }

  // Garrison consumption (meat and ale)
  if (population.garrison.total > 0) {
    const garrisonMeatNeeded = Math.ceil(population.garrison.total / 3);
    const garrisonAleNeeded = Math.ceil(population.garrison.total / 5);

    let garrisonFed = false;
    if (stockpiles.food.meat >= garrisonMeatNeeded) {
      stockpiles.food.meat -= garrisonMeatNeeded;
      garrisonFed = true;
    }

    if (stockpiles.goods.ale >= garrisonAleNeeded) {
      stockpiles.goods.ale -= garrisonAleNeeded;
    }

    if (!garrisonFed) {
      population.garrison.happiness = Math.max(0, population.garrison.happiness - 5);
      if (population.garrison.happiness === 0) {
        population.garrison.deserters += Math.floor(population.garrison.total * 0.2);
        population.garrison.total = Math.max(0, population.garrison.total - population.garrison.deserters);
      }
    }
  }

  // Firewood consumption (seasonal)
  const firewoodNeeded = (population.peasants.total + population.artisans.total + population.garrison.total) * seasonConfig.firewoodConsumption * 0.01;
  if (meta.season === 'winter') {
    if (stockpiles.materials.firewood >= firewoodNeeded) {
      stockpiles.materials.firewood -= firewoodNeeded;
    } else {
      // Severe cold
      population.peasants.happiness -= 10;
      population.artisans.happiness -= 5;
      population.garrison.happiness -= 5;
    }
  }

  // Season happiness bonus
  population.peasants.happiness = Math.min(100, population.peasants.happiness + seasonConfig.happinessBonus);
  population.artisans.happiness = Math.min(100, population.artisans.happiness + seasonConfig.happinessBonus);
}
