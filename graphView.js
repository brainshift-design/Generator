graphView.wires = [];


graphView.overInput  = null;
graphView.overOutput = null;

graphView.tempConn   = null;


graphView.selecting  = false;
graphView.selectBox  = Rect.NaN;

graphView.button1down = false;

graphView._selected = [];

Object.defineProperty(graphView, 'selected',
{
    get: () => graphView._selected,
    set: selected =>
    {
        for (const node of graphView._selected)            
            node.setSelected(false);
    
        graphView._selected = selected;
    
        for (const node of graphView._selected)
            node.setSelected(true);
    }
});


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

graphView._zoom = 1;
graphView.oldZoom = 1;


Object.defineProperty(graphView, 'zoom',
{
    get: () => graphView._zoom,
    set: zoom =>
    {
        if (graphView._zoom == zoom) return;
        graphView._zoom = zoom;
        graphView.updatePanAndZoom();
    }
});

graphView.zooming   = false;
graphView.zoomStart = 1;

graphView.zoomSelecting = false;


graphView.pStart = {x:0, y:0};


graphView.addEventListener('pointerdown', e =>
{
    graphView.pStart = { x: e.clientX, 
                         y: e.clientY };

    if (   e.button == 0
        && !graphView.panning)
    {
        if (graphView.spaceDown)
        {
            if (e.ctrlKey) graphView.startZoomSelection(e.clientX, e.clientY);
            else           graphView.startPan(e.pointerId);
        }
        else if (graphView.overOutput)
        {
            graphView.overOutput.connecting = true;
            graphView.startConnectionFromOutput(graphView.overOutput);
            graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
        }
        else if (graphView.overInput)
        {
            if (graphView.overInput.connectedOutput) // pretend to disconnect
            {
                graphView.startConnectionFromOutput(graphView.overInput.connectedOutput);
                graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
                graphView.tempConn.savedInput = graphView.overInput;
                hide(graphView.overInput.connection.wire);
                hide(graphView.overInput.connection.wire.outBall);
            }
            else
            {
                graphView.overInput.connecting = true;
                graphView.startConnectionFromInput(graphView.overInput);
                graphView.tempConn.wire.updateFromInput(e.clientX, e.clientY)
            }
        }
        else // selection
        {
            if (!e.shiftKey)
            {
                graphView.startSelection(e.clientX, e.clientY);
            }
        }
    }
    
    else if (e.button == 1)
    {
        graphView.button1down = true;
        graphView.startPan(e.pointerId);
    }
});


graphView.addEventListener('pointerup', e =>
{
    if (   e.button == 0
        && graphView.spaceDown)
    {
        if (e.ctrlKey)
        {
            if (   graphView.selectBox.w > 0
                && graphView.selectBox.h > 0)
            {
                graphView.endZoomSelection(true);
            }
            else
            {
                graphView.endZoomSelection(false);

                graphView.oldZoom = graphView.zoom;

                if (e.altKey) graphView.zoom /= 2;
                else          graphView.zoom *= 2;

                graphView.pan = subv(graphView.pan, mulvs(subv(position(e), graphView.pan), graphView.zoom / graphView.oldZoom - 1));
            }
        }
        
        graphView.endPan(e.pointerId, false);
    }

    else if (   e.button == 0
        && !graphView.selectBox.isNaN)
        graphView.endSelection();

    else if (e.button == 0
          && graphView.tempConn)
    {
        if (graphView.tempConn.output) // FROM OUTPUT
        {
            var output     = graphView.tempConn.output;
            var input      = graphView.overInput;
            var savedInput = graphView.tempConn.savedInput;
            
            output.connecting = false;
            
            if (   input
                && input.dataType == output.dataType) // TO INPUT
            {
                if (input == savedInput) // reconnect old
                {
                    show(input.connection.wire);
                    show(input.connection.wire.outBall);
                }
                else if (savedInput) // disconnect old, connect new
                {
                    disconnect(savedInput);
                    connect(output, input);
                }
                else // connect new
                    connect(output, input);
            }
            else if (savedInput) // disconnect old
            {
                disconnect(savedInput)
            }
            
            graphView.cancelConnection();
        }
        
        else if (graphView.tempConn.input) // FROM INPUT
        {
            var input  = graphView.tempConn.input;
            var output = graphView.overOutput;

            input.connecting = false;
            
            if (   output
                && output.dataType == input.dataType) // TO OUTPUT
                graph.connect(output, input); // connect new

            graphView.cancelConnection();
        }
    }

    else if (e.button == 1
          && graphView.panning)
    {
        graphView.endPan(e.pointerId, true);
        graphView.button1down = false;
    }
});


