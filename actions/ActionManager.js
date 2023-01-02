class ActionManager
{
    actions      = [];
    redoActions  = [];
    
    nextActionId = 0;
   
    
    
    do(act, linkWithPrevious = false, linkWithNext = false)
    {
        // this is a fresh new action so any 
        // old redo queue is no longer relevant
        this.redoActions = [];

        this.actions.push(act);

        act.id            = this.nextActionId++;
        act.manager       = this;
        act._linkWithNext = linkWithNext;

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


        this.doAction(act);
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



    doAction(act, redo)
    {
        if (settings.logActions)
        {
            if (redo) console.log("%cREDO %s", 'background: #ffd;    color: #b80;', act.name);
            else      console.log("%cDO %s",   'background: #e8ffe8; color: #282;', act.name);
        }


        const updateNodes = [];
        act.initSaveArrays();


        act.saveOldSelectedNodes();
        act.saveOldActiveNodes();
        act.saveOldConnections();


        act.do(updateNodes);


        act.updateOldSelectedNodes();
        act.updateOldActiveNodes();
        act.updateOldConnections();


        pushUpdate(act, updateNodes);
    }



    undoAction(act)
    {
        if (settings.logActions)
            console.log("%cUNDO %s", 'background: #fff4e8; color: #c64;', act.name);


        const updateNodes = [];


        act.deleteNewConnections();
        act.deactivateNewActiveNodes();
        act.deselectNewSelectedNodes();


        act.undo(updateNodes); 


        act.restoreOldConnections();
        act.activateOldActiveNodes(updateNodes);
        act.selectOldSelectedNodes();


        pushUpdate(act, updateNodes);
    }
}



const actionManager = new ActionManager();