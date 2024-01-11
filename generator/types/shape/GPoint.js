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


        if (input)
        {
            const _input = input;

            if (input.type == VECTOR_VERTEX_VALUE)
                input = new PointValue(input.nodeId, input.x, input.y);

            this.value        = input;
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(_input);

            if (x)  this.value.x = x;  else  x = this.value.x;
            if (y)  this.value.y = y;  else  y = this.value.y;
        }
        else
        {
            this.value = new PointValue(
                this.nodeId, 
                x, 
                y);
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['x', x],
            ['y', y]
        ]);


        // if (!this.x) this.x = this.value.x.copy();
        // if (!this.y) this.y = this.value.y.copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x.isValid()
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



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;

        // const point = new PointValue(
        //     this.nodeId,
        //     this.x.toValue(),
        //     this.y.toValue());

        // point.objects = 
        //     this.value.objects
        //     ? this.value.objects.map(o => o.copy())
        //     : [];

        // return point;
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