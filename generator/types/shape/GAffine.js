class GAffine
extends GOperator1
{
    showCenter  = null;
    affectSpace = null;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.showCenter ) this.showCenter  = base.showCenter .copy();
        if (base.affectSpace) this.affectSpace = base.affectSpace.copy();
    }



    async evalBaseParams(parse)
    {
        const showCenter  = this.showCenter  ? (await this.showCenter .eval(parse)).toValue() : null;
        const affectSpace = this.affectSpace ? (await this.affectSpace.eval(parse)).toValue() : null;

        return [showCenter, affectSpace];
    }



    async evalAffineObjects(parse, options, scaleCorners, scaleStyle, getXform)
    {
        if (   !this.value
            || !this.value.isValid())
            return Rect.NaN;


        this.value.objects = getValidObjects(this.input);
        

        const bounds = getXformBounds(this.value.objects);
        const xform  = getXform();


        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            //obj.updateTransformPoints();


            if (this.options.enabled)
            {
                obj.applyTransform(xform, options.affectSpace.value > 0);

                obj.scaleCorners *= Math.abs(scaleCorners);
                obj.scaleStyle   *= Math.abs(scaleStyle);
            }
        }


        if (options.showCenter.value > 0)
        {
            const objects = [...this.value.objects]; // avoids infinite growth
            objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
        }


        return bounds;
    }



    isValid()
    {
        return super.isValid()
            && this.centerX    .isValid()
            && this.centerY    .isValid()
            && this.showCenter .isValid()
            && this.affectSpace.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.centerX    ) this.centerX    .pushValueUpdates(parse);
        if (this.centerY    ) this.centerY    .pushValueUpdates(parse);
        if (this.showCenter ) this.showCenter .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.centerX    ) this.centerX    .invalidateInputs(from);
        if (this.centerY    ) this.centerY    .invalidateInputs(from);
        if (this.showCenter ) this.showCenter .invalidateInputs(from);
        if (this.affectSpace) this.affectSpace.invalidateInputs(from);
    }
}