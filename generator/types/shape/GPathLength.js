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

            this.length = new NumberValue(
                curveLength(
                    Math.min(input.degree.value, 2) + 1, 
                    input.points.items.map(p => p.toPoint())),
                -2);
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
