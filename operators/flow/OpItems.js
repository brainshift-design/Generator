class   OpItems
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(ITEMS, 'items', 100);

        this.addInput (new Input (LIST_TYPES, this.input_getValuesForUndo));

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;
    }



    canAutoConnectFrom(output)
    {
        return output.supports(LIST_TYPES);
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
        for (const param of this.params)
        {
            const paramIndex = paramIds.findIndex(id => id == param.id);

            if (   paramIndex < 0
                || values[paramIndex].type != param.type)
                this.removeParam(param);
        }


        if (   paramIds.length > 1
            ||    paramIds.length == 1 
               && paramIds[0] != 'value')
        {
            for (let i = 0; i < values.length; i++)
            {
                const value = values[i];
                const id    = 'item' + i;

                if (!this.params.find(p => p.id == id))
                    this.addParamByType(value.type, id, false, false, true);
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