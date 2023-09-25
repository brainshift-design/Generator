class   OpComment
extends OperatorBase
{
    constructor()
    {
        super(COMMENT, 'comment', 'comment', '');

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
        super.updateNode();


        this.inner.style.boxShadow = 'none';


        const fontSize = 36;


        utilContext.font = fontSize + 'px \'Oooh Baby\'';
        
        const mes = utilContext.measureText(
            hasFocus(this.textbox) 
            ? this.textbox.value 
            : this.name);


        const width = Math.max(1, mes.width + 2);

        this.div    .style.width      = 
        this.textbox.style.width      = width + 'px';

        this.textbox.style.height     =  this.div.offsetHeight;
        this.textbox.style.padding    = '0';
        this.textbox.style.margin     = '0';
        this.textbox.style.textAlign  = 'left';
        this.textbox.style.fontFamily = 'Oooh Baby';
        this.textbox.style.fontSize   =  fontSize + 'px';
        this.textbox.style.fontWeight =  400;

        this.div.style.borderRadius = 0;

        const height = (fontSize + mes.actualBoundingBoxDescent) + 'px';

        this.headerHeight = height;

        this.div         .style.height = height;
        this.header      .style.height = height;
        this.labelWrapper.style.height = height;
        this.label       .style.height = height;
        this.labelText   .style.height = height;

        this.labelText   .style.position   = 'absolute';
        this.labelText   .style.left       =  0;

        this.labelText   .style.fontFamily = 'Oooh Baby';
        this.labelText   .style.fontSize   = fontSize + 'px';
        this.labelText   .style.fontWeight =  400;

        this.div         .style.overflow   = 'visible';
        this.inner       .style.overflow   = 'visible';
        this.header      .style.overflow   = 'visible';
        this.labelWrapper.style.overflow   = 'visible';
        this.label       .style.overflow   = 'visible';
        this.labelText   .style.overflow   = 'visible';
        
        this.updateTransform();
        
        // this.div      .style.boxShadow = '0 0 0 1px red inset';
        // this.label    .style.boxShadow = '0 0 0 1px green inset';
        // this.labelText.style.boxShadow = '0 0 0 1px yellow inset';
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



    updateBorder()
    {
        this.div.style.boxShadow = 'none';
    }
}