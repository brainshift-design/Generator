class   OpCopy
extends OperatorBase
{
    paramNumber;
    paramColor;

    headerColor = null;


    constructor()
    {
        super(COPY, 'copy', 'copy');

        //this.cached = true;
        

        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));


        this.paramNumber = new NumberParam('copy', '', false, false, true);
        this.paramColor  = new  ColorParam('copy', '', false, false, true);

        
        this.inputs[0].addEventListener('connect',    () => OpCopy_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpCopy_onDisconnectInput(this));
    }
    
    

    // isCached()
    // {
    //     return true;
    // }



    canAutoConnectFrom(output)
    {
        return true;
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


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values) // virtual
    {
        //super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const val = values[paramIds.findIndex(id => id == 'copy')];

        this.headerColor =
            val && val.type == COLOR_VALUE
            ? rgb_a(val.toRgb(), 1)
            : null;

        if (!isEmpty(this.params)) 
        {
            this.params[0].setValue(val);
            this.params[0].enableControlText(false);
        }
    }



    updateParams()
    {
        const paramValue = this.params.find(p => p.id == 'copy');

        if (paramValue)
        {
            paramValue.enableControlText(false);

            paramValue.controls[0].valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
            paramValue.controls[0].showBar   = !this.isUnknown();
        }

        
        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        const type = 
            this.inputs[0].connected 
            ? this.inputs[0].connectedOutput.node.type 
            : this.type;

        colors.back = 
            this.headerColor
            ? this.headerColor
            : this.inert
            ? rgb_a(rgbDocumentBody, 0.95)
            : rgb_a(rgbFromType(type, this.active), 0.95);

        // colors.border = rgb_a(rgbFromType(this.type, this.active), 0.95);

        colors.text    = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        colors.input   = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output  = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire    = rgbFromType(type, true);

        return colors;
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}



function OpCopy_onConnectInput(node)
{
    const inOutput = node.inputs[0].connectedOutput;

    node.outputs[0].types = [...inOutput.types];

         if (inOutput.supportsTypes(NUMBER_TYPES)) node.addParam(node.paramNumber);
    else if (inOutput.supportsTypes( COLOR_TYPES)) node.addParam(node.paramColor);
}



function OpCopy_onDisconnectInput(node)
{
    node.outputs[0].types = [];
    
    node.removeAllParams();
}