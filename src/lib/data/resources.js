export const FOOD_TYPES = {
  CABBAGE: 'cabbage',
  WHEAT: 'wheat',
  BREAD: 'bread',
  MEAT: 'meat'
};

export const MATERIAL_TYPES = {
  IRON_ORE: 'ironOre',
  IRON: 'iron',
  WOOD: 'wood',
  FIREWOOD: 'firewood',
  STONE: 'stone',
  STEEL: 'steel'
};

export const GOODS_TYPES = {
  ALE: 'ale',
  CLOTHES: 'clothes',
  ARROWS: 'arrows',
  SWORDS: 'swords',
  DAGGERS: 'daggers',
  LONGSWORDS: 'longswords',
  ARMOR: 'armor',
  CHAINMAIL: 'chainmail',
  PLATE_ARMOR: 'plateArmor'
};

export const RESOURCE_GROUPS = {
  FOOD: 'food',
  MATERIALS: 'materials',
  GOODS: 'goods'
};

export const RESOURCE_PRICES = {
  // Food
  [FOOD_TYPES.CABBAGE]: 5,
  [FOOD_TYPES.WHEAT]: 8,
  [FOOD_TYPES.BREAD]: 12,
  [FOOD_TYPES.MEAT]: 20,
  // Materials
  [MATERIAL_TYPES.IRON_ORE]: 10,
  [MATERIAL_TYPES.IRON]: 25,
  [MATERIAL_TYPES.WOOD]: 3,
  [MATERIAL_TYPES.FIREWOOD]: 5,
  [MATERIAL_TYPES.STONE]: 4,
  [MATERIAL_TYPES.STEEL]: 50,
  // Goods
  [GOODS_TYPES.ALE]: 15,
  [GOODS_TYPES.CLOTHES]: 18,
  [GOODS_TYPES.ARROWS]: 2,
  [GOODS_TYPES.SWORDS]: 35,
  [GOODS_TYPES.DAGGERS]: 20,
  [GOODS_TYPES.LONGSWORDS]: 60,
  [GOODS_TYPES.ARMOR]: 40,
  [GOODS_TYPES.CHAINMAIL]: 55,
  [GOODS_TYPES.PLATE_ARMOR]: 80
};

export const DEPOSIT_QUALITY = {
  POOR: 0.5,
  AVERAGE: 1.0,
  GOOD: 1.5,
  EXCELLENT: 2.0
};
