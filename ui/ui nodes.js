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
√                         ↓
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

                  ↓

                      █████████

                      █████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

                   ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐     ╲ ╱
        [̅_̅_̅_̅_̅_̅_̅_]══╡             ╞══████╳████
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘     ╱ ╲

                          ↓

                   ┌──█████████
        [̅_̅_̅_̅_̅_̅_̅_]══╡
                   └──█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
                         ╲ ╱
                   ┌──████╳████──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡     ╱ ╲     ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

√                         ↓

        [̅_̅_̅_̅_̅_̅_̅_]──┐             ┌──█████████
                   └──[̅_̅_̅_̅_̅_̅_̅_]──┘

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
                         ╲ ╱
                   ┌──████╳████──┐
        [̅_̅_̅_̅_̅_̅_̅_]══╡     ╱ ╲     ╞══[̅_̅_̅_̅_̅_̅_̅_]
                   ╟──[̅_̅_̅_̅_̅_̅_̅_]──┘
                   │
                   └──█████████

                          ↓

        [̅_̅_̅_̅_̅_̅_̅_]══╗             ┌──█████████
                   ╟──[̅_̅_̅_̅_̅_̅_̅_]──┘
                   │
                   └──█████████

    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙

           ╲ ╱     ┌──[̅_̅_̅_̅_̅_̅_̅_]──┐
        ████╳████══╡             ╞══[̅_̅_̅_̅_̅_̅_̅_]
           ╱ ╲     ╟──[̅_̅_̅_̅_̅_̅_̅_]──┘
                   │
                   └──[̅_̅_̅_̅_̅_̅_̅_]

                          ↓

                      █████████──┐
                                 ╞══[̅_̅_̅_̅_̅_̅_̅_]
                      [̅_̅_̅_̅_̅_̅_̅_]──┘

                      █████████

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

        node.updateNode();

        //pushUpdate([node]);

        //graphView.putNodeOnTop(node);
        //graphView.updateNodeTransform(node);

        //updateGraphNodes();
    }


    return node;
}



