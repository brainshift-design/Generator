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


        let   inputs = await Promise.all(this.inputs.map(async i => await evalColorStopValue(i, parse)));
        let   space  = await evalNumberValue(this.space,  parse);
        const gamma  = await evalNumberValue(this.gamma,  parse);
        const amount = await evalNumberValue(this.amount, parse);
        const degree = await evalNumberValue(this.degree, parse);

        if (space) space = space.toInteger();
        

        const _gamma = Math.max(0.0001, gamma.value);
        const _space = colorSpace(space.value);


        let maxInputColorType = COLOR_VALUE;
        
        for (const input of inputs)
        {
            if (input.type == FILL_VALUE)
                maxInputColorType = FILL_VALUE;
        }


        inputs = validateColorStops(inputs);

        setColorStopPositions(inputs);
        inputs.sort((a, b) => a.position.value - b.position.value);



        const opacities = inputs.map(i => i.fill.opacity);
        // const maxDec = opacities.reduce((max, o) => Math.max(max, o.decimals), 0);

        const nSegments = Math.floor(inputs.length-1);


        let index = 0;

        for (let i = 0; i < inputs.length-1; i++)
        {
            if (   amount.value/100 >= inputs[i  ].position.value/100
                && amount.value/100 <= inputs[i+1].position.value/100)
            {
                index = i;
                break;
            }
        }


        if (inputs.length == 1)
            this.value = inputs[0].fill;

        else if (inputs.length > 0
              && index < inputs.length-1)
        {
            let localAmount = 
                nSegments > 1
                ? (amount.value/100 - inputs[index].position.value/100) / (inputs[index+1].position.value/100 - inputs[index].position.value/100) //(amount.value/100 - index/nSegments) * nSegments
                : amount.value/100;


            const val0 = inputs[index  ];
            const val1 = inputs[index+1];

            if (degree.value == 1)
                localAmount = lerpCos(0, 1, localAmount);

            this.value = new FillValue(
                ColorValue.fromDataColor(GColorInterpolate.interpolate(
                    space.value, 
                    convertDataColorToSpace(val0.fill.color.toDataColor(), _space), 
                    convertDataColorToSpace(val1.fill.color.toDataColor(), _space),
                    localAmount,
                    _gamma)),
                new NumberValue(lerp(
                    opacities[index  ].value,
                    opacities[index+1].value,
                    localAmount)));
        }
        else                  
            this.value = ColorValue.NaN();
        
        
        if (   this.value.type   == FILL_VALUE
            && maxInputColorType == COLOR_VALUE) //finalListTypeFromValues(inputs) == COLOR_LIST_VALUE)
            this.value = this.value.color;


        this.setUpdateValues(parse,
        [
            ['value',  this.value       ],
            ['type',   this.outputType()],
            ['space',  space            ],
            ['gamma',  gamma            ],
            ['amount', amount           ],
            ['degree', degree           ]
        ]);
        

        this.validate();
        
        return this;
    }



    static interpolate(space, col0, col1, f, gamma)
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
