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



    evalStyle(options = {})
    {
        // for (const style of this.styles)
        //     style.nodeId = this.nodeId;
    }



    isValid()
    {
        return this.x      && this.x     .isValid()
            && this.y      && this.y     .isValid()
            && this.width  && this.width .isValid()
            && this.height && this.height.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x     ) this.x     .pushValueUpdates(parse);
        if (this.y     ) this.y     .pushValueUpdates(parse);
        if (this.width ) this.width .pushValueUpdates(parse);
        if (this.height) this.height.pushValueUpdates(parse);
    }


    
    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.x     ) this.x     .invalidateInputs(parse, from);
        if (this.y     ) this.y     .invalidateInputs(parse, from);
        if (this.width ) this.width .invalidateInputs(parse, from);
        if (this.height) this.height.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x     ) this.x     .iterateLoop(parse);
        if (this.y     ) this.y     .iterateLoop(parse);
        if (this.width ) this.width .iterateLoop(parse);
        if (this.height) this.height.iterateLoop(parse);
    }
}



function validateObjectRect(x, y, w, h, a = 0, _a = 0)
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