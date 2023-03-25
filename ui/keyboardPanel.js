var currentKeyboardTab = 0;


function showKeyboardPanel()
{
    setCurrentKeyboardTab(0);
    keyboardPanel.style.display = 'block';
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