class   OpPoint3
extends OpShapeBase
{
    static { Operator.types[POINT] = this; }



    paramX;
    paramY;
    paramZ;

    zoom = 1;



    constructor()
    {
        super(POINT3, 'point', 'point', iconPoint);

        this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramX = new NumberParam('x', 'X', true, true, true, 0));
        this.addParam(this.paramY = new NumberParam('y', 'Y', true, true, true, 0));
        this.addParam(this.paramZ = new NumberParam('z', 'Z', true, true, true, 0));

        this.paramX.isNodeValue = this.headerInputs[0].connected;
        this.paramY.isNodeValue = this.headerInputs[0].connected;
        this.paramZ.isNodeValue = this.headerInputs[0].connected;


        this.setAllParamDividers(0.43);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return new PointValue(
            this.nodeId,
            this.node.paramX.value,
            this.node.paramY.value,
            this.node.paramZ.value
        );
    }




    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
        this.node.paramX.setValue(value.x, false, true, false);
        this.node.paramY.setValue(value.y, false, true, false);
        this.node.paramZ.setValue(value.z, false, true, false);
    }




    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const x = values[paramIds.findIndex(id => id == 'x')];
        const y = values[paramIds.findIndex(id => id == 'y')];
        const z = values[paramIds.findIndex(id => id == 'z')];

        this.paramX.setValue(x, false, true, false);
        this.paramY.setValue(y, false, true, false);
        this.paramZ.setValue(z, false, true, false);

    }



    updateParams()
    {
        const isNodeValue = this.headerInputs[0].connected;

        const commonUnknown = 
                  this.inputs[0].connected 
               && this.isUnknown()
            || this.hasConditionOutputs();

        this.paramX.enableControlText(!isNodeValue, this.paramX.isUnknown() || commonUnknown);
        this.paramY.enableControlText(!isNodeValue, this.paramY.isUnknown() || commonUnknown);
        this.paramZ.enableControlText(!isNodeValue, this.paramZ.isUnknown() || commonUnknown);

        this.params.forEach(p => p.isNodeValue = isNodeValue);


        this.updateParamControls();
    }
}