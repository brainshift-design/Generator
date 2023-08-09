class GTextToColor
extends GOperator
{
    input;


    
    constructor(nodeId, options)
    {
        super(TEXT_TO_COLOR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextToColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            let rgb = 
                input.value.trim() != ''
                ? validHex2rgb(input.value)
                : rgb_NaN;
                
            this.value = ColorValue.fromRgb(scaleRgb(rgb));
        }
        else
            this.value = ColorValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
    }
}
