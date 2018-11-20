.DELETE_ON_ERROR:

#export BIN := $(shell npm bin)
#PATH := $(BIN):$(PATH)
DIST = ./dist
#BUILD = ./build
LIB = ./lib
EXAMPLES = ./examples
PACKAGE = $(DIST)/aurora-web.js
PACKAGE_MIN = $(DIST)/aurora-web.min.js
PACKAGE_MIN_MAP = $(DIST)/aurora-web.min.js.map

NODE_MODULE = ./node_modules

clean:
	rm -rf $(BUILD) $(DIST)

dev:
	webpack-dev-server --config webpack-examples.config.js

build:
	rm -rf $(DIST)
	mkdir $(DIST)
	webpack --config webpack-dist.config.js  --mode=production  --env.distType web --json > $(DIST)/stats.json
#	sed -i 's/define\&\&define\.amd/define\&\&define\.amd\&\&\!window\.dojo\&\&\!window\.requirejs/' $(PACKAGE_MIN)
