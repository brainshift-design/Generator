class Action
{
    manager;
 
    id;
    name;
  
    prevAction; // these are used to link actions into sequences
    nextAction; 
  
    data;
  
    onBefore;
    onAfter;

    onBeforeUndo;
    onAfterUndo;

    
    _linkWithNext = false;

    
    prevSelectedIds  = []; // currently selected nodes that are deselected as a result of creation
    
    oldActiveNodeIds = [];
    newActiveNodeIds = [];

    oldConnections   = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    newConnections   = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]



    constructor(name)
    {
        this.name = name;

        console.assert(
               this.name != undefined
            && this.name != null
            && this.name != '',
            'cannot create user action');
    }



    do() {}



    redo()
    {
        this.do();
    }



    undo() {}
};



function linkActions(prevAction, nextAction)
{
    prevAction.nextAction = nextAction;
    nextAction.prevAction = prevAction;
}