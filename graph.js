class Graph
{
    nodes       = new Array();
    #activeNode = null;

    addNode(node)
    {
        this.nodes.push(node);
        
        node._id    = this.getNewId(node.type);
        node._graph = this;

        document.body.appendChild(node.div);        
    }


    get activeNode() { return this.#activeNode; }
    set activeNode(node)
    {
        this.#activeNode = node;
        updateCanvas(this); // send this graph to be created in the canvas
    }


    getNewId(type)
    {
        var maxNum = 0;

        for (const node of this.nodes)
        {
            if (   node.id.length < type.length
                || node.id.substring(0, type.length) !== type)
                continue;

            var num = parseInt(node.id.substring(type.length));
            if (num == 0) num = 1;

            maxNum = Math.max(num, maxNum);
        }

        if (maxNum == 0)
            return type;

        maxNum++;

        return type + maxNum;
    }
}