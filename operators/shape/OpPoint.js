class   OpPoint
extends OpShapeBase
{
    paramX;
    paramY;

    zoom = 1;



    constructor()
    {
        super(POINT, 'point', 'point', iconPoint);

        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramX = new NumberParam('x', 'x', true, true, true, 0));
        this.addParam(this.paramX = new NumberParam('y', 'y', true, true, true, 0));
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

        console.assert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
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
}