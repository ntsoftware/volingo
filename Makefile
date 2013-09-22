IMAGES = $(wildcard client/images/*)
SCRIPTS = $(wildcard client/scripts/*)

all: client/build/content-script.js

client/build/content-script.js: client/styles/styles.css $(SCRIPTS)
	r.js -o build-config.js include=main-duolingo,styles out=$@

client/styles/styles.css: client/styles/styles.less $(IMAGES)
	lessc --yui-compress $< >$@

clean:
	$(RM) client/build/content-script.js client/styles/styles.css
