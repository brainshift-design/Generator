class GSetPrecision
extends GOperator1
{
    decimals;



    constructor(nodeId, options)
    {
        super(NUMBER_PRECISION, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.decimals = null;
    }



    copy()
    {
        const copy = new GSetPrecision(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.decimals) copy.decimals = this.decimals.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input    = await evalNumberOrListValue(this.input,    parse);
        const decimals = await evalNumberValue      (this.decimals, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.evalInputOrList(
                    input, 
                    item => getSetPrecisionValue(item, decimals), 
                    NumberValue.NaN.copy()); 
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',     this.outputType()],
            ['value',    this.value       ],
            ['decimals', decimals         ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.decimals && this.decimals.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.decimals) this.decimals.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.decimals) this.decimals.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.decimals) this.decimals.iterateLoop(parse);
    }
}



function getSetPrecisionValue(input, decimals)
{
    consoleAssert(
         input == NUMBER_VALUE, 
        'input must be NUMBER_VALUE');

    if (input.type == COLOR_VALUE)
        return new ColorValue(
            new NumberValue(input.c1.value, decimals),
            new NumberValue(input.c2.value, decimals),
            new NumberValue(input.c3.value, decimals));
    
    else if (input.type == FILL_VALUE)
        return new FillValue(
            new ColorValue(
                new NumberValue(input.color.c1.value, decimals),
                new NumberValue(input.color.c2.value, decimals),
                new NumberValue(input.color.c3.value, decimals)),
            new NumberValue(input.opacity.value, decimals));

    else
        return new NumberValue(input.value, decimals.value);
}