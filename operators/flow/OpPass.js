class   OpPass
extends OperatorBase
{
    paramCondition;

    paramNumber;
    paramColor;

    headerColor = null;



    constructor()
    {
        super(PASS, 'pass', 90);


        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));


        this.paramNumber = new NumberParam('value', '', false, false, false);
        this.paramColor  = new  ColorParam('value', '', false, false, false);

        
        this.inputs[0].addEventListener('connect',    () => OpPass_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpPass_onDisconnectInput(this));
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
        
        request.push(...this.node.paramCondition.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    // updateValues(updateParamId, paramIds, values) // virtual
    // {
    //     const val = values[paramIds.findIndex(id => id == 'value')];

    //     this.headerColor =
    //         val && val.type == COLOR_VALUE
    //         ? rgb_a(val.toRgb(), 1)
    //         : null;

    //     if (this.params.length > 0) 
    //     {
    //         this.params[0].setValue(val);
    //         this.params[0].enableControlText(false);
    //     }
    // }



    // updateNode()
    // {
    //     super.updateNode();


    //     if (this.params.length > 0)
    //     {
    //         this.div   .style.borderBottomLeftRadius  = '0px';        
    //         this.inner .style.borderBottomLeftRadius  = '0px';        
    //         this.header.style.borderBottomLeftRadius  = '0px';        

    //         this.div   .style.borderBottomRightRadius = '0px';        
    //         this.inner .style.borderBottomRightRadius = '0px';        
    //         this.header.style.borderBottomRightRadius = '0px';        
    //     }
    //     else
    //     {
    //         this.div   .style.borderRadius = '4px';        
    //         this.inner .style.borderRadius = '4px';        
    //         this.header.style.borderRadius = '4px';        
    //     }
    // }


    
    // getHeaderColors()
    // {
    //     const colors = super.getHeaderColors();

    //     const type = 
    //         this.inputs[0].connected 
    //         ? this.inputs[0].connectedOutput.node.type 
    //         : this.type;

    //     colors.back = 
    //         this.headerColor
    //         ? this.headerColor
    //         : this.inert
    //         ? rgb_a(rgbDocumentBody, 0.95)
    //         : rgb_a(rgbHeaderFromType(type, this.active), 0.95);

    //     // colors.border = rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

    //     colors.text    = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

    //     colors.input   = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbHeaderFromType(type, true), 0.5), 0.8);
    //     colors.output  = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbHeaderFromType(type, true), 0.5), 0.7);
    //     colors.wire    = rgbHeaderFromType(type, true);

    //     return colors;
    // }



    // paramsToJson(nTab = 0)
    // {
    //     return '';
    // }
}



function OpPass_onConnectInput(node)
{
    const inOutput = node.inputs[0].connectedOutput;

    node.outputs[0].types = [...inOutput.types];

         if (inOutput.supportsTypes(NUMBER_TYPES)) node.addParam(node.paramNumber);
    else if (inOutput.supportsTypes( COLOR_TYPES)) node.addParam(node.paramColor);
}



function OpPass_onDisconnectInput(node)
{
    node.outputs[0].types = [];
    
    node.removeAllParams();
}