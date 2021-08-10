class ActionManager
{
    actions      = [];
    redoActions  = [];
    
    nextActionId = 0;
   
    
    
    perform(action)
    {
        // this is a fresh new action so clear the redo queue
        this.redoActions = [];

        this.actions.push(action);

        action.id      = this.nextActionId++;
        action.manager = this;
        
        action.perform();
    }



    undo()
    {
        if (this.actions.length == 0)
            return;

        var last = removeLast(this.actions);
        this.redoActions.push(last);

        last.undo();
    }



    redo()
    {
        if (this.redoActions.length == 0)
            return;

        var last = removeLast(this.redoActions);
        this.actions.push(last);

        last.redo();
    }
}



const actionManager = new ActionManager();