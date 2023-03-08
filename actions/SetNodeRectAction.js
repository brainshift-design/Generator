class SetNodeRectAction
extends Action
{
    nodeId;
    get node() { return this.graph.nodeFromId(this.nodeId) } 

    oldRect;
    newRect;



    constructor(graph, nodeId, oldRect, newRect)
    {
        super(
            graph,
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

        this.node.updateChildren();

        uiSaveNodes(this.graph, [this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.setRect(
            this.oldRect.x,
            this.oldRect.y,
            this.oldRect.w,
            this.oldRect.h);

        this.node.updateNode();
        this.node.updateChildren();

        uiSaveNodes(this.graph, [this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.setRect(
            this.newRect.x,
            this.newRect.y,
            this.newRect.w,
            this.newRect.h);

        this.node.updateNode();
        this.node.updateChildren();
        
        uiSaveNodes(this.graph, [this.nodeId]);
    }
}