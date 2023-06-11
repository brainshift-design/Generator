class   OpRepeat
extends OperatorBase
{
    paramCount;
    paramLoop;



    constructor()
    {
        super(REPEAT, 'repeat', 'repeat', iconRepeat);

        this.canDisable = true;

        
        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        this.addParam(this.paramCount = new NumberParam('count', 'count', true, true, true, 1, 0, 1000, 0));
        this.addParam(this.paramLoop  = new NumberParam('loop',  '',      false, true, false));


        this.paramCount.controls[0].allowEditDecimals = false;
        this.paramCount.divider                       = 0.56;
        this.paramCount.affectsHeader                 = false;

        this.paramLoop.input.types.push(NUMBER_LIST_VALUE);
        this.paramLoop.input.types.push(START);
    }
    
    

    isMultiplier()
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

        request.push(...this.node.paramCount.genRequest(gen));
        request.push(...this.node.paramLoop .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];
        const count = values[paramIds.findIndex(id => id == 'count')];
        const loop  = values[paramIds.findIndex(id => id == 'loop' )];

        if (count) this.paramCount.setValue(count, false, true, false);
        if (loop ) this.paramLoop .setValue(loop,  false, true, false);

        this.outputs[0].types = 
            value
            ? [finalListTypeFromItems(value.items)]
            : [LIST_VALUE];
    }



    updateParams()
    {
        this.paramCount.enableControlText(true);

        this.paramLoop.enableControlText(false);
        this.paramLoop.controls[0].valueText = '<svg width="14" height="12" viewBox="0 -1 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 0H14L14 2C14 4.76142 11.7614 7 8.99999 7H1V6H8.99999C11.2091 6 13 4.20914 13 2L13 0Z" fill="white"/><rect width="4.97369" height="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0.712646 7.224)" fill="white"/><rect width="5" height="1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0 6.54858)" fill="white"/></svg>';

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        // const inputTypes = this.connectedHeaderInputs.map(i => i.connectedOutput.types[0]);

        
        const type = this.outputs[0].types[0];
            // this.inputs[0].connected 
            // ? finalListTypeFromTypes(inputTypes)
            // : this.type;


        // colors.back = rgb_a(rgbFromType(type, this.active), 0.95);


        // colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

        return colors;
    }
}