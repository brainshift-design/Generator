class EmptyAction
extends Action
{
    constructor(graph)
    {
        super(graph, EMPTY_ACTION, 'DO NOTHING');

        this.affectsConnections = false;
    }
}
