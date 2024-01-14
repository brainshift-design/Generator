class MakeNotConditionNodesAction
extends Action
{
    shiftKey;


    nodeIds = [];



    constructor(nodeIds)
    {
        super(
            MAKE_NOT_CONDITION_ACTION, 
            'MAKE NOT CONDITION ' + nodeIdArrayToString(nodeIds));

        this.nodeIds            = [...nodeIds];
        this.affectsConnections = false;
    }



    do(updateNodes)
    {
        const nodes = this.nodeIds.map(id => nodeFromId(id));

        nodes.forEach(n => n.notCondition = true);
        pushUnique(updateNodes, nodes);
        
        uiSaveNodes(this.nodeIds);
    }



    undo(updateNodes)
    {
        const nodes = this.nodeIds.map(id => nodeFromId(id));

        nodes.forEach(n => n.notCondition = false);
        pushUnique(updateNodes, nodes);

        uiSaveNodes(this.nodeIds);
    }
}