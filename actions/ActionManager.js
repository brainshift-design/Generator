class ActionManager
{
    actions      = [];
    redoActions  = [];
    
    nextActionId = 0;
   
    
    
    do(action, linkWithPrevious = false)
    {
        // this is a fresh new action so any 
        // old redo queue is no longer relevant
        this.redoActions = [];

        this.actions.push(action);

        action.id      = this.nextActionId++;
        action.manager = this;

        if (   linkWithPrevious
            && this.actions.length > 1)
        {
            linkActions(
                beforeLastOf(this.actions),
                lastOf(this.actions));
        }

        console.log("DO " + action.name);
        action.do();
    }



    undo()
    {
        if (this.actions.length == 0)
            return;

        for (;;)
        {
            let last = removeLast(this.actions);
            this.redoActions.push(last);

            console.log("UNDO " + last.name);
            last.undo();

            if (   this.actions.length == 0
                || last.prevAction != lastOf(this.actions))
                break;
        }
    }



    redo()
    {
        if (this.redoActions.length == 0)
            return;

        for (;;)
        {
            let last = removeLast(this.redoActions);
            this.actions.push(last);

            console.log("REDO " + last.name);
            last.redo();
        
            if (   this.redoActions.length == 0
                || last.nextAction != lastOf(this.redoActions))
                break;
        }
    }
}



const actionManager = new ActionManager();