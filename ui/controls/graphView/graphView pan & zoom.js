graphView._pan = {x:0, y:0};
  
Object.defineProperty(graphView, 'pan',
{
    get: () => graphView._pan,
    set: pan =>
    {
        if (graphView._pan == pan) return;
        graphView._pan = pan;
        graphView.updatePanAndZoom();
    }
});



graphView.panning = false;
graphView.panStart;

graphView.spaceDown = false;


graphView._zoom   = 1;
graphView.oldZoom = 1;

Object.defineProperty(graphView, 'zoom',
{
    get: () => graphView._zoom,
    set: zoom =>
    {
        if (graphView._zoom == zoom) return;

        graphView.oldZoom = graphView.zoom;
        graphView._zoom   = zoom;

        graphView.updatePanAndZoom();
    }
});



graphView.zooming   = false;
graphView.zoomStart = 1;

graphView.zoomSelecting = false;



graphView.setZoomAndPan = (zoom, pan) =>
{
    if (   graphView._zoom == zoom
        && graphView._pan  == pan) 
        return;

    graphView.oldZoom = graphView.zoom;

    graphView._zoom = zoom;
    graphView._pan  = pan;

    graphView.updatePanAndZoom();
};



graphView.updatePanAndZoom = () =>
{
    for (const node of uiGraph.nodes)
        graphView.updateNodeTransform(node);

    graphView.updateScroll();
};



graphView.startPan = pointerId =>
{
    graphView.panning  = true;
    graphView.panStart = graphView.pan;
    graphView.setPointerCapture(pointerId);
    graphView.setPanCursor();
};



graphView.endPan = (pointerId, changeCursor) =>
{
    graphView.panning = false;
    graphView.releasePointerCapture(pointerId);

    if (changeCursor)
        graphView.setAutoCursor();
};



graphView.startZoomSelection = (x, y) =>
{
    graphView.zoomSelecting = true;
    graphView.selectBox = new Rect(x, y, 0, 0);
    
    selectBox.style.visibility = 'visible';
    graphView.updateZoomSelectBox();
};



graphView.updateZoomSelection = (x, y) =>
{
    if (!graphView.zoomSelecting) return;

    graphView.selectBox.w = x - graphView.selectBox.x;
    graphView.selectBox.h = y - graphView.selectBox.y;

    graphView.updateZoomSelectBox();
};



graphView.updateZoomSelectBox = () =>
{
    const selection = graphView.selectBox;

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);
};



graphView.endZoomSelection = (zoom) =>
{
    graphView.zoomSelecting    = false;
    selectBox.style.visibility = 'hidden';

    if (zoom)
    {
        // graphView.oldZoom = graphView.zoom;
        
        const box = {
            x: graphView.selectBox.x,
            y: graphView.selectBox.y,
            w: graphView.selectBox.w,
            h: graphView.selectBox.h };
            
        box.x = (box.x - graphView.pan.x) / graphView.zoom;
        box.y = (box.y - graphView.pan.y) / graphView.zoom;
        box.w =  box.w                    / graphView.zoom;
        box.h =  box.h                    / graphView.zoom;
        
        const diff = { w: (window.innerWidth  / graphView.zoom - box.w)/2,
                       h: (window.innerHeight / graphView.zoom - box.h)/2 };

        graphView.setZoomAndPan(
            graphView.zoom * Math.min(
                window.innerWidth  / graphView.selectBox.w,
                window.innerHeight / graphView.selectBox.h),
            { x: -(box.x - diff.w) * graphView.zoom,
              y: -(box.y - diff.h) * graphView.zoom });
    }

    graphView.selectBox = Rect.NaN;
};



