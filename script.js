const BLOCKS = [
    { id: 'bedrock', name: 'Bedrock' },
    { id: 'birchLog', name: 'Birch Log' },
    { id: 'blackWool', name: 'Black Wool' },
    { id: 'blueWool', name: 'Blue Wool' },
    { id: 'bricks', name: 'Bricks' },
    { id: 'brownWool', name: 'Brown Wool' },
    { id: 'cake', name: 'Cake' },
    { id: 'clayBlock', name: 'Clay' },
    { id: 'carvedPumpkin', name: 'Carved Pumpkin' },
    { id: 'coalOre', name: 'Coal Ore' },
    { id: 'cobblestone', name: 'Cobblestone' },
    { id: 'craftingTable', name: 'Crafting Table' },
    { id: 'cyanWool', name: 'Cyan Wool' },
    { id: 'darkGreenWool', name: 'Dark Green Wool' },
    { id: 'diamondBlock', name: 'Diamond Block' },
    { id: 'diamondOre', name: 'Diamond Ore' },
    { id: 'dirtBlock', name: 'Dirt Block' },
    { id: 'dispenser', name: 'Dispenser' },
    { id: 'furnace', name: 'Furnace' },
    { id: 'glassBlock', name: 'Glass Block' },
    { id: 'glowStone', name: 'Glowstone' },
    { id: 'goldBlock', name: 'Gold Block' },
    { id: 'goldOre', name: 'Gold Ore' },
    { id: 'grassBlock', name: 'Grass Block' },
    { id: 'gravel', name: 'Gravel' },
    { id: 'greyWool', name: 'Grey Wool' },
    { id: 'iceBlock', name: 'Ice Block' },
    { id: 'ironBlock', name: 'Iron Block' },
    { id: 'ironOre', name: 'Iron Ore' },
    { id: 'jackOLantern', name: 'Jack O\'Lantern' },
    { id: 'lapisOre', name: 'Lapis Ore' },
    { id: 'lightBlueWool', name: 'Light Blue Wool' },
    { id: 'lightGreyWool', name: 'Light Grey Wool' },
    { id: 'limeWool', name: 'Lime Wool' },
    { id: 'magentaWool', name: 'Magenta Wool' },
    { id: 'mossyCobblestone', name: 'Mossy Cobblestone' },
    { id: 'netherack', name: 'Netherrack' },
    { id: 'noteBlock', name: 'Note Block' },
    { id: 'oakLog', name: 'Oak Log' },
    { id: 'oakPlanks', name: 'Oak Planks' },
    { id: 'obsidian', name: 'Obsidian' },
    { id: 'orangeWool', name: 'Orange Wool' },
    { id: 'pinkWool', name: 'Pink Wool' },
    { id: 'piston', name: 'Piston' },
    { id: 'pumpkin', name: 'Pumpkin' },
    { id: 'purpleWool', name: 'Purple Wool' },
    { id: 'redWool', name: 'Red Wool' },
    { id: 'redstoneOre', name: 'Redstone Ore' },
    { id: 'sandBlock', name: 'Sand Block' },
    { id: 'sandStone', name: 'Sandstone' },
    { id: 'smoothStone', name: 'Smooth Stone' },
    { id: 'snowyGrassBlock', name: 'Snowy Grass Block' },
    { id: 'snowBlock', name: 'Snow' },
    { id: 'soulSand', name: 'Soul Sand' },
    { id: 'spongeBlock', name: 'Sponge Block' },
    { id: 'spruceLog', name: 'Spruce Log' },
    { id: 'stickyPiston', name: 'Sticky Piston' },
    { id: 'stoneBlock', name: 'Stone Block' },
    { id: 'tnt', name: 'TNT' },
    { id: 'trapDoor', name: 'Trap Door' },
    { id: 'whiteWool', name: 'White Wool' },
    { id: 'yellowWool', name: 'Yellow Wool' },
];

let currentPalette = [];
let savedPalettes = [];
let pendingDeleteId = null;

