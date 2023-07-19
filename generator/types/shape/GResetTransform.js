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


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

        
        await this.evalObjects(parse);


        this.updateValues = [['', NullValue]];


        this.validate();

        return this;
    }



    async evalObjects(parse)
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = 
                   this.input 
                && this.input.value
                ? this.input.value.objects.map(o => o.copy()) 
                : [];


            if (this.options.enabled)
            {
                for (const obj of this.value.objects)
                {
                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                    obj.createDefaultSpace();
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