class   OpComment
extends OperatorBase
{
    constructor()
    {
        super(COMMENT, 'cmnt', 0);


        this.scrollName = false;


        this.textbox.addEventListener('change', e =>
        {
            this.updateNode();
            graphView.updateNodeTransform(this);
        });
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


        const cnv = this.canvas || (this.canvas = document.createElement("canvas"));
        const ctx = cnv.getContext("2d");
        
        ctx.font = '11px Inter';
        
        const mes = ctx.measureText(
            hasFocus(this.textbox) 
            ? this.textbox.value 
            : this.name);

        this.div    .style.width =
        this.textbox.style.width = mes.width + 'px';
    }



    updateHeader()
    {
        this.header.style.overflow   = 'visible';
        this.header.style.background = 'transparent';
       
        this.updateHeaderLabel();
    }



    updateHeaderLabel()
    {
        this.label.innerHTML        = this.name;
        
        this.label.style.color      = this.selected ? colFigmaBlue : '#666';
        this.label.style.background = 'transparent';

        this.label.style.textAlign  = 'left';

        this.label.style.WebkitBackgroundClip = 'inherit';
        this.label.style.WebkitTextFillColor  = 'inherit';
    }
}