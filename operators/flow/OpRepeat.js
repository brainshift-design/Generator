class   OpRepeat
extends OperatorBase
{
    paramCount;
    paramIteration;
    paramWhile;
    paramLoop;



    constructor()
    {
        super(REPEAT, 'repeat', 'repeat', iconRepeat, defNodeWidth, true);

        this.outputValueType = LIST_VALUE;
        this.isMultiplier    = true;
        this.canDisable      = true;

        
        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        this.addParam(this.paramCount     = new NumberParam('count',     'count',     true,  true, true, 5, 0, Number.MAX_SAFE_INTEGER, 0));
        this.addParam(this.paramIteration = new NumberParam('iteration', 'iteration', true,  true, true, Number.NaN, 0));
        this.addParam(this.paramWhile     = new NumberParam('while',     'while',     true,  true, true, 1, 0, 1));
        this.addParam(this.paramLoop      = new NumberParam('loop',      '',          false, true, false));


        this.paramCount.controls[0].allowEditDecimals = false;
        this.paramCount.affectsHeader                 = false;
        
        this.paramCount    .divider                   = 0.6;
        this.paramIteration.divider                   = 0.6;
        this.paramWhile    .divider                   = 0.6;

        this.paramIteration.input.types.push(TEXT_VALUE);
        this.paramLoop     .input.types.push(ANY_VALUE);

        this.paramLoop.forceInputColorType = ANY_VALUE;


        this.paramLoop.getTooltip = () => 
        {
            if (currentTooltip) 
                hideTooltip(currentTooltip);

            ttParam.innerHTML = 'Close loop';
            return ttParam;
        };


        this.getDescription = () => `"repeats" the input, creating a list of values/objects`;

        this.paramCount    .getDescription = () => `number of times to repeat`;
        this.paramIteration.getDescription = () => `makes possible to force a certain iteration, default is ?`;
        this.paramWhile    .getDescription = () => `if connected, only repeat while this condition is true`;
        this.paramLoop     .getDescription = () => `used to define closed loops`;
    }
    
    

    // isOrPrecededByUncached()
    // {
    //     return !this.paramLoop.input.connected
    //         || !this.paramLoop.input.connectedOutput.node.isOrPrecededByUncached();
    // }



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

        request.push(this.node.headerOutputs.filter(o => o.connected).length > 0 ? 0 : 1); // there are active nodes after this one
        request.push(getActiveAfterNode(this.node, true) ? 1 : 0); // there are active nodes after this one
        request.push(getListAfterNode  (this.node, true) ? 1 : 0); // there is a list node after this one

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramCount    .genRequest(gen));
        request.push(...this.node.paramIteration.genRequest(gen));
        request.push(...this.node.paramWhile    .genRequest(gen));
        request.push(...this.node.paramLoop     .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        // super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type  = values[paramIds.findIndex(id => id == 'type' )];
        const count = values[paramIds.findIndex(id => id == 'count')];

        if (count) 
        {
            this.paramCount.setValue(count, false, true, false);
            this.paramIteration.controls[0].setMax(count.value-1);

            const textConnected =
                   this.paramIteration.input.connected
                && this.paramIteration.input.connectedOutput.types.includes(TEXT_VALUE);

            this.paramIteration.controls[0].overrideText = textConnected ? NAN_DISPLAY : '';
            this.paramIteration.output.types             = textConnected ? [TEXT_VALUE] : [NUMBER_VALUE];
        }


        this.outputs[0].types = 
               type
            && type.isValid()
            ? [type.value]
            : [LIST_VALUE];

        this.endProgress();
    }



    updateParams()
    {
        this.paramCount    .enableControlText(true, this.paramCount    .isUnknown());
        this.paramIteration.enableControlText(true, this.paramIteration.isUnknown());
        this.paramWhile    .enableControlText(false);
        this.paramLoop     .enableControlText(false);

        this.paramWhile.controls[0].valueText = '﻿';

        const arrowStyle = darkMode ? 'white' : 'black';

        this.paramLoop.controls[0].valueText = '<svg width="25" height="12" viewBox="0 -1 25 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.991 0H24.991L24.991 2C24.991 4.76142 22.7524 7 19.991 7H14V6H19.991C22.2001 6 23.991 4.20914 23.991 2L23.991 0Z" fill="'+arrowStyle+'"/><rect width="4.97369" height="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.7036 7.224)" fill="'+arrowStyle+'"/><rect width="5" height="1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 12.991 6.54858)" fill="'+arrowStyle+'"/><circle cx="0.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/><circle cx="4.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/><circle cx="8.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/></svg>';

        this.updateParamControls();
    }
}