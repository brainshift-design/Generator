var tooltipTimer, 
    tooltipInTimer,
    tooltipOutTimer, 
    tooltipLeaveTimer;

var currentTooltipSource = null;
var currentTooltip       = null;

    

function createTooltipSrc(source, ref, getTooltip, bottomArrow = false)
{
    source.addEventListener('pointerenter', () =>
    {
        clearTimeout(tooltipInTimer);
        clearTimeout(tooltipLeaveTimer);
    
        if (!tooltipTimer)
        {
            tooltipTimer = setTimeout(() =>
            {
                const tooltip = getTooltip();
                if (tooltip) showTooltip(ref, tooltip, bottomArrow);

                clearTimeout(tooltipTimer);
                tooltipTimer = null;
            }, 
            currentTooltip ? 0 : 1000);
        }
    });
      
    
    source.addEventListener('pointerleave', () =>
    {
        clearTimeout(tooltipTimer);
        currentTooltipSource = null;

        tooltipOutTimer = setTimeout(() => 
        {
            const tooltip = getTooltip();
            if (tooltip) hideTooltip(tooltip);
        }, 
        400);
    });
}



function createTooltip(tooltip)
{
    tooltip.addEventListener('pointerenter', () =>
    {
        clearTimeout(tooltipOutTimer);
        tooltipOutTimer = null;
    });
    
    
    tooltip.addEventListener('pointerleave', () =>
    {
        hideTooltip(tooltip);
    });


    hideTooltip(tooltip);
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
        graphView.offsetWidth - tooltip.offsetWidth - margin);

    tooltipArrow.style.left = srcRect.x + srcRect.width/2;// - tooltipArrow.offsetWidth/2;

    
    if (bottomArrow)
    {
        const ttRect = tooltip.getBoundingClientRect();

        tooltip.style.top = srcRect.y - tooltipArrow.offsetHeight - ttRect.height;

        tooltipArrow.style.borderColor = '#040404 transparent transparent transparent';
        tooltipArrow.style.top         = srcRect.y - tooltipArrow.offsetHeight;
    }
    else
    {
        tooltip.style.top = srcRect.y + srcRect.height + tooltipArrow.offsetHeight;

        const ttRect = tooltip.getBoundingClientRect();

        tooltipArrow.style.borderColor = 'transparent transparent #040404 transparent';
        tooltipArrow.style.top         = ttRect.y - tooltipArrow.offsetHeight;
    }


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