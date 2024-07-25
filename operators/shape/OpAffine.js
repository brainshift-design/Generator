class   OpAffine
extends OperatorBase
{
    paramAffectSpace;



    constructor(type, id, name, icon)
    {
        super(type, id, name, icon);

        this.canDisable  = true;
        this.iconOffsetY = -1;

        
        this.addInput (new Input ([...SHAPE_VALUES, SHAPE_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));
    }
    
    

    addBaseParamsAfter(affect)
    {
        this.addParam(this.paramAffectSpace = new SelectParam('affectSpace', affect + ' space',  false, true, true, ['space', 'object', 'object & space'], 1));

        this.paramAffectSpace.reverseMenu = true;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];
    }
}
