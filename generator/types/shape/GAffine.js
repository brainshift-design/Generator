class GAffine
extends GOperator1
{
    centerX     = null;
    centerY     = null;
    showCenter  = null;
    affectSpace = null;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.centerX    ) this.centerX     = base.centerX    .copy();
        if (base.centerY    ) this.centerY     = base.centerY    .copy();
        if (base.showCenter ) this.showCenter  = base.showCenter .copy();
        if (base.affectSpace) this.affectSpace = base.affectSpace.copy();
    }



    async evalBaseParams(parse)
    {
        const centerX     = this.centerX     ? (await this.centerX    .eval(parse)).toValue() : null;
        const centerY     = this.centerY     ? (await this.centerY    .eval(parse)).toValue() : null;
        const showCenter  = this.showCenter  ? (await this.showCenter .eval(parse)).toValue() : null;
        const affectSpace = this.affectSpace ? (await this.affectSpace.eval(parse)).toValue() : null;

        return [centerX, centerY, showCenter, affectSpace];
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


        const singlePoint = 
               this.value.objects.length == 1 
            && this.value.objects[0].type == POINT;


        let _cx = options.centerX.value;
        let _cy = options.centerY.value;

        if (!singlePoint)
        {
            _cx /= 100;
            _cy /= 100;
        }


        const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + _cx * bounds.width ;
        const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + _cy * bounds.height;


        const xform = mulm3m3(
            createTransform(cx, cy),
            getXform(),
            createTransform(-cx, -cy));


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



function addObjectCenter(node, obj, zoom)
{
    const length = 10;
    
    const sp0 =      obj.sp0;
    const sp1 = addv(obj.sp0, mulvs(subv(      obj.sp1,      obj.sp0), length));
    const sp2 = addv(obj.sp0, mulvs(subv(mulvs(obj.sp2, -1), obj.sp0), length));    

    const x = createFigmaLine(node, sp0, sp1, [12, 140, 233], ' _ x');
    const y = createFigmaLine(node, sp0, sp2, [12, 140, 233], ' _ y');

    node.value.objects.push(x);
    node.value.objects.push(y);
}



function createFigmaLine(node, p0, p1, color, suffix)
{
    const line = new FigmaVectorPath(
        node.nodeId,
        node.nodeId   + suffix,
        node.nodeName + suffix,
        [PointValue.fromPoint(node.nodeId, p0), 
         PointValue.fromPoint(node.nodeId, p1)],
        0, 0, 0, 0);


    line.strokes.push([
        'SOLID', 
        color[0], 
        color[1], 
        color[2], 
        100, 
        'NORMAL']);

    line.strokeWeight = 1;
    line.strokeAlign  = 'CENTER';
    line.strokeJoin   = 'MITER';
    line.strokeCap    = 'NONE';
    line.isDeco       = true;


    line.createDefaultTransform(p0.x, p0.y);

    line.updatePathPoints();
    line.updatePathData();


    return line;
}