class Action
{
    id;
    manager;
  
    prevAction; // these are used to link actions into sequences
    nextAction; 
  
    data;
  
    onBefore;
    onAfter;

    onBeforeUndo;
    onAfterUndo;



    perform() {}



    redo()
    {
        this.perform();
    }



    undo() {}



	link(prevAction, action)
	{
		prevAction.nextAction = action;
		action    .prevAction = prevAction;
	}



    // checkForPrevLink(condition)
    // {
    //     var index = manager.actions.indexOf(this);

    //     if (manager.actions[index-1].)
    //         && !PrevAction)
    //     {
    //         auto before = std::static_pointer_cast<T>((*Manager)[index-1]);

    //         if (condition(before))
    //             link(before, shared_from_this());
    //     }
    // }
};
