class   OpAffine
extends OperatorBase
{
    paramCenterX;
    paramCenterY;
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
    
    

    addBaseParams()
    {
        this.addParam(this.paramCenterX     = new NumberParam('centerX',     'center X',     true, true, true,  50, 0, 100));
        this.addParam(this.paramCenterY     = new NumberParam('centerY',     'center Y',     true, true, true,  50, 0, 100));
        this.addParam(this.paramShowCenter  = new NumberParam('showCenter',  'show center',  true, true, true,   0, 0,   1));
        this.addParam(this.paramAffectSpace = new NumberParam('affectSpace', 'affect space', true, true, true,   0, 0,   1));


        this.paramCenterX.controls[0].suffix = '%';
        this.paramCenterY.controls[0].suffix = '%';

        this.paramCenterX.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterX.controls[0].max = Number.MAX_SAFE_INTEGER;

        this.paramCenterY.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterY.controls[0].max = Number.MAX_SAFE_INTEGER;


        this.paramShowCenter .controls[0].allowEditDecimals = false;
        this.paramAffectSpace.controls[0].allowEditDecimals = false;

        this.paramCenterX    .controls[0].divider = 0.55;
        this.paramCenterY    .controls[0].divider = 0.55;
        this.paramShowCenter .controls[0].divider = 0.72;
        this.paramAffectSpace.controls[0].divider = 0.72;


        this.menuBoolShowCenter  = createBoolMenu(this.paramShowCenter );
        this.menuBoolAffectSpace = createBoolMenu(this.paramAffectSpace);
    }



    setPointOffset()
    {
        this.paramCenterX.controls[0].suffix = '';
        this.paramCenterY.controls[0].suffix = '';
    }



    setOtherOffset()
    {
        this.paramCenterX.controls[0].suffix = '%';
        this.paramCenterY.controls[0].suffix = '%';
    }
}



function setAffineOffset(node, 
                            x, 
                            y, 
                            minX = Number.MIN_SAFE_INTEGER, 
                            minY = Number.MIN_SAFE_INTEGER, 
                            maxX = Number.MAX_SAFE_INTEGER, 
                            maxY = Number.MAX_SAFE_INTEGER) 
{
    // node.paramCenterX.setValue(new NumberValue(x));
    // node.paramCenterY.setValue(new NumberValue(y));

    node.paramCenterX.controls[0].setMin(minX);
    node.paramCenterX.controls[0].setMax(maxX);

    node.paramCenterY.controls[0].setMin(minY);
    node.paramCenterY.controls[0].setMax(maxY);
}



function OpAffine_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];    


    if (   node.inputs[0].connectedOutput.types.length == 1
        && node.inputs[0].connectedOutput.types[0] == POINT_VALUE)
    {
        node.setPointOffset();
        setAffineOffset(node, 0, 0);
    }
    else
    {
        node.setOtherOffset();
        setAffineOffset(node, 50, 50, 0, 0, 100, 100);
    }
}



function OpAffine_onDisconnectInput(node)
{
    node.outputs[0].types = [SHAPE_VALUE];

    node.setOtherOffset();
    setAffineOffset(node, 50, 50, 0, 0, 100, 100);
}
