class GParseJson
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(PARSE_JSON, nodeId, options);
    }


    
    copy()
    {
        const copy = new GParseJson(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();


        if (this.input)
        {
            const input = await evalTextValue(this.input, parse);
            
            try
            {
                const json = JSON.parse(input.value);
                this.value = this.evalItems(json);
            }
            catch (e)
            {
                this.value = new ListValue();
            }
        }
    

        this.setUpdateValues(parse,
        [
            ['length',  new NumberValue(this.value.items.length)]
            //['value',   this.value]
        ]);
        

        if (parse.settings.showTextTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', this.value]
            ],
            true);
        }


        this.validate();

        return this;
    }



    evalItems(json)
    {
        let list = new ListValue();


        for (const key in json)
        {
            if (   typeof json[key] === 'object'
                && json[key] !== null)
            {
                const obj = this.evalItems(json[key]);
                obj.valueId = key;
                list.items.push(obj);
            }
            else
            {
                let value;

                if (   typeof json[key] === 'number'
                    || isValidFloatString(json[key]))
                    value = NumberValue.fromString(json[key].toString());
                else if (typeof json[key] === 'boolean')
                    value = new NumberValue(parseBool(json[key].toString()) ? 1 : 0);
                else
                    value = new TextValue(json[key]);

                    
                value.valueId = 
                    key == 'value'
                    ? '(value)' // reserved param name in Generator
                    : key;

                list.items.push(value);
            }
        }

        
        return list;
    }
}
