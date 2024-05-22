class GResetTransform
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(RESET_XFORM, nodeId, options);
    }



    copy()
    {
        const copy = new GResetTransform(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue(this.input, parse);


        if (input)
        {
            this.value = input;

            this.value.nodeId = this.nodeId;
        }
        else
            this.value = new NullValue();

        
        await this.evalObjects(parse);


        const type = this.outputType();

        this.setUpdateValues(parse,
        [
            ['type', type]
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


            const bounds = getObjBounds(this.value.objects);

            const singlePoint =
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;


            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                {
                    obj.createDefaultSpace();
                    obj.resetSpace(bounds, singlePoint);
                }
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
}