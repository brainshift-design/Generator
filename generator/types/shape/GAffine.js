class GAffine
extends GOperator1
{
    centerX     = null;
    centerY     = null;
    showCenter  = null;
    affectSpace = null;

    coords;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);

        this.coords = clone(identity);
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.centerX    ) this.centerX     = base.centerX    .copy();
        if (base.centerY    ) this.centerY     = base.centerY    .copy();
        if (base.showCenter ) this.showCenter  = base.showCenter .copy();
        if (base.affectSpace) this.affectSpace = base.affectSpace.copy();

        this.coords = clone(base.coords);
    }



    async evalBaseParams(parse)
    {
        const centerX     = this.centerX     ? (await this.centerX    .eval(parse)).toValue() : null;
        const centerY     = this.centerY     ? (await this.centerY    .eval(parse)).toValue() : null;
        const showCenter  = this.showCenter  ? (await this.showCenter .eval(parse)).toValue() : null;
        const affectSpace = this.affectSpace ? (await this.affectSpace.eval(parse)).toValue() : null;

        return [centerX, centerY, showCenter, affectSpace];
    }



    async evalAffineObjects(parse, options, getXform)
    {
        if (this.value.isValid())
        {
            this.value.objects = 
                   this.input 
                && this.input.value
                ? this.input.value.objects.map(o => o.copy()) 
                : [];
        }
        

        const bounds = getObjBounds(this.value.objects);

        if (!this.options.enabled)
            return bounds;


        const singlePoint = 
               this.value.objects.length == 1 
            && this.value.objects[0].type == POINT;


        let _cx = options.centerX.toNumber();
        let _cy = options.centerY.toNumber();

        if (!singlePoint)
        {
            _cx /= 100;
            _cy /= 100;
        }


        const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + bounds.width  * _cx;
        const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + bounds.height * _cy;


        const xform = mulm3m3(
            createTransform(cx, cy),
            getXform(),
            createTransform(-cx, -cy));

        
        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            obj.applyTransform(xform, options.affectSpace.value > 0);

            this.coords = mulm3m3(this.coords, xform);
        }

        
        if (  !isEmpty(this.value.objects)
            && this.showCenter.toValue().value > 0)
            this.addCenterObject(cx, cy);


        //await super.evalObjects(parse);


        return bounds;
    }



    addCenterObject(cx, cy)
    {
        const center = new FigmaPoint(
            this.nodeId,
            this.nodeId   + '.center',
            this.nodeName + ' • center',
            cx,
            cy,
            true,
            true);

        center.createDefaultTransform(cx, cy);

        this.value.objects.push(center);
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