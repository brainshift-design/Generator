class GMove
extends GOperator
{
    input       = null;

    x           = null;
    y           = null;
    affectSpace = null;

    coords;



    constructor(nodeId, options)
    {
        super(MOVE, nodeId, options);

        this.coords = clone(identity);
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x          ) copy.x           = this.x          .copy();
        if (this.y          ) copy.y           = this.y          .copy();
        if (this.affectSpace) copy.affectSpace = this.affectSpace.copy();

        copy.coords = clone(this.coords);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const x           = this.x           ? (await this.x          .eval(parse)).toValue() : null;
        const y           = this.y           ? (await this.y          .eval(parse)).toValue() : null;
        const affectSpace = this.affectSpace ? (await this.affectSpace.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

        
        this.evalObjects(
            parse, 
            {
                x:           x, 
                y:           y,
                affectSpace: affectSpace
            });


        this.updateValues =
        [
            ['value',       this.value ],
            ['x',           x          ],
            ['y',           y          ],
            ['affectSpace', affectSpace]
        ];


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        this.objects = this.input ? this.input.objects.map(o => o.copy()) : [];
        //this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];

            
        if (!this.options.enabled)
            return;
            

        const x     = options.x.toNumber();
        const y     = options.y.toNumber();

        const xform = createTransform(x, y);

             
        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            obj.applyTransform(xform, options.affectSpace.value > 0);

            this.coords  = mulm3m3(this.coords, xform);
        }

        
        super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input      ) this.input      .pushValueUpdates(parse);
        if (this.x          ) this.x          .pushValueUpdates(parse);
        if (this.y          ) this.y          .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x          .isValid()
            && this.y          .isValid()
            && this.affectSpace.isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input      ) this.input      .invalidateInputs(from);
        if (this.x          ) this.x          .invalidateInputs(from);
        if (this.y          ) this.y          .invalidateInputs(from);
        if (this.affectSpace) this.affectSpace.invalidateInputs(from);
    }



    toValue()
    {
        return this.value.copy();
    }
}