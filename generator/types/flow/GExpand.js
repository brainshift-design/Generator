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

        //copy.value  = this.value.copy();

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
                        const copy = item.copy();

                        this.value.items.push(copy);
                        this.value.objects.push(...copy.objects);
                    }
                }
                else
                {
                    const copy = input.copy();

                    this.value.items.push(copy);
                    this.value.objects.push(...copy.objects);
                }
            }
        }


        this.updateValueObjects();
    
        if (this.nodeId == 'expand2')
            console.log('this.value.objects =', [...this.value.objects]);


        this.setUpdateValues(parse,
        [
            ['length', new NumberValue(length)                              ],
            ['type', new TextValue(finalListTypeFromItems(this.value.items))]
        ]);
        

        this.validate();

        return this;
    }
}
