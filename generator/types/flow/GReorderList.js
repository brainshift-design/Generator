class GReorderList
extends GOperator1
{
    indices = null;


    
    constructor(nodeId, options)
    {
        super(REORDER_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.indices = null;
    }



    copy()
    {
        const copy = new GReorderList(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.indices) copy.indices = this.indices.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalListValue(this.input,   parse);
        const indices = await evalListValue(this.indices, parse);


        this.value         = new ListValue();
        this.value.objects = [];


        if (   input
            && input.items)
        {
            if (   this.options.enabled
                && indices
                && input.items
                && indices.items
                && input.items.length == indices.items.length)
            {
                this.value.items = new Array(input.items.length);

                for (let i = 0; i < input.items.length; i++)
                    this.value.items[i] = input.items[indices.items[i].value];
                

                for (let i = 0; i < this.value.items.length; i++)
                {
                    const item = this.value.items[i];

                    if (   item.objects
                        && this.value.objects)
                    {
                        const objects = ordered.objects.filter(o => o.itemIndex == itemIndex).map(o => o.copy());
                        objects.forEach(o => o.itemIndex = i);

                        this.value.objects.push(...objects);
                    }
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()],
            ['indices', indices              ]
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
            && this.indices && this.indices.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.indices) this.indices.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.indices) this.indices.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.indices) this.indices.iterateLoop(parse);
    }
}