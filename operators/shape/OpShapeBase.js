class   OpShapeBase
extends OperatorBase
{
    constructor(type, id, name, icon, defWidth = defNodeWidth)
    {
        super(type, id, name, icon, defWidth);
    }



    setName(newName, options = {})
    {
        super.setName(newName, options);

        if (isValid(options.updateNodes))
            pushUnique(options.updateNodes, this);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
                
        
        const input = this.node.inputs[0];
        
        if (input)
            request.push(input.connected ? 1 : 0);
        
        
        const paramIds = [];
        
        
        if (   input
            && input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (   param.input 
                    && (   param.input.connected
                        || param.alwaysRequest)
                    && param.canShow())
                    paramIds.push(param.id);
        }
        else
        {
            for (const param of this.node.params)
                if (param.canShow())
                    paramIds.push(param.id);
        }


        request.push(paramIds.length);

        for (const paramId of paramIds)
            request.push(paramId, ...this.node.params.find(p => p.id == paramId).genRequest(gen));            


        this.node.genRequestInherited(gen, request);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    genRequestInherited(gen, request)
    {

    }



    updateParams()
    {
        const enable = !this.inputs[0].connected;
        
        for (const param of this.params)
            param.enableControlText(enable);

        this.updateParamControls();
    }
}
