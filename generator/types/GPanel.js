class GPanel
extends GOperator
{
    constructor(nodeId, options)
    {
        super(PANEL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GPanel(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NullValue();


        this.setUpdateValues(parse, [['', new NullValue()]]);
        
        
        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }
}
