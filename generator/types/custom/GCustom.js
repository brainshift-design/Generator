class GCustom
extends GOperator
{
    // input = null;



    constructor(nodeId, options)
    {
        super(CUSTOM, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCustom(this.nodeId, this.options);

        copy.copyBase(this);

        // if (this.input) copy.input = this.input.copy();
        // if (this.value) copy.value = this.value.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.valid)//isCached())
            return this;


        this.value = NullValue;
        //     this.input
        //     ? this.input.eval(parse).toValue()
        //     : NullValue;


         genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        
        
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
