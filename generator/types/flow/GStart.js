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
        const copy = new GStart(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
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
