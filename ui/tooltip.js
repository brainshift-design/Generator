var tooltipTimer         = null;
var tooltipOutTimer      = null;

var inTooltip            = null;


var currentTooltipSource = null;
var currentTooltip       = null;

    

function createTooltipSrc(source, ref, getTooltip, delay = 1000, canShow = null)
{
    source.addEventListener('pointerenter', () =>
    {
        if (tooltipTimer) 
            clearTimeout(tooltipTimer);


        if (   !tooltipTimer
            //&&  graph.currentPage.zoom >= settings.minZoomForParams
            && !graphView.soloMode
            && (!canShow || canShow()))
        {
            tooltipTimer = setTimeout(() =>
            {
                const tooltip = getTooltip();

                if (tooltip) 
                    showTooltip(ref, tooltip);

                tooltipTimer = null;
            }, 
               currentTooltip
            &&    currentTooltip != getTooltip()
               //|| currentTooltipSource != source
                ? 0 
                : delay);
        }
    });
      
    
    source.addEventListener('pointerleave', () =>
    {
        if (tooltipTimer)
        {
            clearTimeout(tooltipTimer);
            tooltipTimer = null;
        }
    
        
        if (tooltipOutTimer)
            clearTimeout(tooltipOutTimer);
        
    
        tooltipOutTimer = setTimeout(() => 
        {
            if (currentTooltip) 
                hideTooltip(currentTooltip);
    
            currentTooltipSource = null;
            tooltipOutTimer      = null;
        }, 
        400);
    });
}



function createTooltip(tooltip)
{
    tooltip.trap = false;
    

    tooltip.addEventListener('pointerenter', () => inTooltip = tooltip);
    tooltip.addEventListener('pointerleave', () => inTooltip = null   );


    hideTooltip(tooltip);
}



function createTooltipPointerTrap(tooltip)
{
    tooltip.addEventListener('pointerenter', e =>
    {
        //if (tooltipOutTimer)
        //{
            clearTimeout(tooltipOutTimer);
            tooltipOutTimer = null;
        //}
    });

    
    tooltip.addEventListener('pointerleave', e =>
    {
        // if (!tooltipOutTimer)
        //     hideTooltip(tooltip);

        if (tooltipTimer)
        {
            clearTimeout(tooltipTimer);
            tooltipTimer = null;
        }


        tooltipOutTimer = setTimeout(() => 
        {
            if (currentTooltip) 
                hideTooltip(currentTooltip);

            currentTooltipSource = null;
            tooltipOutTimer      = null;
        }, 
        400);
    });
}



function showTooltip(source, tooltip)
{
    if (!isEmpty(currentMenus))
        return;

        
    if (   currentTooltip
        && currentTooltip != tooltip)
        hideTooltip(currentTooltip);


    tooltip.source = source;
    
    
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

    
    const graphHeight = graphView.div.offsetHeight - getTopHeight();


    let top = srcRect.y;

    if (srcRect.y + tooltip.offsetHeight > graphView.div.offsetHeight-8)
        top = getTopHeight() + Math.max(8, graphHeight - tooltip.offsetHeight);
        
    tooltip.style.top = top + srcRect.height + tooltipArrow.offsetHeight - 3;
    
    
    const ttRect = tooltip.getBoundingClientRect();

    
    if (ttRect.bottom > getTopHeight() + graphView.div.offsetHeight - 8)
    {
        let y = srcRect.y;

        tooltipArrow.style.borderColor = '#1e1e1e transparent transparent transparent';
        tooltipArrow.style.top         = y;

        tooltip.style.top = y - ttRect.height + 1;
    }
    else
    {
        tooltipArrow.style.borderColor = 'transparent transparent #1e1e1e transparent';
        tooltipArrow.style.top         = ttRect.y - tooltipArrow.offsetHeight + 1;
    }


    // const graphHeight = graphView.div.offsetHeight - getTopHeight();

    // if (top + tooltip.offsetHeight > graphView.div.offsetHeight-8)
    //     top = getTopHeight() + Math.max(8, graphHeight - tooltip.offsetHeight);

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