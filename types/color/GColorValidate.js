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
            const order   = this.order  .eval(parse).copy();
            const margin1 = this.margin1.eval(parse).copy();
            const margin2 = this.margin2.eval(parse).copy();
            const margin3 = this.margin3.eval(parse).copy();

            
            if (this.input)
            {
                const input = this.input.eval(parse).copy();

                const rgb = dataColor2rgb(input.toDataColor());


                if (isValidRgb(rgb))
                {
                    // this._color = 
                    //     col
                    //     ? [...validateColor(
                    //         col.toDataColor(),
                    //         this.order  .value, 
                    //         this.margin1.value,
                    //         this.margin2.value,
                    //         this.margin3.value)]
                    //     : dataColor_NaN;


                    const factor = getColorSpaceFactor('rgb');
    
                    this.result = new GColorValue(
                        new GNumberValue(1),
                        new GNumberValue(rgb[0] * factor[0]),
                        new GNumberValue(rgb[1] * factor[1]),
                        new GNumberValue(rgb[2] * factor[2]));
                }
                else
                    this.result = GColorValue.NaN;
            }
            else
                this.result = GColorValue.NaN;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'order',   order  );
            genPushUpdateValue(parse, this.nodeId, 'margin1', margin1);
            genPushUpdateValue(parse, this.nodeId, 'margin2', margin2);
            genPushUpdateValue(parse, this.nodeId, 'margin3', margin3);
        }


        return this.result;
    }
}