function uiDeleteNodes(nodeIds)//, actionId)
{
    nodeIds.forEach(id => nodeFromId(id).makePassive());

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


//     // uiQueueMessageToGenerator({
//     //     cmd:       'genUndeleteNodes',
//     //     uiActionId: actionId
//     // });
// }



function uiDeleteObjects(nodeIds)
{
    uiQueueMessageToFigma({
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

        uiUpdateSavedConnectionsToNodeId(inputNode.id);

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
        uiUpdateSavedConnectionsToNodeId(node.id);
}



function uiUpdateSavedConnectionsToNodeId(nodeId)
{
    const node = nodeFromId(nodeId);


    uiRemoveSavedConnectionsToNodeId(node.id);

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
    node.updateNode();

    pushUpdate([node]);
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

//         uiQueueMessageToFigma({
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
    if (!node.active) return;

    node.makePassive();
    node.updateNode();

    uiDeleteObjects([node.id]);
}



function uiMakeNodeLeftPassive(node, fromNode = null)
{
    //console.log('uiMakeNodeLeftPassive() node =', node);
    for (const input of node.inputs.filter(i => !i.param))
    {
        if (    input.connected
            && !input.connectedOutput.param
            && (  !fromNode
                || input.connectedOutput.node != fromNode))
        {
            uiMakeNodePassive(input.connectedOutput.node);
            uiMakeNodeLeftPassive(input.connectedOutput.node, node);
        }
    }
}



function uiMakeNodeRightPassive(node, fromNode = null)
{
    for (const output of node.outputs.filter(o => !o.param))
    {
        for (const connInput of output.connectedInputs.filter(i => !i.param))
        {
            uiMakeNodePassive(connInput.node);
            uiMakeNodeRightPassive(connInput.node, node);
        }
    }

    uiMakeNodeLeftPassive(node, fromNode);//
    // for (const input of node.inputs.filter(i => !i.param))
    // {
    //     if (   input.connected
    //         && input.connectedOutput.node != fromNode)
    //     {
    //         uiMakeNodePassive(input.connectedOutput.node);
    //         uiMakeNodeLeftPassive(input.connectedOutput.node, node);
    //     }
    // }
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
    //console.log(nodesJson);

    graphView.loadingNodes = true;


    pasteOffset[0] += pasteOffsetDelta[0];
    pasteOffset[1] += pasteOffsetDelta[1];


    const data = JSON.parse(nodesJson);


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
        correctNodeNamesInConnections(data);
        loadConnections(data, pasteOutsideConnections);
    }

    graphView.selectedNodes = nodes;


    // if there are no active nodes, activate terminals
    if (!nodes.find(n => n.active))
    {
        const terminals = [];

        for (const node of nodes)
            pushUnique(terminals, getTerminalsAfterNode(node));

        terminals.forEach(n => n.makeActive());
    }


    graphView.loadingNodes = false;
    finishLoadingNodes(data.nodes, nodes, true);


    return nodes;
}



function correctNodeNamesInConnections(data)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];

        let outputNodeIndex = data.nodes.findIndex(n => n.id == _conn.outputNodeId);
        if (outputNodeIndex > -1) data.connections[i].outputNodeId = data.nodes[outputNodeIndex].newId;

        const inputNodeIndex = data.nodes.findIndex(n => n.id == _conn.inputNodeId);

        data.connections[i].inputNodeId = data.nodes[inputNodeIndex].newId;
    }

    for (let i = 0; i < data.nodes.length; i++)
    {
        const _node = data.nodes[i];

        if (_node.newId && _node.newId != _node.id)
            _node.id = _node.newId;
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



function uiUpdateValuesAndObjects(updateNodeId, updateParamId, values, objects)
{
    if (settings.logRawValues)  
        console.log('raw values = ', values);

    if (settings.logValues)  
        logValueUpdates(updateNodeId, updateParamId, values);


    const nodes = [];

    let i = 0;
    while (i < values.length)
    {
        const nodeId = values[i++];
        const count  = values[i++];

        const node   = nodeFromId(nodeId);


        if (!node) // was deleted
        {
            i += count*2;
            continue;
        }


        pushUnique(nodes, node);


        if (count > 0)
        {
            const _ids    = [];
            const _values = [];

            for (let j = 0; j < count; j++)
            {
                const id   = values[i++];
                const type = values[i++];

                _ids.push(id);

                let value;

                switch (type)
                {
                    case NUMBER_VALUE:     value = parseNumberValue   (values[i++])[0]; break;
                    case COLOR_VALUE:      value = parseColorValue    (values[i++])[0]; break;
                    case FILL_VALUE:       value = parseFillValue     (values[i++])[0]; break;
                    case STROKE_VALUE:     value = parseStrokeValue   (values[i++])[0]; break;
                    case COLOR_STOP_VALUE: value = parseColorStopValue(values[i++])[0]; break;
                    case RECTANGLE_VALUE:  value = parseRectangleValue(values[i++])[0]; break;
                    case LINE_VALUE:       value = parseLineValue     (values[i++])[0]; break;
                    case ELLIPSE_VALUE:    value = parseEllipseValue  (values[i++])[0]; break;
                    case POLYGON_VALUE:    value = parsePolygonValue  (values[i++])[0]; break;
                    case STAR_VALUE:       value = parseStarValue     (values[i++])[0]; break;
                    
                    default:               console.assert(false, 'unknown type \'' + type + '\'');
                }

                if (value.nodeId)
                    value.nodeId = nodeId; 
    
                _values.push(value);
            }

            node.updateValues(
                updateNodeId == nodeId ? updateParamId : '',
                _ids,
                _values);


            node.valid = true;
            node.updateNode();
        }
    }



    const nodeJson = [];
    nodes.forEach(n => nodeJson.push(n.toJson()));


    uiPostMessageToFigma({
        cmd:          'figUpdate',
        updateNodeId:  updateNodeId,
        updateParamId: updateParamId,
        nodeIds:       nodes.map(n => n.id),
        nodeJson:      nodeJson,
        objects:       [...objects]
    });
        

    graphView.update(nodes);
}



function uiSaveNodes(nodeIds)
{
    const nodeJson = [];

    for (const id of nodeIds)
    {
        const json = nodeFromId(id).toJson();

        if (settings.logRawSaving)
            console.log('%cSAVING\n' + json, 'background: #ddeeff');

        nodeJson.push(json);
    }


    uiQueueMessageToFigma({
        cmd:     'figSaveNodes',
        nodeIds:  nodeIds,
        nodeJson: nodeJson
    });
}



function uiRemoveSavedNodesAndConns(nodeIds)
{
    uiQueueMessageToFigma({
        cmd:    'figRemoveSavedNodesAndConns',
        nodeIds: nodeIds
    });
}



function uiRemoveConnsToNodes(nodeIds)
{
    uiQueueMessageToFigma({
        cmd: 'figRemoveConnsToNodes',
        nodeIds: nodeIds
    });
}



function uiRemoveAllSavedNodesAndConns()
{
    uiQueueMessageToFigma({
        cmd: 'figRemoveAllSavedNodesAndConns'
    });
}



function uiLogAllSavedNodesAndConns()
{
    uiQueueMessageToFigma({
        cmd:     'figLogAllSavedNodesAndConns',
        settings: settings
    });
}



function uiLogAllSavedNodes()
{
    uiQueueMessageToFigma({
        cmd:     'figLogAllSavedNodes',
        settings: settings
    });
}



function uiLogAllSavedConns()
{
    uiQueueMessageToFigma({
        cmd:     'figLogAllSavedConns',
        settings: settings
    });
}



function uiSaveConnection(outputNodeId, outputIndex, inputNodeId, inputIndex, connJson)
{
    uiQueueMessageToFigma({
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
    uiQueueMessageToFigma({
        cmd: 'figRemoveSavedConnection',
        name: outputNodeId + ' '
            + outputIndex  + ' '
            + inputNodeId  + ' '
            + inputIndex
    });
}



function uiRemoveSavedConnectionsToNodeId(nodeId)
{
    uiQueueMessageToFigma({
        cmd:   'figRemoveSavedConnectionsToNode',
        nodeId: nodeId
    });
}