var currentPresetTab = 0;



function initPresets()
{
    presets.addEventListener('pointerdown', () => hideAllMenus());
}



function showPresets()
{
    setCurrentPresetTab(0);

    keyboardPanel.style.display = 'none';

    presets.style.display = 
        presets.style.display != 'block'
        ? 'block'
        : 'none';
}



function hidePresets()
{
    presets.style.display = 'none';
}



function setCurrentPresetTab(tab)
{
    currentPresetTab = tab;

    for (let i = 0; i < presetTabs.children.length; i++)
    {
        presetTabs.children[i].style.background = i == currentPresetTab ? '#1E1E1E' : 'none';
        presetTabs.children[i].style.boxShadow  = i == currentPresetTab ? '0 0 0 0.5px #ffffff2b' : 'none';

        presetContent.children[i].style.display = i == currentPresetTab ? 'flex' : 'none';
    }
}



function clearGraph()
{
    if (isEmpty(graph.pages))
        graph.createPage('');

    uiDeleteAllObjects();
    uiDeleteAllVariables();
    uiRemoveAllSavedNodesAndConns();

    graph.clear();

    totalObjectCount = 0;
    updateObjectCountDisplay();
}



function loadPresetGraph(graphId)
{
    hideAllMenus();
    clearGraph();


    actionManager.do(new PasteNodesAction(getPresetGraph(graphId), false, false, true, Number.NaN, Number.NaN, true, true, (nodes) =>
    {
        actionManager.clear();
    }));


    addMetricsEvent(METRICS_LOAD_PRESET, graphId);
}



