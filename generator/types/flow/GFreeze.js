class GFreeze
extends GOperator
{
    input  = null;
    frozen = false;


    loopId  = NULL;



    constructor(nodeId, options)
    {
        super(FREEZE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GFreeze(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);

        if (      repeat
               && repeat.iteration == 0
            || !this.options.enabled)
            this.frozen = false;


        if (!this.frozen)
        {
            this.value = 
                this.input 
                ? (await this.input.eval(parse)).toValue()
                : NullValue;

            this.frozen = true;
        }


        this.updateValueObjects();


        this.updateValues = [['', NullValue]];


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
    }
}
