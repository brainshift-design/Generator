class GColorScheme
extends GOperator1
{
    schemeType  = null;



    constructor(nodeId, options)
    {
        super(COLOR_SCHEME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.schemeType = null;
    }



    copy()
    {
        const copy = new GColorScheme(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value     ) copy.value      = this.value     .copy();
        if (this.schemeType) copy.schemeType = this.schemeType.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input      = await evalColorValue (this.input,      parse);
        const schemeType = await evalNumberValue(this.schemeType, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();


                const rgb = input.toRgb();


                switch (schemeType.value)
                {
                    case 0: // similar
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb, 11/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  1/12, 0, 1))));
                        break;
                    }

                    case 1: // similar with accent
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb, 11/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  1/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  6/12, 0, 1))));
                        break;
                    }

                    case 2: // less similar
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb, 10/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  2/12, 0, 1))));
                        break;
                    }

                    case 3: // opposite
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  6/12, 0, 1))));
                        break;
                    }

                    case 4: // split opposite
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  5/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  7/12, 0, 1))));
                        break;
                    }

                    case 5: // double opposite
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  1/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  6/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  7/12, 0, 1))));
                        break;
                    }

                    case 6: // triangle
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  4/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  8/12, 0, 1))));
                        break;
                    }

                    case 7: // rectangle
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  2/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  6/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  8/12, 0, 1))));
                        break;
                    }

                    case 8: // square
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  3/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  6/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  9/12, 0, 1))));
                        break;
                    }

                    case 9: // hexagon
                    {
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  0,    0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  2/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  4/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  6/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb,  8/12, 0, 1))));
                        this.value.items.push(ColorValue.fromRgb(scaleRgb(addHue(rgb, 10/12, 0, 1))));
                        break;
                    }
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = ColorValue.NaN.copy();


        
        this.setUpdateValues(parse,
        [
            ['value',      this.value       ],
            ['type',       this.outputType()],
            ['schemeType', schemeType       ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.schemeType && this.schemeType.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.schemeType) this.schemeType.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.schemeType) this.schemeType.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.schemeType) this.schemeType.iterateLoop(parse);
    }
}
