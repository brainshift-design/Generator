GraphView.prototype.addConnWires = function(conn, updateTransform = true)
{
    this.addWire(conn.wire, updateTransform);
};



GraphView.prototype.addWire = function(wire, updateTransform = true)
{
    this.wires.push(wire);
    this.wireContainer.appendChild(wire.svg);
};



GraphView.prototype.removeConnWires = function(conn)
{
    this.removeWire(conn.wire);
};



GraphView.prototype.removeWire = function(wire)
{
    if (this.wireContainer.contains(wire.svg))
        this.wireContainer.removeChild(wire.svg);    

    if (this.wires.includes(wire))
        removeFromArray(this.wires, wire);
};



GraphView.prototype.updateWires = function(_wires)
{
    //logFunction('GraphView.updateWires()');
    
    const wires = [..._wires];


    const nWires = wires.length;

    for (let i = 0; i < nWires; i++)
    {
        if (wires[i].connection.proxy)
            pushUnique(wires, wires[i].connection.proxy.wire);
    }


    const pOut    = [];
    const pIn     = [];
    
    const cw      = this.measureData.clientRect.width;
    const ch      = this.measureData.clientRect.height;
    
    const yOffset = getTopHeight() + 1;


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

        wire.updateCurve(pOut[i].x, pOut[i].y, pIn[i].x, pIn[i].y);

        if (wire.outBall) wire.updateOutBall(pOut[i].x, pOut[i].y);
        if (wire. inBall) wire.updateInBall (pIn [i].x, pIn [i].y);

        wire.updateStyle();

        wire.svg.setAttribute('width',  cw);
        wire.svg.setAttribute('height', ch);
    
        wire.svg.setAttribute('viewBox',
                    0
            + ' ' + 0
            + ' ' + cw
            + ' ' + ch);
    }
};