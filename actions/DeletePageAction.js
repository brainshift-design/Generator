class DeletePageAction
extends Action
{
    pageId;

    oldPage = null;



    constructor(pageId)
    {
        super(DELETE_PAGE_ACTION, 'DELETE PAGE');

        this.pageId = pageId;
    }



    do(updateNodes)
    {
        const [pan, zoom, nodesJson] = 
            graph.pages.length == 1
            ? CreatePageAction_prepareNodes()
            : [{x: 0, y: 0}, 1, NULL];


        this.oldPage = pageFromId(this.pageId);

        graph.removePage(this.oldPage);

        uiRemoveSavedPage(this.pageId);
        uiRemoveSavedNodesAndConns(graph.nodes.filter(n => n.pageId == this.pageId).map(n => n.id));

        graph.updatePages();

        
        // if (graph.pages.length == 0)
        //     CreatePageAction_updateNodes(this, pan, zoom, nodesJson);
    }



    undo(updateNodes)
    {
        const [pan, zoom, nodesJson] = 
            graph.pages.length == 0
            ? CreatePageAction_prepareNodes()
            : [{x: 0, y: 0}, 1, NULL];


        graph.addPage(this.oldPage);

        graph.updatePages();
        graph.updateSavedPages();

        
        // if (graph.pages.length == 1)
        //     CreatePageAction_updateNodes(this, pan, zoom, nodesJson);
    }
}