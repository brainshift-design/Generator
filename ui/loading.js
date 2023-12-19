var loadRestartTimer = null;



function initLoadingOverlay()
{
    btnLoadingRestart.style.display = 'none';
    btnLoadingRestart.addEventListener('click', () => uiRestartGenerator(true));
    
    loadingOverlay.addEventListener('keydown', e => 
    {
        if (e.key == 'Escape')
        {
            uiDeactivateAllNodes();
            //finishLoading(null);
        }
    });
}



function restartLoadingTimer()
{
    if (loadRestartTimer) 
        clearTimeout(loadRestartTimer);

    loadRestartTimer = setTimeout(() => 
    {
        btnLoadingRestart.style.display = 'inline-block';
        loadRestartTimer = null;
    }, 
    5000);
}