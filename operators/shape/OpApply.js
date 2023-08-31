class   OpApply
extends OpShape
{
    constructor()
    {
        super(SHAPE_APPLY, 'apply', 'apply', iconApply);

        this.canDisable = true;

        
        this.addInput (this.createInputForObjects(SHAPE_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([...SHAPE_VALUES, SHAPE_LIST_VALUE], this.output_genRequest));


        this.addBaseParams();
        this.setAllParamDividers(0.5);
    }
}