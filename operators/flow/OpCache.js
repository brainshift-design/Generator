class   OpCache
extends OperatorBase
{
    paramNumber;
    paramColor;



    constructor()
    {
        super(CACHE, 'cache', 90);

        this.cached = true;
        //this.inert  = true;
        
        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));

        this.paramNumber = new NumberParam('value', '', false, false, false);
        this.paramColor  = new  ColorParam('value', '', false, false, false);

        this.inputs[0].addEventListener('connect',    () => OpCache_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpCache_onDisconnectInput(this));

        //this.alwaysLoadParams = true;
    }
    
    

    isCached()
    {
        return true;
    }



    canAutoConnectFrom(output)
    {
        return true;
    }

    

    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values) // virtual
    {
        const val = values[paramIds.findIndex(id => id == 'value')];

        if (this.params.length > 0) 
            this.params[0].setValue(val);
    }



    updateNode()
    {
        super.updateNode();


        if (this.params.length > 0)
        {
            this.div   .style.borderBottomLeftRadius  = '0px';        
            this.inner .style.borderBottomLeftRadius  = '0px';        
            this.header.style.borderBottomLeftRadius  = '0px';        

            this.div   .style.borderBottomRightRadius = '0px';        
            this.inner .style.borderBottomRightRadius = '0px';        
            this.header.style.borderBottomRightRadius = '0px';        
        }
        else
        {
            this.div   .style.borderRadius = '4px';        
            this.inner .style.borderRadius = '4px';        
            this.header.style.borderRadius = '4px';        
        }
    }


    
    paramsToJson(nTab = 0)
    {
        return '';
    }
}



function OpCache_onConnectInput(node)
{
    const inOutput = node.inputs[0].connectedOutput;

    node.outputs[0].types = [...inOutput.types];

         if (inOutput.supportsTypes(NUMBER_TYPES)) node.addParam(node.paramNumber);
    else if (inOutput.supportsTypes( COLOR_TYPES)) node.addParam(node.paramColor);
}



function OpCache_onDisconnectInput(node)
{
    node.outputs[0].types = [];
    
    node.removeAllParams();
}