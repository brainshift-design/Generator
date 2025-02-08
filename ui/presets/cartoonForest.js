const presetCartoonForest = '\
{\
    "generatorVersion": "434",\
    "nodes":\
    [\
        {\
        "type": "NUM",\
        "created": "1716207995894",\
        "updated": "1716631301469",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "8745.92",\
        "y": "19336.2",\
        "z": "0",\
        "width": "120",\
        "height": "54"\
        },\
        {\
        "type": "MATH",\
        "created": "1716631284953",\
        "updated": "1716648669017",\
        "id": "math8",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8916",\
        "y": "19352.2",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1716633537262",\
        "updated": "1716637141772",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9559",\
        "y": "27222",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "count", "109,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716638430234",\
        "updated": "1716638441919",\
        "id": "range4",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8323",\
        "y": "28479",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "end", "2,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716633502322",\
        "updated": "1716637529167",\
        "id": "range3",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9132",\
        "y": "27232",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "end", "1920,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716630666787",\
        "updated": "1716631124161",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9444",\
        "y": "20435.2",\
        "z": "5"\
        },\
        {\
        "type": "MATH",\
        "created": "1716637936215",\
        "updated": "1716647911940",\
        "id": "math14",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8764",\
        "y": "27960",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716633466378",\
        "updated": "1716637533230",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8923",\
        "y": "27445",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "x", "1920,0"],\
                ["NUM#", "y", "1080,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1716633378637",\
        "updated": "1719149972521",\
        "id": "panel3",\
        "name": "Land",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "7545",\
        "y": "26639",\
        "z": "8",\
        "width": "4389",\
        "height": "2706.5951441354227",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716633566075",\
        "updated": "1716638372570",\
        "id": "num4",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8569.33",\
        "y": "27625.4",\
        "z": "9",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "30,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716630589260",\
        "updated": "1716630595647",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7534.92",\
        "y": "18646.2",\
        "z": "10",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "800,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716630871321",\
        "updated": "1716630901609",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9847",\
        "y": "19962.2",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "seed", "1352,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "300,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716630871321",\
        "updated": "1716648669017",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8655",\
        "y": "19480.2",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "seed", "4299,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "0.5,1"],\
                ["NUM#", "max", "4,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716631897797",\
        "updated": "1716631913372",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11016",\
        "y": "18851.2",\
        "z": "13",\
        "params":\
        [\
                ["NUM#", "seed", "8263,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-400,0"],\
                ["NUM#", "max", "2000,0"],\
                ["NUM#", "scale", "2,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1716630680553",\
        "updated": "1716630812922",\
        "id": "neg",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9082",\
        "y": "20012.2",\
        "z": "14"\
        },\
        {\
        "type": "REPT",\
        "created": "1716631872347",\
        "updated": "1716715832319",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11550",\
        "y": "18902.2",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "count", "12,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716631766969",\
        "updated": "1716631777456",\
        "id": "colorStop7",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15973",\
        "y": "25671",\
        "z": "16",\
        "params":\
        [\
                ["FILL#", "fill", "133,0 231,0 255,0 100,0 0,0"],\
                ["NUM#", "position", "65,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1716631881517",\
        "updated": "1716648842517",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11226",\
        "y": "18637.2",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "x", "256.1616927848272,0"],\
                ["NUM#", "y", "94,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1716631461768",\
        "updated": "1716632306595",\
        "id": "bias2",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8741",\
        "y": "19056.2",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "min", "80,0"],\
                ["NUM#", "bias", "50,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716630794788",\
        "updated": "1716630814425",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8905",\
        "y": "20042.2",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.56,2"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716630598674",\
        "updated": "1716630814425",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "6",\
        "notCondition": "false",\
        "x": "8708",\
        "y": "19904.2",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716630794788",\
        "updated": "1716631492550",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8896",\
        "y": "20579.2",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "0.75,2"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716638280979",\
        "updated": "1716638372570",\
        "id": "math10",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8964",\
        "y": "27677",\
        "z": "22"\
        },\
        {\
        "type": "FRM",\
        "created": "1716631644820",\
        "updated": "1719149972521",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "17043",\
        "y": "24717",\
        "z": "23",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "width", "1920,0"],\
                ["NUM#", "height", "1080,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716631052083",\
        "updated": "1716631494269",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9261",\
        "y": "20538.2",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "start", "75,2"],\
                ["NUM#", "end", "-75,2"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207991423",\
        "id": "colorStop4",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9390",\
        "y": "19501.2",\
        "z": "25",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 0,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1716208018263",\
        "updated": "1716631250722",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9966",\
        "y": "19383.2",\
        "z": "26",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "position", "3,0"],\
                ["NUM#", "x", "399.93027193246814,10"],\
                ["NUM#", "y", "25,2"],\
                ["NUM#", "aspect", "192.32233225683763,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1716648796648",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9220",\
        "y": "19446.2",\
        "z": "27",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "0,0"]\
        ]\
        },\
        {\
        "type": "RECT",\
        "created": "1716207902456",\
        "updated": "1716631158557",\
        "id": "rect2",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10692",\
        "y": "18631.2",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "width", "800,0"],\
                ["NUM#", "height", "200,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716638203296",\
        "updated": "1716638208402",\
        "id": "combine7",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8762.33",\
        "y": "28127.4",\
        "z": "29",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CMB",\
        "created": "1716631131815",\
        "updated": "1716649186602",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10167.9",\
        "y": "20537.2",\
        "z": "30",\
        "width": "120",\
        "height": "77"\
        },\
        {\
        "type": "SMATH",\
        "created": "1716208007711",\
        "updated": "1716631301469",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9082",\
        "y": "19392.2",\
        "z": "31"\
        },\
        {\
        "type": "CMB",\
        "created": "1716631847398",\
        "updated": "1716719040232",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14432.8",\
        "y": "24769.1",\
        "z": "32",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "NOISE",\
        "created": "1716632503400",\
        "updated": "1716632506566",\
        "id": "noise6",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9047",\
        "y": "19090.2",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "seed", "8347,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "75,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "3,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716208012223",\
        "id": "colorStop3",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9390",\
        "y": "19400.2",\
        "z": "34",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 0,0 0,0"],\
                ["NUM#", "position", "0.5954641179715428,9"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716631766969",\
        "updated": "1716631774312",\
        "id": "colorStop6",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15978",\
        "y": "25529",\
        "z": "35",\
        "params":\
        [\
                ["FILL#", "fill", "36,0 200,0 255,0 100,0 0,0"],\
                ["NUM#", "position", "38,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716631766969",\
        "updated": "1716631772430",\
        "id": "colorStop5",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15976",\
        "y": "25385",\
        "z": "36",\
        "params":\
        [\
                ["FILL#", "fill", "0,0 126,0 230,0 100,0 0,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716631300109",\
        "id": "colorStop2",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9393",\
        "y": "19303.2",\
        "z": "37",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 91.58224320936343,0 0,0"],\
                ["NUM#", "position", "0.5954641179715428,9"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1716633650774",\
        "updated": "1716721513466",\
        "id": "color6",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9785",\
        "y": "27489",\
        "z": "38",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "129.58787638530612,0"],\
                ["NUM#", "c2", "76.18928511846553,0"],\
                ["NUM#", "c3", "53.496565096032235,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1716631724067",\
        "updated": "1716631777456",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15829",\
        "y": "25666",\
        "z": "39",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "192,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "76,0"]\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1716631630983",\
        "updated": "1719149972521",\
        "id": "panel",\
        "name": "clouds",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "7411",\
        "y": "18514.2",\
        "z": "40",\
        "width": "4413.979253112035",\
        "height": "2515",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1716631461768",\
        "updated": "1716649338339",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8588",\
        "y": "19054.2",\
        "z": "41",\
        "params":\
        [\
                ["NUM#", "min", "80,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716638184404",\
        "updated": "1716638433918",\
        "id": "noise7",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8545",\
        "y": "27846",\
        "z": "42",\
        "params":\
        [\
                ["NUM#", "seed", "9913,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "1,2"],\
                ["NUM#", "scale", "80,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "2,0"],\
                ["NUM#", "detail", "7,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716638323756",\
        "updated": "1716638323760",\
        "id": "math11",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9124",\
        "y": "27677",\
        "z": "43",\
        "params":\
        [\
                ["NUM#", "operand", "1080,0"],\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "invert", "1,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1716633644791",\
        "updated": "1716841999339",\
        "id": "path",\
        "name": "hill",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10231",\
        "y": "27279",\
        "z": "44",\
        "params":\
        [\
                ["NUM#", "degree", "0,0"],\
                ["NUM#", "closed", "1,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716633533686",\
        "updated": "1716638208402",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9344.33",\
        "y": "27292.4",\
        "z": "45",\
        "width": "110.81286196687472",\
        "height": "64"\
        },\
        {\
        "type": "NUM",\
        "created": "1716630589260",\
        "updated": "1716630728694",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7529.92",\
        "y": "18732.2",\
        "z": "46",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "200,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716633466378",\
        "updated": "1716638297700",\
        "id": "point3",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9325",\
        "y": "27111",\
        "z": "47",\
        "params":\
        [\
                ["NUM#", "x", "1920,0"],\
                ["NUM#", "y", "918.7466867374646,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1716634569130",\
        "updated": "1716719040232",\
        "id": "repeat4",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11382",\
        "y": "27468",\
        "z": "48",\
        "params":\
        [\
                ["NUM#", "count", "3,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1716630680553",\
        "updated": "1716631494269",\
        "id": "neg2",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9073",\
        "y": "20545.2",\
        "z": "49"\
        },\
        {\
        "type": "PANEL",\
        "created": "1716631821558",\
        "updated": "1719149972521",\
        "id": "panel2",\
        "name": "sky",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "6",\
        "notCondition": "false",\
        "x": "15649",\
        "y": "25191",\
        "z": "50",\
        "width": "762",\
        "height": "744.9761567553753",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716633466378",\
        "updated": "1716637533822",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8715",\
        "y": "27462",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "y", "1080,0"]\
        ]\
        },\
        {\
        "type": "WAVE",\
        "created": "1716637087348",\
        "updated": "1716647911940",\
        "id": "wave2",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8549",\
        "y": "28101",\
        "z": "52",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "amplitude", "1,0"],\
                ["NUM#", "frequency", "0.5,1"],\
                ["NUM#", "offset", "25,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1716207939579",\
        "updated": "1716632506566",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9203",\
        "y": "19202.2",\
        "z": "53",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "91.58224320936343,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716634603323",\
        "updated": "1716721779488",\
        "id": "combine6",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10313.3",\
        "y": "27952.4",\
        "z": "54",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CMB",\
        "created": "1716632020683",\
        "updated": "1716648900471",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11260.9",\
        "y": "18976.2",\
        "z": "55",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "REPT",\
        "created": "1716630780924",\
        "updated": "1716631547187",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "1",\
        "notCondition": "false",\
        "x": "10531",\
        "y": "20454.2",\
        "z": "56",\
        "params":\
        [\
                ["NUM#", "count", "357,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716630666787",\
        "updated": "1716631364060",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9587",\
        "y": "19908.2",\
        "z": "57"\
        },\
        {\
        "type": "COL",\
        "created": "1716631724067",\
        "updated": "1716631774312",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15826",\
        "y": "25529",\
        "z": "58",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "195,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "56.99999999999999,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716630658175",\
        "updated": "1716632184153",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9246",\
        "y": "19949.2",\
        "z": "59",\
        "params":\
        [\
                ["NUM#", "seed", "8122,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-224.00000000000003,2"],\
                ["NUM#", "max", "224.00000000000003,2"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"],\
                ["NUM#", "detail", "5,0"]\
        ]\
        },\
        {\
        "type": "WAVE",\
        "created": "1716631342946",\
        "updated": "1716631369956",\
        "id": "wave",\
        "name": "wave",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9250",\
        "y": "20231.2",\
        "z": "60",\
        "useWavelength": "false",\
        "offsetAbsolute": "false",\
        "params":\
        [\
                ["NUM#", "amplitude", "1,0"],\
                ["NUM#", "frequency", "0.5,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716631359697",\
        "updated": "1716631364060",\
        "id": "math9",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9410",\
        "y": "20090.2",\
        "z": "61",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1716631785898",\
        "updated": "1716647706343",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "16164",\
        "y": "25524",\
        "z": "62",\
        "diagAspect": "false",\
        "params":\
        [\
                ["NUM#", "position", "2,0"],\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "angle", "90,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1716207980429",\
        "updated": "1716207982970",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9391",\
        "y": "19178.2",\
        "z": "63",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 91.58224320936343,0 0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1716632450985",\
        "updated": "1716632466104",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11395",\
        "y": "19185.2",\
        "z": "64",\
        "params":\
        [\
                ["NUM#", "seed", "9775,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "1,0"],\
                ["NUM#", "max", "15,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1716630974546",\
        "updated": "1716648796648",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8934",\
        "y": "18973.2",\
        "z": "65",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "209.00000000000003,0"],\
                ["NUM#", "c2", "79,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716633566075",\
        "updated": "1716638227923",\
        "id": "num5",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8573.33",\
        "y": "27727.4",\
        "z": "66",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "150,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716630598674",\
        "updated": "1716631083429",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "8709",\
        "y": "20437.2",\
        "z": "67",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1716631724067",\
        "updated": "1716631772430",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15825",\
        "y": "25383",\
        "z": "68",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "206.99999999999997,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "45,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716633674608",\
        "updated": "1716638353784",\
        "id": "combine5",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9812.33",\
        "y": "27285.4",\
        "z": "69",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "NBIAS",\
        "created": "1716648660051",\
        "updated": "1716648669017",\
        "id": "bias3",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8804",\
        "y": "19460.2",\
        "z": "70",\
        "params":\
        [\
                ["NUM#", "min", "0.5,1"],\
                ["NUM#", "max", "4,0"],\
                ["NUM#", "bias", "-100,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716648826920",\
        "updated": "1716649431120",\
        "id": "range6",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11013",\
        "y": "19169.2",\
        "z": "71",\
        "params":\
        [\
                ["NUM#", "start", "294,0"],\
                ["NUM#", "end", "94,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716648885303",\
        "updated": "1716649338339",\
        "id": "range7",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7954",\
        "y": "19240.2",\
        "z": "72",\
        "params":\
        [\
                ["NUM#", "start", "80,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716631453074",\
        "updated": "1716649338339",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8400",\
        "y": "19121.2",\
        "z": "73",\
        "params":\
        [\
                ["NUM#", "start", "80,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716649269457",\
        "updated": "1716649336448",\
        "id": "math12",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8176",\
        "y": "19067.2",\
        "z": "74",\
        "params":\
        [\
                ["NUM#", "operation", "2,0"],\
                ["NUM#", "operand", "20,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1716649414974",\
        "updated": "1716649428371",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10800",\
        "y": "19305.2",\
        "z": "75",\
        "params":\
        [\
                ["NUM#", "seed", "8827,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "200,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1716649414974",\
        "updated": "1716649431120",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10800",\
        "y": "19105.2",\
        "z": "76",\
        "params":\
        [\
                ["NUM#", "seed", "87,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "200,0"],\
                ["NUM#", "max", "400,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716673353967",\
        "updated": "1716673398233",\
        "id": "point5",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9575",\
        "y": "23608",\
        "z": "77",\
        "params":\
        [\
                ["NUM#", "x", "2020,0"],\
                ["NUM#", "y", "735.7020999674622,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1716673412449",\
        "updated": "1716673435779",\
        "id": "repeat5",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9763",\
        "y": "23704",\
        "z": "78",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1716673432249",\
        "updated": "1716673567676",\
        "id": "path2",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9948",\
        "y": "23677",\
        "z": "79",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716672721269",\
        "updated": "1716673165699",\
        "id": "combine9",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9406.24",\
        "y": "22859",\
        "z": "80",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "RANGE",\
        "created": "1716672659682",\
        "updated": "1716672855164",\
        "id": "range8",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9083",\
        "y": "22868",\
        "z": "81",\
        "params":\
        [\
                ["NUM#", "start", "-119.99700187920303,0"],\
                ["NUM#", "end", "0,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716673149374",\
        "updated": "1716673194918",\
        "id": "math13",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9019",\
        "y": "22715",\
        "z": "82",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716672659682",\
        "updated": "1716672864562",\
        "id": "range9",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9022",\
        "y": "22477",\
        "z": "83",\
        "params":\
        [\
                ["NUM#", "end", "20,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716672701486",\
        "updated": "1716673158405",\
        "id": "math15",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9187",\
        "y": "22548",\
        "z": "84"\
        },\
        {\
        "type": "MATH",\
        "created": "1716673265137",\
        "updated": "1716673275395",\
        "id": "math16",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9047",\
        "y": "22052",\
        "z": "85",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716672792357",\
        "updated": "1716718765776",\
        "id": "num6",\
        "name": "Width",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8406.24",\
        "y": "22247",\
        "z": "86",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "20,0"]\
        ]\
        },\
        {\
        "type": "PLACE",\
        "created": "1716673480120",\
        "updated": "1716673875168",\
        "id": "place",\
        "name": "place",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10600",\
        "y": "23675",\
        "z": "87",\
        "params":\
        [\
                ["PT#", "position", "2019.9991884247675,10 735.702205287571,10"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716672652543",\
        "updated": "1716672711073",\
        "id": "point4",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9395",\
        "y": "21853",\
        "z": "88",\
        "params":\
        [\
                ["NUM#", "y", "-119.99700187920303,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716673409377",\
        "updated": "1716673416046",\
        "id": "combine10",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9584.24",\
        "y": "23789",\
        "z": "89",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CMB",\
        "created": "1716673644994",\
        "updated": "1716673656747",\
        "id": "combine11",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10815.2",\
        "y": "24056",\
        "z": "90",\
        "width": "112.58860372272245",\
        "height": "51"\
        },\
        {\
        "type": "NOISE",\
        "created": "1716673473561",\
        "updated": "1716675074713",\
        "id": "noise5",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10086",\
        "y": "24127",\
        "z": "91",\
        "params":\
        [\
                ["NUM#", "seed", "6872,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-4,0"],\
                ["NUM#", "max", "4,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716673353967",\
        "updated": "1716673624786",\
        "id": "point6",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9223",\
        "y": "23827",\
        "z": "92",\
        "params":\
        [\
                ["NUM#", "x", "2020,0"],\
                ["NUM#", "y", "1080,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716673353967",\
        "updated": "1716673624786",\
        "id": "point7",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8997",\
        "y": "23843",\
        "z": "93",\
        "params":\
        [\
                ["NUM#", "x", "-100,0"],\
                ["NUM#", "y", "1080,0"]\
        ]\
        },\
        {\
        "type": "PTALPATH",\
        "created": "1716673450610",\
        "updated": "1716674461717",\
        "id": "pointAlongPath",\
        "name": "point%20along%20path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10408",\
        "y": "23698",\
        "z": "94",\
        "params":\
        [\
                ["NUM#", "distance", "100.63643208211685,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1716673186723",\
        "updated": "1716673194918",\
        "id": "bias4",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8875",\
        "y": "22852",\
        "z": "95",\
        "params":\
        [\
                ["NUM#", "max", "1,0"],\
                ["NUM#", "bias", "100,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1716672836215",\
        "updated": "1716672855164",\
        "id": "neg4",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8573",\
        "y": "22432",\
        "z": "96"\
        },\
        {\
        "type": "NBIAS",\
        "created": "1716673243718",\
        "updated": "1716673314002",\
        "id": "bias5",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8892",\
        "y": "22226",\
        "z": "97",\
        "params":\
        [\
                ["NUM#", "min", "1,0"],\
                ["NUM#", "max", "0,0"],\
                ["NUM#", "bias", "-100,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716672905299",\
        "updated": "1716672920230",\
        "id": "combine12",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9889.24",\
        "y": "22434",\
        "z": "98",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "VPATH",\
        "created": "1716672916317",\
        "updated": "1716842021866",\
        "id": "path3",\
        "name": "tree",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10116",\
        "y": "22418",\
        "z": "99",\
        "params":\
        [\
                ["NUM#", "degree", "0,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1716672714243",\
        "updated": "1716673091830",\
        "id": "repeat6",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9654",\
        "y": "22784",\
        "z": "100",\
        "params":\
        [\
                ["NUM#", "count", "33,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716672832485",\
        "updated": "1716674560190",\
        "id": "num7",\
        "name": "Height",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8413.24",\
        "y": "22432",\
        "z": "101",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "119.99700187920303,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1716672755890",\
        "updated": "1716673040666",\
        "id": "neg3",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8416",\
        "y": "22606",\
        "z": "102"\
        },\
        {\
        "type": "REPT",\
        "created": "1716673481967",\
        "updated": "1716716270957",\
        "id": "repeat7",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "10780",\
        "y": "23675",\
        "z": "103",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1716672652543",\
        "updated": "1716672711073",\
        "id": "point8",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9374",\
        "y": "22541",\
        "z": "104",\
        "params":\
        [\
                ["NUM#", "x", "25,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1716672695209",\
        "updated": "1716673158405",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8859",\
        "y": "22614",\
        "z": "105",\
        "params":\
        [\
                ["NUM#", "seed", "782,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-12,0"],\
                ["NUM#", "max", "12,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1716672695209",\
        "updated": "1716673275395",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8862",\
        "y": "21973",\
        "z": "106",\
        "params":\
        [\
                ["NUM#", "seed", "6329,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-12,0"],\
                ["NUM#", "max", "12,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716673140809",\
        "updated": "1716673194918",\
        "id": "range10",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8716",\
        "y": "22852",\
        "z": "107",\
        "params":\
        [\
                ["NUM#", "end", "1,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716673373662",\
        "updated": "1716673384299",\
        "id": "range11",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9413",\
        "y": "23709",\
        "z": "108",\
        "params":\
        [\
                ["NUM#", "start", "-100,0"],\
                ["NUM#", "end", "2020,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1716672750457",\
        "updated": "1716673040112",\
        "id": "num8",\
        "name": "Roughness",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8418.24",\
        "y": "22653",\
        "z": "109",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "12,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1716672714243",\
        "updated": "1716673086222",\
        "id": "repeat8",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9653",\
        "y": "22087",\
        "z": "110",\
        "params":\
        [\
                ["NUM#", "count", "33,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "JOINPTH",\
        "created": "1716673604680",\
        "updated": "1716842010196",\
        "id": "joinPath",\
        "name": "treeline",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11540",\
        "y": "23686",\
        "z": "111",\
        "params":\
        [\
                ["NUM#", "closed", "1,0"],\
                ["NUM#", "winding", "1,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716673236102",\
        "updated": "1716673323796",\
        "id": "range12",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8732",\
        "y": "22226",\
        "z": "112",\
        "params":\
        [\
                ["NUM#", "start", "1,0"],\
                ["NUM#", "end", "0,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1716672795716",\
        "updated": "1716672824119",\
        "id": "neg5",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8408",\
        "y": "22185",\
        "z": "113"\
        },\
        {\
        "type": "SCENTR",\
        "created": "1716673541462",\
        "updated": "1716673550011",\
        "id": "setCenter2",\
        "name": "set%20center",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10276",\
        "y": "22418",\
        "z": "114",\
        "params":\
        [\
                ["NUM#", "centerY", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716673389055",\
        "updated": "1716716840234",\
        "id": "noise8",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9423",\
        "y": "23837",\
        "z": "115",\
        "params":\
        [\
                ["NUM#", "seed", "7842,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "1080,0"],\
                ["NUM#", "max", "500,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "2,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716672659682",\
        "updated": "1716672824119",\
        "id": "range13",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9043",\
        "y": "21789",\
        "z": "116",\
        "params":\
        [\
                ["NUM#", "start", "-20,0"],\
                ["NUM#", "end", "0,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716672659682",\
        "updated": "1716672849420",\
        "id": "range14",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9104",\
        "y": "22180",\
        "z": "117",\
        "params":\
        [\
                ["NUM#", "end", "-119.99700187920303,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1716673733296",\
        "updated": "1716725288533",\
        "id": "color7",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11118",\
        "y": "24721",\
        "z": "118",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "140,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "31.695842373111283,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716672701486",\
        "updated": "1716673275395",\
        "id": "math17",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9208",\
        "y": "21860",\
        "z": "119"\
        },\
        {\
        "type": "NUM",\
        "created": "1716673082362",\
        "updated": "1716673091830",\
        "id": "num9",\
        "name": "Detail",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9450.24",\
        "y": "22393",\
        "z": "120",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "33,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716672721269",\
        "updated": "1716673323796",\
        "id": "combine13",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9427.24",\
        "y": "22171",\
        "z": "121",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "VPATH",\
        "created": "1716673651511",\
        "updated": "1716716306351",\
        "id": "path4",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10991",\
        "y": "24037",\
        "z": "122",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1716674253548",\
        "updated": "1719149972521",\
        "id": "panel4",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "7897",\
        "y": "21664",\
        "z": "123",\
        "width": "2684",\
        "height": "1418",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "PANEL",\
        "created": "1716674253548",\
        "updated": "1719149972521",\
        "id": "panel5",\
        "name": "",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "5",\
        "notCondition": "false",\
        "x": "6728",\
        "y": "23359",\
        "z": "124",\
        "width": "5548",\
        "height": "2195.296369152031",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716674372617",\
        "updated": "1716674461717",\
        "id": "range15",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10088",\
        "y": "23981",\
        "z": "125"\
        },\
        {\
        "type": "CMB",\
        "created": "1716674382863",\
        "updated": "1716675074713",\
        "id": "combine14",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10535.2",\
        "y": "23971",\
        "z": "126",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "NUM",\
        "created": "1716674392822",\
        "updated": "1716674404659",\
        "id": "num10",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9921.24",\
        "y": "24217",\
        "z": "127",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "4,0"]\
        ]\
        },\
        {\
        "type": "NEG",\
        "created": "1716674396422",\
        "updated": "1716674401758",\
        "id": "neg6",\
        "name": "negative",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9922",\
        "y": "24166",\
        "z": "128"\
        },\
        {\
        "type": "MATH",\
        "created": "1716674456803",\
        "updated": "1716674461717",\
        "id": "math18",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10241",\
        "y": "23996",\
        "z": "129"\
        },\
        {\
        "type": "NOISE",\
        "created": "1716674555228",\
        "updated": "1716718684078",\
        "id": "noise9",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7832",\
        "y": "24013",\
        "z": "130",\
        "params":\
        [\
                ["NUM#", "seed", "1143,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "200,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1716674732829",\
        "updated": "1716716099283",\
        "id": "repeat9",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11950",\
        "y": "24825",\
        "z": "131",\
        "params":\
        [\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716674785135",\
        "updated": "1716719344193",\
        "id": "range16",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "10852",\
        "y": "24827",\
        "z": "132",\
        "params":\
        [\
                ["NUM#", "start", "40,0"],\
                ["NUM#", "end", "80,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716674845407",\
        "updated": "1716725234138",\
        "id": "combine15",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11355.2",\
        "y": "24924",\
        "z": "133",\
        "width": "120",\
        "height": "129"\
        },\
        {\
        "type": "RANGE",\
        "created": "1716674920597",\
        "updated": "1716674982448",\
        "id": "range17",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9163",\
        "y": "24077",\
        "z": "134",\
        "params":\
        [\
                ["NUM#", "start", "200,0"],\
                ["NUM#", "end", "500,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716674920597",\
        "updated": "1716716859688",\
        "id": "range18",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9174",\
        "y": "24225",\
        "z": "135",\
        "params":\
        [\
                ["NUM#", "end", "2,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716718665516",\
        "updated": "1716718693683",\
        "id": "range19",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7390",\
        "y": "24066",\
        "z": "136",\
        "params":\
        [\
                ["NUM#", "start", "20,0"],\
                ["NUM#", "end", "50,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1716718669109",\
        "updated": "1716718684078",\
        "id": "math19",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7559",\
        "y": "24156",\
        "z": "137",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "4,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716718757082",\
        "updated": "1716718803923",\
        "id": "range20",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8014",\
        "y": "22419",\
        "z": "138",\
        "params":\
        [\
                ["NUM#", "start", "5,0"],\
                ["NUM#", "end", "20,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716674785135",\
        "updated": "1716725288533",\
        "id": "range21",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "10760",\
        "y": "25004",\
        "z": "139",\
        "params":\
        [\
                ["NUM#", "start", "50,0"],\
                ["NUM#", "end", "32,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1716674785135",\
        "updated": "1716721712396",\
        "id": "range22",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "4",\
        "notCondition": "false",\
        "x": "10857",\
        "y": "24680",\
        "z": "140",\
        "params":\
        [\
                ["NUM#", "start", "180,0"],\
                ["NUM#", "end", "140,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716721334058",\
        "updated": "1716721578609",\
        "id": "noise10",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9444",\
        "y": "27678",\
        "z": "141",\
        "params":\
        [\
                ["NUM#", "seed", "8838,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "110,0"],\
                ["NUM#", "max", "140,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716721334058",\
        "updated": "1716721576715",\
        "id": "noise11",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9609",\
        "y": "27680",\
        "z": "142",\
        "params":\
        [\
                ["NUM#", "seed", "3515,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "70,0"],\
                ["NUM#", "max", "90,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1716721334058",\
        "updated": "1716721573999",\
        "id": "noise12",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9767",\
        "y": "27675",\
        "z": "143",\
        "params":\
        [\
                ["NUM#", "seed", "6308,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"],\
                ["NUM#", "max", "80,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1716721733639",\
        "updated": "1716721779488",\
        "id": "combine8",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9964.33",\
        "y": "27855.4",\
        "z": "144",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "NOISE",\
        "created": "1716725221410",\
        "updated": "1716725234138",\
        "id": "noise13",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10761",\
        "y": "25149",\
        "z": "145",\
        "params":\
        [\
                ["NUM#", "seed", "9917,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-3,0"],\
                ["NUM#", "max", "2,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1716725253466",\
        "updated": "1716725288533",\
        "id": "math20",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10935",\
        "y": "25083",\
        "z": "146"\
        },\
        {\
        "type": "RAND",\
        "created": "1716631539422",\
        "updated": "1716843112538",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10346",\
        "y": "20638",\
        "z": "147",\
        "params":\
        [\
                ["NUM#", "seed", "7905,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "200,0"],\
                ["NUM#", "max", "400,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1716631284954",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716648669017",\
        "outputNodeId": "bias3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math8",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716633537264",\
        "outputNodeId": "point3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716633541800",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716637533822",\
        "outputNodeId": "point",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "range3",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716637533231",\
        "outputNodeId": "point2",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "range3",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716630740719",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631124161",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716638187263",\
        "outputNodeId": "noise7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math14",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716647938109",\
        "outputNodeId": "num5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math14",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716633484006",\
        "outputNodeId": "point",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716630812922",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631881520",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716632466104",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1716632029108",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716631777456",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop7",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716631881519",\
        "outputNodeId": "rect2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631913372",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716648842516",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716632302195",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "bias2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716632303531",\
        "outputNodeId": "bias",\
        "outputId": "min",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716632304722",\
        "outputNodeId": "bias",\
        "outputId": "max",\
        "outputOrder": "0",\
        "inputNodeId": "bias2",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716630810938",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716630598676",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716630801697",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716638372569",\
        "outputNodeId": "num4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math10",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716638284317",\
        "outputNodeId": "math14",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math10",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716647639497",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1716647706342",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1716631492549",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "range",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716631494269",\
        "outputNodeId": "neg2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716630561376",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop4",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716208018265",\
        "outputNodeId": "colorStop",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716208018266",\
        "outputNodeId": "colorStop2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716208018266",\
        "outputNodeId": "colorStop3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716208018266",\
        "outputNodeId": "colorStop4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1716630697445",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716630771283",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716630901609",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "aspect",\
        "list": "false"\
        },\
        {\
        "created": "1716648796647",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1716630592231",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect2",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1716630728694",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "rect2",\
        "inputId": "height",\
        "list": "false"\
        },\
        {\
        "created": "1716631158557",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect2",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1716638203298",\
        "outputNodeId": "noise7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716638203298",\
        "outputNodeId": "wave2",\
        "outputId": "h0",\
        "outputOrder": "6",\
        "inputNodeId": "combine7",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716631134117",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631307910",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716631369956",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716649245832",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1716631301469",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716648262964",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1716716099282",\
        "outputNodeId": "repeat9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1716719040231",\
        "outputNodeId": "repeat4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "true"\
        },\
        {\
        "created": "1716630561376",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716630561376",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1716631774312",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop6",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716631772430",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop5",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716630561376",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716631300109",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1716721508975",\
        "outputNodeId": "noise10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color6",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1716721511080",\
        "outputNodeId": "noise11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color6",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1716721513466",\
        "outputNodeId": "noise12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color6",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1716649245832",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716649338339",\
        "outputNodeId": "range2",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716649245832",\
        "outputNodeId": "range2",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716638433918",\
        "outputNodeId": "range4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise7",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1716638323759",\
        "outputNodeId": "math10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math11",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716633682498",\
        "outputNodeId": "combine5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1716721324805",\
        "outputNodeId": "color6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1716633533688",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716638143228",\
        "outputNodeId": "wave2",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716638208401",\
        "outputNodeId": "combine7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "true"\
        },\
        {\
        "created": "1716633518190",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716638323759",\
        "outputNodeId": "math11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716634569132",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716634624214",\
        "outputNodeId": "combine6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat4",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716630805531",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "neg2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631033907",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1716632506566",\
        "outputNodeId": "noise6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "opacity",\
        "list": "false"\
        },\
        {\
        "created": "1716638441918",\
        "outputNodeId": "range4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716721779487",\
        "outputNodeId": "combine8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine6",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1716632020685",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716648846416",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716648900471",\
        "outputNodeId": "range7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716630780926",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716843112538",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1716631141573",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716630669159",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631364059",\
        "outputNodeId": "math9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716630691821",\
        "outputNodeId": "neg",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716630814425",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716631359699",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631359699",\
        "outputNodeId": "wave",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math9",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716631785900",\
        "outputNodeId": "colorStop5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716631785901",\
        "outputNodeId": "colorStop6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716631785901",\
        "outputNodeId": "colorStop7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716630561376",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1716632306595",\
        "outputNodeId": "bias2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1716630721438",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716633674610",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1716633674610",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716633674610",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716648663364",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "bias3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716648665706",\
        "outputNodeId": "noise3",\
        "outputId": "min",\
        "outputOrder": "0",\
        "inputNodeId": "bias3",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716648667601",\
        "outputNodeId": "noise3",\
        "outputId": "max",\
        "outputOrder": "0",\
        "inputNodeId": "bias3",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716649431119",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range6",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716649428371",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range6",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716649336448",\
        "outputNodeId": "math12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range2",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716649245832",\
        "outputNodeId": "range7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range2",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716649285053",\
        "outputNodeId": "range7",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math12",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673376398",\
        "outputNodeId": "range11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point5",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716673398232",\
        "outputNodeId": "noise8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point5",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716673412451",\
        "outputNodeId": "point5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673416045",\
        "outputNodeId": "combine10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat5",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716673435778",\
        "outputNodeId": "repeat5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path2",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "range9",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "range8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine9",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716673165699",\
        "outputNodeId": "range10",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine9",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716672855164",\
        "outputNodeId": "neg4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "range8",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716673149378",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math13",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673194918",\
        "outputNodeId": "bias4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math13",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716672864561",\
        "outputNodeId": "num6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "range9",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "range9",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math15",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673158405",\
        "outputNodeId": "math13",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math15",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716673265138",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math16",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673265139",\
        "outputNodeId": "bias5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math16",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716718765775",\
        "outputNodeId": "range20",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "num6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673541466",\
        "outputNodeId": "setCenter2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "place",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673523980",\
        "outputNodeId": "pointAlongPath",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "place",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1716672709848",\
        "outputNodeId": "math17",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point4",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716672667826",\
        "outputNodeId": "range14",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point4",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716673409379",\
        "outputNodeId": "range11",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine10",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673409379",\
        "outputNodeId": "noise8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine10",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716673644995",\
        "outputNodeId": "point6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine11",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673644996",\
        "outputNodeId": "point7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine11",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716674401758",\
        "outputNodeId": "neg6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise5",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716674404659",\
        "outputNodeId": "num10",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise5",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716673362562",\
        "outputNodeId": "point7",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "point6",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716673450612",\
        "outputNodeId": "path2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "pointAlongPath",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674461716",\
        "outputNodeId": "math18",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "pointAlongPath",\
        "inputId": "distance",\
        "list": "false"\
        },\
        {\
        "created": "1716673188822",\
        "outputNodeId": "range10",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "bias4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673190397",\
        "outputNodeId": "range10",\
        "outputId": "start",\
        "outputOrder": "0",\
        "inputNodeId": "bias4",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716673192013",\
        "outputNodeId": "range10",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias4",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716672836218",\
        "outputNodeId": "num7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673243720",\
        "outputNodeId": "range12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673311608",\
        "outputNodeId": "range12",\
        "outputId": "start",\
        "outputOrder": "1",\
        "inputNodeId": "bias5",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716673314002",\
        "outputNodeId": "range12",\
        "outputId": "end",\
        "outputOrder": "0",\
        "inputNodeId": "bias5",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716672905301",\
        "outputNodeId": "repeat8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine12",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1716672905301",\
        "outputNodeId": "repeat6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine12",\
        "inputId": "h1",\
        "list": "true"\
        },\
        {\
        "created": "1716672920230",\
        "outputNodeId": "combine12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path3",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "point8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673091829",\
        "outputNodeId": "num9",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat6",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "combine9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat6",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716674560189",\
        "outputNodeId": "noise9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "num7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716672755892",\
        "outputNodeId": "num8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673481969",\
        "outputNodeId": "place",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674414353",\
        "outputNodeId": "combine14",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat7",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "math15",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point8",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1716672778689",\
        "outputNodeId": "range8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point8",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1716673040666",\
        "outputNodeId": "neg3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "random5",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716673040112",\
        "outputNodeId": "num8",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "random5",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716673035733",\
        "outputNodeId": "neg3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "random6",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716673035216",\
        "outputNodeId": "num8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "random6",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716673382481",\
        "outputNodeId": "point7",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "range11",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716673384298",\
        "outputNodeId": "point6",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "range11",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716672714245",\
        "outputNodeId": "point4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673086221",\
        "outputNodeId": "num9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat8",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1716672731669",\
        "outputNodeId": "combine13",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat8",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716716270956",\
        "outputNodeId": "repeat7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "joinPath",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1716716306350",\
        "outputNodeId": "path4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "joinPath",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716673735862",\
        "outputNodeId": "color7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "joinPath",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1716672795718",\
        "outputNodeId": "num6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673541465",\
        "outputNodeId": "path3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "setCenter2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674936496",\
        "outputNodeId": "range17",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise8",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716716840234",\
        "outputNodeId": "range18",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise8",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1716672824118",\
        "outputNodeId": "neg5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range13",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1716672849419",\
        "outputNodeId": "neg4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range14",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1716720492680",\
        "outputNodeId": "range22",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color7",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1716719344192",\
        "outputNodeId": "range16",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "color7",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1716725288533",\
        "outputNodeId": "math20",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color7",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1716672705616",\
        "outputNodeId": "range13",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math17",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716673275395",\
        "outputNodeId": "math16",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math17",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716672721272",\
        "outputNodeId": "range13",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine13",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716672721272",\
        "outputNodeId": "range14",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine13",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716673323796",\
        "outputNodeId": "range12",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine13",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716673656747",\
        "outputNodeId": "combine11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path4",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1716674382866",\
        "outputNodeId": "range15",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine14",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674584826",\
        "outputNodeId": "noise9",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine14",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716674396425",\
        "outputNodeId": "num10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "neg6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674456805",\
        "outputNodeId": "range15",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math18",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674456806",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math18",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716718681257",\
        "outputNodeId": "range19",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise9",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1716718684078",\
        "outputNodeId": "math19",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise9",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1716674732831",\
        "outputNodeId": "joinPath",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674853831",\
        "outputNodeId": "combine15",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat9",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1716674845410",\
        "outputNodeId": "range16",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine15",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716674982447",\
        "outputNodeId": "range17",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine15",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716716859688",\
        "outputNodeId": "range18",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine15",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716718693682",\
        "outputNodeId": "range19",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine15",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1716718803922",\
        "outputNodeId": "range20",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine15",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1716719511039",\
        "outputNodeId": "range21",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine15",\
        "inputId": "h5",\
        "list": "false"\
        },\
        {\
        "created": "1716721712396",\
        "outputNodeId": "range22",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine15",\
        "inputId": "h6",\
        "list": "false"\
        },\
        {\
        "created": "1716725234137",\
        "outputNodeId": "noise13",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine15",\
        "inputId": "h7",\
        "list": "false"\
        },\
        {\
        "created": "1716718669115",\
        "outputNodeId": "range19",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math19",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716721733645",\
        "outputNodeId": "noise12",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716721733645",\
        "outputNodeId": "noise10",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine8",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1716721733646",\
        "outputNodeId": "noise11",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine8",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1716725253474",\
        "outputNodeId": "range21",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math20",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1716725253474",\
        "outputNodeId": "noise13",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math20",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';