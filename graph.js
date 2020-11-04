class Graph
{
    nodes       = new Array();

    #activeNode = null;

    get activeNode() { return this.#activeNode; }
    set activeNode(node)
    {
        this.#activeNode = node;
        var data = node.output.data;

        if (data !== undefined)
            updateCanvas();
    }


    addNode(node)
    {
        this.nodes.push(node);
        
        node._graph = this;
        node.setId(this.getNewId(node)); // TODO: not checking return value here

        document.body.appendChild(node.div);

        this.activeNode = node;
    }


    getNewId(_node)
    {
        var type = _node.type;

        var maxNum = 0;
        
        for (const node of this.nodes)
        {
            if (node == _node)
                continue;
                
            if (   node.id.length < type.length
                || node.id.substring(0, type.length) !== type)
                continue;
                
            var num = parseInt(node.id.substring(type.length));
            
            if (isNaN(num) || num == 0) 
                num = 1;
            
            maxNum = Math.max(num, maxNum);
        }

        if (maxNum == 0)
            return type;

        maxNum++;

        return type + maxNum;
    }
}