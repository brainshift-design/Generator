class GFilter
extends GOperator1
{
    condition = null;

    //firstSortNode = null;


    
    constructor(nodeId, options)
    {
        super(FILTER, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.condition = null;
    }



    copy()
    {
        const copy = new GFilter(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.condition) copy.condition = this.condition.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        this.value = new ListValue();
        this.value.objects = [];

        let maxColumns = 0;

        
        if (   input
            && this.condition)
        {
            const condition = this.condition ? (await this.condition.eval(parse)).toValue() : null;

                
            // if (this.options.enabled)
            // {
                // if (   input 
                //     && this.condition
                //     && this.condition.getOrderNode)
                // {
                //     const orderNode = this.condition.getOrderNode(parse);


                //     if (orderNode)
                //     {
                //         const reverseMultiplier = reverse.value > 0 ? -1 : 1;
                //         const unsorted          = [...input.items];


                //         input.items = await asyncSort(
                //             parse, 
                //             unsorted, 
                //             orderNode, 
                //             this,
                //             this.condition, 
                //             reverseMultiplier);
                        

                //         input.items.forEach(i => maxColumns = Math.max(maxColumns, isListType(i.type) ? i.items.length : 1));
                        

                //         for (let i = 0; i < input.items.length; i++)
                //         {
                //             const row       = input   .items[i];
                //             const itemIndex = unsorted.indexOf(row);

                //             this.value.items.push(row.copy());

                //             if (   row.objects
                //                 && this.value.objects)
                //             {
                //                 const objects = input.objects.filter(o => o.itemIndex == itemIndex).map(o => o.copy());
                //                 objects.forEach(o => o.itemIndex = i);

                //                 this.value.objects.push(...objects);
                //             }
                //         }
                //     }
                // }
                // else
                //     this.value = input;
            // }
            // else
                this.value = input;
        }
        else
            this.value = new ListValue();


        this.updateValueObjects();


        const preview = new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)));


        this.setUpdateValues(parse,
        [
            ['preview', preview                                 ],
            ['type',    this.outputListType()                   ],
            ['length',  new NumberValue(this.value.items.length)]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.condition && this.condition.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.condition) this.condition.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.condition) this.condition.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.condition) this.condition.iterateLoop(parse);
    }
}