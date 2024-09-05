class GSetPrecision
extends GOperator1
{
    decimals;
    trim;



    constructor(nodeId, options)
    {
        super(NUMBER_PRECISION, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.decimals = null;
        this.trim     = null;
    }



    copy()
    {
        const copy = new GSetPrecision(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.decimals) copy.decimals = this.decimals.copy();
        if (this.trim    ) copy.trim     = this.trim    .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input    = await evalNumberOrListValue(this.input,    parse);
        const decimals = await evalNumberValue      (this.decimals, parse);
        const trim     = await evalNumberValue      (this.trim,     parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.evalInputOrList(
                    input, 
                    item => getSetPrecisionValue(item, decimals, trim), 
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
            ['decimals', decimals         ],
            ['trim',     trim             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.decimals && this.decimals.isValid()
            && this.trim     && this.trim    .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.decimals) this.decimals.pushValueUpdates(parse);
        if (this.trim    ) this.trim    .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.decimals) this.decimals.invalidateInputs(parse, from, force);
        if (this.trim    ) this.trim    .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.decimals) this.decimals.iterateLoop(parse);
        if (this.trim    ) this.trim    .iterateLoop(parse);
    }
}



function getSetPrecisionValue(input, decimals, trim)
{
    consoleAssert(
            input == NUMBER_VALUE
         || input == COLOR_VALUE
         || input == FILL_VALUE, 
        'input must be NUMBER_VALUE');


    if (input.type == COLOR_VALUE)
        return new ColorValue(
            input.space,
            getTrimmedValue(input.c1, decimals, trim),
            getTrimmedValue(input.c2, decimals, trim),
            getTrimmedValue(input.c3, decimals, trim));
    
    else if (input.type == FILL_VALUE)
    {
        return new FillValue(
            new ColorValue(
                input.color.space,
                getTrimmedValue(input.color.c1, decimals, trim),
                getTrimmedValue(input.color.c2, decimals, trim),
                getTrimmedValue(input.color.c3, decimals, trim)),
            getTrimmedValue(input.opacity, decimals, trim),
            input.blend);
    }
    else
        return getTrimmedValue(input, decimals, trim);
}



function getTrimmedValue(value, decimals, trim)
{
    // console.log('value =', value.value);
    // console.log('decimals =', decimals.value);
    // console.log('trim =', trim.value);

    const val    = numToString(value.value,  decimals.value);
    const strVal = numToString(value.value, -decimals.value);
    // console.log('val =', val);
    // console.log('strVal =', strVal);
    // console.log('');

    return new NumberValue(
        val,
        trim.value > 0
            ? strDecDigits(strVal)
            : decimals.value);
}