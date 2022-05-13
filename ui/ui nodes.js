/*
    At least one node in a tree must be active. It doesn't have to be a terminal,
    but there can be no other active nodes downstream.

    In diamonds exactly one node can be active.



    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

√       █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

√       █████████     █████████



    Connecting


        █████████─ ─ →█████████
√                  ↓
        [̅_̅_̅_̅_̅_̅_̅_]─────█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]──┘
                   └ →█████████

√                 ↓

                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   └──█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        [̅_̅_̅_̅_̅_̅_̅_]──┐
                   └─→█████████
        █████████─ ┘

√                 ↓

        [̅_̅_̅_̅_̅_̅_̅_]──┐
                   ╞══█████████
        [̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        █████████──┐
                   └─→[̅_̅_̅_̅_̅_̅_̅_]
        █████████─ ┘

√                 ↓

        █████████──┐
                   ╞══[̅_̅_̅_̅_̅_̅_̅_]
        [̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████─ ┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡              → █████████
                   └──█████████

√                         ↓

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡             └──█████████
                   └──█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡             └─→█████████
                   └──█████████─ ┘

√                         ↓

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡             ╞══█████████
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡             └─→[̅_̅_̅_̅_̅_̅_̅_]
                   └──█████████─ ┘

√                         ↓

                   ┌──█████████──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙



    Activating
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        █████████─────[̅_̅_̅_̲̅√̅_̅_̅_]
√                  ↓
        [̅_̅_̅_̅_̅_̅_̅_]─────█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        [̅_̅_̅_̲̅√̅_̅_̅_]─────█████████
√                  ↓
        █████████─────[̅_̅_̅_̅_̅_̅_̅_]

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̲̅√̅_̅_̅_]
        █████████══╡
                   └──[̅_̅_̅_̅_̅_̅_̅_]
√                 ↓
                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   └──[̅_̅_̅_̅_̅_̅_̅_]

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   └──[̅_̅_̅_̲̅√̅_̅_̅_]
√                 ↓
                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   └──█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████
        [̅_̅_̅_̲̅√̅_̅_̅_]══╡
                   └──█████████
√                 ↓
                   ┌──[̅_̅_̅_̅_̅_̅_̅_]
        █████████══╡
                   └──[̅_̅_̅_̅_̅_̅_̅_]

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̲̅√̅_̅_̅_]──┐
        █████████══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

√                         ↓

                   ┌──█████████──┐
        [̅_̅_̅_̅_̅_̅_̅_̅]══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████──┐
        [̅_̅_̅_̅_̅_̅_̅_̅]══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̲̅√̅_̅_̅_]──┘

√                         ↓

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        [̅_̅_̅_̅_̅_̅_̅_̅]══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──█████████──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        [̅_̅_̅_̅_̅_̅_̅_̅]══╡             ╞══[̅_̅_̅_̲̅√̅_̅_̅_]
                   └──█████████──┘

√                         ↓

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        [̅_̅_̅_̅_̅_̅_̅_̅]══╡             ╞══█████████
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙



    Disconnecting
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        [̅_̅_̅_̅_̅_̅_̅_]──╳──█████████
√                  ↓
        █████████     █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        █████████──╳──[̅_̅_̅_̅_̅_̅_̅_]
√                  ↓
        █████████     █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        █████████─────[̅_̅_̅_̅_̅_̅_̅_]──╳──[̅_̅_̅_̅_̅_̅_̅_]
√                  ↓
        █████████─────[̅_̅_̅_̅_̅_̅_̅_]     █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   ╳──█████████
√                 ↓
                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]──┘
                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]
        █████████══╡
                   ╳──[̅_̅_̅_̅_̅_̅_̅_]
√                 ↓
                   ┌──[̅_̅_̅_̅_̅_̅_̅_]
        █████████──┘
                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        [̅_̅_̅_̅_̅_̅_̅_]──┐
                   ╞══█████████
        [̅_̅_̅_̅_̅_̅_̅_]──╳

√                 ↓

        [̅_̅_̅_̅_̅_̅_̅_]──┐
                   └──█████████
        █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        █████████──┐
                   ╞══[̅_̅_̅_̅_̅_̅_̅_]
        [̅_̅_̅_̅_̅_̅_̅_]──╳

√                 ↓

        █████████──┐
                   └──[̅_̅_̅_̅_̅_̅_̅_]
        █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        [̅_̅_̅_̅_̅_̅_̅_]──┐
                   ╞══[̅_̅_̅_̅_̅_̅_̅_]
        █████████──╳

√                 ↓

        [̅_̅_̅_̅_̅_̅_̅_]──┐
                   └──█████████
        █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙



    Deleting
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                         ╲ ╱
        [̅_̅_̅_̅_̅_̅_̅_]─────████╳████
√                  ↓     ╱ ╲
        █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
           ╲ ╱
        [̅_̅_̅_╳̅_̅_̅_]─────█████████
√          ╱ ╲     ↓
                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

           ╲ ╱
        ████╳████─────[̅_̅_̅_̅_̅_̅_̅_]
√          ╱ ╲     ↓
                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                         ╲ ╱
        █████████─────[̅_̅_̅_╳̅_̅_̅_]
√                  ↓     ╱ ╲
        █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                         ╲ ╱
        [̅_̅_̅_̅_̅_̅_̅_]─────████╳████─────[̅_̅_̅_̅_̅_̅_̅_]
√                        ╱ ╲
        █████████         ↓         █████████


    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

        [̅_̅_̅_̅_̅_̅_̅_]──┐     ╲ ╱
                   ╞══████╳████
        [̅_̅_̅_̅_̅_̅_̅_]──┘     ╱ ╲

√                 ↓

        █████████

        █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

           ╲ ╱     ┌──[̅_̅_̅_̅_̅_̅_̅_]
        ████╳████══╡
           ╱ ╲     └──[̅_̅_̅_̅_̅_̅_̅_]

√                 ↓

                      █████████

                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐     ╲ ╱
        [̅_̅_̅_̅_̅_̅_̅_]══╡             ╞══████╳████
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘     ╱ ╲

√                         ↓

                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   └──█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

           ╲ ╱     ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        ████╳████══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
           ╱ ╲     ╟──[̅_̅_̅_̅_̅_̅_̅_]──┘
                   │
                   └──[̅_̅_̅_̅_̅_̅_̅_]

√                         ↓

                      █████████──┐
                                 ╞══[̅_̅_̅_̅_̅_̅_̅_]
                      [̅_̅_̅_̅_̅_̅_̅_]──┘

                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
                         ╲ ╱
                   ┌──████╳████──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡     ╱ ╲     ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

√                         ↓

        █████████──┐             ┌──[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
*/