graphView.addEventListener('pointermove', e =>
{
    graphView.p = { x: e.clientX, y: e.clientY };

    if (graphView.panning)
    {
        const dp  = subv(graphView.p, graphView.pStart);
        const pan = addv(graphView.panStart, dp);

        graphView.pan = pan;
    }

    else if (graphView.selecting)
    {
        graphView.updateSelection(e.clientX, e.clientY);
    }

    else if (graphView.zoomSelecting)
    {
        graphView.updateZoomSelection(e.clientX, e.clientY);
    }

    else if (graphView.tempConn)
    {
             if (graphView.tempConn.output) graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
        else if (graphView.tempConn.input ) graphView.tempConn.wire.updateFromInput (e.clientX, e.clientY);
    }
});


graphView.addEventListener('wheel', e =>
{
    if (graphView.button1down)
        return;


    const dZoom = Math.log(graphView.zoom) / Math.log(2);
    
    const dWheelX = e.deltaX/120;
    const dWheelY = e.deltaY/120;

    if (e.ctrlKey)
    {
        graphView.oldZoom = graphView.zoom;
        
        graphView.zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / 10));
        graphView.pan  = subv(graphView.pan, mulvs(subv(position(e), graphView.pan), graphView.zoom / graphView.oldZoom - 1));
    }
    else
    {
        const dPanX = dWheelX * 20 / Math.pow(graphView.zoom, 0.1);
        const dPanY = dWheelY * 20 / Math.pow(graphView.zoom, 0.1);

        graphView.pan = 
            dWheelX != 0
            ? { x:  e.shiftKey ? graphView.pan.x : graphView.pan.x - dPanX,
                y: !e.shiftKey ? graphView.pan.y : graphView.pan.y - dPanX }
            : { x: !e.shiftKey ? graphView.pan.x : graphView.pan.x - dPanY,
                y:  e.shiftKey ? graphView.pan.y : graphView.pan.y - dPanY };

        if (graphView.selecting)
            graphView.updateSelection(e.clientX, e.clientY);
    }
});


graphView.startConnectionFromOutput = output =>
{
    graphView.tempConn = new Connection(output, null);
    graphView.addWireFromOutput(graphView.tempConn.wire, output);
};


graphView.startConnectionFromInput = input =>
{
    graphView.tempConn = new Connection(null, input);
    graphView.addWireFromInput(graphView.tempConn.wire, input);    
};


graphView.cancelConnection = () =>
{
    graphView.removeWire(graphView.tempConn.wire);    
    graphView.tempConn = null;
};


graphView.getNodeBounds = () =>
{
    var boundsL = Number.MAX_SAFE_INTEGER;
    var boundsT = Number.MAX_SAFE_INTEGER;
    var boundsR = Number.MIN_SAFE_INTEGER;
    var boundsB = Number.MIN_SAFE_INTEGER;
    
    for (const node of graph.nodes)
    {
        var bounds = node.div.getBoundingClientRect();

        boundsL = Math.min(boundsL, bounds.left  );
        boundsT = Math.min(boundsT, bounds.top   );
        boundsR = Math.max(boundsR, bounds.right );
        boundsB = Math.max(boundsB, bounds.bottom);
    }

    return {
        x: boundsL - graphView.pan.x, 
        y: boundsT - graphView.pan.y,
        w: boundsR - boundsL,
        h: boundsB - boundsT };
};


