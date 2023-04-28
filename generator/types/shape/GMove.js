class GMove
extends GOperator
{
    input = null;

    x     = null;
    y     = null;



    constructor(nodeId, options)
    {
        super(MOVE, nodeId, options);
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.value) copy.value = this.value.copy();
        if (this.x    ) copy.x     = this.x    .copy();
        if (this.y    ) copy.y     = this.y    .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const x = this.x ? (await this.x.eval(parse)).toValue() : null;
        const y = this.y ? (await this.y.eval(parse)).toValue() : null;


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


        await this.evalObjects(parse);


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


        for (const obj of this.objects)
        {
            obj.nodeId = this.nodeId;

            obj.x += this.x.toNumber();
            obj.y += this.y.toNumber();
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x.isValid()
            && this.y.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
        if (this.x     ) this.x     .invalidate();
        if (this.y     ) this.y     .invalidate();
    }



    toValue()
    {
        return this.value;
    }
}