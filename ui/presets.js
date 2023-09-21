var currentPresetTab = 0;


function initPresets()
{
    if (isMac)
    {
        const _ctrlShift = document.getElementsByClassName('ctrlShift');
        const  ctrlShift = Array.prototype.slice.call(_ctrlShift);
    
        const ctrlKeys  = ctrlShift.filter(k => k.innerHTML == 'Ctrl' );
        const shiftKeys = ctrlShift.filter(k => k.innerHTML == 'Shift');

        ctrlKeys .forEach(k => k.innerHTML = 'Shift');
        shiftKeys.forEach(k => k.innerHTML = 'Ctrl' );


        document.getElementsByClassName('treeLeftCtrl'  )[0].innerHTML = 'Alt';

        document.getElementsByClassName('newBranch1'    )[0].innerHTML = 'Alt';
        document.getElementsByClassName('newBranch2'    )[0].innerHTML = 'Ctrl';
        
        document.getElementsByClassName('treeRightCtrl1')[0].innerHTML = 'Shift';
        document.getElementsByClassName('treeRightCtrl2')[0].innerHTML = 'Ctrl';
        
        document.getElementsByClassName('treeAcross1'   )[0].innerHTML = 'Alt';
        document.getElementsByClassName('treeAcross2'   )[0].innerHTML = 'Ctrl';
    }


    const keys = document.getElementsByClassName('shortcutKey');

    for (const key of keys)
    {
             if (key.innerHTML == 'Ctrl' ) key.innerHTML = osCtrl (false);
        else if (key.innerHTML == 'Shift') key.innerHTML = osShift(false);
        else if (key.innerHTML == 'Alt'  ) key.innerHTML = osAlt  (false);
    }
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
        case 'basics':    return presetNodeBasics;
        case 'dataTypes': return presetDataTypes;
        case 'organize':  return presetOrganize;
        case 'active':    return presetActive;
        case 'shapes':    return presetShapes;
        case 'transform': return presetTransform;
    }
}