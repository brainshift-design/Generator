class   ResizableBaseWithSeparator
extends ResizableBase
{
    divider;
    separator;



    constructor(type, id, name, icon, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, id, name, icon, defWidth, progressBar);

        
        this.divider = 0.25;

        this.createSeparator();
    }



    createSeparator()
    {
        this.separator = createDiv('itemsSeparator');

        this.separator.down         = false;
        this.separator.sy           = Number.NaN;
        this.separator.spy          = Number.NaN;
        this.separator.style.top    = defHeaderHeight + 'px';
        this.separator.style.height = 'calc(100% - ' + defHeaderHeight + 'px)';

        this.div.appendChild(this.separator);



        this.separator.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                try
                {
                    this.separator.setPointerCapture(e.pointerId);

                    this.separator.down = true;

                    this.separator.sx  = e.clientX;
                    this.separator.spx = this.divider;
                }
                catch {}
            }
        });



        this.separator.addEventListener('pointermove', e =>
        {
            if (this.separator.down)
            {
                this.divider = 
                      this.separator.spx 
                    +   (e.clientX - this.separator.sx) / graph.currentPage.zoom 
                      / this.measureData.divOffset.width;

                this.divider = Math.min(Math.max(0.1, this.divider), 0.9);

                for (const param of this.params)
                    param.divider = this.divider;

                this.updateSeparator();
                this.updateParamControls();
            }
        });



        this.separator.addEventListener('pointerup', e =>
        {
            if (e.button == 0)
            {
                e.stopPropagation();

                this.separator.down = false;
                this.separator.releasePointerCapture(e.pointerId);

                actionManager.do(new SetListDividerAction(
                    this.id, 
                    this.separator.spx,
                    this.divider));
            }
        });
    }



    updateSeparator()
    {
        this.separator.style.left = (this.divider * this.measureData.divOffset.width) + 'px';        
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(x, y, w, h, updateTransform);

        this.separator.style.left = (this.divider * w) + 'px';
    }



    updateNode()
    {
        super.updateNode();

        this.updateSeparator();
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"divider": "' + this.divider + '"';
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node.divider) this.divider = parseFloat(_node.divider); else this.divider = 0.25;
    }
}