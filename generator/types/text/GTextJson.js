class GTextJson
extends GOperator
{
    input;

    value;



    constructor(nodeId, options)
    {
        super(TEXT_JSON, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextJson(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            console.assert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');

            try
            {
                const json = JSON.parse(input.value);
                this.evalItems(json);
            }
            catch (e)
            {
                this.value = new ListValue();
            }
        }
    

        this.updateValues =
        [
            ['value', this.value]
        ];
        

        this.validate();

        return this;
    }



    evalItems(json)
    {
        for (let key in json)
        {
            if (   typeof json[key] === 'object'
                && json[key] !== null)
                this.evalItems(json[key]);                

            else
            {
                let value;

                if (typeof json[key] === 'number')
                    value = NumberValue.fromString(json[key].toString());
                else if (typeof json[key] === 'boolean')
                    value = new NumberValue(parseBool(json[key].toString()) ? 1 : 0);
                else
                    value = new TextValue(json[key]);

                    
                value.valueId = key;
                this.value.items.push(value);
            }
        }
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input    ) this.input    .pushValueUpdates(parse);
        if (this.value    ) this.value    .pushValueUpdates(parse);
        if (this.separator) this.separator.pushValueUpdates(parse);
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }



    invalidate()
    {
        super.invalidate();

        if (this.input    ) this.input    .invalidate();
        if (this.value    ) this.value    .invalidate();
        if (this.separator) this.separator.invalidate();
    }
}
