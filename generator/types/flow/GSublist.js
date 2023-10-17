class GSublist
extends GOperator1
{
    start = null;
    end   = null;


    
    constructor(nodeId, options)
    {
        super(SUBLIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.start = null;
        this.end   = null;
    }



    copy()
    {
        const copy = new GSublist(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start) copy.start = this.start.copy();
        if (this.end  ) copy.end   = this.end  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const start = this.start ? (await this.start.eval(parse)).toValue() : null;
        const end   = this.end   ? (await this.end  .eval(parse)).toValue() : null;


        this.value = new ListValue();
        this.value.objects = [];

        let length = 0;
        

        if (   this.input
            && start
            && end)
        {
            const input = (await this.input.eval(parse)).toValue();

            
            if (   input
                && input.items)
            {
                length = input.items.length;


                const _end =
                    end.isValid()
                    ? end
                    : new NumberValue(input.items.length);


                if (start.value < _end.value)
                {
                    if (this.options.enabled)
                    {
                        for (let i = start.value, j = 0; i < _end.value; i++, j++)
                        {
                            const item = input.items[i];
                            
                            this.value.items.push(item ? item.copy() : NullValue);
                            
                            if (   item
                                && this.value.objects
                                && input.objects)
                            {
                                const objects = input.objects.filter(o => o.itemIndex == i);
                                objects.forEach(o => o.itemIndex = j);

                                this.value.objects.push(...objects);
                            }
                        }
                    }
                    else
                        this.value = input;//.copy();
                }
            }
            else
                this.value = ListValue.NaN.copy();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['preview',    new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))],
            ['type',       this.outputListType()                                                          ],
            ['length',     new NumberValue(this.value.items.length)                                       ], // used to set start and end maxima
            ['fullLength', new NumberValue(length)                                                        ], // used to set start and end maxima
            ['start',      start                                                                          ],
            ['end',        end                                                                            ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.start && this.start.isValid()
            && this.end   && this.end  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start) this.start.invalidateInputs(parse, from, force);
        if (this.end  ) this.end  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
        if (this.end  ) this.end  .iterateLoop(parse);
    }
}
