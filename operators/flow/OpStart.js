class   OpStart
extends OperatorBase
{
    paramFeedback;



    constructor()
    {
        super(START, 'start', 'start', iconStart);

        this.canDisable  = true;
        this.iconOffsetY = 2;


        this.addInput (new Input(ALL_VALUES));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.addParam(this.paramFeedback = new NumberParam('feedback', '', false, false, true));

        
        this.inputs[0].addEventListener('connect',    () => OpStart_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpStart_onDisconnectInput(this));
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



    updateParams()
    {
        //super.updateParams();

        this.paramFeedback.enableControlText(true);
        this.paramFeedback.controls[0].valueText = '↱';

        this.updateParamControls();
    }



    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors(options);

    //     const type = 
    //         this.inputs[0].connected 
    //         ? this.inputs[0].connectedOutput.node.type 
    //         : this.type;

    //     colors.back = 
    //         this.headerColor
    //         ? this.headerColor
    //         : this.inert
    //         ? rgb_a(rgbDocumentBody, 0.95)
    //         : rgb_a(rgbFromType(type, this.active), 0.95);


    //     colors.text    = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

    //     colors.input   = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
    //     colors.output  = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
    //     colors.wire    = rgbFromType(type, true);

    //     return colors;
    // }
}



function OpStart_onConnectInput(node)
{
    node. inputs[0].types = [...node.inputs[0].connectedOutput.types];
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
}



function OpStart_onDisconnectInput(node)
{
    node. inputs[0].types = ALL_VALUES;
    node.outputs[0].types = [ANY_VALUE];
}