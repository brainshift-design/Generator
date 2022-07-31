class GColorFill
extends GOperator
{
    input   = null;

    color   = null;
    opacity = null;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);
    }



    copy()
    {
        const fill = new GColorFill(this.nodeId, this.active);

        if (this.input) fill.input = this.input.copy();

        fill.color   = this.color  .copy();
        fill.opacity = this.opacity.copy();

        return fill;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            // if (this.input)
            // {
            //    this.result = new GRectangleValue();

                //     this.result = this.input.eval(parse).copy();
            //     console.assert(this.result.type == RECTANGLE_VALUE);

            //     if (this.x     ) this.result.x      = this.x     .eval(parse).copy();
            //     if (this.y     ) this.result.y      = this.y     .eval(parse).copy();
            //     if (this.width ) this.result.width  = this.width .eval(parse).copy();
            //     if (this.height) this.result.height = this.height.eval(parse).copy();
            //     if (this.angle ) this.result.angle  = this.angle .eval(parse).copy();
            //     if (this.round ) this.result.round  = this.round .eval(parse).copy();
            // }
            // else
            // {
            //        this.result = new GGeometry();
            // }


            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, RECTANGLE_VALUE, this.result);


            if (this.active)
            {
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    { 
                        nodeId: this.nodeId,          
                        type:   RECTANGLE,
                        id:     0,
                        x:      this.result.x     .value,
                        y:      this.result.y     .value,
                        width:  this.result.width .value,
                        height: this.result.height.value,
                        angle:  this.result.angle .value,
                        round:  Math.max(0, this.result.round.value)
                    });
            }
        }


        return this.result;
    }
}