var tooltipTimer;
var tooltipOutTimer;

var inTooltip = null;


var currentTooltipSource = null;
var currentTooltip       = null;

    

function createTooltipSrc(source, ref, getTooltip)
{
    source.addEventListener('pointerenter', () =>
    {
        if (   tooltipOutTimer
            && getTooltip()) 
        {
            clearTimeout(tooltipOutTimer);
            tooltipOutTimer = null;
        }


        if (tooltipTimer) 
            clearTimeout(tooltipTimer);


        if (!tooltipTimer)
        {
            tooltipTimer = setTimeout(() =>
            {
                const tooltip = getTooltip();

                if (tooltip) 
                    showTooltip(ref, tooltip);

                tooltipTimer = null;
            }, 
            currentTooltip ? 0 : 1000);
        }
    });
      
    
    source.addEventListener('pointerleave', () =>
    {
        tooltip_pointerLeave(getTooltip());
    });
}



function createTooltip(tooltip)
{
    tooltip.addEventListener('pointerenter', () =>
    {
        inTooltip = tooltip;
    });
    
    
    tooltip.addEventListener('pointerleave', () =>
    {
        inTooltip = null;
    });


    hideTooltip(tooltip);
}



function createTooltipPointerTrap(tooltip)
{
    tooltip.addEventListener('pointerenter', e =>
    {
        if (tooltipOutTimer)
        {
            clearTimeout(tooltipOutTimer);
            tooltipOutTimer = null;
        }
    });

    
    tooltip.addEventListener('pointerleave', e =>
    {
        if (!tooltipOutTimer)
            hideTooltip(tooltip);

        tooltip_pointerLeave(currentTooltip);
    });
}



function tooltip_pointerLeave(tooltip)
{
    if (tooltipTimer)
    {
        clearTimeout(tooltipTimer);
        tooltipTimer = null;
    }


    tooltipOutTimer = setTimeout(() => 
    {
        if (tooltip) 
            hideTooltip(tooltip);

        currentTooltip       = null;
        currentTooltipSource = null;

        tooltipOutTimer      = null;
    }, 
    400);
}



function showTooltip(source, tooltip)
{
    if (!isEmpty(currentMenus))
        return;

    if (currentTooltip)
        hideTooltip(currentTooltip);


    tooltip     .style.display = 'block';
    tooltip     .style.opacity = '100%';

    tooltipArrow.style.display = 'block';
    tooltipArrow.style.opacity = '100%';

    let srcRect = source.getBoundingClientRect();

    srcRect.y -= 5;


    const margin = 10;
 
    tooltip.style.left = Math.min(Math.max(
        margin, 
        srcRect.x + srcRect.width/2 - tooltip.offsetWidth/2), 
        graphView.div.offsetWidth - tooltip.offsetWidth - margin);

    tooltipArrow.style.left = srcRect.x + srcRect.width/2;// - tooltipArrow.offsetWidth/2;

    
    const graphHeight = graphView.div.offsetHeight - menuBarHeight;


    let top = srcRect.y;

    if (srcRect.y + tooltip.offsetHeight > graphView.div.offsetHeight-8)
        top = menuBarHeight + Math.max(8, graphHeight - tooltip.offsetHeight);
        
    tooltip.style.top = top + srcRect.height + tooltipArrow.offsetHeight - 3;
    
    
    const ttRect = tooltip.getBoundingClientRect();

    
    if (ttRect.bottom > graphView.div.offsetHeight + menuBarHeight - 8)
    {
        tooltipArrow.style.borderColor = '#1e1e1e transparent transparent transparent';
        tooltipArrow.style.top         = srcRect.y;

        tooltip.style.top = srcRect.y - ttRect.height + 1;
    }
    else
    {
        tooltipArrow.style.borderColor = 'transparent transparent #1e1e1e transparent';
        tooltipArrow.style.top         = ttRect.y - tooltipArrow.offsetHeight + 1;
    }


    // const graphHeight = graphView.div.offsetHeight - menuBarHeight;

    // if (top + tooltip.offsetHeight > graphView.div.offsetHeight-8)
    //     top = menuBarHeight + Math.max(8, graphHeight - tooltip.offsetHeight);

    // tooltip.style.top = top;

    
    currentTooltip = tooltip;
}



function hideTooltip(tooltip)
{
    tooltip     .style.display = 'none';
    tooltip     .style.opacity = '0%';

    tooltipArrow.style.display = 'none';
    tooltipArrow.style.opacity = '0%';

    clearTimeout(tooltipTimer);
    clearTimeout(tooltipOutTimer);

    tooltipTimer   = null;
    currentTooltip = null;
}