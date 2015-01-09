# WebRTS
### A web-based 2D topdown real-time strategy game.

This repo a fork of [honzi](https://github.com/honzi)'s [iterami/RTS-2D.htm](https://github.com/iterami/RTS-2D.htm). Due to coding style problem, I just created another repo.
 
Compaired with its parent repo [RTS-2D.htm](https://github.com/iterami/RTS-2D.htm), WebRTS tries to seperate.

### Install && Run

The master branch is currently using Node.js as server(both the file server which serves the html/css/js files, and socket server handle the game logic). A 0.10.x should be able to work.

To install
~~~
$ cd path/to/WebRTS
$ npm install
~~~

To run
~~~
$ npm test
~~~
or
~~~
$ node app.js
~~~

Fire up a modern browser, go to [localhost:1234](http://localhost:1234) and explore the game.

### Dirs and Files

Directory tree of repo:
~~~
WebRTS
├── app.js              // the main executable
│
├── sockserver
│   ├── game-core.js    // handle game logic
│   └── sock.js		// the websocket browser-server interface
│
├── www			// browser files
│   ├── css
│   │   └── rts-2d.css
│   ├── index.html
│   └── js
│       ├── graphics.js // drawing the game
│       ├── logic.js    // the graphic-logic interface
│       └── sockc.js    // the websocket browser-server interface
│
├── WebRTS\_notes.org   // notes about the browser/server communication protos
├── package.json
├── LICENSE.md		// CC0 License
└── README.md
~~~

### Branches

As the parent repo [RTS-2D.htm](https://github.com/iterami/RTS-2D.htm) is a pure client side program, WebRTS has a __no-server__ branch, which is just the modularized version of [RTS-2D.htm](https://github.com/iterami/RTS-2D.htm).

There is also a __go-server__ branch which using golang, it's not functional right now. Actually the node.js version is just a helper for making the golang version to work.

