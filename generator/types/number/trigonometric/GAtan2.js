class GAtan2
extends GOperator
{
    x;
    y;


    
    constructor(nodeId, options)
    {
        super(NUMBER_ATAN2, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.x = null;
        this.y = null;
    }



    copy()
    {
        const copy = new GAtan2(this.nodeId, this.options);

        copy.copyBase(this);

        copy.x = this.x.copy();
        copy.y = this.x.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const x = this.x ? (await this.x.eval(parse)).toValue() : null;
        const y = this.y ? (await this.y.eval(parse)).toValue() : null;


        this.value = new NumberValue(Math.atan2(y.value, x.value));


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['x',     x         ],
            ['y',     y         ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.x && this.x.isValid()
            && this.y && this.y.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x) this.x.pushValueUpdates(parse);
        if (this.y) this.y.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x) this.x.invalidateInputs(parse, from, force);
        if (this.y) this.y.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x) this.x.iterateLoop(parse);
        if (this.y) this.y.iterateLoop(parse);
    }
}