graphView.putNodeOnTop = node =>
{
    const topIndices = 
          1 
        + node.inputs.filter(i => i.connected).length 
        + (!!node.output && node.output.connected ? 1 : 0);

    for (const n of graph.nodes)
        n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - topIndices);

    var z = Number.MAX_SAFE_INTEGER;

    for (const input of node.inputs.filter(i => i.connected))
        input.connection.wire.style.zIndex = z--;

    if (!!node.output)
    {
        for (const input of node.output.connectedInputs)
            input.connection.wire.style.zIndex = z--;
    }

    node.div.style.zIndex = z;
};


graphView.getValidSelection = () =>
{
    return new Rect(
        graphView.selectBox.x + Math.min(graphView.selectBox.w, 0),
        graphView.selectBox.y + Math.min(graphView.selectBox.h, 0),
        Math.abs(graphView.selectBox.w),
        Math.abs(graphView.selectBox.h));
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
    var selection = graphView.getValidSelection();

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
        
        graphView.zoom *= Math.min(
            window.innerWidth  / graphView.selectBox.w,
            window.innerHeight / graphView.selectBox.h);
    
        const diff = { w: (window.innerWidth  / graphView.zoom - box.w)/2,
                       h: (window.innerHeight / graphView.zoom - box.h)/2 };

        graphView.pan = { x: -(box.x - diff.w) * graphView.zoom,
                          y: -(box.y - diff.h) * graphView.zoom };
    }

    graphView.selectBox = Rect.NaN;
};


graphView.startSelection = (x, y) =>
{
    graphView.selecting = true;
    graphView.selectBox = new Rect(x, y, 0, 0);
    
    selectBox.style.visibility = 'visible';
    graphView.updateSelectBox();
};


graphView.updateSelection = (x, y) =>
{
    if (!graphView.selecting) return;

    graphView.selectBox.w = x - graphView.selectBox.x;
    graphView.selectBox.h = y - graphView.selectBox.y;

    graphView.updateSelectBox();
};


graphView.updateSelectBox = () =>
{
    var selection = graphView.getValidSelection();

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    const selected = [];

    for (const node of graph.nodes)
    {
        if (rectsIntersect(
                Rect.fromTypical(node.div.getBoundingClientRect()), 
                graphView.getValidSelection()))
            selected.push(node);
    }

    graphView.selected = selected;
};

graphView.endSelection = () =>
{
    graphView.selecting = false;
    graphView.selectBox = Rect.NaN;
    selectBox.style.visibility = 'hidden';
};


graphView.updatePanAndZoom = () =>
{
    for (const node of graph.nodes)
        graphView.updateNodeTransform(node);

    var bounds = Rect.NaN;

    for (const node of graph.nodes)
        bounds.expandFromRect(Rect.fromTypical(node.div.getBoundingClientRect()));

    graphView.updateScrollX(bounds);
    graphView.updateScrollY(bounds);
};


graphView.updateNodeTransform = function(node)
{
    node.div.style.transformOrigin = 
          ((graphView.pan.x - node.div.offsetLeft) / node.div.offsetWidth  * 100) + '% ' 
        + ((graphView.pan.y - node.div.offsetTop ) / node.div.offsetHeight * 100) + '%';
    
    node.div.style.transform =
          'translate(' 
        + (graphView.pan.x * graphView.zoom) + 'px, '
        + (graphView.pan.y * graphView.zoom) + 'px) '
        + 'scale(' + graphView.zoom + ')';

    for (const input of node.inputs)
    {
        if (input.connected)
            graphView.updateWireTransform(input.connection.wire);        
    }

    if (node.output)
    {
        for (const input of node.output.connectedInputs)
            graphView.updateWireTransform(input.connection.wire);        
    }
};


graphView.updateWireTransform = function(wire)
{
    wire.setAttribute('width',  graphView.clientWidth  / graphView.zoom);
    wire.setAttribute('height', graphView.clientHeight / graphView.zoom);

    wire.setAttribute('viewBox',
                0
        + ' ' + 20 / graphView.zoom // 20 seems to be the title bar
        + ' ' + graphView.clientWidth  / graphView.zoom
        + ' ' + graphView.clientHeight / graphView.zoom);

    wire.update();
};


