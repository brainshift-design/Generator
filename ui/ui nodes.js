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



function canAutoConnectNode(graph, node)
{
    const selNode = graph.nodes.find(n => n.selected);

    if (  !selNode
        || isEmpty(selNode.headerOutputs))
        return false;

    const inputs = node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));

    return !isEmpty(inputs)
         && node.canAutoConnectFrom(selNode.headerOutputs[0]);
}



function uiDeleteNodes(graph, nodeIds)
{
    nodeIds.forEach(id => graph.nodeFromId(id).makePassive());

    graph.deleteNodes(nodeIds);

    uiRemoveSavedNodesAndConns(nodeIds);
    uiDeleteObjectsAndStyles(nodeIds, true);
}



function uiDeleteObjectsAndStyles(nodeIds, mustDelete = true)
{
    uiQueueMessageToFigma({
        cmd:       'figDeleteObjectsAndStyles',
        nodeIds:    nodeIds,
        mustDelete: mustDelete
    });
}



function uiCommitFigmaUndo()
{
    uiQueueMessageToFigma({cmd: 'figCommitUndo'});
}



function uiVariableConnect(outputNode, outputId, inputNode, inputId, outputOrder = -1)
{
    //console.log('uiVariableConnect()');

    const output = outputNode.outputFromId(outputId);
    return uiVariableConnectFromOutput(output, inputNode, inputId, outputOrder);
}



function uiVariableConnectFromOutput(output, inputNode, inputId, outputOrder = -1)
{
    //console.log('uiVariableConnectFromOutput()');

    const input = inputNode.inputFromId( inputId);


    if (    inputNode.variableInputs
        && (!input || !input.param))
    {
        const conn = uiConnect(
            output,
            inputNode.headerInputs.at(-1),
            inputId,
            outputOrder);


        if (outputOrder > -1)
            conn.outputOrder = outputOrder;

        uiUpdateSavedConnectionsToNodeId(inputNode.graph, inputNode.id, true);

        return conn;
    }
    else
        return uiConnect(output, input, '', outputOrder);
}



function uiConnect(output, input, inputId = '', outputOrder = -1)
{
    return output.node.graph.connect(output, input, inputId, outputOrder);
}



function uiDisconnect(input, saveOld = true)
{
    //console.log('uiDisconnect()');
    
    const node = input.node;

    node.graph.disconnect(input);

    if (node.variableInputs)
        uiUpdateSavedConnectionsToNodeId(node.graph, node.id, saveOld);
}



function uiDisconnectAny(input)
{
    //console.log('uiDisconnect()');
    
    uiDeleteSavedConnectionsToNodeId(input.node.id);

    input.node.graph.disconnect(input);
}



function uiUpdateSavedConnectionsToNodeId(graph, nodeId, saveOld)
{
    const node = graph.nodeFromId(nodeId);


    uiDeleteSavedConnectionsToNodeId(node.id);

    if (saveOld)
    {
        for (const _input of node.inputs.filter(i => i.connected))
        {
            uiSaveConnection(
                _input.connectedOutput.node.id,
                _input.connectedOutput.id,
                _input.connection.outputOrder,
                 node .id,
                _input.id,
                _input.connection.toJson());
        }
    }
}



function makeSelectedNodesActive()
{
    if (graphView.selectedNodes.find(n => !n.active))
        actionManager.do(new MakeActiveNodesAction(mainGraph, graphView.selectedNodes.map(n => n.id)));
}



function uiMakeNodeActive(node)
{
    uiMakeNodeLeftPassive (node);
    uiMakeNodeRightPassive(node);

    node.makeActive();
}    



function uiMakeNodesActive(nodes)
{
    for (const node of nodes)
    {
        if (node.active) continue;

        uiMakeNodePassive(node);
        uiMakeNodeLeftPassive (node);
        uiMakeNodeRightPassive(node);
    }

    for (const node of nodes)
    {
        if (node.active) continue;
        
        pushUnique(node.graph.view.activeNodes, node);
        node._active = true;
    }
}



function uiMakeNodePassive(node)
{
    if (node.active)
        node.makePassive();
}



function uiMakeNodeLeftPassive(node, fromNode = null)
{
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

    //uiMakeNodeLeftPassive(node, fromNode);//
}



