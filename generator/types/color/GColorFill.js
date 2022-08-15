class GColorFill
extends GOperator
{
    color   = null;
    opacity = null;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);
    }



    copy()
    {
        const fill = new GColorFill(this.nodeId, this.active);

        if (this.input) 
            fill.input = this.input.copy();

        if (this.color  ) fill.color   = this.color  .copy();
        if (this.opacity) fill.opacity = this.opacity.copy();

        return fill;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == COLOR_FILL_VALUE);

                if (this.color  ) this.result.color   = this.color  .eval(parse).copy();
                if (this.opacity) this.result.opacity = this.opacity.eval(parse).copy();
            }
            else
            {
                this.result = new GColorFillValue(
                    this.color  .eval(parse).copy(), 
                    this.opacity.eval(parse).copy());
            }
        

            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, 'value',   this.result);

            genPushUpdateValue(parse, this.nodeId, 'color',   this.result.color);
            genPushUpdateValue(parse, this.nodeId, 'opacity', this.result.opacity);
        }


        return this.result;
    }
}