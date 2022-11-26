class   OpItems
extends OperatorBase
{
    constructor()
    {
        super(ITEMS, 'items', 100);

        this.addInput (new Input (LIST_TYPES, this.input_getValuesForUndo));

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;
    }



    canAutoConnectFrom(output)
    {
        return output.supportsTypes(LIST_TYPES);
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
        const oldParams     = [...this.params];
        const oldParamConns = this.getAllParamConnections();


        this.disconnectAllParams();
        this.removeAllParams();


        if (   paramIds.length > 1
            ||    paramIds.length == 1 
               && paramIds[0] != 'noitems')
        {
            for (let i = 0; i < values.length; i++)
            {
                const value = values[i];
                const id    = 'item' + i;

                const param = oldParams.find(p => 
                       p.id   == id
                    && p.type == value.type);

                if (param) 
                {
                    this.addParam(param);

                    const _conn = oldParamConns.find(c =>
                           c.outputNodeId == this.id
                        && c.outputId     == param.id);

                    if (_conn)
                        uiConnect(param.output, nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId));
                }
                else       
                    this.addParamByType(value.type, id, false, false, true);
            }
        }

        else if (paramIds.length == 0)
            this.removeAllParams();
    
        
        super.updateValues(updateParamId, paramIds, values);
    }



    updateParams()
    {
        super.updateParams();

        for (const param of this.params)
            param.enableControlText(false);
    }
}