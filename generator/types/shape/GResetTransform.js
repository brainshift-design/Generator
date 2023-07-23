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
            this.value = NullValue;

        
        await this.evalObjects(parse, { showCenter: showCenter });


        this.updateValues = [['showCenter', showCenter]];


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = getValidObjects(this.input);


            const bounds = getObjBounds(this.value.objects);


            const singlePoint =
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;


            let _cx = 50;
            let _cy = 50;

            if (!singlePoint)
            {
                _cx /= 100;
                _cy /= 100;
            }


            const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + _cx * bounds.width;
            const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + _cy * bounds.height;            
            
            
            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                {
                    obj.createDefaultSpace();

                    const ds1 = subv(obj.sp1, obj.sp0);
                    const ds2 = subv(obj.sp2, obj.sp0);

                    obj.sp0 = point(cx, cy);
                    obj.sp1 = addv(obj.sp0, ds1);
                    obj.sp2 = addv(obj.sp0, ds2);
                }
            }


            const objects = [...this.value.objects]; // avoids infinite growth

            for (const obj of objects)
                addObjectCenter(this, obj, parse.viewportZoom);
        }
        
        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.showCenter.isValid();
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
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