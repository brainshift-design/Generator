class GShowCenter
extends GOperator1
{
    show = null;



    constructor(nodeId, options)
    {
        super(SHOW_CENTER, nodeId, options);
    }



    copy()
    {
        const copy = new GShowCenter(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.show) copy.show = this.show.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue      (this.input, parse);
        const show  = await evalNumberValue(this.show,  parse);


        if (   input
            && show)
        {
            this.value = input;

            this.value.nodeId = this.nodeId;
        }
        else
            this.value = new NullValue();

        
        await this.evalObjects(parse, {show: show && show.value > 0});


        const type = this.outputType();

        this.setUpdateValues(parse,
        [
            ['type', type],
            ['show', show]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = getValidObjects(this.input.value);


            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                
                if (   this.options.enabled
                    && options.show)
                    obj.showCenter = options.show;
            }
        }
        
        
        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value
        ? this.value.copy()
        : null;
    }



    isValid()
    {
        return super.isValid()
            && this.show && this.show.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.show) this.show.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.show) this.show.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.show) this.show.iterateLoop(parse);
    }
}