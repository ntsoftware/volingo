IMAGES = $(wildcard client/images/*)
SCRIPTS = $(wildcard client/scripts/*)

all: volingo-proxy chrome-extension firefox-extension

content-script: client/build/content-script.js

volingo-proxy: content-script

chrome-extension: content-script

firefox-extension: content-script

client/build/content-script.js: client/styles/styles.css $(SCRIPTS)
	r.js -o build-config.js include=main-duolingo,styles out=$@

client/styles/styles.css: client/styles/styles.less $(IMAGES)
	lessc --yui-compress $< >$@

clean:
	$(RM) client/build/content-script.js client/styles/styles.css
