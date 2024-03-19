class GAffine
extends GOperator1
{
    showCenter  = null;
    affectSpace = null;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.showCenter  = null;
        this.affectSpace = null;
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.showCenter ) this.showCenter  = base.showCenter .copy();
        if (base.affectSpace) this.affectSpace = base.affectSpace.copy();
    }



    async evalBaseParams(parse)
    {
        const showCenter  = await evalNumber(this.showCenter,  parse);
        const affectSpace = await evalNumber(this.affectSpace, parse);

        return [showCenter, affectSpace];
    }



    async evalAffineObjects(parse, options, scaleCorners, scaleStyle, getXform)
    {
        if (   !this.value
            || !this.value.isValid()
            || !this.input)
            return Rect.NaN;


        this.value.objects = getValidObjects(this.input.value);
        
        if (isListValueType(this.value.type))
        {
            for (let i = 0; i < this.value.items.length; i++)
                this.value.items[i].objects = this.value.objects.filter(o => o.itemIndex == i);
        }


        const bounds = getObjBounds(this.value.objects);
        const xform  = getXform();


        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


            if (this.options.enabled)
            {
                obj.applyTransform(
                    xform, 
                    options.affectSpace ? options.affectSpace.value > 0 : false);

                obj.scaleCorners *= Math.abs(scaleCorners);
                obj.scaleStyle   *= Math.abs(scaleStyle  );

                
                if (obj.type == TEXT_SHAPE)
                {
                    const sx = Math.sqrt(sqr(xform[0][0]) + sqr(xform[0][1]));
                    const sy = Math.sqrt(sqr(xform[1][0]) + sqr(xform[1][1]));

                    obj.size *= Math.min(sx, sy);
                }
            }
        }


        if (   this.value.type == VECTOR_PATH_VALUE
            && this.value.objects
            && this.value.objects.length > 0
            && this.value.points.objects)
        {
            for (let i = 0; i < this.value.objects[0].points.length; i++)
            {
                const p = this.value.objects[0].points[i].toPoint();

                this.value.points.objects[i].x = p.x;
                this.value.points.objects[i].y = p.y;
            }
        }


        if (options.showCenter ? options.showCenter.value > 0 : false)
        {
            const objects = [...this.value.objects]; // avoids infinite growth
            objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
        }


        return bounds;
    }



    isValid()
    {
        return super.isValid()
            && this.showCenter  && this.showCenter .isValid()
            && this.affectSpace && this.affectSpace.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.showCenter ) this.showCenter .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.showCenter ) this.showCenter .invalidateInputs(parse, from, force);
        if (this.affectSpace) this.affectSpace.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.showCenter ) this.showCenter .iterateLoop(parse);
        if (this.affectSpace) this.affectSpace.iterateLoop(parse);
    }
}