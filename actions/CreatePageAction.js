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
        const [nodesJson, pan, zoom] = 
            graph.pages.length == 0
            ? CreatePageAction_prepareFreeNodes(this)
            : NULL;


        this.page = graph.createPage('Graph');

        graph.updatePages();
        graph.updateSavedPages();

        
        if (graph.pages.length == 1)
            CreatePageAction_updateFreeNodes(this, nodesJson, pan, zoom);
    }



    undo(updateNodes)
    {
        const nodesJson = 
            graph.pages.length == 1
            ? CreatePageAction_prepareFreeNodes(this)
            : NULL;

        graph.removePage(this.page);

        uiRemoveSavedPage(this.page.id);
        uiRemoveSavedNodesAndConns(graph.nodes.filter(n => n.pageId == this.page.id).map(n => n.id));

        graph.updatePages();

        
        if (graph.pages.length == 0)
            CreatePageAction_updateFreeNodes(this, nodesJson);
    }
}



function CreatePageAction_prepareFreeNodes(action)
{
    return uiCopyNodes(graph.currentPage.nodes.map(n => n.id));
}



function CreatePageAction_updateFreeNodes(action, nodesJson)
{
    console.log('nodesJson =', nodesJson);
    if (nodesJson != NULL)
        uiPasteNodes(nodesJson, false);

    action.pages[0]._zoom = action.defaultPage._zoom;
    action.pages[0]._pan  = action.defaultPage._pan;

    graphView.updateNodes(graph.currentPage.nodes);
}