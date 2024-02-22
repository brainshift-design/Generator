class GReversePath
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(REVERSE_PATH, nodeId, options);
    }



    copy()
    {
        const copy = new GReversePath(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        if (   input
            && input.objects.length > 0
            && input.objects[0].pathPoints)
        {
            this.value = input;

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = new NullValue();
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
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

                if (   this.options.enabled
                    && (   obj.type == VECTOR_PATH
                        || obj.type == ARC_PATH))
                {
                  //  obj.points     = obj.points    .reverse();
                  //console.log('1 obj pathPoints =', [...obj.pathPoints]);
                  obj.pathPoints = obj.pathPoints.reverse();
                  //console.log('2 obj pathPoints =', [...obj.pathPoints]);
                  //  obj.updatePathPoints();
                  // obj.updatePathData();
                  //console.log('1 obj pathData =', obj.pathData);
                  obj.pathData = getPathDataFromPoints(obj.pathPoints, obj.closed, obj.degree);
                  //console.log('2 obj pathPoints =', obj.pathData);
                }
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
}