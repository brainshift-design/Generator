const mainGraph       = new Graph();
var   graphView       = new GraphView(_graphView, mainGraph);
   
var   currentGraph    = mainGraph;
var   currentView     = graphView;

var   viewportZoom    = 1;
var   viewportRect    = new Rect();



// function setCurrentGraph(graph)
// {
//     crashAssert(currentView, 'there should be a valid currentView');

//     const elements = Array.prototype.slice.call(document.children);
//     const index    = elements.indexOf(currentView.div);

//     document.body.removeChild(currentView.div);
//     document.body.insertBefore(graph.view.div, document.children[index]);

//     currentGraph = graph;
//     currentView  = graph.view;

//     currentView.updateMeasureData();
// }