graphView.activeNodes = [];



function uiCreateNode(nodeType, creatingButton, createdId = -1, updateUi = true)
{
    let node = createNode(nodeType, creatingButton, createdId);

    graph.addNode(node);

    uiSaveNodes([node.id]);


    // if (graphView.selectedNodes.length > 0)
    // {
    //     const selNode = graph.nodes.find(n => n.selected);
    //     const inputs  = node.inputs.filter(i => i.types.includes(selNode.type));

    //     if (   !!selNode
    //         && selNode.output
    //         && inputs.length > 0)
    //         uiConnect(selNode.output, inputs[0]);
    // }


    if (updateUi)
    {
        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [node];

        //pushUpdate([node]);

        //graphView.putNodeOnTop(node);
        //graphView.updateNodeTransform(node);

        //updateGraphNodes();
    }


    return node;
}



function uiDeleteNodes(nodeIds, actionId)
{
    graph.deleteNodes(nodeIds);

    uiRemoveSavedNodesAndConns(nodeIds);
    uiDeleteObjects(nodeIds);
}



// function uiUndeleteNodes(nodes, nodePos, actionId)
// {
//     graph.addNodes(nodes);


//     graphView.selectedNodes = nodes;

//     graphView.putNodeOnTop(lastOf(nodes));

//     for (let i = 0; i < nodes.length; i++)
//     {
//         setNodePosition(
//             nodes[i],
//             nodePos[i].x,
//             nodePos[i].y);
//     }


//     // uiPostMessageToGenerator({
//     //     cmd:       'genUndeleteNodes',
//     //     uiActionId: actionId
//     // });
// }



function uiDeleteObjects(nodeIds)
{
    uiPostMessageToFigma({
        cmd:    'figDeleteObjects',
        nodeIds: nodeIds
    });
}



