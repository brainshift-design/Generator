class CreatePageAction
extends Action
{
    page;



    constructor(options)
    {
        super(CREATE_PAGE_ACTION, 'CREATE PAGE');
    }



    do(updateNodes)
    {
        // const [pan, zoom, nodesJson] = 
        //     graph.pages.length == 1
        //     ? CreatePageAction_prepareNodes()
        //     : [{x: 0, y: 0}, 1, NULL];


        this.page = graph.createPage('Graph');

        graph.updatePages();
        graph.updateSavedPages();

        
        if (graph.pages.length == 2)
        {
            for (const node of graph.currentPage.nodes)
            {
                node.pageId = this.page.id;
                node.id     = makeNodePath(node.nodeId);
            }
        }
            // CreatePageAction_updateNodes(this, pan, zoom, nodesJson);

        graphView.updateNodes(this.page.nodes);
    }



    undo(updateNodes)
    {
        // const [pan, zoom, nodesJson] = 
        //     graph.pages.length == 2
        //     ? CreatePageAction_prepareNodes()
        //     : [{x: 0, y: 0}, 1, NULL];

        graph.removePage(this.page);

        uiRemoveSavedPage(this.page.id);
        uiRemoveSavedNodesAndConns(graph.nodes.filter(n => n.pageId == this.page.id).map(n => n.id));

       
        if (graph.pages.length == 1)
        {
            if (graph.pages.length == 2)
            {
                for (const node of this.page.nodes)
                {
                    console.log('node =', node);
                    node.pageId = graph.pages[0].id;
                    node.id     = makeNodePath(node.nodeId);
                }
            }
        }
            // CreatePageAction_updateNodes(this, pan, zoom, nodesJson);


        graph.updatePages();
    }
}



// function CreatePageAction_prepareNodes()
// {
//     const nodeIds = graph.currentPage.nodes.map(n => n.id);

//     const nodesJson = uiCopyNodes(nodeIds);
//     uiDeleteNodes(nodeIds);

//     return [
//         graph.currentPage._pan,
//         graph.currentPage._zoom,
//         nodesJson ];
// }



// function CreatePageAction_updateNodes(action, pan, zoom, nodesJson)
// {
//     if (nodesJson != NULL)
//     {
//         const [nodes, dataConns] = uiPasteNodes(nodesJson, false);
//         uiSaveNodes(nodes.map(n => n.id));

//         graphView.pastingNodes = false;
//     }

//     graph.currentPage.setPanAndZoom(pan, zoom);

//     graphView.updateNodes(graph.currentPage.nodes);
// }