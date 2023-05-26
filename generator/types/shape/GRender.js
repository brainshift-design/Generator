class GRender
extends GShapeBase
{
    inputs = [];



    constructor(nodeId, options)
    {
        super(RENDER, nodeId, options);
    }



    copy()
    {
        const copy = new GRender(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        // this.value = new ShapeGroupValue(this.nodeId);

        //this.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

        
            if (this.options.enabled)
            {
                for (let j = 0; j < this.inputs[i].objects.length; j++, o++)
                {
                    const obj = copyFigmaObject(this.inputs[i].objects[j]);

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;
                    obj.final    = true;

                    this.objects.push(obj);
                }
            }
        }


        //await this.evalShapeBase(parse, input);


        // this.evalObjects(parse);


        this.updateValues = [['', NullValue]];


        this.validate();

        return this;
    }



    // copyObject(obj, inputIndex)
    // {
    //     const copy = obj.copy(); 
    
    //     if (this.inputs.length > 1)
    //         copy.inputIndex = inputIndex; 
    
    //     return copy;
    // }
    

    
    // async evalObjects(parse, options = {})
    // {
    //     if (!this.options.enabled)
    //         return;
            

    //     if (this.nodeId == 'group2')
    //     {
    //         console.log('this.value =', this.value);
    //         //console.log('input.objects =', [...input.objects]);
    //     }

    //     if (this.value.items)
    //     {
    //         const group = new FigmaShapeGroup(
    //             this.nodeId,
    //             this.nodeId,
    //             this.nodeName);


    //         for (const item of this.value.items)
    //         {
    //             for (let i = 0; i < item.objects.length; i++)
    //             {
    //                 const obj  = item.objects[i].copy();
    //                 obj.nodeId = this.nodeId;

    //                 obj.objectId = 
    //                       obj.objectId 
    //                     + OBJECT_SEPARATOR 
    //                     //+ (obj.inputIndex >= 0 ? obj.inputIndex + INPUT_SEPARATOR : '')
    //                     + this.nodeId;

    //                 obj.listId = -1;

    //                 group.children.push(obj);
    //             }
    //         }
            

    //         this.objects = [group];

    //         // this.updateValues.push(['nObjects', new NumberValue(
    //         //     this.items.objects 
    //         //     ? this.items.objects.length
    //         //     : 0)]);
    //     }
    //     else
    //     {
    //         this.objects = [];
    //         // this.updateValues.push(['nObjects', new NumberValue(0)]);
    //     }

        
    //     await super.evalObjects(parse);
    // }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }



    isValid()
    {
        if (!super.isValid()) 
            return false;

        for (const input of this.inputs)
            if (!input.isValid())
                return false;

        return true;
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        this.inputs.forEach(i => i.invalidateInputs());
    }
}