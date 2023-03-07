class   OpNodeInputs
extends OperatorBase
{
    paramCount;



    constructor()
    {
        super(NODE_INPUTS, 'inputs');

        //this.inert = true;

        
        //this.addInput(new Input(LIST_TYPES));
        this.addParam(this.paramCount = new NumberParam('paramCount', 'parameters', true, true, false, 1, 0, 100, 0));


        // this.alwaysLoadParams = true;
        // this.alwaysSaveParams = true;

        this.paramCount.affectsHeader = false;
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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //logFunction('OpItems.updateValues()');

        const paramCount = values[paramIds.findIndex(id => id == 'paramCount')];
        if (paramCount) this.paramCount.setValue(paramCount, false, true, false);


        const oldParams = [...this.params];

        const action = actionFromId(actionId);

        if (action)
            pushUnique(oldParams, action.oldOutputParams);


        const oldParamConns = this.getAllParamConnections();


        this.disconnectAllParams(true);
        this.removeAllParams();


        if (   paramIds.length > 1
            ||    paramIds.length == 1 
               && paramIds[0] != '')
        {
            for (let i = 0; i < values.length; i++) 
            {
                const value = values[i];
                const id    = 'item' + i;

                const param = oldParams.find(p => p.id == id);

                if (   param
                    && paramIds.includes(param.id)) 
                {
                    this.addParam(param, true);

                    const _conn = oldParamConns.find(c =>
                           c.outputNodeId == this.id
                        && c.outputId     == param.id);

                    if (_conn)
                    {
                        const conn = uiConnect(param.output, this.graph.nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId));
                        uiSaveConn(conn);
                    }
                }
                else       
                    this.addParamByType(value.type, id, false, false, true);
            }
        }

        else if (isEmpty(paramIds))
            this.removeAllParams();
    
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        for (const param of this.params)
            param.enableControlText(false);

        this.updateParamControls();
    }
}