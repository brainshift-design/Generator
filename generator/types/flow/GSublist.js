class GSublist
extends GOperator
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
           
            
            length = input.items.length;
               
                
            if (start.value <= end.value)
            {
                if (this.options.enabled)
                {
                    for (let i = start.value; i < end.value; i++)
                    {
                        this.value.items.push(input.items[i].copy());
                        this.value.objects.push(...input.items[i].objects);
                    }
                }
                else
                    this.value = input.copy();
            }
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['length', new NumberValue(length)], // used to set start and end maxima
            ['start',  start                  ],
            ['end',    end                    ]
        ]);
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start) this.start.invalidateInputs(from);
        if (this.end  ) this.end  .invalidateInputs(from);
    }
}
