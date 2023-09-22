var currentKeyboardTab = 0;


function initKeyboardPanel()
{
    if (isMac)
    {
        const _ctrlShift = document.getElementsByClassName('ctrlShift');
        const  ctrlShift = Array.prototype.slice.call(_ctrlShift);
    
        const ctrlKeys  = ctrlShift.filter(k => k.innerHTML == 'Ctrl' );
        const shiftKeys = ctrlShift.filter(k => k.innerHTML == 'Shift');

        ctrlKeys .forEach(k => k.innerHTML = 'Shift');
        shiftKeys.forEach(k => k.innerHTML = 'Ctrl' );

        document.getElementsByClassName('newBranch1')[0].innerHTML = 'Alt';
        document.getElementsByClassName('newBranch2')[0].innerHTML = 'Ctrl';
    }


    const keys = document.getElementsByClassName('shortcutKey');

    for (const key of keys)
    {
             if (key.innerHTML == 'Ctrl' ) key.innerHTML = osCtrl (false);
        else if (key.innerHTML == 'Shift') key.innerHTML = osShift(false);
        else if (key.innerHTML == 'Alt'  ) key.innerHTML = osAlt  (false);
    }
}



function showKeyboardPanel()
{
    setCurrentKeyboardTab(0);

    presets.style.display = 'none';

    keyboardPanel.style.display = 
        keyboardPanel.style.display != 'block'
        ? 'block'
        : 'none';
}



function hideKeyboardPanel()
{
    keyboardPanel.style.display = 'none';
}



function setCurrentKeyboardTab(tab)
{
    currentKeyboardTab = tab;

    for (let i = 0; i < keyboardPanelTabs.children.length; i++)
    {
        keyboardPanelTabs.children[i].style.background = i == currentKeyboardTab ? '#1E1E1E' : 'none';
        keyboardPanelTabs.children[i].style.boxShadow  = i == currentKeyboardTab ? '0 0 0 0.5px #ffffff2b' : 'none';

        keyboardPanelContent.children[i].style.display = i == currentKeyboardTab ? 'flex' : 'none';
    }
}