graphView.addWire = wire =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);  
    wire.update();
};


graphView.addWireFromOutput = (wire, output) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);
    wire.updateFromOutput(output);  
};


graphView.addWireFromInput = (wire, input) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);  
    //wire.updateFromInput(input);  
};


graphView.removeWire = wire =>
{
    graphView.removeChild(wire);    
    removeFromArray(wire, graphView.wires);
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
        graphView.style.cursor = 'auto';
};


graphView.setPanCursor = () =>
{
    graphView.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48aW1hZ2UgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBSHFrbEVRVlI0WHUyYWY4aVY1Um5IUDlhbXpjM0tkRERkSDJ2WitpUEQvdEJTSEtLQ1EyVmJaTWdnbDAxTENUUmJ0Q1hLSFA1Z1N1UWZNZGtmZ3lrMkZLTWtjU0wrV0RKbExOU2xwaWtSaEdRU1VTMU4zV2JiYW5OOG50M1h1N3ZIOXpYUE9jOXp3dDczZ3B2M25QT2U4enpQOWIyLzE4Lzc2a1UzbDE3ZFhIOTZBT2hoUURkSG9NY0V1amtCZXB4Z2p3bTAwUVFFTzFiYzlnSVFxNDJQOHY5YnRZTUIzdU9xdEs0R0JnRTNBdThBYndML1R1cy9nS3V0VWpjQVhsK2x2d0I4RVZnRXpNODBmQkZZRFR3UGZGd0NvaTNNcUJzQWxWZnhQc0R2Z0xFcVAyVElFSTRmUDU3djlGVGdqOEJOd0YrQk54SWJaRWV0ektnRGdMQnphYS95MXdEZkIzNnJ4cHMyYldMS2xDbWNPSEdDdVhQbnNtM2JOai9lQlh3TnVDMmhjaEJZRE93QlBrcnNxTVU4cWdTZ2JPdlMzcDN2Qzh3R2ZqNXk1RWoyN2R2WHNmT3JWNjltOW16LzFhVThEdndhK0ZkZElGUUZRRGc1ZDF6RjF3SERnZXVBVjREWGdBZVhMRm5DNHNWdTdQOWt6NTQ5akI4L3ZuanQ1K1BHamFOZnYzNXMzYm9Wdnd1OEM0d0FQZ0QrbVh5RXZxRXlxUUtBY0hTOTA0NmY3dXJwTGdYQXNXUEhHRHAwYU1kUGUvWHFlTFFKd0NIZ2ZES0hTazJoQ2dEQzBYMEplQWFZcUJaYnRteGgrUERoTEZpd2dIWHJKQVRGcm5iRmdBc1hQcm14TWtPR0FQY0RMd0IvU3l3d1dsVEdnbFlCOFBkU1h1Vy9BdndaK1BxcVZhdVlOMjlleDI0T0dEQ0EwNmRQTnd2QVE4bEpHaDFrZ2Y1QUZnaEN5MnhvRlFCdFgrcC9PZGw3RWR2S3U3bDA2ZEpDK1NZWjhDandUV0JrOGlWUEF5K1Y4b2FtR1ZFRkFJYTVmc0FOd0tzMUFOQ1pTM2tTK0VVV0hjd1htcEpXQWREK3BmKzF3SURrOGF0bUFLTkhqMmI1OHVYSXBPUVhWRlpmc3pmNUJYT0ZwbGpRS2dCaC80YTdnY0RMVlROZzJMQmhIRGx5cEdOM1I0MGF4Zjc5KzMwdkEzNlovRUtFeUlaWlVBVUFKam9CZ09HcVN3WVlBVko4dnlnUDZDb0s3TjY5dThnUFFzS2ZKRDh3SmFYT0g2WVErWmtDOEZYQUZMWmRBSGl2SHdCbmdMOG5mOUN3R1ZURmdPdVRDYlFUQU0zdFhzREV5eHpoSDgzNGdTc1pnTVBBRHhNQTV4SUFEZWNGVnpJQWVzYjdnRk9BQU9nSGFnY2dBSXUvRmorR3dYQ0NCenJ6QVRvK25WZkZUckN0QU9TbGJsUis2aHIxZmlSQ3BzS2RPa0hqOTlpeFl5K0tBZ0tqNk8xektWZUpuVVFCQVpoZVlrRERDZEhsbUVBb2JNenZiMDBEV0tHNTY2YSttNjE5QUIzaG56b0RvT0hZZElrZlpHR3dMUUJFc2VOT1c2ditDcml6aytjek0xbWJtaGNYTWVCS0JzQlUxMkpITy84TmNJL0tyRnk1a2hFalJuRDQ4T0hDcnMrZDB3Y1ZEUXM3UUxVQ0VQNEVxSjBCN3I3S1creVlkeityY3VYR3hjR0RCMW0wYUJFN2R1em8yT2h5VmxjbEE5b0pnTHZ2amxycVBnQThZVXBhZGxhaDNMSmx5enFhSFo4WEFLTFEwY1BQQVg1V0xrektPN3RyMXk3bXo1L1BvVU5GU1ZDTHRKTUJPajRMSFV2ZE85TGhSY0dBdkRncGEzbisvSG42OXZWbjljaG5CWUNsN25KZ3NtcHQzNzZkU1pNbTFhUGhwMXkxblFEa0ptQ3o0MmJnS2VBYlB1UEdqUnVaT3RVRG5mWktPd0hJbmFCSmp1V3VKemNMMCtFbWE5ZXVaY2FNR1cxRm9BUkExQUkyVEswRktzMEVEWU9SNjBlcWE5L3ZGdUNud0xmVXZOd0JyaHVOVWlhWUYwT1d3NVVDb0M2UkNJVXpOQlYyYVFZL0FXNzFTeXRXckdEaFFvbFJ2OHlhTllzMWE5WjRvejhBUDY2N0dveFVPRnJmTWtGekVBUVBNMlhDN1Q2TkFBaEUzYUx6M2JsenA3ZDVEbGlXQUFnVHFLVWN0aGpTSVFxQ1RBZ1FCRUxuS0FpR3llSXdSSk9vVXdZT0hNaXBVN1lBaXFKTUVPd0lDWUFtVUFzQTNxd3pFS3dHZ3cyUEFhUDlvazVSNTFpSDdOMjd0MmlSSi9rZThIbzZPQlVBYTVGYWU0S0NFSkhCNGtnbUNJTG1JQkNQeEFDRTRkRXdXYlZNbno2ZDlldlhlMW1yVCszL0wxbFRWQUFhbHN2cEIrUVhEUkRDSER3UHpFRXdaYlpYd01TSkV6OVJJRFg4WktVZmJONjh1UmlzU0xJQStEM3dQbkEyaFVBUFJ4cVdSZ0h3QnJsakRDYVlMa2VFZUJENHJsLzBkUGpBZ2FKTDFwS2NPWE9HL3YyOWZDRk9rM2dvOGw2cEk5eHdDQXhsbW5tNHZGR2lZd3dtaEUvNEVYQjNGVXpJaHlpQXQ0RlppZnA2UW5lLzZUT0JWZ0NJMytZTmt6SUltc0xEZm5ITW1ERkZtSnc4dVNnbExrdk9uajNMaGcwYm1ETkhxeXJFM244a1BpcnYxRWljQnpnejBKUTBZd0w1amZMcGtKZ1IwQnhrZ2tzUXpKWDlqSmt6WnpKdDJqUW1UQ2pjUktkeTlPalJRbkhYeVpNbjR6c2VoeitSS0cvWVUvbUkvZHArdytFdkx0d3FBRGtUSW0yV0NTcXNjM1E1K25ZWDhKMjRhZS9ldlJrOGVEQ0RCZzJpVDUraWk0WjI3dVNZZnpQeGplMWlSMHg4cmVMU1BzNEJtajRVclJLQU1naTIwT3dpR1NZRndpVW8xZzdmVGtOUGd6K0ZyOGRTejg4dTgxdHB0MVhjSmUxalVxVGxjWmtxR0pDREdWT2hnaEFtb2ZJdVFmRXp0OXoza1QrWVpTcFdjOUpiKzViV1puWXFxcE9UN2k1Zit6M0haR0tJc2luYnI1b0IrZlh5ckZHRlhVYUtlQzBBNWhHQzVYSVRZaXhXcGR4VkZSUUFsUlVFbDYvOVRIQXFVVDZvMnhLQ1hmdzRRTkF2cUd5TTBJWHlmcTd5Zmk5WUdDT3hBcUNTZ3FDTng0cGhTWlZ2T09YdFNza3FUYUI4ajRnUStiQjBERTNudXgvUEVGTmZ3WUlBd3IvNUlIVmx5dGZKZ0J5TU9GcUxORHAvci9JNUFEa0lNaUlmbHE1VThicDh3S1hNS1pUTi8rYWJFQW9HQ0orTGNmazYvRXVsMTZ6VEIxVDZvSFZkckFlQXVwQzlVcTdiN1Jud1g2cWNXVzY0MVZ5REFBQUFBRWxGVGtTdVFtQ0MiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPjwvc3ZnPg==) 15 15, auto';
};


