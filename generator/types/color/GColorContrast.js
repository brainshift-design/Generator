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
        const copy = new GColorContrast(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0) copy.input0 = this.input0.copy();
        if (this.input1) copy.input1 = this.input1.copy();

        copy.standard = this.standard.copy();
        copy.contrast = this.contrast.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const standard = (await this.standard.eval(parse)).toValue().toInteger();

        
        if (standard.isValid())
            standard.value = Math.min(Math.max(0, standard.value), 1);


        if (   this.input0 
            && this.input1)
        {
            const input0 = (await this.input0.eval(parse)).toValue();
            const input1 = (await this.input1.eval(parse)).toValue();


            if (   input0.isValid()
                && input1.isValid())
            {
                this.value = input1;
                
                if (   dataColorIsValid(input0.toDataColor())
                    && dataColorIsValid(input1.toDataColor()))
                {
                    if (standard.value == 0)
                    {
                        const value = getContrastRatio2(input0.toRgb(), input1.toRgb());
                        this.contrast = new NumberValue(value, 2);
                    }
                    else
                    {
                        const value = getContrastRatio3(input0.toRgb(), input1.toRgb());
                        this.contrast = new NumberValue(value, 1);
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


            this.updateValues =
            [
                ['text', input0],
                ['back', input1]
            ];
        }

        else if (this.input0) 
        {
            const input0 = (await this.input0.eval(parse)).toValue();

            this.updateValues =
            [
                ['text', input0.isValid() ? input0 : ColorValue.NaN],
                ['back', ColorValue.NaN                            ]
            ];
            
            this.value    = ColorValue.NaN;
            this.contrast = NumberValue.NaN;
        }

        else if (this.input1) 
        {
            const input1 = (await this.input1.eval(parse)).toValue();

            this.updateValues =
            [
                ['text', ColorValue.NaN                            ],
                ['back', input1.isValid() ? input1 : ColorValue.NaN]
            ];

            this.value    = input1.isValid() ? input1 : ColorValue.NaN;
            this.contrast = NumberValue.NaN;
        }

        else
        {
            this.value    = ColorValue.NaN;
            this.contrast = NumberValue.NaN;

            this.updateValues =
            [
                ['text', ColorValue.NaN],
                ['back', ColorValue.NaN]
            ];
        }
        


        this.updateValues.push(
            ['standard', standard     ],
            ['contrast', this.contrast]);


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0  ) this.input0  .pushValueUpdates(parse);
        if (this.input1  ) this.input1  .pushValueUpdates(parse);
        if (this.standard) this.standard.pushValueUpdates(parse);
        if (this.contrast) this.contrast.pushValueUpdates(parse);
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input0  ) this.input0  .invalidateInputs();
        if (this.input1  ) this.input1  .invalidateInputs();
        if (this.standard) this.standard.invalidateInputs();
        if (this.contrast) this.contrast.invalidateInputs();
    }
}
