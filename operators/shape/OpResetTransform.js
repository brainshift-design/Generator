class   OpResetTransform
extends OperatorBase
{
    paramShowCenter;


    menuBoolShowCenter;



    constructor()
    {
        super(RESET_XFORM, 'reset', 'reset space', iconResetXform);

        this.canDisable  = true;
        this.iconOffsetY = -2;


        this.addInput (new Input([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true, 0, 0, 1));


        this.paramShowCenter.controls[0].allowEditDecimals = false;
        this.paramShowCenter.divider = 0.68;

        this.menuBoolShowCenter = createBoolMenu(this.paramShowCenter);


        this.inputs[0].addEventListener('connect',    e => this.outputs[0].types = [...this.inputs[0].connectedOutput.types]);
        this.inputs[0].addEventListener('disconnect', e => this.outputs[0].types = [SHAPE_VALUE]);
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

        request.push(...this.node.paramShowCenter.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        updateParamConditionText(this.paramShowCenter,  this.paramShowCenter.isUnknown(), false, 1);

        this.updateParamControls();
    }



    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors(options);

    //     const type = 
    //         this.inputs[0].connected 
    //         ? this.inputs[0].connectedOutput.node.type 
    //         : this.type;

    //     // colors.back = 
    //     //     this.headerColor
    //     //     ? this.headerColor
    //     //     : this.inert
    //     //     ? rgb_a(rgbDocumentBody, 0.95)
    //     //     : rgb_a(rgbFromType(type, this.active), 0.95);


    //     colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

    //     colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
    //     colors.output = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
    //     colors.wire   = rgbFromType(type, true);

    //     return colors;
    // }
}



// function OpCopy_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpCopy_onDisconnectInput(node)
// {
//     node.outputs[0].types = [ANY_VALUE];
// }