class GApply
extends GShape
{
    replace;



    constructor(nodeId, options)
    {
        super(SHAPE_APPLY, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.replace = null;
    }



    copy()
    {
        const copy = new GApply(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.replace) copy.replace = this.replace.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const [, , , ] = await this.evalBaseParams(parse);
        const replace  = (await this.replace.eval(parse)).toValue();



        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = input.copy();

            if (this.options.enabled)
                await this.evalShapeBase(parse, replace.value == 0, input);

            await this.evalObjects(parse);
        }
        else
        {
            await this.evalShapeBase(parse); // to updated anything connected to styles
            this.value = NullValue.copy();
        }

       
        this.setUpdateValues(parse, 
        [
            ['value', this.value       ],
            ['type',  this.outputType()]
        ]);


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
                obj.fills    = [];
                obj.strokes  = [];
                obj.effects  = [];

                obj.maskType = 0;
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