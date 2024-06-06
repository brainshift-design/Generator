class GNaNisNumber
extends GOperator1
{
    _value = null;



    constructor(nodeId, options)
    {
        super(NUMBER_NAN, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this._value = null;
    }



    copy()
    {
        const copy = new GNaNisNumber(this.nodeId, this.options);

        copy.copyBase(this);

        if (this._value) copy._value = this._value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const  input = await evalNumberValue(this. input, parse);
        const _value = await evalNumberValue(this._value, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getNaNisNumberValue(item, _value, this.options.enabled)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getNaNisNumberValue(input, _value, this.options.enabled);
            }
        }

        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()]//,
            //['value', _value            ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.value && this.value.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.value) this.value.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.value) this.value.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.value) this.value.iterateLoop(parse);
    }
}



function getNaNisNumberValue(input, value, enabled)
{
    if (    enabled
        && !input.isValid())
        return value;
    else
        return input;
}