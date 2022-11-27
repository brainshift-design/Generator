class GStart
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(START, nodeId, options);
    }


    
    copy()
    {
        const start = new GStart(this.nodeId, this.options);

        start.copyBase(this);

        if (this.input) start.input = this.input.copy();
        if (this.value) start.value = this.value.copy();

        return start;
    }



    eval(parse)
    {
        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            this.value = this.input.toValue();
        }
        else
            this.value = null;

        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value ? this.value.copy() : null;
    }
}
