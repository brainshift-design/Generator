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
        if (!this.options.enabled)
            return;
            

        this.objects = 
            this.input 
            ? this.input.objects.map(o => o.copy())
            : [];

            
        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


            let xform = clone(obj.relativeTransform);


            xform = mulm3m3(
                xform,
                [[1, 0, options.x.toNumber()],
                 [0, 1, options.y.toNumber()],
                 [0, 0, 1                   ]]);


            obj.relativeTransform = xform;


            // if (obj.type == VECTOR_PATH)
            // {
            //     for (const p of obj.points)
            //     {
            //         p.x.value += options.x.toNumber();
            //         p.y.value += options.y.toNumber();
            //     }

            //     FigmaVectorPath.prototype.updatePathData.call(obj);
            // }
            // else
            // {
            //     obj.x += options.x.toNumber();
            //     obj.y += options.y.toNumber();
            // }
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



    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
        if (this.x     ) this.x     .invalidate();
        if (this.y     ) this.y     .invalidate();
    }



    toValue()
    {
        return this.value.copy();
    }
}