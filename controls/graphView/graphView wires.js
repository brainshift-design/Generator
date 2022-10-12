graphView.addWire = function(wire, updateTransform = true)
{
    graphView.wires.push(wire);
    wireContainer.appendChild(wire);

    if (updateTransform)
        updateWire(wire);
};



graphView.removeWire = function(wire)
{
    wireContainer.removeChild(wire);    
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

        pOut.push(point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset));
        pIn .push(point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset));
    });

    
    for (let i = 0; i < wires.length; i++)
    {
        const wire = wires[i];

        // the yOffset is to start wire coords just below the control bar,
        // not at the top of the window

        wire.updateCurve  (pOut[i].x, pOut[i].y, pIn[i].x, pIn[i].y);
        wire.updateOutBall(pOut[i].x, pOut[i].y                    );
        wire.updateInBall (                      pIn[i].x, pIn[i].y);

        wire.updateStyle(wire.getColor());

        wire.setAttribute('width',  cw);
        wire.setAttribute('height', ch);
        wire.setAttribute('stroke-width', 1.6 * graphView.zoom);
    
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

        const isSolo = 
                graphView._soloNode
            && (    input.node == graphView._soloNode
                || output.node == graphView._soloNode);

        show(wires[i],         (settings.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].curve,   (settings.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].xp1,     (settings.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].xp2,     (settings.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].outBall, !graphView.tempConn || graphView.tempConn.output);
        show(wires[i]. inBall, !graphView.tempConn || graphView.tempConn. input);
    }
}