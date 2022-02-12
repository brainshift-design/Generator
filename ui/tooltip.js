var tooltipTimer, 
    tooltipInTimer,
    tooltipOutTimer, 
    tooltipLeaveTimer;

    

function createTooltip(source, tooltip, bottomArrow = false)
{
    source.addEventListener('pointerenter', () =>
    {
        clearTimeout(tooltipInTimer);
        clearTimeout(tooltipLeaveTimer);
    
        if (!tooltipTimer)
        {
            tooltipTimer = setTimeout(function()
            {
                showTooltip(source, tooltip, bottomArrow);

                clearTimeout(tooltipTimer);
                tooltipTimer = null;
            }, 
            1000);
        }
    });
    
  
    
    source.addEventListener('pointerleave', () =>
    {
        clearTimeout(tooltipTimer);
        tooltipOutTimer = setTimeout(() => hideTooltip(tooltip), 400);
    });



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
    tooltip.style.display      = 'block';
    tooltip.style.opacity      = '100%';

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
}



function hideTooltip(tooltip)
{
    tooltip.style.display      = 'none';
    tooltip.style.opacity      = '0%';

    tooltipArrow.style.display = 'none';
    tooltipArrow.style.opacity = '0%';

    clearTimeout(tooltipTimer);

    tooltipTimer               = null;
    shownTooltip               = null;
}