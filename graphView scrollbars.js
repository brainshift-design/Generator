graphView.updateScrollX = bounds =>
{
    if (bounds.l < 0)
    {
        const widthX = sqr(graphView.clientWidth) / (graphView.clientWidth - bounds.l) - (smallScrollGap + largeScrollGap);

        scrollbarX.style.display = 'inline-block';
        scrollbarX.style.width   = widthX;
        scrollbarX.style.left    = graphView.clientWidth - largeScrollGap - widthX;
        scrollbarX.style.top     = graphView.offsetTop + graphView.clientHeight - smallScrollGap - 6;
    }
    else if (bounds.r >= graphView.clientWidth)
    {
        scrollbarX.style.display = 'inline-block';
        scrollbarX.style.width   = sqr(graphView.clientWidth) / bounds.r - (smallScrollGap + largeScrollGap);
        scrollbarX.style.left    = smallScrollGap;
        scrollbarX.style.top     = graphView.offsetTop + graphView.clientHeight - smallScrollGap - 6;
    }
    else
    {
        scrollbarX.style.display = 'none';
    }
};


scrollbarX.moving = false;

scrollbarX.addEventListener('pointerdown', e =>
{
    if (e.button == 0)
    {
        scrollbarX.moving = true;
        scrollbarX.xStart = scrollbarX.offsetLeft;
        scrollbarX.wStart = scrollbarX.offsetWidth;
        scrollbarX.pStart = e.clientX;
        scrollbarX.setPointerCapture(e.pointerId);

        graphView.panStart = graphView.pan;

        for (const node of graph.nodes)
            node.div.slx = node.div.offsetLeft;
    }
});

scrollbarX.addEventListener('pointerup', e =>
{
    if (   e.button == 0
        && scrollbarX.moving)
    {
        scrollbarX.moving = false;
        scrollbarX.releasePointerCapture(e.pointerId);

        var bounds = Rect.NaN;

        for (const node of graph.nodes)
            bounds.expandFromRect(Rect.fromTypical(node.div.getBoundingClientRect()));

        if (bounds.l >= 0 && bounds.r < graphView.clientWidth)
            scrollbarX.style.display = 'none';
    }
});

scrollbarX.addEventListener('pointermove', e =>
{
    if (scrollbarX.moving)
    {
        var x = scrollbarX.xStart + e.clientX - scrollbarX.pStart;

        var l = x;
        var r = l + scrollbarX.wStart;

        l = Math.max(smallScrollGap, l);
        r = Math.min(r, graphView.clientWidth - largeScrollGap);

        l = Math.max(smallScrollGap, Math.min(l, r - smallScrollGap));
        r = Math.max(l + smallScrollGap, r);

        scrollbarX.style.left  = l;
        scrollbarX.style.width = r-l;

        graphView.pan = {
            x: graphView.panStart.x - (e.clientX - scrollbarX.pStart) / scrollbarX.wStart * graphView.clientWidth,
            y: graphView.panStart.y 
        };
    }
});



graphView.updateScrollY = bounds =>
{
    if (bounds.t < 0)
    {
        const heightY = sqr(graphView.clientHeight) / (graphView.clientHeight - bounds.t) - (smallScrollGap + largeScrollGap);

        scrollbarY.style.display = 'inline-block';
        scrollbarY.style.height  = heightY;
        scrollbarY.style.left    = graphView.offsetLeft + graphView.clientWidth - smallScrollGap - 6;
        scrollbarY.style.top     = graphView.clientHeight - largeScrollGap - heightY;
    }
    else if (bounds.b >= graphView.clientHeight)
    {
        scrollbarY.style.display = 'inline-block';
        scrollbarY.style.height  = sqr(graphView.clientHeight) / bounds.b - (smallScrollGap + largeScrollGap);
        scrollbarY.style.left    = graphView.offsetLeft + graphView.clientWidth - smallScrollGap - 6;
        scrollbarY.style.top     = smallScrollGap;
    }
    else
    {
        scrollbarY.style.display = 'none';
    }
};


scrollbarY.moving = false;

scrollbarY.addEventListener('pointerdown', e =>
{
    if (e.button == 0)
    {
        scrollbarY.moving = true;
        scrollbarY.yStart = scrollbarY.offsetTop;
        scrollbarY.hStart = scrollbarY.offsetHeight;
        scrollbarY.pStart = e.clientY;
        scrollbarY.setPointerCapture(e.pointerId);

        for (const node of graph.nodes)
            node.div.sly = node.div.offsetTop;

        graphView.panStart = graphView.pan;
    }
});

scrollbarY.addEventListener('pointerup', e =>
{
    if (   e.button == 0
        && scrollbarY.moving)
    {
        scrollbarY.moving = false;
        scrollbarY.releasePointerCapture(e.pointerId);

        var bounds = Rect.NaN;

        for (const node of graph.nodes)
            bounds.expandFromRect(Rect.fromTypical(node.div.getBoundingClientRect()));

        if (bounds.t >= 0 && bounds.b < graphView.clientHeight)
            scrollbarY.style.display = 'none';
    }
});

scrollbarY.addEventListener('pointermove', e =>
{
    if (scrollbarY.moving)
    {
        var y = scrollbarY.yStart + e.clientY - scrollbarY.pStart;

        var t = y;
        var b = t + scrollbarY.hStart;

        t = Math.max(smallScrollGap, t);
        b = Math.min(b, graphView.clientHeight - largeScrollGap);

        t = Math.max(smallScrollGap, Math.min(t, b - smallScrollGap));
        b = Math.max(t + smallScrollGap, b);

        scrollbarY.style.top    = t;
        scrollbarY.style.height = b-t;
    }
});