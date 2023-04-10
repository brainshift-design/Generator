class EmptyAction
extends Action
{
    constructor()
    {
        super(EMPTY_ACTION, 'DO NOTHING');

        this.affectsConnections = false;
    }
}
