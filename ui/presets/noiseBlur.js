const presetNoiseBlur = '\
{\
    "generatorVersion": "381",\
    "nodes":\
    [\
        {\
        "type": "RAND",\
        "created": "1710582937545",\
        "updated": "1710622358283",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15866",\
        "y": "9743",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "seed", "5360,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "120,0"]\
        ]\
        },\
        {\
        "type": "APPLY",\
        "created": "1710578895426",\
        "updated": "1710578921956",\
        "id": "apply",\
        "name": "apply",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17419",\
        "y": "8874",\
        "z": "1",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1710578538919",\
        "updated": "1710578673016",\
        "id": "iterate",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16221",\
        "y": "8316",\
        "z": "2"\
        },\
        {\
        "type": "COL",\
        "created": "1710578518660",\
        "updated": "1710578646118",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15721",\
        "y": "8207",\
        "z": "3",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "BLEND",\
        "created": "1710578874782",\
        "updated": "1710578921956",\
        "id": "blend",\
        "name": "blend",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17209",\
        "y": "8960",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "blend", "7,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710578067644",\
        "updated": "1710585515581",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16968",\
        "y": "8869",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "ELPS",\
        "created": "1710578044768",\
        "updated": "1710586419147",\
        "id": "ellipse",\
        "name": "ellipse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16319",\
        "y": "8582",\
        "z": "6",\
        "innerAbsolute": "false",\
        "sweepInDegrees": "false",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "width", "9,0"],\
                ["NUM#", "height", "104,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1710578409599",\
        "updated": "1710578911952",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17128",\
        "y": "8869",\
        "z": "7"\
        },\
        {\
        "type": "ROT",\
        "created": "1710578066468",\
        "updated": "1710581069136",\
        "id": "rotate",\
        "name": "rotate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16771",\
        "y": "8581",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "angle", "356.4,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710578416608",\
        "updated": "1710622651003",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17864",\
        "y": "9105",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "count", "3,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "WAVE",\
        "created": "1710578244600",\
        "updated": "1710578247903",\
        "id": "wave",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15728",\
        "y": "9094",\
        "z": "10",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "amplitude", "35,0"],\
                ["NUM#", "frequency", "3,0"],\
                ["NUM#", "offset", "75,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1710578070821",\
        "updated": "1710581069136",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16539",\
        "y": "8904",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1710578413319",\
        "updated": "1710578911952",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17647",\
        "y": "8875",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "y", "10,0"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1710578471143",\
        "updated": "1710578473421",\
        "id": "sequence",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17393",\
        "y": "9138",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "add", "5,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710578495405",\
        "updated": "1710586529428",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17682.1",\
        "y": "9190.17",\
        "z": "14",\
        "width": "120",\
        "height": "90"\
        },\
        {\
        "type": "REPT",\
        "created": "1710582945293",\
        "updated": "1710582945313",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16026",\
        "y": "9744",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "count", "8,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1710582960678",\
        "updated": "1710582960685",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16204",\
        "y": "9825",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "REVLST",\
        "created": "1710578638806",\
        "updated": "1710578658392",\
        "id": "reverse",\
        "name": "reverse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16057",\
        "y": "8319",\
        "z": "17"\
        },\
        {\
        "type": "COL",\
        "created": "1710578532707",\
        "updated": "1710578642117",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15721",\
        "y": "8432",\
        "z": "18",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "255,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1710578064870",\
        "updated": "1710578106885",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16479",\
        "y": "8582",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "y", "265,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710582966837",\
        "updated": "1710585707490",\
        "id": "combine5",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16203.1",\
        "y": "9759.72",\
        "z": "20",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "COL",\
        "created": "1710578526423",\
        "updated": "1710578643284",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15717",\
        "y": "8314",\
        "z": "21",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710578636767",\
        "updated": "1710578636772",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15868.2",\
        "y": "8307.64",\
        "z": "22",\
        "width": "144.66972348652436",\
        "height": "64"\
        },\
        {\
        "type": "CMB",\
        "created": "1710578204096",\
        "updated": "1710578670044",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16098.8",\
        "y": "8915.63",\
        "z": "23",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "LBLR",\
        "created": "1710578200856",\
        "updated": "1710586589789",\
        "id": "layerBlur",\
        "name": "layer%20blur",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15939",\
        "y": "8979",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "radius", "34.69002688775205,10"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1710581053901",\
        "updated": "1710581479363",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "false",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16644",\
        "y": "8742",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "max", "360,0"],\
                ["NUM#", "spread", "-50,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1710585729052",\
        "updated": "1710586245053",\
        "id": "cache2",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16028",\
        "y": "9886",\
        "z": "26"\
        },\
        {\
        "type": "CMB",\
        "created": "1710578281901",\
        "updated": "1710586548575",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16755",\
        "y": "9078.01",\
        "z": "27",\
        "width": "120",\
        "height": "77"\
        },\
        {\
        "type": "FILL",\
        "created": "1710578667017",\
        "updated": "1710578673016",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15942",\
        "y": "8816",\
        "z": "28",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 0,0 0,0"]\
        ]\
        },\
        {\
        "type": "LERP",\
        "created": "1710582980355",\
        "updated": "1710586065269",\
        "id": "inter",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16418",\
        "y": "9600",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"],\
                ["NUM#", "degree", "3,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1710586062569",\
        "updated": "1710586069526",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16412",\
        "y": "9719",\
        "z": "30"\
        },\
        {\
        "type": "RAND",\
        "created": "1710582937545",\
        "updated": "1710622358291",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15869",\
        "y": "9443",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "seed", "9831,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "2,0"],\
                ["NUM#", "max", "12,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1710582945293",\
        "updated": "1710582945313",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16029",\
        "y": "9444",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "count", "8,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1710582960678",\
        "updated": "1710582960685",\
        "id": "select2",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16207",\
        "y": "9525",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1710582966837",\
        "updated": "1710585707490",\
        "id": "combine6",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16205.7",\
        "y": "9460.28",\
        "z": "34",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CACHE",\
        "created": "1710585729052",\
        "updated": "1710586510206",\
        "id": "cache3",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16031",\
        "y": "9586",\
        "z": "35"\
        },\
        {\
        "type": "LERP",\
        "created": "1710582980355",\
        "updated": "1710586419147",\
        "id": "inter2",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16421",\
        "y": "9300",\
        "z": "36",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"],\
                ["NUM#", "degree", "3,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1710586062569",\
        "updated": "1710586548575",\
        "id": "range3",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16415",\
        "y": "9419",\
        "z": "37"\
        },\
        {\
        "type": "FRM",\
        "created": "1710622460968",\
        "updated": "1710678652289",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18200",\
        "y": "9079",\
        "z": "38",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-490,0"],\
                ["NUM#", "y", "-453,0"],\
                ["NUM#", "width", "965,0"],\
                ["NUM#", "height", "914,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1710622554298",\
        "updated": "1710622566632",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "18052",\
        "y": "9291",\
        "z": "39",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1710578898996",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "apply",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578921955",\
        "outputNodeId": "blend",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "apply",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1710578646117",\
        "outputNodeId": "reverse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578067650",\
        "outputNodeId": "rotate",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710578286548",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1710586419146",\
        "outputNodeId": "inter2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1710586052238",\
        "outputNodeId": "inter",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1710578208110",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ellipse",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1710578409600",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578066473",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710581069136",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rotate",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1710578416617",\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578499112",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1710578911952",\
        "outputNodeId": "apply",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578473420",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1710578495407",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578495407",\
        "outputNodeId": "sequence",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710578552892",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1710586245053",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h3",\
        "list": "true"\
        },\
        {\
        "created": "1710586510206",\
        "outputNodeId": "cache3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h4",\
        "list": "true"\
        },\
        {\
        "created": "1710582945299",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710585729058",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578638808",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "reverse",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578064875",\
        "outputNodeId": "ellipse",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710585729059",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710582966840",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710578636769",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710578636770",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710578636770",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1710578670044",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710578204100",\
        "outputNodeId": "layerBlur",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710578247903",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "layerBlur",\
        "inputId": "radius",\
        "list": "false"\
        },\
        {\
        "created": "1710581058583",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710581062133",\
        "outputNodeId": "range",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1710581064368",\
        "outputNodeId": "range",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1710585729057",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710578281903",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710578281904",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710586069525",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1710586548574",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1710578673016",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1710582984249",\
        "outputNodeId": "combine5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710586065269",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1710582945299",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1710585729058",\
        "outputNodeId": "cache3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710585729059",\
        "outputNodeId": "cache3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine6",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710582966840",\
        "outputNodeId": "select2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1710585729057",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710582984249",\
        "outputNodeId": "combine6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1710586065269",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter2",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1710622571691",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1710622566630",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        }\
    ]\
}';