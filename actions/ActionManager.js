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


        this.doAction(action);
    }



    undo()
    {
        if (isEmpty(this.actions))
            return;

            
        for (;;)
        {
            let last = removeLast(this.actions);
            this.redoActions.push(last);


            this.undoAction(last);


            if (   isEmpty(this.actions)
                || last.prevAction != lastOf(this.actions))
                break;
        }
    }



    redo()
    {
        if (isEmpty(this.redoActions))
            return;

            
        for (;;)
        {
            let last = removeLast(this.redoActions);
            this.actions.push(last);


            this.doAction(last);


            if (   isEmpty(this.redoActions)
                || last.nextAction != lastOf(this.redoActions))
                break;
        }
    }



    doAction(action, redo)
    {
        if (settings.logActions)
        {
            if (redo) console.log("%cREDO %s", 'background: #ffd;    color: #b80;', action.name);
            else      console.log("%cDO %s",   'background: #e8ffe8; color: #282;', action.name);
        }


        const updateNodes = [];
        action.initSaveArrays();


        action.saveOldSelectedNodes();
        action.saveOldActiveNodes();
        action.saveOldConnections();


        action.do(updateNodes);


        action.updateOldSelectedNodes();
        action.updateOldActiveNodes();
        action.updateOldConnections();


        pushUpdate(this, updateNodes);
    }



    undoAction(action)
    {
        if (settings.logActions)
            console.log("%cUNDO %s", 'background: #fff4e8; color: #c64;', action.name);


        const updateNodes = [];


        action.deleteNewConnections();
        action.deactivateNewActiveNodes();
        action.deselectNewSelectedNodes();


        action.undo(updateNodes); 


        action.restoreOldConnections();
        action.activateOldActiveNodes(updateNodes);
        action.selectOldSelectedNodes();


        pushUpdate(this, updateNodes);
    }
}



const actionManager = new ActionManager();