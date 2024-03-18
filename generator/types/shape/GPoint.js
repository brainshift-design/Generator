class GPoint
extends GOperator1
{
    x = null;
    y = null;



    constructor(nodeId, options)
    {
        super(POINT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.x = null;
        this.y = null;
    }



    copy()
    {
        const copy = new GPoint(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.x    ) copy.x     = this.x    .copy();
        if (this.y    ) copy.y     = this.y    .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x': return this.input ? this.value.x : this.x;
            case 'y': return this.input ? this.value.y : this.y;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        let input = this.input ? (await this.input.eval(parse)).toValue() : null;
        let x     = this.x     ? (await this.x    .eval(parse)).toValue() : null;
        let y     = this.y     ? (await this.y    .eval(parse)).toValue() : null;

        if (   input
            && input.isValid())
        {
            const _input = input;

            if (input.type == VECTOR_VERTEX_VALUE)
            {
                input = new PointValue(input.nodeId, input.x, input.y);
                input.copyCustomParams(_input);
            }
            
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);


            if (   this.value.objects
                && this.value.objects.length > 0)
            {
                this.value.x = new NumberValue(this.value.objects[0].x);
                this.value.y = new NumberValue(this.value.objects[0].y);
            }
            
            if (x)  this.value.x = x;  else  x = this.value.x;
            if (y)  this.value.y = y;  else  y = this.value.y;
        }
        else if (x && x.isValid() 
              && y && y.isValid())
        {
            this.value = new PointValue(
                this.nodeId, 
                x, 
                y);
        }
        else
            this.value = PointValue.NaN.copy();


        this.value.uniqueId = this.uniqueId;


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['x', x],
            ['y', y]
        ]);    


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (!this.value.objects)
            this.value.objects = [];


        if (   this.value.x
            && this.value.y   
            && this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x,
                y,
                this.smooth ? this.smooth.value/100 : 1);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x && this.x.isValid()
            && this.y && this.y.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x) this.x.pushValueUpdates(parse);
        if (this.y) this.y.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x) this.x.invalidateInputs(parse, from, force);
        if (this.y) this.y.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x) this.x.iterateLoop(parse);
        if (this.y) this.y.iterateLoop(parse);
    }
}