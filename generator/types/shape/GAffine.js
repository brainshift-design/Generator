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


            this.value.objects = 
                   this.input 
                && this.input.value
                ? this.input.value.objects
                    .filter(o => 
                           o.isDeco  === false
                        || o.isXform === true)
                    .map(o => o.copy()) 
                : [];
        

        const bounds = getObjBounds(this.value.objects);

        if (!this.options.enabled)
            return bounds;


        // const singlePoint = 
        //        this.value.objects.length == 1 
        //     && this.value.objects[0].type == POINT;


        // let _cx = options.centerX.value;
        // let _cy = options.centerY.value;

        // if (!singlePoint)
        // {
        //     _cx /= 100;
        //     _cy /= 100;
        // }


        //const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + _cx * bounds.width ;
        //const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + _cy * bounds.height;


        const xform = getXform();
        // mulm3m3(
        //     createTransform(cx, cy),
        //     getXform(),
        //     createTransform(-cx, -cy));


        const objects = [...this.value.objects];

        for (const obj of objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


            obj.applyTransform(xform, options.affectSpace.value > 0, false);

            obj.scaleCorners *= Math.abs(scaleCorners);
            obj.scaleStyle   *= Math.abs(scaleStyle);


            if (options.showCenter.value > 0)
                addObjectCenter(this, obj, parse.viewportZoom);
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



// function addCenterObject(node, cx, cy, index = null)
// {
//     const center = new FigmaPoint(
//         node.nodeId,
//         node.nodeId   + PROP_SEPARATOR   + 'center' + (index ? PROP_SEPARATOR   + index : ''),
//         node.nodeName + CENTER_SEPARATOR + 'center' + (index ? CENTER_SEPARATOR + index : ''),
//         cx,
//         cy,
//         true,
//         true);

//     center.createDefaultTransform(cx, cy);

//     node.value.objects.push(center);
// }
