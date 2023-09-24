const presetBooksOnShelf = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence6",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8047",\
            "y": "-350",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "step", "-0.4,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence5",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7476",\
            "y": "129",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "start", "-0.03,2"],\
                    ["NUM#", "step", "0.004,3"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "ACCUM",\
            "id": "accum",\
            "name": "accumulate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7476",\
            "y": "-157",\
            "z": "2"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6665",\
            "y": "-329",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "start", "90,0"],\
                    ["NUM#", "step", "0.7,1"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4430",\
            "y": "-127",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "seed", "8084,0"],\
                    ["NUM#", "max", "400,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3665",\
            "y": "-1684",\
            "z": "5",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "48,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "4175",\
            "y": "-384",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "value", "82.32000000000001,1"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "0.2,1"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5773",\
            "y": "48",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "angle", "180,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4435",\
            "y": "349",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "3003,0"],\
                    ["NUM#", "max", "400,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4734",\
            "y": "433",\
            "z": "9",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad2",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4348",\
            "y": "-1100",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "y", "-60,0"],\
                    ["NUM#", "size", "150,0"],\
                    ["NUM#", "angle", "90,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5115",\
            "y": "152",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "x", "20,0"],\
                    ["NUM#", "y", "30,0"]\
            ]\
            },\
            {\
            "type": "ABS",\
            "id": "abs",\
            "name": "absolute",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3979",\
            "y": "287",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "value", "56.185635645223876,1"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill2",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4771",\
            "y": "4",\
            "z": "13",\
            "params":\
            [\
                    ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                    ["NUM#", "opacity", "75,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4422",\
            "y": "-304",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "value", "370.44000000000005,1"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "0.9,1"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine6",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5274",\
            "y": "-7",\
            "z": "15",\
            "width": "115.41300100514482",\
            "height": "51"\
            },\
            {\
            "type": "LIST",\
            "id": "list2",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2195",\
            "y": "-924",\
            "z": "16",\
            "width": "120",\
            "height": "164",\
            "params":\
            [\
                    ["NUM#", "0", "1843,0"],\
                    ["NUM#", "1", "7262,0"],\
                    ["NUM#", "2", "1233,0"],\
                    ["NUM#", "3", "8084,0"],\
                    ["NUM#", "4", "3003,0"],\
                    ["NUM#", "5", "1885,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse3",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5942",\
            "y": "7",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "condition", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math6",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3831",\
            "y": "-820",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "value", "33,0"],\
                    ["NUM#", "operand", "-15,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2987",\
            "y": "-251",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "index", "52,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4019",\
            "y": "-1090",\
            "z": "20",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "28,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5914",\
            "y": "-1085",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "width", "411.6,1"],\
                    ["NUM#", "height", "82.32000000000001,1"],\
                    ["NUM#", "round", "2,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4920",\
            "y": "-258",\
            "z": "22",\
            "params":\
            [\
                    ["TEXT#", "text", "In%20a%20Free%20State", "center"],\
                    ["NUM#", "width", "370.44000000000005,1"],\
                    ["NUM#", "height", "30,0"],\
                    ["TEXT#", "font", "Arimo"],\
                    ["NUM#", "size", "20,0"],\
                    ["NUM#", "alignV", "2,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math5",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3831",\
            "y": "-998",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "value", "28,0"],\
                    ["NUM#", "operand", "-20,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4455",\
            "y": "-1451",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "y", "7,0"],\
                    ["NUM#", "blur", "20,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 40,0 0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2933",\
            "y": "-1518",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "seed", "1843,0"],\
                    ["NUM#", "min", "-40,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4041",\
            "y": "-1686",\
            "z": "26",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "-52,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4285",\
            "y": "-1528",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "y", "160,0"],\
                    ["NUM#", "size", "220,0"],\
                    ["NUM#", "angle", "-90,0"]\
            ]\
            },\
            {\
            "type": "NBOOL",\
            "id": "bool",\
            "name": "boolean",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4943",\
            "y": "-435",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4628",\
            "y": "-1501",\
            "z": "29",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5725",\
            "y": "-957",\
            "z": "30",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2553",\
            "y": "-255",\
            "z": "31",\
            "width": "239.31498377267474",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2CJaideva%20Goswami%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2CJohn%20Foreman%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2CStephen%20Hawking%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2CStephen%20Dubner%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2CEdward%20Said%2Chistory%2C197%2CPenguin%0AThe%20Nature%20of%20Statistical%20Learning%20Theory%2CVladimir%20Vapnik%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2CV%20P%20Menon%2Chistory%2C217%2COrient%20Blackswan%0AThe%20Drunkard\'s%20Walk%2CLeonard%20Mlodinow%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2CFrank%20Shih%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2CMaria%20Konnikova%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2CKurt%20Vonnegut%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2CCedric%20Villani%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2CGerald%20Sussman%2Ccomputer_science%2C240%2CMIT%20Press%0AThe%20Age%20of%20Wrath%2CAbraham%20Eraly%2Chistory%2C238%2CPenguin%0AThe%20Trial%2CFrank%20Kafka%2Cfiction%2C198%2CRandom%20House%0AStatistical%20Decision%20Theory\'%2CJohn%20Pratt%2Cdata_science%2C236%2CMIT%20Press%0AData%20Mining%20Handbook%2CRobert%20Nisbet%2Cdata_science%2C242%2CApress%0AThe%20New%20Machiavelli%2CH.%20G.%20Wells%2Cfiction%2C180%2CPenguin%0APhysics%20%26%20Philosophy%2CWerner%20Heisenberg%2Cscience%2C197%2CPenguin%0AMaking%20Software%2CAndy%20Oram%2Ccomputer_science%2C232%2CO\'Reilly%0AVol%20I%20Analysis%2CTerence%20Tao%2Cmathematics%2C248%2CHBA%0AMachine%20Learning%20for%20Hackers%2CDrew%20Conway%2Cdata_science%2C233%2CO\'Reilly%0AThe%20Signal%20and%20the%20Noise%2CNate%20Silver%2Cdata_science%2C233%2CPenguin%0APython%20for%20Data%20Analysis%2CWes%20McKinney%2Cdata_science%2C233%2CO\'Reilly%0AIntroduction%20to%20Algorithms%2CThomas%20Cormen%2Ccomputer_science%2C234%2CMIT%20Press%0AThe%20Beautiful%20and%20the%20Damned%2CSiddhartha%20Deb%2Cnonfiction%2C198%2CPenguin%0AThe%20Outsider%2CAlbert%20Camus%2Cfiction%2C198%2CPenguin%0AThe%20-%20Vol%20I%20Complete%20Sherlock%20Holmes%2CArthur%20Conan%20Doyle%2Cfiction%2C176%2CRandom%20House%0AThe%20-%20Vol%20II%20Complete%20Sherlock%20Holmes%2CArthur%20Conan%20Doyle%2Cfiction%2C176%2CRandom%20House%0AThe%20Wealth%20of%20Nations%2CAdam%20Smith%2Ceconomics%2C175%2CRandom%20House%0AThe%20Pillars%20of%20the%20Earth%2CKen%20Follett%2Cfiction%2C176%2CRandom%20House%0AMein%20Kampf%2CAdolf%20Hitler%2Cnonfiction%2C212%2CRupa%0AThe%20Tao%20of%20Physics%2CFritjof%20Capra%2Cscience%2C179%2CPenguin%0ASurely%20You\'re%20Joking%20Mr%20Feynman%2CRichard%20Feynman%2Cscience%2C198%2CRandom%20House%0AA%20Farewell%20to%20Arms%2CErnest%20Hemingway%2Cfiction%2C179%2CRupa%0AThe%20Veteran%2CFrederick%20Forsyth%2Cfiction%2C177%2CTransworld%0AFalse%20Impressions%2CJeffery%20Archer%2Cfiction%2C177%2CPan%0AThe%20Last%20Lecture%2CRandy%20Pausch%2Cnonfiction%2C197%2CHyperion%0AReturn%20of%20the%20Primitive%2CAyn%20Rand%2Cphilosophy%2C202%2CPenguin%0AJurassic%20Park%2CMichael%20Crichton%2Cfiction%2C174%2CRandom%20House%0AA%20Russian%20Journal%2CJohn%20Steinbeck%2Cnonfiction%2C196%2CPenguin%0ATales%20of%20Mystery%20and%20Imagination%2CEdgar%20Allen%20Poe%2Cfiction%2C172%2CHarperCollins%0AFreakonomics%2CStephen%20Dubner%2Ceconomics%2C197%2CPenguin%0AThe%20Hidden%20Connections%2CFritjof%20Capra%2Cscience%2C197%2CHarperCollins%0AThe%20Story%20of%20Philosophy%2CWill%20Durant%2Cphilosophy%2C170%2CPocket%0AAsami%20Asami%2CP%20L%20Deshpande%2Cfiction%2C205%2CMauj%0AJournal%20of%20a%20Novel%2CJohn%20Steinbeck%2Cfiction%2C196%2CPenguin%0AOnce%20There%20Was%20a%20War%2CJohn%20Steinbeck%2Cnonfiction%2C196%2CPenguin%0AThe%20Moon%20is%20Down%2CJohn%20Steinbeck%2Cfiction%2C196%2CPenguin%0AThe%20Brethren%2CJohn%20Grisham%2Cfiction%2C174%2CRandom%20House%0AIn%20a%20Free%20State%2CV.%20S.%20Naipaul%2Cfiction%2C196%2CRupa%0ACatch%2022%2CJoseph%20Heller%2Cfiction%2C178%2CRandom%20House%0AThe%20Complete%20Mastermind%2CBBC%2Cnonfiction%2C178%2CBBC%0ADylan%20on%20Dylan%2CBob%20Dylan%2Cnonfiction%2C197%2CRandom%20House%0ASoft%20Computing%20%26%20Intelligent%20Systems%2CMadan%20Gupta%2Cdata_science%2C242%2CElsevier%0ATextbook%20of%20Economic%20Theory%2CAlfred%20Stonier%2Ceconomics%2C242%2CPearson%0AEconometric%20Analysis%2CW.%20H.%20Greene%2Ceconomics%2C242%2CPearson%0ALearning%20OpenCV%2CGary%20Bradsky%2Cdata_science%2C232%2CO\'Reilly%0AData%20Structures%20Using%20C%20%26%20C%2B%2B%2CAndrew%20Tanenbaum%2Ccomputer_science%2C235%2CPrentice%20Hall%0AA%20Modern%20Approach%20Computer%20Vision%2CDavid%20Forsyth%2Cdata_science%2C255%2CPearson%0APrinciples%20of%20Communication%20Systems%2CSchilling%20Taub%2Ccomputer_science%2C240%2CTMH%0ALet%20Us%20C%2CYashwant%20Kanetkar%2Ccomputer_science%2C213%2CPrentice%20Hall%0AThe%20Amulet%20of%20Samarkand%2CJonathan%20Stroud%2Cfiction%2C179%2CRandom%20House%0ACrime%20and%20Punishment%2CFyodor%20Dostoevsky%2Cfiction%2C180%2CPenguin%0AAngels%20%26%20Demons%2CDan%20Brown%2Cfiction%2C178%2CRandom%20House%0AThe%20Argumentative%20Indian%2CAmartya%20Sen%2Cnonfiction%2C209%2CPicador%0ASea%20of%20Poppies%2CAmitav%20Ghosh%2Cfiction%2C197%2CPenguin%0AThe%20Idea%20of%20Justice%2CAmartya%20Sen%2Cnonfiction%2C212%2CPenguin%0AA%20Raisin%20in%20the%20Sun%2CLorraine%20Hansberry%2Cfiction%2C175%2CPenguin%0AAll%20the%20President\'s%20Men%2CBob%20Woodward%2Chistory%2C177%2CRandom%20House%0AA%20Prisoner%20of%20Birth%2CJeffery%20Archer%2Cfiction%2C176%2CPan%0AScoop!%2CKuldip%20Nayar%2Chistory%2C216%2CHarperCollins%0AAhe%20Manohar%20Tari%2CSunita%20Deshpande%2Cnonfiction%2C213%2CMauj%0AThe%20Last%20Mughal%2CWilliam%20Dalrymple%2Chistory%2C199%2CPenguin%0AVol%2039%20No.%201%20Social%20Choice%20%26%20Welfare%2CVarious%2Ceconomics%2C235%2CSpringer%0ARadiowaril%20Bhashane%20%26%20Shrutika%2CP%20L%20Deshpande%2Cnonfiction%2C213%2CMauj%0AGun%20Gayin%20Awadi%2CP%20L%20Deshpande%2Cnonfiction%2C212%2CMauj%0AAghal%20Paghal%2CP%20L%20Deshpande%2Cnonfiction%2C212%2CMauj%0AMaqta-e-Ghalib%2CSanjay%20Garg%2Cfiction%2C221%2CMauj%0ABeyond%20Degrees%2C%2Cnonfiction%2C222%2CHarperCollins%0AManasa%2CV%20P%20Kale%2Cnonfiction%2C213%2CMauj%0AIndia%20from%20Midnight%20to%20Milennium%2CShashi%20Tharoor%2Chistory%2C198%2CPenguin%0AThe%20World\'s%20Greatest%20Trials%2C%2Chistory%2C210%2C%0AThe%20Great%20Indian%20Novel%2CShashi%20Tharoor%2Cfiction%2C198%2CPenguin%0AO%20Jerusalem!%2CDominique%20Lapierre%2Chistory%2C217%2Cvikas%0AThe%20City%20of%20Joy%2CDominique%20Lapierre%2Cfiction%2C177%2Cvikas%0AFreedom%20at%20Midnight%2CDominique%20Lapierre%2Chistory%2C167%2Cvikas%0AThe%20Winter%20of%20Our%20Discontent%2CJohn%20Steinbeck%2Cfiction%2C196%2CPenguin%0AOn%20Education%2CBertrand%20Russell%2Cphilosophy%2C203%2CRoutledge%0AFree%20Will%2CSam%20Harris%2Cphilosophy%2C203%2CFreePress%0ABookless%20in%20Baghdad%2CShashi%20Tharoor%2Cnonfiction%2C206%2CPenguin%0AThe%20Case%20of%20the%20Lame%20Canary%2CEarle%20Stanley%20Gardner%2Cfiction%2C179%2C%0AThe%20Theory%20of%20Everything%2CStephen%20Hawking%2Cscience%2C217%2CJaico%0ANew%20Markets%20%26%20Other%20Essays%2CPeter%20Drucker%2Ceconomics%2C176%2CPenguin%0AElectric%20Universe%2CDavid%20Bodanis%2Cscience%2C201%2CPenguin%0AThe%20Hunchback%20of%20Notre%20Dame%2CVictor%20Hugo%2Cfiction%2C175%2CRandom%20House%0ABurning%20Bright%2CJohn%20Steinbeck%2Cfiction%2C175%2CPenguin%0AThe%20Age%20of%20Discontuinity%2CPeter%20Drucker%2Ceconomics%2C178%2CRandom%20House%0ADoctor%20in%20the%20Nude%2CRichard%20Gordon%2Cfiction%2C179%2CPenguin%0ADown%20and%20Out%20in%20Paris%20%26%20London%2CGeorge%20Orwell%2Cnonfiction%2C179%2CPenguin%0AIdentity%20%26%20Violence%2CAmartya%20Sen%2Cphilosophy%2C219%2CPenguin%0ABeyond%20the%20Three%20Seas%2CWilliam%20Dalrymple%2Chistory%2C197%2CRandom%20House%0AThe%20World\'s%20Greatest%20Short%20Stories%2C%2Cfiction%2C217%2CJaico%0ATalking%20Straight%2CLee%20Iacoca%2Cnonfiction%2C175%2C%0AVol%203%20Maugham\'s%20Collected%20Short%20Stories%2CWilliam%20S%20Maugham%2Cfiction%2C171%2CVintage%0AThe%20Phantom%20of%20Manhattan%2CFrederick%20Forsyth%2Cfiction%2C180%2C%0AAshenden%20of%20The%20British%20Agent%2CWilliam%20S%20Maugham%2Cfiction%2C160%2CVintage%0AZen%20%26%20The%20Art%20of%20Motorcycle%20Maintenance%2CRobert%20Pirsig%2Cphilosophy%2C172%2CVintage%0AThe%20Great%20War%20for%20Civilization%2CRobert%20Fisk%2Chistory%2C197%2CHarperCollins%0AWe%20the%20Living%2CAyn%20Rand%2Cfiction%2C178%2CPenguin%0AThe%20Artist%20and%20the%20Mathematician%2CAmir%20Aczel%2Cscience%2C186%2CHighStakes%0AHistory%20of%20Western%20Philosophy%2CBertrand%20Russell%2Cphilosophy%2C213%2CRoutledge%0ASelected%20Short%20Stories%2C%2Cfiction%2C215%2CJaico%0ARationality%20%26%20Freedom%2CAmartya%20Sen%2Ceconomics%2C213%2CSpringer%0AClash%20of%20Civilizations%20and%20Remaking%20of%20the%20World%20Order%2CSamuel%20Huntington%2Chistory%2C228%2CSimon%26Schuster%0AUncommon%20Wisdom%2CFritjof%20Capra%2Cnonfiction%2C197%2CFontana%0AOne%2CRichard%20Bach%2Cnonfiction%2C172%2CDell%0AKarl%20Marx%20Biography%2C%2Cnonfiction%2C162%2C%0ATo%20Sir%20With%20Love%2CBraithwaite%2Cfiction%2C197%2CPenguin%0AHalf%20A%20Life%2CV%20S%20Naipaul%2Cfiction%2C196%2C%0AThe%20Discovery%20of%20India%2CJawaharlal%20Nehru%2Chistory%2C230%2C%0AApulki%2CP%20L%20Deshpande%2Cnonfiction%2C211%2C%0AUnpopular%20Essays%2CBertrand%20Russell%2Cphilosophy%2C198%2C%0AThe%20Deceiver%2CFrederick%20Forsyth%2Cfiction%2C178%2C%0AVeil%3A%20Secret%20Wars%20of%20the%20CIA%2CBob%20Woodward%2Chistory%2C171%2C%0AChar%20Shabda%2CP%20L%20Deshpande%2Cnonfiction%2C214%2C%0ARosy%20is%20My%20Relative%2CGerald%20Durrell%2Cfiction%2C176%2C%0AThe%20Moon%20and%20Sixpence%2CWilliam%20S%20Maugham%2Cfiction%2C180%2C%0APolitical%20Philosophers%2C%2Cphilosophy%2C162%2C%0AA%20Short%20History%20of%20the%20World%2CH%20G%20Wells%2Chistory%2C197%2C%0AThe%20Trembling%20of%20a%20Leaf%2CWilliam%20S%20Maugham%2Cfiction%2C205%2C%0ADoctor%20on%20the%20Brain%2CRichard%20Gordon%2Cfiction%2C204%2C%0ASimpsons%20%26%20Their%20Mathematical%20Secrets%2CSimon%20Singh%2Cscience%2C233%2C%0APattern%20Classification%2CHart%20Duda%2Cdata_science%2C241%2C%0AFrom%20Beirut%20to%20Jerusalem%2CThomas%20Friedman%2Chistory%2C202%2C%0AThe%20Code%20Book%2CSimon%20Singh%2Cscience%2C197%2C%0AThe%20Age%20of%20the%20Warrior%2CRobert%20Fisk%2Chistory%2C197%2C%0AFinal%20Crisis%2C%2Ccomic%2C257%2C%0AThe%20Killing%20Joke%2C%2Ccomic%2C283%2C%0AFlashpoint%2C%2Ccomic%2C265%2C%0ABatman%20Earth%20One%2C%2Ccomic%2C265%2C%0ACrisis%20on%20Infinite%20Earths%2C%2Ccomic%2C258%2C%0AThe%20Numbers%20Behind%20Numb3rs%2CKeith%20Devlin%2Cscience%2C202%2C%0ASuperman%20Earth%20One%20-%201%2C%2Ccomic%2C259%2C%0ASuperman%20Earth%20One%20-%202%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20Throne%20of%20Atlantis%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20The%20Villain\'s%20Journey%2C%2Ccomic%2C258%2C%0AThe%20Death%20of%20Superman%2C%2Ccomic%2C258%2C%0AHistory%20of%20the%20DC%20Universe%2C%2Ccomic%2C258%2C%0ABatman%3A%20The%20Long%20Halloween%2C%2Ccomic%2C258%2C%0AA%20Life%20in%20Letters%2CJohn%20Steinbeck%2Cnonfiction%2C196%2C%0AThe%20Information%2CJames%20Gleick%2Cscience%2C233%2C%0Avol%20106%20No%203%20Journal%20of%20Economics%2C%2Ceconomics%2C235%2C%0AElements%20of%20Information%20Theory%2CJoy%20Thomas%2Cdata_science%2C229%2C%0APower%20Electronics%20-%20Rashid%2CMuhammad%20Rashid%2Ccomputer_science%2C235%2C%0APower%20Electronics%20-%20Mohan%2CNed%20Mohan%2Ccomputer_science%2C237%2C%0ANeural%20Networks%2CSimon%20Haykin%2Cdata_science%2C240%2C%0AThe%20Grapes%20of%20Wrath%2CJohn%20Steinbeck%2Cfiction%2C196%2C%0AVyakti%20ani%20Valli%2CP%20L%20Deshpande%2Cnonfiction%2C211%2C%0AStatistical%20Learning%20Theory%2CVladimir%20Vapnik%2Cdata_science%2C228%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Tainted%20Throne%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Brothers%20at%20War%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Ruler%20of%20the%20World%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Serpent\'s%20Tooth%2CAlex%20Rutherford%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Raiders%20from%20the%20North%2CAlex%20Rutherford%2Chistory%2C180%2C%0AMossad%2CMichael%20Baz-Zohar%2Chistory%2C236%2C%0AJim%20Corbett%20Omnibus%2CJim%20Corbett%2Cnonfiction%2C223%2C%0A20000%20Leagues%20Under%20the%20Sea%2CJules%20Verne%2Cfiction%2C190%2C%0ABatatyachi%20Chal%2CDeshpande%20P%20L%2Cfiction%2C200%2C%0AHafasavnuk%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0AUrlasurla%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0APointers%20in%20C%2CYashwant%20Kanetkar%2Ccomputer_science%2C213%2C%0AThe%20Cathedral%20and%20the%20Bazaar%2CEric%20Raymond%2Ccomputer_science%2C217%2C%0ADesign%20with%20OpAmps%2CSergio%20Franco%2Ccomputer_science%2C240%2C%0AThink%20Complexity%2CAllen%20Downey%2Cdata_science%2C230%2C%0AThe%20Devil\'s%20Advocate%2CMorris%20West%2Cfiction%2C178%2C%0AAyn%20Rand%20Answers%2CAyn%20Rand%2Cphilosophy%2C203%2C%0APhilosophy%3A%20Who%20Needs%20It%2CAyn%20Rand%2Cphilosophy%2C171%2C%0AThe%20World\'s%20Great%20Thinkers%2C%2Cphilosophy%2C189%2C%0AData%20Analysis%20with%20Open%20Source%20Tools%2CPhillip%20Janert%2Cdata_science%2C230%2C%0ABroca\'s%20Brain%2CCarl%20Sagan%2Cscience%2C174%2C%0AMen%20of%20Mathematics%2CE%20T%20Bell%2Cmathematics%2C217%2C%0AOxford%20book%20of%20Modern%20Science%20Writing%2CRichard%20Dawkins%2Cscience%2C240%2C%0AJudiciary%20and%20Democracy%20Justice%2CSudhanshu%20Ranjan%2Cphilosophy%2C224%2C%0AThe%20Arthashastra%2CKautiyla%2Cphilosophy%2C214%2C%0AWe%20the%20People%2CPalkhivala%2Cphilosophy%2C216%2C%0AWe%20the%20Nation%2CPalkhivala%2Cphilosophy%2C216%2C%0AThe%20Courtroom%20Genius%2CSorabjee%2Cnonfiction%2C217%2C%0ADongri%20to%20Dubai%2CHussain%20Zaidi%2Cnonfiction%2C216%2C%0AFoundation%20History%20of%20England%2CPeter%20Ackroyd%2Chistory%2C197%2C%0ACity%20of%20Djinns%2CWilliam%20Dalrymple%2Chistory%2C198%2C%0AIndia\'s%20Legal%20System%2CNariman%2Cnonfiction%2C177%2C%0AMore%20Tears%20to%20Cry%2CJean%20Sassoon%2Cfiction%2C235%2C%0AThe%20Ropemaker%2CPeter%20Dickinson%2Cfiction%2C196%2C%0AAngels%20%26%20Demons%2CDan%20Brown%2Cfiction%2C170%2C%0AThe%20Judge%2C%2Cfiction%2C170%2C%0AThe%20Attorney%2C%2Cfiction%2C170%2C%0AThe%20Prince%2CMachiavelli%2Cphilosophy%2C173%2C%0AEyeless%20in%20Gaza%2CAldous%20Huxley%2Cfiction%2C180%2C%0ATales%20of%20Beedle%20the%20Bard%2CJ%20K%20Rowling%2Cfiction%2C184%2C%0AGirl%20with%20the%20Dragon%20Tattoo%2CSteig%20Larsson%2Cfiction%2C179%2C%0AGirl%20who%20kicked%20the%20Hornet\'s%20Nest%2CSteig%20Larsson%2Cfiction%2C179%2C%0AGirl%20who%20played%20with%20Fire%2CSteig%20Larsson%2Cfiction%2C179%2C%0ABatman%20Handbook%2C%2Ccomic%2C270%2C%0AMurphy\'s%20Law%2C%2Cnonfiction%2C178%2C%0AStructure%20and%20Randomness%2CTerence%20Tao%2Cmathematics%2C252%2C%0AImage%20Processing%20with%20MATLAB%2CSteve%20Eddins%2Csignal_processing%2C241%2C%0AAnimal%20Farm%2CGeorge%20Orwell%2Cfiction%2C180%2C%0AThe%20Idiot%2CFyodor%20Dostoevsky%2Cfiction%2C197%2C%0AA%20Christmas%20Carol%2CCharles%20Dickens%2Cfiction%2C196%2C", "left"],\
                    ["TEXT#", "what", "%22(%5B%5E%22%5D*)%2C%20(%5B%5E%22%5D*)%22", "center"],\
                    ["TEXT#", "with", "%242%20%241", "center"],\
                    ["NUM#", "regex", "1,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence4",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7527",\
            "y": "11",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "start", "3,0"],\
                    ["NUM#", "step", "0.07,3"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center3",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5625",\
            "y": "46",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "centerY", "65,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill4",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4816",\
            "y": "-627",\
            "z": "34",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                    ["NUM#", "opacity", "40,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3611",\
            "y": "-1758",\
            "z": "35",\
            "width": "1167.5093567440279",\
            "height": "544.510129930884",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel5",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "4776",\
            "y": "-825",\
            "z": "36",\
            "width": "787.2715194875075",\
            "height": "410.2452782933203",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4603",\
            "y": "-146",\
            "z": "37",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "30,0"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6884",\
            "y": "-553",\
            "z": "38",\
            "params":\
            [\
                    ["NUM#", "angle", "107.5,1"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4926",\
            "y": "155",\
            "z": "39",\
            "params":\
            [\
                    ["TEXT#", "text", "V.%20S.%20Naipaul", "center"],\
                    ["NUM#", "width", "370.44000000000005,1"],\
                    ["NUM#", "height", "30,0"],\
                    ["TEXT#", "font", "Almendra%20SC"],\
                    ["NUM#", "size", "16,0"],\
                    ["NUM#", "alignV", "2,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4634",\
            "y": "293",\
            "z": "40",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "30,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math7",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7694",\
            "y": "-276",\
            "z": "41",\
            "params":\
            [\
                    ["NUM#", "value", "2172.97,3"]\
            ]\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2042",\
            "y": "-923",\
            "z": "42"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3617",\
            "y": "121",\
            "z": "43",\
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
            "type": "GRAD",\
            "id": "grad3",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5398",\
            "y": "-774",\
            "z": "44"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2934",\
            "y": "-1381",\
            "z": "45",\
            "params":\
            [\
                    ["NUM#", "seed", "7262,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7179",\
            "y": "-606",\
            "z": "46",\
            "width": "1447",\
            "height": "887.8927327301616",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3635",\
            "y": "377",\
            "z": "47",\
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
            "type": "T2N",\
            "id": "textToNum",\
            "name": "to%20number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3621",\
            "y": "-420",\
            "z": "48",\
            "params":\
            [\
                    ["NUM#", "value", "196,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "6632",\
            "y": "-615",\
            "z": "49",\
            "width": "400",\
            "height": "425.6608238154229",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse2",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5213",\
            "y": "-1291",\
            "z": "50",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color8",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3662",\
            "y": "-912",\
            "z": "51",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "48,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3677",\
            "y": "-1093",\
            "z": "52",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "48,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill3",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4819",\
            "y": "-748",\
            "z": "53",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 0,0 0,0"],\
                    ["NUM#", "opacity", "0,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center2",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5444",\
            "y": "0",\
            "z": "54"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8424",\
            "y": "-240",\
            "z": "55",\
            "params":\
            [\
                    ["NUM#", "count", "26,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3620",\
            "y": "-1151",\
            "z": "56",\
            "width": "885",\
            "height": "438",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math4",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3867",\
            "y": "-393",\
            "z": "57",\
            "params":\
            [\
                    ["NUM#", "value", "411.6,1"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2.1,1"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2216",\
            "y": "-254",\
            "z": "58",\
            "width": "309",\
            "height": "213.83694298372413",\
            "params":\
            [\
                    ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2C%22Goswami%2C%20Jaideva%22%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2C%22Foreman%2C%20John%22%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2C%22Hawking%2C%20Stephen%22%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2C%22Said%2C%20Edward%22%2Chistory%2C197%2CPenguin%0A%22Nature%20of%20Statistical%20Learning%20Theory%2C%20The%22%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2C%22Menon%2C%20V%20P%22%2Chistory%2C217%2COrient%20Blackswan%0A%22Drunkard\'s%20Walk%2C%20The%22%2C%22Mlodinow%2C%20Leonard%22%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2C%22Shih%2C%20Frank%22%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2C%22Konnikova%2C%20Maria%22%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2C%22Vonnegut%2C%20Kurt%22%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2C%22Villani%2C%20Cedric%22%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2C%22Sussman%2C%20Gerald%22%2Ccomputer_science%2C240%2CMIT%20Press%0A%22Age%20of%20Wrath%2C%20The%22%2C%22Eraly%2C%20Abraham%22%2Chistory%2C238%2CPenguin%0A%22Trial%2C%20The%22%2C%22Kafka%2C%20Frank%22%2Cfiction%2C198%2CRandom%20House%0AStatistical%20Decision%20Theory\'%2C%22Pratt%2C%20John%22%2Cdata_science%2C236%2CMIT%20Press%0AData%20Mining%20Handbook%2C%22Nisbet%2C%20Robert%22%2Cdata_science%2C242%2CApress%0A%22New%20Machiavelli%2C%20The%22%2C%22Wells%2C%20H.%20G.%22%2Cfiction%2C180%2CPenguin%0APhysics%20%26%20Philosophy%2C%22Heisenberg%2C%20Werner%22%2Cscience%2C197%2CPenguin%0AMaking%20Software%2C%22Oram%2C%20Andy%22%2Ccomputer_science%2C232%2CO\'Reilly%0A%22Analysis%2C%20Vol%20I%22%2C%22Tao%2C%20Terence%22%2Cmathematics%2C248%2CHBA%0AMachine%20Learning%20for%20Hackers%2C%22Conway%2C%20Drew%22%2Cdata_science%2C233%2CO\'Reilly%0A%22Signal%20and%20the%20Noise%2C%20The%22%2C%22Silver%2C%20Nate%22%2Cdata_science%2C233%2CPenguin%0APython%20for%20Data%20Analysis%2C%22McKinney%2C%20Wes%22%2Cdata_science%2C233%2CO\'Reilly%0AIntroduction%20to%20Algorithms%2C%22Cormen%2C%20Thomas%22%2Ccomputer_science%2C234%2CMIT%20Press%0A%22Beautiful%20and%20the%20Damned%2C%20The%22%2C%22Deb%2C%20Siddhartha%22%2Cnonfiction%2C198%2CPenguin%0A%22Outsider%2C%20The%22%2C%22Camus%2C%20Albert%22%2Cfiction%2C198%2CPenguin%0A%22Complete%20Sherlock%20Holmes%2C%20The%20-%20Vol%20I%22%2C%22Doyle%2C%20Arthur%20Conan%22%2Cfiction%2C176%2CRandom%20House%0A%22Complete%20Sherlock%20Holmes%2C%20The%20-%20Vol%20II%22%2C%22Doyle%2C%20Arthur%20Conan%22%2Cfiction%2C176%2CRandom%20House%0A%22Wealth%20of%20Nations%2C%20The%22%2C%22Smith%2C%20Adam%22%2Ceconomics%2C175%2CRandom%20House%0A%22Pillars%20of%20the%20Earth%2C%20The%22%2C%22Follett%2C%20Ken%22%2Cfiction%2C176%2CRandom%20House%0AMein%20Kampf%2C%22Hitler%2C%20Adolf%22%2Cnonfiction%2C212%2CRupa%0A%22Tao%20of%20Physics%2C%20The%22%2C%22Capra%2C%20Fritjof%22%2Cscience%2C179%2CPenguin%0ASurely%20You\'re%20Joking%20Mr%20Feynman%2C%22Feynman%2C%20Richard%22%2Cscience%2C198%2CRandom%20House%0A%22Farewell%20to%20Arms%2C%20A%22%2C%22Hemingway%2C%20Ernest%22%2Cfiction%2C179%2CRupa%0A%22Veteran%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C177%2CTransworld%0AFalse%20Impressions%2C%22Archer%2C%20Jeffery%22%2Cfiction%2C177%2CPan%0A%22Last%20Lecture%2C%20The%22%2C%22Pausch%2C%20Randy%22%2Cnonfiction%2C197%2CHyperion%0AReturn%20of%20the%20Primitive%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C202%2CPenguin%0AJurassic%20Park%2C%22Crichton%2C%20Michael%22%2Cfiction%2C174%2CRandom%20House%0A%22Russian%20Journal%2C%20A%22%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2CPenguin%0ATales%20of%20Mystery%20and%20Imagination%2C%22Poe%2C%20Edgar%20Allen%22%2Cfiction%2C172%2CHarperCollins%0AFreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C197%2CPenguin%0A%22Hidden%20Connections%2C%20The%22%2C%22Capra%2C%20Fritjof%22%2Cscience%2C197%2CHarperCollins%0A%22Story%20of%20Philosophy%2C%20The%22%2C%22Durant%2C%20Will%22%2Cphilosophy%2C170%2CPocket%0AAsami%20Asami%2C%22Deshpande%2C%20P%20L%22%2Cfiction%2C205%2CMauj%0AJournal%20of%20a%20Novel%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0AOnce%20There%20Was%20a%20War%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2CPenguin%0A%22Moon%20is%20Down%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0A%22Brethren%2C%20The%22%2C%22Grisham%2C%20John%22%2Cfiction%2C174%2CRandom%20House%0AIn%20a%20Free%20State%2C%22Naipaul%2C%20V.%20S.%22%2Cfiction%2C196%2CRupa%0ACatch%2022%2C%22Heller%2C%20Joseph%22%2Cfiction%2C178%2CRandom%20House%0A%22Complete%20Mastermind%2C%20The%22%2CBBC%2Cnonfiction%2C178%2CBBC%0ADylan%20on%20Dylan%2C%22Dylan%2C%20Bob%22%2Cnonfiction%2C197%2CRandom%20House%0ASoft%20Computing%20%26%20Intelligent%20Systems%2C%22Gupta%2C%20Madan%22%2Cdata_science%2C242%2CElsevier%0ATextbook%20of%20Economic%20Theory%2C%22Stonier%2C%20Alfred%22%2Ceconomics%2C242%2CPearson%0AEconometric%20Analysis%2C%22Greene%2C%20W.%20H.%22%2Ceconomics%2C242%2CPearson%0ALearning%20OpenCV%2C%22Bradsky%2C%20Gary%22%2Cdata_science%2C232%2CO\'Reilly%0AData%20Structures%20Using%20C%20%26%20C%2B%2B%2C%22Tanenbaum%2C%20Andrew%22%2Ccomputer_science%2C235%2CPrentice%20Hall%0A%22Computer%20Vision%2C%20A%20Modern%20Approach%22%2C%22Forsyth%2C%20David%22%2Cdata_science%2C255%2CPearson%0APrinciples%20of%20Communication%20Systems%2C%22Taub%2C%20Schilling%22%2Ccomputer_science%2C240%2CTMH%0ALet%20Us%20C%2C%22Kanetkar%2C%20Yashwant%22%2Ccomputer_science%2C213%2CPrentice%20Hall%0A%22Amulet%20of%20Samarkand%2C%20The%22%2C%22Stroud%2C%20Jonathan%22%2Cfiction%2C179%2CRandom%20House%0ACrime%20and%20Punishment%2C%22Dostoevsky%2C%20Fyodor%22%2Cfiction%2C180%2CPenguin%0AAngels%20%26%20Demons%2C%22Brown%2C%20Dan%22%2Cfiction%2C178%2CRandom%20House%0A%22Argumentative%20Indian%2C%20The%22%2C%22Sen%2C%20Amartya%22%2Cnonfiction%2C209%2CPicador%0ASea%20of%20Poppies%2C%22Ghosh%2C%20Amitav%22%2Cfiction%2C197%2CPenguin%0A%22Idea%20of%20Justice%2C%20The%22%2C%22Sen%2C%20Amartya%22%2Cnonfiction%2C212%2CPenguin%0A%22Raisin%20in%20the%20Sun%2C%20A%22%2C%22Hansberry%2C%20Lorraine%22%2Cfiction%2C175%2CPenguin%0AAll%20the%20President\'s%20Men%2C%22Woodward%2C%20Bob%22%2Chistory%2C177%2CRandom%20House%0A%22Prisoner%20of%20Birth%2C%20A%22%2C%22Archer%2C%20Jeffery%22%2Cfiction%2C176%2CPan%0AScoop!%2C%22Nayar%2C%20Kuldip%22%2Chistory%2C216%2CHarperCollins%0AAhe%20Manohar%20Tari%2C%22Deshpande%2C%20Sunita%22%2Cnonfiction%2C213%2CMauj%0A%22Last%20Mughal%2C%20The%22%2C%22Dalrymple%2C%20William%22%2Chistory%2C199%2CPenguin%0A%22Social%20Choice%20%26%20Welfare%2C%20Vol%2039%20No.%201%22%2CVarious%2Ceconomics%2C235%2CSpringer%0ARadiowaril%20Bhashane%20%26%20Shrutika%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C213%2CMauj%0AGun%20Gayin%20Awadi%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C212%2CMauj%0AAghal%20Paghal%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C212%2CMauj%0AMaqta-e-Ghalib%2C%22Garg%2C%20Sanjay%22%2Cfiction%2C221%2CMauj%0ABeyond%20Degrees%2C%2Cnonfiction%2C222%2CHarperCollins%0AManasa%2C%22Kale%2C%20V%20P%22%2Cnonfiction%2C213%2CMauj%0AIndia%20from%20Midnight%20to%20Milennium%2C%22Tharoor%2C%20Shashi%22%2Chistory%2C198%2CPenguin%0A%22World\'s%20Greatest%20Trials%2C%20The%22%2C%2Chistory%2C210%2C%0A%22Great%20Indian%20Novel%2C%20The%22%2C%22Tharoor%2C%20Shashi%22%2Cfiction%2C198%2CPenguin%0AO%20Jerusalem!%2C%22Lapierre%2C%20Dominique%22%2Chistory%2C217%2Cvikas%0A%22City%20of%20Joy%2C%20The%22%2C%22Lapierre%2C%20Dominique%22%2Cfiction%2C177%2Cvikas%0AFreedom%20at%20Midnight%2C%22Lapierre%2C%20Dominique%22%2Chistory%2C167%2Cvikas%0A%22Winter%20of%20Our%20Discontent%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2CPenguin%0AOn%20Education%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C203%2CRoutledge%0AFree%20Will%2C%22Harris%2C%20Sam%22%2Cphilosophy%2C203%2CFreePress%0ABookless%20in%20Baghdad%2C%22Tharoor%2C%20Shashi%22%2Cnonfiction%2C206%2CPenguin%0A%22Case%20of%20the%20Lame%20Canary%2C%20The%22%2C%22Gardner%2C%20Earle%20Stanley%22%2Cfiction%2C179%2C%0A%22Theory%20of%20Everything%2C%20The%22%2C%22Hawking%2C%20Stephen%22%2Cscience%2C217%2CJaico%0ANew%20Markets%20%26%20Other%20Essays%2C%22Drucker%2C%20Peter%22%2Ceconomics%2C176%2CPenguin%0AElectric%20Universe%2C%22Bodanis%2C%20David%22%2Cscience%2C201%2CPenguin%0A%22Hunchback%20of%20Notre%20Dame%2C%20The%22%2C%22Hugo%2C%20Victor%22%2Cfiction%2C175%2CRandom%20House%0ABurning%20Bright%2C%22Steinbeck%2C%20John%22%2Cfiction%2C175%2CPenguin%0A%22Age%20of%20Discontuinity%2C%20The%22%2C%22Drucker%2C%20Peter%22%2Ceconomics%2C178%2CRandom%20House%0ADoctor%20in%20the%20Nude%2C%22Gordon%2C%20Richard%22%2Cfiction%2C179%2CPenguin%0ADown%20and%20Out%20in%20Paris%20%26%20London%2C%22Orwell%2C%20George%22%2Cnonfiction%2C179%2CPenguin%0AIdentity%20%26%20Violence%2C%22Sen%2C%20Amartya%22%2Cphilosophy%2C219%2CPenguin%0ABeyond%20the%20Three%20Seas%2C%22Dalrymple%2C%20William%22%2Chistory%2C197%2CRandom%20House%0A%22World\'s%20Greatest%20Short%20Stories%2C%20The%22%2C%2Cfiction%2C217%2CJaico%0ATalking%20Straight%2C%22Iacoca%2C%20Lee%22%2Cnonfiction%2C175%2C%0A%22Maugham\'s%20Collected%20Short%20Stories%2C%20Vol%203%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C171%2CVintage%0A%22Phantom%20of%20Manhattan%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C180%2C%0AAshenden%20of%20The%20British%20Agent%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C160%2CVintage%0AZen%20%26%20The%20Art%20of%20Motorcycle%20Maintenance%2C%22Pirsig%2C%20Robert%22%2Cphilosophy%2C172%2CVintage%0A%22Great%20War%20for%20Civilization%2C%20The%22%2C%22Fisk%2C%20Robert%22%2Chistory%2C197%2CHarperCollins%0AWe%20the%20Living%2C%22Rand%2C%20Ayn%22%2Cfiction%2C178%2CPenguin%0A%22Artist%20and%20the%20Mathematician%2C%20The%22%2C%22Aczel%2C%20Amir%22%2Cscience%2C186%2CHighStakes%0AHistory%20of%20Western%20Philosophy%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C213%2CRoutledge%0ASelected%20Short%20Stories%2C%2Cfiction%2C215%2CJaico%0ARationality%20%26%20Freedom%2C%22Sen%2C%20Amartya%22%2Ceconomics%2C213%2CSpringer%0AClash%20of%20Civilizations%20and%20Remaking%20of%20the%20World%20Order%2C%22Huntington%2C%20Samuel%22%2Chistory%2C228%2CSimon%26Schuster%0AUncommon%20Wisdom%2C%22Capra%2C%20Fritjof%22%2Cnonfiction%2C197%2CFontana%0AOne%2C%22Bach%2C%20Richard%22%2Cnonfiction%2C172%2CDell%0AKarl%20Marx%20Biography%2C%2Cnonfiction%2C162%2C%0ATo%20Sir%20With%20Love%2CBraithwaite%2Cfiction%2C197%2CPenguin%0AHalf%20A%20Life%2C%22Naipaul%2C%20V%20S%22%2Cfiction%2C196%2C%0A%22Discovery%20of%20India%2C%20The%22%2C%22Nehru%2C%20Jawaharlal%22%2Chistory%2C230%2C%0AApulki%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C211%2C%0AUnpopular%20Essays%2C%22Russell%2C%20Bertrand%22%2Cphilosophy%2C198%2C%0A%22Deceiver%2C%20The%22%2C%22Forsyth%2C%20Frederick%22%2Cfiction%2C178%2C%0AVeil%3A%20Secret%20Wars%20of%20the%20CIA%2C%22Woodward%2C%20Bob%22%2Chistory%2C171%2C%0AChar%20Shabda%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C214%2C%0ARosy%20is%20My%20Relative%2C%22Durrell%2C%20Gerald%22%2Cfiction%2C176%2C%0A%22Moon%20and%20Sixpence%2C%20The%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C180%2C%0APolitical%20Philosophers%2C%2Cphilosophy%2C162%2C%0A%22Short%20History%20of%20the%20World%2C%20A%22%2C%22Wells%2C%20H%20G%22%2Chistory%2C197%2C%0A%22Trembling%20of%20a%20Leaf%2C%20The%22%2C%22Maugham%2C%20William%20S%22%2Cfiction%2C205%2C%0ADoctor%20on%20the%20Brain%2C%22Gordon%2C%20Richard%22%2Cfiction%2C204%2C%0ASimpsons%20%26%20Their%20Mathematical%20Secrets%2C%22Singh%2C%20Simon%22%2Cscience%2C233%2C%0APattern%20Classification%2C%22Duda%2C%20Hart%22%2Cdata_science%2C241%2C%0AFrom%20Beirut%20to%20Jerusalem%2C%22Friedman%2C%20Thomas%22%2Chistory%2C202%2C%0A%22Code%20Book%2C%20The%22%2C%22Singh%2C%20Simon%22%2Cscience%2C197%2C%0A%22Age%20of%20the%20Warrior%2C%20The%22%2C%22Fisk%2C%20Robert%22%2Chistory%2C197%2C%0AFinal%20Crisis%2C%2Ccomic%2C257%2C%0A%22Killing%20Joke%2C%20The%22%2C%2Ccomic%2C283%2C%0AFlashpoint%2C%2Ccomic%2C265%2C%0ABatman%20Earth%20One%2C%2Ccomic%2C265%2C%0ACrisis%20on%20Infinite%20Earths%2C%2Ccomic%2C258%2C%0A%22Numbers%20Behind%20Numb3rs%2C%20The%22%2C%22Devlin%2C%20Keith%22%2Cscience%2C202%2C%0ASuperman%20Earth%20One%20-%201%2C%2Ccomic%2C259%2C%0ASuperman%20Earth%20One%20-%202%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20Throne%20of%20Atlantis%2C%2Ccomic%2C258%2C%0AJustice%20League%3A%20The%20Villain\'s%20Journey%2C%2Ccomic%2C258%2C%0A%22Death%20of%20Superman%2C%20The%22%2C%2Ccomic%2C258%2C%0AHistory%20of%20the%20DC%20Universe%2C%2Ccomic%2C258%2C%0ABatman%3A%20The%20Long%20Halloween%2C%2Ccomic%2C258%2C%0A%22Life%20in%20Letters%2C%20A%22%2C%22Steinbeck%2C%20John%22%2Cnonfiction%2C196%2C%0A%22Information%2C%20The%22%2C%22Gleick%2C%20James%22%2Cscience%2C233%2C%0A%22Journal%20of%20Economics%2C%20vol%20106%20No%203%22%2C%2Ceconomics%2C235%2C%0AElements%20of%20Information%20Theory%2C%22Thomas%2C%20Joy%22%2Cdata_science%2C229%2C%0APower%20Electronics%20-%20Rashid%2C%22Rashid%2C%20Muhammad%22%2Ccomputer_science%2C235%2C%0APower%20Electronics%20-%20Mohan%2C%22Mohan%2C%20Ned%22%2Ccomputer_science%2C237%2C%0ANeural%20Networks%2C%22Haykin%2C%20Simon%22%2Cdata_science%2C240%2C%0A%22Grapes%20of%20Wrath%2C%20The%22%2C%22Steinbeck%2C%20John%22%2Cfiction%2C196%2C%0AVyakti%20ani%20Valli%2C%22Deshpande%2C%20P%20L%22%2Cnonfiction%2C211%2C%0AStatistical%20Learning%20Theory%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C228%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Tainted%20Throne%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Brothers%20at%20War%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Ruler%20of%20the%20World%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20The%20Serpent\'s%20Tooth%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AEmpire%20of%20the%20Mughal%20-%20Raiders%20from%20the%20North%2C%22Rutherford%2C%20Alex%22%2Chistory%2C180%2C%0AMossad%2C%22Baz-Zohar%2C%20Michael%22%2Chistory%2C236%2C%0AJim%20Corbett%20Omnibus%2C%22Corbett%2C%20Jim%22%2Cnonfiction%2C223%2C%0A20000%20Leagues%20Under%20the%20Sea%2C%22Verne%2C%20Jules%22%2Cfiction%2C190%2C%0ABatatyachi%20Chal%2CDeshpande%20P%20L%2Cfiction%2C200%2C%0AHafasavnuk%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0AUrlasurla%2CDeshpande%20P%20L%2Cfiction%2C211%2C%0APointers%20in%20C%2C%22Kanetkar%2C%20Yashwant%22%2Ccomputer_science%2C213%2C%0A%22Cathedral%20and%20the%20Bazaar%2C%20The%22%2C%22Raymond%2C%20Eric%22%2Ccomputer_science%2C217%2C%0ADesign%20with%20OpAmps%2C%22Franco%2C%20Sergio%22%2Ccomputer_science%2C240%2C%0AThink%20Complexity%2C%22Downey%2C%20Allen%22%2Cdata_science%2C230%2C%0A%22Devil\'s%20Advocate%2C%20The%22%2C%22West%2C%20Morris%22%2Cfiction%2C178%2C%0AAyn%20Rand%20Answers%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C203%2C%0APhilosophy%3A%20Who%20Needs%20It%2C%22Rand%2C%20Ayn%22%2Cphilosophy%2C171%2C%0A%22World\'s%20Great%20Thinkers%2C%20The%22%2C%2Cphilosophy%2C189%2C%0AData%20Analysis%20with%20Open%20Source%20Tools%2C%22Janert%2C%20Phillip%22%2Cdata_science%2C230%2C%0ABroca\'s%20Brain%2C%22Sagan%2C%20Carl%22%2Cscience%2C174%2C%0AMen%20of%20Mathematics%2C%22Bell%2C%20E%20T%22%2Cmathematics%2C217%2C%0AOxford%20book%20of%20Modern%20Science%20Writing%2C%22Dawkins%2C%20Richard%22%2Cscience%2C240%2C%0A%22Justice%2C%20Judiciary%20and%20Democracy%22%2C%22Ranjan%2C%20Sudhanshu%22%2Cphilosophy%2C224%2C%0A%22Arthashastra%2C%20The%22%2CKautiyla%2Cphilosophy%2C214%2C%0AWe%20the%20People%2CPalkhivala%2Cphilosophy%2C216%2C%0AWe%20the%20Nation%2CPalkhivala%2Cphilosophy%2C216%2C%0A%22Courtroom%20Genius%2C%20The%22%2CSorabjee%2Cnonfiction%2C217%2C%0ADongri%20to%20Dubai%2C%22Zaidi%2C%20Hussain%22%2Cnonfiction%2C216%2C%0A%22History%20of%20England%2C%20Foundation%22%2C%22Ackroyd%2C%20Peter%22%2Chistory%2C197%2C%0ACity%20of%20Djinns%2C%22Dalrymple%2C%20William%22%2Chistory%2C198%2C%0AIndia\'s%20Legal%20System%2CNariman%2Cnonfiction%2C177%2C%0AMore%20Tears%20to%20Cry%2C%22Sassoon%2C%20Jean%22%2Cfiction%2C235%2C%0A%22Ropemaker%2C%20The%22%2C%22Dickinson%2C%20Peter%22%2Cfiction%2C196%2C%0AAngels%20%26%20Demons%2C%22Brown%2C%20Dan%22%2Cfiction%2C170%2C%0A%22Judge%2C%20The%22%2C%2Cfiction%2C170%2C%0A%22Attorney%2C%20The%22%2C%2Cfiction%2C170%2C%0A%22Prince%2C%20The%22%2CMachiavelli%2Cphilosophy%2C173%2C%0AEyeless%20in%20Gaza%2C%22Huxley%2C%20Aldous%22%2Cfiction%2C180%2C%0ATales%20of%20Beedle%20the%20Bard%2C%22Rowling%2C%20J%20K%22%2Cfiction%2C184%2C%0AGirl%20with%20the%20Dragon%20Tattoo%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0AGirl%20who%20kicked%20the%20Hornet\'s%20Nest%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0AGirl%20who%20played%20with%20Fire%2C%22Larsson%2C%20Steig%22%2Cfiction%2C179%2C%0ABatman%20Handbook%2C%2Ccomic%2C270%2C%0AMurphy\'s%20Law%2C%2Cnonfiction%2C178%2C%0AStructure%20and%20Randomness%2C%22Tao%2C%20Terence%22%2Cmathematics%2C252%2C%0AImage%20Processing%20with%20MATLAB%2C%22Eddins%2C%20Steve%22%2Csignal_processing%2C241%2C%0AAnimal%20Farm%2C%22Orwell%2C%20George%22%2Cfiction%2C180%2C%0A%22Idiot%2C%20The%22%2C%22Dostoevsky%2C%20Fyodor%22%2Cfiction%2C197%2C%0A%22Christmas%20Carol%2C%20A%22%2C%22Dickens%2C%20Charles%22%2Cfiction%2C196%2C", "left"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move3",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7941",\
            "y": "-551",\
            "z": "59",\
            "params":\
            [\
                    ["NUM#", "x", "2172.97,3"],\
                    ["NUM#", "y", "500,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5110",\
            "y": "-258",\
            "z": "60",\
            "params":\
            [\
                    ["NUM#", "x", "20,0"],\
                    ["NUM#", "y", "10,0"]\
            ]\
            },\
            {\
            "type": "SKEW",\
            "id": "skew",\
            "name": "skew",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8214",\
            "y": "-551",\
            "z": "61",\
            "params":\
            [\
                    ["NUM#", "skewY", "-10,1"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel6",\
            "name": "seeds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "1684",\
            "y": "-1033",\
            "z": "62",\
            "width": "680.9091290631509",\
            "height": "298.7272608735842",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color9",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4023",\
            "y": "-914",\
            "z": "63",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "33,0"]\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3836",\
            "y": "245",\
            "z": "64",\
            "params":\
            [\
                    ["NUM#", "contrast", "56.185635645223876,1"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1894",\
            "y": "-922",\
            "z": "65",\
            "params":\
            [\
                    ["NUM#", "count", "6,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3152",\
            "y": "-255",\
            "z": "66",\
            "width": "224.46657575662033",\
            "height": "142",\
            "params":\
            [\
                    ["TEXT#", "0", "In%20a%20Free%20State", "left"],\
                    ["TEXT#", "1", "V.%20S.%20Naipaul", "left"],\
                    ["TEXT#", "2", "fiction", "left"],\
                    ["TEXT#", "3", "196", "left"],\
                    ["TEXT#", "4", "Rupa", "left"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4137",\
            "y": "289",\
            "z": "67",\
            "params":\
            [\
                    ["NUM#", "operation", "5,0"],\
                    ["NUM#", "operand", "70,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1744",\
            "y": "-922",\
            "z": "68",\
            "params":\
            [\
                    ["NUM#", "seed", "8152,0"],\
                    ["NUM#", "max", "10000,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math3",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3841",\
            "y": "-1592",\
            "z": "69",\
            "params":\
            [\
                    ["NUM#", "value", "-52,0"],\
                    ["NUM#", "operand", "-100,0"]\
            ]\
            },\
            {\
            "type": "TCSV",\
            "id": "csv",\
            "name": "csv",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2827",\
            "y": "-255",\
            "z": "70"\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6685",\
            "y": "-553",\
            "z": "71",\
            "params":\
            [\
                    ["NUM#", "centerX", "0,0"],\
                    ["NUM#", "centerY", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "6308",\
            "y": "-558",\
            "z": "72",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4323",\
            "y": "258",\
            "z": "73",\
            "params":\
            [\
                    ["NUM#", "condition", "0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2931",\
            "y": "-1238",\
            "z": "74",\
            "params":\
            [\
                    ["NUM#", "seed", "1233,0"],\
                    ["NUM#", "min", "25,0"],\
                    ["NUM#", "max", "75,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3250",\
            "y": "-1378",\
            "z": "75",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "136,0"],\
                    ["NUM#", "c2", "54,0"],\
                    ["NUM#", "c3", "48,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7604",\
            "y": "-105",\
            "z": "76",\
            "params":\
            [\
                    ["NUM#", "step", "4.75,3"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob2",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "4227",\
            "y": "50",\
            "z": "77",\
            "params":\
            [\
                    ["NUM#", "seed", "1885,0"],\
                    ["NUM#", "chance", "45,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2819",\
            "y": "54",\
            "z": "78",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "step", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4907",\
            "y": "-1034",\
            "z": "79",\
            "params":\
            [\
                    ["NUM#", "seed", "4699,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8739",\
            "y": "341",\
            "z": "80",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "2,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine4",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "8240",\
            "y": "-163",\
            "z": "81",\
            "width": "120",\
            "height": "103"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence7",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7688",\
            "y": "344",\
            "z": "82",\
            "params":\
            [\
                    ["NUM#", "step", "500,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Data%20taken%20from%20CSV%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2073",\
            "y": "199",\
            "z": "83",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "book%20size%20is%20proportinal%20to%20page%20count.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2073",\
            "y": "245",\
            "z": "84",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "accum",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list2",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "color2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list2",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "6",\
            "inputNodeId": "grad2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad2",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "contrast",\
            "outputId": "contrast",\
            "outputOrder": "0",\
            "inputNodeId": "abs",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "fill2",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "5",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine6",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "freeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse3",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "prob2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse3",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color8",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "csv",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color7",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math4",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "rect",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "5",\
            "inputNodeId": "text",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "font",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color6",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list2",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "5",\
            "inputNodeId": "grad",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "grad",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "prob2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "bool",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "ifElse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence4",\
            "inputId": "step",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "center3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "4",\
            "inputNodeId": "text2",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "text2",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "font",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "accum",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math7",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "grad3",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list2",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "5",\
            "inputNodeId": "textToNum",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "grad2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "prob",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "8",\
            "inputNodeId": "color8",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "7",\
            "inputNodeId": "color6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "skew",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "textToNum",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "math4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "math7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move3",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "skew",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "skew",\
            "inputId": "skewY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color9",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "contrast",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "abs",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "replace",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "csv",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list2",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "random3",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence3",\
            "inputId": "step",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list2",\
            "outputId": "5",\
            "outputOrder": "0",\
            "inputNodeId": "prob2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence7",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "accum",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h4",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine4",\
            "inputId": "h5",\
            "list": "false"\
            }\
        ]\
    }';