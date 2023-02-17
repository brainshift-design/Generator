function setCursor(cursor, forceAsync = true)
{
    document.body.style.cursor = cursor;
    if (forceAsync) setTimeout(null, 0);
}



function setAutoCursor()
{
    if (graphView.zoomSelecting)
        setCursor(zoomInCursor);
    else if (graphView.spaceDown
          || panMode
          || graphView.panning)
        setCursor(panCursor);
    else
        setCursor('default'); // 'auto');
};