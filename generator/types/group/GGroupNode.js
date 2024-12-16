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
                this.setUpdateValues(parse, [[this.paramIds[i], param.toNewValue()]], true);
            }
        }
        else
            this.setUpdateValues(parse, [['', new NullValue()]], true);
                
        
        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
        this.params.forEach(p => p.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
        this.params.forEach(p => p.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
        this.params.forEach(p => p.iterateLoop(parse));
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const group = new GGroupNode(nodeId, options);


        let nParams = -1;
        
        if (!ignore)
        {
            nParams = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }


        if (parse.settings.logRequests) 
            logReq(group, parse, ignore);//, nParams);


        if (ignore)
        {
            genParseNodeEnd(parse, group);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        //const nParams = parseInt(parse.move());

        for (let i = 0; i < nParams; i++)
        {
            group.paramIds.push(parse.move());
            group.params  .push(genParse(parse));
        }


        parse.nTab--;


        genParseNodeEnd(parse, group);
        return group;
    }
}
