class GSign
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER_SIGN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSign(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberOrListValue(this.input, parse);


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
                        ? getSignValue(item)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getSignValue(input);
}
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse, 
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getSignValue(input)
{
    consoleAssert(
         input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');

    return new NumberValue(Math.sign(input.value));
}