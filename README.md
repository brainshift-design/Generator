# ◦G• Generator

## What is this?

This is a node-based Figma plugin that lets you build procedural geometry. It's good for generative art, data visualization, technical illustrations, etc. The benefit is that all this happens right inside Figma, and the generated output is regular Figma objects that you can use in your normal Figma workflow. It's published here: https://www.figma.com/community/plugin/899028246731755335.

## Architecture

Generator is written in pure Javascript and HTML, all the code is local, and there are no dependencies. I knew nothing about webdev when I started this, so the codebase is a giant legacy prototype which should ideally be rewritten from scratch. I did _some_ refactoring, but not nearly enough. So just keep that in mind. 🤷‍♂️

Figma plugins normally run in two threads: the sandbox that deals with Figma directly, and the UI thread. 

To be even close to real-time, UI and graph evaluation must be in separate threads. The Figma sandbox is ~10x slower, so that's not an option, which means a third worker is needed. And because there is no shared memory everything must be passed via messages.

Each node has two parts: OpNodeName (Op for Operator), and GNodeName (G for Generator). Op is in the UI, G is in the generator worker. 

Every time a parameter is changed, a request is sent to the generator worker. This request is self-contained and includes all the nodes and connections. The worker parses the request, builds the graph and evaluates it. Then it sends back to the UI thread the generated values for all the parameters and the generated objects. The UI thread updates node parameters and forwards the objects to the Figma thread.

```
┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│          Figma            │ │             UI            │ │         Generator         │
│                           │ │                           │ │                           │    │
│                           │ │                         Request                         │    │
│                           │ │       Start █ ──────────────────────────> █             │    │
│                           │ │                           │ │             │             │    │
│                           │ │                           │ │       ┌─────┴────┐        │    │ T
│                           │ │                           │ │       │ generate │        │    │ i
│                           │ │                           │ │       └─────┬────┘        │    │ m
│                           │ │      Update        Parameter Values       │             │    │ e
│                           │ │      Values █ <────────────────────────── █             │    │ 
│                           │ │                           │ │             │             │    │
│      Update █ <───────────────────────── <●< <───────────────────────── █             │    │
│     Objects               │ │          Forward        Objects                         │   \ /
│                           │ │          Objects          │ │                           │    V
│                           │ │                           │ │                           │
└───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘
```


## Building

```bash
# For development
autojoin.bat

# For production (minified)
autojoin_minify.bat
```

I use [AutoJoin](https://github.com/brainshift-design/autojoin) for building. It's my own simple file stitcher that takes a list of files and joins them together. It's a bit more complex than that, you can have nested file lists etc, but in general it's super basic.

My typescript files are *.ts0, as the editor doesn't know that extension and doesn't try to compile them, so I can then stitch the final .ts file and it can compile that. There are warnings everywhere but I don't care as I know what everything is. But if more people contribute then we may have to improve this. ;)


## Project Structure

```
├── actions/      # Everything users do is an undoable action
├── autojoin/     # Rules for stitching the output files together
├── color/        # Color math and utils
├── controls/     # UI components that control things
├── core/         # The heart of the system
├── css/          # A lot of CSS is here but some is in other places
├── figma/        # All the code for the Figma thread
├── generator/    # The generator side of all the nodes
├── graph/        # The graph that holds and manages the nodes
├── html/         # Dialogs and other pieces of UI
├── images/       # Icons and images
├── logging/      # Code for formatting logs for easier debugging
├── operators/    # The UI side of all the nodes
├── parameters/   # Things you can tweak
└── ui/           # Utility functions etc.
```


## A Note on Minification

I use a very simple, brute-force minification approach. I just have a list of keywords that I replace that I update from time to time. Sometimes the minified code breaks because I replace something that's not only a keyword but also a string key or something, then I have to take that word out. It's not fancy, but it gets the job done.


## Server Backend

In the back is a MSSQL database that I maintain separately. Generator communicates with it through POST requests.


## Development

1. Clone the repo
2. Download autojoin (https://github.com/brainshift-design/autojoin) and make sure autojoin.bat and autojoin_minify.bat point to it correctly
3. Run `autojoin.bat` for development, then press Ctrl+Shift+B and run TSC in watch mode
4. Run `autojoin_minify.bat` for production


## Contributing

1. Fork it
2. Create your feature branch
3. Write some code
4. Make sure it works
5. Submit a PR


## License

Generator is licensed under the Commons Clause License.


## Credits

Built with ❤️ and way too much ☕️ by Alex Bourt ([brainshift.be](https://brainshift.be))
