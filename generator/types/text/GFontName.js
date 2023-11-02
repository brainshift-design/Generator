class GFontName
extends GOperator
{
    index;


    
    constructor(nodeId, options)
    {
        super(FONT_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.index = null;
    }



    copy()
    {
        const copy = new GFontName(this.nodeId, this.options);

        copy.copyBase(this);

        copy.index = this.index.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const index = (await this.index.eval(parse)).toValue();


        this.value = new TextValue(figUniqueFontNames[index.value]);


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['index', index     ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.index && this.index.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.index) this.index.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.index) this.index.iterateLoop(parse);
    }
}
