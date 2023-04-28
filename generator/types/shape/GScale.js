class GScale
extends GOperator
{
    input = null;

    x     = null;
    y     = null;
    ox    = null;
    oy    = null;



    constructor(nodeId, options)
    {
        super(SCALE, nodeId, options);
    }



    copy()
    {
        const copy = new GScale(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.value) copy.value = this.value.copy();
        if (this.x    ) copy.x     = this.x    .copy();
        if (this.y    ) copy.y     = this.y    .copy();
        if (this.ox   ) copy.ox    = this.ox   .copy();
        if (this.oy   ) copy.oy    = this.oy   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const x  = this.x  ? (await this.x .eval(parse)).toValue() : null;
        const y  = this.y  ? (await this.y .eval(parse)).toValue() : null;
        const ox = this.ox ? (await this.ox.eval(parse)).toValue() : null;
        const oy = this.oy ? (await this.oy.eval(parse)).toValue() : null;


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
        genPushUpdateValue(parse, this.nodeId, 'x',     x         );
        genPushUpdateValue(parse, this.nodeId, 'y',     y         );
        genPushUpdateValue(parse, this.nodeId, 'ox',    ox        );
        genPushUpdateValue(parse, this.nodeId, 'oy',    oy        );


        await this.evalObjects(parse, {x: x, y: y, ox: ox, oy: oy});


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


        for (const obj of this.objects)
        {
            obj.nodeId = this.nodeId;
            
            obj.width  *= options.x.toNumber()/100;
            obj.height *= options.y.toNumber()/100;

            obj.x -= (obj.width  - bounds.width ) * options.ox.toNumber()/100;
            obj.y -= (obj.height - bounds.height) * options.oy.toNumber()/100;
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x .isValid()
            && this.y .isValid()
            && this.ox.isValid()
            && this.oy.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.x    ) this.x    .invalidate();
        if (this.y    ) this.y    .invalidate();
        if (this.ox   ) this.ox   .invalidate();
        if (this.oy   ) this.oy   .invalidate();
    }



    toValue()
    {
        return this.value.copy();
    }
}