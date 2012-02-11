.PHONY: js

js:
	uglifyjs -nc canvas-to-blob.js > canvas-to-blob.min.js
