class Operator
{
    _type;
    _id;
    
    params  = new Array();
    
    inputs  = new Array();
    outputs = new Array();

    graph   = null;


    constructor(type)
    {
        this._type = type;
        this._id   = type; // this is a temp until the op becomes a graph node
    }

    get type() { return this._type; }
    get id()   { return this._id;   }

    setId(newId)
    {
        if (this.graph.nodes.indexOf(newId) >= 0)
            return false; // graph already contains a node with this id

        this._id = newId;
        return true;
    }

    update()
    {

    }
}