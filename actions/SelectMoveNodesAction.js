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
            'select move ' + newSelectedIds.length 
          + ' node' + (newSelectedIds.length == 1 ? '' : 's'));// + ', '
          //+ prevSelectedIds.length + ' selected before');


        this.prevSelectedIds = [...prevSelectedIds];
        this.newSelectedIds  = [...newSelectedIds];
          
        this.shiftPressed    = shiftPressed;

        this.fromPos         = fromPos;
        this.toPos           = toPos;


        
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



    do()
    {
        const movedIds   = this.getMovedIds();
        const movedNodes = graph.nodes.filter(n => movedIds.includes(n.id));

        for (var i = 0; i < movedNodes.length; i++)
        {
            const p = this.to.find(t => t[0] == movedNodes[i].id)[1];
            setNodePosition(movedNodes[i].div.op, p.x, p.y);
        }

        for (const node of movedNodes)
            node.updateBorder();

        uiSaveNodesAndConns(movedIds);
    }



    undo()
    {
        const movedIds   = this.getMovedIds();
        const movedNodes = graph.nodes.filter(n => movedIds.includes(n.id));

        for (var i = 0; i < movedNodes.length; i++)
        {
            const p = this.from.find(t => t[0] == movedNodes[i].id)[1];
            setNodePosition(movedNodes[i].div.op, p.x, p.y);
        }

        for (const node of movedNodes)
            node.updateBorder();
            
        graphView.selectByIds(this.prevSelectedIds);

        uiSaveNodesAndConns(movedIds);
    }



    redo()
    {
        this.do();

        graphView.selectByIds(this.getMovedIds());
    }
}