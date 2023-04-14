GraphView.prototype.updateScrollWithBounds = function()
{
    const bounds = this.getAllNodeBounds();

    this.updateScroll(
        this.div.clientLeft,
        this.div.clientWidth,
        this.div.clientHeight,
        bounds,
        getTopHeight());
};



GraphView.prototype.updateScroll = function(x, w, h, bounds, yOffset)
{
    this.updateScrollX(   w, h, bounds);
    this.updateScrollY(x, w, h, bounds, yOffset);

    this.scrollbarX.style.zIndex = MAX_INT32-1;
    this.scrollbarY.style.zIndex = MAX_INT32-2;
};



GraphView.prototype.updateScrollX = function(w, h, bounds)
{
    if (   bounds.l < 0
        && bounds.r >= w)
    {
        const width = sqr(w) / bounds.width - (smallScrollGap + largeScrollGap);

        this.scrollbarX.style.display = 'inline-block';
        this.scrollbarX.style.width   =  width;
        this.scrollbarX.style.left    =  smallScrollGap + (w - smallScrollGap - largeScrollGap - width) * -bounds.l / (-bounds.l + bounds.r - w);
        this.scrollbarX.style.top     =  h - smallScrollGap - 6;
    }
    else if (bounds.l < 0)
    {
        const width = sqr(w) / (w - bounds.l) - (smallScrollGap + largeScrollGap);

        this.scrollbarX.style.display = 'inline-block';
        this.scrollbarX.style.width   =  width;
        this.scrollbarX.style.left    =  w - largeScrollGap - width;
        this.scrollbarX.style.top     =  h - smallScrollGap - 6;
    }
    else if (bounds.r >= w)
    {
        const width = sqr(w) / bounds.r - (smallScrollGap + largeScrollGap);

        this.scrollbarX.style.display = 'inline-block';
        this.scrollbarX.style.width   =  width;
        this.scrollbarX.style.left    =  smallScrollGap;
        this.scrollbarX.style.top     =  h - smallScrollGap - 6;
    }
    else
        this.scrollbarX.style.display = 'none';
};



GraphView.prototype.updateScrollY = function(x, w, h, bounds, yOffset)
{
    if (   bounds.t <  yOffset
        && bounds.b >= h + yOffset)
    {
        const height = sqr(h) / bounds.height - (smallScrollGap + largeScrollGap);

        this.scrollbarY.style.display = 'inline-block';
        this.scrollbarY.style.height  =  height;
        this.scrollbarY.style.top     =  smallScrollGap + (h - height + smallScrollGap) * (yOffset - bounds.t) / (yOffset - bounds.t + bounds.b - h);
        this.scrollbarY.style.left    =  x + w - smallScrollGap - 6;
    }
    else if (bounds.t < yOffset)
    {
        const height = sqr(h) / (h - (bounds.t - yOffset)) - (smallScrollGap + largeScrollGap);

        this.scrollbarY.style.display = 'inline-block';
        this.scrollbarY.style.height  = height;
        this.scrollbarY.style.top     = h - largeScrollGap - height;
        this.scrollbarY.style.left    = x + w - smallScrollGap - 6;
    }
    else if (bounds.b >= h + yOffset)
    {
        const height = sqr(h) / (bounds.b - yOffset) - (smallScrollGap + largeScrollGap);

        this.scrollbarY.style.display = 'inline-block';
        this.scrollbarY.style.height  = height;
        this.scrollbarY.style.top     = smallScrollGap;
        this.scrollbarY.style.left    = x + w - smallScrollGap - 6;
    }
    else
        this.scrollbarY.style.display = 'none';
};



GraphView.prototype.createScrollbarMethods = function()
{
    this.scrollbarX.addEventListener('pointerdown', e =>
    {
        if (e.button == 0)
        {
            this.scrollbarX.moving = true;
            this.scrollbarX.xStart = this.scrollbarX.offsetLeft;
            this.scrollbarX.wStart = this.scrollbarX.offsetWidth;
            this.scrollbarX.pStart = e.clientX;
            this.scrollbarX.setPointerCapture(e.pointerId);

            this.panStart = graph.currentPage.pan;

            for (const node of graph.pageNodes)
                node.slx = node.div.offsetLeft;
        }
    });



    this.scrollbarX.addEventListener('pointerup', e =>
    {
        if (   e.button == 0
            && this.scrollbarX.moving)
        {
            this.scrollbarX.moving = false;
            this.scrollbarX.releasePointerCapture(e.pointerId);

            let bounds = Rect.NaN;

            for (const node of graph.pageNodes)
                bounds = expandRect(bounds, boundingRect(node.div));

            if (bounds.l >= 0 && bounds.r < this.clientWidth)
                this.scrollbarX.style.display = 'none';
        }
    });



    this.scrollbarX.addEventListener('pointermove', e =>
    {
        if (this.scrollbarX.moving)
        {
            const x = this.scrollbarX.xStart + e.clientX - this.scrollbarX.pStart;

            let l = x;
            let r = l + this.scrollbarX.wStart;
 
            l = Math.max(smallScrollGap, l);
            r = Math.min(r, this.div.clientWidth - largeScrollGap);
 
            l = Math.max(smallScrollGap, Math.min(l, r - smallScrollGap));
            r = Math.max(l + smallScrollGap, r);
 
            this.scrollbarX.style.left  = l;
            this.scrollbarX.style.width = r-l;

            graph.currentPage.pan = point(
                this.panStart.x - (e.clientX - this.scrollbarX.pStart) / this.scrollbarX.wStart * this.div.clientWidth,
                this.panStart.y);
        }
    });



    /////////////////////////////////////////////////////////////////////////////////////



    this.scrollbarY.addEventListener('pointerdown', e =>
    {
        if (e.button == 0)
        {
            this.scrollbarY.moving = true;
            this.scrollbarY.yStart = this.scrollbarY.offsetTop;
            this.scrollbarY.hStart = this.scrollbarY.offsetHeight;
            this.scrollbarY.pStart = e.clientY;
            this.scrollbarY.setPointerCapture(e.pointerId);

            for (const node of graph.pageNodes)
                node.div.sly = node.div.offsetTop;

            this.panStart = graph.currentPage.pan;
        }
    });



    this.scrollbarY.addEventListener('pointerup', e =>
    {
        if (   e.button == 0
            && this.scrollbarY.moving)
        {
            this.scrollbarY.moving = false;
            this.scrollbarY.releasePointerCapture(e.pointerId);

            let bounds = Rect.NaN;

            for (const node of graph.pageNodes)
                bounds = expandRect(bounds, boundingRect(node.div));

            if (bounds.t >= 0 && bounds.b < this.div.clientHeight)
                this.scrollbarY.style.display = 'none';
        }
    });



    this.scrollbarY.addEventListener('pointermove', e =>
    {
        if (this.scrollbarY.moving)
        {
            const y = this.scrollbarY.yStart + e.clientY - this.scrollbarY.pStart;

            let   t = y;
            let   b = t + this.scrollbarY.hStart;

            t = Math.max(smallScrollGap, t);
            b = Math.min(b, this.div.clientHeight - largeScrollGap);

            t = Math.max(smallScrollGap, Math.min(t, b - smallScrollGap));
            b = Math.max(t + smallScrollGap, b);

            this.scrollbarY.style.top    = t;
            this.scrollbarY.style.height = b-t;

            graph.currentPage.pan = point(
                this.panStart.x, 
                this.panStart.y - (e.clientY - this.scrollbarY.pStart) / this.scrollbarY.hStart * this.div.clientHeight);
        }
    });
}