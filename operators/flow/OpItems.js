class   OpItems
extends OperatorBase
{
    constructor()
    {
        super(ITEMS, 'items', 'items');


        this.addInput (new Input([LIST_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

    //     return this.node.genRequest(gen);
    // }



    // genRequest(gen)
    // {
    //     // 'this' is the node

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


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

        const oldParams = [...this.params];
        //console.log('oldParams =', [...oldParams]);

        const action = actionFromId(actionId);

        if (action)
            pushUnique(oldParams, action.oldOutputParams);

        // console.log('action =', action);

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
                if (!value.isValid()) continue;


                const id    = 'item' + i;

                const param = oldParams.find(p => 
                       p.id == id
                    && p.type == value.type);

                if (   param
                    && paramIds.includes(param.id)) 
                {
                    this.addParam(param, true);

                    const _conn = oldParamConns.find(c =>
                           c.outputNodeId == this.id
                        && c.outputId     == param.id);

                    if (_conn)
                    {
                        const conn = uiConnect(param.output, nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId));
                        uiSaveConn(conn);
                    }
                }
                else       
                    this.createAndAddParamByType(value.type, id, false, false, true, true);
            }
        }

        else if (isEmpty(paramIds))
            this.removeAllParams();
    
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const value = values[paramIds.findIndex(id => id == 'value')];

        specifyListOutput(value, this.outputs[0]);
    }



    updateParams()
    {
        for (const param of this.params)
            param.enableControlText(false);

        this.updateParamControls();
    }
}