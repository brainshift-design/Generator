const presetDustySunset = '\
{\
    "generatorVersion": "403",\
    "nodes":\
    [\
        {\
        "type": "CMB",\
        "created": "1713265111573",\
        "updated": "1713265567223",\
        "id": "combine2",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6973.27",\
        "y": "7207.81",\
        "z": "0",\
        "width": "120",\
        "height": "77"\
        },\
        {\
        "type": "NOISE",\
        "created": "1713264946905",\
        "updated": "1713265353379",\
        "id": "noise",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6393",\
        "y": "6751",\
        "z": "1",\
        "params":\
        [\
                ["NUM#", "seed", "7758,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "1,0"],\
                ["NUM#", "max", "-24,0"],\
                ["NUM#", "scale", "100,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "20,0"],\
                ["NUM#", "detail", "8,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1713264858378",\
        "updated": "1713264956851",\
        "id": "point3",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6538",\
        "y": "6584",\
        "z": "2",\
        "params":\
        [\
                ["NUM#", "x", "800,0"],\
                ["NUM#", "y", "-6.5177049551511965,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1713264885684",\
        "updated": "1713265206838",\
        "id": "repeat",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6695",\
        "y": "6656",\
        "z": "3",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713267667463",\
        "updated": "1713267671691",\
        "id": "cache4",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6692",\
        "y": "8192",\
        "z": "4"\
        },\
        {\
        "type": "LERP",\
        "created": "1713265455279",\
        "updated": "1713266135383",\
        "id": "inter3",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6490",\
        "y": "7986",\
        "z": "5",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"]\
        ]\
        },\
        {\
        "type": "NBIAS",\
        "created": "1713266128749",\
        "updated": "1713267671691",\
        "id": "bias",\
        "name": "bias",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6664",\
        "y": "7993",\
        "z": "6",\
        "params":\
        [\
                ["NUM#", "min", "75,0"],\
                ["NUM#", "max", "13,0"],\
                ["NUM#", "bias", "-8,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713265512819",\
        "updated": "1713265567223",\
        "id": "range6",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6334",\
        "y": "8157",\
        "z": "7",\
        "params":\
        [\
                ["NUM#", "start", "2,0"]\
        ]\
        },\
        {\
        "type": "VPATH",\
        "created": "1713265024715",\
        "updated": "1713265641843",\
        "id": "path",\
        "name": "path",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7074",\
        "y": "6831",\
        "z": "8",\
        "params":\
        [\
                ["LIST#", "points", "102 PT# 0,0 7.833583885424231,0 PT# 8.080808080808081,0 7.830958569488678,0 PT# 16.161616161616163,0 7.750284767363348,0 PT# 24.242424242424242,0 7.556427683389734,0 PT# 32.323232323232325,0 7.630635926984066,0 PT# 40.4040404040404,0 7.426008606195665,0 PT# 48.484848484848484,0 7.142454496004264,0 PT# 56.56565656565656,0 7.276950224501602,0 PT# 64.64646464646465,0 7.282386129096093,0 PT# 72.72727272727273,0 7.252903988509704,0 PT# 80.8080808080808,0 6.959368497409633,0 PT# 88.88888888888889,0 6.626010121974842,0 PT# 96.96969696969697,0 6.380797954740075,0 PT# 105.05050505050507,0 6.462212365287322,0 PT# 113.13131313131312,0 6.624852803900394,0 PT# 121.21212121212122,0 6.618300563853713,0 PT# 129.2929292929293,0 6.636450387613154,0 PT# 137.37373737373736,0 6.790848987866841,0 PT# 145.45454545454547,0 6.51940537034002,0 PT# 153.53535353535352,0 6.347640079391248,0 PT# 161.6161616161616,0 5.995559805229421,0 PT# 169.6969696969697,0 5.592150833669649,0 PT# 177.77777777777777,0 5.247996830685496,0 PT# 185.85858585858585,0 5.031986360635404,0 PT# 193.93939393939394,0 4.7433273825708895,0 PT# 202.02020202020202,0 4.680508473592084,0 PT# 210.10101010101013,0 4.891794159429549,0 PT# 218.18181818181816,0 5.201008311937132,0 PT# 226.26262626262624,0 5.2032122732926895,0 PT# 234.34343434343435,0 5.2412344973476275,0 PT# 242.42424242424244,0 5.254725868309239,0 PT# 250.50505050505052,0 5.283819198895416,0 PT# 258.5858585858586,0 5.282424175905891,0 PT# 266.66666666666663,0 5.319389609919762,0 PT# 274.7474747474747,0 5.517038074062335,0 PT# 282.82828282828285,0 5.391803341182127,0 PT# 290.90909090909093,0 5.059381275742404,0 PT# 298.989898989899,0 4.9067882867901815,0 PT# 307.07070707070704,0 4.649975192059213,0 PT# 315.1515151515151,0 4.248591281876542,0 PT# 323.2323232323232,0 3.8379796005239974,0 PT# 331.3131313131313,0 3.565899146718194,0 PT# 339.3939393939394,0 3.084569438727292,0 PT# 347.4747474747475,0 2.687434574854045,0 PT# 355.55555555555554,0 2.420265089950193,0 PT# 363.6363636363636,0 2.2376236905774274,0 PT# 371.7171717171717,0 1.8151327535308432,0 PT# 379.7979797979798,0 1.5182645809454491,0 PT# 387.8787878787879,0 1.2943114943106029,0 PT# 395.95959595959596,0 1.1584059603793606,0 PT# 404.04040404040404,0 1.0986546579606788,0 PT# 412.1212121212121,0 1.2536345550739028,0 PT# 420.20202020202026,0 1.5055116243524718,0 PT# 428.2828282828283,0 2.0571228089804903,0 PT# 436.3636363636363,0 2.1787329027992026,0 PT# 444.44444444444446,0 2.178107934337419,0 PT# 452.5252525252525,0 2.1170984071575454,0 PT# 460.6060606060606,0 2.1748453870774793,0 PT# 468.6868686868687,0 2.23318808943749,0 PT# 476.76767676767673,0 2.227211057243988,0 PT# 484.8484848484849,0 2.2048894012357203,0 PT# 492.9292929292929,0 2.3461553165760685,0 PT# 501.01010101010104,0 2.3107349196653098,0 PT# 509.09090909090907,0 2.3511822651324934,0 PT# 517.1717171717172,0 2.1965028758674743,0 PT# 525.2525252525253,0 2.1014602591951097,0 PT# 533.3333333333333,0 2.25765211689485,0 PT# 541.4141414141415,0 2.3978102089482154,0 PT# 549.4949494949494,0 2.659701990565672,0 PT# 557.5757575757576,0 2.489513112435997,0 PT# 565.6565656565657,0 2.3523975224076454,0 PT# 573.7373737373737,0 2.0498032350871633,0 PT# 581.8181818181819,0 1.7490592637871498,0 PT# 589.8989898989898,0 1.4425596848087237,0 PT# 597.979797979798,0 1.3397174636510338,0 PT# 606.060606060606,0 1.3203137400642562,0 PT# 614.1414141414141,0 0.7667935035875475,0 PT# 622.2222222222223,0 0.35411426009998187,0 PT# 630.3030303030303,0 0.05452864221369705,0 PT# 638.3838383838385,0 -0.4648714476939369,0 PT# 646.4646464646464,0 -0.8435736417797297,0 PT# 654.5454545454546,0 -1.1674451287841985,0 PT# 662.6262626262626,0 -1.4188660970260965,0 PT# 670.7070707070707,0 -1.7831854901438144,0 PT# 678.7878787878788,0 -2.4308681215383023,0 PT# 686.8686868686868,0 -2.869585309333161,0 PT# 694.949494949495,0 -3.138903823687343,0 PT# 703.030303030303,0 -3.452699413864528,0 PT# 711.1111111111111,0 -3.7523824477113967,0 PT# 719.1919191919192,0 -4.1718870908259404,0 PT# 727.2727272727273,0 -4.128793424916169,0 PT# 735.3535353535353,0 -4.4113053079597595,0 PT# 743.4343434343434,0 -5.03410355221711,0 PT# 751.5151515151515,0 -5.414125926821397,0 PT# 759.5959595959596,0 -5.603176499716097,0 PT# 767.6767676767677,0 -5.898025855564389,0 PT# 775.7575757575758,0 -6.000367315028223,0 PT# 783.8383838383838,0 -6.2801896495124225,0 PT# 791.9191919191919,0 -6.383673027025886,0 PT# 800,0 -6.5177049551511965,0 PT# 800,0 0,0 PT# 0,0 0,0"],\
                ["NUM#", "degree", "0,0"],\
                ["NUM#", "closed", "1,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713269629198",\
        "updated": "1713269629216",\
        "id": "random13",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7548",\
        "y": "8764",\
        "z": "9",\
        "params":\
        [\
                ["NUM#", "seed", "6074,0"],\
                ["NUM#", "iteration", "?,?"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1713269407502",\
        "updated": "1713269640108",\
        "id": "noise3",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7846",\
        "y": "8375",\
        "z": "10",\
        "params":\
        [\
                ["NUM#", "seed", "6342,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "73,0"],\
                ["NUM#", "scale", "4,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1713270026779",\
        "updated": "1713270062868",\
        "id": "noise4",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7235",\
        "y": "8815",\
        "z": "11",\
        "params":\
        [\
                ["NUM#", "seed", "2555,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "5,0"],\
                ["NUM#", "scale", "50,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1713269425063",\
        "updated": "1713270877897",\
        "id": "grad3",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8338",\
        "y": "8307",\
        "z": "12",\
        "params":\
        [\
                ["NUM#", "gradType", "2,0"],\
                ["NUM#", "x", "79,0"],\
                ["NUM#", "y", "56,0"],\
                ["NUM#", "angle", "11,0"],\
                ["NUM#", "blend", "5,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713267216875",\
        "updated": "1713267235965",\
        "id": "color6",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7730",\
        "y": "7874",\
        "z": "13",\
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
        "type": "FILL",\
        "created": "1713267225324",\
        "updated": "1713267238989",\
        "id": "fill2",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7886",\
        "y": "7877",\
        "z": "14",\
        "params":\
        [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"]\
        ]\
        },\
        {\
        "type": "FILL",\
        "created": "1713267225324",\
        "updated": "1713267235965",\
        "id": "fill",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7879",\
        "y": "7736",\
        "z": "15",\
        "params":\
        [\
                ["COL#", "color", "1,0 0,0 0,0 0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266792348",\
        "updated": "1713266814608",\
        "id": "random3",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7476",\
        "y": "8280",\
        "z": "16",\
        "params":\
        [\
                ["NUM#", "seed", "5679,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "unique", "5,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713268800078",\
        "updated": "1713276275284",\
        "id": "random12",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7186",\
        "y": "8197",\
        "z": "17",\
        "params":\
        [\
                ["NUM#", "seed", "5229,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "25,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711715449783",\
        "updated": "1711715470119",\
        "id": "random10",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6864",\
        "y": "8299",\
        "z": "18",\
        "params":\
        [\
                ["NUM#", "seed", "7411,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "25,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1711715449783",\
        "updated": "1713277299616",\
        "id": "random9",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6720",\
        "y": "8297",\
        "z": "19",\
        "params":\
        [\
                ["NUM#", "seed", "3017,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1711715435817",\
        "updated": "1713277299616",\
        "id": "color8",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7135",\
        "y": "7840",\
        "z": "20",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "45,0"],\
                ["NUM#", "c2", "44,0"],\
                ["NUM#", "c3", "72,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1713266432350",\
        "updated": "1713268796009",\
        "id": "colorStop5",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7337",\
        "y": "7765",\
        "z": "21",\
        "params":\
        [\
                ["FILL#", "fill", "231,0 194,0 148,0 100,0 0,0"],\
                ["NUM#", "position", "100,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266792348",\
        "updated": "1713276257290",\
        "id": "random5",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6916",\
        "y": "7858",\
        "z": "22",\
        "params":\
        [\
                ["NUM#", "seed", "354,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "35,0"],\
                ["NUM#", "unique", "5,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266215624",\
        "updated": "1713267013430",\
        "id": "random6",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5757",\
        "y": "8129",\
        "z": "23",\
        "params":\
        [\
                ["NUM#", "seed", "3461,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "25,0"],\
                ["NUM#", "max", "75,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713267016607",\
        "updated": "1713267016614",\
        "id": "cache2",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5917",\
        "y": "8129",\
        "z": "24"\
        },\
        {\
        "type": "CLERP",\
        "created": "1713266683191",\
        "updated": "1713276250190",\
        "id": "inter4",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7131",\
        "y": "7523",\
        "z": "25",\
        "params":\
        [\
                ["NUM#", "amount", "9,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1713266432350",\
        "updated": "1713266542834",\
        "id": "colorStop2",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7322",\
        "y": "7454",\
        "z": "26",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"],\
                ["NUM#", "position", "28,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713266422415",\
        "updated": "1713266695163",\
        "id": "color",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6973",\
        "y": "7402",\
        "z": "27",\
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
        "type": "GRAD",\
        "created": "1713266415130",\
        "updated": "1713268706862",\
        "id": "grad",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7755",\
        "y": "7350",\
        "z": "28",\
        "params":\
        [\
                ["NUM#", "gradType", "1,0"],\
                ["NUM#", "x", "79,0"],\
                ["NUM#", "y", "56,0"],\
                ["NUM#", "size", "30,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1713267253817",\
        "updated": "1713269466496",\
        "id": "combine4",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8206.27",\
        "y": "7578.81",\
        "z": "29",\
        "width": "94.77659228189374",\
        "height": "64"\
        },\
        {\
        "type": "PT",\
        "created": "1713264858378",\
        "updated": "1713265555690",\
        "id": "point2",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6070",\
        "y": "6900",\
        "z": "30",\
        "params":\
        [\
                ["NUM#", "x", "800,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1713265096206",\
        "updated": "1713265374405",\
        "id": "repeat2",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7423",\
        "y": "7127",\
        "z": "31",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713269908945",\
        "updated": "1713269963569",\
        "id": "random14",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7238",\
        "y": "8602",\
        "z": "32",\
        "params":\
        [\
                ["NUM#", "seed", "4051,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713264888645",\
        "updated": "1713265206838",\
        "id": "range",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6227",\
        "y": "6679",\
        "z": "33",\
        "params":\
        [\
                ["NUM#", "end", "800,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1713266432350",\
        "updated": "1713266710388",\
        "id": "colorStop3",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7320",\
        "y": "7548",\
        "z": "34",\
        "params":\
        [\
                ["FILL#", "fill", "253,0 249,0 245,0 100,0 0,0"],\
                ["NUM#", "position", "28.1,1"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713270862451",\
        "updated": "1713270877897",\
        "id": "random15",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8113",\
        "y": "8512",\
        "z": "35",\
        "params":\
        [\
                ["NUM#", "seed", "1370,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266792348",\
        "updated": "1713266804334",\
        "id": "random2",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7481",\
        "y": "8066",\
        "z": "36",\
        "params":\
        [\
                ["NUM#", "seed", "453,0"],\
                ["NUM#", "iteration", "?,?"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713265415672",\
        "updated": "1713268783290",\
        "id": "color2",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6226",\
        "y": "7730",\
        "z": "37",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "30,0"],\
                ["NUM#", "c2", "68,0"],\
                ["NUM#", "c3", "75,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713266232065",\
        "updated": "1713266232072",\
        "id": "cache",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6028",\
        "y": "7805",\
        "z": "38"\
        },\
        {\
        "type": "FILL",\
        "created": "1713269391766",\
        "updated": "1713269902370",\
        "id": "fill3",\
        "name": "fill",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7855",\
        "y": "8258",\
        "z": "39",\
        "params":\
        [\
                ["COL#", "color", "1,0 249,0 255,0 249,0"],\
                ["NUM#", "opacity", "58.39349855594198,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713265415672",\
        "updated": "1713266941642",\
        "id": "color3",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6229",\
        "y": "7908",\
        "z": "40",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "30,0"],\
                ["NUM#", "c2", "34,0"],\
                ["NUM#", "c3", "13,0"]\
        ]\
        },\
        {\
        "type": "PT",\
        "created": "1713264858378",\
        "updated": "1713264893667",\
        "id": "point",\
        "name": "point",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5796",\
        "y": "6937",\
        "z": "41"\
        },\
        {\
        "type": "LERP",\
        "created": "1713265455279",\
        "updated": "1713265518151",\
        "id": "inter2",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6509",\
        "y": "7867",\
        "z": "42",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713265415672",\
        "updated": "1713266135383",\
        "id": "color4",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6767",\
        "y": "7792",\
        "z": "43",\
        "prevSpace": "hsl",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "30,0"],\
                ["NUM#", "c2", "34,0"],\
                ["NUM#", "c3", "13,0"]\
        ]\
        },\
        {\
        "type": "NUM",\
        "created": "1713266534374",\
        "updated": "1713266548622",\
        "id": "num",\
        "name": "number",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6967.27",\
        "y": "7645.81",\
        "z": "44",\
        "width": "120",\
        "height": "54",\
        "params":\
        [\
                ["NUM#", "value", "28,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713267664403",\
        "updated": "1713267664408",\
        "id": "random8",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6532",\
        "y": "8192",\
        "z": "45",\
        "params":\
        [\
                ["NUM#", "seed", "4870,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "-100,0"],\
                ["NUM#", "max", "0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266215624",\
        "updated": "1713266224715",\
        "id": "random",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5868",\
        "y": "7805",\
        "z": "46",\
        "params":\
        [\
                ["NUM#", "seed", "9257,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "max", "360,0"]\
        ]\
        },\
        {\
        "type": "REPT",\
        "created": "1713269421251",\
        "updated": "1713270062868",\
        "id": "repeat3",\
        "name": "repeat",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8015",\
        "y": "8258",\
        "z": "47",\
        "params":\
        [\
                ["NUM#", "count", "100,0"],\
                ["NUM#", "iteration", "?,0"]\
        ]\
        },\
        {\
        "type": "SMATH",\
        "created": "1713266539367",\
        "updated": "1713266552169",\
        "id": "math",\
        "name": "math",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7128",\
        "y": "7675",\
        "z": "48",\
        "params":\
        [\
                ["NUM#", "operand", "0.1,1"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1713266432350",\
        "updated": "1713266458202",\
        "id": "colorStop",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7326",\
        "y": "7340",\
        "z": "49",\
        "params":\
        [\
                ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1713265018150",\
        "updated": "1713265028863",\
        "id": "combine",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6883.27",\
        "y": "6843.81",\
        "z": "50",\
        "width": "120",\
        "height": "64"\
        },\
        {\
        "type": "CACHE",\
        "created": "1713269491069",\
        "updated": "1713269512838",\
        "id": "cache6",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7636",\
        "y": "8280",\
        "z": "51"\
        },\
        {\
        "type": "COL",\
        "created": "1713267216875",\
        "updated": "1713267235965",\
        "id": "color5",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7723",\
        "y": "7733",\
        "z": "52",\
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
        "type": "RAND",\
        "created": "1711715449783",\
        "updated": "1711715473065",\
        "id": "random11",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7022",\
        "y": "8300",\
        "z": "53",\
        "params":\
        [\
                ["NUM#", "seed", "9801,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "70,0"]\
        ]\
        },\
        {\
        "type": "LSTSEL",\
        "created": "1713269439578",\
        "updated": "1713269439584",\
        "id": "select",\
        "name": "select",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8015",\
        "y": "8405",\
        "z": "54",\
        "params":\
        [\
                ["NUM#", "index", "0,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266792348",\
        "updated": "1713266842411",\
        "id": "random4",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7469",\
        "y": "8495",\
        "z": "55",\
        "params":\
        [\
                ["NUM#", "seed", "1891,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "25,0"],\
                ["NUM#", "max", "120,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713269485708",\
        "updated": "1713269501031",\
        "id": "cache5",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7641",\
        "y": "8066",\
        "z": "56"\
        },\
        {\
        "type": "CMB",\
        "created": "1713269447952",\
        "updated": "1713269453874",\
        "id": "combine5",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8175.27",\
        "y": "8331.81",\
        "z": "57",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CLERP",\
        "created": "1713268750091",\
        "updated": "1713276275284",\
        "id": "inter5",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7312",\
        "y": "7934",\
        "z": "58",\
        "params":\
        [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "amount", "20,0"]\
        ]\
        },\
        {\
        "type": "CSTOP",\
        "created": "1713266432350",\
        "updated": "1713268715766",\
        "id": "colorStop4",\
        "name": "color%20stop",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7331",\
        "y": "7655",\
        "z": "59",\
        "params":\
        [\
                ["FILL#", "fill", "235,0 191,0 148,0 100,0 0,0"],\
                ["NUM#", "position", "50,0"]\
        ]\
        },\
        {\
        "type": "CMB",\
        "created": "1713265203782",\
        "updated": "1713265206838",\
        "id": "combine3",\
        "name": "combine",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6540.27",\
        "y": "6734.81",\
        "z": "60",\
        "width": "120",\
        "height": "51"\
        },\
        {\
        "type": "CACHE",\
        "created": "1713267023222",\
        "updated": "1713267023229",\
        "id": "cache3",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5926",\
        "y": "8346",\
        "z": "61"\
        },\
        {\
        "type": "RANGE",\
        "created": "1713265103529",\
        "updated": "1713265197813",\
        "id": "range3",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6247",\
        "y": "7107",\
        "z": "62",\
        "params":\
        [\
                ["NUM#", "start", "-400,0"],\
                ["NUM#", "end", "-24,0"]\
        ]\
        },\
        {\
        "type": "COL",\
        "created": "1713269893305",\
        "updated": "1713270034192",\
        "id": "color7",\
        "name": "color",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7702",\
        "y": "8376",\
        "z": "63",\
        "prevSpace": "hsb",\
        "params":\
        [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "117,0"],\
                ["NUM#", "c2", "2.484480911062737,0"],\
                ["NUM#", "c3", "100,0"]\
        ]\
        },\
        {\
        "type": "GRAD",\
        "created": "1713267246742",\
        "updated": "1713267246806",\
        "id": "grad2",\
        "name": "gradient",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8046",\
        "y": "7807",\
        "z": "64",\
        "params":\
        [\
                ["NUM#", "y", "0,0"],\
                ["NUM#", "angle", "90,0"],\
                ["NUM#", "blend", "9,0"]\
        ]\
        },\
        {\
        "type": "CACHE",\
        "created": "1713269635868",\
        "updated": "1713269640108",\
        "id": "cache7",\
        "name": "cache",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "7708",\
        "y": "8764",\
        "z": "65"\
        },\
        {\
        "type": "RANGE",\
        "created": "1713265103529",\
        "updated": "1713265197813",\
        "id": "range2",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6097",\
        "y": "7093",\
        "z": "66",\
        "params":\
        [\
                ["NUM#", "start", "-100,0"],\
                ["NUM#", "end", "1,0"]\
        ]\
        },\
        {\
        "type": "RANGE",\
        "created": "1713265344701",\
        "updated": "1713265357072",\
        "id": "range5",\
        "name": "range",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6176",\
        "y": "7235",\
        "z": "67",\
        "params":\
        [\
                ["NUM#", "end", "20,0"]\
        ]\
        },\
        {\
        "type": "FRM",\
        "created": "1713265369112",\
        "updated": "1713272488878",\
        "id": "frame",\
        "name": "frame",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "8465",\
        "y": "7100",\
        "z": "68",\
        "active": "true",\
        "params":\
        [\
                ["NUM#", "position", "1,0"],\
                ["NUM#", "y", "-800,0"],\
                ["NUM#", "width", "800,0"],\
                ["NUM#", "height", "800,0"]\
        ]\
        },\
        {\
        "type": "RAND",\
        "created": "1713266215624",\
        "updated": "1713266955233",\
        "id": "random7",\
        "name": "random",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5766",\
        "y": "8346",\
        "z": "69",\
        "params":\
        [\
                ["NUM#", "seed", "1350,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "25,0"]\
        ]\
        },\
        {\
        "type": "NOISE",\
        "created": "1713268916355",\
        "updated": "1713268916362",\
        "id": "noise2",\
        "name": "noise",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "5845",\
        "y": "7167",\
        "z": "70",\
        "params":\
        [\
                ["NUM#", "seed", "273,0"],\
                ["NUM#", "iteration", "?,?"],\
                ["NUM#", "min", "1,0"],\
                ["NUM#", "scale", "20,0"],\
                ["NUM#", "offset", "0,1"],\
                ["NUM#", "evolve", "0,1"]\
        ]\
        },\
        {\
        "type": "LERP",\
        "created": "1713265455279",\
        "updated": "1713265516268",\
        "id": "inter",\
        "name": "interpolate",\
        "renamed": "false",\
        "enabled": "true",\
        "highlight": "0",\
        "notCondition": "false",\
        "x": "6508",\
        "y": "7759",\
        "z": "71",\
        "params":\
        [\
                ["NUM#", "amount", "100,0"]\
        ]\
        }\
    ],\
    "connections":\
    [\
        {\
        "created": "1713265111575",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265111576",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713265357070",\
        "outputNodeId": "range5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine2",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1713265567222",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "combine2",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1713265121670",\
        "outputNodeId": "range2",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1713265125037",\
        "outputNodeId": "range3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "noise",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1713265353378",\
        "outputNodeId": "range5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise",\
        "inputId": "evolve",\
        "list": "false"\
        },\
        {\
        "created": "1713264904081",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1713264956850",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "point3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1713264885687",\
        "outputNodeId": "point3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265206837",\
        "outputNodeId": "combine3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1713267667466",\
        "outputNodeId": "random8",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265470789",\
        "outputNodeId": "color2",\
        "outputId": "c3",\
        "outputOrder": "0",\
        "inputNodeId": "inter3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265472746",\
        "outputNodeId": "color3",\
        "outputId": "c3",\
        "outputOrder": "0",\
        "inputNodeId": "inter3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713265520229",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "inter3",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1713266132172",\
        "outputNodeId": "inter3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "bias",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713266150153",\
        "outputNodeId": "color2",\
        "outputId": "c3",\
        "outputOrder": "1",\
        "inputNodeId": "bias",\
        "inputId": "min",\
        "list": "false"\
        },\
        {\
        "created": "1713266145584",\
        "outputNodeId": "color3",\
        "outputId": "c3",\
        "outputOrder": "1",\
        "inputNodeId": "bias",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1713267671690",\
        "outputNodeId": "cache4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "bias",\
        "inputId": "bias",\
        "list": "false"\
        },\
        {\
        "created": "1713265028862",\
        "outputNodeId": "combine",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "path",\
        "inputId": "points",\
        "list": "true"\
        },\
        {\
        "created": "1713265641841",\
        "outputNodeId": "color4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "path",\
        "inputId": "props",\
        "list": "false"\
        },\
        {\
        "created": "1713269640107",\
        "outputNodeId": "cache7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "noise3",\
        "inputId": "max",\
        "list": "false"\
        },\
        {\
        "created": "1713269453873",\
        "outputNodeId": "combine5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713269501030",\
        "outputNodeId": "cache5",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad3",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1713269512837",\
        "outputNodeId": "cache6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "grad3",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1713270877895",\
        "outputNodeId": "random15",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad3",\
        "inputId": "angle",\
        "list": "false"\
        },\
        {\
        "created": "1713267238985",\
        "outputNodeId": "color6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill2",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1713267235964",\
        "outputNodeId": "color5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1713268644264",\
        "outputNodeId": "random10",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color8",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1713268644264",\
        "outputNodeId": "random11",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color8",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1713268796008",\
        "outputNodeId": "inter5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop5",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1713267016612",\
        "outputNodeId": "random6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713266695162",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "inter4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713266705678",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "3",\
        "inputNodeId": "inter4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713276257290",\
        "outputNodeId": "random5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter4",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1713266499279",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "colorStop2",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1713266542833",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop2",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1713266458200",\
        "outputNodeId": "colorStop",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713266461788",\
        "outputNodeId": "colorStop2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713266465431",\
        "outputNodeId": "colorStop3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1713268715766",\
        "outputNodeId": "colorStop4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h3",\
        "list": "false"\
        },\
        {\
        "created": "1713268446953",\
        "outputNodeId": "colorStop5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "h4",\
        "list": "false"\
        },\
        {\
        "created": "1713269485712",\
        "outputNodeId": "cache5",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "x",\
        "list": "false"\
        },\
        {\
        "created": "1713269491073",\
        "outputNodeId": "cache6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1713266842410",\
        "outputNodeId": "random4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad",\
        "inputId": "size",\
        "list": "false"\
        },\
        {\
        "created": "1713267253820",\
        "outputNodeId": "grad",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine4",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713267253821",\
        "outputNodeId": "grad2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713269466495",\
        "outputNodeId": "grad3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine4",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1713264863023",\
        "outputNodeId": "point",\
        "outputId": "y",\
        "outputOrder": "0",\
        "inputNodeId": "point2",\
        "inputId": "y",\
        "list": "false"\
        },\
        {\
        "created": "1713265096211",\
        "outputNodeId": "path",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265116869",\
        "outputNodeId": "combine2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat2",\
        "inputId": "loop",\
        "list": "true"\
        },\
        {\
        "created": "1713264893666",\
        "outputNodeId": "point",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "start",\
        "list": "false"\
        },\
        {\
        "created": "1713264895888",\
        "outputNodeId": "point2",\
        "outputId": "x",\
        "outputOrder": "0",\
        "inputNodeId": "range",\
        "inputId": "end",\
        "list": "false"\
        },\
        {\
        "created": "1713266710387",\
        "outputNodeId": "inter4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1713266552169",\
        "outputNodeId": "math",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop3",\
        "inputId": "position",\
        "list": "false"\
        },\
        {\
        "created": "1713266232071",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1713267016614",\
        "outputNodeId": "cache2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color2",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1713266232069",\
        "outputNodeId": "random",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713269902368",\
        "outputNodeId": "color7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill3",\
        "inputId": "color",\
        "list": "false"\
        },\
        {\
        "created": "1713269417065",\
        "outputNodeId": "noise3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "fill3",\
        "inputId": "opacity",\
        "list": "false"\
        },\
        {\
        "created": "1713265447663",\
        "outputNodeId": "color2",\
        "outputId": "space",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "space",\
        "list": "false"\
        },\
        {\
        "created": "1713266232071",\
        "outputNodeId": "cache",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "color3",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1713267023228",\
        "outputNodeId": "cache3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color3",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1713265466429",\
        "outputNodeId": "color2",\
        "outputId": "c2",\
        "outputOrder": "0",\
        "inputNodeId": "inter2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265468499",\
        "outputNodeId": "color3",\
        "outputId": "c2",\
        "outputOrder": "0",\
        "inputNodeId": "inter2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713265518150",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "inter2",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1713265494616",\
        "outputNodeId": "color2",\
        "outputId": "space",\
        "outputOrder": "1",\
        "inputNodeId": "color4",\
        "inputId": "space",\
        "list": "false"\
        },\
        {\
        "created": "1713265485007",\
        "outputNodeId": "inter",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color4",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1713265486490",\
        "outputNodeId": "inter2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color4",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1713266135382",\
        "outputNodeId": "bias",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color4",\
        "inputId": "c3",\
        "list": "false"\
        },\
        {\
        "created": "1713269421257",\
        "outputNodeId": "fill3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "repeat3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713270062867",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "repeat3",\
        "inputId": "loop",\
        "list": "false"\
        },\
        {\
        "created": "1713266548621",\
        "outputNodeId": "num",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "math",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713266440466",\
        "outputNodeId": "color",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "colorStop",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1713265018155",\
        "outputNodeId": "repeat",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713265018156",\
        "outputNodeId": "point2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713265018157",\
        "outputNodeId": "point",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine",\
        "inputId": "h2",\
        "list": "false"\
        },\
        {\
        "created": "1713269491072",\
        "outputNodeId": "random3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache6",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713269439583",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "select",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713269485711",\
        "outputNodeId": "random2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713269447958",\
        "outputNodeId": "repeat3",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine5",\
        "inputId": "h0",\
        "list": "true"\
        },\
        {\
        "created": "1713269447959",\
        "outputNodeId": "select",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "combine5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713268783288",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "4",\
        "inputNodeId": "inter5",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713268788341",\
        "outputNodeId": "color8",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "inter5",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713276275283",\
        "outputNodeId": "random12",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter5",\
        "inputId": "amount",\
        "list": "false"\
        },\
        {\
        "created": "1713266492340",\
        "outputNodeId": "color2",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "colorStop4",\
        "inputId": "fill",\
        "list": "false"\
        },\
        {\
        "created": "1713265203785",\
        "outputNodeId": "range",\
        "outputId": "h0",\
        "outputOrder": "2",\
        "inputNodeId": "combine3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265203785",\
        "outputNodeId": "noise",\
        "outputId": "h0",\
        "outputOrder": "1",\
        "inputNodeId": "combine3",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713267023227",\
        "outputNodeId": "random7",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache3",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713269963568",\
        "outputNodeId": "random14",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color7",\
        "inputId": "c1",\
        "list": "false"\
        },\
        {\
        "created": "1713270034191",\
        "outputNodeId": "noise4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "color7",\
        "inputId": "c2",\
        "list": "false"\
        },\
        {\
        "created": "1713267246755",\
        "outputNodeId": "fill",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713267246757",\
        "outputNodeId": "fill2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "grad2",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713269635874",\
        "outputNodeId": "random13",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "cache7",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265374405",\
        "outputNodeId": "repeat2",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "children",\
        "list": "true"\
        },\
        {\
        "created": "1713265555689",\
        "outputNodeId": "point2",\
        "outputId": "x",\
        "outputOrder": "1",\
        "inputNodeId": "frame",\
        "inputId": "width",\
        "list": "false"\
        },\
        {\
        "created": "1713267457935",\
        "outputNodeId": "combine4",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "frame",\
        "inputId": "props",\
        "list": "true"\
        },\
        {\
        "created": "1713265462313",\
        "outputNodeId": "color2",\
        "outputId": "c1",\
        "outputOrder": "0",\
        "inputNodeId": "inter",\
        "inputId": "h0",\
        "list": "false"\
        },\
        {\
        "created": "1713265464824",\
        "outputNodeId": "color3",\
        "outputId": "c1",\
        "outputOrder": "0",\
        "inputNodeId": "inter",\
        "inputId": "h1",\
        "list": "false"\
        },\
        {\
        "created": "1713265516267",\
        "outputNodeId": "range6",\
        "outputId": "h0",\
        "outputOrder": "0",\
        "inputNodeId": "inter",\
        "inputId": "amount",\
        "list": "false"\
        }\
    ]\
}';