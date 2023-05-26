class   OpItems
extends OperatorBase
{
    constructor()
    {
        super(ITEMS, 'items', 'items', iconItems);

        this.iconOffsetY = 1;


        this.addInput (new Input(LIST_VALUES));
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
        // 'this' is the node

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
            for (let i = 0; i < values.length - 1; i++) 
            {
                const value   = values[i];
                const valueId = paramIds[i];
    
                if (  !value.isValid()
                    || valueId == returnValueId) 
                    continue;

                // if (i == 0 && valueId == returnValueId)
                //     continue;

                    
                const param = oldParams.find(p => 
                       p.id   == valueId
                    && p.type == value.type);

                const showName = 
                       value.type == NUMBER_VALUE ;
//                    && value.valueId != '';

                    
                if (   param
                    && paramIds.includes(param.id))
//                    && !(i == 0 && param.id != returnValueId)) 
                {
                    this.addParam(param, true);

                    const _conn = oldParamConns.find(c =>
                           c.outputNodeId == this.id
                        && c.outputId     == param.id);

                    if (_conn)
                    {
                        const inputNode = nodeFromId(_conn.inputNodeId);

                        const conn = uiConnect(
                            param.output, 
                            inputNode.inputFromId(_conn.inputId));

                        uiSaveConn(conn);
                    }
                }
                else
                    this.createAndAddParamByType(value.type, valueId, showName, false, true, true);
            }
        }

        else if (paramIds.length <= 1)
            this.removeAllParams();
    
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const value = values[paramIds.findIndex(id => id == returnValueId)];

        if (LIST_VALUES.includes(value.type))
            this.outputs[0].types = [finalListTypeFromItems(value.items)];
    }



    updateParams()
    {
        for (const param of this.params)
            param.enableControlText(false);

        this.updateParamControls();
    }
}