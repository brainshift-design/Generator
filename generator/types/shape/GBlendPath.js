class GBlendPath
extends GShape
{
    inputs = [];

    amount;
    degree;


    
    constructor(nodeId, options)
    {
        super(BLEND_PATH, nodeId, options);
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
        const copy = new GBlendPath(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        copy.amount = this.amount.copy();
        copy.degree = this.degree.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const amount = this.amount ? (await this.amount.eval(parse)).toValue() : null;
        const degree = this.degree ? (await this.degree.eval(parse)).toValue() : null;


        const paths = [];
        
        for (const _input of this.inputs)
        {
            const input = (await _input.eval(parse)).toValue();

            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    const path = (await item.eval(parse)).toValue();
                    paths.push(path);
                }
            }
            else
            {
                const path = (await input.eval(parse)).toValue();
                paths.push(path);
            }
        }
        
        
        if (paths.length == 1)
            this.value = paths[0];

        else if (paths.length > 0)
        {
            // const index = Math.min(Math.floor((values.length-1)/deg * amount.value/100), nSegments-1);

            // const localAmount = 
            //     nSegments > 1
            //     ? (amount.value/100 - index/nSegments) * nSegments
            //     : amount.value/100;


            // if (degree.value == 0) // linear
            // {
            //     const val0 = paths[index*deg  ];
            //     const val1 = paths[index*deg+1];

            //     this.value = new NumberValue(
            //         lerp(val0.value, val1.value, localAmount),
            //         maxDec);
            // }
            // else if (degree.value == 1) // smooth
            // {
            //     const val0 = paths[index*deg  ];
            //     const val1 = paths[index*deg+1];

            //     this.value = new NumberValue(
            //         lerpCos(val0.value, val1.value, localAmount),
            //         maxDec);
            // }
            // else
                this.value = VectorPathValue.NaN.copy();
        }

        else                  
            this.value = VectprPathValue.NaN.copy();


        await this.evalObjects(parse);


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['amount', amount           ],
            ['degree', degree           ]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = getValidObjects(this.input.value);


            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                // if (PATH_TYPES.includes(obj.type))
                //     obj.pathPoints.reverse();
            }
        }
        
        
        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
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