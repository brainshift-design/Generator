class   OpRepeat
extends OperatorBase
{
    paramCount;
    paramWhile;
    paramLoop;



    constructor()
    {
        super(REPEAT, 'repeat', 'repeat', iconRepeat, defNodeWidth, true);

        this.isMultiplier = true;
        this.canDisable   = true;

        
        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        this.addParam(this.paramCount = new NumberParam('count', 'count', true,  true, true, 1, 0, 1000, 0));
        this.addParam(this.paramWhile = new NumberParam('while', 'while', true,  true, true, 1, 0, 1));
        this.addParam(this.paramLoop  = new NumberParam('loop',  '',      false, true, false));


        this.paramCount.controls[0].allowEditDecimals = false;
        this.paramCount.divider                       = 0.52;
        this.paramCount.affectsHeader                 = false;

        this.paramWhile.divider                       = 0.6;

        this.paramLoop.input.types.push(NUMBER_LIST_VALUE);
        this.paramLoop.input.types.push(START);
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
        request.push(...this.node.paramWhile.genRequest(gen));
        request.push(...this.node.paramLoop .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type  = values[paramIds.findIndex(id => id == 'type' )];
        const count = values[paramIds.findIndex(id => id == 'count')];

        if (count) this.paramCount.setValue( count, false, true, false);

        this.outputs[0].types = 
               type
            && type.isValid()
            ? [type.value]
            : [LIST_VALUE];

        this.endNodeProgress();
    }



    updateParams()
    {
        this.paramCount.enableControlText(true);
        this.paramWhile.enableControlText(false);
        this.paramLoop .enableControlText(false);

        this.paramWhile.controls[0].valueText = '﻿';


        const arrowStyle = darkMode ? 'white' : 'black';
        this.paramLoop.controls[0].valueText = '<svg width="14" height="12" viewBox="0 -1 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 0H14L14 2C14 4.76142 11.7614 7 8.99999 7H1V6H8.99999C11.2091 6 13 4.20914 13 2L13 0Z" fill="' + arrowStyle + '"/><rect width="4.97369" height="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0.712646 7.224)" fill="' + arrowStyle + '"/><rect width="5" height="1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0 6.54858)" fill="' + arrowStyle + '"/></svg>';

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        const type = this.outputs[0].types[0];

        colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

        return colors;
    }
}