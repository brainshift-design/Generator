class GExpand
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(EXPAND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GExpand(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();
        this.value.expanded = true;

        let length = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
                       
            length = input.items.length;
               
                
            if (input)
            {
                if (   LIST_VALUES.includes(input.type)
                    && this.options.enabled)
                {
                    for (const item of input.items)
                    {
                        this.value.items.push(item.copy());
                        this.value.objects.push(...item.objects.map(o => o.copy()));
                    }
                }
                else
                {
                    this.value.items.push(input.copy());
                    this.value.objects.push(...input.objects.map(o => o.copy()));
                }
            }
        }


        this.updateValueObjects();


        this.updateValues =
        [
            ['length', new NumberValue(length)                              ],
            ['type', new TextValue(finalListTypeFromItems(this.value.items))]
        ];
        

        this.validate();

        return this;
    }
}
