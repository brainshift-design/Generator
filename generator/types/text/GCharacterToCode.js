class GCharacterToCode
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_UNICODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCharacterToCode(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextValue(this.input, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getCharacterToCodeValue(item)
                        : NumberValue.NaN());   
                }
            }
            else
            {
                this.value = getCharacterToCodeValue(input);
            }
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            //['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getCharacterToCodeValue(input)
{
    return input.value.length > 0
         ? new NumberValue(input.value.charCodeAt(0))
         : NumberValue.NaN();
}