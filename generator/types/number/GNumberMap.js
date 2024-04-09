class GNumberMap
extends GOperator1
{
    from = null;
    to   = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_MAP, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
        this.to   = null;
    }



    copy()
    {
        const copy = new GNumberMap(this.nodeId, this.options);

        copy.copyBase(this);

        copy.from = this.from.copy();
        copy.to   = this.to  .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.from  || this.from.isCached())
            && (!this.to    || this.to  .isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input = await evalNumberValue(this.input, parse);
        const from  = await evalNumberValue(this.from,  parse);
        const to    = await evalNumberValue(this.to,    parse);


        if (input)
        {
            if (this.options.enabled)
            {
                const f = 0;

                // TODO get f from input


                const maxDec    = to.items.reduce((max, v) => Math.max(max, v.decimals), 0);

                const nSegments = Math.floor(to.items.length-1);
                const index     = Math.min(Math.floor((to.items.length-1) * f), nSegments-1);
        
        
                if (to.items.length == 1)
                    this.value = to.items[0];
        
                else if (to.items.length > 0
                      && index < to.items.length - deg)
                {
                    const localAmount = 
                        nSegments > 1
                        ? (f - index/nSegments) * nSegments
                        : f;
        
        
                    const val0 = to.items[index*deg  ];
                    const val1 = to.items[index*deg+1];
    
                    this.value = new NumberValue(
                        lerp(val0.value, val1.value, localAmount),
                        maxDec);
                }
            }
            else
                this.value = input//.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['from', from             ],
            ['to',   to               ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.from && this.from.isValid()
            && this.to   && this.to  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from) this.from.pushValueUpdates(parse);
        if (this.to  ) this.to  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from) this.from.invalidateInputs(parse, from, force);
        if (this.to  ) this.to  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
        if (this.to  ) this.to  .iterateLoop(parse);
    }
}
