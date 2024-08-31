class GExtract
extends GOperator1
{
    indices     = null;

    // cachedValue = null;


    
    constructor(nodeId, options)
    {
        super(EXTRACT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.indices = null;
    
        // this.cachedValue = null;
    }



    copy()
    {
        const copy = new GExtract(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.indices) copy.indices = this.indices.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalListValue(this.input,   parse);
        let   indices = await evalValue    (this.indices, parse, () => null);


        this.value = new ListValue();

        let length = 0;
        

        console.log('indices =', indices);
        if (   indices 
            && indices.type == TEXT_VALUE)
            indices = new ListValue(parseIndexRanges(indices.value).map(i => new NumberValue(i)));


        if (   input
            && indices
            && input.items)
        {
            length = input.items.length;


            if (this.options.enabled)
            {
                for (let i = 0; i < indices.items.length; i++)
                {
                    const item = input.items[Math.round(indices.items[i].value)];

                    this.value.items.push(item ? item.copy() : new NullValue());
                    
                    if (   item
                        && item.objects
                        && this.value.objects) 
                        this.value.objects.push(...item.objects);
                }
            }
        }
        else
            this.value = ListValue.NaN.copy();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()                   ],
            ['length',  new NumberValue(this.value.items.length)], // used to set start and end maxima
            ['indices', indices                                 ]
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
