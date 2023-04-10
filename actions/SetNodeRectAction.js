class SetNodeRectAction
extends Action
{
    nodeId;
    get node() { return graph.nodeFromId(this.nodeId) } 

    oldRect;
    newRect;



    constructor(nodeId, oldRect, newRect)
    {
        super(
            SET_NODE_RECT_ACTION,
           'SET NODE ' + nodeId + ' RECT to \'' + newRect.toString() + '\'');

        this.affectsConnections = false;

        this.nodeId  = nodeId;

        this.oldRect = Rect.fromTypical(oldRect);
        this.newRect = Rect.fromTypical(newRect);
    }



    do(updateNodes)
    {
        // this.node.setRect( // already done
        //     this.newRect.x,
        //     this.newRect.y,
        //     this.newRect.w,
        //     this.newRect.h);

        uiSaveNodes(graph, [this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.setRect(
            this.oldRect.x,
            this.oldRect.y,
            this.oldRect.w,
            this.oldRect.h);

        this.node.updateNode();

        uiSaveNodes(graph, [this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.setRect(
            this.newRect.x,
            this.newRect.y,
            this.newRect.w,
            this.newRect.h);

        this.node.updateNode();
        
        uiSaveNodes(graph, [this.nodeId]);
    }
}