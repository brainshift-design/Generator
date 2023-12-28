class   OpSelectFromList
extends OperatorBase
{
    paramIndex;

    value;
    length;



    constructor()
    {
        super(SELECT_FROM_LIST, 'select', 'select', iconSelectFromList);

        this.alwaysSaveParams  = true;
        this.showHeaderTooltip = true;
        this.iconOffsetY       = -2.5;


        this.addInput (new Input (LIST_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, true, 0));

        this.paramIndex.divider                       = 0.55;
        this.paramIndex.controls[0].allowEditDecimals = false;


        this.value  = new NullValue();
        this.length = new NumberValue(0);
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramIndex.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        
        this.value  = values[paramIds.findIndex(id => id == 'value' )];
        this.length = values[paramIds.findIndex(id => id == 'length')];
        const type  = values[paramIds.findIndex(id => id == 'type'  )];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramIndex.enableControlText(true, this.paramIndex.isUnknown());


        const min = Math.min(0, -this.length.value+1);
        const max = Math.max(0,  this.length.value-1);

        this.paramIndex.controls[0].setMin(0, min);
        this.paramIndex.controls[0].setMax(max, max);


        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

      
        if (   this.outputs[0].supportsTypes([COLOR_VALUE])
            && this.value.isValid())
        {
            colors.output  =
            colors.outWire = this.value.toRgb();
        }
        else if (this.outputs[0].supportsTypes([FILL_VALUE])
              && this.value.isValid())
        {
            colors.output  =
            colors.outWire = this.value.color.toRgb();
        }
        else
        {
            const gray =
                    this.active
                && !this.inputs[0].connected;

            colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
            colors.outWire = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);
        }
        
        return colors;
    }
}