const ui = {
    generateBtn: document.getElementById('generateBtn'),
    createBtn: document.getElementById('createBtn'),
    loadBtn: document.getElementById('loadBtn'),
    importBtn: document.getElementById('importBtn'),
    saveBtn: document.getElementById('saveBtn'),
    newBtn: document.getElementById('newBtn'),
    copyBtn: document.getElementById('copyBtn'),
    buildSaveBtn: document.getElementById('buildSaveBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    backBtn: document.getElementById('backBtn'),
    modalBtn: document.getElementById('modalBtn'),
    modalConfirm: document.getElementById('modalConfirm'),
    randomizeBtn: document.getElementById('randomizeBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importPaletteBtn: document.getElementById('importPaletteBtn'),
    importCancelBtn: document.getElementById('importCancelBtn'),
    paletteContainer: document.getElementById('paletteContainer'),
    customBuilder: document.getElementById('customBuilder'),
    savedContainer: document.getElementById('savedContainer'),
    importContainer: document.getElementById('importContainer'),
    paletteBlocks: document.getElementById('paletteBlocks'),
    blocksSelector: document.getElementById('blocksSelector'),
    paletteNameInput: document.getElementById('paletteNameInput'),
    blockSearch: document.getElementById('blockSearch'),
    savedList: document.getElementById('savedList'),
    savedCount: document.getElementById('savedCount'),
    modal: document.getElementById('modal'),
    modalText: document.getElementById('modalText'),
    modalActions: document.getElementById('modalActions'),
    previewIsometric: document.getElementById('previewIsometric'),
    previewFlat: document.getElementById('previewFlat'),
    previewStats: document.getElementById('previewStats'),
    blockCount: document.getElementById('blockCount'),
    paletteStats: document.getElementById('paletteStats'),
    importTextarea: document.getElementById('importTextarea'),
    importFile: document.getElementById('importFile'),
    importPreview: document.getElementById('importPreview'),
    importPreviewBlocks: document.getElementById('importPreviewBlocks'),
};

function init() {
    loadFromLocalStorage();
    wireUpEventListeners();
    renderBlockSelector();
}

function wireUpEventListeners() {
    ui.generateBtn.addEventListener('click', generateRandomPalette);
    ui.createBtn.addEventListener('click', showCustomBuilder);
    ui.loadBtn.addEventListener('click', showSavedPalettes);
    ui.importBtn.addEventListener('click', showImportUI);
    ui.saveBtn.addEventListener('click', savePalette);
    ui.newBtn.addEventListener('click', goToMenu);
    ui.copyBtn.addEventListener('click', copyPaletteAsCode);
    ui.randomizeBtn.addEventListener('click', randomizePalette);
    ui.exportBtn.addEventListener('click', () => showExportOptions());
    ui.buildSaveBtn.addEventListener('click', createCustomPalette);
    ui.cancelBtn.addEventListener('click', goToMenu);
    ui.backBtn.addEventListener('click', goToMenu);
    ui.importCancelBtn.addEventListener('click', goToMenu);
    ui.modalBtn.addEventListener('click', closeAlert);
    ui.modalConfirm.addEventListener('click', confirmDelete);
    ui.blockSearch.addEventListener('input', handleSearch);
    ui.importTextarea.addEventListener('input', handleImportInput);
    ui.importFile.addEventListener('change', handleImportFile);
    ui.importPaletteBtn.addEventListener('click', processImport);
}

function generateRandomPalette() {
    const count = randomInt(6, 10);
    currentPalette = pickRandomBlocks(count);
    ui.paletteNameInput.value = generatePaletteName();
    showPalette();
}

function pickRandomBlocks(count) {
    const picked = [];
    const available = [...BLOCKS];
    
    for (let i = 0; i < count && available.length > 0; i++) {
        const idx = randomInt(0, available.length - 1);
        picked.push(available[idx]);
        available.splice(idx, 1);
    }
    
    return picked;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePaletteName() {
    const adjectives = [
        'Ancient', 'Mystic', 'Bright', 'Dark', 'Lush', 'Barren', 
        'Crystalline', 'Earthy', 'Fiery', 'Frosty', 'Wild', 'Serene'
    ];
    const nouns = [
        'Realm', 'Kingdom', 'Tower', 'Cave', 'Forest', 'Desert',
        'Mountain', 'Valley', 'Ocean', 'Castle', 'Citadel', 'Sanctuary'
    ];
    const adj = adjectives[randomInt(0, adjectives.length - 1)];
    const noun = nouns[randomInt(0, nouns.length - 1)];
    return `${adj} ${noun}`;
}

function showCustomBuilder() {
    reset();
    currentPalette = [];
    ui.blockSearch.value = '';
    ui.customBuilder.classList.remove('hidden');
    renderBlockSelector();
    updatePreview();
}

function renderBlockSelector(filter = '') {
    ui.blocksSelector.innerHTML = '';
    const search = filter.toLowerCase();
    const filtered = BLOCKS.filter(b => 
        b.name.toLowerCase().includes(search) || 
        b.id.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'grid-column: 1/-1; text-align: center; color: #888; padding: 40px;';
        empty.textContent = 'No blocks found';
        ui.blocksSelector.appendChild(empty);
        return;
    }

    filtered.forEach(block => {
        const tile = createBlockTile(block, 'block-option');
        tile.addEventListener('click', () => toggleBlockInPalette(block));
        ui.blocksSelector.appendChild(tile);
    });
    
    updateBlockSelectorUI();
}

function handleSearch(e) {
    renderBlockSelector(e.target.value);
}

function createBlockTile(block, className) {
    const div = document.createElement('div');
    div.className = className;
    div.style.backgroundImage = `url("assets/${block.id}.png")`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.title = block.name;
    return div;
}

function toggleBlockInPalette(block) {
    const isSelected = currentPalette.some(b => b.id === block.id);
    
    if (isSelected) {
        currentPalette = currentPalette.filter(b => b.id !== block.id);
    } else {
        if (currentPalette.length < 12) {
            currentPalette.push(block);
        } else {
            showAlert('Maximum 12 blocks per palette!');
            return;
        }
    }
    
    syncBlockSelectorUI();
    updatePreview();
}

function updatePreview() {
    // Update block count
    ui.blockCount.textContent = `${currentPalette.length}/12`;
    
    // Isometric preview (2x grid)
    ui.previewIsometric.innerHTML = '';
    currentPalette.slice(0, 4).forEach(block => {
        const tile = createBlockTile(block, 'block');
        ui.previewIsometric.appendChild(tile);
    });
    
    // Flat list preview
    ui.previewFlat.innerHTML = '';
    currentPalette.forEach(block => {
        const tile = createBlockTile(block, 'block');
        const label = document.createElement('span');
        label.style.cssText = 'margin-left: 8px; color: #aaa; font-size: 0.8em;';
        label.textContent = block.name;
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; align-items: center; gap: 8px;';
        container.appendChild(tile);
        container.appendChild(label);
        ui.previewFlat.appendChild(container);
    });
}



function syncBlockSelectorUI() {
    const tiles = Array.from(ui.blocksSelector.querySelectorAll('.block-option'));
    tiles.forEach((tile, i) => {
        const block = BLOCKS[i];
        const selected = currentPalette.some(b => b.id === block.id);
        tile.classList.toggle('selected', selected);
    });
}

function createCustomPalette() {
    if (currentPalette.length < 5) {
        showAlert('Select at least 5 blocks!');
        return;
    }
    ui.paletteNameInput.value = generatePaletteName();
    showPalette();
}

function showPalette() {
    reset();
    ui.paletteContainer.classList.remove('hidden');
    renderPaletteDisplay();
}

function renderPaletteDisplay() {
    ui.paletteBlocks.innerHTML = '';
    currentPalette.forEach(block => {
        const tile = createBlockTile(block, 'block');
        const label = document.createElement('div');
        label.className = 'block-name';
        label.textContent = block.name;
        tile.appendChild(label);
        ui.paletteBlocks.appendChild(tile);
    });
}

function randomizePalette() {
    const count = currentPalette.length;
    if (count < 5) {
        showAlert('Palette must have at least 5 blocks to randomize');
        return;
    }
    
    currentPalette = pickRandomBlocks(count);
    renderPaletteDisplay();
}

function showExportOptions() {
    const blockIds = currentPalette.map(b => b.id);
    const json = JSON.stringify(blockIds, null, 2);
    const csv = currentPalette.map(b => `${b.id},"${b.name}"`).join('\n');
    
    const options = `
        JSON: \n${json}\n\n
        CSV:\n${csv}
    `;
    
    showAlert('Export formats - copy from browser console or use "Copy as Code"');
    console.log('JSON:', json);
    console.log('CSV:', csv);
}

function savePalette() {
    const name = ui.paletteNameInput.value.trim() || 'Unnamed Palette';
    const palette = {
        id: Date.now(),
        name,
        blocks: currentPalette.map(b => b.id),
        createdAt: new Date().toLocaleString()
    };
    
    savedPalettes.push(palette);
    saveToLocalStorage();
    showAlert(`Palette "${name}" saved!`);
}

function showSavedPalettes() {
    reset();
    ui.savedContainer.classList.remove('hidden');
    renderSavedList();
}

function renderSavedList() {
    ui.savedList.innerHTML = '';
    
    if (savedPalettes.length === 0) {
        const empty = document.createElement('p');
        empty.style.cssText = 'color: #aaaaaa; grid-column: 1/-1; text-align: center; padding: 40px;';
        empty.textContent = 'No saved palettes yet!';
        ui.savedList.appendChild(empty);
        ui.savedCount.textContent = '';
        return;
    }
    
    ui.savedCount.textContent = `${savedPalettes.length} saved`;
    
    savedPalettes.forEach(palette => {
        const item = document.createElement('div');
        item.className = 'saved-palette-item';
        
        const name = document.createElement('div');
        name.className = 'saved-palette-name';
        name.textContent = palette.name;
        
        const preview = document.createElement('div');
        preview.className = 'saved-palette-preview';
        palette.blocks.forEach(blockId => {
            const block = BLOCKS.find(b => b.id === blockId);
            if (block) {
                const tile = createBlockTile(block, 'saved-block-preview');
                preview.appendChild(tile);
            }
        });
        
        const date = document.createElement('div');
        date.className = 'saved-date';
        date.textContent = `Saved: ${palette.createdAt}`;
        
        const actions = document.createElement('div');
        actions.className = 'saved-palette-item-actions';
        
        const loadBtn = document.createElement('button');
        loadBtn.className = 'action-button';
        loadBtn.textContent = 'Load';
        loadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadSavedPalette(palette);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-button secondary';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            confirmDeletePalette(palette.id, palette.name);
        });
        
        actions.append(loadBtn, deleteBtn);
        
        item.append(name, preview, date, actions);
        item.style.cursor = 'default';
        ui.savedList.appendChild(item);
    });
}

function confirmDeletePalette(id, name) {
    pendingDeleteId = id;
    showAlert(`Delete "${name}"?`, true);
}

function confirmDelete() {
    if (pendingDeleteId !== null) {
        savedPalettes = savedPalettes.filter(p => p.id !== pendingDeleteId);
        saveToLocalStorage();
        pendingDeleteId = null;
        closeAlert();
        renderSavedList();
    }
}

function loadSavedPalette(palette) {
    currentPalette = palette.blocks
        .map(id => BLOCKS.find(b => b.id === id))
        .filter(Boolean);
    ui.paletteNameInput.value = palette.name;
    showPalette();
}

function copyPaletteAsCode() {
    const code = JSON.stringify(currentPalette.map(b => b.id), null, 2);
    navigator.clipboard.writeText(code).then(() => {
        showAlert('Palette copied to clipboard!');
    });
}

function showImportUI() {
    reset();
    ui.importTextarea.value = '';
    ui.importFile.value = '';
    ui.importPreview.style.display = 'none';
    ui.importContainer.classList.remove('hidden');
}

function handleImportInput(e) {
    const value = e.target.value.trim();
    if (value) {
        try {
            previewImportedPalette(value);
        } catch (err) {
            // Invalid JSON, don't show preview
            ui.importPreview.style.display = 'none';
        }
    } else {
        ui.importPreview.style.display = 'none';
    }
}

function handleImportFile(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            ui.importTextarea.value = event.target.result;
            handleImportInput({ target: ui.importTextarea });
        };
        reader.readAsText(file);
    }
}

