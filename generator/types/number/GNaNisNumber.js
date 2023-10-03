class GNaNisNumber
extends GOperator1
{
    _value;



    constructor(nodeId, options)
    {
        super(NUMBER_NAN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNaNisNumber(this.nodeId, this.options);

        copy.copyBase(this);

        copy._value = this._value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _value = (await this._value.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this. input.eval(parse)).toValue();

            if (isListType(input.type))
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


        const type = 
            this.value
            ? new TextValue(
                isListType(this.value.type)
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : TextValue.NaN.copy();
            
       
        this.setUpdateValues(parse,
        [
            ['type',   type ],
            ['value', _value]
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.value) this.value.invalidateInputs(parse, from);
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