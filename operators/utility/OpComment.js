class   OpComment
extends OperatorBase
{
    constructor()
    {
        super(COMMENT, 'comment', 0);


        this.scrollName = false;


        this.textbox.addEventListener('input', e =>
        {
            this.updateNode();
            graphView.updateNodeTransform(this);
        });


        this.textbox.addEventListener('change', e =>
        {
            if (this.textbox.value.trim() == '')
                actionManager.do(new DeleteNodesAction([this.id], false), true);
        });


        this.updateNode();
        graphView.updateNodeTransform(this);


        this.labelWrapper.style.overflow = 'visible';
    }



    setSelected(sel)
    {
        this._selected = sel;
        this.div.style.boxShadow = 'none';
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


        const width = Math.max(1, mes.width);

        this.div    .style.width   = 
        this.textbox.style.width   = width + 'px';

        this.textbox.style.height  = this.div.offsetHeight;
        this.textbox.style.padding = '0';
        this.textbox.style.margin  = '2px 0 0 0';

        this.textbox.style.boxShadow = 'none';
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
            this.label.style.color        = rgb2style_a(hex2rgb(colFigmaBlue), 0.7);
            this.label.style.textShadow   = '0 0 0 ' + colFigmaBlue;

            this.textbox.style.color      = rgb2style_a(hex2rgb(colFigmaBlue), 0.7);
            this.textbox.style.textShadow = '0 0 0 ' + colFigmaBlue;
        }
        else
        {
            this.label.style.color        = '#666';
            this.label.style.textShadow   = 'none';

            this.textbox.style.color      = '#666';
            this.textbox.style.textShadow = 'none';
        }
    

        this.label.style.background           = 'transparent';
        this.label.style.textAlign            = 'left';

        this.label.style.left                 = '0';
        this.label.style.top                  = '0';

        this.label.style.transform            = 'none';

        this.label.style.WebkitBackgroundClip = 'inherit';
        this.label.style.WebkitTextFillColor  = 'inherit';
    }
}