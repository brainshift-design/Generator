class GTextCSV
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_CSV, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCSV(this.nodeId, this.options);

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
            const input = (await this.input.eval(parse)).toValue();
            
            try
            {
                const rows = input.value.split('\n');

                for (const _row of rows)
                {
                    const cells = _row.split(',');

                    const row = new ListValue();

                    for (const cell of cells)
                        row.items.push(new TextValue(cell));

                    this.value.items.push(row);
                }
            }
            catch (e)
            {
                this.value = new ListValue();
            }
        }
    

        this.updateValues =
        [
            ['', NullValue] //['value', this.value]
        ];
        

        this.validate();

        return this;
    }



    // evalItems(json)
    // {
    //     let list = new ListValue();


    //     for (let key in json)
    //     {
    //         if (   typeof json[key] === 'object'
    //             && json[key] !== null)
    //         {
    //             const obj = this.evalItems(json[key]);
    //             obj.valueId = key;
    //             list.items.push(obj);
    //         }
    //         else
    //         {
    //             let value;

    //             if (   typeof json[key] === 'number'
    //                 || isValidFloatString(json[key]))
    //                 value = NumberValue.fromString(json[key].toString());
    //             else if (typeof json[key] === 'boolean')
    //                 value = new NumberValue(parseBool(json[key].toString()) ? 1 : 0);
    //             else
    //                 value = new TextValue(json[key]);

                    
    //             value.valueId = 
    //                 key == 'value'
    //                 ? '(value)' // reserved param name in Generator
    //                 : key;

    //             list.items.push(value);
    //         }
    //     }

        
    //     return list;
    // }
}
