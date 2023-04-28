class GCopy
extends GOperator
{
    input = null;

    //count = null;



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
        //if (this.count) copy.count = this.count.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        //const count = (await this.count.eval(parse)).toValue();


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : NullValue;

        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        //genPushUpdateValue(parse, this.nodeId, 'count', count);

        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        //if (this.count) this.count.invalidate();
    }
}
