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

        graph.updatePages();
        graph.updateSavedPages();

        graphView.updateNodes(graph.currentPage.nodes);
    }



    undo(updateNodes)
    {
        graph.removePage(this.page);

        uiRemoveSavedPage(this.page.id);
        uiRemoveSavedNodesAndConns(graph.nodes.filter(n => n.pageId == this.page.id).map(n => n.id));

        graph.updatePages();
    }
}