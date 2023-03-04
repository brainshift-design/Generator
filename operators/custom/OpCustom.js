class   OpCustom
extends OperatorBase
{
    graph;


    
    constructor()
    {
        super(CUSTOM, 'custom');

        //graphView.graph = new Graph();
    }
    
    

    genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        // const input = this.inputs[0];


        // request.push(input.connected ? 1 : 0);

        // if (input.connected)
        //     request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values) // virtual
    // {
    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    // }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}
