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
                        const ratio = getContrastRatio2(
                            dataColor2rgb(input0.toDataColor()),
                            dataColor2rgb(input1.toDataColor()));

                        // let rating = getContrastRating2(ratio);

                        // if (rating != '')
                        //     rating = '&nbsp;&nbsp;' + rating;

                        // this.paramValue.control.min        = 
                        // this.paramValue.control.displayMin = 0;

                        // this.paramValue.control.max        = 
                        // this.paramValue.control.displayMax = 21;

                        // this.paramValue.control.setDecimals(2);
                        // this.paramValue.control.setSuffix(rating);

                        genPushUpdateValue(parse, this.nodeId, 'value', new GNumberValue(ratio, 2));
                    }
                    else
                    {
                        const ratio = getContrastRatio3(
                            dataColor2rgb(this.inputs[0].data.color),
                            dataColor2rgb(this.inputs[1].data.color));
                            
                        // this.paramValue.control.min        = 
                        // this.paramValue.control.displayMin = 0;

                        // this.paramValue.control.max        = 
                        // this.paramValue.control.displayMax = 105;

                        // this.paramValue.control.setDecimals(1);
                        // this.paramValue.control.setSuffix('<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -9px; left: 2px;">c</span>');

                        this.paramValue.control.setValue(Math.abs(ratio), false, false, false);

                        genPushUpdateValue(parse, this.nodeId, 'value', new GNumberValue(ratio, 1));
                    }


    //             this.forceShowWarning = false;
                }
            }

            else if (this.input1) 
            {
                const input1 = this.input1.eval(parse).copy();

                if (input1.isValid())
                {
                    genPushUpdateValue(parse, this.nodeId, 'text', GColorValue.NaN);
                    genPushUpdateValue(parse, this.nodeId, 'back', input1);

                    this.result = input1;
                }

                //this.result = this.input1.eval(parse).copy();
            }
            else
            {
                genPushUpdateValue(parse, this.nodeId, 'text', GColorValue.NaN);
                genPushUpdateValue(parse, this.nodeId, 'back', GColorValue.NaN);
            }
            

            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'fore', this.result);
            genPushUpdateValue(parse, this.nodeId, 'back', this.result);
        }


        return this.result;
    }
}
