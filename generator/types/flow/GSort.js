class GSort
extends GOperator1
{
    condition     = null;
    reverse       = null;

    firstSortNode = null;

    cachedValue   = null;


    
    constructor(nodeId, options)
    {
        super(SORT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.condition   = null;
        this.reverse     = null;
        
        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GSort(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.condition) copy.condition = this.condition.copy();
        if (this.reverse  ) copy.reverse   = this.reverse  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (   this.isCached()
            && this.cachedValue)
            return this;


        const input   = this.input   ? (await this.input  .eval(parse)).toValue() : null;
        const reverse = this.reverse ? (await this.reverse.eval(parse)).toValue() : null;


        this.value = new ListValue();
        this.value.objects = [];

        let maxColumns = 0;

        
        if (this.cachedValue)
            this.value = this.cachedValue.copy();

        else
        {
            if (   input
                && reverse)
            {
                const cond = this.condition ? (await this.condition.eval(parse)).toValue() : null;

                    
                if (this.options.enabled)
                {
                    if (  !this.condition
                        || this.condition.getOrderNode)
                    {
                        const orderNode = 
                            this.condition
                            ? this.condition.getOrderNode(parse)
                            : null;


                        if (  !this.condition
                            || orderNode)
                        {
                            const reverseMultiplier = reverse.value > 0 ? -1 : 1;
                            const unsorted          = [...input.items];


                            input.items = await asyncSort(
                                parse, 
                                unsorted, 
                                this.condition 
                                ? orderNode // specified sort
                                : null,     // default sort
                                this,
                                this.condition, 
                                reverseMultiplier);


                            input.items.forEach(i => maxColumns = Math.max(maxColumns, isListType(i.type) ? i.items.length : 1));
                            

                            for (let i = 0; i < input.items.length; i++)
                            {
                                const row       = input   .items[i];
                                const itemIndex = unsorted.indexOf(row);

                                this.value.items.push(row.copy());

                                if (   row.objects
                                    && this.value.objects)
                                {
                                    const objects = input.objects.filter(o => o.itemIndex == itemIndex).map(o => o.copy());
                                    objects.forEach(o => o.itemIndex = i);

                                    this.value.objects.push(...objects);
                                }
                            }
                        }
                    }
                    else
                        this.value = input;
                }
                else
                    this.value = input;
            }
            else
                this.value = new ListValue();


            this.cachedValue = this.value.copy();
        }


        this.updateValueObjects();


        const preview = new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)));


        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()],
            ['reverse', reverse              ]
        ]);
        

        if (parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.condition && this.condition.isValid()
            && this.reverse   && this.reverse  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.condition) this.condition.pushValueUpdates(parse);
        if (this.reverse  ) this.reverse  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.condition) this.condition.invalidateInputs(parse, from, force);
        if (this.reverse  ) this.reverse  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.condition) this.condition.iterateLoop(parse);
        if (this.reverse  ) this.reverse  .iterateLoop(parse);
    }
}



async function asyncSort(parse, array, orderNode, node, condition, reverseMultiplier)
{
    const sorted = [];

    for (const item of array)
    {
        const criterion = await getSortCriterion(parse, orderNode, node, condition, item);
        sorted.push({item, criterion});
    }


    sorted.sort((a, b) =>
    {
        if (a.criterion < b.criterion) return -1 * reverseMultiplier;
        if (a.criterion > b.criterion) return  1 * reverseMultiplier;

        return 0;
    });


    return sorted.map(_item => _item.item);
}



async function getSortCriterion(parse, orderNode, node, condition, item)
{
    if (!orderNode)
        return item.value;
    
    orderNode.reset();

    orderNode.input = item.copy();
    condition.invalidateInputs(parse, node, true); 

    //console.log('condition =', condition);
    return (await condition.eval(parse)).toValue().value;
}
