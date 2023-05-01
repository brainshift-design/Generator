class GStart
extends GOperator
{
    //input = null;



    constructor(nodeId, options)
    {
        super(START, nodeId, options);
    }


    
    copy()
    {
        const copy = new GStart(this.nodeId, this.options);

        copy.copyBase(this);

        //if (this.input) copy.input = this.input.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        const repeatId = (await this.repeatId.eval(parse)).toValue();


        // if (this.input)
        // {
        //     this.input = (await this.input.eval(parse)).copy();
        //     this.value = this.input.toValue();
        // }
        // else
            this.value = NullValue;


        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'value',    this.value);
            genPushUpdateValue(parse, this.nodeId, 'repeatId', repeatId);
        }


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value ? this.value.copy() : null;
    }
}
