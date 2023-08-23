class GColorContrast
extends GOperator2
{
    standard = null;
    contrast = null;


    constructor(nodeId, options)
    {
        super(COLOR_CONTRAST, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColorContrast(this.nodeId, this.options);

        copy.copyBase(this);

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
                this.contrast = NumberValue.NaN;


            this.value = input0 ? input0.copy() : ColorValue.NaN;


            this.setUpdateValues(parse,
            [
                ['text', input0],
                ['back', input1]
            ]);
        }

        else if (this.input0) 
        {
            const input0 = (await this.input0.eval(parse)).toValue();

            this.setUpdateValues(parse,
            [
                ['text', input0.isValid() ? input0 : ColorValue.NaN],
                ['back', ColorValue.NaN                            ]
            ]);
            
            this.value    = input0.copy();
            this.contrast = NumberValue.NaN;
        }

        else if (this.input1) 
        {
            const input1 = (await this.input1.eval(parse)).toValue();

            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN                            ],
                ['back', input1.isValid() ? input1 : ColorValue.NaN]
            ]);

            this.value    = ColorValue.NaN;
            this.contrast = NumberValue.NaN;
        }

        else
        {
            this.value    = ColorValue.NaN;
            this.contrast = NumberValue.NaN;

            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN],
                ['back', ColorValue.NaN]
            ]);
        }
        


        this.setUpdateValues(parse,
        [
            ['standard', standard     ],
            ['contrast', this.contrast]
        ],
        true);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.standard && this.standard.isValid()
            && (!this.contrast || this.contrast.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.standard) this.standard.pushValueUpdates(parse);
        if (this.contrast) this.contrast.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.standard) this.standard.invalidateInputs(parse, from);
        if (this.contrast) this.contrast.invalidateInputs(parse, from);
    }
}
