class GFill
extends GOperator
{
    fill;
    opacity;



    constructor(nodeId, active)
    {
        super(FILL, nodeId, active);

        this.fill    = GColorValue.create(1, 0, 0, 0);
        this.opacity = new GNumberValue(100);
    }



    copy()
    {
        const fill = new GFill(this.nodeId, this.active);

        if (this.input) fill.input = this.input.copy();

        fill.fill    = this.fill  .copy();
        fill.opacity = this.opacity.copy();

        return fill;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const fill    = this.fill   .eval(parse).copy();
            // const opacity = this.opacity.eval(parse).copy();

            // if (this.input)
            // {
            //     this.result = this.input.eval(parse).copy();
            //     console.assert(this.result.type == FILL);

            //     this.result.fill = fill;
            //         // FILL, 
            //         // color.toRgbString(), 
            //         // (opacity.value / 100).toString()]);

            //     this.result.valid = true;
            // }
            // else
            //     this.result = new GFill();

                
            // this.valid = true;
           
            
            // genPushUpdateValue(parse, this.nodeId, this.result.type, this.result);

            // genPushUpdateValue(parse, this.nodeId, 'fill',    fill  );
            // genPushUpdateValue(parse, this.nodeId, 'opacity', opacity);
        }


        return this.result;
    }
}