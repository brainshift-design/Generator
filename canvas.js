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
        graph: ''
    });
}