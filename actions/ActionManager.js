class ActionManager
{
    actions      = [];
    redoActions  = [];
    
    nextActionId = 0;
   
    
    
    do(action, linkWithPrevious = false, linkWithNext = false)
    {
        // this is a fresh new action so any 
        // old redo queue is no longer relevant
        this.redoActions = [];

        this.actions.push(action);

        action.id            = this.nextActionId++;
        action.manager       = this;
        action._linkWithNext = linkWithNext;

        if (this.actions.length > 1)
        {
            const before = beforeLastOf(this.actions);
            const last   = lastOf      (this.actions);

            if (   linkWithPrevious
                || before._linkWithNext)
            {
                linkActions(before, last);
                before._linkWithNext = false;
            }
        }

        console.log(
            "%cDO %s", 
            'background: #e8ffe8; \
             color:      #282;', 
            action.name);

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

            console.log(
                "%cUNDO %s", 
                'background: #fff4e8; \
                 color:      #c64;', 
                last.name);
            
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

            console.log(
                "%cREDO %s", 
                'background: #ffd; \
                 color:      #b80;', 
                last.name);
            
            last.redo(); 
        
            if (   this.redoActions.length == 0
                || last.nextAction != lastOf(this.redoActions))
                break;
        }
    }
}



const actionManager = new ActionManager();