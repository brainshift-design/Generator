class GAffine
extends GOperator1
{
    centerX     = null;
    centerY     = null;
    showCenter  = null;
    affectSpace = null;

    //coords;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);

        //this.coords = clone(identity);
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.centerX    ) this.centerX     = base.centerX    .copy();
        if (base.centerY    ) this.centerY     = base.centerY    .copy();
        if (base.showCenter ) this.showCenter  = base.showCenter .copy();
        if (base.affectSpace) this.affectSpace = base.affectSpace.copy();

        //this.coords = clone(base.coords);
    }



    async evalBaseParams(parse)
    {
        const centerX     = this.centerX     ? (await this.centerX    .eval(parse)).toValue() : null;
        const centerY     = this.centerY     ? (await this.centerY    .eval(parse)).toValue() : null;
        const showCenter  = this.showCenter  ? (await this.showCenter .eval(parse)).toValue() : null;
        const affectSpace = this.affectSpace ? (await this.affectSpace.eval(parse)).toValue() : null;

        return [centerX, centerY, showCenter, affectSpace];
    }



    async evalAffineObjects(options, scaleCorners, scaleStyle, getXform)
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

        
        // const centers = [];


        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


            obj.applyTransform(xform, options.affectSpace.value > 0, false);

            obj.scaleCorners *= Math.abs(scaleCorners);
            obj.scaleStyle   *= Math.abs(scaleStyle);


            if (options.showCenter.value > 0)
            {
                addObjectCenter(this, obj);
                // const c = clone(obj.sp0);
                // pushUniqueBy(centers, c, p => equalv(p, c));
            }
        }


        // for (let i = 0; i < centers.length; i++)
        // {
        //     addCenterObject(
        //         this,
        //         centers[i].x + _cx * bounds.width, 
        //         centers[i].y + _cy * bounds.height,
        //         i);
        // }

        // addCenterObject(
        //     this,
        //     this.coords[0][2] + _cx * bounds.width, 
        //     this.coords[1][2] + _cy * bounds.height);

        
        //this.coords = mulm3m3(this.coords, xform);


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



function addObjectCenter(node, obj)
{
    const x = createFigmaLine(node, obj.sp0,       obj.sp1,      [255, 0, 0], ' _ x');
    const y = createFigmaLine(node, obj.sp0, mulvs(obj.sp2, -1), [255, 0, 0], ' _ y');

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


    line.createDefaultTransform(p0.x, p0.y);

    line.updatePathPoints();
    line.updatePathData();


    return line;
}