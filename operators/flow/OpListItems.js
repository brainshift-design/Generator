class   OpListItems
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(LIST_ITEMS, 'items', 100);

        this.addInput (new Input (LIST_TYPES, this.input_getValuesForUndo));
        //this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysLoadParams = true;
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
                case NUMBER_VALUE: this.addParam(new NumberParam(name, name, true,  false,  true)); break;
                case  COLOR_VALUE: this.addParam(new  ColorParam(name, name, true,  false,  true)); break;
                case   FILL_VALUE: this.addParam(new   FillParam(name, name, true,  false,  true)); break;
                case STROKE_VALUE: this.addParam(new StrokeParam(name, name, true,  false,  true)); break;
                case  STYLE_VALUE: this.addParam(new  StyleParam(name, name, true,  false,  true)); break;
            }
        }

        
        super.updateValues(updateParamId, paramIds, values);
    }
}