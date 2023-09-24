var currentPresetTab = 0;


function showPresets()
{
    setCurrentPresetTab(0);

    keyboardPanel.style.display = 'none';

    presets.style.display = 
        presets.style.display != 'block'
        ? 'block'
        : 'none';
}



function hidePresets()
{
    presets.style.display = 'none';
}



function setCurrentPresetTab(tab)
{
    currentPresetTab = tab;

    for (let i = 0; i < presetTabs.children.length; i++)
    {
        presetTabs.children[i].style.background = i == currentPresetTab ? '#1E1E1E' : 'none';
        presetTabs.children[i].style.boxShadow  = i == currentPresetTab ? '0 0 0 0.5px #ffffff2b' : 'none';

        presetContent.children[i].style.display = i == currentPresetTab ? 'flex' : 'none';
    }
}



function loadPresetGraph(graphId)
{
    hideAllMenus();
    
    
    if (isEmpty(graph.pages))
        graph.createPage('');

    uiRemoveAllSavedNodesAndConns();
    graph.clear();


    actionManager.do(new PasteNodesAction(getPresetGraph(graphId), false, false, true, Number.NaN, Number.NaN, true, (nodes) =>
    {
        actionManager.clear();
    }));
}



function getPresetGraph(graphId)
{
    switch (graphId)
    {
        case 'basics':               return presetNodeBasics;
        case 'dataTypes':            return presetDataTypes;
        case 'organize':             return presetOrganize;
        case 'active':               return presetActive;
     

        case 'ifElse':               return presetIfElse;
        case 'select':               return presetSelect;


        case 'sequence':             return presetSequence;
        case 'range':                return presetRange;
        case 'define':               return presetDefine;
        case 'random':               return presetRandom;
        case 'noise':                return presetNoise;
        case 'probability':          return presetProbability;

        case 'randomSeeds':          return presetRandomSeeds;

        case 'loop1d':               return presetLoop1d;
        case 'loop2d':               return presetLoop2d;
        case 'loopLock':             return presetLoopLock;


        case 'quadraticFormula':     return presetQuadraticFormula;
        case 'opponentColor':        return presetOpponentColor;

        
        case 'randomNames':          return presetRandomNames;


        case 'colorContrast':        return presetColorContrast;
        case 'colorSpaces':          return presetColorSpaces;
        case 'invalidColors':        return presetInvalidColors;
        case 'textFromBackground':   return presetTextFromBackground;

        case 'randomColors':         return presetRandomColors;
        case 'tintsAndShades':       return presetTintsAndShades;
        case 'paletteFromColor':     return presetPaletteFromColor;


        case 'shapesStyles':         return presetShapesStyles;
        case 'basicTransform':       return presetBasicTransform;
        case 'combinedTransform':    return presetCombinedTransform;


        case 'basicVariables':       return presetBasicVariables;


        case 'booksOnShelf':         return presetBooksOnShelf;
    }
}