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
        const round = new GRound(this.nodeId, this.options);

        round.copyBase(this);

        if (this.input) 
            round.input = this.input.copy();

        round.type     = this.type    .copy();
        round.decimals = this.decimals.copy();

        return round;
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

            console.assert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must belong to NUMBER_VALUE');

            switch (type.value)
            {
                case 0: this.value.value = floorTo(this.value.value, dec.value); break;
                case 1: this.value.value = roundTo(this.value.value, dec.value); break;
                case 2: this.value.value =  ceilTo(this.value.value, dec.value); break;
            }

            this.value.decimals = dec.value;
        }
        else
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'type',     type);
        genPushUpdateValue(parse, this.nodeId, 'decimals', dec );
        genPushUpdateValue(parse, this.nodeId, 'value',    this.value);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
