.PHONY: js

js:
	node_modules/.bin/uglifyjs js/canvas-to-blob.js -c -m -o js/canvas-to-blob.min.js
