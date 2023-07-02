class GListCount
extends GOperator
{
    input = null;
    base  = null;

    value = null;



    constructor(nodeId, options)
    {
        super(LIST_COUNT, nodeId, options);
    }



    copy()
    {
        const copy = new GListCount(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.base)  copy.base  = this.base .copy();
        
        if (this.count) copy.count = this.count.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            const base  = (await this.base .eval(parse)).toValue();

            this.value = new NumberValue(input.items.length - (base.value == 0 ? 1 : 0));
        }
        else
            this.value = NumberValue.NaN;


        this.updateValues = 
        [
            ['value', this.value],
            ['base',  this.base ]
        ];


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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
    }
}