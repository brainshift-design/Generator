class GPersist
extends GShapeBase
{
    inputs  = [];

    persist = null;

    finalize;



    constructor(nodeId, options)
    {
        super(PERSIST, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs  = [];
        this.persist = null;
    }



    copy()
    {
        const copy = new GPersist(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const persist  = await evalNumberValue(this.persist, parse);
        const finalize = this.finalize.value > 0;


        this.value = new ListValue();

        this.value.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

            const objects = getValidObjects(this.inputs[i].value);
        
            
            if (   this.options.enabled
                && (   finalize
                    || persist.value == 1))
            {
                for (let j = 0; j < objects.length; j++, o++)
                {
                    let obj = objects[j];

                    //obj = copyFigmaObject(obj);

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;

                    if (  (   !isEmpty(obj.fills  )
                           || !isEmpty(obj.strokes))
                        && !obj.isDeco)
                            obj.persist = finalize ? 2 : 1;
                            
                    this.value.objects.push(obj);
                }
            }
        }


        this.setUpdateValues(parse, [['', new NullValue()]]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && !this.inputs.find(i => !i.isValid())
            && this.persist && this.persist.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.persist) this.persist.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.persist) this.persist.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.persist) this.persist.iterateLoop(parse);
    }
}