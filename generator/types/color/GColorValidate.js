class GColorValidate
extends GColorType
{
    input = null;

    order;
    
    margin1;
    margin2;
    margin3;


    constructor(nodeId, options)
    {
        super(COLOR_VALIDATE, nodeId, options);
    }


    
    copy()
    {
        const val = new GColorValidate(this.nodeId, this.options);

        val.copyBase(this);

        if (this.input) val.input = this.input.copy();

        val.order   = this.order  .copy();
        val.margin1 = this.margin1.copy();
        val.margin2 = this.margin2.copy();
        val.margin3 = this.margin3.copy();

        return val;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.order   = this.order  .eval(parse).copy();
        this.margin1 = this.margin1.eval(parse).copy();
        this.margin2 = this.margin2.eval(parse).copy();
        this.margin3 = this.margin3.eval(parse).copy();

        const order   = this.order  .toValue();
        const margin1 = this.margin1.toValue();
        const margin2 = this.margin2.toValue();
        const margin3 = this.margin3.toValue();

        
        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            const input = this.input.toValue();


            const rgb = input.toRgb();


            if (rgbIsOk(rgb))
            {
                this._color = validateColor(
                        input.toDataColor(),
                        this.order  .value, 
                        this.margin1.value,
                        this.margin2.value,
                        this.margin3.value);

                const factor = getColorSpaceFactor('rgb');

                this.value = ColorValue.create(
                    1,
                    this._color[1] * factor[0],
                    this._color[2] * factor[1],
                    this._color[3] * factor[2]);
            }
            else
                this.value = ColorValue.NaN;
        }
        else
            this.value = ColorValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);

        genPushUpdateValue(parse, this.nodeId, 'order',   order  );
        genPushUpdateValue(parse, this.nodeId, 'margin1', margin1);
        genPushUpdateValue(parse, this.nodeId, 'margin2', margin2);
        genPushUpdateValue(parse, this.nodeId, 'margin3', margin3);

        
        this.valid = true;

        return this;
    }
}
