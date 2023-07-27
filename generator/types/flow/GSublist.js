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

        copy.start = this.start.copy();
        copy.end   = this.end  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const start  = (await this.start.eval(parse)).toValue();
        const end    = (await this.end  .eval(parse)).toValue();

        let   length = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
           
            
            length = input.items.length;
               
                
            if (start.value <= end.value)
            {
                if (this.options.enabled)
                {
                    this.value = new ListValue();

                    for (let i = start.value; i < end.value; i++)
                        this.value.items.push(input.items[i].copy());
                }
                else
                    this.value = input.copy();
            }
            else
                this.value = new ListValue();//TextValue.NaN;
        }
        else
            this.value = new ListValue();//TextValue.NaN;


        this.updateValues =
        [
            //['value',  this.value             ],
            ['length', new NumberValue(length)], // used to set start and end maxima
            ['start',  start                  ],
            ['end',    end                    ]
        ];
        

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
