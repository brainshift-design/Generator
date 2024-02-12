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


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        if (input)
        {
            consoleAssert(input.type == VECTOR_PATH_VALUE, 'input must be VECTOR_PATH_VALUE');

            this.length = new NumberValue(0, -2);

            const points = input.points.items.map(p => p.toPoint());

            
            for (let i = 0; i < points.length - input.degree.value; i += (input.degree.value+1))
            {
                switch (input.degree.value)
                {
                    case 0:
                        this.length.value += distv(
                            points[i  ], 
                            points[i+1]);
                        break;

                    case 1:
                        this.length.value += arcLength2(
                            points[i  ], 
                            points[i+1],
                            points[i+2]);
                        break;

                    default:
                        this.length.value += arcLength3(
                            points[i  ], 
                            points[i+1],
                            points[i+2],
                            points[i+3]);
                        break;
                }
            }
        }
        else
            this.length = NumberValue.NaN.copy();
    

        this.setUpdateValues(parse,
        [
            ['length', this.length]
        ]);


        this.validate();

        return this;
    }
}
