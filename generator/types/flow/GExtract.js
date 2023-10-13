class GExtract
extends GOperator1
{
    indices;


    
    constructor(nodeId, options)
    {
        super(SUBLIST, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSublist(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.indices) copy.indices = this.indices.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const indices = this.indices ? (await this.indices.eval(parse)).toValue() : null;


        this.value = new ListValue();

        let length = 0;
        

        if (   this.input
            && indices)
        {
            const input = (await this.input.eval(parse)).toValue();

            
            if (   input
                && input.items)
            {
                length = input.items.length;


                // const _end =
                //     end.isValid()
                //     ? end
                //     : new NumberValue(input.items.length);


                if (this.options.enabled)
                {
                    for (let i = 0; i < indices.items.length; i++)
                    {
                        const item = input.items[Math.round(indices.items[i].value)];
                        
                        this.value.items.push(item ? item.copy() : NullValue);
                        
                        if (   item
                            && this.value.objects) 
                            this.value.objects.push(...input.items[i].objects);
                    }
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
            //['fullLength', new NumberValue(length)                                                        ], // used to set start and end maxima
            ['indices',    indices                                                                        ]
        ]);
        

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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.indices) this.indices.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.indices) this.indices.iterateLoop(parse);
    }
}
