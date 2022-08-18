class GRectangle
extends GGeometryBase
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    round  = null;



    constructor(nodeId, active)
    {
        super(RECTANGLE, nodeId, active);
    }



    copy()
    {
        const rect = new GRectangle(this.nodeId, this.active);

        if (this.input) 
            rect.input = this.input.copy();

        if (this.x     ) rect.x      = this.x     .copy();
        if (this.y     ) rect.y      = this.y     .copy();
        if (this.width ) rect.width  = this.width .copy();
        if (this.height) rect.height = this.height.copy();
        if (this.angle ) rect.angle  = this.angle .copy();
        if (this.round ) rect.round  = this.round .copy();

        rect.copyFromeBase(this);

        return rect;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GRectangleValue(this.nodeId);


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == RECTANGLE_VALUE);

                if (this.x     ) this.result.x      = this.x     .eval(parse).copy();
                if (this.y     ) this.result.y      = this.y     .eval(parse).copy();
                if (this.width ) this.result.width  = this.width .eval(parse).copy();
                if (this.height) this.result.height = this.height.eval(parse).copy();
                if (this.angle ) this.result.angle  = this.angle .eval(parse).copy();
                if (this.round ) this.result.round  = this.round .eval(parse).copy();
            }
            else
            {
                this.result.x      = this.x     .eval(parse).copy();
                this.result.y      = this.y     .eval(parse).copy();
                this.result.width  = this.width .eval(parse).copy();
                this.result.height = this.height.eval(parse).copy();
                this.result.angle  = this.angle .eval(parse).copy();
                this.result.round  = this.round .eval(parse).copy();
            }


            this.evalBase(parse, this.input);


            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, RECTANGLE_VALUE, this.result);


            if (this.active)
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    this.result.toFigmaObject());
        }


        return this.result;
    }
}