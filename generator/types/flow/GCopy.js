class GCopy
extends GOperator
{
    input = null;

    copy;


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



    eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = this.input ? this.input.eval(parse).toValue() : null;
        this.copy  = this.value ? this.value.copy()                : null;


        if (this.copy) genPushUpdateValue(parse, this.nodeId, 'copy', this.copy);
        else           genPushUpdateValue(parse, this.nodeId, '', NumberValue.NaN);

        
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
