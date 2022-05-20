scrollbarX.moving = false;
scrollbarY.moving = false;



graphView.updateScrollWithBounds = () =>
{
    const bounds = graphView.getAllNodeBounds();

    graphView.updateScroll(
        graphView.clientLeft,
        graphView.clientWidth,
        graphView.clientHeight,
        bounds,
        controlBar.offsetHeight);
};



graphView.updateScroll = (x, w, h, bounds, yOffset) =>
{
    graphView.updateScrollX(   w, h, bounds);
    graphView.updateScrollY(x, w, h, bounds, yOffset);

    scrollbarX.style.zIndex = MAX_INT32-1;
    scrollbarY.style.zIndex = MAX_INT32-2;
};



/////////////////////////////////////////////////////////////////////////////////////



graphView.updateScrollX = (w, h, bounds) =>
{
    if (   bounds.l < 0
        && bounds.r >= w)
    {
        const width = sqr(w) / bounds.width - (smallScrollGap + largeScrollGap);

        scrollbarX.style.display = 'inline-block';
        scrollbarX.style.width   =  width;
        scrollbarX.style.left    =  smallScrollGap + (w - smallScrollGap - largeScrollGap - width) * -bounds.l / (-bounds.l + bounds.r - w);
        scrollbarX.style.top     =  h - smallScrollGap - 6;
    }
    else if (bounds.l < 0)
    {
        const width = sqr(w) / (w - bounds.l) - (smallScrollGap + largeScrollGap);

        scrollbarX.style.display = 'inline-block';
        scrollbarX.style.width   =  width;
        scrollbarX.style.left    =  w - largeScrollGap - width;
        scrollbarX.style.top     =  h - smallScrollGap - 6;
    }
    else if (bounds.r >= w)
    {
        const width = sqr(w) / bounds.r - (smallScrollGap + largeScrollGap);

        scrollbarX.style.display = 'inline-block';
        scrollbarX.style.width   =  width;
        scrollbarX.style.left    =  smallScrollGap;
        scrollbarX.style.top     =  h - smallScrollGap - 6;
    }
    else
        scrollbarX.style.display = 'none';
};



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
            bounds = expandRect(bounds, boundingRect(node.div));

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

        graphView.pan = point(
            graphView.panStart.x - (e.clientX - scrollbarX.pStart) / scrollbarX.wStart * graphView.clientWidth,
            graphView.panStart.y);
    }
});



/////////////////////////////////////////////////////////////////////////////////////



graphView.updateScrollY = (x, w, h, bounds, yOffset) =>
{
    if (   bounds.t <  yOffset
        && bounds.b >= h + yOffset)
    {
        const height = sqr(h) / bounds.height - (smallScrollGap + largeScrollGap);

        scrollbarY.style.display = 'inline-block';
        scrollbarY.style.height  =  height;
        scrollbarY.style.top     =  smallScrollGap + (h - height + smallScrollGap) * (yOffset - bounds.t) / (yOffset - bounds.t + bounds.b - h);
        scrollbarY.style.left    =  x + w - smallScrollGap - 6;
    }
    else if (bounds.t < yOffset)
    {
        const height = sqr(h) / (h - (bounds.t - yOffset)) - (smallScrollGap + largeScrollGap);

        scrollbarY.style.display = 'inline-block';
        scrollbarY.style.height  = height;
        scrollbarY.style.top     = h - largeScrollGap - height;
        scrollbarY.style.left    = x + w - smallScrollGap - 6;
    }
    else if (bounds.b >= h + yOffset)
    {
        const height = sqr(h) / (bounds.b - yOffset) - (smallScrollGap + largeScrollGap);

        scrollbarY.style.display = 'inline-block';
        scrollbarY.style.height  = height;
        scrollbarY.style.top     = smallScrollGap;
        scrollbarY.style.left    = x + w - smallScrollGap - 6;
    }
    else
        scrollbarY.style.display = 'none';
};



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
            bounds = expandRect(bounds, boundingRect(node.div));

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

        graphView.pan = point(
            graphView.panStart.x, 
            graphView.panStart.y - (e.clientY - scrollbarY.pStart) / scrollbarY.hStart * graphView.clientHeight);
    }
});