class GCopy
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(COPY, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCopy(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : null;//NullValue;


        this.updateValues = [['value', this.value]];

        
        this.updateValueObjects();


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
    }
}
