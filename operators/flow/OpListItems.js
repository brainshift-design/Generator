class   OpListItems
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(LIST_ITEMS, 'items', 100);

        this.addInput (new Input (LIST_TYPES, this.input_getValuesForUndo));

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;
    }



    canAutoConnectFrom(output)
    {
        return arraysIntersect(LIST_TYPES, output.types);
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
            paramId: '' });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        this.removeAllParams();


        for (let i = 0; i < values.length; i++)
        {
            const value = values[i];
            const name  = 'item' + i;

            switch (value.type)
            {
                case NUMBER_VALUE: this.addParam(new NumberParam(name, name, false,  false,  true)); break;
                case  COLOR_VALUE: this.addParam(new  ColorParam(name, name, false,  false,  true)); break;
                case   FILL_VALUE: this.addParam(new   FillParam(name, name, false,  false,  true)); break;
                case STROKE_VALUE: this.addParam(new StrokeParam(name, name, false,  false,  true)); break;
                case  STYLE_VALUE: this.addParam(new  StyleParam(name, name, false,  false,  true)); break;
            }
        }

        
        super.updateValues(updateParamId, paramIds, values);
    }



    updateParams()
    {
        super.updateParams();

        for (const param of this.params)
            param.enableControlText(false);
    }
}