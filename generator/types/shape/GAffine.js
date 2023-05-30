class GAffine
extends GOperator
{
    input      = null;
   
    centerX    = null;
    centerY    = null;
    showCenter = null;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.input) 
            this.input = base.input.copy();

        if (base.centerX   ) this.centerX    = base.centerX   .copy();
        if (base.centerY   ) this.centerY    = base.centerY   .copy();
        if (base.showCenter) this.showCenter = base.showCenter.copy();
    }



    async evalBaseParams(parse)
    {
        const centerX    = this.centerX    ? (await this.centerX   .eval(parse)).toValue() : null;
        const centerY    = this.centerY    ? (await this.centerY   .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;

        return [centerX, centerY, showCenter];
    }



    async evalAffineObjects(parse, options, getXform)
    {
        this.objects = this.input ? this.input.objects.map(o => o.copy()) : [];
        //this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];


        const bounds = getObjBounds(this.objects);

        if (!this.options.enabled)
            return bounds;


        const singlePoint = 
               this.objects.length == 1 
            && this.objects[0].type == POINT;


        let _cx = options.centerX.toNumber();
        let _cy = options.centerY.toNumber();

        if (!singlePoint)
        {
            _cx /= 100;
            _cy /= 100;
        }


        const cx = singlePoint  ?  this.objects[0].x + _cx  :  bounds.x + bounds.width  * _cx;
        const cy = singlePoint  ?  this.objects[0].y + _cy  :  bounds.y + bounds.height * _cy;


        const xform = mulm3m3(
            createTransform(cx, cy),
            getXform(),
            createTransform(-cx, -cy));

        
        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            obj.applyTransform(xform);
        }

        
        if (  !isEmpty(this.objects)
            && this.showCenter.toValue().value > 0)
        {
            const center = new FigmaPoint(
                this.nodeId,
                this.nodeId   + '.center',
                this.nodeName + ' · center',
                cx,
                cy,
                true);

            center.createDefaultTransform(cx, cy, 0);

            this.objects.push(center);
        };


        await super.evalObjects(parse);


        return bounds;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input     ) this.input     .pushValueUpdates(parse);
        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.centerX   .isValid()
            && this.centerY   .isValid()
            && this.showCenter.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input     ) this.input     .invalidateInputs();
        if (this.centerX   ) this.centerX   .invalidateInputs();
        if (this.centerY   ) this.centerY   .invalidateInputs();
        if (this.showCenter) this.showCenter.invalidateInputs();
    }
}