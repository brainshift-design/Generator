class Connection
{
    output;
    outputOrder; // in which connections FROM THIS OUTPUT were made
    
    input;

    wire;


    constructor(output, input)
    {
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
                if (this.output.types.length > 0) types.push(...this.output.types);
                else                              types.push(this.output.node.type);
            }
            else if (this.input)
            {
                if (   graphView.overOutput
                    && this.input.canConnectFrom(graphView.overOutput)) 
                    types.push(...graphView.overOutput.types);
                else
                {
                    if (this.input.types.length > 0) types.push(...this.input.types);
                    else                             types.push(this.input.node.type);
                }
            }


            return     this.output
                   && !rgbIsNaN(this.output.wireColor)
                 ? this.output.wireColor
                 : types.length > 0
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
        uiError('cannot connect ' + connToString(_conn));
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



function getConnectionForArrayWithIds(conn)
{
    return {
        outputNodeId: conn.output.node.id,
        outputId:     conn.output.id,
        outputOrder:  conn.outputOrder,
        inputNodeId:  conn.input.node.id,
        inputId:      conn.input.id };
}



function getConnectionForArrayWithNames(conn)
{
    return {
        outputNodeName: conn.output.node.id,
        outputId:       conn.output.id,
        inputNodeName:  conn.input .node.id,
        inputId:        conn.input .id };
}



function updateWireCurve(wire, x1, y1, x2, y2)
{
    if (!pointIsNaN(wire.outputPos))
    {
        x1 = wire.outputPos.x;
        y1 = wire.outputPos.y;
    }

    if (!pointIsNaN(wire.inputPos))
    {
        x2 = wire.inputPos.x;
        y2 = wire.inputPos.y;
    }

    
    const _x0 = x1;
    const _y0 = y1;

    const _x3 = x2;
    const _y3 = y2;


    const tx  = 600 * graphView.zoom;
    const ty  = 300 * graphView.zoom;
    const ecc = 100 * graphView.zoom;

    const yf  = (0.3 + Math.min(Math.abs(y2 - y1) / ty, 0.8));

    const df  = Math.pow((1 - Math.min(Math.abs(_x3 - _x0) / tx, 0.65)), 0.5)
              * yf;

    const dx = 
          (_x3 - _x0) * df 
        * (_x3 < _x0 ? -1 : 1);


    let _x1 = Math.max(_x0 + ecc * Math.pow(0.1 + yf*0.9, 1.5), _x0 + dx);
    let _y1 = _y0;

    let _x2 = Math.min(_x3 - ecc * Math.pow(0.1 + yf*0.9, 1.5), _x3 - dx);
    let _y2 = _y3;


    if (   graphView.tempConn        == wire.connection
        && graphView.tempConn.output == graphView.overOutput)
    {
        _x1 += (_x0 - _x1) * 5/8;
        _y1 += (_y0 - _y1) * 5/8;
    }

    if (   graphView.tempConn       == wire.connection
        && graphView.tempConn.input == graphView.overInput)
    {
        _x2 += (_x3 - _x2) * 5/8;
        _y2 += (_y3 - _y2) * 5/8;
    }

    
    const points =
           'M ' + _x0 + ',' + _y0
        + ' C ' + _x1 + ',' + _y1
        + ' '   + _x2 + ',' + _y2
        + ' '   + _x3 + ',' + _y3;

    wire.xp1   .setAttribute('d', points);
    wire.xp2   .setAttribute('d', points);
    wire.curve .setAttribute('d', points);
    wire.curve2.setAttribute('d', points);
}



function updateWireOutBall(wire, x, y)
{
    wire.outBall.setAttribute('cx', x);
    wire.outBall.setAttribute('cy', y);
}



function updateWireInBall(wire, x, y)
{
    wire.inBall.setAttribute('cx', x);
    wire.inBall.setAttribute('cy', y);
}



function updateWireStyle(wire)
{
    const conn  = wire.connection;
    const color = wire.getColor();


    const l = rgb2hclokl(color)[2];
    
    const bright       = Math.min(Math.max(0, (l-0.6) / 0.4), 1);
    const innerOpacity = Math.round(bright * 44 * Math.min(graphView.zoom, 1)).toString(16).padStart(2, '0');
    const outerOpacity = Math.round(bright * 60).toString(16).padStart(2, '0');

    
    wire.curve.style.filter = 
        !isDark(color)
        ?   'drop-shadow(0px 0px 1px #000000' + innerOpacity + ') '
          + 'drop-shadow(0px 0px 6px #000000' + outerOpacity + ')'
        :   'drop-shadow(0px 0px 1px #ffffff' + innerOpacity + ') '
          + 'drop-shadow(0px 0px 6px #ffffff' + outerOpacity + ')';

     
    let showCurve = true;

    if (   conn.output && color[3] < 1
        || conn. input && color[3] < 1)
    {
        showCurve = 
               conn.output && color[3] > 0
            || conn. input && color[3] > 0;

        wire.xp1.style.display          = 'inline';
        wire.xp1.style.stroke           = rgba2style(rgb_a(isDarkMode() ? [0.067, 0.067, 0.067] : [0.784, 0.784, 0.784], 1 - color[3]));
        wire.xp1.style.strokeDasharray  = 9 * graphView.zoom;

        wire.xp2.style.display          = 'inline';
        wire.xp2.style.stroke           = rgba2style(rgb_a(isDarkMode() ? [0.302, 0.302, 0.302] : [1, 1, 1], 1 - color[3]));//isDarkMode() ? '#4d4d4d' : '#fff';
        wire.xp2.style.strokeDasharray  = 9 * graphView.zoom;
        wire.xp2.style.strokeDashoffset = 9 * graphView.zoom;
    }
    else
    {
        wire.xp1.style.display = 'none';
        wire.xp2.style.display = 'none';
    }


    const wireStyle = rgba2style(color);


    const unknown = 
            conn.output
        && !conn.output.node.isCached()
        &&  conn.input
        &&  conn.input.node.isOrFollowedByMultiplier()
        && (  !conn.input.param 
            || conn.input.param.affectsHeader);


    wire.curve .style.stroke = wireStyle;
    wire.curve2.style.stroke = rgb2style(rgbDocumentBody);//wireStyle;

    wire.curve.style.strokeDasharray = unknown ? 1.7 * graphView.zoom : 0;

    wire. inBall.style.fill = wireStyle;
    wire.outBall.style.fill = wireStyle;


    if (conn.output) conn.output.wireBall.style.background = wireStyle;
    if (conn. input) conn. input.wireBall.style.background = wireStyle;

    // if (this.wire.input)
    //     this.wire.input.updateControl();


    const listType = 
           conn.output
        && conn.output.supportsTypes(LIST_TYPES);


    let width = 1.6 * graphView.zoom;

         if (graphView.zoom < 1/7) width += 1 * (1 - graphView.zoom) * (7 * graphView.zoom);
    else if (graphView.zoom < 1  ) width += 1 * (1 - graphView.zoom);


    wire.curve .setAttribute('stroke-width', width * (listType ? (unknown ? 3.6 : 3.2) : (unknown ? 1.3 : 1)));
    wire.curve2.setAttribute('stroke-width', width * 1.4);

    wire.curve2.setAttribute('display', listType ? 'inline' : 'none');


    wire. inBall.style.r = 3 * graphView.zoom;
    wire.outBall.style.r = 3 * graphView.zoom;

    wire.style.zIndex    = 1;


    const isReordering =   
           isNaN(newReorderIndex)
        || isNaN(oldReorderIndex);


    show(wire,         (this != graphView.savedConn || isReordering));
    show(wire.curve,   showCurve && (this != graphView.savedConn || isReordering));
    show(wire.xp1,     (this != graphView.savedConn || isReordering));
    show(wire.xp2,     (this != graphView.savedConn || isReordering));
    show(wire.outBall, (!graphView.tempConn || graphView.tempConn.output));
    show(wire. inBall, (!graphView.tempConn || graphView.tempConn. input));
}



function connEqual(c1, c2)
{
    return c1.outputNodeId == c2.outputNodeId
        && c1.outputId     == c2.outputId
        //&& c1.outputOrder  == c2.outputOrder // irrelevant to equality
        && c1.inputNodeId  == c2.inputNodeId
        && c1.inputId      == c2.inputId;
}



function _connEquals(_c, c)
{

    return _c.output.node.id == c.outputNodeId
        && _c.output.id      == c.outputId
        //&& _c.outputOrder  == c.outputOrder // irrelevant to equality
        && _c.input.node.id  == c.inputNodeId
        && _c.input.id       == c.inputId;
}



function connDataObject(output, input)
{
    return {
        outputNodeId: output.node.id,
        outputId:     output.id,
        outputOrder:  input.connection.outputOrder,
        inputNodeId:  input.node.id,
        inputId:      input.id
    };
}