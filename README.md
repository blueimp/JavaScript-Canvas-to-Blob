# JavaScript Canvas to Blob

## Usage
Include the (minified) JavaScript Canvas to Blob script in your HTML markup:

```html
<script src="canvas-to-blob.min.js"></script>
```

In your application code, use the **canvasToBlob()** function like this:

```js
var canvas = document.createElement('canvas'); 
/* ... your canvas manipulations ... */
if(!canvasToBlob(
    canvas,
    function (blob) {
        // Do something with the blob object,
        // e.g. creating a multipart form for file uploads:
        var formData = new FormData();
        formData.append('file', blob, fileName);
        /* ... */
    },
    {
        type: fileType,
        name: fileName // Only used by Mozilla Firefox
    }
)) {
    /* ... alternative code for unsupported browsers ... */
};
```

## Requirements
The JavaScript Canvas to Blob function has zero dependencies.

However, Canvas to Blob is a very suitable complement to the [JavaScript Load Image](https://github.com/blueimp/JavaScript-Load-Image) function.

## API
The **canvasToBlob()** function expects a [canvas](https://developer.mozilla.org/en/HTML/Element/canvas) element as first argument and a callback function as second argument. An options object with the properties name (e.g. "image.png") and image (e.g. "image/png") can be provided as optional third argument.

The function returns **true** if the browser supports canvas to blob conversion. It calls the provided callback function with the created blob as argument.

## License
The JavaScript Canvas to Blob script is released under the [MIT license](http://www.opensource.org/licenses/MIT).
