const nightPalace = '\
{\
    "generatorVersion": "372",\
    "nodes":\
    [\
        {\
        "type": "CONST",\
        "created": "1709283441615",\
        "updated": "1709286197990",\
        "id": "constant",\
        "name": "constant",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13579",\
        "y": "4493",\
        "z": "0"\
        },\
        {\
        "type": "SMATH",\
        "created": "1709283457375",\
        "updated": "1709286197990",\
        "id": "math5",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13743",\
        "y": "4375",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "operand", "2,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709272512086",\
        "updated": "1709301695802",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "12884",\
        "y": "4282",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "operand", "-200,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709272512086",\
        "updated": "1709301692975",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "12880",\
        "y": "4157",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "operand", "-200,0"]\
        ]\
        },\
        {\
        "type": "ATAN2",\
        "created": "1709283001413",\
        "updated": "1709301695802",\
        "id": "atan2",\
        "name": "atan2",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13498",\
        "y": "4260",\
        "z": "4",\
        "params":\
        [\
                ["NUM#", "x", "-517.6837915806141,10"],\
                ["NUM#", "y", "104.1614870521843,9"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1709283408453",\
        "updated": "1709284054310",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13897",\
        "y": "4265",\
        "z": "5"\
        },\
        {\
        "type": "SMATH",\
        "created": "1709283041716",\
        "updated": "1709296507922",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14055",\
        "y": "4349",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "57.29577951289617,10"]\
        ]\
        },\
        {\
        "type": "SEQ",\
        "created": "1709213836250",\
        "updated": "1709301852405",\
        "id": "sequence2",\
        "name": "sequence",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11985",\
        "y": "5732",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "add", "1,0"],\
                ["NUM#", "end", "?,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1709273689410",\
        "updated": "1709301852405",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11050",\
        "y": "4650",\
        "z": "8",\
        "params":\
        [\
                ["NUM#", "seed", "6105,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "400,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1709194111650",\
        "updated": "1709236513897",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "12234",\
        "y": "4765",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "index", "49,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709192050315",\
        "updated": "1709271588403",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14413",\
        "y": "4620",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "count", "100,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1709192378998",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14654",\
        "y": "4949",\
        "z": "11",\
        "params":\
        [\
                ["LIST#", "fills", "1 FILL# 194,0 255,0 51,0 100,0 0,0"],\
                ["NUM#", "weight", "4,0"],\
                ["NUM#", "join", "1,0"],\
                ["NUM#", "cap", "2,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1709192355325",\
        "updated": "1709294003357",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14977",\
        "y": "4787",\
        "z": "12",\
        "params":\
        [\
                ["LIST#", "points", "100 PT# 62.635950860855644,10 291.4401925167904,10 PT# 64.6881287471209,10 294.8736406266537,10 PT# 60.69408648413453,10 294.6554058872589,10 PT# 58.38859722930834,10 297.92415477572996,10 PT# 55.06771818333087,10 300.15389968535254,10 PT# 51.808446988946955,10 302.4727682201038,10 PT# 49.006325057468054,10 305.3272581362052,10 PT# 48.87182395460532,10 309.3249961783146,10 PT# 51.879302673244766,10 311.96224318171244,10 PT# 54.742392220570665,10 314.75557779181435,10 PT# 55.18303079308924,10 318.73123341679104,10 PT# 52.03613282315306,10 321.20045053296604,9 PT# 49.08455195856173,10 323.9001116968491,10 PT# 47.87280855176811,10 327.71215549461584,10 PT# 50.968243425498486,10 330.24558852954965,10 PT# 54.16052154074188,10 332.6558500163884,10 PT# 57.60155019038843,10 334.6952915655169,10 PT# 61.31532930169744,10 336.1811733617594,10 PT# 65.11328225782412,10 337.43638383934814,10 PT# 69.11298945550408,10 337.38798618623173,10 PT# 72.9239561060421,9 336.1728593663125,10 PT# 76.81174011096371,9 335.2320429490048,9 PT# 80.80716997455838,10 335.42319787333565,10 PT# 84.77701418249833,10 335.9134396144039,10 PT# 88.60658734143107,10 334.7582905242939,10 PT# 91.82752862703332,9 332.3864690228518,10 PT# 95.01929583071845,10 329.97553100675105,10 PT# 98.89380641950709,10 328.98146476279913,10 PT# 102.65491264522191,10 330.34311081037873,10 PT# 106.39640343200485,9 331.7577650764164,10 PT# 110.12868866008394,10 333.1965308586973,10 PT# 113.8701434701257,10 334.611280272698,10 PT# 117.8639554261311,10 334.3888706054883,10 PT# 121.1830373389856,9 332.1564514567257,10 PT# 124.25009048097478,9 329.58873164642426,10 PT# 127.29651764164915,10 326.9965739439097,10 PT# 129.66061904473398,10 323.76996201249744,10 PT# 128.50605389429273,10 319.94021276308354,10 PT# 125.60669300682822,10 317.1845447053812,10 PT# 123.69602378146921,10 313.67038148901435,9 PT# 125.149946908725,10 309.94397470230535,10 PT# 128.07529758837748,10 307.21591249607604,10 PT# 130.2068893699364,10 303.83119441670954,10 PT# 128.78841600342412,10 300.0911498570157,9 PT# 125.83827405505683,10 297.3899163453615,10 PT# 123.42089173086768,10 294.203027157031,9 PT# 122.69647615781092,10 290.26917127793314,10 PT# 123.50856098966489,10 286.3524739158853,10 PT# 125.30903983508274,10 282.780601028001,9 PT# 127.95658546036113,10 279.7821844188439,10 PT# 130.87313653487544,10 277.0447166419104,10 PT# 133.67270884072488,10 274.1877261091433,10 PT# 137.00285952498788,9 271.9718523717425,10 PT# 140.44424345846704,10 274.0106943524736,10 PT# 143.45647620835757,10 276.6425100490008,9 PT# 147.17085475631663,10 278.12689274981,10 PT# 151.1681428226856,10 277.9796238988468,10 PT# 155.13220182391504,10 277.44461339916296,10 PT# 158.97902397320266,10 278.5409524670385,9 PT# 162.46208368994425,10 280.507750628928,10 PT# 166.02819454989813,10 282.3196152305247,10 PT# 169.74279218240508,10 283.8034495974854,10 PT# 173.46434484354836,10 285.2697530416392,10 PT# 177.34554887465413,10 286.2373558883322,10 PT# 181.24481862439967,10 285.34533827711635,10 PT# 185.10931186443818,10 284.31301468555375,10 PT# 189.03210848039876,10 283.5309234441962,10 PT# 192.97889847292643,10 282.88065522654796,10 PT# 196.9673412781738,10 282.57680659767067,10 PT# 200.96699705953142,10 282.5243315497676,10 PT# 204.966991114526,10 282.5312279262204,10 PT# 208.9665661386538,10 282.47292161118406,10 PT# 212.95890881790191,10 282.22553541218736,10 PT# 216.93586976363423,10 281.7968378076687,10 PT# 220.85949445251245,10 281.0189115252838,10 PT# 224.74203355979841,10 280.05667970269883,10 PT# 228.71257624455978,10 279.57212755020333,10 PT# 232.70643922442187,10 279.79361908071223,10 PT# 236.69651797283072,10 280.07517117446423,10 PT# 240.6878018977604,10 280.33908902266313,10 PT# 244.67539582555068,10 280.6538820769863,9 PT# 248.48214541490452,10 281.8821562987928,10 PT# 251.92245285738574,10 283.9228142077056,10 PT# 255.17053789097764,9 286.2573256372249,10 PT# 259.12949050182135,10 286.82889735196744,9 PT# 261.4032214933249,10 283.53797842585027,10 PT# 264.4980559885829,10 281.00381200531643,10 PT# 267.7776997476783,10 278.7138476358498,10 PT# 270.8399512844403,10 276.1404033435445,10 PT# 273.48746753834456,10 273.14196080027097,10 PT# 275.5621618921837,10 269.7220714251379,10 PT# 277.6652211458213,10 266.3195515095916,10 PT# 278.1270223974399,10 262.3462984841723,10 PT# 275.5168669901654,10 259.315277410363,10 PT# 273.14621066018094,10 256.09347844625853,10 PT# 272.15292624909387,10 252.21876735010034,10 PT# 272.7310006478987,10 248.2607590138981,10 PT# 273.46457931511867,10 244.32860154769716,10 PT# 273.71848754664467,10 240.3366683556255,10 PT# 273.71074398809816,10 236.3366758509699,9"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709228057225",\
        "updated": "1709303304804",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "15221",\
        "y": "5673",\
        "z": "13",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "count", "50,0"]\
        ]\
        },\
        {\
        "type": "START",\
        "created": "1709192044039",\
        "updated": "1709301852405",\
        "id": "start",\
        "name": "start",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "12507",\
        "y": "4636",\
        "z": "14",\
        "params":\
        [\
                ["NUM#", "feedback", "1,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1709194617515",\
        "updated": "1709194631692",\
        "id": "noise5",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14295",\
        "y": "4885",\
        "z": "15",\
        "params":\
        [\
                ["NUM#", "seed", "1888,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "min", "-30,0"],\
                ["NUM#", "max", "120,0"],\
                ["NUM#", "scale", "5,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1709194631692",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14492",\
        "y": "4976",\
        "z": "16",\
        "prevSpace": "hsv",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "77.93611862727049,0"],\
                ["NUM#", "c2", "80,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1709273689410",\
        "updated": "1709301852405",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11055",\
        "y": "4891",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "seed", "8994,0"],\
                ["NUM#", "iteration", "?,0"],\
                ["NUM#", "max", "400,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1709273711951",\
        "updated": "1709273719062",\
        "id": "point4",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11264",\
        "y": "4772",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "x", "62.635950860855644,0"],\
                ["NUM#", "y", "291.4401925167904,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1709273736939",\
        "updated": "1709283104870",\
        "id": "repeat5",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11424",\
        "y": "4772",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "count", "50,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1709192000292",\
        "updated": "1709296507922",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "14200",\
        "y": "4094",\
        "z": "20",\
        "params":\
        [\
                ["NUM#", "moveType", "1,0"],\
                ["NUM#", "x", "4,0"],\
                ["NUM#", "y", "258.6235991234824,10"]\
        ]\
        },\
        {\
        "type": "FRZ",\
        "created": "1709194502912",\
        "updated": "1709284765631",\
        "id": "freeze",\
        "name": "freeze",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11838",\
        "y": "4765",\
        "z": "21"\
        },\
        {\
        "type": "PT",\
        "created": "1709192291473",\
        "updated": "1709301560663",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "12663",\
        "y": "4084",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "x", "273.71074398809816,10"],\
                ["NUM#", "y", "236.3366758509699,9"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1709283457375",\
        "updated": "1709284931131",\
        "id": "math6",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13884",\
        "y": "4493",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "operand", "180,0"],\
                ["NUM#", "operation", "1,0"],\
                ["NUM#", "invert", "1,0"]\
        ]\
        },\
        {\
        "type": "COUNT",\
        "created": "1709271701989",\
        "updated": "1709273754056",\
        "id": "itemCount",\
        "name": "item%20count",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "12009",\
        "y": "4866",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "value", "50,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1709301532176",\
        "updated": "1709301852405",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13082",\
        "y": "4171",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "seed", "2435,0"],\
                ["NUM#", "iteration", "273.71074398809816,10"],\
                ["NUM#", "min", "-10,0"],\
                ["NUM#", "max", "10,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1709301532176",\
        "updated": "1709301852405",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13084",\
        "y": "4396",\
        "z": "27",\
        "params":\
        [\
                ["NUM#", "seed", "2662,0"],\
                ["NUM#", "iteration", "236.3366758509699,9"],\
                ["NUM#", "min", "-10,0"],\
                ["NUM#", "max", "10,0"],\
                ["NUM#", "scale", "10,0"],\
                ["NUM#", "offset", "0,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1709301585220",\
        "updated": "1709301692975",\
        "id": "math7",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13288",\
        "y": "4203",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1709301585220",\
        "updated": "1709301695802",\
        "id": "math8",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "13288",\
        "y": "4286",\
        "z": "29",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1709286197990",\
        "outputNodeId": "constant",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709272553254",\
        "outputNodeId": "point2",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709273581344",\
        "outputNodeId": "math",\
        "outputId": "operand",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1709272517825",\
        "outputNodeId": "point2",\
        "outputId": "x",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709301692974",\
        "outputNodeId": "math7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "atan2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709301695801",\
        "outputNodeId": "math8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "atan2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709283408456",\
        "outputNodeId": "atan2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709284054309",\
        "outputNodeId": "math5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709283428392",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709284931130",\
        "outputNodeId": "math6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "freeze",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "select",\
        "inputId": "index",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709271588403",\
        "outputNodeId": "start",\
        "outputId": "from",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709271854139",\
        "outputNodeId": "itemCount",\
        "outputId": "value",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "sequence2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "start",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "noise5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1709273768102",\
        "outputNodeId": "noise3",\
        "outputId": "scale",\
        "outputOrder": "0",\
        "inputNodeId": "noise4",\
        "inputId": "scale",\
        "list": "false"\
        },\
        {\
        "created": "1709273716369",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point4",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1709273719061",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point4",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709273736943",\
        "outputNodeId": "point4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709301495751",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1709273751080",\
        "outputNodeId": "repeat5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "freeze",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709271430141",\
        "outputNodeId": "start",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709284925373",\
        "outputNodeId": "constant",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709273754055",\
        "outputNodeId": "freeze",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "itemCount",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1709301558130",\
        "outputNodeId": "point2",\
        "outputId": "x",\
        "outputOrder": "2",\
        "inputNodeId": "noise",\
        "inputId": "iteration",\
        "list": "false"\
        },\
        {\
        "created": "1709301560662",\
        "outputNodeId": "point2",\
        "outputId": "y",\
        "outputOrder": "1",\
        "inputNodeId": "noise2",\
        "inputId": "iteration",\
        "list": "false"\
        },\
        {\
        "created": "1709301588857",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709301600851",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math7",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1709301594649",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1709301607422",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math8",\
        "inputId": "h1",\
        "list": "false"\
        }\
    ]\
}';