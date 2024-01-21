class SetNodeParamAction
extends Action
{
    nodeId;
    valueId;

    oldValue;
    newValue;



    constructor(nodeId, valueId, newValue)
    {
        super(
            SET_NODE_PARAM_ACTION,
              'SET NODE PARAM ' + valueId
            + ' ' + 
            + ' to \'' + boolToString(newValue) + '\'');

        this.affectsConnections = false;

        this.nodeId  = nodeId;
        this.valueId = valueId;

        const node = nodeFromId(nodeId);

        this.oldValue = node[valueId];
        this.newValue = newValue;
    }



    do(updateNodes)
    {
        const node = nodeFromId(this.nodeId);

        node[this.valueId] = this.newValue;

        pushUnique(updateNodes, node);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        const node = nodeFromId(this.nodeId);

        node[this.valueId] = this.oldValue;

        pushUnique(updateNodes, node);

        uiSaveNodes([this.nodeId]);
    }
}