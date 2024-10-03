function updateZoomTooltip()
{
    if (graph.currentPage.zoom < settings.minZoomForParams)
    {
        ttMinValueZoom.innerHTML =
              '<p style="margin-top: 5px; width: 100%; text-align: center; position: relative; left: -2px;">Zoom/view options</p>'
            + '<p style="margin-top: 1.25em">'
            + '    Solid white behind the zoom value<br/>'
            + '    means values are too small to adjust<br/>'
            + '    and nodes can only be moved.'
            + '</p>'
            + '<p style="margin-top: 1.25em">The threshold can be changed in the preferences menu.</p>';

        ttMinValueZoom.style.width  = '195px';
        ttMinValueZoom.style.height = '125px';
    }
    else
    {
        ttMinValueZoom.innerHTML = 'Zoom/view options';
        ttMinValueZoom.style.width  = '100px';
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
createTooltip(ttValidateMethod);
createTooltip(ttColorblind);
createTooltip(ttColorNames);

//createTooltipPointerTrap(ttText);
createTooltipPointerTrap(ttWcag2);
createTooltipPointerTrap(ttWcag3);
createTooltipPointerTrap(ttInterpolationSpace);
createTooltipPointerTrap(ttValidateMethod);
createTooltipPointerTrap(ttColorblind);
createTooltipPointerTrap(ttColorNames);
createTooltipPointerTrap(ttAscii);
