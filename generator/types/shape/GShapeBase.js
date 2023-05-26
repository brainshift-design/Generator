class GShapeBase
extends GOperator
{
    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;



    constructor(type, nodeId, options)
    {
        super(type, nodeId, options);
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        //if (base.value ) this.value  = base.value .copy();
        if (base.x     ) this.x      = base.x     .copy();
        if (base.y     ) this.y      = base.y     .copy();
        if (base.width ) this.width  = base.width .copy();
        if (base.height) this.height = base.height.copy();
        if (base.angle ) this.angle  = base.angle .copy();
    }



    async evalBaseParams(parse, evalHeight = true)
    {
        const x      = this.x      ? (await this.x     .eval(parse)).toValue() : null;
        const y      = this.y      ? (await this.y     .eval(parse)).toValue() : null;
        const width  = this.width  ? (await this.width .eval(parse)).toValue() : null;

        const height = evalHeight
                    && this.height ? (await this.height.eval(parse)).toValue() : null;

        const angle  = this.angle  ? (await this.angle .eval(parse)).toValue() : null;

        return [x, y, width, height, angle];
    }



    async evalShapeBase(parse, input, evalHeight = true)
    {
        if (this.value.x     != undefined) this.updateValues.push(['x',     this.value.x    ]);
        if (this.value.y     != undefined) this.updateValues.push(['y',     this.value.y    ]);
        if (this.value.width != undefined) this.updateValues.push(['width', this.value.width]);

        if (   evalHeight // lines don't have height
            && this.value.height != undefined)
            this.updateValues.push(['height', this.value.height]);

        if (this.value.angle != undefined) this.updateValues.push(['angle',  this.value.angle]);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x     ) this.x     .pushValueUpdates(parse);
        if (this.y     ) this.y     .pushValueUpdates(parse);
        if (this.width ) this.width .pushValueUpdates(parse);
        if (this.height) this.height.pushValueUpdates(parse);
        if (this.angle ) this.angle .pushValueUpdates(parse);
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
            && this.height.isValid()
            && this.angle .isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.x     ) this.x     .invalidateInputs();
        if (this.y     ) this.y     .invalidateInputs();
        if (this.width ) this.width .invalidateInputs();
        if (this.height) this.height.invalidateInputs();
        if (this.angle ) this.angle .invalidateInputs();
    }
}