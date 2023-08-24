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


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

        
            if (   this.options.enabled
                && (   finalize
                    || retain.value == 1))
            {
                for (let j = 0; j < this.inputs[i].value.objects.length; j++, o++)
                {
                    let obj = this.inputs[i].value.objects[j];

                    obj = copyFigmaObject(obj);

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;


                    if (  (   !isEmpty(obj.fills  )
                           || !isEmpty(obj.strokes))
                        && !obj.isDeco)
                        // && (   finalize
                        //     || retain.value == 1))
                            obj.retain = finalize ? 2 : 1;
                            

                    this.value.objects.push(obj);
                }
            }
        }


        this.setUpdateValues(parse, [['', NullValue]]);


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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.inputs.forEach(i => i.invalidateInputs(parse, from));

        if (this.retain) this.retain.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.retain) this.retain.iterateLoop(parse);
    }
}