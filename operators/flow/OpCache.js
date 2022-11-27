class   OpCache
extends OperatorBase
{
    paramNumber;
    paramColor;
    // paramFill;
    // paramStroke;
    // paramStyle;
    // paramList;



    constructor()
    {
        super(CACHE, 'cache', 90);

        this.addInput (new Input (ALL_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output([], this.output_genRequest));

        this.inputs[0].addEventListener('connect',    e => { OpCache_onConnectInput(this); });
        this.inputs[0].addEventListener('disconnect', e => OpCache_onDisconnectInput(this));


        this.paramNumber = new NumberParam('value', '', false, false, false);
        this.paramColor  = new ColorParam ('value', '', false, false, false);
        // this.paramFill   = new FillParam  ('value', '', false, false, false);
        // this.paramStroke = new StrokeParam('value', '', false, false, false);
        // this.paramStyle  = new StyleParam ('value', '', false, false, false);
        // this.paramList   = new ListParam  ('value', '', false, false, false);

        this.alwaysLoadParams = true;
    }



    canAutoConnectFrom(output)
    {
        return this.inputs[0].canConnect(output);
    }



    isCached()
    {
        return this.cached;
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });
        
        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        // const input = this.node.inputs[0];

        // if (input.connected) request.push(...pushInputOrParam(input, gen));
        // else                 request.push(...this.node.paramValue.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        // const input  = this.inputs[0];
        // const output = this.outputs[0];


        // const showValue = 
        //        !input.connected
        //     || !output.followedByMultiplier();

            
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



function OpCache_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].types];
}



function OpCache_onDisconnectInput(node)
{
    node.outputs[0].types = [];
}