class GTimer
extends GOperator
{
    input = null;

    delay = null;



    constructor(nodeId, options)
    {
        super(TIMER, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTimer(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.delay) copy.delay = this.delay.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const delay = (await this.delay.eval(parse)).toValue();
            

        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            this.value = input ? input : NullValue;
        }
        else
            this.value = null;//NullValue;
            

        this.updateValues = 
        [
            ['value', this.value],
            ['delay', delay     ]
        ];

        
        this.updateValueObjects();


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.delay) this.delay.invalidateInputs(from);
    }
}