const presetGraphs = 
[
    { id: 'default',              graph: presetDefault            },

    { id: 'basics',               graph: presetNodeBasics         },
    { id: 'dataTypes',            graph: presetDataTypes          },
    { id: 'organize',             graph: presetOrganize           },
    { id: 'active',               graph: presetActive             },
    { id: 'persist',               graph: presetPersist             },

    { id: 'ifElse',               graph: presetIfElse             },
    { id: 'select',               graph: presetSelect             },
    { id: 'sorting',              graph: presetSorting            },
    { id: 'encodingValues',       graph: presetEncodingValues     },
    { id: 'tableBasics',          graph: presetTableBasics        },
    { id: 'countryData',          graph: presetCountryData        },
    { id: 'pieChart',             graph: presetPieChart           },
    { id: 'lineGraph',            graph: presetLineGraph          },

    { id: 'sequence',             graph: presetSequence           },
    { id: 'range',                graph: presetRange              },
    { id: 'wave',                 graph: presetWave               },
    { id: 'iterate',              graph: presetIterate            },
    { id: 'random',               graph: presetRandom             },
    { id: 'noise',                graph: presetNoise              },
    { id: 'probability',          graph: presetProbability        },

    { id: 'randomSeeds',          graph: presetRandomSeeds        },

    { id: 'loop1d',               graph: presetLoop1d             },
    { id: 'loop2d',               graph: presetLoop2d             },
    { id: 'loopLock',             graph: presetLoopLock           },

    { id: 'numberLine',           graph: presetNumberLine         },
    { id: 'wavyDots',             graph: presetWavyDots           },
    { id: 'falsePerspective',     graph: presetFalsePerspective   },
    { id: 'rays',                 graph: presetRays               },
    { id: 'magicDots',            graph: presetMagicDots          },
    { id: 'arcs',                 graph: presetArcs               },
    { id: 'randomCircles',        graph: presetRandomCircles      },
    { id: 'treeRings',            graph: presetTreeRings          },
    { id: 'arcSunset',            graph: presetArcSunset          },
    { id: 'progressiveBlur',      graph: presetProgressiveBlur    },
    { id: 'noiseBlur',            graph: presetNoiseBlur          },

    { id: 'arcLetters',           graph: presetArcLetters         },
    { id: 'doctorsHandwriting',   graph: presetDoctorsHandwriting },

    { id: 'twoMathNodes',         graph: presetTwoMathNodes       },
    { id: 'quadraticFormula',     graph: presetQuadraticFormula   },
    { id: 'opponentColor',        graph: presetOpponentColor      },

    { id: 'randomNames',          graph: presetRandomNames        },
    { id: 'alphabetSoup',         graph: presetAlphabetSoup       },
    { id: 'fontList',             graph: presetFontList           },

    { id: 'clock',                graph: presetClock              },

    { id: 'colorContrast',        graph: presetColorContrast      },
    { id: 'colorSpaces',          graph: presetColorSpaces        },
    { id: 'invalidColors',        graph: presetInvalidColors      },
    { id: 'textFromBackground',   graph: presetTextFromBackground },

    { id: 'gradientSpiral',       graph: presetGradientSpiral     },
    { id: 'compositeGradients',   graph: presetCompositeGradients },
    { id: 'nightLights',          graph: presetNightLights        },
    { id: 'rainbowStrips',        graph: presetRainbowStrips      },
    { id: 'sunCorona',            graph: presetSunCorona          },
    { id: 'galaxy',               graph: presetGalaxy             },
    { id: 'cartoonForest',        graph: presetCartoonForest      },
    { id: 'bubbles',              graph: presetBubbles            },
    { id: 'glitterField',         graph: presetGlitterField       },

    { id: 'randomColors',         graph: presetRandomColors       },
    { id: 'tintsAndShades',       graph: presetTintsAndShades     },
    { id: 'paletteFromColor',     graph: presetPaletteFromColor   },
    { id: 'colorSwatches',        graph: presetColorSwatches      },
    { id: 'blurryBackgrounds',    graph: presetBlurryBackgrounds  },
    { id: 'brickWall',            graph: presetBrickWall          },
    { id: 'cairoTiles',           graph: presetCairoTiles         },

    { id: 'shapesStyles',         graph: presetShapesStyles       },
    { id: 'basicTransform',       graph: presetBasicTransform     },
    { id: 'combinedTransform',    graph: presetCombinedTransform  },
    { id: 'feedback',             graph: presetFeedback           },

    { id: 'wobblyCircle',         graph: presetWobblyCircle       },
    { id: 'snowflakes',           graph: presetSnowflakes         },
    { id: 'roughStar',            graph: presetRoughStar          },
    { id: 'nestedTorus',          graph: presetNestedTorus        },
    { id: 'targets',              graph: presetTargets            },
    { id: 'spiderWeb',            graph: presetSpiderWeb          },

    { id: 'basicVariables',       graph: presetBasicVariables     },


    { id: 'namesLogos',           graph: presetNamesLogos         },
    { id: 'avatars',              graph: presetAvatars            },

    { id: 'booksOnShelf',         graph: presetBooksOnShelf       },
    { id: 'circleFields',         graph: presetCircleFields       },
    { id: 'circleFields2',        graph: presetCircleFields2      },
    { id: 'wobbles',              graph: presetWobbles            },
    { id: 'randomAbstract',       graph: presetRandomAbstract     },
    { id: 'afterTheStorm',        graph: presetAfterTheStorm      },
    { id: 'sunsetDreams',         graph: presetSunsetDreams       },
    { id: 'polarizedLights',      graph: presetPolarizedLights    },
    { id: 'linesOfFire',          graph: presetLinesOfFire        },
    { id: 'northernLights',       graph: presetNorthernLights     },
    { id: 'skyline',              graph: presetSkyline            },
    { id: 'clouds',               graph: presetClouds             },
    { id: 'twistedTower',         graph: presetTwistedTower       },
    { id: 'dustySunset',          graph: presetDustySunset        },
    { id: 'brushStrokes',         graph: presetBrushStrokes       },
    { id: 'gradientCircles',      graph: presetGradientCircles    },
    { id: 'hotSpring',            graph: presetHotSpring          },
    { id: 'nightPalace',          graph: nightPalace              },
];



function getPresetGraph(graphId)
{
    return presetGraphs.find(g => g.id == graphId).graph;
}