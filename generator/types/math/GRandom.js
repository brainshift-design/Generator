class GRandom
extends GNumberType
{
    seed;
    min;
    max;



    constructor(nodeId, options)
    {
        super(NUMBER_RANDOM, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;


        this.seed.eval(parse);
        this.min .eval(parse);
        this.max .eval(parse);

        const seed = this.seed.toValue();
        const min  = this.min .toValue();
        const max  = this.max .toValue();


        this.value = new NumberValue(0);


        genPushUpdateValue(parse, this.nodeId, 'seed', seed);
        genPushUpdateValue(parse, this.nodeId, 'min',  min );
        genPushUpdateValue(parse, this.nodeId, 'max',  max );


        this.valid = true;
    }
}
