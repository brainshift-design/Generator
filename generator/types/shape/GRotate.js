class GRotate
extends GOperator
{
    input = null;

    angle = null;
    ox    = null;
    oy    = null;



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

        if (this.value) copy.value = this.value.copy();
        if (this.angle) copy.angle = this.angle.copy();
        if (this.ox   ) copy.ox    = this.ox   .copy();
        if (this.oy   ) copy.oy    = this.oy   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const angle = this.angle ? (await this.angle.eval(parse)).toValue() : null;
        const ox    = this.ox    ? (await this.ox   .eval(parse)).toValue() : null;
        const oy    = this.oy    ? (await this.oy   .eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

       
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'angle', angle     );
        genPushUpdateValue(parse, this.nodeId, 'ox',    ox        );
        genPushUpdateValue(parse, this.nodeId, 'oy',    oy        );


        await this.evalObjects(parse, {angle: angle, ox: ox, oy: oy});


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        this.objects = 
            this.input 
            ? clone(this.input.objects) 
            : [];


        let bounds = Rect.NaN;

        for (const obj of this.objects)
            bounds = expandRect(bounds, new Rect(obj.x, obj.y, obj.width, obj.height));


        const dx = options.ox.toNumber()/100 - 0.5;
        const dy = options.oy.toNumber()/100 - 0.5;


        for (const obj of this.objects)
        {
            obj.nodeId = this.nodeId;

            obj.angle += options.angle.toNumber(); 


            const angle = anglev_(
                /*bounds.x*/ + bounds.width /2, 
                /*bounds.y*/ + bounds.height/2,
                obj.x,
                obj.y);

            const halfd = distance_(
                /*bounds.x +*/ bounds.width /2,
                /*bounds.y +*/ bounds.height/2,
                obj.x,
                obj.y);


            const a  = obj.angle/360*Tau;
            const v  = vector(angle - a, halfd);


            obj.x = 
                  bounds.x 
                + bounds.width /2 
                + v.x 
                - dx * bounds.width  * Math.cos(-a) 
                - dy * bounds.height * Math.sin( a);

            obj.y = 
                  bounds.y
                + bounds.height/2
                + v.y 
                - dx * bounds.width  * Math.sin(-a) 
                - dy * bounds.height * Math.cos( a);
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.angle.isValid()
            && this.ox   .isValid()
            && this.oy   .isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
        if (this.angle ) this.angle .invalidate();
        if (this.ox    ) this.ox    .invalidate();
        if (this.oy    ) this.oy    .invalidate();
    }



    toValue()
    {
        return this.value.copy();
    }
}