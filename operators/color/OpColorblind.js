class   OpColorBlind
extends OpColorBase
{
    paramL;
    paramM;
    paramS;



    constructor()
    {
        super(COLORBLIND, 'colorblind', 80);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output(COLOR, this.output_genRequest));


        this.addParam(this.paramL = new NumberParam('l', 'L', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.paramM = new NumberParam('m', 'M', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.paramS = new NumberParam('s', 'S', false, true, true, 2, 0, 2, 0, 0.02));

        this.paramL.addEventListener('change', () => this.paramL.control.dragScale = decCount(numToString(this.paramL.value, this.paramL.control.displayDec)) == 0 ? 0.02 : 0.05);
        this.paramM.addEventListener('change', () => this.paramM.control.dragScale = decCount(numToString(this.paramM.value, this.paramM.control.displayDec)) == 0 ? 0.02 : 0.05);
        this.paramS.addEventListener('change', () => this.paramS.control.dragScale = decCount(numToString(this.paramS.value, this.paramS.control.displayDec)) == 0 ? 0.02 : 0.05);


        this.header.connectionPadding = 18;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [req, ignore] = this.node.genRequestStart(gen);
        if (ignore) return req;


        const input = this.node.inputs[0];

        if (input.connected)
            req.push(...pushInputOrParam(input, gen));


        req.push(...this.node.paramL.genRequest(gen));
        req.push(...this.node.paramM.genRequest(gen));
        req.push(...this.node.paramS.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return req;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;


        super.updateValues(updateParamId, paramIds, values);


        this.updateParamText(this.paramL, 'L');
        this.updateParamText(this.paramM, 'M');
        this.updateParamText(this.paramS, 'S');
    }



    updateParamText(param, cone)
    {
        const v = Math.round(param.value);

             if (v == 2) param.control.valueText = cone;
        else if (v == 1) param.control.valueText = cone + ' weak';
        else             param.control.valueText = cone + ' blind';
    }
}