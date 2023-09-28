class ColorListMenuItem
{
    parentMenu    = null;
    index         = -1;

    enabled       = true;

    callback      = null;
    swatchType    = 0; // 0 = highlight, 1 = create

    noColorLine   = null;

    div;
    divHighlight;

    divColor1;
    divColor2;
    divColor3;
    divColor4;
    divColor5;
    divColor6;
    divColor7;
    divColor8;

    mouseOver = false;



    constructor(options = {})
    {
        this.initOptions(options);
        this.createControls();

        this.update();
    }



    initOptions(options)
    {
        if (options.callback   != undefined) this.callback   = options.callback;
        if (options.swatchType != undefined) this.swatchType = options.swatchType;
    }



    createControls()
    {
        this.div          = createDiv('menuItem');
        this.divHighlight = createDiv('menuItemHighlight');

        this.divColor1    = createDiv('menuItemColor');
        this.divColor2    = createDiv('menuItemColor');
        this.divColor3    = createDiv('menuItemColor');
        this.divColor4    = createDiv('menuItemColor');
        this.divColor5    = createDiv('menuItemColor');
        this.divColor6    = createDiv('menuItemColor');
        this.divColor7    = createDiv('menuItemColor');
        this.divColor8    = createDiv('menuItemColor');

        this.div      .style.textAlign  = 'center';
        this.div      .style.top        = '-8px';
        this.div      .style.height     = '41px';
        
        this.divColor1.style.background = this.swatchType == 1 ? '#000' : 'transparent';
        this.divColor1.style.boxShadow  = '0 0 0 1px inset #fff2';
        

        if (this.swatchType == 0)
        {
            this.noColorLine = createDiv();
            
            this.noColorLine.style.width      = '1px';
            this.noColorLine.style.height     = '19px';
            this.noColorLine.style.transform  = 'rotate(45deg)';
            this.noColorLine.style.position   = 'relative';
            this.noColorLine.style.left       = '8px';
            this.noColorLine.style.top        = '-2px';
            this.noColorLine.style.background = '#fff2';

            this.divColor1.appendChild(this.noColorLine);
        }


        this.divColor2.style.background = '#d44';
        this.divColor3.style.background = '#f94';
        this.divColor4.style.background = '#dd4';
        this.divColor5.style.background = '#4d4';
        this.divColor6.style.background = '#36f';
        this.divColor7.style.background = '#d4d';
        this.divColor8.style.background = this.swatchType == 1 ? '#fff' : (darkMode ? '#ddd' : '#333');

        this.divHighlight.style.zIndex = -2;

        
        this.div.appendChild(this.divHighlight);

        this.div.appendChild(this.divColor1);
        this.div.appendChild(this.divColor2);
        this.div.appendChild(this.divColor3);
        this.div.appendChild(this.divColor4);
        this.div.appendChild(this.divColor5);
        this.div.appendChild(this.divColor6);
        this.div.appendChild(this.divColor7);
        this.div.appendChild(this.divColor8);



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
                        index = Math.min(Math.max(0, index), 7);

                    this.callback(e, index);
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
                    && distance(this.dragStart, clientPos(e)) > 5)
                {
                    const rect = boundingRect(this.div);

                    if (this.callback)
                    {
                        let index = Math.round((e.clientX - (rect.x-8)) / 24) - 1;
                            index = Math.min(Math.max(0, index), 7);

                        this.callback(e, index);
                    }

                    
                    this.button0 = false;

                    if (!e.shiftKey)
                        hideAllMenus();


                    const node = graph.pageNodes.at(-1);

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
                else
                {
                    const rect = boundingRect(this.div);

                    let index = Math.round((e.clientX - (rect.x-8)) / 24) - 1;
                        index = Math.min(Math.max(0, index), 7);

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

        this.divColor8.style.background = this.swatchType == 1 ? '#fff' : (darkMode ? '#ddd' : '#333');
        
        if (this.swatchType == 0)
            this.noColorLine.style.background = darkMode ? 'transparent' : '#fff2';
        
        this.div.style.opacity = this.enabled ? '100%' : '40%';
    }
}