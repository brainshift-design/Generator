class GRound
extends GNumberType1
{
    type;
    decimals;



    constructor(nodeId, options)
    {
        super(NUMBER_ROUND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRound(this.nodeId, this.options);

        copy.copyBase(this);

        copy.type     = this.type    .copy();
        copy.decimals = this.decimals.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const type = (await this.type    .eval(parse)).toValue();
        const dec  = (await this.decimals.eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            
            if (this.options.enabled)
            {
                switch (type.value)
                {
                    case 0: this.value.value = floorTo(this.value.value, dec.value); break;
                    case 1: this.value.value = roundTo(this.value.value, dec.value); break;
                    case 2: this.value.value =  ceilTo(this.value.value, dec.value); break;
                }

                this.value.decimals = dec.value;
            }
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value',    this.value],
            ['type',     type      ],
            ['decimals', dec       ]
        ]);


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.type    ) this.type    .pushValueUpdates(parse);
        if (this.decimals) this.decimals.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.type    ) this.type    .invalidateInputs(from);
        if (this.decimals) this.decimals.invalidateInputs(from);
    }
}
