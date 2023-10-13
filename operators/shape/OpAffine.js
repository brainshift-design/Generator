class   OpAffine
extends OperatorBase
{
    paramShowCenter;
    paramAffectSpace;


    menuBoolShowCenter;
    menuBoolAffectSpace;



    constructor(type, id, name, icon)
    {
        super(type, id, name, icon);

        this.canDisable  = true;
        this.iconOffsetY = -1;

        
        this.addInput (new Input ([...SHAPE_VALUES, SHAPE_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        // this.inputs[0].addEventListener('connect',    () => OpAffine_onConnectInput   (this));
        // this.inputs[0].addEventListener('disconnect', () => OpAffine_onDisconnectInput(this));
    }
    
    

    addBaseParams(affect)
    {
        this.addParam(this.paramAffectSpace = new NumberParam('affectSpace', affect + ' space', true, true, true, 1, 0, 1));
        this.addParam(this.paramShowCenter  = new NumberParam('showCenter',       'show center', true, true, true, 0, 0, 1));


        this.paramShowCenter .controls[0].allowEditDecimals = false;
        this.paramAffectSpace.controls[0].allowEditDecimals = false;

        this.paramShowCenter .divider = 0.68;
        this.paramAffectSpace.divider = 0.68;

        this.menuBoolShowCenter  = createBoolMenu(this.paramShowCenter );
        this.menuBoolAffectSpace = createBoolMenu(this.paramAffectSpace);
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.outputs[0].types = [type.value];
    }
}



// function OpAffine_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];    
// }



// function OpAffine_onDisconnectInput(node)
// {
//     node.outputs[0].types = [SHAPE_VALUE];
// }
