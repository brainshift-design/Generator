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



function uiCreateNode(nodeType, creatingButton, createdId = -1, updateUi = true, options = {})
{
    let node = createNode(nodeType, creatingButton, createdId, options);


    const selNode = graph.nodes.find(n => n.selected);

    const autoConnect = 
           settings.autoConnectNewNodes
        && graphView.selectedNodes.length > 0
        && canAutoConnectNode(node)
        && selNode
        && selNode.headerOutputs.length > 0
        && node.canAutoConnectFrom(selNode.headerOutputs[0]);


    graph.addNode(node, !autoConnect);
    
    if (autoConnect)
        autoConnectNode(node, !!options.insert);
    

    if (updateUi)
    {
        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [node];
    }


    return node;
}



function canAutoConnectNode(node)
{
    const selNode = graph.nodes.find(n => n.selected);
    const inputs  = node.inputs.filter(i => i.canConnectFrom(selNode.outputs[0]));

    return selNode
        && selNode.outputs.length > 0
        && inputs.length > 0;
}



function autoConnectNode(node, insert)
{
    const selNode = graph.nodes.find(n => n.selected);
    const inputs  = node.inputs.filter(i => i.canConnectFrom(selNode.outputs[0]));

    console.assert(
           selNode
        && selNode.outputs.length > 0
        && inputs.length > 0,
        'cannot auto-connect node');


    let connectedInputs = [];
    
    if (insert)
    {
        connectedInputs = [...selNode.outputs[0].connectedInputs];
        connectedInputs.forEach(i => actionManager.do(new DisconnectAction(selNode.outputs[0], i, {noActivate: true}), true));
    }


    actionManager.do(new ConnectAction(selNode.outputs[0], inputs[0]), true);

    
    if (insert)
        connectedInputs.forEach(i => actionManager.do(new ConnectAction(node.outputs[0], i, {noActivate: true}), true));


    graphView.autoPlaceNewNode(selNode.outputs[0], inputs[0]);
}



function uiDeleteNodes(nodeIds)
{
    nodeIds.forEach(id => nodeFromId(id).makePassive());

    graph.deleteNodes(nodeIds);

    uiRemoveSavedNodesAndConns(nodeIds);
    uiDeleteObjects(nodeIds);
}



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



function uiVariableConnect(outputNode, outputId, inputNode, inputId, outputOrder = -1)
{
    //console.log('uiVariableConnect()');

    const output = outputNode.outputFromId(outputId);
    const  input =  inputNode. inputFromId(inputId);

    if (    inputNode.variableInputs
        && !input.param)
    {
        const conn = uiConnect(
            output,
            lastOf(inputNode.headerInputs),
            inputId,
            outputOrder);


        if (outputOrder > -1)
            conn.outputOrder = outputOrder;

        uiUpdateSavedConnectionsToNodeId(inputNode.id);

        return conn;
    }
    else
        return uiConnect(output, input, '', outputOrder);
}



function uiConnect(output, input, inputId = '', outputOrder = -1)
{
    const conn = graph.connect(output, input, inputId, outputOrder);

    // uiSaveConnection(
    //     output.node.id,
    //     output.id,
    //     input.node.id,
    //     input.id,
    //     conn.toJson());

    return conn;
}



// function uiVariableConnectByIndex(outputNode, outputIndex, inputNode, inputIndex)
// {
//     //console.log('uiVariableConnect()');

//     if (inputNode.variableInputs)
//     {
//         const input = lastOf(inputNode.inputs);

//         const conn = uiConnectByIndex(
//             outputNode.outputs[outputIndex],
//             input,
//             inputIndex);

//         uiUpdateSavedConnectionsToNodeId(inputNode.id);

//         return conn;
//     }
//     else
//     {
//         return uiConnect(
//             outputNode.outputs[outputIndex],
//              inputNode. inputs[ inputIndex]);
//     }
// }



