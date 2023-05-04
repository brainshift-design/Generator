class GroupNodesAction
extends Action
{
    page;



    constructor(options)
    {
        super(GROUP_NODES_ACTION, 'GROUP NODES');
    }



    do(updateNodes)
    {
        // get node bounds
        let bounds = this.getAllNodeBounds(true);


        // create group page
        this.currentPage.groups.push(new GraphPage('group', 'group'));
        

        // move selected nodes to group page
        
        // delete old nodes and connections
        // save new nodes and connections

        // offset nodes inside group to start at TL 0,0

        // create group node in center of bounds

        // in group page create param nodes for all in and out connections

        // disconnect
        // unsave connections

        // reconnect through param nodes
        // save new connections
    }



    undo(updateNodes)
    {

    }
}
