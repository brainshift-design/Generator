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
        // get node bounds inside group
        // get node position of group node

        // disconnect params
        // unsave connections

        // delete param nodes

        // move rest of nodes one path level up
        // delete old nodes and connections
        // save new nodes and connections

        // offset new nodes to center on old group node

        // connect to outside directly
        // save new connections

        // delete group node
        // delete group page
    }



    undo(updateNodes)
    {

    }
}