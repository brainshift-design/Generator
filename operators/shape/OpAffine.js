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

        
        this.addInput (new Input ([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        this.inputs[0].addEventListener('connect',    () => OpAffine_onConnectInput   (this));
        this.inputs[0].addEventListener('disconnect', () => OpAffine_onDisconnectInput(this));
    }
    
    

    addBaseParams(affect)
    {
        this.addParam(this.paramAffectSpace = new NumberParam('affectSpace',  affect + ' space', true, true, true,   0, 0,   1));
        this.addParam(this.paramShowCenter  = new NumberParam('showCenter',  'show center',       true, true, true,   0, 0,   1));


        this.paramShowCenter .controls[0].allowEditDecimals = false;
        this.paramAffectSpace.controls[0].allowEditDecimals = false;

        this.paramShowCenter .divider = 0.7;
        this.paramAffectSpace.divider = 0.7;

        this.menuBoolShowCenter  = createBoolMenu(this.paramShowCenter );
        this.menuBoolAffectSpace = createBoolMenu(this.paramAffectSpace);
    }
}



function OpAffine_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];    


    // if (   node.inputs[0].connectedOutput.types.length == 1
    //     && node.inputs[0].connectedOutput.types[0] == POINT_VALUE)
    // {
    //     node.setPointOffset();
    //     setAffineOffset(node, 0, 0);
    // }
    // else
    // {
        node.setOtherOffset();
        setAffineOffset(node, 50, 50, 0, 0, 100, 100);
    //}
}



function OpAffine_onDisconnectInput(node)
{
    node.outputs[0].types = [SHAPE_VALUE];

    node.setOtherOffset();
    setAffineOffset(node, 50, 50, 0, 0, 100, 100);
}
