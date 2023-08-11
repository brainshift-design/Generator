const defPanelWidth  = 400;
const defPanelHeight = 400;



class   OpPanel
extends ResizableBase
{
    constructor()
    {
        super(PANEL, 'panel', '', '');

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;

        this.inner.addEventListener('pointerdown', e => 
        {
            e.stopPropagation();
            forwardEvent(e, graphView.div);
        });


        this.div.style.width  = 400;
        this.div.style.height = 400;


        this.header.addEventListener('dblclick', e =>
        {
            e.preventDefault();
            e.stopImmediatePropagation();


            if (e.button != 0)
                return;



            const nodes = [];

            for (const node of graph.currentPage.nodes)
            {
                if (rectInside(
                        node.measureData.divOffset,
                        this.measureData.divOffset))
                    nodes.push(node);
            }

            graphView.selectedNodes = [
                ...graphView.selectedNodes,
                ...nodes ];
        });
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: null });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }


    updateHeader()
    {
        super.updateHeader();

        this.div.style.zIndex = 0;


        let background;

        switch (this.highlight)
        {
            case 0: background = darkMode ? '#ffffff08' : '#00000008'; break;
            case 1: background = darkMode ? '#ff33332d' : '#ff000028'; break;
            case 2: background = darkMode ? '#ff880028' : '#f803';     break;
            case 3: background = darkMode ? '#ffff0020' : '#cc04';     break;
            case 4: background = darkMode ? '#1e12'     : '#0d04';     break;
            case 5: background = darkMode ? '#2277ff33' : '#0033ff28'; break;
            case 6: background = darkMode ? '#ff22ff26' : '#ff00ff28'; break;
            case 7: background = darkMode ? '#fff3'     : '#0003';     break;
        }

        this.div.style.background = background;

        this.header.style.boxShadow = '0 -1px 0 0 ' + (darkMode ? '#ffffff0b' : '#00000007') + ' inset';
    }



    updateRect(x, y, w, h, transform)
    {
        this.header.style.height = h;

        super.updateRect(x, y, w, h, transform);
    }
}