// function uiConnectByIndex(output, input, inputIndex = -1)
// {
//     const conn = graph.connect(output, input, inputIndex);

//     uiSaveConnection(
//         output.node.id,
//         output.index,
//         input.node.id,
//         input.index,
//         conn.toJson());

//     return conn;
// }



function uiDisconnect(input)
{
    //console.log('uiDisconnect()');
    
    const node = input.node;

    graph.disconnect(input);

    //node.updateNode();

    if (node.variableInputs)
        uiUpdateSavedConnectionsToNodeId(node.id);
}



function uiDisconnectAny(input)
{
    //console.log('uiDisconnect()');
    
    const node = input.node;

    uiDeleteSavedConnectionsToNodeId(input.node.id);

    graph.disconnect(input);

    //node.updateNode();
}



function uiUpdateSavedConnectionsToNodeId(nodeId)
{
    const node = nodeFromId(nodeId);


    uiDeleteSavedConnectionsToNodeId(node.id);

    for (const _input of node.inputs.filter(i => i.connected))
    {
        uiSaveConnection(
            _input.connectedOutput.node.id,
            _input.connectedOutput.id,
            _input.connection.outputOrder,
             node.id,
            _input.id,
            _input.connection.toJson());
    }
}



function uiMakeNodeActive(node)
{
    uiMakeNodeLeftPassive (node);
    uiMakeNodeRightPassive(node);

    node.makeActive();
    //node.updateNode();

    //uiSaveNodes([node.id]);

    //pushUpdate([node]);
}



function uiMakeNodesActive(nodes)
{
    for (const node of nodes)
    {
        uiMakeNodePassive(node);
        uiMakeNodeLeftPassive (node);
        uiMakeNodeRightPassive(node);
    }

    for (const node of nodes)
    {
        pushUnique(graphView.activeNodes, node);
        node._active = true;
        //node.updateNode();
    }

    //uiSaveNodes(nodes.map(n => n.id));

    //pushUpdate(nodes);
}



function uiMakeNodePassive(node)
{
    if (!node.active) return;

    node.makePassive();
    //node.updateNode();

    //uiSaveNodes([node.id]);
}



function uiMakeNodeLeftPassive(node, fromNode = null)
{
    //console.log('uiMakeNodeLeftPassive() node =', node);
    for (const input of node.headerInputs)
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
    for (const output of node.headerOutputs)
    {
        for (const connInput of output.connectedInputs.filter(i => !i.param))
        {
            uiMakeNodePassive(connInput.node);
            uiMakeNodeRightPassive(connInput.node, node);
        }
    }

    uiMakeNodeLeftPassive(node, fromNode);//
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

    // console.log(copiedJson);

    return copiedJson;
}



function uiPasteNodes(nodesJson, pasteConnected, x, y)
{
    //console.log(nodesJson);

    graphView.loadingNodes = true;


    pasteOffset[0] += pasteOffsetDelta[0];
    pasteOffset[1] += pasteOffsetDelta[1];


    const data = JSON.parse(nodesJson);


    if (   !isNaN(x) 
        && !isNaN(y)) // position new nodes
    {
        const positions = data.nodes.map(n => [parseFloat(n.x), parseFloat(n.y)]);

        for (let i = 0; i < data.nodes.length; i++)
        {
            data.nodes[i].x = x + positions[i][0] - positions[0][0] + 5 / graphView.zoom;
            data.nodes[i].y = y + positions[i][1] - positions[0][1];
        }
    }
    else // offset new nodes (must be done before loading)
    {
        for (let i = 0; i < data.nodes.length; i++)
        {
            data.nodes[i].x = parseFloat(data.nodes[i].x) + pasteOffset[0] / graphView.zoom;
            data.nodes[i].y = parseFloat(data.nodes[i].y) + pasteOffset[1] / graphView.zoom;
        }
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
        parseConnectionsAndConnect(data, pasteConnected);
    }
    else
        data.connections = []; // return an empty array if no data was loaded


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


    return [nodes, data.connections];
}



