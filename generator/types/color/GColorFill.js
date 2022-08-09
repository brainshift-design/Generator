class GColorFill
extends GOperator
{
    color;
    opacity;



    constructor(nodeId, active)
    {
        super(COLOR_FILL, nodeId, active);

        this.color   = GColorValue.create(1, 0, 0, 0);
        this.opacity = new GNumberValue(100);
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
            this.result = new GColorFillValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == COLOR_FILL_VALUE);

                if (this.result.isValid())
                {
                    if (this.color  ) this.result.color   = this.color  .eval(parse).copy();
                    if (this.opacity) this.result.opacity = this.opacity.eval(parse).copy();
                }
            }
            else
            {
                this.result.color   = this.color  .eval(parse).copy();
                this.result.opacity = this.opacity.eval(parse).copy();
            }

             
            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}