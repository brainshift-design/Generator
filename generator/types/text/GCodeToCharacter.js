class GCodeToCharacter
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_CHAR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCodeToCharacter(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


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
                        ? getCodeToCharacterValue(item)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getCodeToCharacterValue(input);
            }
        }
        else
            this.value = TextValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            //['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getCodeToCharacterValue(input)
{
    return new TextValue(String.fromCharCode(Math.min(Math.max(0, input.value), 0xffff)));
}