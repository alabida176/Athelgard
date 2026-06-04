import * as PIXI from 'pixi.js';
import { DEPOSIT_QUALITY } from '../data/resources';

const TILE_SIZE = 100;
const GRID_WIDTH = 3;
const GRID_HEIGHT = 3;

export class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.app = new PIXI.Application({
      view: canvas,
      width: GRID_WIDTH * TILE_SIZE,
      height: GRID_HEIGHT * TILE_SIZE,
      backgroundColor: 0x0c0a09,
      antialias: true
    });

    this.sectorSprites = {};
    this.buildingSprites = {};
    this.fogOverlays = {};
  }

  render(sectors, buildings) {
    // Clear
    this.app.stage.removeChildren();

    sectors.forEach(sector => {
      this.renderSector(sector, buildings);
    });
  }

  renderSector(sector, buildings) {
    const { x, y } = sector;
    const pixelX = x * TILE_SIZE;
    const pixelY = y * TILE_SIZE;

    // Background tile
    const tile = new PIXI.Graphics();
    const color = this.getSectorColor(sector);
    tile.beginFill(color, 1);
    tile.drawRect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
    tile.endFill();
    tile.lineStyle(2, 0xc9a84c, 1);
    tile.drawRect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
    this.app.stage.addChild(tile);

    // Building icons
    const sectorBuildings = buildings.filter(b => b.sector === sector.id);
    sectorBuildings.forEach((building, index) => {
      const bx = pixelX + 20 + (index % 2) * 40;
      const by = pixelY + 20 + Math.floor(index / 2) * 40;
      const icon = this.buildBuildingIcon(building, bx, by);
      this.app.stage.addChild(icon);
    });

    // Fog of war overlay
    if (sector.fogOfWar) {
      const fog = new PIXI.Graphics();
      fog.beginFill(0x000000, 0.7);
      fog.drawRect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
      fog.endFill();
      this.app.stage.addChild(fog);
    } else if (sector.intelPoints < 100) {
      const fog = new PIXI.Graphics();
      const opacity = 1 - (sector.intelPoints / 100);
      fog.beginFill(0x000000, opacity * 0.5);
      fog.drawRect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
      fog.endFill();
      this.app.stage.addChild(fog);
    }

    // Sector label
    const text = new PIXI.Text(sector.name, {
      fontFamily: 'Cinzel',
      fontSize: 12,
      fill: 0xf5e6c8,
      align: 'center'
    });
    text.x = pixelX + TILE_SIZE / 2 - text.width / 2;
    text.y = pixelY + TILE_SIZE - 20;
    this.app.stage.addChild(text);

    // Intel level
    if (sector.intelPoints > 0 && sector.intelPoints < 100) {
      const intelText = new PIXI.Text(`${Math.round(sector.intelPoints)}%`, {
        fontFamily: 'Cinzel',
        fontSize: 10,
        fill: 0xc9a84c
      });
      intelText.x = pixelX + 5;
      intelText.y = pixelY + 5;
      this.app.stage.addChild(intelText);
    }
  }

  buildBuildingIcon(building, x, y) {
    const container = new PIXI.Container();

    const bg = new PIXI.Graphics();
    bg.beginFill(0x1a1714, 0.8);
    bg.drawCircle(0, 0, 15);
    bg.endFill();
    bg.lineStyle(1, 0xc9a84c, 1);
    bg.drawCircle(0, 0, 15);
    container.addChild(bg);

    const icon = new PIXI.Text(this.getBuildingSymbol(building.type), {
      fontFamily: 'Cinzel',
      fontSize: 14,
      fill: 0xc9a84c
    });
    icon.anchor.set(0.5);
    container.addChild(icon);

    container.x = x;
    container.y = y;
    container.interactive = true;
    container.cursor = 'pointer';

    return container;
  }

  getSectorColor(sector) {
    switch (sector.type) {
      case 'city': return 0x2a2520;
      case 'plains': return 0x4a6b3f;
      case 'forest': return 0x2d5016;
      case 'mountain': return 0x6b6b6b;
      case 'river': return 0x1e4d7b;
      default: return 0x3a3530;
    }
  }

  getBuildingSymbol(buildingType) {
    const symbols = {
      farm: '🌾',
      loggingCamp: '🪵',
      ironMine: '⛏️',
      stoneQuarry: '🪨',
      smithy: '🔨',
      bakery: '🍞',
      brewery: '🍺',
      tailor: '🧵',
      barracks: '⚔️',
      scholarTower: '📚',
      expeditionGuild: '🗺️',
      merchantGuild: '💰',
      watchtower: '🗼',
      granary: '🏪',
      stockpile: '📦',
      house: '🏠',
      stoneWall: '🧱',
      ballista: '🎯'
    };
    return symbols[buildingType] || '?';
  }

  resize(width, height) {
    this.app.renderer.resize(width, height);
  }

  destroy() {
    this.app.destroy();
  }
}