function correctNodeNamesInConnections(data)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];

        let outputNode = data.nodes.find(n => n.id == _conn.outputNodeId);
        if (outputNode) data.connections[i].outputNodeId = outputNode.newId;

        const inputNode = data.nodes.find(n => n.id == _conn.inputNodeId);

        data.connections[i].inputNodeId = inputNode.newId;
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

    [...graphView.selectedNodes,     
     ...graphView._prevSelectedNodes,
     ...graphView.lastSelectedNodes]
        .forEach(n => n.updateNode());
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



function findConnectedClusters(nodes)
{
    let clusters = nodes.map(n => [n]);
    let first    = 0;


    while (true)
    {
        let moved = false;
        
        for (let i = clusters.length-1; i > first; i--)
        {
            if (firstOf(clusters[i]).immediatelyFollows(lastOf(clusters[i-1]), true))
            {
                clusters[i-1].push(...clusters[i]);
                removeAt(clusters, i);
                moved = true;
            }
            else if (lastOf(clusters[i-1]).immediatelyFollows(firstOf(clusters[i]), true))
            {
                clusters[first] = [...clusters[i], ...clusters[i-1]];
                removeAt(clusters, i);
                moved = true;
            }
        }

        first++;

        if (  !moved
            || first >= clusters.length)
            break;
    }


    return clusters;
}



function uiUpdateValuesAndObjects(updateNodeId, updateParamId, values, objects)
{
    if (settings.logRawValues)  
        console.log('raw values = ', values);

    if (settings.logValueUpdates)  
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
                    case       LIST_VALUE: value = parseListValue     (values[i++])[0]; break;
                    case     NUMBER_VALUE: value = parseNumberValue   (values[i++])[0]; break;
                    case      COLOR_VALUE: value = parseColorValue    (values[i++])[0]; break;
                    case       FILL_VALUE: value = parseFillValue     (values[i++])[0]; break;
                    case     STROKE_VALUE: value = parseStrokeValue   (values[i++])[0]; break;
                    case COLOR_STOP_VALUE: value = parseColorStopValue(values[i++])[0]; break;
                    case  RECTANGLE_VALUE: value = parseRectangleValue(values[i++])[0]; break;
                    case       LINE_VALUE: value = parseLineValue     (values[i++])[0]; break;
                    case    ELLIPSE_VALUE: value = parseEllipseValue  (values[i++])[0]; break;
                    case    POLYGON_VALUE: value = parsePolygonValue  (values[i++])[0]; break;
                    case       STAR_VALUE: value = parseStarValue     (values[i++])[0]; break;
                    
                    default: console.assert(false, 'unknown type \'' + type + '\'');
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


    if (objects.length > 0)
    {
        if (settings.logObjectUpdates)
            logObjectUpdates([...objects]);

        uiPostMessageToFigma({
            cmd:          'figUpdateObjects',
            updateNodeId:  updateNodeId,
            updateParamId: updateParamId,
            nodeIds:       nodes.map(n => n.id),
            objects:       [...objects]});
    }
        
    
    uiSaveNodes(nodes.map(n => n.id));
    
    
    graphView.update(nodes);
    graphView.updateScrollWithBounds();
}



function uiToggleDisableNodes(nodes)
{
    const update = [];

    nodes.forEach(n => 
    {
        n.enabled = !n.enabled;

        if (!n.enabled)
            pushUnique(update, n.id);
    });


    update.forEach(_id => uiDeleteObjects([getActiveRightFromNode(nodeFromId(_id)).id]));


    uiSaveNodes(nodes.map(n => n.id));
    pushUpdate(nodes);
}



