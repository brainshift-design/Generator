class GFill
extends GOperator
{
    color   = null;
    opacity = null;



    constructor(nodeId, active)
    {
        super(FILL, nodeId, active);
    }



    copy()
    {
        const fill = new GFill(this.nodeId, this.active);

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
            const color   = this.color   ? this.color  .eval(parse).copy() : null;
            const opacity = this.opacity ? this.opacity.eval(parse).copy() : null;

            
            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == FILL_VALUE,
                    'GFill this.result.type must be FILL_VALUE');

                if (this.result.isValid())
                {
                    if (this.color  ) this.result.color   = color;
                    if (this.opacity) this.result.opacity = opacity;
                }
            }
            else
            {
                this.result = new FillValue(
                    ColorValue.fromRgb(scaleRgb(color.toRgb())), 
                    opacity);
            }
        

            this.result.valid = true;
            this.valid        = true;
           
            
            genPushUpdateValue(parse, this.nodeId, 'color',   this.result.color  );
            genPushUpdateValue(parse, this.nodeId, 'opacity', this.result.opacity);
        }


        return this.result;
    }
}