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
        
        ctx.font = 'Inter 11px';
        
        const mes = ctx.measureText(this.name);

        console.log('mes', mes);
        
        this.div.style.width = mes.width + 'px';
    }



    updateHeader()
    {
        this.header.style.background = 'transparent';
       
        this.updateHeaderLabel();
    }



    updateHeaderLabel()
    {
        this.label.innerHTML = this.name;
        
        this.label.style.color = '#888';
        this.label.style.background = 'transparent';

        //this.label.style.transform = 'none';

        this.label.style.WebkitBackgroundClip = 'border-box';
        this.label.style.WebkitTextFillColor  = 'transparent';
    }
}