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


    constructor(name)
    {
        this.name = name;

        console.assert(
               this.name != undefined
            && this.name != null
            && this.name != '');
    }



    do() {}



    redo()
    {
        this.do();
    }



    undo() {}
};



function linkActions(prevAction, action)
{
    prevAction.nextAction = action;
    action    .prevAction = prevAction;
}