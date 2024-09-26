class GPathLength
extends GOperator1
{
    length;



    constructor(nodeId, options)
    {
        super(PATH_LENGTH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.length = null;
    }



    copy()
    {
        const copy = new GPathLength(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.length) copy.length = this.length.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalVectorPathValue(this.input, parse);


        if (   input
            && input.objects.length > 0)
        {
            consoleAssert(input.type == VECTOR_PATH_VALUE, 'input must be VECTOR_PATH_VALUE');

            const degree = Math.min(input.degree.value, 2) + 1;

            const points = createCcompleteCurve(
                degree, 
                input.objects[0].pathPoints, 
                input.closed.value > 0);


            let length = curveLength(degree, points);


            if (input.closed.value > 0)
            {
                const endPoints = points.slice(points.length - degree);
                length += curveLength(degree, [...endPoints, points[0]]);
            }

            this.length = new NumberValue(length, -2);
        }
        else
            this.length = NumberValue.NaN();
    

        this.setUpdateValues(parse,
        [
            ['length', this.length]
        ]);


        this.validate();

        return this;
    }
}
