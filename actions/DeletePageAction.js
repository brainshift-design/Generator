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
        uiRemoveSavedNodesAndConns(graph.nodes.filter(n => n.pageId == this.pageId).map(n => n.id));

        graph.updatePages();
    }



    undo(updateNodes)
    {
        graph.addPage(this.oldPage);

        graph.updatePages();
        graph.updateSavedPages();
    }
}