function uiSetNodeId(nodeId, newId)
{
    const node = nodeFromId(nodeId);

    node.id = newId;
}



function uiVariableConnect(outputNode, outputIndex, inputNode, inputIndex)
{
    //console.log('uiVariableConnect()');

    if (inputNode.variableInputs)
    {
        const input = lastOf(inputNode.inputs);

        const conn = uiConnect(
            outputNode.outputs[outputIndex],
            input,
            inputIndex);

        uiUpdateSavedConnectionsToNode(inputNode.id);

        return conn;
    }
    else
    {
        return uiConnect(
            outputNode.outputs[outputIndex],
             inputNode. inputs[ inputIndex]);
    }
}



function uiConnect(output, input, inputIndex = -1)
{
    const conn = graph.connect(output, input, inputIndex);

    uiSaveConnection(
        output.node.id,
        output.index,
        input.node.id,
        input.index,
        conn.toJson());

    return conn;
}



function uiDisconnect(input)
{
    const node = input.node;
        
    uiRemoveSavedConnection(
        input.connectedOutput.node.id,
        input.connectedOutput.index,
        input.node.id,
        input.index);

    graph.disconnect(input);

    if (node.variableInputs)
        uiUpdateSavedConnectionsToNode(node.id);
}



function uiUpdateSavedConnectionsToNode(nodeId)
{
    const node = nodeFromId(nodeId);


    uiRemoveSavedConnectionsToNode(node.id);

    for (const _input of node.inputs.filter(i => i.connected))
    {
        uiSaveConnection(
            _input.connectedOutput.node.id,
            _input.connectedOutput.index,
            node.id,
            _input.index,
            _input.connection.toJson());
    }
}



function uiMakeNodeActive(node)
{
    uiMakeNodeLeftPassive (node);
    uiMakeNodeRightPassive(node);

    node.makeActive();

    // uiPostMessageToFigma({
    //     cmd:   'figSaveActiveNode',
    //     nodeId: node.id
    // });

    node.updateNode();
    //pushUpdate([node]);
}



// function uiMakeNodesActive(nodes)
// {
//     for (const node of nodes)
//     {
//         uiMakeNodePassive(node);
//         uiMakeNodeLeftPassive (node);
//         uiMakeNodeRightPassive(node);
//     }
    
//     for (const node of nodes)
//     {
//         node._active = true;

//         if (!graphView.activeNodes.includes(node))
//             graphView.activeNodes.push(node);

//         uiPostMessageToFigma({
//             cmd:   'figSaveActiveNode',
//             nodeId: node.id
//         });
    
//         // if (node.type == 'object')
//         //     uiGenerateObjects([node.id]);

//         node.updateNode();
//         pushUpdate([node]);
//     }
// }



function uiMakeNodePassive(node)
{
    //if (node.active)
    //    uiDeleteObjects([node.id]);

    node.makePassive();
    node.updateNode();
}



function uiMakeNodeLeftPassive(node, fromNode = null)
{
    for (const input of node.inputs)
    {
        if (input.connected)
        {
            //console.log(input.connectedOutput);
            uiMakeNodePassive(input.connectedOutput.node);
            uiMakeNodeLeftPassive(input.connectedOutput.node, node);
        }
    }

    // for (const output of node.outputs)
    // {
    //     for (const input of output.connectedInputs)
    //     {
    //         if (input.node != fromNode)
    //         {
    //             //console.log(input.connectedOutput);
    //             uiMakeNodePassive(input.node);
    //             uiMakeNodeRightPassive(input.node, node);
    //         }
    //     }
    // }
}



function uiMakeNodeRightPassive(node, fromNode = null)
{
    for (const output of node.outputs)
    {
        for (const connInput of output.connectedInputs)
        {
            uiMakeNodePassive(connInput.node);
            uiMakeNodeRightPassive(connInput.node, node);
        }
    }

    for (const input of node.inputs)
    {
        if (   input.connected
            && input.connectedOutput.node != fromNode)
        {
            //console.log(input.connectedOutput);
            uiMakeNodePassive(input.connectedOutput.node);
            uiMakeNodeLeftPassive(input.connectedOutput.node, node);
        }
    }
}



