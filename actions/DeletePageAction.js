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
                node.id = makeNodePath(node.nodeId);

            graphView.updateNodes(graph.pages[0].nodes);
            uiSaveNodes(graph.pages[0].nodes.map(n => n.id));

            uiSaveConnections(getConnsFromNodes(graph.pages[0].nodes));

            graph.pages[0]._zoom = this.oldPage._zoom;
            graph.pages[0]._pan  = this.oldPage._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }



    undo(updateNodes)
    {
        graph.addPage(this.oldPage);


        if (graph.pages.length == 2)
        {
            uiRemoveSavedNodesAndConns(graph.pages[0].nodes.map(n => n.id));

            for (const node of graph.pages[0].nodes)
                node.id = makeNodePath(node.nodeId);

            graphView.updateNodes(this.oldPage.nodes);
            uiSaveNodes(this.oldPage.nodes.map(n => n.id));

            uiSaveConnections(getConnsFromNodes(this.oldPage.nodes));

            this.oldPage._zoom = graph.pages[0]._zoom;
            this.oldPage._pan  = graph.pages[0]._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }
}