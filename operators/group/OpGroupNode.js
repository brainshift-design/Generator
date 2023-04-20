class   OpGroupNode
extends OperatorBase
{
    constructor()
    {
        super(GROUP_NODE, 'group', 'group');


        this.saveParams = false;


        graph.currentPage.groupId = this.id;
        graph.updateSavedPages();
    }



    output_genRequest(gen)
    {
        if (   this.paramNode
            && this.paramNode.inputs[0].connected)
            request.push(...this.paramNode.inputs[0].connectedOutput.genRequest(gen));

            
        // 'this' is the output        

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL }); 


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        request.push(this.params.length);

        for (const param of this.params)
            request.push(param.name, ...param.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    genRequest(gen) // for when there are no header outputs
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: null });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        request.push(this.params.length);

        for (const param of this.params)
            request.push(param.name, ...param.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        for (const param of this.params)
            param.enableControlText(param.input ? true : false);

        this.updateParamControls();
    }
}