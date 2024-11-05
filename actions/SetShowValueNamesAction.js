class SetShowValueNamesAction
extends Action
{
    nodeIds;

    showValueNames;

    oldValues;



    constructor(nodes, showValueNames)
    {
        super(
            SET_SHOW_VALUE_NAMES_ACTION,
            'SET SHOW VALUE NAMES');

        this.nodeIds        = nodes.map(node => node.nodeId);
        this.oldValues      = nodes.map(node => node.showValueNames);

        this.showValueNames = showValueNames;

        this.selfUpdate     = true;
    }



    do(updateNodes)
    {
        for (let i = 0; i < this.nodeIds.length; i++)
            nodeFromId(this.nodeIds[i]).showValueNames = this.showValueNames;

        pushUpdate(this, this.nodeIds.map(id => nodeFromId(id)));
    }



    undo(updateNodes)
    {
        for (let i = 0; i < this.nodeIds.length; i++)
            nodeFromId(this.nodeIds[i]).showValueNames = this.oldValues[i];
        
        pushUpdate(this, this.nodeIds.map(id => nodeFromId(id)));
    }
}