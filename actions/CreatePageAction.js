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
        this.page = graph.createPage('Graph');


        if (graph.pages.length == 2)
        {
            uiRemoveSavedNodesAndConns(graph.pages[0].nodes.map(n => n.id));

            for (const node of graph.pages[0].nodes)
                node.id = makeNodePath(node.nodeId);

            graphView.updateNodes(this.page.nodes);
            uiSaveNodes(this.page.nodes.map(n => n.id));

            uiSaveConnections(getConnsFromNodes(this.page.nodes));

            this.page._zoom = graph.pages[0]._zoom;
            this.page._pan  = graph.pages[0]._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }



    undo(updateNodes)
    {
        graph.removePage(this.page);
        uiRemoveSavedPage(this.page.id);


        if (graph.pages.length == 1)
        {
            uiRemoveSavedNodesAndConns(this.page.nodes.map(n => n.id));

            for (const node of this.page.nodes)
                node.id = makeNodePath(node.nodeId);

            graphView.updateNodes(graph.pages[0].nodes);
            uiSaveNodes(graph.pages[0].nodes.map(n => n.id));

            uiSaveConnections(getConnsFromNodes(graph.pages[0].nodes));

            graph.pages[0]._zoom = this.page._zoom;
            graph.pages[0]._pan  = this.page._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }
}
