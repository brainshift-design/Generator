class GColorContrast
extends GOperator
{
    input0 = null;
    input1 = null;

    standard;
    value;


    constructor(nodeId, active)
    {
        super(COLOR_CONTRAST, nodeId, active);
    }


    
    copy()
    {
        const cnt = new GColorContrast(this.nodeId, this.active);

        if (this.input0) cnt.input0 = this.input0.copy();
        if (this.input1) cnt.input1 = this.input1.copy();

        cnt.standard = this.standard.copy();
        cnt.value    = this.value   .copy();

        return cnt;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GColorValue();

            const standard = this.standard.eval(parse).copy();


            if (   this.input0 
                && this.input1)
            {
                const input0 = this.input0.eval(parse).copy();
                const input1 = this.input1.eval(parse).copy();

                
                if (   input0.isValid()
                    && input1.isValid())
                {
                    genPushUpdateValue(parse, this.nodeId, 'text', input0);
                    genPushUpdateValue(parse, this.nodeId, 'back', input1);

                    this.result = input1;

                    if (standard.value == 0)
                    {
                        const value = getContrastRatio2(
                            dataColor2rgb(input0.toDataColor()),
                            dataColor2rgb(input1.toDataColor()));

                        genPushUpdateValue(parse, this.nodeId, 'value', new GNumberValue(value, 2));
                    }
                    else
                    {
                        const value = getContrastRatio3(
                            dataColor2rgb(input0.toDataColor()),
                            dataColor2rgb(input1.toDataColor()));

                        genPushUpdateValue(parse, this.nodeId, 'value', new GNumberValue(Math.abs(value), 1));
                    }
                }
            }

            else if (this.input0) 
            {
                const input0 = this.input0.eval(parse).copy();

                if (input0.isValid())
                {
                    genPushUpdateValue(parse, this.nodeId, 'text', input0);
                    genPushUpdateValue(parse, this.nodeId, 'back', GColorValue.NaN);

                    genPushUpdateValue(parse, this.nodeId, 'value', GNumberValue.NaN);

                    this.result = GColorValue.NaN;
                }
            }
            else if (this.input1) 
            {
                const input1 = this.input1.eval(parse).copy();

                if (input1.isValid())
                {
                    genPushUpdateValue(parse, this.nodeId, 'text', GColorValue.NaN);
                    genPushUpdateValue(parse, this.nodeId, 'back', input1);

                    genPushUpdateValue(parse, this.nodeId, 'value', GNumberValue.NaN);

                    this.result = input1;
                }
            }
            else
            {
                genPushUpdateValue(parse, this.nodeId, 'text', GColorValue.NaN);
                genPushUpdateValue(parse, this.nodeId, 'back', GColorValue.NaN);

                genPushUpdateValue(parse, this.nodeId, 'value', GNumberValue.NaN);

                this.result = GColorValue.NaN;
            }
            

            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}
