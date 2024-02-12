class AdjustMenuItem
{
    parentMenu    = null;
    index         = -1;
    template      = null;

    enabled       = true;

    callback      = null;


    div;
    divHighlight;

    divUp;
    divDown;
    divRename;
    divDelete;

    mouseOver = false;



    constructor(templateIndex, options = {})
    {
        this.template = userTemplates[templateIndex];

        this.initOptions(options);
        this.createControls();

        this.update();
    }



    initOptions(options)
    {
        if (options.callback != undefined) this.callback = options.callback;
    }



    createControls()
    {
        this.div          = createDiv('menuItem');
        this.divHighlight = createDiv('menuItemHighlight');

        this.divUp        = createDiv('menuItemAdjust');
        this.divDown      = createDiv('menuItemAdjust');
        this.divRename    = createDiv('menuItemAdjust');
        this.divDelete    = createDiv('menuItemAdjust');

        this.div      .style.textAlign  = 'center';
        this.div      .style.top        = '-8px';
        this.div      .style.height     = '41px';

        this.divUp    .innerHTML = '<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 -3.49691e-07L8 4L0 4L4 -3.49691e-07Z" fill="white"/></svg>';
        this.divDown  .innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L0 0H8L4 4Z" fill="white"/></svg>';
        this.divRename.innerHTML = '<svg width="8" height="15" viewBox="0 -5 8 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="1" fill="white"/><rect y="3" width="8" height="1" fill="white"/><rect y="6" width="5" height="1" fill="white"/></svg>';
        this.divDelete.innerHTML = '<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="1" width="1.41421" height="9.89949" transform="rotate(-45 0 1)" fill="white"/><rect x="1" y="8" width="1.41421" height="9.89949" transform="rotate(-135 1 8)" fill="white"/></svg>';

        this.divHighlight.style.zIndex = -2;

        
        this.div.appendChild(this.divHighlight);

        this.div.appendChild(this.divUp);
        this.div.appendChild(this.divDown);
        this.div.appendChild(this.divRename);
        this.div.appendChild(this.divDelete);



        this.div.addEventListener('pointerdown', e => 
        {
            e.stopPropagation();
            e.preventDefault();


            if (e.button == 0)
            {
                this.button0 = true;

                try
                {
                    this.div.setPointerCapture(e.pointerId);
                    this.dragStart = point(e.clientX, e.clientY);
                }
                catch {}
            }
        });



        this.div.addEventListener('pointerup', e => 
        {
            e.stopPropagation();
            e.preventDefault();


            if (e.button == 0)
            {
                const rect = boundingRect(this.div);

                if (this.callback)
                {
                    let index = Math.round((e.clientX - (rect.x-8)) / 24) - 1;
                        index = Math.min(Math.max(0, index), 3);

                    this.callback(e, this.parentMenu, index, this.template);
                }


                this.button0 = false;

                this.div.releasePointerCapture(e.pointerId);
            }
        });



        this.div.addEventListener('pointermove', e =>
        {
            if (this.enabled)
            {
                this.mouseOver = true;
                this.update();


                if (   this.button0
                    && this.callback
                    && distv(this.dragStart, clientPos(e)) > 5)
                {
                    const rect = boundingRect(this.div);

                    if (this.callback)
                    {
                        let index = Math.round((e.clientX - (rect.x-8)) / 24) - 1;
                            index = Math.min(Math.max(0, index), 3);

                        this.callback(e, this.parentMenu, index, this.template);
                    }

                    
                    this.button0 = false;

                    if (!e.shiftKey)
                        hideAllMenus();


                    const node = graph.pageNodes.at(-1);

                    if (node)
                    {
                        node.div.shiftOnPointerDown = false;

                        node.sx  = node.div.offsetLeft;
                        node.sy  = node.div.offsetTop ;

                        node.slx = node.div.offsetLeft - (defNodeWidth    / 2) - (               + graph.currentPage.pan.x) / graph.currentPage.zoom;
                        node.sly = node.div.offsetTop  - (defHeaderHeight / 2) - (getTopHeight() + graph.currentPage.pan.y) / graph.currentPage.zoom;

                        try
                        {
                            if (this.div.hasPointerCapture(e.pointerId))
                                this.div.releasePointerCapture(e.pointerId);

                            node.header.setPointerCapture(e.pointerId);

                            node.div.dragging = true;
                        }
                        catch {}
                    }                        
                }
                else
                {
                    const rect = boundingRect(this.div);

                    let index = Math.round((e.clientX - (rect.x-8)) / 24) - 1;
                        index = Math.min(Math.max(0, index), 3);

                    this.divHighlight.style.left   = (4 + index*24) + 'px';
                    this.divHighlight.style.width  = '24px';
                    this.divHighlight.style.top    = '0px';
                    this.divHighlight.style.height = '41px';

                    this.enteredDiv  = true;
                }
            }
        });
    

    
        this.div.addEventListener('pointerleave', () =>
        {
            this.mouseOver = false;
            this.update();

            this.enteredDiv    = false;
            this.enteredExpand = false;
        });


        this.update();
    }



    select(shift = false, ctrl = false, alt = false, x = Number.NaN, y = Number.NaN)
    {
        if (!this.enabled)
            return;


        if (!isEmpty(currentMenus)) // this lets the item be selected without its parent menu being involved
        {
            if (this.parentMenu.button)
                this.parentMenu.button.update();
        }

        if (!shift) 
            hideAllMenus();


        const e = 
        {
            shiftKey: shift,
            ctrlKey:  ctrl,
            altKey:   alt
        };


        if (!isNaN(x)) e.clientX = x;
        if (!isNaN(y)) e.clientY = y;

        if (this.callback)
            this.callback(e);
    }



    // setEnabled(enabled)
    // {
    //     this.enabled = enabled;
    //     this.update();
    // }



    setVisible(visible)
    {
        this.div.style.display = visible ? 'inline-block' : 'none';
    }



    update()
    {
        this.divHighlight.style.background = 
               this.mouseOver
            ||    this.childMenu
               && this.childMenu.visible
            ? 'var(--figma-color-bg-brand)'
            : 'transparent';

        this.div.style.opacity = this.enabled ? '100%' : '40%';
    }
}