class GTextToNumber
extends GOperator1
{
    base      = null;
    decimals  = null;
    thousands = null;


    
    constructor(nodeId, options)
    {
        super(TEXT_TO_NUMBER, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.base      = null;
        this.decimals  = null;
        this.thousands = null;
    }



    copy()
    {
        const copy = new GTextToNumber(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.base     ) copy.base      = this.base     .copy();
        if (this.decimals ) copy.decimals  = this.decimals .copy();
        if (this.thousands) copy.thousands = this.thousands.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input     = this.input     ? (await this.input    .eval(parse)).toValue() : null;
        const base      = this.base      ? (await this.base     .eval(parse)).toValue() : null;
        const decimals  = this.decimals  ? (await this.decimals .eval(parse)).toValue() : null;
        const thousands = this.thousands ? (await this.thousands.eval(parse)).toValue() : null;


        if (input)
        {
            if (isListType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getTextToNumberValue(item, base, decimals, thousands)
                        : NumberValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getTextToNumberValue(input, base, decimals, thousands);
            }
        }

        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['base',      base             ],
            ['decimals',  decimals         ],
            ['thousands', thousands        ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.base      && this.base     .isValid()
            && this.decimals  && this.decimals .isValid()
            && this.thousands && this.thousands.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.base     ) this.base     .pushValueUpdates(parse);
        if (this.decimals ) this.decimals .pushValueUpdates(parse);
        if (this.thousands) this.thousands.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.base     ) this.base     .invalidateInputs(parse, from, force);
        if (this.decimals ) this.decimals .invalidateInputs(parse, from, force);
        if (this.thousands) this.thousands.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.base     ) this.base     .iterateLoop(parse);
        if (this.decimals ) this.decimals .iterateLoop(parse);
        if (this.thousands) this.thousands.iterateLoop(parse);
    }
}



function getTextToNumberValue(input, base, decimals, thousands)
{
    let num   = Number.NaN;
    let value = input.value;

    value = value.replaceAll(thousands.value, '');
    console.log('value =', value);

    switch (base.value)
    {
        case 0: // dec
        {
            if (value.lastIndexOf(decimals.value) < 0)
                num = parseInt(value.replace(/\D/g, ''), 10);
            else
            {
                value = replaceLast(value, decimals.value, '.');
                num   = parseFloat(value);
            }
     
            break;
        }
        case 1: // hex
        {
            const decIndex = value.lastIndexOf(decimals.value);

            if (decIndex < -1)
                num = parseInt(value, 16);
            else
            {
                const whole = value.slice(0, decIndex);
                const frac  = value.slice(decIndex + decimals.value.length);

                num = 
                      parseInt(whole, 16)
                    + frac.split('')
                          .reduce((sum, digit, index) => sum + parseInt(digit, 16) / Math.pow(16, index + 1), 0);
            }

            break;
        }
    }

    return new NumberValue(num, decDigits(num));
}