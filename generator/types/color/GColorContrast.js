class GColorContrast
extends GOperator2
{
    standard = null;
    contrast = null;


    constructor(nodeId, options)
    {
        super(COLOR_CONTRAST, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.standard = null;
        this.contrast = null;
    }



    copy()
    {
        const copy = new GColorContrast(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.standard) copy.standard = this.standard.copy();
        if (this.contrast) copy.contrast = this.contrast.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const allSpaces = parse.settings.showAllColorSpaces;

        
        const input0    = await evalColorValue (this.input0,   parse);
        const input1    = await evalColorValue (this.input1,   parse);
        const standard  = await evalNumberValue(this.standard, parse);

        
        if (standard.isValid())
            standard.value = Math.min(Math.max(0, standard.value), 1);


        if (   input0 
            && input1)
        {
            if (   input0.isValid()
                && input1.isValid())
            {
                if (   dataColorIsValid(input0.toDataColor(allSpaces))
                    && dataColorIsValid(input1.toDataColor(allSpaces)))
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
                    this.contrast = NumberValue.NaN.copy();
            }
            else
                this.contrast = NumberValue.NaN.copy();


            this.value = 
                input0 
                ? input0//.copy() 
                : ColorValue.NaN.copy();


            this.setUpdateValues(parse,
            [
                ['text', input0],
                ['back', input1]
            ]);
        }

        else if (input0) 
        {
            this.setUpdateValues(parse,
            [
                ['text', input0.isValid() ? input0 : ColorValue.NaN],
                ['back', ColorValue.NaN                            ]
            ]);
            
            this.value    = input0;//.copy();
            this.contrast = NumberValue.NaN.copy();
        }

        else if (input1) 
        {
            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN                            ],
                ['back', input1.isValid() ? input1 : ColorValue.NaN]
            ]);

            this.value    = ColorValue .NaN.copy();
            this.contrast = NumberValue.NaN.copy();
        }

        else
        {
            this.value    = ColorValue .NaN.copy();
            this.contrast = NumberValue.NaN.copy();

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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.standard) this.standard.invalidateInputs(parse, from, force);
        if (this.contrast) this.contrast.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.standard) this.standard.iterateLoop(parse);
        if (this.contrast) this.contrast.iterateLoop(parse);
    }
}