function uiShowParamValue(graph, nodeId, paramName, value)
{
    const node = graph.nodeFromId(nodeId);

    if (!!node) // this is for deleted nodes which still exist
    {           // in genGraph but no longer in mainGraph
        const param = node.params.find(p => p.name == paramName);
        param.controls[0].setValue(value, false);
    }
}



function uiCopyNodes(graph, nodeIds)
{
    const nodes      = graph.nodes.filter(n => nodeIds.includes(n.id));
    const copiedJson = nodesToJson(nodes, true, false);

    // console.log(copiedJson);

    return copiedJson;
}



function uiPasteNodes(graph, nodesJson, pasteConnected, x, y, updateNodes)
{
    //console.log(nodesJson);

    graph.view.pastingNodes = true;


    pasteOffset.x += pasteOffsetDelta.x;
    pasteOffset.y += pasteOffsetDelta.y;


    const data = JSON.parse(nodesJson);


    if (   !isNaN(x) 
        && !isNaN(y)) // position new nodes
    {
        const positions = data.nodes.map(n => point(parseFloat(n.x), parseFloat(n.y)));

        for (let i = 0; i < data.nodes.length; i++)
        {
            data.nodes[i].x = x + positions[i].x - positions[0].x + 5 / graph.view.zoom;
            data.nodes[i].y = y + positions[i].y - positions[0].y;
        }
    }
    else // offset new nodes (must be done before loading)
    {
        for (let i = 0; i < data.nodes.length; i++)
        {
            data.nodes[i].x = parseFloat(data.nodes[i].x) + pasteOffset.x;
            data.nodes[i].y = parseFloat(data.nodes[i].y) + pasteOffset.y;
        }
    }


    const nodes = loadNodes(data, true);
    nodes.forEach(n => n.div.style.display ='none');

    
    // get the new names of the nodes after they've been added
    for (let i = 0; i < nodes.length; i++)
    {
        graph.addNode(nodes[i], false);
        data.nodes[i].newId = nodes[i].id;
    }

    if (data.connections)
    {
        correctNodeNamesInConnections(data);
        parseConnectionsAndConnect(graph, data, pasteConnected);
    }
    else
        data.connections = []; // return an empty array if no data was loaded


    graph.view.selectedNodes = nodes;


    finishLoadingNodes(data.nodes, nodes, updateNodes, true);


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
    [...graphView.selectedNodes,     
     ...graphView._prevSelectedNodes,
     ...graphView.lastSelectedNodes]
        .forEach(n => n.updateNode());
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
            if (clusters[i].at(0).immediatelyFollows(clusters[i-1].at(-1), true))
            {
                clusters[i-1].push(...clusters[i]);
                removeAt(clusters, i);
                moved = true;
            }
            else if (clusters[i-1].at(-1).immediatelyFollows(clusters[i].at(0)), true)
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



function uiUpdateValuesAndObjects(requestId, actionId, updateNodeId, updateParamId, values, objects, styles, updatedNodes, totalNodes, isLastChunk)
{
    if (requestId < lastRequestedId) 
        return;
    
    lastRequestedId = -1;

        
    if (dataModeTimeout)
    {
        clearTimeout(dataModeTimeout);
        dataModeTimeout = null;
    }


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

        const node   = mainGraph.nodeFromId(nodeId);


        if (node)
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
                    case      LIST_VALUE:  value = parseListValue     (values[i++])[0];  break;
                    case    NUMBER_VALUE:  value = parseNumberValue   (values[i++])[0];  break;
                    case     COLOR_VALUE:  value = parseColorValue    (values[i++])[0];  break;
                    case      FILL_VALUE:  value = parseFillValue     (values[i++])[0];  break;
                    case    STROKE_VALUE:  value = parseStrokeValue   (values[i++])[0];  break;
                    case RECTANGLE_VALUE:  value = parseRectangleValue(values[i++])[0];  break;
                    case      LINE_VALUE:  value = parseLineValue     (values[i++])[0];  break;
                    case   ELLIPSE_VALUE:  value = parseEllipseValue  (values[i++])[0];  break;
                    case   POLYGON_VALUE:  value = parsePolygonValue  (values[i++])[0];  break;
                    case      STAR_VALUE:  value = parseStarValue     (values[i++])[0];  break;
                    
                    default: console.assert(false, 'unknown type \'' + type + '\'');
                }

                if (value.nodeId)
                    value.nodeId = nodeId; 
    
                _values.push(value);
            }


            if (node)
            {
                node.updateValues( 
                    requestId,
                    actionId,
                    updateNodeId == nodeId ? updateParamId : '',
                    _ids,
                    _values);

                node.valid = true;
            }
        }
    }


    if (   !isEmpty(objects)
        || !isEmpty(styles))
    {
        if (settings.logObjectUpdates) logObjectUpdates([...objects]);
        if (settings.logStyleUpdates)  logStyleUpdates([...styles]);

        uiQueueMessageToFigma({
            cmd:          'figUpdateObjectsAndStyles',
            updateNodeId:  updateNodeId,
            updateParamId: updateParamId,
            nodeIds:       nodes.map(n => n.id),
            objects:       [...objects],
            styles:        [...styles]});
    }


    if (!graphView.loadingNodes)
        uiSaveNodes(mainGraph, nodes.map(n => n.id));


    for (const node of nodes)
    {
        if (   graphView.creatingNodes
            || graphView.loadingNodes
            || graphView.pastingNodes
            || graphView.restoringNodes)
            node.div.style.display = 'block';

        node.updateMeasureData();
        node.updateNode();
    }


    graphView.update(nodes);
    graphView.updateScrollWithBounds();


    if (graphView.loadingNodes)
        setLoadingProgress((0.7 + 0.3 * updatedNodes / totalNodes) / 0.7)


    if (isLastChunk)
    {
        if (graphView.loadingNodes)
        {
            for (const node of mainGraph.nodes.filter(n => n.type == NODE_GROUP))
            {
                node.updateProxyControls();
                node.updateProxyWires();
            }

            uiSaveNodes(mainGraph, mainGraph.nodes.map(n => n.id));
        }

            
        graphView.creatingNodes      = false;
        graphView.pastingNodes       = false;
        graphView.loadingNodes       = false;
        graphView.restoringNodes     = false;

        loadingOverlay.style.display = 'none'; // for loading
    }
}



