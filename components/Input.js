class Input
{
    _op;
    
    #dataType;

    #connection;

    constructor(dataType)
    {
        this.#dataType = dataType;
    }

    get connection() { return this.#connection; }
    set connection(conn)
    {
        this.#connection = conn;
    }
}