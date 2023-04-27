class GCopy
extends GOperator
{
    input     = null;

    copy;

    evaluated = false;



    constructor(nodeId, options)
    {
        super(COPY, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCopy(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.value) copy.value = this.value.copy();
        if (this.copy)  copy.copy  = this.copy .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached()
            )
            return this;


        this.value = this.input ? (await this.input.eval(parse)).toValue() : NullValue;
        this.copy  = this.value ? this.value.copy()                        : NullValue;


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'copy',  this.copy);

        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    invalidate()
    {
        super.invalidate();

        // if (this.input  ) this.input  .invalidate();
    }
}
