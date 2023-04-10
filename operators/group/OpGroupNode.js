class   OpGroupNode
extends ResizableBase
{
    children = [];



    constructor()
    {
        super(NODE_GROUP, 'group', 'group');

        this.alwaysLoadParams   = true;
        this.sharpBottomCorners = true;
        
        this.div.style.height   = '100px';



        this.header.addEventListener('dblclick', e =>
        {
            if (e.button == 0)
                this.children.forEach(n => n.selected = true);
        });

        

        this.div.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                this.children.forEach(n => n.selected = true);
            }        
        });
    }
    
    

    genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values) // virtual
    // {
    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    // }

    

    updateProxyControls()
    {
        this.children = [];

        for (const node of graph.nodes)
        {
            if (rectInside(node.measureData.divOffset, offsetRect(this.div)))
                pushUnique(this.children, node);
        }


        this.removeProxyWires();
        this.removeAllParams();


        this.addProxyOutputParams();
        this.addProxyInputParams();
    }



    addProxyOutputParams()
    {
        for (const node of this.children)
        {
            for (const param of node.params)
            {
                if (    param.output
                    &&  param.output.connected)
                {
                    let includes = false;

                    for (const input of param.output.connectedInputs)
                    {
                        if (this.children.includes(input.node))
                        {
                            includes = true;
                            break;
                        }
                    }
                    
                    if (!includes)
                        this.addParam(new ProxyParam(param));
                }
            }
        }
    }



    addProxyInputParams()
    {
        for (const node of this.children)
        {
            for (const param of node.params)
            {
                if (    param.input
                    &&  param.input.connected
                    && !this.children.find(n => n.id == param.input.connectedOutput.node.id))
                    this.addParam(new ProxyParam(param));
            }
        }
    }



    updateProxyWires()
    {
        const wires = 
            this.params
                .filter(p => p.input)
                .map   (p => p.input.connection.wire);

        graphView.updateWires(wires);
    }



    removeProxyWires()
    {
        for (const param of this.params)
        {
            if (param.input)
                graphView.wireContainer.removeChild(param.input.connection.wire.svg);
            
            if (param.output) 
                param.output.connectedInputs.forEach(i => 
                    graphView.wireContainer.removeChild(i.connection.wire.svg));
        }
    }



    updateNode()
    {
        super.updateNode();

        this.div.style.zIndex = 0;

        this.inner.style.height          = this.div.offsetHeight;
        this.inner.style.backgroundColor = darkMode ? '#5558' : '#ddd8';// 'var(--figma-color-border-disabled)';
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}
