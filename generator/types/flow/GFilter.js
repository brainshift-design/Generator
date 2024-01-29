class GFilter
extends GOperator1
{
    condition = null;
    indices   = null;

    //firstSortNode = null;


    
    constructor(nodeId, options)
    {
        super(FILTER, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.condition = null;
        this.indices   = null;
    }



    copy()
    {
        const copy = new GFilter(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.condition) copy.condition = this.condition.copy();
        if (this.indices  ) copy.indices   = this.indices  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        this.value         = new ListValue();
        this.value.objects = [];

        let maxColumns = 0;

        
        this.indices = new ListValue();


        if (input)
        {
            if (this.options.enabled)
            {
                if (  !this.condition
                    || this.condition.getConditionNode)
                {
                    if (this.condition)
                        await this.condition.eval(parse);

                    const conditionNode = 
                        this.condition
                        ? this.condition.getConditionNode(parse)
                        : null;


                    if (  !this.condition
                        || conditionNode)
                    {
                        const unfiltered = [...input.items];


                        [input.items, this.indices.items] = await asyncFilter(
                            parse, 
                            unfiltered, 
                            conditionNode,
                            this,
                            this.condition);


                        input.items.forEach(i => maxColumns = Math.max(maxColumns, isListType(i.type) ? i.items.length : 1));
                        

                        for (let i = 0; i < input.items.length; i++)
                        {
                            const row       = input   .items[i];
                            const itemIndex = unfiltered.indexOf(row);

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
                    this.value = (await this.input.eval(parse)).toValue();
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()                   ],
            ['length',  new NumberValue(this.value.items.length)],
            ['indices', this.indices                            ]
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
            && (!this.condition || this.condition.isValid());
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



async function asyncFilter(parse, array, conditionNode, node, condition)
{
    const oldInput = conditionNode ? conditionNode.input : null;

    const filtered = [];
    const indices  = [];

    for (let i = 0; i < array.length; i++)
    {
        const item = array[i];

        const cond = await getFilterCondition(parse, conditionNode, node, condition, item);
        if (!cond) return array;
        
        const condValue = cond.toValue();
        // console.log('condition =', condition)

        if (   condValue.type == NUMBER_VALUE
            && condValue.value > 0)
        {
            filtered.push(item);
            indices .push(new NumberValue(i));
        }
    }

    if (conditionNode)
        conditionNode.input = oldInput;

    return [filtered, indices];
}



async function getFilterCondition(parse, conditionNode, node, condition, item)
{
    if (!conditionNode)
        return item;
    
    conditionNode.reset();

    const value = conditionNode.toValue();
    if (!value) return item;

    if (   value.type == item.type
        || value.type == ANY_VALUE)
    {
        conditionNode.input = item.copy();
        condition.invalidateInputs(parse, node, true); 
    }

    return await condition.eval(parse);
}