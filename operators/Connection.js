class Connection
{
    static nextId = 0;

    id;

    output;
    outputOrder; // in which connections FROM THIS OUTPUT were made
    
    input;

    wire;



    constructor(output, input)
    {
        this.id                          = Connection.nextId++;

        this.output                      = output;
        this.outputOrder                 = -1;
                 
        this.input                       = input;


        this.wire                        = this.createWire(this.wire);
   
        this.wire.output                 = this.output;
        this.wire.input                  = this.input;

        this.wire.outBall                = createSvg('circle');
        this.wire.outBall.style.position = 'absolute';

        this.wire.inBall                 = createSvg('circle');
        this.wire.inBall.style.position  = 'absolute';


        this.wire.appendChild(this.wire.curve  );
        this.wire.appendChild(this.wire.curve2 );
        this.wire.appendChild(this.wire.xp1    );
        this.wire.appendChild(this.wire.xp2    );
        this.wire.appendChild(this.wire.outBall);
        this.wire.appendChild(this.wire.inBall );

        
        this.wire.update = (x1, y1, x2, y2) =>
        {
            const cw = graphView.clientWidth;
            const ch = graphView.clientHeight;

            updateWireCurve  (this.wire, x1, y1, x2, y2);
            updateWireOutBall(this.wire, x1, y1        );
            updateWireInBall (this.wire,         x2, y2);
            updateWireStyle  (this.wire);

            this.wire .setAttribute('width',  cw);
            this.wire .setAttribute('height', ch);
        };



        this.wire.getColor = () =>
        {
            const types = [];


            if (this.output)
            {
                if (!isEmpty(this.output.types)) types.push(...this.output.types);
                else                             types.push(this.output.node.type);
            }
            else if (this.input)
            {
                if (   graphView.overOutput
                    && this.input.canConnectFrom(graphView.overOutput)) 
                    types.push(...graphView.overOutput.types);
                else
                {
                    if (!isEmpty(this.input.types)) types.push(...this.input.types);
                    else                             types.push(this.input.node.type);
                }
            }


            return     this.output
                   && !rgbIsNaN(this.output.wireColor)
                 ?  this.output.wireColor
                 :     this.input
                   && !rgbIsNaN(this.input.wireColor)
                   ?  this.input.wireColor
                   : !isEmpty(types)
                     ? rgb_a(rgbHeaderFromType(types[0], true), 1)
                     : rgbaInvalid;
        };
    }



    createWire(wire)
    {
        wire                       = createSvg('svg');
        wire.connection            = this;
        wire.style.position        = 'absolute';
        wire.style.left            = 0;
        wire.style.top             = 0;
        wire.style.overflow        = 'hidden';
  
        wire.curve                 = createSvg('path');
        wire.curve.style.position  = 'absolute';
        wire.curve.style.fill      = 'none';

        wire.curve2                = createSvg('path');
        wire.curve2.style.position = 'absolute';
        wire.curve2.style.fill     = 'none';

        wire.xp1                   = createSvg('path');
        wire.xp1.style.position    = 'absolute';
        wire.xp1.style.fill        = 'none';
  
        wire.xp2                   = createSvg('path');
        wire.xp2.style.position    = 'absolute';
        wire.xp2.style.fill        = 'none';


        wire.outputPos             = point_NaN;
        wire. inputPos             = point_NaN;


        return wire;
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        let json =
              pos
            + '{'
            +       NL + pos + tab + '"outputNodeId": "' + this.output.node.id + '"'
            + ',' + NL + pos + tab + '"outputId": "'     + (this.output.param ? this.output.param.id : this.output.index) + '"'
            + ',' + NL + pos + tab + '"outputOrder": "'  + this.outputOrder + '"'
            + ',' + NL + pos + tab + '"inputNodeId": "'  + this.input.node.id + '"'
            + ',' + NL + pos + tab + '"inputId": "'      + (this.input.param ? this.input.param.id : this.input.index) + '"'
            + ',' + NL + pos + tab + '"list": "'         + boolToString(this.output.supportsTypes(LIST_TYPES)) + '"'
            +       NL + pos
            + '}';

        return json;
    }



    toDataObject()
    {
        return {
            id:           this.id,
            outputNodeId: this.output.node.id,
            outputId:     this.output.id,
            outputOrder:  this.outputOrder,
            inputNodeId:  this.input.node.id,
            inputId:      this.input.id
        };
    }
}



