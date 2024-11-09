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
        this.allowEmptyName   = true;


        this.inner.addEventListener('pointerdown', e => 
        {
            e.stopPropagation();
            graphView.startedInPanel = true;
            forwardEvent(e, graphView.div);
        });



        this.div         .style.width    = 400;
        this.div         .style.height   = 400;

        this.width                       = 400;
        this.height                      = 400;

        this.header      .style.overflow = 'visible';
        this.labelWrapper.style.overflow = 'visible';
        this.label       .style.overflow = 'visible';
        this.labelText   .style.overflow = 'visible';



        this.header.addEventListener('dblclick', e =>
        {
            e.preventDefault();
            e.stopImmediatePropagation();


            if (e.button != 0)
                return;

            if (getCtrlKey(e))
            {
                const nodes = [];

                for (const node of graph.currentPage.nodes)
                {
                    if (rectInside(
                            node.measureData.divOffset,
                            this.measureData.divOffset))
                        nodes.push(node);
                }

                graphView.selectedNodes = nodes;

                actionManager.do(new SelectNodesAction(
                    nodes.map(n => n.id), 
                    graphView.selectedNodes.map(n => n.id)));
            }
            else
                this.showLabelTextbox();
        });
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        [w, h] = this.getGridSize(w, h);

        super.setRect(x, y, w, h, updateTransform);
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



    updateNode()
    {
        super.updateNode();
        graphView.updatePanels();
    }



    updateHeader()
    {
        super.updateHeader();

        this.div.style.zIndex = 0;


        let background;

        switch (this.highlight)
        {
            case 0: background = darkMode ? '#ffffff08' : '#00000008'; break;
            case 1: background = darkMode ? '#fff3'     : '#0003';     break;
            case 2: background = darkMode ? '#ff33332d' : '#ff000028'; break;
            case 3: background = darkMode ? '#ff880028' : '#f803';     break;
            case 4: background = darkMode ? '#ffff0020' : '#cc04';     break;
            case 5: background = darkMode ? '#1e12'     : '#0d04';     break;
            case 6: background = darkMode ? '#2277ff33' : '#0066ff28'; break;
            case 7: background = darkMode ? '#ff22ff26' : '#ff00ff28'; break;
        }

        this.div.style.background = background;

        //this.header.style.height     = defHeaderHeight / Math.min(1, graph.currentPage.zoom * 2.5);
        this.header.style.background = darkMode ? '#ffffff04' : '#00000004';
    }



    // updateHeaderLabel()
    // {
    //     super.updateHeaderLabel();

    //     let fontHeight = 11 / Math.min(graph.currentPage.zoom, 1);
    //     // const fontHeight = 11 / Math.min(0.5, graph.currentPage.zoom);
    //         // inHeader
    //         // ? 11
    //         // : 11 / Math.min(0.5, graph.currentPage.zoom);

    //     const mes = measureHtmlText(this.labelText.innerHTML, 'Inter', fontHeight);

    //     fontHeight *= Math.min(this.measureData.divOffset.height / mes.height, 1);
    //     // const inHeader = true;
    //         //    graph.currentPage.zoom > 0.4
    //         // && mes.width + 40 * graph.currentPage.zoom < this.measureData.divOffset.width;


    //     // this.labelText   .style.fontSize   = fontHeight; 
    //     // this.textbox     .style.fontSize   = fontHeight;
        
    //     // this.label       .style.lineHeight = fontHeight + 'px';
    //     // this.label       .style.height     = fontHeight + 'px';
        
    //     // utilContext.font = fontHeight + 'px Inter';
    //     // utilContext.measureText(this.labelText.value);

    //     // this.labelWrapper.style.top        = graph.currentPage.zoom > 0.25 ? 0 : -fontHeight * 1.2;
    //     // this.labelWrapper.style.overflow   = graph.currentPage.zoom > 0.25 ? 'hidden' : 'visible';
    //     // this.inner       .style.overflow   = graph.currentPage.zoom > 0.25 ? 'hidden' : 'visible';
    //     // // this.labelWrapper.style.top        = inHeader ? 0 : (-fontHeight - 10 + 1/graph.currentPage.zoom);
    //     // this.labelWrapper.style.overflow   = inHeader ? 'hidden' : 'visible';
    //     // this.inner       .style.overflow   = inHeader ? 'hidden' : 'visible';

    //     this.label.style.opacity = Math.min(this.measureData.divOffset.height / mes.height * 2, 1);

    //     this.textbox     .style.fontSize   = fontHeight + 'px';
    //     this.textbox     .style.fontSize   = fontHeight + 'px';

    //     // console.log('mes.width =', mes.width);
    //     // console.log('this.measureData.divOffset.width =', this.measureData.divOffset.width);

    //     // const wider       = mes.width * graph.currentPage.zoom + 40 < this.measureData.divOffset.width;

    //     // this.labelWrapper.style.textAlign  = wider ? 'left' : 'center'; 
        
    //     this.label       .style.fontSize   = fontHeight + 'px';
    //     this.label       .style.lineHeight = fontHeight + 'px';
    //     this.label       .style.height     = fontHeight + 'px';

    //     this.labelText   .style.fontSize   = fontHeight + 'px'; 
    //     this.labelText   .style.lineHeight = fontHeight + 'px'; 
    //     this.labelText   .style.height     = fontHeight + 'px'; 
    // }



    updateRect(x, y, w, h, transform)
    {
        this.header.style.height = h;

        super.updateRect(x, y, w, h, transform);
    }



    // toJsonBase(nTab = 0) 
    // {
    //     let   pos = ' '.repeat(nTab);
    //     const tab = HTAB;

    //     let json = Operator.prototype.toJsonBase.call(this, nTab);

    //     json += 
    //           ',\n' + pos + tab + '"width": "'  + this.width  + '"'
    //         + ',\n' + pos + tab + '"height": "' + this.height + '"';

    //     return json;
    // }



    // loadParams(_node, pasting)
    // {
    //     super.loadParams(_node, pasting);

    //     if (   _node.width
    //         && _node.height)
    //     {
    //         this.width  = parseFloat(_node.width );
    //         this.height = parseFloat(_node.height);
    //     }
    // }
}