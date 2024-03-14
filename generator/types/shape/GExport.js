class GExport
extends GShapeBase
{
    inputs = [];

    size;
    format;
 // contents;
 // crop;
    suffix;
    profile;



    constructor(nodeId, options)
    {
        super(EXPORT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
        
        this.size     = null;
        this.format   = null;
     // this.contents = null;
     // this.crop     = null;
        this.suffix   = null;
        this.profile  = null;
    }



    copy()
    {
        const copy = new GExport(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.size    ) copy.size     = this.size    .copy();
        if (this.format  ) copy.format   = this.format  .copy();
     // if (this.contents) copy.contents = this.contents.copy();
     // if (this.crop    ) copy.crop     = this.crop    .copy();
        if (this.suffix  ) copy.suffix   = this.suffix  .copy();
        if (this.profile ) copy.profile  = this.profile .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const size       = this.size     ? (await this.size.eval(parse)).toValue() : null;
        const format     = this.format   ? (await this.size.eval(parse)).toValue() : null;
     // const contents   = this.contents ? (await this.size.eval(parse)).toValue() : null;
     // const crop       = this.crop     ? (await this.size.eval(parse)).toValue() : null;
        const suffix     = this.suffix   ? (await this.size.eval(parse)).toValue() : null;
        const profile    = this.profile  ? (await this.size.eval(parse)).toValue() : null;


        // this.value = new ListValue();

        // this.value.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

            const objects = getValidObjects(this.inputs[i].value);
        
            
            for (let j = 0; j < objects.length; j++, o++)
            {
                let obj = objects[j];

                //obj = copyFigmaObject(obj);

                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                obj.listId   = -1;

                this.value.objects.push(obj);
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
            && this.size     && this.size    .isValid()
            && this.format   && this.format  .isValid()
         // && this.contents && this.contents.isValid()
         // && this.crop     && this.crop    .isValid()
            && this.suffix   && this.suffix  .isValid()
            && this.profile  && this.profile .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.size    ) this.size    .pushValueUpdates(parse);
        if (this.format  ) this.format  .pushValueUpdates(parse);
     // if (this.contents) this.contents.pushValueUpdates(parse);
     // if (this.crop    ) this.crop    .pushValueUpdates(parse);
        if (this.suffix  ) this.suffix  .pushValueUpdates(parse);
        if (this.profile ) this.profile .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.size    ) this.size    .invalidateInputs(parse, from, force);
        if (this.format  ) this.format  .invalidateInputs(parse, from, force);
     // if (this.contents) this.contents.invalidateInputs(parse, from, force);
     // if (this.crop    ) this.crop    .invalidateInputs(parse, from, force);
        if (this.suffix  ) this.suffix  .invalidateInputs(parse, from, force);
        if (this.profile ) this.profile .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.size    ) this.size    .iterateLoop(parse);
        if (this.format  ) this.format  .iterateLoop(parse);
     // if (this.contents) this.contents.iterateLoop(parse);
     // if (this.crop    ) this.crop    .iterateLoop(parse);
        if (this.suffix  ) this.suffix  .iterateLoop(parse);
        if (this.profile ) this.profile .iterateLoop(parse);
    }
}