function parseConnectionJsonAndConnect(_conn, pasteConnected)
{
    const outputNode  = nodeFromId(_conn.outputNodeId);
    const outputId    = _conn.outputId;
    const outputOrder = parseInt(_conn.outputOrder);

    const inputNode   = nodeFromId(_conn.inputNodeId);
    const inputId     = _conn.inputId;


    if (   !outputNode 
        ||  isDigit(outputId[0]) && parseInt(outputId) >= outputNode.outputs.length
        || !isDigit(outputId[0]) && !outputNode.params.find(p => p.id == outputId && p.output)
        || !inputNode  
        ||  isDigit(inputId[0]) && parseInt(inputId) >= inputNode.inputs.length
        || !isDigit(inputId[0]) && !inputNode.params.find(p => p.id == inputId && p.input))
    {
        uiError('Cannot connect ' + connToString(_conn));
        return null;
    }
    else
    {
        const conn = uiVariableConnect(
            outputNode, isDigit(outputId[0]) ? parseInt(outputId) : outputNode.params.find(p => p.id == outputId).output.id,
             inputNode, isDigit( inputId[0]) ? parseInt( inputId) :  inputNode.params.find(p => p.id ==  inputId). input.id,
            pasteConnected ? -1 : outputOrder);

        _conn.outputOrder = conn.outputOrder;

        return conn;
    }
}



function legacyParseConnectionJsonAndConnect(_conn, pasteConnected)
{
    const outputNode  =  nodeFromId(_conn.outputOp);
    const outputId    =  outputNode.outputs[_conn.outputIndex].id;
    const outputOrder = -1;//parseInt(_conn.outputOrder);

    const inputNode   =  nodeFromId(_conn.inputOp);
    const inputId     = inputNode.inputs[_conn.inputIndex].id;


    if (   !outputNode 
        ||  isDigit(outputId[0]) &&  parseInt(outputId) >= outputNode.outputs.length
        || !isDigit(outputId[0]) && !outputNode.params.find(p => p.id == outputId && p.output)
        || !inputNode  
        ||  isDigit(inputId[0]) &&  parseInt(inputId) >= inputNode.inputs.length
        || !isDigit(inputId[0]) && !inputNode.params.find(p => p.id == inputId && p.input))
    {
        uiError('Cannot connect ' + connToString(_conn));
        return null;
    }
    else
    {
        const conn = uiVariableConnect(
            outputNode, isDigit(outputId[0]) ? parseInt(outputId) : outputNode.params.find(p => p.id == outputId).output.id,
             inputNode, isDigit( inputId[0]) ? parseInt( inputId) :  inputNode.params.find(p => p.id ==  inputId). input.id,
            pasteConnected ? -1 : outputOrder);

        _conn.outputOrder = conn.outputOrder;

        uiSaveConn(conn);
        
        return conn;
    }
}



// function connEqual(c1, c2)
// {
//     return c1.outputNodeId == c2.outputNodeId
//         && c1.outputId     == c2.outputId
//         //&& c1.outputOrder  == c2.outputOrder // irrelevant to equality
//         && c1.inputNodeId  == c2.inputNodeId
//         && c1.inputId      == c2.inputId;
// }



// function _connEquals(_c, c)
// {

//     return _c.output.node.id == c.outputNodeId
//         && _c.output.id      == c.outputId
//         //&& _c.outputOrder  == c.outputOrder // irrelevant to equality
//         && _c.input.node.id  == c.inputNodeId
//         && _c.input.id       == c.inputId;
// }



function connDataObject(output, input)
{
    return {
        connection:   input.connection,
        id:           -1,
        outputNodeId: output.node.id,
        outputId:     output.id,
        outputOrder:  input.connection.outputOrder,
        inputNodeId:  input.node.id,
        inputId:      input.id
    };
}