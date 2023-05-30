class GRotate
extends GOperator
{
    input      = null;
   
    angle      = null;
    centerX    = null;
    centerY    = null;
    showCenter = null;



    constructor(nodeId, options)
    {
        super(ROTATE, nodeId, options);
    }



    copy()
    {
        const copy = new GRotate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.angle     ) copy.angle      = this.angle     .copy();
        if (this.centerX   ) copy.centerX    = this.centerX   .copy();
        if (this.centerY   ) copy.centerY    = this.centerY   .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        //console.log('this.centerX =', this.centerX);
        const angle      = this.angle      ? (await this.angle     .eval(parse)).toValue() : null;
        const centerX    = this.centerX    ? (await this.centerX   .eval(parse)).toValue() : null;
        const centerY    = this.centerY    ? (await this.centerY   .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

       
        const _bounds = this.evalObjects(
            parse, 
            {
                angle:      angle, 
                centerX:    centerX, 
                centerY:    centerY,
                showCenter: showCenter
            });


        const bounds = new RectangleValue(
            this.nodeId,
            new NumberValue(_bounds.x     ), 
            new NumberValue(_bounds.y     ), 
            new NumberValue(_bounds.width ),
            new NumberValue(_bounds.height),
            new NumberValue(0),
            new NumberValue(0));


        this.updateValues =
        [
            ['value',      this.value],
            ['angle',      angle     ],
            ['centerX',    centerX   ],
            ['centerY',    centerY   ],
            ['showCenter', showCenter],
            ['bounds',     bounds    ]
        ];


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        this.objects = this.input ? this.input.objects.map(o => o.copy()) : [];
        //this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];


        if (!this.options.enabled)
            return;
            

        const bounds = getObjBounds(this.objects);


        const a  = options.angle.toNumber()/360*Tau;

        const cx = bounds.x + bounds.width  * options.centerX.toNumber()/100;
        const cy = bounds.y + bounds.height * options.centerY.toNumber()/100;


        const xform = mulm3m3(
            createTransform(cx, cy),
            [[ Math.cos(a), Math.sin(a), 0],
             [-Math.sin(a), Math.cos(a), 0],
             [ 0,           0,           1]],
            createTransform(-cx, -cy));
       

        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            if (   bounds.width  > 0
                && bounds.height > 0)
                obj.applyTransform(cx, cy, xform);
        }

        
        if (  !isEmpty(this.objects)
            && this.showCenter.toValue().value > 0)
        {
            const center = new FigmaPoint(
                this.nodeId,
                this.nodeId,
                this.nodeName + ' center',
                cx,
                cy,
                true)

            center.createDefaultTransform(cx, cy, 0);

            this.objects      .push(center);
            //this.value.objects.push(center);
        };


        await super.evalObjects(parse);


        return bounds;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input     ) this.input     .pushValueUpdates(parse);
        if (this.angle     ) this.angle     .pushValueUpdates(parse);
        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.angle     .isValid()
            && this.centerX   .isValid()
            && this.centerY   .isValid()
            && this.showCenter.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input     ) this.input     .invalidateInputs();
        if (this.angle     ) this.angle     .invalidateInputs();
        if (this.centerX   ) this.centerX   .invalidateInputs();
        if (this.centerY   ) this.centerY   .invalidateInputs();
        if (this.showCenter) this.showCenter.invalidateInputs();
    }



    toValue()
    {
        return this.value.copy();
    }
}