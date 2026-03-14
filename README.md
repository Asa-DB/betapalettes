# Beta 1.7.3 Block Palette Generator

A Minecraft menu-styled website for generating, saving, and creating block palettes from Beta 1.7.3 blocks.

## Features

- **Generate Random Palettes**: Click "Generate Random" to instantly create a randomized palette of 6-10 blocks
- **Create Custom Palettes**: Handpick blocks from the entire Beta 1.7.3 collection to create your own palette (5-12 blocks)
- **Save Palettes**: Save your favorite palettes locally in your browser
- **Load Saved Palettes**: View, manage, and load previously saved palettes
- **Copy as Code**: Export your palette as JSON code for use in other projects
- **Minecraft Menu Aesthetic**: Fully styled with classic Minecraft GUI elements and pixel-art styling

## Available Blocks

The palette generator includes 70+ blocks from Minecraft Beta 1.7.3:

**Natural Blocks**
- Stone variants (Granite, Diorite, Andesite)
- Dirt, Grass, Sand, Gravel
- All wood types (Oak, Spruce, Birch logs and planks)
- Leaves (all types)
- Ore blocks (Coal, Iron, Gold, Diamond, Redstone)
- Special blocks (Clay, Ice, Obsidian, Water, Lava)

**Nether Blocks**
- Netherrack, Soul Sand, Glowstone, Nether Bricks

**Decorative Blocks**
- Stone Bricks (regular, mossy, cracked)
- Wool (all 16 colors)
- Bricks, Bookshelf, Glass
- Crafting Table, Furnace, Chest
- Farmland, Pumpkin, Melon, Sponge

## How to Use

1. Extract the files to your desired location
2. Open `index.html` in your web browser
3. Use the main menu to:
   - **Generate Random**: Create a random palette automatically
   - **Create Custom**: Pick specific blocks to build your palette
   - **Load Saved**: View all saved palettes from previous sessions

## Controls

- Click blocks to select/deselect them in custom builder
- Name your palette in the input field
- Save palettes locally (stored in browser localStorage)
- Copy palette data as JSON for external use

## Technical Details

- **Storage**: All palettes are saved in browser localStorage
- **Blocks**: 70+ Beta 1.7.3 blocks with accurate color representations
- **Responsive**: Works on desktop and mobile devices
- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript

## File Structure

```
betapalettes/
├── index.html       # Main HTML file
├── styles.css       # Minecraft-style CSS
├── script.js        # Core functionality
└── README.md        # This file
```

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- LocalStorage API

## Tips

- Minimum palette size: 5 blocks
- Maximum palette size: 12 blocks
- Random palettes range from 6-10 blocks
- All saved palettes persist between browser sessions
- Use "Copy as Code" to backup or share palettes

Enjoy creating your custom block palettes!