graphView.setPanCursor = () =>
{
    document.body.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48aW1hZ2UgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBSHFrbEVRVlI0WHUyYWY4aVY1Um5IUDlhbXpjM0tkRERkSDJ2WitpUEQvdEJTSEtLQ1EyVmJaTWdnbDAxTENUUmJ0Q1hLSFA1Z1N1UWZNZGtmZ3lrMkZLTWtjU0wrV0RKbExOU2xwaWtSaEdRU1VTMU4zV2JiYW5OOG50M1h1N3ZIOXpYUE9jOXp3dDczZ3B2M25QT2U4enpQOWIyLzE4Lzc2a1UzbDE3ZFhIOTZBT2hoUURkSG9NY0V1amtCZXB4Z2p3bTAwUVFFTzFiYzlnSVFxNDJQOHY5YnRZTUIzdU9xdEs0R0JnRTNBdThBYndML1R1cy9nS3V0VWpjQVhsK2x2d0I4RVZnRXpNODBmQkZZRFR3UGZGd0NvaTNNcUJzQWxWZnhQc0R2Z0xFcVAyVElFSTRmUDU3djlGVGdqOEJOd0YrQk54SWJaRWV0ektnRGdMQnphYS95MXdEZkIzNnJ4cHMyYldMS2xDbWNPSEdDdVhQbnNtM2JOai9lQlh3TnVDMmhjaEJZRE93QlBrcnNxTVU4cWdTZ2JPdlMzcDN2Qzh3R2ZqNXk1RWoyN2R2WHNmT3JWNjltOW16LzFhVThEdndhK0ZkZElGUUZRRGc1ZDF6RjF3SERnZXVBVjREWGdBZVhMRm5DNHNWdTdQOWt6NTQ5akI4L3ZuanQ1K1BHamFOZnYzNXMzYm9Wdnd1OEM0d0FQZ0QrbVh5RXZxRXlxUUtBY0hTOTA0NmY3dXJwTGdYQXNXUEhHRHAwYU1kUGUvWHFlTFFKd0NIZ2ZES0hTazJoQ2dEQzBYMEplQWFZcUJaYnRteGgrUERoTEZpd2dIWHJKQVRGcm5iRmdBc1hQcm14TWtPR0FQY0RMd0IvU3l3d1dsVEdnbFlCOFBkU1h1Vy9BdndaK1BxcVZhdVlOMjlleDI0T0dEQ0EwNmRQTnd2QVE4bEpHaDFrZ2Y1QUZnaEN5MnhvRlFCdFgrcC9PZGw3RWR2S3U3bDA2ZEpDK1NZWjhDandUV0JrOGlWUEF5K1Y4b2FtR1ZFRkFJYTVmc0FOd0tzMUFOQ1pTM2tTK0VVV0hjd1htcEpXQWREK3BmKzF3SURrOGF0bUFLTkhqMmI1OHVYSXBPUVhWRlpmc3pmNUJYT0ZwbGpRS2dCaC80YTdnY0RMVlROZzJMQmhIRGx5cEdOM1I0MGF4Zjc5KzMwdkEzNlovRUtFeUlaWlVBVUFKam9CZ09HcVN3WVlBVko4dnlnUDZDb0s3TjY5dThnUFFzS2ZKRDh3SmFYT0g2WVErWmtDOEZYQUZMWmRBSGl2SHdCbmdMOG5mOUN3R1ZURmdPdVRDYlFUQU0zdFhzREV5eHpoSDgzNGdTc1pnTVBBRHhNQTV4SUFEZWNGVnpJQWVzYjdnRk9BQU9nSGFnY2dBSXUvRmorR3dYQ0NCenJ6QVRvK25WZkZUckN0QU9TbGJsUis2aHIxZmlSQ3BzS2RPa0hqOTlpeFl5K0tBZ0tqNk8xektWZUpuVVFCQVpoZVlrRERDZEhsbUVBb2JNenZiMDBEV0tHNTY2YSttNjE5QUIzaG56b0RvT0hZZElrZlpHR3dMUUJFc2VOT1c2ditDcml6aytjek0xbWJtaGNYTWVCS0JzQlUxMkpITy84TmNJL0tyRnk1a2hFalJuRDQ4T0hDcnMrZDB3Y1ZEUXM3UUxVQ0VQNEVxSjBCN3I3S1creVlkeityY3VYR3hjR0RCMW0wYUJFN2R1em8yT2h5VmxjbEE5b0pnTHZ2amxycVBnQThZVXBhZGxhaDNMSmx5enFhSFo4WEFLTFEwY1BQQVg1V0xrektPN3RyMXk3bXo1L1BvVU5GU1ZDTHRKTUJPajRMSFV2ZE85TGhSY0dBdkRncGEzbisvSG42OXZWbjljaG5CWUNsN25KZ3NtcHQzNzZkU1pNbTFhUGhwMXkxblFEa0ptQ3o0MmJnS2VBYlB1UEdqUnVaT3RVRG5mWktPd0hJbmFCSmp1V3VKemNMMCtFbWE5ZXVaY2FNR1cxRm9BUkExQUkyVEswRktzMEVEWU9SNjBlcWE5L3ZGdUNud0xmVXZOd0JyaHVOVWlhWUYwT1d3NVVDb0M2UkNJVXpOQlYyYVFZL0FXNzFTeXRXckdEaFFvbFJ2OHlhTllzMWE5WjRvejhBUDY2N0dveFVPRnJmTWtGekVBUVBNMlhDN1Q2TkFBaEUzYUx6M2JsenA3ZDVEbGlXQUFnVHFLVWN0aGpTSVFxQ1RBZ1FCRUxuS0FpR3llSXdSSk9vVXdZT0hNaXBVN1lBaXFKTUVPd0lDWUFtVUFzQTNxd3pFS3dHZ3cyUEFhUDlvazVSNTFpSDdOMjd0MmlSSi9rZThIbzZPQlVBYTVGYWU0S0NFSkhCNGtnbUNJTG1JQkNQeEFDRTRkRXdXYlZNbno2ZDlldlhlMW1yVCszL0wxbFRWQUFhbHN2cEIrUVhEUkRDSER3UHpFRXdaYlpYd01TSkV6OVJJRFg4WktVZmJONjh1UmlzU0xJQStEM3dQbkEyaFVBUFJ4cVdSZ0h3QnJsakRDYVlMa2VFZUJENHJsLzBkUGpBZ2FKTDFwS2NPWE9HL3YyOWZDRk9rM2dvOGw2cEk5eHdDQXhsbW5tNHZGR2lZd3dtaEUvNEVYQjNGVXpJaHlpQXQ0RlppZnA2UW5lLzZUT0JWZ0NJMytZTmt6SUltc0xEZm5ITW1ERkZtSnc4dVNnbExrdk9uajNMaGcwYm1ETkhxeXJFM244a1BpcnYxRWljQnpnejBKUTBZd0w1amZMcGtKZ1IwQnhrZ2tzUXpKWDlqSmt6WnpKdDJqUW1UQ2pjUktkeTlPalJRbkhYeVpNbjR6c2VoeitSS0cvWVUvbUkvZHArdytFdkx0d3FBRGtUSW0yV0NTcXNjM1E1K25ZWDhKMjRhZS9ldlJrOGVEQ0RCZzJpVDUraWk0WjI3dVNZZnpQeGplMWlSMHg4cmVMU1BzNEJtajRVclJLQU1naTIwT3dpR1NZRndpVW8xZzdmVGtOUGd6K0ZyOGRTejg4dTgxdHB0MVhjSmUxalVxVGxjWmtxR0pDREdWT2hnaEFtb2ZJdVFmRXp0OXoza1QrWVpTcFdjOUpiKzViV1puWXFxcE9UN2k1Zit6M0haR0tJc2luYnI1b0IrZlh5ckZHRlhVYUtlQzBBNWhHQzVYSVRZaXhXcGR4VkZSUUFsUlVFbDYvOVRIQXFVVDZvMnhLQ1hmdzRRTkF2cUd5TTBJWHlmcTd5Zmk5WUdDT3hBcUNTZ3FDTng0cGhTWlZ2T09YdFNza3FUYUI4ajRnUStiQjBERTNudXgvUEVGTmZ3WUlBd3IvNUlIVmx5dGZKZ0J5TU9GcUxORHAvci9JNUFEa0lNaUlmbHE1VThicDh3S1hNS1pUTi8rYWJFQW9HQ0orTGNmazYvRXVsMTZ6VEIxVDZvSFZkckFlQXVwQzlVcTdiN1Jud1g2cWNXVzY0MVZ5REFBQUFBRWxGVGtTdVFtQ0MiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPjwvc3ZnPg==) 15 15, auto';
};