function getActiveNodeInBranchFrom(node, alreadyChecked = [])
{
    if (node.active) return node;


    const nodeInputs = [...node.inputs.filter(i => i.connected)];

    if (    nodeInputs.length == 1
        && !alreadyChecked.includes(nodeInputs[0].connectedOutput.node))
    {
        const leftActive = getActiveNodeInBranchFrom(
            nodeInputs[0].connectedOutput.node, 
            [...alreadyChecked, node]);

        if (leftActive) return leftActive;
    }


    const nodeOutputs = [...node.outputs.filter(o => o.connectedInputs.length == 1)];

    if (    nodeOutputs.length == 1
        && !alreadyChecked.includes(nodeOutputs[0].connectedInputs[0].node))
    {
        const rightActive = getActiveNodeInBranchFrom(
            nodeOutputs[0].connectedInputs[0].node, 
            [...alreadyChecked, node]);

        if (rightActive) return rightActive;
    }


    return null;
}



function getActiveNodeInTreeFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveNodeInTreeFromNode(nodeFromId(nodeId), alreadyChecked);
}



function getActiveNodeInTreeFromNode(node, alreadyChecked = [])
{
    if (node.active) return node;


    const leftActive = getActiveNodeLeftInTreeFrom(node, [...alreadyChecked]);
    if (leftActive) return leftActive;


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveNodeInTreeFromNode(
                    input.node, 
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
}



function getActiveNodeLeftInTreeFrom(node, alreadyChecked = [])
{
    if (node.active) return node;


    for (const input of node.inputs)
    {
        if (    input.connected
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveNodeInTreeFromNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function getActiveNodesInTreeFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveNodesInTreeFromNode(nodeFromId(nodeId), alreadyChecked);
}



function getActiveNodesInTreeFromNode(node, alreadyChecked = [])
{
    const activeNodes = [];


    if (node.active) 
        activeNodes.push(node);


    for (const input of node.inputs)
    {
        if (    input.connected
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveNodesInTreeFromNode(input.connectedOutput.node, [...alreadyChecked, node]);
            
            // if (leftActive.length > 0) 
            // {
                activeNodes.push(...leftActive);
            //    break;
            // }
        }
    }


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveNodesInTreeFromNode(input.node, [...alreadyChecked, node]);
                
                // if (rightActive.length > 0) 
                // {
                    activeNodes.push(...rightActive);
                //    break;
                // }
            }
        }
    }


    return activeNodes;
}



function uiShowParamValue(nodeId, paramName, value)
{
    const node = nodeFromId(nodeId);

    if (!!node) // this is for deleted nodes which still exist
    {           // in genGraph but no longer in graph
        const param = node.params.find(p => p.name == paramName);
        param.control.setValue(value, false);
    }
}



function uiCopyNodes(nodeIds)
{
    const nodes      = graph.nodes.filter(n => nodeIds.includes(n.id));
    const copiedJson = nodesToJson(nodes, true, false);

    //console.log(copiedJson);

    return copiedJson;
}



function uiPasteNodes(nodesJson, pasteOutsideConnections)
{
    graphView.loadingNodes = true;


    pasteOffset[0] += pasteOffsetDelta[0];
    pasteOffset[1] += pasteOffsetDelta[1];


    const data  = JSON.parse(nodesJson);


    // offset new nodes (must be done before loading)
    for (let i = 0; i < data.nodes.length; i++)
    {
        data.nodes[i].x = parseFloat(data.nodes[i].x) + pasteOffset[0] / graphView.zoom;
        data.nodes[i].y = parseFloat(data.nodes[i].y) + pasteOffset[1] / graphView.zoom;
    }


    const nodes = loadNodes(data);

    // get the new names of the nodes after they've been added
    for (let i = 0; i < nodes.length; i++)
    {
        graph.addNode(nodes[i], false);
        data.nodes[i].newId = nodes[i].id;
    }

    if (data.connections)
    {
        //console.log('data', data);
        correctNodeNamesInConnections(data);
        loadConnections(data, pasteOutsideConnections);
    }

    graphView.selectedNodes = nodes;


    graphView.loadingNodes = false;
    return nodes;
}



