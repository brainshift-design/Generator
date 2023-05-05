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
                this.updateValues.push([this.paramIds[i], param.toValue()]);
            }
        }
        else
            this.updateValues.push(['', NullValue]);
                
        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    invalidate()
    {
        super.invalidate();

        this.inputs.forEach(i => i.invalidate())
        this.params.forEach(p => p.invalidate())
    }
}
