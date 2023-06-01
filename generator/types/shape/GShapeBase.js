class GShapeBase
extends GOperator
{
    x      = null;
    y      = null;
    width  = null;
    height = null;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.x     ) this.x      = base.x     .copy();
        if (base.y     ) this.y      = base.y     .copy();
        if (base.width ) this.width  = base.width .copy();
        if (base.height) this.height = base.height.copy();
    }



    async evalBaseParams(parse, evalHeight = true)
    {
        const x      = this.x      ? (await this.x     .eval(parse)).toValue() : null;
        const y      = this.y      ? (await this.y     .eval(parse)).toValue() : null;
        const width  = this.width  ? (await this.width .eval(parse)).toValue() : null;

        const height = evalHeight
                    && this.height ? (await this.height.eval(parse)).toValue() : null;

        return [x, y, width, height];
    }



    async evalShapeBase(parse, input, evalHeight = true)
    {
        if (this.value.x     != undefined) this.updateValues.push(['x',     this.value.x    ]);
        if (this.value.y     != undefined) this.updateValues.push(['y',     this.value.y    ]);
        if (this.value.width != undefined) this.updateValues.push(['width', this.value.width]);

        if (   evalHeight // lines don't have height
            && this.value.height != undefined)
            this.updateValues.push(['height', this.value.height]);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x     ) this.x     .pushValueUpdates(parse);
        if (this.y     ) this.y     .pushValueUpdates(parse);
        if (this.width ) this.width .pushValueUpdates(parse);
        if (this.height) this.height.pushValueUpdates(parse);
    }


    
    evalStyle(options = {})
    {
        // for (const style of this.styles)
        //     style.nodeId = this.nodeId;
    }



    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.x     ) this.x     .invalidateInputs(from);
        if (this.y     ) this.y     .invalidateInputs(from);
        if (this.width ) this.width .invalidateInputs(from);
        if (this.height) this.height.invalidateInputs(from);
    }
}



function validateObjectRect(x, y, w, h, a, _a)
{
    if (w < 0)
    {
        x += w * Math.cos(_a);
        y += w * Math.sin(_a);
    }

    if (h < 0)
    {
        y += h * Math.cos(_a);
        x -= h * Math.sin(_a);
    }
  
    
    w = Math.abs(w);
    h = Math.abs(h);


    return [x, y, w, h, a, _a];
}