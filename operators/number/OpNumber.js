class   OpNumber
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(NUMBER, 'num', 70);

        this.addInput (new Input (NUMBER_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));

        this.alwaysLoadParams = true;
    }



    canAutoConnectFrom(output)
    {
        return this.inputs[0].canConnect(output);
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

        if (input.connected) request.push(...pushInputOrParam(input, gen));
        else                 request.push(...this.node.paramValue.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        const input  = this. inputs[0];
        const output = this.outputs[0];
        
        //this.paramValue.control.style.display = 'block';
        this.paramValue.enableControlText(!input.connected);

        // const output = this.outputs[0];


        this.paramValue.control.valueText = 
                input.connected
            && !input.connectedOutput.node.isCached()
            &&  this.followedByMultiplier()
            ? UNKNOWN_DISPLAY
            : '';

            
        // if (showValue)
        // {
        //     this.paramValue.control.style.display = 'block';
        //     this.paramValue.enableControlText(!input.connected);

        //     this.div   .style.borderBottomLeftRadius  = '0px';        
        //     this.inner .style.borderBottomLeftRadius  = '0px';        
        //     this.header.style.borderBottomLeftRadius  = '0px';        

        //     this.div   .style.borderBottomRightRadius = '0px';        
        //     this.inner .style.borderBottomRightRadius = '0px';        
        //     this.header.style.borderBottomRightRadius = '0px';        
        // }
        // else
        // {
        //     this.paramValue.control.style.display = 'none';

        //     this.div   .style.borderRadius = '4px';        
        //     this.inner .style.borderRadius = '4px';        
        //     this.header.style.borderRadius = '4px';        
        // }


         super.updateParams();
    }



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && !this.inputs[0].connected;
    }
}