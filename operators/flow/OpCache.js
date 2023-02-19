class   OpCache
extends OperatorBase
{
    paramNumber;
    paramColor;

    //headerColor = null;


    constructor()
    {
        super(CACHE, 'cache');

        this.cached = true;
        

        this.addInput(new Input(ALL_TYPES));
        //this.addOutput(new Output([], this.output_genRequest));


        this.paramNumber = new NumberParam('value', '', false, false, true);
        this.paramColor  = new  ColorParam('value', '', false, false, true);

        this.paramNumber.volatile = true;
        this.paramColor .volatile = true;

        
        this.inputs[0].addEventListener('connect',    () => OpCache_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpCache_onDisconnectInput(this));
    }
    
    

    isCached()
    {
        return true;
    }



    canAutoConnectFrom(output)
    {
        return true;
    }

    

    genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values) // virtual
    {
        const val = values[paramIds.findIndex(id => id == 'value')];

        // this.headerColor =
        //     val && val.type == COLOR_VALUE
        //     ? rgb_a(val.toRgb(), 1)
        //     : null;

        if (!isEmpty(this.params)) 
        {
            this.params[0].setValue(val);
            this.params[0].enableControlText(false);
        }
    }



    // getHeaderColors()
    // {
    //     const colors = super.getHeaderColors();

    //     const type = 
    //         this.inputs[0].connected 
    //         ? this.inputs[0].connectedOutput.node.type 
    //         : this.type;

    //     // colors.back = 
    //     //     this.headerColor
    //     //     ? this.headerColor
    //     //     : this.inert
    //     //     ? rgb_a(rgbDocumentBody, 0.95)
    //     //     : rgb_a(rgbHeaderFromType(type, this.active), 0.95);

    //     // colors.border = rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

    //     colors.text    = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

    //     colors.input   = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbHeaderFromType(type, true), 0.5), 0.8);
    //     colors.output  = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbHeaderFromType(type, true), 0.5), 0.7);
    //     colors.wire    = rgbHeaderFromType(type, true);

    //     return colors;
    // }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}



function OpCache_onConnectInput(node)
{
    const inOutput = node.inputs[0].connectedOutput;

    // node.outputs[0].types = [...inOutput.types];

         if (inOutput.supportsTypes(NUMBER_TYPES)) node.addParam(node.paramNumber);
    else if (inOutput.supportsTypes( COLOR_TYPES)) node.addParam(node.paramColor );
}



function OpCache_onDisconnectInput(node)
{
    // node.outputs[0].types = [];
    
    node.removeAllParams();
}