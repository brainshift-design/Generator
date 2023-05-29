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

        //if (this.value) copy.value = this.value.copy();
        if (this.x) copy.x = this.x.copy();
        if (this.y) copy.y = this.y.copy();

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

        
        this.evalObjects(parse, {x: x, y: y});


        this.updateValues =
        [
            ['value', this.value],
            ['x',     x         ],
            ['y',     y         ]
        ];


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        this      .objects = this.input ? this.input.objects.map(o => o.copy()) : [];
        this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];

            
        if (!this.options.enabled)
            return;
            

        const x = options.x.toNumber();
        const y = options.y.toNumber();

        const xform = 
            [[1, 0, x],
             [0, 1, y],
             [0, 0, 1]];

             
        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            obj.applyTransform(0, 0, xform);
        }

        
        super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.x    ) this.x    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x.isValid()
            && this.y.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input ) this.input .invalidateInputs();
        if (this.x     ) this.x     .invalidateInputs();
        if (this.y     ) this.y     .invalidateInputs();
    }



    toValue()
    {
        return this.value.copy();
    }
}