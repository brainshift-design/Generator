class GNumberToText
extends GOperator1
{
    base;
    decimals;
    thousands;


    
    constructor(nodeId, options)
    {
        super(NUMBER_TO_TEXT, nodeId, options);
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
        const copy = new GNumberToText(this.nodeId, this.options);

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
                        item.type == NUMBER_VALUE
                        ? getNumberToTextValue(item, base, decimals, thousands)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getNumberToTextValue(input, base, decimals, thousands);
            }
        }

        else
            this.value = TextValue.NaN;


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



function getNumberToTextValue(input, base, decimals, thousands)
{
    return new TextValue(numToString(
         input.value, 
        -input.decimals, 
         base.value == 1, 
         decimals.value, 
         thousands.value));
}