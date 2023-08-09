class GApply
extends GShape
{
    constructor(nodeId, options)
    {
        super(SHAPE_APPLY, nodeId, options);
    }



    copy()
    {
        const copy = new GApply(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const [, , , ] = await this.evalBaseParams(parse);


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = input.copy();

            if (this.options.enabled)
                await this.evalShapeBase(parse);

            await this.evalObjects(parse);
        }
        else
        {
            await this.evalShapeBase(parse); // to updated anything connected to styles
            this.value = NullValue.copy();
        }

       
        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (this.value.isValid())
        {
            this.value.objects = 
                   this.input 
                && this.input.value
                ? this.input.value.objects.map(o => o.copy()) 
                : [];
        }

            
        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            if (this.options.enabled)
            {
                obj.fills   = [];
                obj.strokes = [];
                obj.effects = [];

                obj.isMask  = false;
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