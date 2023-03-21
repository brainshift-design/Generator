function updateZoomTooltip()
{
    if (graphView.zoom < settings.minZoomForParams)
    {
        ttMinValueZoom.innerHTML =
              '<p style="margin-top: 1px; width: 100%; text-align: center;">Zoom/view options</p>'
            + '<p style="margin-top: 1.25em">'
            + '    A node outline around the zoom<br/>'
            + '    means that value controls are too<br/>'
            + '    small and cannot be adjusted.'
            + '</p>'
            + '<p style="margin-top: 1.25em">Instead the whole node is moved.</p>'

        ttMinValueZoom.style.width  = '176px';
        ttMinValueZoom.style.height = '102px';
    }
    else
    {
        ttMinValueZoom.innerHTML = 'Zoom/view options';

        ttMinValueZoom.style.width  = 'auto';
        ttMinValueZoom.style.height = '15px';
    }
}