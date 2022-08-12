class   OpColorStop
extends OpColorBase
{
    paramFill;
    paramPosition;

    
    constructor()
    {
        super(COLOR_STOP, 'stop');


        this.addInput(new Input([COLOR_STOP, COLOR_STOP_VALUE]));
        this.addOutput(new Output(COLOR_STOP, this.output_genRequest));

        this.addParam(this.paramFill     = new ColorParam ('fill',     '',         false, true, true));
        this.addParam(this.paramPosition = new NumberParam('position', 'position', true,  true, true, 100, 0, 100));

        //this.paramFill.setValue([GColorFillValue.default], false, true, false);
        
        this.paramPosition.control.suffix = '%';
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

        request.push(...this.node.paramFill    .genRequest(gen));
        request.push(...this.node.paramPosition.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const stop = values[paramIds.findIndex(id => id == 'value')];

        
        if (stop.isValid())
        {
            this.paramFill    .setValue([stop.fill],   false, true, false);
            this.paramPosition.setValue(stop.position, false, true, false);

            // this._color = stop.color.toDataColor();
        }
        else
        {
            this.paramFill    .setValue([GColorFillValue.NaN], false, true, false);
            this.paramPosition.setValue( GNumberValue   .NaN,  false, true, false);
            
            this._color = dataColor_NaN;
        }


        super.updateValues(updateParamId, paramIds, values);
    }
}