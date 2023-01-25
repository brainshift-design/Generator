class   OpShapeBase
extends OperatorBase
{
    paramStyle;


    constructor(type, shortType, defWidth = 100)
    {
        super(type, shortType, defWidth);
    }



    addBaseParams()
    {
        //this.addParam(this.paramStyle = new StyleParam('style', 'style', true, false));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
                
        
        const paramIds = [];
        
        
        const input = this.node.inputs[0];

        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected
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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        const enable = !this.inputs[0].connected;
        
        for (const param of this.params)
            param.enableControlText(enable);

        this.updateParamControls();
    }
}
