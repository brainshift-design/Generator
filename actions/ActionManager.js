/*
    when deleting parameters, store them in a parameter trash bin
    when looking for nodes and params during undo, check that bin also
    but also when just changing values or connecting etc params could come back,
        maybe the actions themselves should store deleted params along with
        deleted connections
    this will also come into play with copy/paste/duplicating
    when performing an actionn, clear that bin
*/



class ActionManager
{
    actions       = [];
    redoActions   = [];
    updateActions = [];
    
    nextActionId  = 0;
   
    
    
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


        this.doAction(act, false);
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


            this.doAction(last, true);


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
            else      console.log("%c%s",      'background: #e8ffe8; color: #282;', act.name);
        }


        const updateNodes = [];


        if (act.affectsConnections)
        {
            act.initSaveArrays();
            act.saveOldConnections();
        }


        if (!redo) act.do  (updateNodes);
        else       act.redo(updateNodes);


        if (act.affectsConnections)
            act.updateOldConnections();

        
        if (!act.selfUpdate)
            pushUpdate(act, updateNodes);
    }



    undoAction(act)
    {
        if (settings.logActions)
            console.log("%cUNDO %s", 'background: #fff4e8; color: #c64;', act.name);

            
        if (act.affectsConnections)
            act.deleteNewConnections();
            
            
        const updateNodes = [];

        act.undo(updateNodes); 


        if (act.affectsConnections)
            act.restoreOldConnections();


        if (!act.selfUpdate)
            pushUpdate(act, updateNodes);
    }
}



const actionManager = new ActionManager();



function actionFromId(actionId)
{
    let action = actionManager.actions.find(a => a.id == actionId);

    if (!isValid(action))
        action = actionManager.redoActions.find(a => a.id == actionId);

    return action;
}