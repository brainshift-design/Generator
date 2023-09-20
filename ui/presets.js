function loadPresetGraph(graphId)
{
    if (isEmpty(graph.pages))
        graph.createPage('');

    graph.clear();

    actionManager.do(new PasteNodesAction(getPresetGraph(graphId), false, false, true, Number.NaN, Number.NaN, nodes =>
    {
        actionManager.clear();
        graphView.selected = [];

        setTimeout(() => graphView.zoomToNodes(nodes), 500);
    }));
}



function getPresetGraph(graphId)
{
    switch (graphId)
    {
        case 'default':
            return '\
            {\
                "nodes":\
                [\
                {\
                    "type": "TEXT",\
                    "id": "text6",\
                    "name": "text",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "2",\
                    "x": "-128",\
                    "y": "1167",\
                    "z": "0",\
                    "width": "279",\
                    "height": "99.76926387125778",\
                    "params":\
                    [\
                        ["TEXT#", "value", "Now%20the%20ellipse%20has%20only%20a%20fill.%20To%20add%20more%20fills%2C%20strokes%2C%20effects%20etc.%20to%20the%20same%20object%2C%20use%20a%20Combine%20node%2C%20just%20like%20with%20Repeats.", "left"]\
                    ]\
                },\
                {\
                    "type": "TEXT",\
                    "id": "text5",\
                    "name": "text",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "3",\
                    "x": "276",\
                    "y": "1166",\
                    "z": "1",\
                    "width": "279.48463369156957",\
                    "height": "86.62185689145741",\
                    "params":\
                    [\
                        ["TEXT#", "value", "Random%20(or%20any%20node%20with%20...)%20can%20also%20be%20connected%20to%20a%20Repeat%2C%20which%20will%20then%20limit%20how%20often%20a%20new%20value%20is%20generated.", "left"]\
                    ]\
                },\
                {\
                    "type": "SEQ",\
                    "id": "sequence3",\
                    "name": "sequence",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "1",\
                    "x": "-439",\
                    "y": "373",\
                    "z": "2",\
                    "params":\
                    [\
                        ["NUM#", "end", "?,0"]\
                    ]\
                },\
                {\
                    "type": "ELPS",\
                    "id": "ellipse",\
                    "name": "ellipse",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "2",\
                    "x": "-58",\
                    "y": "143",\
                    "z": "3",\
                    "params":\
                    [\
                        ["NUM#", "inner", "42,0"]\
                    ]\
                },\
                {\
                    "type": "SEQ",\
                    "id": "sequence",\
                    "name": "sequence X",\
                    "renamed": "true",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "499",\
                    "y": "585",\
                    "z": "4",\
                    "params":\
                    [\
                        ["NUM#", "step", "107,0"],\
                        ["NUM#", "end", "?,0"]\
                    ]\
                },\
                {\
                    "type": "TEXT",\
                    "id": "text",\
                    "name": "text",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "4",\
                    "x": "682",\
                    "y": "1164",\
                    "z": "5",\
                    "width": "238.7424013988722",\
                    "height": "103",\
                    "params":\
                    [\
                        ["TEXT#", "value", "Combine%20nodes%20above%20are%20not%20necessary%2C%20but%20they%20allow%20other%20nodes%20with%20...%20to%20be%20controlled%20by%20a%20specific%20Repeat.", "left"]\
                    ]\
                },\
                {\
                    "type": "SEQ",\
                    "id": "sequence2",\
                    "name": "sequence Y",\
                    "renamed": "true",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "499",\
                    "y": "747",\
                    "z": "6",\
                    "params":\
                    [\
                        ["NUM#", "step", "115,0"],\
                        ["NUM#", "end", "?,0"]\
                    ]\
                },\
                {\
                    "type": "RAND",\
                    "id": "random",\
                    "name": "random",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "3",\
                    "x": "296",\
                    "y": "282",\
                    "z": "7",\
                    "params":\
                    [\
                        ["NUM#", "seed", "1234,0"],\
                        ["NUM#", "max", "100,0"]\
                    ]\
                },\
                {\
                    "type": "CMB",\
                    "id": "combine2",\
                    "name": "combine",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "4",\
                    "x": "772",\
                    "y": "781",\
                    "z": "8",\
                    "width": "120",\
                    "height": "38"\
                },\
                {\
                    "type": "SMATH",\
                    "id": "math",\
                    "name": "math",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "291",\
                    "y": "602",\
                    "z": "9",\
                    "params":\
                    [\
                        ["NUM#", "value", "107,0"],\
                        ["NUM#", "operand", "7,0"]\
                    ]\
                },\
                {\
                    "type": "SMATH",\
                    "id": "math2",\
                    "name": "math",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "294",\
                    "y": "761",\
                    "z": "10",\
                    "params":\
                    [\
                        ["NUM#", "value", "115,0"],\
                        ["NUM#", "operand", "15,0"]\
                    ]\
                },\
                {\
                    "type": "TEXT",\
                    "id": "text4",\
                    "name": "text",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "5",\
                    "x": "1043",\
                    "y": "1164",\
                    "z": "11",\
                    "width": "219",\
                    "height": "155.23373967021223",\
                    "params":\
                    [\
                        ["TEXT#", "value", "Double-clicking%20a%20node%20header%20makes%20it%20active%2C%20which%20will%20generate%20geometry%20on%20the%20canvas.%20Hold%20Shift%20to%20activate%20multiple%20nodes%20at%20once.%0A%0ADouble-click%20the%20background%20to%20deactivate%20all%20nodes.%20This%20can%20be%20used%20to%20stop%20a%20very%20slow%20loop.", "left"]\
                    ]\
                },\
                {\
                    "type": "MOVE",\
                    "id": "move",\
                    "name": "move",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "763",\
                    "y": "268",\
                    "z": "12",\
                    "params":\
                    [\
                        ["NUM#", "x", "428,0"],\
                        ["NUM#", "y", "460,0"]\
                    ]\
                },\
                {\
                    "type": "CMB",\
                    "id": "combine",\
                    "name": "combine",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "4",\
                    "x": "773",\
                    "y": "615",\
                    "z": "13",\
                    "width": "120",\
                    "height": "38"\
                },\
                {\
                    "type": "COL",\
                    "id": "color",\
                    "name": "color",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "-246",\
                    "y": "324",\
                    "z": "14",\
                    "prevSpace": "hsv",\
                    "params":\
                    [\
                        ["NUM#", "space", "2,0"],\
                        ["NUM#", "c1", "240,0"],\
                        ["NUM#", "c2", "85,0"],\
                        ["NUM#", "c3", "85.09803921568627,0"]\
                    ]\
                },\
                {\
                    "type": "PANEL",\
                    "id": "panel",\
                    "name": "loops",\
                    "renamed": "true",\
                    "enabled": "true",\
                    "highlight": "5",\
                    "x": "1027",\
                    "y": "518",\
                    "z": "15",\
                    "width": "248.84205555851295",\
                    "height": "365.71675486894105",\
                    "params":\
                    [\
                    ]\
                },\
                {\
                    "type": "REPT",\
                    "id": "repeat2",\
                    "name": "repeat X",\
                    "renamed": "true",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "1090",\
                    "y": "574",\
                    "z": "16",\
                    "params":\
                    [\
                        ["NUM#", "count", "5,0"]\
                    ]\
                },\
                {\
                    "type": "TEXT",\
                    "id": "text2",\
                    "name": "text",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "1",\
                    "x": "-481.797",\
                    "y": "1164",\
                    "z": "17",\
                    "width": "213.79652512691814",\
                    "height": "149",\
                    "params":\
                    [\
                        ["TEXT#", "value", "This%20sequence%20is%20not%20connected%20to%20a%20repeat%2C%20so%20each%20new%20circle%20gets%20a%20new%20value.%20%0A%0AConnect%20the%20sequence%20header%20to%20a%20%D0%A1ombine%20node%20on%20the%20right%20(highlighted%20in%20green)%20to%20lock%20color%20changes%20to%20rows%20or%20columns.", "left"]\
                    ]\
                },\
                {\
                    "type": "SCALE",\
                    "id": "scale",\
                    "name": "scale",\
                    "renamed": "false",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "479",\
                    "y": "145",\
                    "z": "18",\
                    "params":\
                    [\
                        ["NUM#", "scaleX", "21,0"],\
                        ["NUM#", "scaleY", "21,0"],\
                        ["NUM#", "affectSpace", "0,0"]\
                    ]\
                },\
                {\
                    "type": "REPT",\
                    "id": "repeat",\
                    "name": "repeat Y",\
                    "renamed": "true",\
                    "enabled": "true",\
                    "highlight": "0",\
                    "x": "1090",\
                    "y": "744",\
                    "z": "19",\
                    "active": "true",\
                    "params":\
                    [\
                        ["NUM#", "count", "5,0"]\
                    ]\
                }\
                ],\
                "connections":\
                [\
                {\
                    "outputNodeId": "color",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "ellipse",\
                    "inputId": "props",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "math",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "sequence",\
                    "inputId": "step",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "math2",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "sequence2",\
                    "inputId": "step",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "sequence2",\
                    "outputId": "h0",\
                    "outputOrder": "1",\
                    "inputNodeId": "combine2",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "ellipse",\
                    "outputId": "width",\
                    "outputOrder": "0",\
                    "inputNodeId": "math",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "ellipse",\
                    "outputId": "height",\
                    "outputOrder": "0",\
                    "inputNodeId": "math2",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "scale",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "move",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "sequence",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "move",\
                    "inputId": "x",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "sequence2",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "move",\
                    "inputId": "y",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "sequence",\
                    "outputId": "h0",\
                    "outputOrder": "1",\
                    "inputNodeId": "combine",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "sequence3",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "color",\
                    "inputId": "c1",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "move",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "repeat2",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "combine",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "repeat2",\
                    "inputId": "loop",\
                    "list": "true"\
                },\
                {\
                    "outputNodeId": "ellipse",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "scale",\
                    "inputId": "h0",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "random",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "scale",\
                    "inputId": "scaleX",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "random",\
                    "outputId": "h0",\
                    "outputOrder": "1",\
                    "inputNodeId": "scale",\
                    "inputId": "scaleY",\
                    "list": "false"\
                },\
                {\
                    "outputNodeId": "repeat2",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "repeat",\
                    "inputId": "h0",\
                    "list": "true"\
                },\
                {\
                    "outputNodeId": "combine2",\
                    "outputId": "h0",\
                    "outputOrder": "0",\
                    "inputNodeId": "repeat",\
                    "inputId": "loop",\
                    "list": "true"\
                }\
                ]\
            }';
    }
}