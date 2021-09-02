class ActionManager
{
    actions      = [];
    redoActions  = [];
    
    nextActionId = 0;
   
    
    
    do(action)
    {
        // this is a fresh new action so any 
        // old redo queue is no longer relevant
        this.redoActions = [];

        this.actions.push(action);

        action.id      = this.nextActionId++;
        action.manager = this;
        
        console.log("DO " + action.name);
        action.do();
    }



    undo()
    {
        if (this.actions.length == 0)
            return;

        var last = removeLast(this.actions);
        this.redoActions.push(last);

        console.log("UNDO " + last.name);
        last.undo();
    }



    redo()
    {
        if (this.redoActions.length == 0)
            return;

        var last = removeLast(this.redoActions);
        this.actions.push(last);

        console.log("REDO " + last.name);
        last.redo();
    }
}



const actionManager = new ActionManager();