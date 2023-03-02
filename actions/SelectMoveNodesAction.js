class SelectMoveNodesAction
extends Action
{
    newSelectedIds  = [];
    prevSelectedIds = [];

    shiftPressed;

    fromPos;
    toPos;

    from;
    to;



    constructor(prevSelectedIds, newSelectedIds, fromPos, toPos, shiftPressed)
    {
        super(
            SELECT_MOVE_ACTION,
              'SELECT MOVE ' + newSelectedIds.length 
            + ' ' + countString('node', newSelectedIds.length));

        this.affectsConnections = false;


        this.prevSelectedIds    = [...prevSelectedIds];
        this.newSelectedIds     = [...newSelectedIds];
             
        this.shiftPressed       = shiftPressed;
   
        this.fromPos            = fromPos;
        this.toPos              = toPos;

                
        const dx = this.toPos.x - this.fromPos.x;
        const dy = this.toPos.y - this.fromPos.y;


        this.from = []; // these hold tuples
        this.to   = []; // [id, pos]

        for (const id of this.getMovedIds())
        {
            const node = nodeFromId(id);

            this.from.push([id, point(node.div.slx,      node.div.sly     )]);
            this.to  .push([id, point(node.div.slx + dx, node.div.sly + dy)]);
        }
    }



    getMovedIds()
    {
        const movedIds = [];

        if (this.shiftPressed)
            movedIds.push(...this.prevSelectedIds);
        
        movedIds.push(...this.newSelectedIds);

        return movedIds;
    }


    
    do(updateNodes)
    {
        const movedIds   = [...this.getMovedIds()];
        const movedNodes = graph.nodes.filter(n => movedIds.includes(n.id));

        for (let i = 0; i < movedNodes.length; i++)
        {
            const p = this.to.find(t => t[0] == movedNodes[i].id)[1];
            setNodePosition(movedNodes[i].div.node, p.x, p.y);
        }

        for (const node of movedNodes)
        {
            node.updateMeasureData();
            node.updateNode();
        }


        uiSaveNodes(movedIds);
    }



    undo(updateNodes)
    {
        const movedIds   = [...this.getMovedIds()];
        const movedNodes = graph.nodes.filter(n => movedIds.includes(n.id));

        for (let i = 0; i < movedNodes.length; i++)
        {
            const p = this.from.find(t => t[0] == movedNodes[i].id)[1];
            setNodePosition(movedNodes[i].div.node, p.x, p.y);
        }

        for (const node of movedNodes)
            node.updateNode();
            
        graphView.selectByIds(this.prevSelectedIds);

        uiSaveNodes(movedIds);
    }



    redo(updateNodes)
    {
        this.do(updateNodes);

        graphView.selectByIds(this.getMovedIds());
    }
}