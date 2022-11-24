class GColorContrast
extends GColorType
{
    input0 = null;
    input1 = null;

    standard;
    contrast;


    constructor(nodeId, options)
    {
        super(COLOR_CONTRAST, nodeId, options);
    }


    
    copy()
    {
        const cnt = new GColorContrast(this.nodeId, this.options);

        cnt.copyBase(this);

        if (this.input0) cnt.input0 = this.input0.copy();
        if (this.input1) cnt.input1 = this.input1.copy();

        cnt.standard = this.standard.copy();
        cnt.contrast = this.contrast.copy();

        return cnt;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.standard = this.standard.eval(parse).copy();
        const standard = this.standard.toValue();


        if (   this.input0 
            && this.input1)
        {
            this.input0 = this.input0.eval(parse).copy();
            this.input1 = this.input1.eval(parse).copy();

            const input0 = this.input0.toValue();
            const input1 = this.input1.toValue();


            if (   input0.isValid()
                && input1.isValid())
            {
                this.value = input1;
                
                if (   dataColorIsValid(input0.toDataColor())
                    && dataColorIsValid(input1.toDataColor()))
                {
                    if (standard.value == 0)
                    {
                        const value = getContrastRatio2(
                            input0.toRgb(),
                            input1.toRgb());

                        this.contrast = new NumberValue(value, 2);
                    }
                    else
                    {
                        const value = getContrastRatio3(
                            input0.toRgb(),
                            input1.toRgb());

                        this.contrast = new NumberValue(Math.abs(value), 1);
                    }
                }
                else
                    this.contrast = NumberValue.NaN;
            }
            else
            {
                this.value    = ColorValue.NaN;
                this.contrast = NumberValue.NaN;
            }


            genPushUpdateValue(parse, this.nodeId, 'text', input0);
            genPushUpdateValue(parse, this.nodeId, 'back', input1);
        }

        else if (this.input0) 
        {
            this.input0 = this.input0.eval(parse).copy();
            const input0 = this.input0.toValue();

            if (input0.isValid())
                genPushUpdateValue(parse, this.nodeId, 'text', input0);

            genPushUpdateValue(parse, this.nodeId, 'back', ColorValue.NaN);

            this.value    = ColorValue.NaN;
            this.contrast = NumberValue.NaN;
        }

        else if (this.input1) 
        {
            this.input1 = this.input1.eval(parse).copy();
            const input1 = this.input1.toValue();

            genPushUpdateValue(parse, this.nodeId, 'text', ColorValue.NaN);

            if (input1.isValid())
            {
                this.value = input1;
                genPushUpdateValue(parse, this.nodeId, 'back', input);
            }
            else
                this.value = ColorValue.NaN;

            this.contrast = NumberValue.NaN;
        }

        else
        {
            this.value    = ColorValue.NaN;
            this.contrast = NumberValue.NaN;

            genPushUpdateValue(parse, this.nodeId, 'text', ColorValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'back', ColorValue.NaN);
        }
        

        genPushUpdateValue(parse, this.nodeId, 'standard', this.standard);
        genPushUpdateValue(parse, this.nodeId, 'contrast', this.contrast);


        this.validate();

        return this;
    }
}