function previewImportedPalette(jsonString) {
    const blockIds = JSON.parse(jsonString);
    
    if (!Array.isArray(blockIds)) {
        throw new Error('Invalid format: expected an array');
    }
    
    const blocks = blockIds
        .map(id => BLOCKS.find(b => b.id === id))
        .filter(Boolean);
    
    if (blocks.length === 0) {
        throw new Error('No valid blocks found');
    }
    
    ui.importPreviewBlocks.innerHTML = '';
    blocks.forEach(block => {
        const tile = createBlockTile(block, 'block');
        const label = document.createElement('span');
        label.style.cssText = 'margin-left: 8px; color: #aaa; font-size: 0.8em;';
        label.textContent = block.name;
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; align-items: center; gap: 8px;';
        container.appendChild(tile);
        container.appendChild(label);
        ui.importPreviewBlocks.appendChild(container);
    });
    
    ui.importPreview.style.display = 'block';
}

function processImport() {
    const jsonString = ui.importTextarea.value.trim();
    
    if (!jsonString) {
        showAlert('Please paste JSON palette code or select a file');
        return;
    }
    
    try {
        const blockIds = JSON.parse(jsonString);
        
        if (!Array.isArray(blockIds)) {
            showAlert('Invalid format: expected an array of block IDs');
            return;
        }
        
        const blocks = blockIds
            .map(id => BLOCKS.find(b => b.id === id))
            .filter(Boolean);
        
        if (blocks.length === 0) {
            showAlert('No valid blocks found in the palette data');
            return;
        }
        
        if (blocks.length < 5) {
            showAlert('Palette must contain at least 5 blocks');
            return;
        }
        
        if (blocks.length > 12) {
            showAlert('Palette must contain at most 12 blocks');
            return;
        }
        
        // Create palette from imported blocks
        currentPalette = blocks;
        ui.paletteNameInput.value = `Imported ${new Date().toLocaleDateString()}`;
        showPalette();
        
    } catch (err) {
        if (err instanceof SyntaxError) {
            showAlert('Invalid JSON format. Please check your palette code.');
        } else {
            showAlert(`Error: ${err.message}`);
        }
    }
}

function reset() {
    document.querySelectorAll('.menu-container, .palette-container, .custom-builder, .saved-container, .import-container')
        .forEach(el => el.classList.add('hidden'));
}

function goToMenu() {
    currentPalette = [];
    ui.paletteNameInput.value = '';
    reset();
    document.querySelector('.menu-container').classList.remove('hidden');
}

function showAlert(message, showConfirm = false) {
    ui.modalText.textContent = message;
    ui.modal.classList.remove('hidden');
    
    if (showConfirm) {
        ui.modalBtn.classList.add('hidden');
        ui.modalConfirm.classList.remove('hidden');
    } else {
        ui.modalBtn.classList.remove('hidden');
        ui.modalConfirm.classList.add('hidden');
    }
}

function closeAlert() {
    ui.modal.classList.add('hidden');
    ui.modalBtn.classList.remove('hidden');
    ui.modalConfirm.classList.add('hidden');
}

function saveToLocalStorage() {
    localStorage.setItem('betapalettes_saved', JSON.stringify(savedPalettes));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('betapalettes_saved');
    if (data) {
        try {
            savedPalettes = JSON.parse(data);
        } catch (e) {
            console.error('Corrupted save file:', e);
            savedPalettes = [];
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
