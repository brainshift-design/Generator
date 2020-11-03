var worker = new Worker(
    window.URL.createObjectURL(
        new Blob([generateWorker.textContent])));
      

function updateCanvas()
{
    postGenerateMessage();
}


function postGenerateMessage()
{
    worker.postMessage(
    {
        msg:   'generate',
        graph: JSON.stringify(graph.activeNode.output.data)
    });
}