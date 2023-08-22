class GSublist
extends GOperator1
{
    start;
    end;


    
    constructor(nodeId, options)
    {
        super(SUBLIST, nodeId, options);
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
                        for (let i = start.value; i < _end.value; i++)
                        {
                            const item = input.items[i];
                            
                            this.value.items.push(item ? item.copy() : NullValue);
                            
                            if (   item
                                && this.value.objects) 
                                this.value.objects.push(...input.items[i].objects);
                        }
                    }
                    else
                        this.value = input.copy();
                }
            }
            else
                this.value = ListValue.NaN.copy();
        }


        this.updateValueObjects();


        const type = 
            this.value
            ? new TextValue(finalListTypeFromItems(this.value.items))
            : TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['preview',    new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))],
            ['type',       type                                                                           ],
            ['length',     new NumberValue(this.value.items.length)                                                        ], // used to set start and end maxima
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.start) this.start.invalidateInputs(parse, from);
        if (this.end  ) this.end  .invalidateInputs(parse, from);
    }
}
