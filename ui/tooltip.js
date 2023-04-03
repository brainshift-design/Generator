var tooltipTimer;
var tooltipOutTimer;

var inTooltip = null;


var currentTooltipSource = null;
var currentTooltip       = null;

    

function createTooltipSrc(source, ref, getTooltip, bottomArrow = false)
{
    source.addEventListener('pointerenter', () =>
    {
        //tooltip_pointerLeave(currentTooltip);


        if (tooltipOutTimer) 
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
                    showTooltip(ref, tooltip, bottomArrow);

                tooltipTimer = null;
            }, 
            currentTooltip ? 0 : 1000);
        }
        else
            tooltipTimer = null;
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



function showTooltip(source, tooltip, bottomArrow)
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

    if (bottomArrow)
    {
        const ttRect = tooltip.getBoundingClientRect();

        let top = srcRect.y;

        if (srcRect.y + tooltip.offsetHeight > graphView.div.offsetHeight-8)
            top = menuBarHeight + Math.max(8, graphHeight - tooltip.offsetHeight);

        tooltip.style.top = top - tooltipArrow.offsetHeight - ttRect.height;

        tooltipArrow.style.borderColor = '#1e1e1e transparent transparent transparent';
        tooltipArrow.style.top         = srcRect.y - tooltipArrow.offsetHeight;
    }
    else
    {
        let top = srcRect.y;

        if (srcRect.y + tooltip.offsetHeight > graphView.div.offsetHeight-8)
            top = menuBarHeight + Math.max(8, graphHeight - tooltip.offsetHeight);

        tooltip.style.top = top + srcRect.height + tooltipArrow.offsetHeight - 3;

        
        const ttRect = tooltip.getBoundingClientRect();

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