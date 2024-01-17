class   OpPoint
extends OpShapeBase
{
    paramX;
    paramY;

    zoom = 1;



    constructor()
    {
        super(POINT, 'point', 'point', iconPoint);

        this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramX = new NumberParam('x', 'X', true, true, true, 0));
        this.addParam(this.paramY = new NumberParam('y', 'Y', true, true, true, 0));

        this.paramX.isNodeValue = this.headerInputs[0].connected;
        this.paramY.isNodeValue = this.headerInputs[0].connected;


        this.setAllParamDividers(0.45);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return new PointValue(
            this.nodeId,
            this.node.paramX.value,
            this.node.paramY.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
        this.node.paramX.setValue(value.x, false, true, false);
        this.node.paramY.setValue(value.y, false, true, false);
    }



//     paramIsConsideredDefault(param)
//     {
//         return  param.isDefault()
//             && !this.inputs[0].connected;
//     }



//     toJavascript(gen)
//     {
//         const conn = this.inputs[0].connected;


//         gen.nTab++;
//         const defs = this.toJsDefs(gen);
//         gen.nTab--;


//         let js = gen.NL + 'function ' + this.name + '(';
        
//         if (   conn 
//             && defs == NULL)
//             js += 'input';

//         js += ')';


//         js += gen.NL + '{';
//         gen.nTab++;


//         js += defs;


//         js += gen.NL + 'return ';
//         js += conn ? 'input' : this.toJsCode(gen);
//         js += ';'


//         gen.nTab--;
//         js += gen.NL + '}';


//         return js;
//     }



//     toJsDefs(gen)
//     {
//         if (  !this.inputs[0].connected
//             || gen.connectedOut(this))
//             return '';

        
//         let js = '';


//         js += gen.NL + 'const input = ';
//         js += this.inputs[0].connectedOutput.toJsCode(gen);
//         js += ';';


//         return js;
//     }



//     toJsCode(gen)
//     {
//         return this.inputs[0].connected
//              ? this.inputs[0].connectedOutput.toJsCode(gen)
//              : this.paramValue.value.toJsCode(gen);
//     }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const x = values[paramIds.findIndex(id => id == 'x')];
        const y = values[paramIds.findIndex(id => id == 'y')];

        this.paramX.setValue(x, false, true, false);
        this.paramY.setValue(y, false, true, false);
    }



    updateParams()
    {
        const isNodeValue = this.headerInputs[0].connected;

        this.paramX.enableControlText(!isNodeValue, this.paramX.isUnknown() || this.isUnknown() || this.hasConditionOutputs());
        this.paramY.enableControlText(!isNodeValue, this.paramY.isUnknown() || this.isUnknown() || this.hasConditionOutputs());

        this.params.forEach(p => p.isNodeValue = isNodeValue);

        this.updateParamControls();
    }
}