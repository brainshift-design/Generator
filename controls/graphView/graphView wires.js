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
    const yOffset = menuBar.offsetHeight;

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
    
    const cw      = graphView.clientWidth;
    const ch      = graphView.clientHeight;
    const yOffset = menuBar  .offsetHeight;


    wires.forEach(w => 
    {
        const ro = boundingRect(w.connection.output.div);
        const ri = boundingRect(w.connection.input .div);

        // console.log('w.connection.output.div =', w.connection.output.div);
        // console.log('ro =', ro);
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


    for (let i = 0; i < wires.length; i++)
    {
        const conn   = wires[i].connection;
        const input  = conn.input;
        const output = conn.output;

        // const isSolo = 
        //         graphView._soloNode
        //     && (    input.node == graphView._soloNode
        //         || output.node == graphView._soloNode);

        show(wires[i],       /*(settings.showWires || isSolo) &&*/ conn != graphView.savedConn);
        show(wires[i].curve, /*(settings.showWires || isSolo) &&*/ conn != graphView.savedConn);
        show(wires[i].xp1,   /*(settings.showWires || isSolo) &&*/ conn != graphView.savedConn);
        show(wires[i].xp2,   /*(settings.showWires || isSolo) &&*/ conn != graphView.savedConn);

        if (wires[i].outBall) show(wires[i].outBall, !graphView.tempConn || graphView.tempConn.output);
        if (wires[i]. inBall) show(wires[i]. inBall, !graphView.tempConn || graphView.tempConn. input);
    }
}