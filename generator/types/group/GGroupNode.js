class GGroupNode
extends GOperator
{
    // input = null;



    constructor(nodeId, options)
    {
        super(GROUP_NODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GGroupNode(this.nodeId, this.options);

        copy.copyBase(this);

        // if (this.input) copy.input = this.input.copy();
        // if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.valid)//isCached())
            return this;


        this.value = NullValue;
        //     this.input
        //     ? (await this.input.eval(parse)).toValue()
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
