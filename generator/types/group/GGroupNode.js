class GGroupNode
extends GOperator
{
    paramIds = [];
    params   = [];



    constructor(nodeId, options)
    {
        super(GROUP_NODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GGroupNode(this.nodeId, this.options);

        copy.copyBase(this);

        copy.params = this.params.map(p => p.copy());

        return copy;
    }



    paramFromId(paramId)
    {
        return this.params[this.paramIds.findIndex(id => id == paramId)];
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.updateValues = [];


        if (!isEmpty(this.params))
        {
            for (let i = 0; i < this.params.length; i++)
            {
                const param = await this.params[i].eval(parse);
                this.setUpdateValues(parse, [[this.paramIds[i], param.toValue()]], true);
            }
        }
        else
            this.setUpdateValues(parse, [['', NullValue]], true);
                
        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse))
        this.params.forEach(p => p.pushValueUpdates(parse))
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.inputs.forEach(i => i.invalidateInputs(parse, from))
        this.params.forEach(p => p.invalidateInputs(parse, from))
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse))
        this.params.forEach(p => p.iterateLoop(parse))
    }
}