function uiSaveNodes(nodeIds)
{
    const nodeJson = [];

    for (const id of nodeIds)
        nodeJson.push(nodeFromId(id).toJson());

    if (nodeJson.length > 0)
    {
        if (settings.logRawSaving)
            logSaveNodes(nodeJson.join('\n'));

        uiQueueMessageToFigma({
            cmd:     'figSaveNodes',
            nodeIds:  nodeIds,
            nodeJson: nodeJson});
    }
}



function uiSaveConn(conn)
{
    if (settings.logRawSaving)
        console.log('%cSAVING CONNECTION\n' + conn.toJson(), 'color: black; background: #ddeeff;');

    uiQueueMessageToFigma({
        cmd: 'figSaveConnection',
        key:  getConnKey(conn),//getConnectionKey(
                //   conn.output.nodeId, conn.output.id, conn.outputOrder,
                //   conn.input .nodeId, conn.input .id),
        json: conn.toJson()
    });
}



function uiSaveConnection(outputNodeId, outputId, outputOrder, inputNodeId, inputId, connJson)
{
    if (settings.logRawSaving)
        console.log('%cSAVING CONNECTION\n' + connJson, 'color: black; background: #ddeeff;');

    uiQueueMessageToFigma({
        cmd: 'figSaveConnection',
        key:  getConnectionKey(
                  outputNodeId, outputId, outputOrder,
                  inputNodeId, inputId),
        json: connJson
    });
}



function uiSaveConnections(conns)
{
    if (settings.logRawSaving)
        logSaveConnections(conns);


    const keys     = [];
    const connJson = [];

    for (const conn of conns)
    {
        keys.push(getConnKey(conn));
        connJson.push(conn.toJson());
    }


    uiQueueMessageToFigma({
        cmd: 'figSaveConnections',
        keys: JSON.stringify(keys),
        json: JSON.stringify(connJson)
    });
}



function uiUpdateSavedConnections(curKeys, newKeys, conns)
{
    if (settings.logRawSaving)
        logUpdateSavedConnections(conns);


    const connJson = [];

    for (const conn of conns)
        connJson.push(conn.toJson());


    uiQueueMessageToFigma({
        cmd:    'figUpdateSavedConnections',
        curKeys: JSON.stringify(curKeys),
        newKeys: JSON.stringify(newKeys),
        json:    JSON.stringify(connJson)
    });
}



function uiDeleteSavedConn(conn)
{
    if (settings.logRawSaving)
    {
        console.log(
             '%cDELETING SAVED CONNECTION ' 
            + getConnString(conn, true),
            'color: black; background: #ddeeff;');
    }


    uiQueueMessageToFigma({
        cmd: 'figDeleteSavedConnection',
        key:  getConnKey(conn)
    });
}



function uiDeleteSavedConnection(key, outputNodeId, outputId, outputOrder, inputNodeId, inputId, list)
{
    if (settings.logRawSaving)
    {
        console.log(
             '%cDELETING SAVED CONNECTION ' 
            + getConnectionString(
                outputNodeId,
                outputId,
                outputOrder,
                inputNodeId,
                inputId,
                list,
                true), 
            'color: black; background: #ddeeff;');
    }


    uiQueueMessageToFigma({
        cmd: 'figDeleteSavedConnection',
        key:  key
    });
}



function uiRemoveAllSavedConnections()
{
    uiQueueMessageToFigma({
        cmd: 'figRemoveAllSavedConnections'
    });
}



function uiDeleteSavedConnectionsToNodeId(nodeId)
{
    uiQueueMessageToFigma({
        cmd:   'figDeleteSavedConnectionsToNode',
        nodeId: nodeId
    });
}



function uiDeleteSavedConnectionsFromNodeId(nodeId)
{
    uiQueueMessageToFigma({
        cmd:   'figDeleteSavedConnectionsFromNode',
        nodeId: nodeId
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
    const nodes = nodeIds.map(id => nodeFromId(id));

    for (const node of nodes)
        for (const input of node.inputs)
            if (input.connected)
                uiDisconnectAny(input);

                
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