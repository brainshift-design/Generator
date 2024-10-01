class GColorScheme
extends GOperator1
{
    schemeType = null;
    space      = null;



    constructor(nodeId, options)
    {
        super(COLOR_SCHEME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.schemeType = null;
        this.space      = null;
    }



    copy()
    {
        const copy = new GColorScheme(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value     ) copy.value      = this.value     .copy();
        if (this.schemeType) copy.schemeType = this.schemeType.copy();
        if (this.space     ) copy.space      = this.space     .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input      = await evalColorValue (this.input,      parse);
        const schemeType = await evalNumberValue(this.schemeType, parse);
        const space      = await evalNumberValue(this.space,      parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();


                const rgb = input.toRgb();


                let addHue;

                switch (space.value)
                {
                    case 0: addHue = addHueHsl;   break;
                    case 1: addHue = addHueHclok; break;
                    case 2: addHue = addHueHclab; break;
                    case 3: addHue = addHueHcluv; break;
                }


                function getColor(rgb)
                {
                    const color = convertDataColorToSpace(
                        rgb2dataColor(rgb), 
                        colorSpace(input.space.value));

                    return ColorValue.fromDataColor(color);
                }



                switch (schemeType.value)
                {
                    case 0: // less similar
                    {
                        this.value.items.push(getColor(addHue(rgb, 10/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  2/12, 0, 1)));
                        break;
                    }

                    case 1: // similar
                    {
                        this.value.items.push(getColor(addHue(rgb, 11/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  1/12, 0, 1)));
                        break;
                    }

                    case 2: // similar with accent
                    {
                        this.value.items.push(getColor(addHue(rgb, 11/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  1/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        break;
                    }

                    case 3: // opposite
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        break;
                    }

                    case 4: // opposite -
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  5/12, 0, 1)));
                        break;
                    }

                    case 5: // opposite +
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  7/12, 0, 1)));
                        break;
                    }

                    case 6: // opposite split
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  5/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  7/12, 0, 1)));
                        break;
                    }

                    case 7: // triangle
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  4/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  8/12, 0, 1)));
                        break;
                    }

                    case 8: // double opposite -
                    {
                        this.value.items.push(getColor(addHue(rgb,   0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  11/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,   6/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,   5/12, 0, 1)));
                        break;
                    }

                    case 9: // rectangle -
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb, 10/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  4/12, 0, 1)));
                        break;
                    }

                    case 10: // rectangle +
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  2/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  8/12, 0, 1)));
                        break;
                    }

                    case 11: // double opposite +
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  1/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  7/12, 0, 1)));
                        break;
                    }

                    case 12: // square
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  3/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  9/12, 0, 1)));
                        break;
                    }

                    case 13: // hexagon
                    {
                        this.value.items.push(getColor(addHue(rgb,  0,    0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  2/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  4/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  6/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb,  8/12, 0, 1)));
                        this.value.items.push(getColor(addHue(rgb, 10/12, 0, 1)));
                        break;
                    }
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();


        this.setUpdateValues(parse,
        [
            ['value',      this.value       ],
            ['type',       this.outputType()],
            ['schemeType', schemeType       ],
            ['space',      space            ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.schemeType && this.schemeType.isValid()
            && this.space      && this.space     .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.schemeType) this.schemeType.pushValueUpdates(parse);
        if (this.space     ) this.space     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.schemeType) this.schemeType.invalidateInputs(parse, from, force);
        if (this.space     ) this.space     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.schemeType) this.schemeType.iterateLoop(parse);
        if (this.space     ) this.space     .iterateLoop(parse);
    }
}
