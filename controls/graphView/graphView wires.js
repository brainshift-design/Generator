graphView.addConnWires = function(conn, updateTransform = true)
{
    graphView.addWire(conn.wire,  updateTransform);
}



graphView.addWire = function(wire, updateTransform = true)
{
    graphView.wires.push(wire);
    wireContainer.appendChild(wire);

    if (updateTransform)
        updateWire(wire);
};



graphView.removeConnWires = function(conn)
{
    graphView.removeWire(conn.wire);
};



graphView.removeWire = function(wire)
{
    if (wireContainer.contains(wire))
        wireContainer.removeChild(wire);    

    if (graphView.wires.includes(wire))
        removeFromArray(graphView.wires, wire);
};



function updateWire(wire, x = 0, y = 0)
{
    const yOffset = menuBarHeight;

    let pOut = point(0, 0),
        pIn  = point(0, 0);


    if (wire.connection.output)
    {
        const ro = boundingRect(wire.connection.output.div);
        pOut = point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset);
    }
    else
        pOut = point(x, y - yOffset);


    if (wire.connection.input)
    {
        const ri = boundingRect(wire.connection.input.div);
        pIn = point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset);
    }
    else
        pIn = point(x, y - yOffset);


    if (wire.update)
        wire.update(
            pOut.x, 
            pOut.y, 
            pIn.x, 
            pIn.y);        
}



function updateWires(wires)
{
    //logFunction('updateWires()');


    const pOut    = [];
    const pIn     = [];
    
    const cw      = graphViewClient.width;
    const ch      = graphViewClient.height;
    const yOffset = menuBarHeight;


    wires.forEach(w => 
    {
        const ro = boundingRect(w.connection.output.div);
        const ri = boundingRect(w.connection.input .div);

        pOut.push(point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset));
        pIn .push(point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset));
    });

       
    for (let i = 0; i < wires.length; i++)
    {
        const wire = wires[i];

        // the yOffset is to start wire coords just below the control bar,
        // not at the top of the window

        updateWireCurve(wire, pOut[i].x, pOut[i].y, pIn[i].x, pIn[i].y);

        if (wire.outBall) updateWireOutBall(wire, pOut[i].x, pOut[i].y);
        if (wire. inBall) updateWireInBall (wire, pIn [i].x, pIn [i].y);

        updateWireStyle(wire);

        wire.setAttribute('width',  cw);
        wire.setAttribute('height', ch);
    
        wire.setAttribute('viewBox',
                    0
            + ' ' + 0
            + ' ' + cw
            + ' ' + ch);
    }


    // for (let i = 0; i < wires.length; i++)
    // {
    //     const conn = wires[i].connection;
    //     const solo = conn != graphView.savedConn;

    //     show(wires[i],       solo);
    //     show(wires[i].curve, solo);
    //     show(wires[i].xp1,   solo);
    //     show(wires[i].xp2,   solo);

    //     if (wires[i].outBall) show(wires[i].outBall, !graphView.tempConn || graphView.tempConn.output);
    //     if (wires[i]. inBall) show(wires[i]. inBall, !graphView.tempConn || graphView.tempConn. input);
    // }
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


    const l = rgb2hclok(color)[2];
    
    let bright = Math.min(Math.max(0, (l-0.6) / 0.4), 1);
    if (darkMode) bright = 1-bright;

    const innerOpacity = Math.round(bright * (darkMode ? 88 : 66) * Math.min(graphView.zoom, 1)).toString(16).padStart(2, '0');

    
    wire.curve.style.filter = 
        darkMode
        ? ( isDark(color, 0.65)
           ?    'drop-shadow(0px 0px 1px #ffffff' + innerOpacity + ')'
           :   ' drop-shadow(0px 0px 1px #000000' + innerOpacity + ')')
        : (!isDark(color)
           ?    'drop-shadow(0px 0px 1px #000000' + innerOpacity + ')'
           :   ' drop-shadow(0px 0px 1px #ffffff' + innerOpacity + ')');

     
    let showCurve = true;

    if (   conn.output && color[3] < 1
        || conn. input && color[3] < 1)
    {
        showCurve = 
               conn.output && color[3] > 0
            || conn. input && color[3] > 0;

        wire.xp1.style.display          = 'inline';
        wire.xp1.style.stroke           = rgba2style(rgb_a(darkMode ? [0.067, 0.067, 0.067] : [0.784, 0.784, 0.784], 1 - color[3]));
        wire.xp1.style.strokeDasharray  = 9 * graphView.zoom;

        wire.xp2.style.display          = 'inline';
        wire.xp2.style.stroke           = rgba2style(rgb_a(darkMode ? [0.302, 0.302, 0.302] : [1, 1, 1], 1 - color[3]));//darkMode ? '#4d4d4d' : '#fff';
        wire.xp2.style.strokeDasharray  = 9 * graphView.zoom;
        wire.xp2.style.strokeDashoffset = 9 * graphView.zoom;
    }
    else
    {
        wire.xp1.style.display = 'none';
        wire.xp2.style.display = 'none';
    }


    const wireStyle = rgba2style(color);

    const isNotCached = 
               conn.output
           &&  conn.output.node
           && !conn.output.node.isCached()
        ||     conn.output
           &&  conn.output.param
           &&  conn.output.param._nodeId != undefined
           &&  nodeFromId(conn.output.param._nodeId)
           && !nodeFromId(conn.output.param._nodeId).isCached();


    const unknown = 
           conn.output
        && isNotCached
        && conn.input
        && conn.input.node.isOrFollowedByMultiplier()
        && (  !conn.input.param 
            || conn.input.param.affectsHeader);


    wire.curve .style.stroke = wireStyle;
    wire.curve2.style.stroke = rgb2style(rgbDocumentBody);//wireStyle;

    wire.curve.style.strokeDasharray = unknown ? 1.7 * graphView.zoom : 0;

    wire. inBall.style.fill = wireStyle;
    wire.outBall.style.fill = wireStyle;


    if (conn.output) conn.output.wireBall.style.background = wireStyle;
    if (conn. input) conn. input.wireBall.style.background = wireStyle;


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


    // show(wire,         (this != graphView.savedConn || isReordering));
    // show(wire.curve,   showCurve && (this != graphView.savedConn || isReordering));
    // show(wire.xp1,     (this != graphView.savedConn || isReordering));
    // show(wire.xp2,     (this != graphView.savedConn || isReordering));
    // show(wire.outBall, (!graphView.tempConn || graphView.tempConn.output));
    // show(wire. inBall, (!graphView.tempConn || graphView.tempConn. input));
}