function uiToggleDisableNodes(nodes)
{
    nodes.forEach(n => { n.enabled = !n.enabled; });
}



function uiSaveNodes(graph, nodeIds)
{
    const nodeJson = [];

    for (const id of nodeIds)
        nodeJson.push(graph.nodeFromId(id).toJson());

    if (!isEmpty(nodeJson))
    {
        if (settings.logRawSaveNodes)
            logSaveNodes(nodeJson.join('\n'));

        uiQueueMessageToFigma({
            cmd:     'figSaveNodes',
            nodeIds:  nodeIds,
            nodeJson: nodeJson});
    }
}



function uiSaveConn(conn)
{
    if (settings.logRawSaveConnections)
        console.log('%cSAVING CONN\n' + conn.toJson(), 'color: black; background: #ddffee;');

    uiQueueMessageToFigma({
        cmd: 'figSaveConnection',
        key:  getConnKey(conn),
        json: conn.toJson()
    });
}



function uiSaveConnection(outputNodeId, outputId, outputOrder, inputNodeId, inputId, connJson)
{
    if (settings.logRawSaveConnections)
        console.log('%cSAVING CONNECTION\n' + connJson, 'color: black; background: #ddffee;');

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
    if (settings.logRawSaveConnections)
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
    if (settings.logRawSaveConnections)
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
    if (settings.logRawSaveConnections)
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
    if (settings.logRawSaveConnections)
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



function uiRemoveConnsToNodes(graph, nodeIds)
{
    const nodes = nodeIds.map(id => graph.nodeFromId(id));

    for (const node of nodes)
        for (const input of node.inputs)
            if (input.connected)
                uiDisconnectAny(input);

                
    uiQueueMessageToFigma({
        cmd:    'figRemoveConnsToNodes',
        nodeIds: nodeIds
    });
}



function uiRemoveAllSavedNodesAndConns()
{
    uiQueueMessageToFigma({
        cmd: 'figRemoveAllSavedNodesAndConns'
    });
}



function uiRemovePluginDataFromAllLocalStyles()
{
    uiQueueMessageToFigma({
        cmd: 'figRemovePluginDataFromAllLocalStyles'
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



function uiTriggerUndo()
{
    uiQueueMessageToFigma({
        cmd: 'figTriggerUndo'
    });
}



function uiUpdateViewportRect()
{
    uiQueueMessageToFigma({
        cmd: 'figUpdateViewportRect'
    });
}

