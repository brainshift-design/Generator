class GColorValidate
extends GOperator
{
    input = null;

    order;
    
    margin1;
    margin2;
    margin3;


    constructor(nodeId, active)
    {
        super(COLOR_VALIDATE, nodeId, active);
    }


    
    copy()
    {
        const val = new GColorBlind(this.nodeId, this.active);

        if (this.input) val.input = this.input.copy();

        val.order   = this.order  .copy();
        val.margin1 = this.margin1.copy();
        val.margin2 = this.margin2.copy();
        val.margin3 = this.margin3.copy();

        return val;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GColorValue();


            const order   = this.order  .eval(parse).copy();

            const margin1 = this.margin1.eval(parse).copy();
            const margin2 = this.margin2.eval(parse).copy();
            const margin3 = this.margin3.eval(parse).copy();


            if (this.input)
            {
                const input = this.input.eval(parse).copy();

                // const rgb = dataColor2rgb(input.toDataColor());

                // //const validRgb = invalid2validRgb(rgb);

                // const rgbCb = rgb2colorblind(
                //     rgb,
                //     this.l.value / 2,
                //     this.m.value / 2,
                //     this.s.value / 2);

                // if (   isValidRgb(rgb)
                //     && isValidRgb(rgbCb))
                // {
                //     console.log('valid');
                //     const validRgbCb = rgbCb;//invalid2validRgb(cb);
                
                //     const validCol = convertDataColorToSpace(
                //         rgb2dataColor(validRgbCb), 
                //         colorSpace(input.space.value));
    
                //     const factor = getColorSpaceFactor(validCol[0]);
    
                //     this.result = new GColorValue(
                //         new GNumberValue(input.space.value),
                //         new GNumberValue(validCol[1] * factor[0]),
                //         new GNumberValue(validCol[2] * factor[1]),
                //         new GNumberValue(validCol[3] * factor[2]));
                // }
                // else
                // {
                //     this.result = GColorValue.NaN;
                // }

                this.result = input;
            }
            else
                this.result = GColorValue.NaN;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'margin1', margin1);
            genPushUpdateValue(parse, this.nodeId, 'margin2', margin2);
            genPushUpdateValue(parse, this.nodeId, 'margin3', margin3);
        }


        return this.result;
    }
}
