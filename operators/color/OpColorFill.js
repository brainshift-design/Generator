class OpColorFill
extends OpColorBase
{
    paramColor;
    paramOpacity;

    
    constructor()
    {
        super(COLOR_FILL, 'fill');


        this.addInput (new Input([COLOR_FILL, COLOR_FILL_VALUE]));
        this.addOutput(new Output(COLOR_FILL, this.output_genRequest));

        this.addParam(this.paramColor   = new ColorParam ('color',   '',        false, true, true));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        //this.paramFill.setValue([GColorFill.default], false, true, false);
        
        this.paramOpacity.control.suffix = '%';
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramColor  .genRequest(gen));
        request.push(...this.node.paramOpacity.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const fill = values[paramIds.findIndex(id => id == 'value')];


        if (fill.isValid())
        {
            this.paramColor  .setValue(fill.color,    false, true, false);
            this.paramOpacity.setValue(fill.opacity,  false, true, false);

            this._color = fill.color.toDataColor();
        }
        else
        {
            this.paramColor  .setValue(GColorValue .NaN, false, true, false);
            this.paramOpacity.setValue(GNumberValue.NaN, false, true, false);
            
            this._color = dataColor_NaN;
        }


        super.updateValues(updateParamId, paramIds, values);
    }
}