graphView.setZoomInCursor = () =>
{
    graphView.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kKSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC41IDhDMTQuNSAxMS4wMzggMTIuMDM4IDEzLjUgOSAxMy41QzUuOTYyIDEzLjUgMy41IDExLjAzOCAzLjUgOEMzLjUgNC45NjIgNS45NjIgMi41IDkgMi41QzEyLjAzOCAyLjUgMTQuNSA0Ljk2MiAxNC41IDhaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuNSA4QzE0LjUgMTEuMDM4IDEyLjAzOCAxMy41IDkgMTMuNUM1Ljk2MiAxMy41IDMuNSAxMS4wMzggMy41IDhDMy41IDQuOTYyIDUuOTYyIDIuNSA5IDIuNUMxMi4wMzggMi41IDE0LjUgNC45NjIgMTQuNSA4WiIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcuNTg1NyAxOC4wMDAyTDE4Ljk5OTcgMTYuNTg2MkwxMy41NTA3IDExLjEzNzJMMTIuMTM2NyAxMi41NTEyTDE3LjU4NTcgMTguMDAwMloiIGZpbGw9ImJsYWNrIi8+PC9nPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIgN0gxMFY1SDhWN0g2VjguOThIOFYxMUgxMFY4Ljk4SDEyVjdaIiBmaWxsPSJibGFjayIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjIxLjk5OTciIGhlaWdodD0iMjIuMDAwMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHk9IjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+PGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4=) 8 8, auto';
};


