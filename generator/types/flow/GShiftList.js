class GShiftList
extends GOperator1
{
    offset = null;


    
    constructor(nodeId, options)
    {
        super(SHIFT_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.offset = null;
    }



    copy()
    {
        const copy = new GShiftList(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.offset) copy.offset = this.offset.copy();

        return copy;
    }



    async eval(parse)
    {
        if (   this.isCached())
            // && this.cachedValue)
            return this;


        const input  = await evalListValue  (this.input,  parse);
        const offset = await evalNumberValue(this.offset, parse);


        let length = 0;
            

        this.value = new ListValue();
        this.value.objects = [];


        if (   input
            && offset)
        {
            if (input.items)
            {
                length = input.items.length;

                if (this.options.enabled)
                {
                    let _offset = -(offset.value % input.items.length);
                    while (_offset < 0) _offset += input.items.length;

                    let j = 0;
                    for (let i = _offset; i < input.items.length; i++, j++)
                        this.addItem(input, i, j);

                    for (let i = 0; i < _offset; i++, j++)
                        this.addItem(input, i, j);
                }
                else
                    this.value = input.copy();
            }
            else
                this.value = ListValue.NaN();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',       this.outputListType()                          ],
            ['length',     new NumberValue(this.value.items.length)       ], // used to set start and end maxima
            ['offset',     offset                                         ]
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



    addItem(input, i, j)
    {
        const item = input.items[i];

        this.value.items.push(item ? item.copy() : new NullValue());
        
        if (   item
            && this.value.objects
            && input.objects)
        {
            // const objects = input.objects.filter(o => o.itemIndex == i);
            item.objects.forEach(o => o.itemIndex = j);

            this.value.objects.push(...item.objects);
        }
    }



    isValid()
    {
        return super.isValid()
            && this.offset && this.offset.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.offset) this.offset.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.offset) this.offset.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.offset) this.offset.iterateLoop(parse);
    }
}
