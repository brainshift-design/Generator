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
          + ' node' + (newSelectedIds.length == 1 ? '' : 's') + ', '
          + prevSelectedIds.length + ' selected before');


        this.prevSelectedIds = [...prevSelectedIds];
        this.newSelectedIds  = [...newSelectedIds];
          
        this.shiftPressed    = shiftPressed;

        this.fromPos         = fromPos;
        this.toPos           = toPos;


        
        const dx = this.toPos.x - this.fromPos.x;
        const dy = this.toPos.y - this.fromPos.y;


        this.from = [];
        this.to   = [];

        for (const id of this.getMovedIds())
        {
            const node = graph.nodeFromId(id);

            this.from.push({ x: node.div.slx,      y: node.div.sly      });
            this.to  .push({ x: node.div.slx + dx, y: node.div.sly + dy });
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
        const movedIds = this.getMovedIds();

        for (var i = 0; i < movedIds.length; i++)
        {
            const node = graph.nodeFromId(movedIds[i]);

            setNodePosition(
                node.div.op,
                this.to[i].x,
                this.to[i].y);
        }
    }



    undo()
    {
        const movedIds = this.getMovedIds();

        for (var i = 0; i < movedIds.length; i++)
        {
            const node = graph.nodeFromId(movedIds[i]);

            setNodePosition(
                node.div.op,
                this.from[i].x,
                this.from[i].y);
        }

        graphView.selectByIds(this.prevSelectedIds);
    }



    redo()
    {
        this.do();

        graphView.selectByIds(this.getMovedIds());
    }
}