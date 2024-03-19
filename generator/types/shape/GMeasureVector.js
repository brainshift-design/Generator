class GMeasureVector
extends GOperator1
{
    length = null;
    angle  = null;


    
    constructor(nodeId, options)
    {
        super(MEASURE_VECTOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.length = null;
        this.angle  = null;
    }



    copy()
    {
        const copy = new GMeasureVector(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.length) copy.length = this.length.copy();
        if (this.angle ) copy.angle  = this.angle .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalPointValue(this.input, parse);


        if (input)
        {
            const v   = input.toPoint();

            const len = lengthv(v);
            let   ang = anglev (v);

            if (ang > Tau/2) ang -= Tau;

            this.length = new NumberValue(len, -2);

            this.angle = 
                len > 0 
                ? new NumberValue(ang/Tau * 360, -2) 
                : NumberValue.NaN.copy();
        }
        else
        {
            this.length = NumberValue.NaN.copy();
            this.angle  = NumberValue.NaN.copy();
        }


        this.setUpdateValues(parse,
        [
            ['length', this.length],
            ['angle',  this.angle ]
        ]);
        

        this.validate();

        return this;
    }
}