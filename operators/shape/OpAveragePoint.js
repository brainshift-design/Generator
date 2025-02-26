class   OpAveragePoint
extends OperatorBase
{
    static { Operator.types[AVERAGE_POINT] = this; }



    paramIndex;

    value;
    length;



    constructor()
    {
        super(AVERAGE_POINT, 'avgPoint', 'average point', iconAveragePoint);


        //this.outputValueType = ANY_VALUE;
        this.variableInputs  = true;


        this.addNewInput();
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));


        this.value  = new NullValue();
        this.length = new NumberValue(0);
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(
        [
                         POINT_VALUE, 
                        POINT3_VALUE, 
                 VECTOR_VERTEX_VALUE, 
                    POINT_LIST_VALUE, 
                   POINT3_LIST_VALUE, 
            VECTOR_VERTEX_LIST_VALUE
        ]);
            
        newInput.isNew = true;


        newInput.addEventListener('connect', e => 
        {
            onVariableConnectInput(e.detail.input); 
            e.detail.input.isNew = false; 
        });
        
        
        newInput.addEventListener('disconnect', e => 
        {
            onVariableDisconnectInput(e.detail.input);
        });


        this.addInput(newInput);


        return newInput;
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


        const connectedInputs = this.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}