graphView.setZoomInCursor = () =>
{
    document.body.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kKSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC41IDhDMTQuNSAxMS4wMzggMTIuMDM4IDEzLjUgOSAxMy41QzUuOTYyIDEzLjUgMy41IDExLjAzOCAzLjUgOEMzLjUgNC45NjIgNS45NjIgMi41IDkgMi41QzEyLjAzOCAyLjUgMTQuNSA0Ljk2MiAxNC41IDhaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuNSA4QzE0LjUgMTEuMDM4IDEyLjAzOCAxMy41IDkgMTMuNUM1Ljk2MiAxMy41IDMuNSAxMS4wMzggMy41IDhDMy41IDQuOTYyIDUuOTYyIDIuNSA5IDIuNUMxMi4wMzggMi41IDE0LjUgNC45NjIgMTQuNSA4WiIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcuNTg1NyAxOC4wMDAyTDE4Ljk5OTcgMTYuNTg2MkwxMy41NTA3IDExLjEzNzJMMTIuMTM2NyAxMi41NTEyTDE3LjU4NTcgMTguMDAwMloiIGZpbGw9ImJsYWNrIi8+PC9nPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIgN0gxMFY1SDhWN0g2VjguOThIOFYxMUgxMFY4Ljk4SDEyVjdaIiBmaWxsPSJibGFjayIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIxLjk5OTciIGhlaWdodD0iMjIuMDAwMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHk9IjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+PGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4=) 8 8, auto';
};



