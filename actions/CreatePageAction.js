class CreatePageAction
extends Action
{
    page;



    constructor(options)
    {
        super(CREATE_PAGE_ACTION, 'CREATE PAGE');
    }



    do(updateNodes)
    {
        const [pan, zoom, nodesJson] = 
            graph.pages.length == 0
            ? CreatePageAction_prepareNodes()
            : [{x: 0, y: 0}, 1, NULL];


        this.page = graph.createPage('Graph');

        graph.updatePages();
        graph.updateSavedPages();

        
        if (graph.pages.length == 1)
            CreatePageAction_updateNodes(this, pan, zoom, nodesJson);
    }



    undo(updateNodes)
    {
        const [pan, zoom, nodesJson] = 
            graph.pages.length == 1
            ? CreatePageAction_prepareNodes()
            : [{x: 0, y: 0}, 1, NULL];

        graph.removePage(this.page);

        uiRemoveSavedPage(this.page.id);
        uiRemoveSavedNodesAndConns(graph.nodes.filter(n => n.pageId == this.page.id).map(n => n.id));

        graph.updatePages();

        
        if (graph.pages.length == 0)
            CreatePageAction_updateNodes(this, pan, zoom, nodesJson);
    }
}



function CreatePageAction_prepareNodes()
{
    return [
        graph.currentPage._pan,
        graph.currentPage._zoom,
        uiCopyNodes(graph.currentPage.nodes.map(n => n.id)) ];
}



function CreatePageAction_updateNodes(action, pan, zoom, nodesJson)
{
    if (nodesJson != NULL)
    {
        uiPasteNodes(nodesJson, false);
        graphView.pastingNodes = false;
    }

    graph.currentPage._pan  = pan;
    graph.currentPage._zoom = zoom;

    graphView.updateNodes(graph.currentPage.nodes);
}