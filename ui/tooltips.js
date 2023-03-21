function updateZoomTooltip()
{
    if (graphView.zoom < settings.minZoomForParams)
    {
        ttMinValueZoom.innerHTML =
              '<p style="margin-top: 1px; width: 100%; text-align: center; position: relative; left: -2px;">Zoom/view options</p>'
            + '<p style="margin-top: 1.25em">'
            + '    An outline around the zoom means<br/>'
            + '    that value controls are too small<br/>'
            + '    and cannot be adjusted.'
            + '</p>'
            + '<p style="margin-top: 1.25em">Instead the whole node is moved.</p>'

        ttMinValueZoom.style.height = '102px';
    }
    else
    {
        ttMinValueZoom.innerHTML = 'Zoom/view options';
        ttMinValueZoom.style.height = '15px';
    }
}