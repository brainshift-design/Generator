class ScrollListNodeAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    oldScroll;
    newScroll;



    constructor(nodeId, oldScroll, newScroll)
    {
        super(
            SCROLL_LIST_NODE_ACTION,
           'SCROLL LIST NODE ' + nodeId + ' to \'' + newScroll + '\'');

        this.affectsConnections = false;

        this.nodeId    = nodeId;

        this.oldScroll = oldScroll;
        this.newScroll = newScroll;
    }



    do(updateNodes)
    {
        // this.node.setRect( // already done
        //     this.newRect.x,
        //     this.newRect.y,
        //     this.newRect.w,
        //     this.newRect.h);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.updateScroll(this.oldScroll);

        uiSaveNodes([this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.updateScroll(this.newScroll);
        
        uiSaveNodes([this.nodeId]);
    }
}