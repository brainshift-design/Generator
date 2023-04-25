class GListCount
extends GOperator
{
    input = null;

    count = null;



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
            this.count = new NumberValue(this.input.toValue().items.length);
        }
        else
            this.count = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'count', this.count);


        this.validate();

        return this;
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }
}