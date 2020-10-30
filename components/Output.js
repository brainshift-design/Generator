class Output
{
    _op;

    #dataType;

    #connections = {};

    constructor(dataType)
    {
        this.#dataType = dataType;
    }

    get connections() { return this.#connections; }

    addConnection(conn)
    {
        this.#connections.push(conn);
    }

    removeConnection(conn)
    {
        var index = this.#connections.indexOf(conn);

        if (index >= 0)
            this.#connections.slice(index, 1);
    }
}