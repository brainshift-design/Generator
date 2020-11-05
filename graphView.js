graphView.addEventListener('pointerdown', e =>
{
    if (graph.overOutput)
    {
        graph.overOutput.connecting = true;
        graph.startConnectionFromOutput(graph.overOutput);
        graph.tempConn.updateWireFromOutput(e.clientX, e.clientY);
    }
    else if (graph.overInput)
    {
        if (graph.overInput.connectedOutput)
        {
            graph.tempConn = graph.overInput.connection;
            graph.disconnect(graph.overInput, false);
            graph.tempConn.input = null;
        }
        else
        {
            graph.overInput.connecting = true;
            graph.startConnectionFromInput(graph.overInput);
            graph.tempConn.updateWireFromInput (e.clientX, e.clientY)
        }
    }
});

graphView.addEventListener('pointerup', e =>
{
    if (graph.tempConn)
    {
        if (graph.tempConn.output) 
        {
            graph.tempConn.output.connecting = false;

            if (graph.overInput)
                graph.connect(graph.tempConn.output, graph.overInput);

            graph.cancelConnection();
        }
        else if (graph.tempConn.input) 
        {
            graph.tempConn.input.connecting = false;

            if (graph.overOutput)
                graph.connect(graph.overOutput, graph.tempConn.input);

            graph.cancelConnection();
        }
    }
});

graphView.addEventListener('pointermove', e =>
{
    if (graph.tempConn)
    {
             if (graph.tempConn.output) graph.tempConn.updateWireFromOutput(e.clientX, e.clientY);
        else if (graph.tempConn.input ) graph.tempConn.updateWireFromInput (e.clientX, e.clientY);
    }
});
