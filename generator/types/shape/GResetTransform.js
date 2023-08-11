class GResetTransform
extends GOperator1
{
    showCenter = null;



    constructor(nodeId, options)
    {
        super(RESET_XFORM, nodeId, options);
    }



    copy()
    {
        const copy = new GResetTransform(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
            this.value = NullValue.copy();

        
        await this.evalObjects(parse, { showCenter: showCenter });


        this.setUpdateValues(parse,
        [
            ['showCenter', showCenter]
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


            const showCenter = options.showCenter.value;


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


            if (showCenter)
            {
                const objects = [...this.value.objects]; // avoids infinite growth
                objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
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
            && this.showCenter && this.showCenter.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



   invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.showCenter) this.showCenter.invalidateInputs(from);
    }
}