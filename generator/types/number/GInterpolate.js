class GInterpolate
extends GOperator
{
    inputs = [];

    amount;
    degree;



    constructor(nodeId, options)
    {
        super(NUMBER_INTERPOLATE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.inputs = [];

        this.amount = null;
        this.degree = null;
    }



    copy()
    {
        const copy = new GInterpolate(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.amount) copy.amount = this.amount.copy();
        if (this.degree) copy.degree = this.degree.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const amount = await evalNumberValue(this.amount, parse);
        const degree = await evalNumberValue(this.degree, parse);


        const values = [];
        
        for (const _input of this.inputs)
        {
            const input = await evalNumberOrListValue(_input, parse);

            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    const value = await evalNumberValue(item, parse);
                    values.push(value);
                }
            }
            else
            {
                const value = await evalNumberValue(input, parse);
                values.push(value);
            }
        }
        
        
        const maxDec = values.reduce((max, v) => Math.max(max, v.decimals), 0);

        const deg =
            degree.value < 3
            ? Math.min(degree.value, 2) + 1
            : 1;

        const nSegments = Math.floor((values.length-1)/deg);
        const index     = Math.min(Math.floor((values.length-1)/deg * amount.value/100), nSegments-1);


        if (values.length == 1)
            this.value = values[0];

        else if (values.length > 1
              && index < values.length - deg)
            this.value = interpolateNumberValue(values, index, nSegments, deg, degree, amount, maxDec);

        else                  
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['value',  this.value],
            ['amount', amount    ],
            ['degree', degree    ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return  super.isValid()
            &&  this.inputs.length > 0
            && !this.inputs.find(i => !i.isValid())
            &&  this.amount && this.amount.isValid()
            &&  this.degree && this.degree.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.amount) this.amount.pushValueUpdates(parse);
        if (this.degree) this.degree.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.amount) this.amount.invalidateInputs(parse, from, force);
        if (this.degree) this.degree.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.amount) this.amount.iterateLoop(parse);
        if (this.degree) this.degree.iterateLoop(parse);
    }
}



function interpolateNumberValue(values, index, nSegments, deg, degree, amount, maxDec)
{
    const localAmount = 
        nSegments > 1
            ? (amount.value/100 - index/nSegments) * nSegments
            :  amount.value/100;


    if (degree.value == 0) // linear
    {
        const val0 = values[index*deg  ];
        const val1 = values[index*deg+1];

        return new NumberValue(
            lerp(val0.value, val1.value, localAmount),
            maxDec);
    }
    else if (degree.value == 1) // quadratic
    {
        const val0 = values[index*deg  ];
        const val1 = values[index*deg+1];
        const val2 = values[index*deg+2];

        return new NumberValue(
            lerp2(val0.value, val1.value, val2.value, localAmount),
            maxDec);
    }
    else if (degree.value == 2) // cubic
    {
        const val0 = values[index*deg  ];
        const val1 = values[index*deg+1];
        const val2 = values[index*deg+2];
        const val3 = values[index*deg+3];

        return new NumberValue(
            lerp3(val0.value, val1.value, val2.value, val3.value, localAmount),
            maxDec);
    }
    else if (degree.value == 3) // cosine
    {
        const val0 = values[index*deg  ];
        const val1 = values[index*deg+1];

        return new NumberValue(
            lerpCos(val0.value, val1.value, localAmount),
            maxDec);
    }
    else
        return NumberValue.NaN();
}