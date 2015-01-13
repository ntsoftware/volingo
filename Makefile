IMAGES = $(wildcard client/images/*)
SCRIPTS = $(wildcard client/scripts/*)

GOOGLE_CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

all: content-script

chrome-extension: extension/build/volingo-chrome.crx extension/build/volingo-chrome.pem

content-script: client/build/content-script.js

client/build/content-script.js: client/styles/styles.css $(SCRIPTS)
	node_modules/.bin/r.js -o build-config.js include=build out=$@

client/styles/styles.css: client/styles/styles.less $(IMAGES)
	node_modules/.bin/lessc -x $< >$@

chrome-extension-build: content-script
	$(GOOGLE_CHROME) --pack-extension=extension/chrome

extension/build/volingo-chrome.crx: chrome-extension-build
	mkdir -p extension/build
	mv extension/chrome.crx extension/build/volingo-chrome.crx

extension/build/volingo-chrome.pem: chrome-extension-build
	mkdir -p extension/build
	mv extension/chrome.pem extension/build/volingo-chrome.pem

clean:
	$(RM) client/build/content-script.js client/styles/styles.css extension/build
