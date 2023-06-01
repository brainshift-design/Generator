class GRound
extends GNumberType
{
    input = null;

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

        if (this.input) 
            copy.input = this.input.copy();

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

            console.assert(
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


        this.updateValues =
        [
            ['type',     type      ],
            ['decimals', dec       ],
            ['value',    this.value]
        ];


        this.validate();

        return this;
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input   ) this.input   .invalidateInputs(from);
        if (this.type    ) this.type    .invalidateInputs(from);
        if (this.decimals) this.decimals.invalidateInputs(from);
    }
}
