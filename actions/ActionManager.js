/*
    when deleting parameters, store them in a parameter trash bin
    when looking for nodes and params during undo, check that bin also
    but also when just changing values or connecting etc params could come back,
        maybe the actions themselves should store deleted params along with
        deleted connections
    this will also come into play with copy/paste/duplicating
    when performing an action, clear that bin
*/



class ActionManager
{
    actions       = [];
    redoActions   = [];
    updateActions = [];
    
    nextActionId  = 0;



    undoing       = false;
    redoing       = false;
   
    
    
    do(act, linkWithPrevious = false, linkWithNext = false, putBeforeLast = false)
    {
        // this is a fresh new action so any 
        // old redo queue is no longer relevant
        this.redoActions = [];


        act.id            = this.nextActionId++;
        act.manager       = this;
        act._linkWithNext = linkWithNext;


        this.actions.push(act);

        
        if (this.actions.length > 1)
        {
            const before = this.actions.at(-2);
            const last   = this.actions.at(-1);

            if (   linkWithPrevious
                || before._linkWithNext)
            {
                linkActions(before, last);
                before._linkWithNext = false;
            }
        }


        this.doAction(act, false);

        addMetricsEvent(METRICS_ACTION_DO, act.name);
    }



    undo()
    {
        if (isEmpty(this.actions))
            return;

            
        this.undoing = true;


        for (;;)
        {
            let last = removeLast(this.actions);
            this.redoActions.push(last);


            this.undoAction(last);

            addMetricsEvent(METRICS_ACTION_UNDO, last.name);


            if (   isEmpty(this.actions)
                || last.prevAction != this.actions.at(-1))
                break;
        }
    }



    redo()
    {
        if (isEmpty(this.redoActions))
            return;

            
        this.redoing = true;


        for (;;)
        {
            let last = removeLast(this.redoActions);
            this.actions.push(last);


            this.doAction(last, true);

            addMetricsEvent(METRICS_ACTION_REDO, last.name);


            if (   isEmpty(this.redoActions)
                || last.nextAction != this.redoActions.at(-1))
                break;
        }
    }



    clear()
    {
        //console.log('actionManager.clear()');
        
        this.actions       = [];
        this.redoActions   = [];
        this.updateActions = [];
    }



    doAction(act, redo)
    {
        if (settings.logActions)
        {
            const prevLink = act.getPrevLinkString();
            const nextLink = act.getNextLinkString();

            const name = actNameForDisplay(act.name);

            if (redo) console.log("%cREDO %s", 'background: #ffd;    color: #b80;', prevLink + name + nextLink);
            else      console.log("%c%s",      'background: #e8ffe8; color: #282;', prevLink + name + nextLink);
        }


        const updateNodes = [];

        if (act.affectsConnections)
        {
            act.initSaveArrays();
            act.saveOldConnections();
        }


        if (!redo)
            act.do(updateNodes);

        else
        {
            act.redo(updateNodes);

            if (isEmpty(updateNodes))
                this.redoing = false;
        }


        const updateTime = Date.now();
        updateNodes.forEach(n => n.updateTime = updateTime);


        if (act.affectsConnections)
            act.updateOldConnections();


        if (!act.selfUpdate)
            pushUpdate(act, updateNodes);
    }



    undoAction(act)
    {
        if (settings.logActions)
        {
            const prevLink = act.getPrevLinkString();
            const nextLink = act.getNextLinkString();

            const name = actNameForDisplay(act.name);

            console.log("%cUNDO %s", 'background: #fff4e8; color: #c64;', prevLink + name + nextLink);
        }

            
        if (act.affectsConnections)
            act.deleteNewConnections();
            
            
        const updateNodes = [];

        act.undo(updateNodes); 


        if (isEmpty(updateNodes))
            this.undoing = false;


        const updateTime = Date.now();
        updateNodes.forEach(n => n.updateTime = updateTime);


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



function actNameForDisplay(name)
{
    name = name.replaceAll('<==', '⟸');
    name = name.replaceAll('<--', '⟵');
    name = name.replaceAll('==>', '⟹');
    name = name.replaceAll('-->', '⟶');

    const regex = /_(\d+)/g;

    name = name.replace(regex, (match, number) => subscriptNumber(parseInt(number)));

    return name;
}