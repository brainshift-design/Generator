class   OpComment
extends OperatorBase
{
    constructor()
    {
        super(COMMENT, 'comment', 'comment', 0);

        this.scrollName = false;


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


        utilContext.font = '11px Inter';
        
        const mes = utilContext.measureText(
            hasFocus(this.textbox) 
            ? this.textbox.value 
            : this.name);


        const width = Math.max(1, mes.width + 2);

        this.div    .style.width   = 
        this.textbox.style.width   = width + 'px';

        this.textbox.style.height  = this.div.offsetHeight;
        this.textbox.style.padding = '0';
        this.textbox.style.margin  = '0';
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
            this.label.style.color        = 'var(--figma-color-bg-brand)';//rgb2style_a(hex2rgb(colFigmaBlue), 0.7);
            this.label.style.textShadow   = '0 0 0 var(--figma-color-bg-brand)';// + colFigmaBlue;

            this.textbox.style.color      = rgb2style_a(hex2rgb(colFigmaBlue), 0.7);
            this.textbox.style.textShadow = '0 0 0 ' + colFigmaBlue;
        }
        else
        {
            this.label.style.color        = 'var(--figma-color-bg-disabled-secondary)';
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