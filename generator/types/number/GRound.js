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



    eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const type = this.type    .eval(parse).toValue();
        const dec  = this.decimals.eval(parse).toValue();


        if (this.input)
        {
            this.value = this.input.eval(parse).toValue();

            crashAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must belong to NUMBER_VALUE');

            
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


        genPushUpdateValue(parse, this.nodeId, 'type',     type);
        genPushUpdateValue(parse, this.nodeId, 'decimals', dec );
        genPushUpdateValue(parse, this.nodeId, 'value',    this.value);


        this.validate();

        return this;
    }
}