graphView.setZoomOutCursor = () =>
{
    document.body.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0LjUgOEMxNC41IDExLjAzOCAxMi4wMzggMTMuNSA5IDEzLjVDNS45NjIgMTMuNSAzLjUgMTEuMDM4IDMuNSA4QzMuNSA0Ljk2MiA1Ljk2MiAyLjUgOSAyLjVDMTIuMDM4IDIuNSAxNC41IDQuOTYyIDE0LjUgOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuNSA4QzE0LjUgMTEuMDM4IDEyLjAzOCAxMy41IDkgMTMuNUM1Ljk2MiAxMy41IDMuNSAxMS4wMzggMy41IDhDMy41IDQuOTYyIDUuOTYyIDIuNSA5IDIuNUMxMi4wMzggMi41IDE0LjUgNC45NjIgMTQuNSA4WiIgc3Ryb2tlPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjU4NTcgMTguMDAwMkwxOC45OTk3IDE2LjU4NjJMMTMuNTUwNyAxMS4xMzcyTDEyLjEzNjcgMTIuNTUxMkwxNy41ODU3IDE4LjAwMDJaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIgN0g2VjguOThIMTJWN1oiIGZpbGw9ImJsYWNrIi8+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMS45OTk3IiBoZWlnaHQ9IjIyLjAwMDIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=) 8 8, auto';
};



graphView.setAutoCursor = () =>
{
    if (   graphView.spaceDown
        || graphView.panning)
        graphView.setPanCursor();
    else
        document.body.style.cursor = 'auto';
};