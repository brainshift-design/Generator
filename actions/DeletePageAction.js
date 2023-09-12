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
        this.oldPage = pageFromId(this.pageId);


        graph.removePage(this.oldPage);
        uiRemoveSavedPage(this.pageId);


        if (graph.pages.length == 1)
        {
            uiRemoveSavedNodesAndConns(this.oldPage.nodes.map(n => n.id));

            for (const node of this.oldPage.nodes)
                node.id = makeNodePath(node);

            graphView.updateNodes(graph.currentPage.nodes);
            uiSaveNodes(graph.currentPage.nodes.map(n => n.id));

            uiSaveConnections(getConnsFromNodes(graph.currentPage.nodes));

            graph.currentPage._zoom = this.oldPage._zoom;
            graph.currentPage._pan  = this.oldPage._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }



    undo(updateNodes)
    {
        graph.addPage(this.oldPage);


        if (graph.pages.length == 2)
        {
            uiRemoveSavedNodesAndConns(graph.currentPage.nodes.map(n => n.id));

            for (const node of graph.currentPage.nodes)
                node.id = makeNodePath(node);

            graphView.updateNodes(this.oldPage.nodes);
            uiSaveNodes(this.oldPage.nodes.map(n => n.id));

            uiSaveConnections(getConnsFromNodes(this.oldPage.nodes));

            this.oldPage._zoom = graph.currentPage._zoom;
            this.oldPage._pan  = graph.currentPage._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }
}