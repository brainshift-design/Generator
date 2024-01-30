var currentPresetTab = 0;



function initPresets()
{
    presets.addEventListener('pointerdown', () => hideAllMenus());
}



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



function clearGraph()
{
    if (isEmpty(graph.pages))
        graph.createPage('');

    uiDeleteAllObjects();
    uiRemoveAllSavedNodesAndConns();
    graph.clear();

    totalObjectCount = 0;
    updateObjectCountDisplay();
}



function loadPresetGraph(graphId)
{
    hideAllMenus();
    clearGraph();


    actionManager.do(new PasteNodesAction(getPresetGraph(graphId), false, false, true, Number.NaN, Number.NaN, true, true, (nodes) =>
    {
        actionManager.clear();
    }));


    addMetricsEvent(METRICS_LOAD_PRESET, graphId);
}



function getPresetGraph(graphId)
{
    switch (graphId)
    {
        case 'default':              return presetDefault;

        case 'basics':               return presetNodeBasics;
        case 'dataTypes':            return presetDataTypes;
        case 'organize':             return presetOrganize;
        case 'active':               return presetActive;
        case 'render':               return presetRender;

        case 'ifElse':               return presetIfElse;
        case 'select':               return presetSelect;
        case 'sorting':              return presetSorting;
        case 'encodingValues':       return presetEncodingValues;
        case 'tableBasics':          return presetTableBasics;
        case 'countryData':          return presetCountryData;
        case 'pieChart':             return presetPieChart;


        case 'sequence':             return presetSequence;
        case 'range':                return presetRange;
        case 'wave':                 return presetWave;
        case 'define':               return presetDefine;
        case 'random':               return presetRandom;
        case 'noise':                return presetNoise;
        case 'probability':          return presetProbability;

        case 'randomSeeds':          return presetRandomSeeds;

        case 'loop1d':               return presetLoop1d;
        case 'loop2d':               return presetLoop2d;
        case 'loopLock':             return presetLoopLock;

        case 'numberLine':           return presetNumberLine;
        case 'wavyDots':             return presetWavyDots;
        case 'falsePerspective':     return presetFalsePerspective;
        case 'rays':                 return presetRays;
        case 'magicDots':            return presetMagicDots;
        

        case 'twoMathNodes':         return presetTwoMathNodes;
        case 'quadraticFormula':     return presetQuadraticFormula;
        case 'opponentColor':        return presetOpponentColor;

        
        case 'randomNames':          return presetRandomNames;
        case 'letterSalad':          return presetLetterSalad;
        case 'fontList':             return presetFontList;

        case 'clock':                return presetClock;

        case 'colorContrast':        return presetColorContrast;
        case 'colorSpaces':          return presetColorSpaces;
        case 'invalidColors':        return presetInvalidColors;
        case 'textFromBackground':   return presetTextFromBackground;

        case 'compositeGradients':   return presetCompositeGradients;


        case 'randomColors':         return presetRandomColors;
        case 'tintsAndShades':       return presetTintsAndShades;
        case 'paletteFromColor':     return presetPaletteFromColor;
        case 'colorSwatches':        return presetColorSwatches;
        case 'blurryBackgrounds':    return presetBlurryBackgrounds;
        case 'brickWall':            return presetBrickWall;
        case 'cairoTiles':           return presetCairoTiles;

        
        case 'shapesStyles':         return presetShapesStyles;
        case 'basicTransform':       return presetBasicTransform;
        case 'combinedTransform':    return presetCombinedTransform;
        case 'feedback':             return presetFeedback;
        
        case 'wobblyCircle':         return presetWobblyCircle;
        case 'snowflakes':           return presetSnowflakes;
        case 'roughStar':            return presetRoughStar;
        case 'nestedTorus':          return presetNestedTorus;
        case 'targets':              return presetTargets;
        case 'spiderWeb':            return presetSpiderWeb;

        
        case 'basicVariables':       return presetBasicVariables;


        case 'namesLogos':           return presetNamesLogos;
        case 'avatars':              return presetAvatars;

        case 'booksOnShelf':         return presetBooksOnShelf;
        case 'circleFields':         return presetCircleFields;
        case 'circleFields2':        return presetCircleFields2;
        case 'wobbles':              return presetWobbles;
        case 'randomAbstract':       return presetRandomAbstract;
        case 'afterTheStorm':        return presetAfterTheStorm;
        case 'sunsetDreams':         return presetSunsetDreams;
        case 'polarizedLights':      return presetPolarizedLights;
        case 'linesOfFire':          return presetLinesOfFire;
        case 'clouds':               return presetClouds;
        case 'twistedTower':         return presetTwistedTower;
        case 'brushStrokes':         return presetBrushStrokes;
        case 'gradientCircles':      return presetGradientCircles;
        case 'hotSpring':            return presetHotSpring;
    }
}