graphView.overInput  = null;
graphView.overOutput = null;

graphView.tempConn = null;


graphView.addEventListener('pointerdown', e =>
{
    if (graphView.overOutput)
    {
        graphView.overOutput.connecting = true;
        graphView.startConnectionFromOutput(graphView.overOutput);
        graphView.tempConn.updateWireFromOutput(e.clientX, e.clientY);
    }
    else if (graphView.overInput)
    {
        if (graphView.overInput.connectedOutput) // pretend to disconnect
        {
            graphView.startConnectionFromOutput(graphView.overInput.connectedOutput);
            graphView.tempConn.updateWireFromOutput(e.clientX, e.clientY);
            graphView.tempConn.savedInput = graphView.overInput;
            hide(graphView.overInput.connection.wire);
            hide(graphView.overInput.connection.wire.outBall);
        }
        else
        {
            graphView.overInput.connecting = true;
            graphView.startConnectionFromInput(graphView.overInput);
            graphView.tempConn.updateWireFromInput (e.clientX, e.clientY)
        }
    }
});

graphView.addEventListener('pointerup', e =>
{
    if (graphView.tempConn)
    {
        if (graphView.tempConn.output) 
        {
            graphView.tempConn.output.connecting = false;
            
            if (graphView.overInput)
            {
                if (graphView.tempConn.savedInput == graphView.overInput)
                {
                    show(graphView.overInput.connection.wire);
                    show(graphView.overInput.connection.wire.outBall);
                }
                else if (graphView.tempConn.savedInput)
                {
                    graph.disconnect(graphView.tempConn.savedInput);
                    graph.connect(graphView.tempConn.output, graphView.overInput);
                }
                else
                    graph.connect(graphView.tempConn.output, graphView.overInput);
            }
            else if (graphView.tempConn.savedInput)
                graph.disconnect(graphView.tempConn.savedInput)
            
            graphView.cancelConnection();
        }
        
        else if (graphView.tempConn.input) 
        {
            graphView.tempConn.input.connecting = false;
            
            if (graphView.overOutput)
                graph.connect(graphView.overOutput, graphView.tempConn.input);

            graphView.cancelConnection();
        }
    }
});

graphView.addEventListener('pointermove', e =>
{
    if (graphView.tempConn)
    {
             if (graphView.tempConn.output) graphView.tempConn.updateWireFromOutput(e.clientX, e.clientY);
        else if (graphView.tempConn.input ) graphView.tempConn.updateWireFromInput (e.clientX, e.clientY);
    }
});


graphView.startConnectionFromOutput = output =>
{
    graphView.tempConn = new Connection(output, null);
    wires.appendChild(graphView.tempConn.wire);    
};


graphView.startConnectionFromInput = input =>
{
    graphView.tempConn = new Connection(null, input);
    wires.appendChild(graphView.tempConn.wire);    
};


graphView.cancelConnection = () =>
{
    wires.removeChild(graphView.tempConn.wire);    
    graphView.tempConn = null;
};