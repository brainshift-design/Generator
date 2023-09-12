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
            uiRemoveSavedNodesAndConns(graph.currentPage.nodes.map(n => n.id));


            this.page.groups = graph.currentPage.groups;
            graph.currentPage.groups = [];


            for (const node of graph.currentPage.nodes) node.id = makeNodePath(node);
            //for (const node of this.page.nodes     ) node.id = makeNodePath(node);

                
            graphView.updateNodes(this.page.nodes);


            uiSaveNodes(this.page.nodes.map(n => n.id));
            uiSaveConnections(getConnsFromNodes(this.page.nodes));


            this.page._zoom = graph.currentPage._zoom;
            this.page._pan  = graph.currentPage._pan;
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
                node.id = makeNodePath(node);

            graphView.updateNodes(graph.currentPage.nodes);
            
            
            uiSaveNodes(graph.currentPage.nodes.map(n => n.id));
            uiSaveConnections(getConnsFromNodes(graph.currentPage.nodes));


            graph.currentPage.groups = this.page.groups;
            this.page.groups = [];
            
            graph.currentPage._zoom = this.page._zoom;
            graph.currentPage._pan  = this.page._pan;
        }


        graph.updatePages();
        graph.updateSavedPages();
    }
}
