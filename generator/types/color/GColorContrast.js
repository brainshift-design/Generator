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


        const input0    = await evalColorValue (this.input0,   parse);
        const input1    = await evalColorValue (this.input1,   parse);
        const standard  = await evalNumberValue(this.standard, parse);

        
        if (standard.isValid())
            standard.value = Math.min(Math.max(0, standard.value), 1);


        if (   input0 && input0.type == COLOR_VALUE 
            && input1 && input1.type == COLOR_VALUE)
        {
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
                    this.contrast = NumberValue.NaN();
            }
            else
                this.contrast = NumberValue.NaN();


            this.setUpdateValues(parse,
            [
                ['text', input0],
                ['back', input1]
            ]);
        }

        else if (input0 && input0.type == COLOR_VALUE) 
        {
            this.setUpdateValues(parse,
            [
                ['text', input0.isValid() ? input0 : ColorValue.NaN()],
                ['back', ColorValue.NaN()                            ]
            ]);
            
            this.contrast = NumberValue.NaN();
        }

        else if (input1 && input1.type == COLOR_VALUE) 
        {
            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN()                            ],
                ['back', input1.isValid() ? input1 : ColorValue.NaN()]
            ]);

            this.contrast = NumberValue.NaN();
        }

        else
        {
            this.contrast = NumberValue.NaN();

            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN()],
                ['back', ColorValue.NaN()]
            ]);
        }
        

        this.value = input0 ?? ColorValue.NaN();


        if (this.value.isValid())
            this.setValueRanges(standard, this.contrast);


        this.setUpdateValues(parse,
        [
            ['standard', standard     ],
            ['contrast', this.contrast]
        ],
        true);


        this.validate();


        return this;
    }



    setValueRanges(standard, contrast)
    {
        if (standard.value == 0) // WCAG 2
        {
            const cnt = Math.abs(contrast.value) / 21;

            const is1 = cnt > 0  /21 && cnt <=  3  /21;
            const is2 = cnt > 3  /21 && cnt <=  4.5/21;
            const is3 = cnt > 4.5/21 && cnt <=  7  /21;
           
            this.value.decorations.ranges = [ 
                new NumberValueRange(0  /21,  3  /21, rgb2style_a(darkMode ? rgb2dark1 : rgb2light1, is1 ? 1 : 0.2 ), 0.8),
                new NumberValueRange(3  /21,  4.5/21, rgb2style_a(darkMode ? rgb2dark2 : rgb2light2, is2 ? 1 : 0.27), 0.8),
                new NumberValueRange(4.5/21,  7  /21, rgb2style_a(darkMode ? rgb2dark3 : rgb2light3, is3 ? 1 : 0.27), 0.8),
                new NumberValueRange(7  /21, 21  /21, 'transparent') ];
        }
        else // APCA
        {
            const cnt = Math.abs(this.paramContrast.value.value) / 100;

            const is1 = cnt >=  0/100 && cnt <=  15/100; // red
            const is2 = cnt >  15/100 && cnt <=  30/100; // amber
            const is3 = cnt >  30/100 && cnt <=  45/100; // orange
            const is4 = cnt >  45/100 && cnt <=  60/100; // yellow
            const is5 = cnt >  60/100 && cnt <=  75/100; // green
            const is6 = cnt >  75/100 && cnt <=  90/100; // blue
            const is7 = cnt >  90/100;                   // white

            this.paramContrast.controls[0].ranges = [ 
                new NumberValueRange( 0/105,  15/105, rgb2style_a(darkMode ? rgb3dark1 : rgb3light1, is1 ? 1 : 0.2), 0.8),   // red
                new NumberValueRange(15/105,  30/105, rgb2style_a(darkMode ? rgb3dark2 : rgb3light2, is2 ? 1 : 0.2), 0.8),   // amber
                new NumberValueRange(30/105,  45/105, rgb2style_a(darkMode ? rgb3dark3 : rgb3light3, is3 ? 1 : 0.2), 0.8),   // orange
                new NumberValueRange(45/105,  60/105, rgb2style_a(darkMode ? rgb3dark4 : rgb3light4, is4 ? 1 : 0.2), 0.8),   // yellow
                new NumberValueRange(60/105,  75/105, rgb2style_a(darkMode ? rgb3dark5 : rgb3light5, is5 ? 1 : 0.2), 0.8),   // green
                new NumberValueRange(75/105,  90/105, rgb2style_a(darkMode ? rgb3dark6 : rgb3light6, is6 ? 1 : 0.4), 0.8),   // blue
                new NumberValueRange(90/105, 105/105, rgb2style_a(darkMode ? rgb3dark7 : rgb3light7, is7 ? 1 : 0  ), 0.8) ]; // white
        }
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
