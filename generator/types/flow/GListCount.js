class GListCount
extends GOperator
{
    input = null;

    value = null;



    constructor(nodeId, options)
    {
        super(LIST_COUNT, nodeId, options);
    }



    copy()
    {
        const copy = new GListCount(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.count) copy.count = this.count.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            await this.input.eval(parse);
            this.value = new NumberValue(this.input.toValue().items.length);
        }
        else
            this.value = NumberValue.NaN;


        this.updateValues = [[returnValueId, this.value]];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
    }
}