function setCursor(cursor, asyncForce = true)
{
    document.body.style.cursor = cursor;
    if (asyncForce) setTimeout(null, 0);
}



function setAutoCursor()
{
    if (graphView.zoomSelecting)
        setCursor(zoomInCursor);
    else if (graphView.spaceDown
          || graphView.panning)
        setCursor(panCursor);
    else
        setCursor('auto');
};