var loadRestartTimer = -1;



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
    if (loadRestartTimer > -1) 
        clearTimeout(loadRestartTimer);

    loadRestartTimer = setTimeout(() => 
    {
        btnLoadingRestart.style.display = 'inline-block';
        loadRestartTimer = -1;
    }, 
    5000);
}