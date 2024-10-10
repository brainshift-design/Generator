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


        const paths = [];
        
        for (const _input of this.inputs)
        {
            const input = await evalVectorPathValue(_input, parse);

            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    const path = await evalVectorPathValue(item, parse);
                    paths.push(path);
                }
            }
            else
            {
                const path = await evalVectorPathValue(input, parse);
                paths.push(path);
            }
        }
        
        
        if (paths.length == 1)
            this.value = paths[0];

        else if (paths.length > 0)
        {
            // convert all paths to cubic

            // find the index and localAmount for maxSegments

            

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
                this.value = VectorPathValue.NaN();
        }

        else                  
            this.value = VectorPathValue.NaN();


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



    toNewValue()
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