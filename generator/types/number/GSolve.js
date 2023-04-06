class GSolve
extends GNumberType
{
    input = null;

    current;
    target;


    
    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSolve(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.current = this.current.copy();
        copy.target  = this.target .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const current = (await this.current.eval(parse)).toValue();
        const target  = (await this.target .eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            console.assert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');


            if (this.options.enabled)
            {
                // this.value.value = Math.min(Math.max(
                //     current.value,
                //     this.value.value),
                //     target.value);
            }
        }
        else
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'current', current);
        genPushUpdateValue(parse, this.nodeId, 'target',  target);
        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);


        this.validate();

        return this;
    }
}
