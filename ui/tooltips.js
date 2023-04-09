function updateZoomTooltip()
{
    if (graphView.zoom < settings.minZoomForParams)
    {
        ttMinValueZoom.innerHTML =
              '<p style="margin-top: 1px; width: 100%; text-align: center; position: relative; left: -2px;">Zoom/view options</p>'
            + '<p style="margin-top: 1.25em">'
            + '    An outline around the zoom means<br/>'
            + '    that value controls are too small<br/>'
            + '    to be adjusted and the whole node<br/>'
            + '    is moved instead.'
            + '</p>'
            + '<p style="margin-top: 1.25em">The threshold can be set in the<br/>preferences menu.</p>';

        ttMinValueZoom.style.height = '130px';
    }
    else
    {
        ttMinValueZoom.innerHTML = 'Zoom/view options';
        ttMinValueZoom.style.height = '15px';
    }
}


// function initPermanentTooltip(tooltip)
// {
//     tooltip.addEventListener('pointerenter', e =>
//     {
//         e.preventDefault();
//         e.stopImmediatePropagation();

//         clearTimeout(tooltipOutTimer);
//         tooltipOutTimer = null;
//     });
    
    
    
//     tooltip.addEventListener('pointerleave', e =>
//     {
//         e.preventDefault();
//         e.stopImmediatePropagation();

//         if (!tooltipOutTimer)
//             hideTooltip(tooltip);
//     });
// }



function initTextTooltip(str)
{
    ttTextString.innerHTML = str;
}



createTooltip(ttText);
createTooltip(ttWcag2);
createTooltip(ttWcag3);
createTooltip(ttInterpolationSpace);
createTooltip(ttColorblind);

//createTooltipPointerTrap(ttText);
createTooltipPointerTrap(ttWcag2);
createTooltipPointerTrap(ttWcag3);
createTooltipPointerTrap(ttInterpolationSpace);
createTooltipPointerTrap(ttColorblind);
