class GFreeze
extends GOperator1
{
    frozen = false;

    loopId = NULL;



    constructor(nodeId, options)
    {
        super(FREEZE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.frozen = false;
    }



    copy()
    {
        const copy = new GFreeze(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

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

            this.updateValueObjects();
        }


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }
}
