class   OpCommentArrow
extends OperatorBase
{
    static { operatorTypes[COMMENT_ARROW] = this; }



    handle0;
    handle1;
    handle2;
    handle3;

    handleSize = 25;



    constructor()
    {
        super(COMMENT_ARROW, 'arrow', '', '');

        this.scrollName = false;
        this.showIcon   = false;


        this.textbox.addEventListener('input', e =>
        {
            this.updateNode();
            this.updateTransform();
        });


        this.textbox.addEventListener('change', e =>
        {
            if (this.textbox.value.trim() == '')
                actionManager.do(new DeleteNodesAction([this.id]), true);
        });


        this.header.style.pointerEvents = 'none';

        this.handle0 = this.createHandle(point(  0, 0));
        this.handle1 = this.createHandle(point( 66, 0));
        this.handle2 = this.createHandle(point(133, 0));
        this.handle3 = this.createHandle(point(200, 0));

        this.div.appendChild(this.handle0);
        this.div.appendChild(this.handle1);
        this.div.appendChild(this.handle2);
        this.div.appendChild(this.handle3);
    }



    createHandle(p)
    {
        const handle = createDiv('arrowHandle');

        handle.style.width        = this.handleSize + 'px';
        handle.style.height       = this.handleSize + 'px';
        handle.style.borderRadius = (this.handleSize/2) + 'px';
        
        handle.p           = p;
        handle.buttonDown0 = false;

        
        handle.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                e.preventDefault();
                e.stopPropagation();

                handle.sx  = handle.p.x;// - this.div.offsetLeft;// / graph.currentPage.zoom;
                handle.sy  = handle.p.y;// - this.div.offsetTop ;/// graph.currentPage.zoom;

                handle.psx = e.clientX;
                handle.psy = e.clientY;

                handle.buttonDown0 = true;
                handle.setPointerCapture(e.pointerId);
            }
        });


        handle.addEventListener('pointermove', e =>
        {
            if (handle.buttonDown0)
            {
                handle.p.x = handle.sx + (e.clientX - handle.psx) / graph.currentPage.zoom;
                handle.p.y = handle.sy + (e.clientY - handle.psy) / graph.currentPage.zoom;

                this.updateNode();
            }
        });


        handle.addEventListener('pointerup', e =>
        {
            if (e.button == 0)
            {
                handle.releasePointerCapture(e.pointerId);
                handle.buttonDown0 = false;
            }
        });


        return handle;
    }



    setSelected(sel)
    {
        this._selected = sel;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: null });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateNode()
    {
        const bounds = new AbsRect(
            Math.min(this.handle0.p.x, this.handle1.p.x, this.handle2.p.x, this.handle3.p.x),
            Math.min(this.handle0.p.y, this.handle1.p.y, this.handle2.p.y, this.handle3.p.y),
            Math.max(this.handle0.p.x, this.handle1.p.x, this.handle2.p.x, this.handle3.p.x),
            Math.max(this.handle0.p.y, this.handle1.p.y, this.handle2.p.y, this.handle3.p.y));

        // console.log('bounds =', bounds);

        this.div.style.left   = bounds.x;
        this.div.style.top    = bounds.y;
        this.div.style.width  = Math.max(1, bounds.width ) + this.handleSize;
        this.div.style.height = Math.max(1, bounds.height) + this.handleSize;

        
        super.updateNode();


        this.div.style.boxShadow = '0 0 0 1px red inset';
        this.inner.style.boxShadow = 'none';


        this.handle0.style.left = (this.handle0.p.x - bounds.x) + 'px';
        this.handle0.style.top  = (this.handle0.p.y - bounds.y) + 'px';
        this.handle1.style.left = (this.handle1.p.x - bounds.x) + 'px';
        this.handle1.style.top  = (this.handle1.p.y - bounds.y) + 'px';
        this.handle2.style.left = (this.handle2.p.x - bounds.x) + 'px';
        this.handle2.style.top  = (this.handle2.p.y - bounds.y) + 'px';
        this.handle3.style.left = (this.handle3.p.x - bounds.x) + 'px';
        this.handle3.style.top  = (this.handle3.p.y - bounds.y) + 'px';
    }



    updateHeader()
    {
        this.header.style.overflow   = 'visible';
        this.header.style.background = 'transparent';
       
        this.updateHeaderLabel();
    }



    updateHeaderLabel()
    {
        this.labelText.innerHTML = this.name;


        if (this.selected)
        {
            this.label.style.color        = 'var(--figma-color-bg-brand)';
            this.label.style.textShadow   = '0 0 0 var(--figma-color-bg-brand)';

            this.textbox.style.color      =  rgb2style_a(hex2rgb(colFigmaBlue), 0.7);
            this.textbox.style.textShadow = '0 0 0 ' + colFigmaBlue;
        }
        else
        {
            this.label.style.color        = darkMode ? '#ccc' : '#333';
            this.label.style.textShadow   = 'none';

            this.textbox.style.color      = 'var(--figma-color-bg-disabled-secondary)';
            this.textbox.style.textShadow = 'none';
        }
    

        this.labelWrapper.style.overflow      = 'visible';

        this.label.style.background           = 'transparent';
        this.label.style.textAlign            = 'left';

        this.label.style.left                 = '0';
        this.label.style.top                  = '0';

        this.label.style.transform            = 'none';

        this.label.style.WebkitBackgroundClip = 'inherit';
        this.label.style.WebkitTextFillColor  = 'inherit';
    }


    
    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"ax0": "' + this.handle0.p.x.toString() + '"'
             + ',\n' + pos + tab + '"ay0": "' + this.handle0.p.y.toString() + '"'
             + ',\n' + pos + tab + '"ax1": "' + this.handle1.p.x.toString() + '"'
             + ',\n' + pos + tab + '"ay1": "' + this.handle1.p.y.toString() + '"'
             + ',\n' + pos + tab + '"ax2": "' + this.handle2.p.x.toString() + '"'
             + ',\n' + pos + tab + '"ay2": "' + this.handle2.p.y.toString() + '"'
             + ',\n' + pos + tab + '"ax3": "' + this.handle3.p.x.toString() + '"'
             + ',\n' + pos + tab + '"ay3": "' + this.handle3.p.y.toString() + '"';
    }



    loadParams(_node, pasting)
    {
        if (   _node.ax0 != undefined
            && _node.ay0 != undefined
            && _node.ax1 != undefined
            && _node.ay1 != undefined
            && _node.ax2 != undefined
            && _node.ay2 != undefined
            && _node.ax3 != undefined
            && _node.ay3 != undefined)
        {
            this.handle0.p.x = parseFloat(_node.ax0);
            this.handle0.p.y = parseFloat(_node.ay0);
            this.handle1.p.x = parseFloat(_node.ax1);
            this.handle1.p.y = parseFloat(_node.ay1);
            this.handle2.p.x = parseFloat(_node.ax2);
            this.handle2.p.y = parseFloat(_node.ay2);
            this.handle3.p.x = parseFloat(_node.ax3);
            this.handle3.p.y = parseFloat(_node.ay3);

            this.valid = true;
        }

        super.loadParams(_node, pasting);
    }
}