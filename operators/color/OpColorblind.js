class   OpColorBlind
extends OpColorBase
{
    paramL;
    paramM;
    paramS;



    constructor()
    {
        super(COLORBLIND, 'colorblind');


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR], this.output_genRequest));


        this.addParam(this.paramL = new NumberParam('l', 'L', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.paramM = new NumberParam('m', 'M', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.paramS = new NumberParam('s', 'S', false, true, true, 2, 0, 2, 0, 0.02));

        this.paramL.addEventListener('change', () => this.paramL.controls[0].dragScale = decCount(numToString(this.paramL.value, this.paramL.controls[0].displayDec)) == 0 ? 0.02 : 0.05);
        this.paramM.addEventListener('change', () => this.paramM.controls[0].dragScale = decCount(numToString(this.paramM.value, this.paramM.controls[0].displayDec)) == 0 ? 0.02 : 0.05);
        this.paramS.addEventListener('change', () => this.paramS.controls[0].dragScale = decCount(numToString(this.paramS.value, this.paramS.controls[0].displayDec)) == 0 ? 0.02 : 0.05);


        this.header.connectionPadding = 18;
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


        request.push(...this.node.paramL.genRequest(gen));
        request.push(...this.node.paramM.genRequest(gen));
        request.push(...this.node.paramS.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            value
            ? value.toDataColor()
            : dataColor_NaN;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.updateParamText(this.paramL, 'L');
        this.updateParamText(this.paramM, 'M');
        this.updateParamText(this.paramS, 'S');

        this.updateParamControls();
    }



    updateParamText(param, cone)
    {
        const v = Math.round(param.value.value);

             if (v == 2) param.controls[0].valueText = cone;
        else if (v == 1) param.controls[0].valueText = cone + ' weak';
        else             param.controls[0].valueText = cone + ' blind';
    }
}