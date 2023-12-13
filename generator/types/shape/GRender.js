class GRender
extends GShapeBase
{
    inputs = [];

    retain = null;

    finalize;



    constructor(nodeId, options)
    {
        super(RENDER, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
        this.retain = null;
    }



    copy()
    {
        const copy = new GRender(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const retain   = (await this.retain.eval(parse)).toValue();
        const finalize = this.finalize.value > 0;


        this.value = new ListValue();

        this.value.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

            const objects = getValidObjects(this.inputs[i].value);
        
            
            if (   this.options.enabled
                && (   finalize
                    || retain.value == 1))
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
                            obj.retain = finalize ? 2 : 1;
                            
                    this.value.objects.push(obj);
                }
            }
        }


        this.setUpdateValues(parse, [['', new NullValue()]]);


        this.validate();

        return this;
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
            && !this.inputs.find(i => !i.isValid())
            && this.retain && this.retain.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.retain) this.retain.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.retain) this.retain.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.retain) this.retain.iterateLoop(parse);
    }
}