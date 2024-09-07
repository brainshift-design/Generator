class GColorInterpolate
extends GOperator
{
    inputs = [];

    space;
    gamma;
    amount;
    degree;



    constructor(nodeId, options)
    {
        super(COLOR_INTERPOLATE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.inputs = [];

        this.space  = null;
        this.gamma  = null;
        this.amount = null;
        this.degree = null;
    }



    copy()
    {
        const copy = new GColorInterpolate(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.space ) copy.space  = this.space .copy();
        if (this.gamma ) copy.gamma  = this.gamma .copy();
        if (this.amount) copy.amount = this.amount.copy();
        if (this.degree) copy.degree = this.degree.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let   space  = await evalNumberValue(this.space,  parse);
        const gamma  = await evalNumberValue(this.gamma,  parse);
        const amount = await evalNumberValue(this.amount, parse);
        const degree = await evalNumberValue(this.degree, parse);

        if (space) space = space.toInteger();
        

        // if (   input0 
        //     && input1)
        // {
        //     consoleAssert(
        //         amount.type == NUMBER_VALUE, 
        //         'this.result.type must be NUMBER_VALUE');

        //     const f = amount.value / 100;


        //     const spaceIndex = space.value;//Math.min(Math.max(0, space.value), colorSpaceCount()-1);
        //     const gammaValue = Math.max(0.0001, gamma.value);

        //     const _space = colorSpace(spaceIndex);

        //     const _color = this.interpolate(
        //         spaceIndex,
        //         convertDataColorToSpace(input0.toDataColor(), _space),
        //         convertDataColorToSpace(input1.toDataColor(), _space),
        //         f,
        //         gammaValue);


        //     // allow interpolating invalid colors,
        //     // so no valid color check here

        //     this.value = ColorValue.fromDataColor(_color, spaceIndex);
        // }

        // else if (input0) 
        //     this.value = input0;

        // else if (input1) 
        //     this.value = input1;
            
        // else 
        //     this.value = ColorValue.NaN.copy();


        const values = [];
        
        for (const _input of this.inputs)
        {
            const input = await evalColorStopOrListValue(_input, parse);

            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    const value = await evalColorStopValue(item, parse);
                    values.push(value);
                }
            }
            else
            {
                const value = await evalColorStopValue(input, parse);
                values.push(value);
            }
        }
        
        
        const maxDec = 0;//values.reduce((max, v) => Math.max(max, v.decimals), 0);


        const deg =
            degree.value < 3
            ? Math.min(degree.value, 2) + 1
            : 1;

        const nSegments = Math.floor((values.length-1)/deg);
        const index     = Math.min(Math.floor((values.length-1)/deg * amount.value/100), nSegments-1);


        if (values.length == 1)
            this.value = values[0];

        // else if (values.length > 0
        //       && index < values.length - deg)
        // {
        //     const localAmount = 
        //         nSegments > 1
        //         ? (amount.value/100 - index/nSegments) * nSegments
        //         : amount.value/100;


        //     if (degree.value == 0) // linear
        //     {
        //         const val0 = values[index*deg  ];
        //         const val1 = values[index*deg+1];

        //         this.value = new NumberValue(
        //             lerp(val0.value, val1.value, localAmount),
        //             maxDec);
        //     }
        //     else if (degree.value == 1) // quadratic
        //     {
        //         const val0 = values[index*deg  ];
        //         const val1 = values[index*deg+1];
        //         const val2 = values[index*deg+2];

        //         this.value = new NumberValue(
        //             lerp2(val0.value, val1.value, val2.value, localAmount),
        //             maxDec);
        //     }
        //     else if (degree.value == 2) // cubic
        //     {
        //         const val0 = values[index*deg  ];
        //         const val1 = values[index*deg+1];
        //         const val2 = values[index*deg+2];
        //         const val3 = values[index*deg+3];

        //         this.value = new NumberValue(
        //             lerp3(val0.value, val1.value, val2.value, val3.value, localAmount),
        //             maxDec);
        //     }
        //     else if (degree.value == 3) // cosine
        //     {
        //         const val0 = values[index*deg  ];
        //         const val1 = values[index*deg+1];

        //         this.value = new NumberValue(
        //             lerpCos(val0.value, val1.value, localAmount),
        //             maxDec);
        //     }
        //     else
        //         this.value = ColorValue.NaN.copy();
        // }

        else                  
            this.value = ColorValue.NaN.copy();
        
        
        this.setUpdateValues(parse,
        [
            ['value',  this.value],
            ['space',  space     ],
            ['gamma',  gamma     ],
            ['amount', amount    ],
            ['degree', degree    ]
        ]);
        

        this.validate();
        
        return this;
    }



    interpolate(space, col0, col1, f, gamma)
    {
        if (   space ==  2  // hsl
            || space ==  3  // hsv
            || space ==  9  // hcl/ok
            || space == 10  // hcl/ab
            || space == 11) // hcl/uv
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
        else // cartesian
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
    }



    isValid()
    {
        return super.isValid()
            &&  this.inputs.length > 0
            && !this.inputs.find(i => !i.isValid())
            &&  this.space  && this.space .isValid()
            &&  this.gamma  && this.gamma .isValid()
            &&  this.amount && this.amount.isValid()
            &&  this.degree && this.degree.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.space ) this.space .pushValueUpdates(parse);
        if (this.gamma ) this.gamma .pushValueUpdates(parse);
        if (this.amount) this.amount.pushValueUpdates(parse);
        if (this.degree) this.degree.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.space ) this.space .invalidateInputs(parse, from, force);
        if (this.gamma ) this.gamma .invalidateInputs(parse, from, force);
        if (this.amount) this.amount.invalidateInputs(parse, from, force);
        if (this.degree) this.degree.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.space ) this.space .iterateLoop(parse);
        if (this.gamma ) this.gamma .iterateLoop(parse);
        if (this.amount) this.amount.iterateLoop(parse);
        if (this.degree) this.degree.iterateLoop(parse);
    }
}
