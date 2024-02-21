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


        if (input)
        {
            this.value = input;

            input.points.items.reverse();

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
            // this.value.objects = getValidObjects(this.input.value);


            // if (isListType(this.value.type))
            // {
            //     for (let i = 0; i < this.value.items.length; i++)
            //         this.value.items[i].objects = this.value.objects.filter(o => o.itemIndex == i);
            // }
   
            


            // if (   this.value.type == VECTOR_PATH_VALUE
            //     && this.value.objects
            //     && this.value.objects.length > 0
            //     && this.value.points.objects)
            // {
            //     for (let i = 0; i < this.value.objects[0].points.length; i++)
            //     {
            //         const p = this.value.objects[0].points[i].toPoint();
    
            //         this.value.points.objects[i].x = p.x;
            //         this.value.points.objects[i].y = p.y;
            //     }
            // }


            // if (showCenter > 0)
            // {
            //     const objects = [...this.value.objects]; // avoids infinite growth
            //     objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
            // }
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