class GCircleCenter
extends GOperator3
{
    constructor(nodeId, options)
    {
        super(CIRCLE_CENTER, nodeId, options);
    }


    
    // reset()
    // {
    //     super.reset();
    // }



    copy()
    {
        const copy = new GCircleCenter(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalPointValue(this.input0, parse);
        const input1 = await evalPointValue(this.input1, parse);
        const input2 = await evalPointValue(this.input2, parse);


        if (   input0 && input0.isValid()
            && input1 && input1.isValid()
            && input2 && input2.isValid())
        {
            const pc = circleCenter(
                input0.toPoint(),
                input1.toPoint(),
                input2.toPoint());

            this.value = PointValue.fromPoint(this.nodeId, pc);
        }
        else
        {
            this.value = PointValue.NaN();
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }
}