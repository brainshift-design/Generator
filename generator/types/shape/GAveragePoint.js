class GAveragePoint
extends GOperator
{
    static { GNode.types[AVERAGE_POINT] = this; }



    inputs = [];


    
    constructor(nodeId, options)
    {
        super(AVERAGE_POINT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
    }


   
    copy()
    {
        const copy = new GAveragePoint(this.nodeId, this.options);
        copy.copyBase(this);
        
        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const inputs = await Promise.all(this.inputs.map(async i => await evalTextOrListValue(i, parse)));


        this.value = await evalAveragePointInputs(inputs, parse);

        
        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return !this.inputs.find(i => !i.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }



    static parseRequest(parse, newNode)
    {
        const [type, nodeId, options, ignore] = genParseNodeStart(parse);


        const average = new GAveragePoint(nodeId, options);


        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());


        if (parse.settings.logRequests) 
            logReq(average, parse, ignore, nInputs);


        if (ignore) 
        {
            genParseNodeEnd(parse, average);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        for (let i = 0; i < nInputs; i++)
            average.inputs.push(genParse(parse));


        parse.nTab--;

            
        genParseNodeEnd(parse, average);
        return average;
    }
}



async function evalAveragePointInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return PointValue.NaN();


    const allAreLists = allInputsAreCondensedLists(inputs);
    const type = getBiggestPointType(inputs);

    if (allAreLists) return await evalAveragePointListInputs(inputs, parse, type);
    else             return await evalAveragePointItemInputs(inputs, parse, type);
}



function getBiggestPointType(inputs)
{
    const checkInput = (input) =>
    {
        if (!input) return null;

        if (isListValueType(input.type))
            return getBiggestPointType(input.items);

        if (input.type === POINT3_VALUE)
            return POINT3_VALUE;

        if (   input.type === POINT_VALUE 
            || input.type === VECTOR_VERTEX_VALUE)
            return POINT_VALUE;

        return null;
    };

    let biggestType = null;

    for (const input of inputs)
    {
        const type = checkInput(input);
        if (type === POINT3_VALUE) return POINT3_VALUE;
        if (type === POINT_VALUE ) biggestType = POINT_VALUE;
    }

    return biggestType || POINT_VALUE;
}



async function evalAveragePointListInputs(inputs, parse, type)
{
    const value = new ListValue();

    
    for (const input of inputs)
    {
        if (!input) continue;

        console.assert(
             isListValueType(input.type), 
            `input is ${input.type}, must be a list`);

        if (allInputsAreCondensedLists(input.items))
            value.items.push(...(await evalAveragePointListInputs(input.items, parse, type)).items);
        else
            value.items.push(await evalAveragePointItemInputs(input.items, parse, type));
    }


    return value;
}



async function evalAveragePointItemInputs(inputs, parse, type)
{
    let sumX  = 0;
    let sumY  = 0;
    let sumZ  = 0;
    let count = 0;


    const processPoint = (point) =>
    {
        if (!point || !point.isValid()) return;

        sumX += point.x.value;
        sumY += point.y.value;
        sumZ += point.z ? point.z.value : 0;
        count++;
    };


    for (const input of inputs)
    {
        if (!input) continue;

        if (isListValueType(input.type))
        {
            const list = await evalListValue(input, parse);
            if (!list || !list.isValid()) continue;

            for (const item of list.items)
            {
                let point = await evalPoint3Value(item, parse);
    
                if (!point || !point.isValid())
                {
                    point = await evalPointValue(item, parse);

                    if (!point || !point.isValid())
                        point = await evalVectorVertexValue(item, parse);
                }
    
                processPoint(point);
            }
        }
        else
        {
            let point = await evalPoint3Value(input, parse);
    
            if (!point || !point.isValid())
            {
                point = await evalPointValue(input, parse);
    
                if (!point || !point.isValid())
                    point = await evalVectorVertexValue(input, parse);
            }
    
            processPoint(point);
        }
    }


    if (count == 0)
    {
        return type == POINT3_VALUE 
             ? PointValue3.NaN() 
             : PointValue .NaN();
    }


    const avgX = new NumberValue(sumX / count);
    const avgY = new NumberValue(sumY / count);
    const avgZ = new NumberValue(sumZ / count);


    if (type === POINT3_VALUE)
        return new PointValue3('', avgX, avgY, avgZ);
    else if (type === VECTOR_VERTEX_VALUE)
        return new VectorVertexValue('', avgX, avgY);
    else
        return new PointValue('', avgX, avgY);
}