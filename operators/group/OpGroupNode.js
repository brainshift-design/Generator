class   OpGroupNode
extends OperatorBase
{
    constructor()
    {
        super(GROUP_NODE, 'group', 'group', iconGroup);


        this.saveParams = false;


        graph.currentPage.groupId = this.id;
        graph.updateSavedPages();
    }



    output_genRequest(gen)
    {
        // 'this' is the output        
        if (   this.paramNode
            && this.paramNode.inputs[0].connected)
            return this.paramNode.inputs[0].connectedOutput.genRequest(gen);

            
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
        {
            param.enableControlText(param.input ? true : false);
            param.controls[0].showName = param.paramNode.name[0] != '.';
        }

            
        const paramNodes = this.params.map(p => p.paramNode);

        paramNodes.sort((a, b) => 
        {
            // if (a.inputs[0].connected && b.outputs[0].connected) return -1;
            // if (b.inputs[0].connected && a.outputs[0].connected) return  1;
            return a.div.offsetTop - b.div.offsetTop;
        });

        paramNodes.sort((a, b) => 
                a.div.offsetTop - b.div.offsetTop
            && !a.inputs[0].connected 
            &&  b.inputs[0].connected);


        for (let i = 0; i < paramNodes.length; i++)
            paramNodes[i].groupParam.div.style.order = i;


        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        if (!isEmpty(this.headerInputs))
        {
            colors.output  =
            colors.outWire = rgbFromType(this.headerInputs[0].types[0], true);
        }
        else if (!isEmpty(this.headerOutputs))
        {
            colors.output  =
            colors.outWire = rgbFromType(this.headerOutputs[0].types[0], true);
        }

        return colors;
    }
}