The plugin is divided into three threads:

    - Figma
    - UI
    - Generator

The generator holds the back end copy of the current graph and does the main work. 
The UI holds a visual copy of the graph. 

The two graphs must stay in sync. They communicate with messages — the UI tells the graph how to change and what to do, and the graph tells the UI what to draw.

Nodes are sometimes passed around as objects, but sometimes it's easier to deal with them as node IDs.