graphView.setZoomOutCursor = () =>
{
    graphView.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0LjUgOEMxNC41IDExLjAzOCAxMi4wMzggMTMuNSA5IDEzLjVDNS45NjIgMTMuNSAzLjUgMTEuMDM4IDMuNSA4QzMuNSA0Ljk2MiA1Ljk2MiAyLjUgOSAyLjVDMTIuMDM4IDIuNSAxNC41IDQuOTYyIDE0LjUgOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuNSA4QzE0LjUgMTEuMDM4IDEyLjAzOCAxMy41IDkgMTMuNUM1Ljk2MiAxMy41IDMuNSAxMS4wMzggMy41IDhDMy41IDQuOTYyIDUuOTYyIDIuNSA5IDIuNUMxMi4wMzggMi41IDE0LjUgNC45NjIgMTQuNSA4WiIgc3Ryb2tlPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjU4NTcgMTguMDAwMkwxOC45OTk3IDE2LjU4NjJMMTMuNTUwNyAxMS4xMzcyTDEyLjEzNjcgMTIuNTUxMkwxNy41ODU3IDE4LjAwMDJaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIgN0g2VjguOThIMTJWN1oiIGZpbGw9ImJsYWNrIi8+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMS45OTk3IiBoZWlnaHQ9IjIyLjAwMDIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=) 8 8, auto';
};