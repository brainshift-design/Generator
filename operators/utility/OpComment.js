class   OpComment
extends OperatorBase
{
    constructor()
    {
        super(COMMENT, 'cmnt', 0);


        this.scrollName = false;

        //this.paramBack.style.display = 'hidden';


        this.textbox.addEventListener('change', e =>
        {
            this.updateNode();
        });
    }



    updateNode()
    {
        super.updateNode();

        const cnv = this.canvas || (this.canvas = document.createElement("canvas"));
        const ctx = cnv.getContext("2d");
        
        ctx.font = '11px Inter';
        
        const mes = ctx.measureText(this.name);

        this.div.style.width = mes.width + 'px';
    }



    updateHeader()
    {
        this.header.style.background = 'transparent';
       
        this.updateHeaderLabel();
    }



    updateHeaderLabel()
    {
        console.log(this.id + '.updateHeaderLabel()');
        console.log(this.id + '.selected', this.selected);

        this.label.innerHTML        = this.name;
        
        this.label.style.color      = this.selected ? colFigmaBlue : '#666';
        this.label.style.background = 'transparent';

        this.label.style.textAlign  = 'left';
        //updateHeaderLabelOffset(this);

        //this.label.style.transform = 'none';

        this.label.style.WebkitBackgroundClip = 'inherit';
        this.label.style.WebkitTextFillColor  = 'inherit';
    }
}