class   OpApply
extends OpShape
{
    paramReplace;


    menuReplace;



    constructor()
    {
        super(SHAPE_APPLY, 'apply', 'apply', iconApply);

        this.canDisable = true;

        
        this.addInput (this.createInputForObjects(SHAPE_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));
        
        
        this.addBaseParams();
        this.addParam(this.paramReplace = new NumberParam('replace', 'replace', true, true, true, 0, 0, 1));
        
        
        //this.setAllParamDividers(0.5);
        this.paramReplace.divider = 0.6;


        this.menuBool = createBoolMenu(this.paramReplace);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
                
        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramProps  .genRequest(gen));
        request.push(...this.node.paramReplace.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }

    

    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type  = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.outputs[0].types = [type.value];
    }



    updateParams()
    {
        super.updateParams();

        this.paramReplace.enableControlText(true);

        updateParamConditionText(this.paramReplace, this.paramReplace.isUnknown(), false, 1);

        this.updateParamControls();
    }
}