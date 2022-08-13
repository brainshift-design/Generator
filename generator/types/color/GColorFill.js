class GColorFill
extends GOperator
{
    color;
    opacity;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);

        this.color   = GColorValue.NaN;
        this.opacity = new GNumberValue(100);
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
                const input = this.input.eval(parse);

                this.result = input.copy();
                console.assert(this.result.type == COLOR_FILL_VALUE);

                if (this.color  ) this.result.color   = this.color  .eval(parse).copy();
                if (this.opacity) this.result.opacity = this.opacity.eval(parse).copy();
            }
            else
            {
                this.result = new GColorFillValue();

                this.result.color   = this.color  .eval(parse).copy();
                this.result.opacity = this.opacity.eval(parse).copy();
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