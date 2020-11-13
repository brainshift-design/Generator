The plugin is divided into three threads:

    - Figma
    - UI
    - generator

The generator holds the current graph and does the main work. The UI holds a visual copy of the graph. They communicate with messages — the UI tells the graph how to change and what to do, and the graph tells the UI what to draw.