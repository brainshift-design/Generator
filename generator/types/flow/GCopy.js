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

        if (this.input) copy.input = this.input.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = 
            this.input
            ? this.input.eval(parse).toValue()
            : null;


        if (this.value) genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        else            genPushUpdateValue(parse, this.nodeId, '',      NumberValue.NaN);

        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }
}
