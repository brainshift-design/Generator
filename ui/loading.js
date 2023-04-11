var loadRestartTimeout = null;



function initLoadingOverlay()
{
    btnLoadingRestart .style.display = 'none';
    btnLoadingRestart.addEventListener('click', () => uiRestartGenerator(true));
}