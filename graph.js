class Graph
{
    nodes = new Array();

    #activeNode = null;

    mutex = false;
    defer = false;

    random = new Random();
    randomSeed = this.random.seed; // TODO reset the seed when loading a graph


    get activeNode() { return this.#activeNode; }
    set activeNode(node)
    {
        this.#activeNode = node;
        updateCanvas();
    }


    addNode(node)
    {
        this.nodes.push(node);
        
        node.setGraph(this);
        node.setId(this.getNewId(node)); // TODO: not checking return value here

        graphView.appendChild(node.div);

        this.activeNode = node;
    }


    createNode(type)
    {
        var node;

        switch (type)
        {
            case 'rect':   node = new OpRect();   break;
            case 'spread': node = new OpSpread(); break;
        }

        this.addNode(node);
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