function correctNodeNamesInConnections(data)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];

        let outputNodeIndex = data.nodes.findIndex(n => n.id == _conn.outputNode);
        if (outputNodeIndex > -1) data.connections[i].outputNode = data.nodes[outputNodeIndex].newId;

        const inputNodeIndex = data.nodes.findIndex(n => n.id == _conn.inputNode);
        data.connections[i].inputNode = data.nodes[inputNodeIndex].newId;
    }
}



function updateGraphNodes()
{
    //console.log('updateGraphNodes()');

    for (const node of graphView.selectedNodes)      node.updateNode();
    for (const node of graphView._prevSelectedNodes) node.updateNode();
    for (const node of graphView.lastSelectedNodes)  node.updateNode();
}



function uiUpdateNodes(nodeIds)
{
    if (graph.mutex)
    {
        for (const nodeId of nodeIds)
            graph.deferNodeIds.push(nodeId);

        return;
    }

    graph.mutex = true;
}



function uiUpdateGraph()
{
    graph.mutex = false;


    if (graph.deferNodeIds.length > 0)
    {
        let deferNodes = filterUnique(graph.deferNodeIds);

        graph.deferNodeIds = [];

        uiUpdateNodes(deferNodes);
    }
}



function uiUpdateValues(values)
{
    if (settings.logValueUpdates)
        console.log('%cvalues', 'background: #e70; color: white;', values);
    

    const updateNodeId     = values[0];
    const updateParamIndex = values[1];


    const nodes = [];

    for (let i = 2; i < values.length; i += 3)
    {
        const nodeId     = values[i  ];
        const paramIndex = values[i+1];
        const strVal     = values[i+2];

        const node = nodeFromId(nodeId);
        if (!node) continue; // the node was deleted

        if (!nodes.includes(node)) 
            nodes.push(node);

        if (   nodeId     != updateNodeId
            || paramIndex != updateParamIndex)
            node.updateParamValue(paramIndex, parseDec(strVal));
    }


    for (const node of nodes)
    {
        node.valid = true;
        node.updateNode();
        uiSaveNodes([node.id]);
    }

    graphView.update(nodes);
}



function uiUpdateObjects(objects)
{
    //uiUpdateGraph();

    uiPostMessageToFigma({
        cmd:    'figUpdateObjects',
        objects: objects
    });
}



function uiSaveNodes(nodeIds)
{
    const nodeJson = [];

    nodeIds.forEach(id => 
        nodeJson.push(nodeFromId(id).toJson()));

    uiPostMessageToFigma({
        cmd:     'figSaveNodes',
        nodeIds:  nodeIds,
        nodeJson: nodeJson
    });
}



function uiRemoveSavedNodesAndConns(nodeIds)
{
    uiPostMessageToFigma({
        cmd:    'figRemoveSavedNodesAndConns',
        nodeIds: nodeIds
    });
}



function uiRemoveAllSavedNodesAndConns()
{
    uiPostMessageToFigma({
        cmd: 'figRemoveAllSavedNodesAndConns'
    });
}



function uiLogAllSavedNodesAndConns()
{
    uiPostMessageToFigma({
        cmd:     'figLogAllSavedNodesAndConns',
        settings: settings
    });
}



function uiLogAllSavedNodes()
{
    uiPostMessageToFigma({
        cmd:     'figLogAllSavedNodes',
        settings: settings
    });
}



function uiLogAllSavedConns()
{
    uiPostMessageToFigma({
        cmd:     'figLogAllSavedConns',
        settings: settings
    });
}



function uiSaveConnection(outputNodeId, outputIndex, inputNodeId, inputIndex, connJson)
{
    uiPostMessageToFigma({
        cmd: 'figSaveConnection',
        name: outputNodeId  + ' '
            + outputIndex + ' '
            + inputNodeId   + ' '
            + inputIndex,
        json: connJson
    });
}



function uiRemoveSavedConnection(outputNodeId, outputIndex, inputNodeId, inputIndex)
{
    uiPostMessageToFigma({
        cmd: 'figRemoveSavedConnection',
        name: outputNodeId + ' '
            + outputIndex  + ' '
            + inputNodeId  + ' '
            + inputIndex
    });
}



function uiRemoveSavedConnectionsToNode(nodeId)
{
    uiPostMessageToFigma({
        cmd:   'figRemoveSavedConnectionsToNode',
        nodeId: nodeId
    });
}