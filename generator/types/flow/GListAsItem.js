class GListAsItem
extends GOperator1
{
    // cachedValue = null;



    constructor(nodeId, options)
    {
        super(LIST_AS_ITEM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        // this.cachedValue = null;
    }



    copy()
    {
        const copy = new GListAsItem(this.nodeId, this.options);

        copy.copyBase(this);

        //copy.value  = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (   this.isCached())
            // && this.cachedValue)
            return this;


        this.value = new ListValue();
        this.value.condensed = true;

        let length = 0;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        // if (this.cachedValue)
        //     this.value = this.cachedValue.copy();

        // else
        // {
            if (input)
            {
                length = input.items.length;
                
                    
                if (   isListType(input.type)
                    && this.options.enabled)
                {
                    for (const item of input.items)
                    {
                        const copy = item.copy();

                        this.value.items.push(copy);
                        //this.value.objects.push(...copy.objects);
                    }
                }
                else
                {
                    const copy = input.copy();

                    this.value.items.push(copy);
                    this.value.objects.push(...copy.objects);
                }
            }
            else
                this.value = new ListValue();


            // this.cachedValue = this.value.copy();
        // }
    

        this.updateValueObjects();
    

        this.setUpdateValues(parse,
        [
            ['length', new NumberValue(length)                              ],
            ['type', new TextValue(finalListTypeFromItems(this.value.items))]
        ]);
        

        this.validate();

        return this;
    }
}
