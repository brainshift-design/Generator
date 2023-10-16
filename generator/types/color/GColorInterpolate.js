class GColorInterpolate
extends GOperator2
{
    space;
    amount;
    gamma;


    constructor(nodeId, options)
    {
        super(COLOR_INTERPOLATE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColorInterpolate(this.nodeId, this.options);

        copy.copyBase(this);

        copy.space  = this.space .copy();
        copy.amount = this.amount.copy();
        copy.gamma  = this.gamma .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const space  = (await this.space .eval(parse)).toValue().toInteger();
        const amount = (await this.amount.eval(parse)).toValue();
        const gamma  = (await this.gamma .eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const input0 = (await this.input0.eval(parse)).toValue();
            const input1 = (await this.input1.eval(parse)).toValue();

            consoleAssert(
                amount.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            const f = amount.value / 100;


            const spaceIndex = Math.min(Math.max(0, space.value), colorSpaceCount()-1);
            const gammaValue = Math.max(0.0001, gamma.value);

            const _space = colorSpace(spaceIndex);

            const _color = this.interpolate(
                spaceIndex,
                convertDataColorToSpace(input0.toDataColor(), _space),
                convertDataColorToSpace(input1.toDataColor(), _space),
                f,
                gammaValue);


            // allow interpolating invalid colors,
            // so no valid color check here

            this.value = ColorValue.fromDataColor(_color, spaceIndex);
        }

        else if (this.input0) 
            this.value = (await this.input0.eval(parse)).toValue();

        else if (this.input1) 
            this.value = (await this.input1.eval(parse)).toValue();
            
        else 
            this.value = ColorValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['space',  space     ],
            ['amount', amount    ],
            ['gamma',  gamma     ],
            ['value',  this.value]
        ]);
        

        this.validate();
        
        return this;
    }



    interpolate(space, col0, col1, f, gamma)
    {
        if (   space <= 1
            || space >  6) // hex, rgb, okLab, lab, luv
        {
            gamma = Math.max(0.01, gamma);

            const r0 = Math.sign(col0[1]) * Math.pow(Math.abs(col0[1]), gamma);  
            const g0 = Math.sign(col0[2]) * Math.pow(Math.abs(col0[2]), gamma);  
            const b0 = Math.sign(col0[3]) * Math.pow(Math.abs(col0[3]), gamma);  

            const r1 = Math.sign(col1[1]) * Math.pow(Math.abs(col1[1]), gamma);
            const g1 = Math.sign(col1[2]) * Math.pow(Math.abs(col1[2]), gamma);
            const b1 = Math.sign(col1[3]) * Math.pow(Math.abs(col1[3]), gamma);

            const r = lerp(r0, r1, f);        
            const g = lerp(g0, g1, f);            
            const b = lerp(b0, b1, f);        

            return [
                colorSpace(space),
                Math.sign(r) * Math.pow(Math.abs(r), 1/gamma),
                Math.sign(g) * Math.pow(Math.abs(g), 1/gamma),
                Math.sign(b) * Math.pow(Math.abs(b), 1/gamma) ];
        }
        else // hsv/hsl/hcl
        {
            const h0 = col0[1] * Tau;  const h1 = col1[1] * Tau;
            const c0 = col0[2];        const c1 = col1[2];
            const l0 = col0[3];        const l1 = col1[3];

            return [
                colorSpace(space),
                normalAngle(h0 + angleDiff(h0, h1) * f) / Tau,
                lerp(c0, c1, f),
                lerp(l0, l1, f) ];
        }
    }



    isValid()
    {
        return super.isValid()
            && this.space  && this.space .isValid()
            && this.amount && this.amount.isValid()
            && this.gamma  && this.gamma .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.space ) this.space .pushValueUpdates(parse);
        if (this.amount) this.amount.pushValueUpdates(parse);
        if (this.gamma ) this.gamma .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.space ) this.space .invalidateInputs(parse, from, force);
        if (this.amount) this.amount.invalidateInputs(parse, from, force);
        if (this.gamma ) this.gamma .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.space ) this.space .iterateLoop(parse);
        if (this.amount) this.amount.iterateLoop(parse);
        if (this.gamma ) this.gamma .iterateLoop(parse);
    }
}
