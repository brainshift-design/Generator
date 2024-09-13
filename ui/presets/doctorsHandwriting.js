const presetDoctorsHandwriting = '\
    {\
    "generatorVersion": "413",\
    "nodes":\
    [\
        {\
        "type": "REPT",\
        "created": "1714194699655",\
        "updated": "1714578795722",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11235.8",\
        "y": "10458",\
        "z": "0",\
        "params":\
        [\
                ["NUM#", "count", "4,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "MOVE",\
        "created": "1714194916671",\
        "updated": "1714579689872",\
        "id": "move3",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11513.8",\
        "y": "10457",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "y", "1968,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194950012",\
        "updated": "1714579431187",\
        "id": "cache5",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11349",\
        "y": "10995",\
        "z": "2"\
        },\
        {\
        "type": "CMB",\
        "created": "1714194774095",\
        "updated": "1714195791588",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10410.9",\
        "y": "10544.7",\
        "z": "3",\
        "width": "120",\
        "height": "103"\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194859305",\
        "updated": "1714194874797",\
        "id": "cache3",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9878",\
        "y": "10440",\
        "z": "4"\
        },\
        {\
        "type": "SMATH",\
        "created": "1714194722381",\
        "updated": "1714194853821",\
        "id": "math4",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10072",\
        "y": "10312",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "operand", "88,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714195625682",\
        "updated": "1714195657399",\
        "id": "cache7",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10807",\
        "y": "10099",\
        "z": "6"\
        },\
        {\
        "type": "RECT",\
        "created": "1714195231939",\
        "updated": "1714195383878",\
        "id": "rect",\
        "name": "rectangle",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10453",\
        "y": "9945",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "height", "-80,0"],\
                ["NUM#", "round", "9,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1714194645001",\
        "updated": "1714194657076",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9454",\
        "y": "10142",\
        "z": "8",\
        "width": "120",\
        "height": "38"\
        },\
        {\
        "type": "RAND",\
        "created": "1714194590906",\
        "updated": "1714194599531",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9704",\
        "y": "9822",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "seed", "4423,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-300,0"],\
                ["NUM#", "max", "300,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1714194386288",\
        "updated": "1714194439218",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "2",\
        "notCondition": "false",\
        "x": "8839",\
        "y": "9705",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "seed", "3746,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-30,0"],\
                ["NUM#", "max", "30,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "created": "1714194110544",\
        "updated": "1714194120446",\
        "id": "prob",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8237",\
        "y": "10021",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "seed", "5112,0"],\
                ["NUM#", "iteration", "?,?"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194143788",\
        "updated": "1714194143795",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8397",\
        "y": "10021",\
        "z": "12"\
        },\
        {\
        "type": "NUM",\
        "created": "1714193933243",\
        "updated": "1714194010311",\
        "id": "num3",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8262.2",\
        "y": "9745",\
        "z": "13",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "0,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1714193933243",\
        "updated": "1714194010311",\
        "id": "num2",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8252.2",\
        "y": "9604",\
        "z": "14",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "0,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1714193933243",\
        "updated": "1714194008286",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8253.2",\
        "y": "9536",\
        "z": "15",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "-57,0"]\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1714193945685",\
        "updated": "1714194104821",\
        "id": "iterate",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8441",\
        "y": "9567",\
        "z": "16"\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194168187",\
        "updated": "1714194173776",\
        "id": "cache2",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8857",\
        "y": "10225",\
        "z": "17"\
        },\
        {\
        "type": "NUM",\
        "created": "1714194216395",\
        "updated": "1714194665291",\
        "id": "num5",\
        "name": "squiggle%20width",\
        "renamed": "true",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8703.49",\
        "y": "10074.1",\
        "z": "18",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "10,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1714194386288",\
        "updated": "1714194474750",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "9186",\
        "y": "9773",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "seed", "8174,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-19,0"],\
                ["NUM#", "max", "19,0"],\
                ["NUM#", "scale", "1,1"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1714194492367",\
        "updated": "1714194498305",\
        "id": "math3",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "9348",\
        "y": "9898.5",\
        "z": "20"\
        },\
        {\
        "type": "PT",\
        "created": "1714193895452",\
        "updated": "1714579239439",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9356",\
        "y": "9446",\
        "z": "21",\
        "params":\
        [\
                ["NUM#", "x", "1,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1714193901879",\
        "updated": "1714194657076",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10139.3",\
        "y": "9742",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "count", "10,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "STRK",\
        "created": "1705642622692",\
        "updated": "1714195111177",\
        "id": "stroke",\
        "name": "stroke",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10215.3",\
        "y": "9953",\
        "z": "23",\
        "params":\
        [\
                ["ITEMS#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"],\
                ["NUM#", "weight", "2,0"],\
                ["TEXT#", "dashes", "", "center"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1714194947069",\
        "updated": "1714194947094",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11189",\
        "y": "10995",\
        "z": "24",\
        "params":\
        [\
                ["NUM#", "seed", "1884,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "10,0"],\
                ["NUM#", "max", "20,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194950012",\
        "updated": "1714579686195",\
        "id": "cache4",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10797",\
        "y": "10985",\
        "z": "25"\
        },\
        {\
        "type": "ACCUM",\
        "created": "1714194718740",\
        "updated": "1714194790782",\
        "id": "accum",\
        "name": "accumulate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10270",\
        "y": "10315",\
        "z": "26",\
        "params":\
        [\
                ["NUM#", "when", "1,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714195737616",\
        "updated": "1714195791588",\
        "id": "cache8",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10830",\
        "y": "10388",\
        "z": "27"\
        },\
        {\
        "type": "SKEW",\
        "created": "1714195477909",\
        "updated": "1714195611352",\
        "id": "skew2",\
        "name": "skew",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10613",\
        "y": "9945",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "skewX", "-21,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1714193933243",\
        "updated": "1714194008286",\
        "id": "num4",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8261.2",\
        "y": "9813",\
        "z": "29",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "-57,0"]\
        ]\
        },\
        {\
        "type": "IF",\
        "created": "1714194028479",\
        "updated": "1714194402515",\
        "id": "ifElse",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "2",\
        "notCondition": "false",\
        "x": "8663",\
        "y": "9667",\
        "z": "30",\
        "params":\
        [\
                ["NUM#", "condition", "0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1714194164876",\
        "updated": "1714194790782",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8697",\
        "y": "10225",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "seed", "9333,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "5,0"],\
                ["NUM#", "max", "30,0"]\
        ]\
        },\
        {\
        "type": "MATH",\
        "created": "1714194241969",\
        "updated": "1714195383878",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9011",\
        "y": "10077",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "operation", "4,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1714193906509",\
        "updated": "1714194657076",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "3",\
        "notCondition": "false",\
        "x": "9188",\
        "y": "10024",\
        "z": "33",\
        "params":\
        [\
        ]\
        },\
        {\
        "type": "PCORN",\
        "created": "1714194573486",\
        "updated": "1714194599531",\
        "id": "corner",\
        "name": "corner",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9831",\
        "y": "9597",\
        "z": "34",\
        "params":\
        [\
                ["NUM#", "smooth", "3,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1714194840613",\
        "updated": "1714194853821",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9787",\
        "y": "10140",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "seed", "8194,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "2,0"],\
                ["NUM#", "max", "4,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642638300",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10053.3",\
        "y": "9955",\
        "z": "36",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "0,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1714195330975",\
        "updated": "1714195347811",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10660.9",\
        "y": "9713.68",\
        "z": "37",\
        "width": "107.19114374604428",\
        "height": "51"\
        },\
        {\
        "type": "MOVE",\
        "created": "1714194706048",\
        "updated": "1714194755180",\
        "id": "move2",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11012",\
        "y": "9947",\
        "z": "38",\
        "params":\
        [\
                ["NUM#", "x", "673,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "ITER",\
        "created": "1714193945685",\
        "updated": "1714194099381",\
        "id": "iterate2",\
        "name": "iterate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8440",\
        "y": "9779",\
        "z": "39"\
        },\
        {\
        "type": "MATH",\
        "created": "1714194394264",\
        "updated": "1714194402515",\
        "id": "math2",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "2",\
        "notCondition": "false",\
        "x": "9007",\
        "y": "9669",\
        "z": "40"\
        },\
        {\
        "type": "VPATH",\
        "created": "1714193957250",\
        "updated": "1714195347811",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10382.3",\
        "y": "9713",\
        "z": "41",\
        "params":\
        [\
                ["ITEMS#", "points", "10 PT# 3.813654675591934,10 -79.88375594720762,10 PT# -0.9239450730871859,10 -16.894533568177017,10 PT# 34.563298322972024,9 -76.38116975735676,10 PT# 31.405769966570276,10 -24.512659173770764,10 PT# 51.80983437944877,10 -39.98420061957811,10 PT# 48.14568877793276,10 -28.340060222989337,9 PT# 70.79386261825705,10 -55.46230576646117,10 PT# 67.15171124150925,10 14.939517156726104,10 PT# 73.12276780541498,10 -54.42195709104987,9 PT# 109.17511270291597,10 -0.2907478205571046,10"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1714194919432",\
        "updated": "1714578959471",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11732.8",\
        "y": "10705",\
        "z": "42",\
        "params":\
        [\
                ["NUM#", "count", "17,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "IF",\
        "created": "1714195703005",\
        "updated": "1714195743507",\
        "id": "ifElse2",\
        "name": "if%2Felse",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10773",\
        "y": "9945",\
        "z": "43",\
        "params":\
        [\
                ["NUM#", "condition", "0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1714194947069",\
        "updated": "1714579692280",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10637",\
        "y": "10987",\
        "z": "44",\
        "params":\
        [\
                ["NUM#", "seed", "497,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "100,0"],\
                ["NUM#", "max", "140,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1714195483995",\
        "updated": "1714195611352",\
        "id": "random7",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10647",\
        "y": "10099",\
        "z": "45",\
        "params":\
        [\
                ["NUM#", "seed", "2661,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-40,0"],\
                ["NUM#", "max", "0,0"]\
        ]\
        },\
        {\
        "type": "PROB",\
        "created": "1714195731620",\
        "updated": "1714195731633",\
        "id": "prob2",\
        "name": "probability",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10670",\
        "y": "10388",\
        "z": "46",\
        "params":\
        [\
                ["NUM#", "seed", "4831,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "chance", "10,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1705642582453",\
        "updated": "1714195266938",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10448",\
        "y": "10179",\
        "z": "47",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 0,0 0,0"],\
                ["NUM#", "opacity", "26,0"],\
                ["NUM#", "blend", "2,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1705642577697",\
        "updated": "1705642585493",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10287",\
        "y": "10179",\
        "z": "48",\
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
        "type": "SKEW",\
        "created": "1714194324845",\
        "updated": "1714195347811",\
        "id": "skew",\
        "name": "skew",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10839",\
        "y": "9725",\
        "z": "49",\
        "params":\
        [\
                ["NUM#", "skewX", "22,0"],\
                ["NUM#", "affectSpace", "0,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194859305",\
        "updated": "1714195120814",\
        "id": "cache6",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9947",\
        "y": "10140",\
        "z": "50"\
        },\
        {\
        "type": "MOVE",\
        "created": "1714193899871",\
        "updated": "1714194498305",\
        "id": "move",\
        "name": "move",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9558",\
        "y": "9599",\
        "z": "51",\
        "params":\
        [\
                ["NUM#", "x", "108.17511270291597,0"],\
                ["NUM#", "y", "-0.2907478205571046,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1714194840613",\
        "updated": "1714194853821",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9718",\
        "y": "10440",\
        "z": "52",\
        "params":\
        [\
                ["NUM#", "seed", "3288,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "50,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194950012",\
        "updated": "1714579398602",\
        "id": "cache9",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11111",\
        "y": "10672",\
        "z": "53"\
        },\
        {\
        "type": "RAND",\
        "created": "1714194947069",\
        "updated": "1714194947094",\
        "id": "random8",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "10951",\
        "y": "10672",\
        "z": "54",\
        "params":\
        [\
                ["NUM#", "seed", "1345,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "3,0"],\
                ["NUM#", "max", "8,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1714578832647",\
        "updated": "1714579706270",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11957",\
        "y": "10678",\
        "z": "55",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "x", "-200,0"],\
                ["NUM#", "y", "-300,0"],\
                ["NUM#", "width", "2400,0"],\
                ["NUM#", "height", "3500,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1714578885933",\
        "updated": "1714578889042",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11773",\
        "y": "10925",\
        "z": "56",\
        "prevSpace": "hex",\
        "params":\
        [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "255,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1714578946203",\
        "updated": "1714579692280",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11486.3",\
        "y": "10855",\
        "z": "57",\
        "width": "123.34974444062908",\
        "height": "90"\
        },\
        {\
        "type": "CACHE",\
        "created": "1714194950012",\
        "updated": "1714579285052",\
        "id": "cache10",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "9139",\
        "y": "9412",\
        "z": "58"\
        },\
        {\
        "type": "RAND",\
        "created": "1714194947069",\
        "updated": "1714578959471",\
        "id": "random9",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8979",\
        "y": "9414",\
        "z": "59",\
        "params":\
        [\
                ["NUM#", "seed", "6990,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-30,0"],\
                ["NUM#", "max", "30,0"]\
        ]\
        },\
        {\
        "type": "ACCUM",\
        "created": "1714579682032",\
        "updated": "1714579692280",\
        "id": "accum2",\
        "name": "accumulate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "11419",\
        "y": "10663",\
        "z": "60",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "when", "1,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1714194706056",\
        "outputNodeId": "move2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1714578795721",\
        "outputNodeId": "cache9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1714194797961",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1714194916679",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1714579689872",\
        "outputNodeId": "accum2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1714195015186",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194774101",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194790780",\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714194874795",\
        "outputNodeId": "cache3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1714195120813",\
        "outputNodeId": "cache6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1714195657397",\
        "outputNodeId": "cache7",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1714195791586",\
        "outputNodeId": "cache8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h5",\
        "list": "false"\
        },\
        {\
        "created": "1714194859310",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194734544",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194859311",\
        "outputNodeId": "cache3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math4",\
        "inputId": "operand",\
        "list": "false"\
        },\
        {\
        "created": "1714195625693",\
        "outputNodeId": "random7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714195383877",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "rect",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1714195266936",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "rect",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1714194645004",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194143793",\
        "outputNodeId": "prob",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194010310",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "num3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714193945687",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714193945688",\
        "outputNodeId": "num2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714194168189",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194492372",\
        "outputNodeId": "noise2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194492373",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "math3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714579285052",\
        "outputNodeId": "cache10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1714194573498",\
        "outputNodeId": "corner",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194173776",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1714194657076",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1714193963332",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "fills",\
        "list": "false"\
        },\
        {\
        "created": "1714195111175",\
        "outputNodeId": "cache6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "stroke",\
        "inputId": "weight",\
        "list": "false"\
        },\
        {\
        "created": "1714194950017",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194742047",\
        "outputNodeId": "math4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "accum",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714195737624",\
        "outputNodeId": "prob2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache8",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714195477921",\
        "outputNodeId": "rect",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "skew2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714195625696",\
        "outputNodeId": "cache7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "skew2",\
        "inputId": "skewX",\
        "list": "false"\
        },\
        {\
        "created": "1714194008285",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "num4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194096570",\
        "outputNodeId": "iterate",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "ifElse",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194099380",\
        "outputNodeId": "iterate2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714194143794",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "created": "1714194241972",\
        "outputNodeId": "num5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194241973",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714194250769",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1714194573495",\
        "outputNodeId": "move",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "corner",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194599528",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "corner",\
        "inputId": "smooth",\
        "list": "false"\
        },\
        {\
        "created": "1714195330983",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714195703019",\
        "outputNodeId": "ifElse2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714194706055",\
        "outputNodeId": "skew",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1714194755179",\
        "outputNodeId": "accum",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move2",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1714194003654",\
        "outputNodeId": "num3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194003654",\
        "outputNodeId": "num4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "iterate2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714194394271",\
        "outputNodeId": "ifElse",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194455468",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "math2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714193959965",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1714193969661",\
        "outputNodeId": "stroke",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1714194919437",\
        "outputNodeId": "move3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1714578770684",\
        "outputNodeId": "cache5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "count",\
        "list": "false"\
        },\
        {\
        "created": "1714578959471",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1714195703016",\
        "outputNodeId": "skew2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714195743506",\
        "outputNodeId": "cache8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "ifElse2",\
        "inputId": "condition",\
        "list": "false"\
        },\
        {\
        "created": "1714195253433",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1714195347810",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "skew",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1714195092653",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714193899884",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714194498304",\
        "outputNodeId": "math3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1714194402515",\
        "outputNodeId": "math2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "move",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1714195015186",\
        "outputNodeId": "random8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache9",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714578891780",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1714578889042",\
        "outputNodeId": "color3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1714578946208",\
        "outputNodeId": "cache4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714579118657",\
        "outputNodeId": "cache10",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1714579398601",\
        "outputNodeId": "cache9",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1714579431186",\
        "outputNodeId": "cache5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1714579692278",\
        "outputNodeId": "accum2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1714194950017",\
        "outputNodeId": "random9",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache10",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1714579686195",\
        "outputNodeId": "cache4",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "accum2",\
        "inputId": "h0",\
        "list": "false"\
        }\
    ]\
}';