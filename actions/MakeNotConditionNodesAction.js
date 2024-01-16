class MakeNotConditionNodesAction
extends Action
{
    shiftKey;


    nodeIds   = [];
    oldStates = [];

    newState;



    constructor(nodeIds, state)
    {
        super(
            MAKE_NOT_CONDITION_ACTION, 
            'MAKE NOT CONDITION ' + nodeIdArrayToString(nodeIds));

        this.nodeIds            = [...nodeIds];
        this.oldStates          = nodeIds.map(id => nodeFromId(id).notCondition);

        this.newState           = state;

        this.affectsConnections = false;
    }



    do(updateNodes)
    {
        const nodes = this.nodeIds.map(id => nodeFromId(id));

        nodes.forEach(n => n.notCondition = this.newState);
        pushUnique(updateNodes, nodes);
        
        uiSaveNodes(this.nodeIds);
    }



    undo(updateNodes)
    {
        const nodes = this.nodeIds.map(id => nodeFromId(id));

        for (let i = 0; i < this.nodeIds.length; i++)
            nodes[i].notCondition = this.oldStates[i];

        pushUnique(updateNodes, nodes);

        uiSaveNodes(this.nodeIds);
    }
}