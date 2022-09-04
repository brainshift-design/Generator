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
            const x      = this.x      ? this.x     .eval(parse).copy() : null;
            const y      = this.y      ? this.y     .eval(parse).copy() : null;
            const width  = this.width  ? this.width .eval(parse).copy() : null;
            const height = this.height ? this.height.eval(parse).copy() : null;
            const angle  = this.angle  ? this.angle .eval(parse).copy() : null;
            const round  = this.round  ? this.round .eval(parse).copy() : null;


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == RECTANGLE_VALUE, 
                    'this.result.type must be RECTANGLE_VALUE');

                if (this.x     ) this.result.x      = x;
                if (this.y     ) this.result.y      = y;
                if (this.width ) this.result.width  = width;
                if (this.height) this.result.height = height;
                if (this.angle ) this.result.angle  = angle;
                if (this.round ) this.result.round  = round;
            }
            else
            {
                this.result = new RectangleValue(this.nodeId);

                this.result.x      = x;
                this.result.y      = y;
                this.result.width  = width;
                this.result.height = height;
                this.result.angle  = angle;
                this.result.round  = round;
            }


            //genPushUpdateValue(parse, this.nodeId, 'value',  this.result);

            genPushUpdateValue(parse, this.nodeId, 'value',   this.result);

            genPushUpdateValue(parse, this.nodeId, 'x',       this.result.x     );
            genPushUpdateValue(parse, this.nodeId, 'y',       this.result.y     );
            genPushUpdateValue(parse, this.nodeId, 'width',   this.result.width );
            genPushUpdateValue(parse, this.nodeId, 'height',  this.result.height);
            genPushUpdateValue(parse, this.nodeId, 'angle',   this.result.angle );
            genPushUpdateValue(parse, this.nodeId, 'round',   this.result.round );


            this.evalBase(parse, this.input);


            this.result.valid = true;
            this.valid        = true;
           

            if (this.active)
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    this.result.toFigmaObject());
        }


        return this.result;
    }
}