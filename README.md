# JavaScript Canvas to Blob

## Usage
Include the (minified) JavaScript Canvas to Blob script in your HTML markup:

```html
<script src="canvas-to-blob.min.js"></script>
```

The JavaScript Canvas to Blob script is a polyfill for the standard HTML [canvas.toBlob](http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-toblob) method:

```js
var canvas = document.createElement('canvas'); 
/* ... your canvas manipulations ... */
if (canvas.toBlob) {
    canvas.toBlob(
        function (blob) {
            // Do something with the blob object,
            // e.g. creating a multipart form for file uploads:
            var formData = new FormData();
            formData.append('file', blob, fileName);
            /* ... */
        },
        'image/jpeg'
    );
}
```

## Requirements
The JavaScript Canvas to Blob function has zero dependencies.

However, Canvas to Blob is a very suitable complement to the [JavaScript Load Image](https://github.com/blueimp/JavaScript-Load-Image) function.

## API
In addition to the **canvas.toBlob** polyfill, the JavaScript Canvas to Blob script provides one additional function called **dataURLtoBlob**, which is added to the global window object if no AMD loader is used to load the script:

```js
// 80x60px GIF image (color black, base64 data):
var b64Data = 'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
        'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
        'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7',
    imageUrl = 'data:image/gif;base64,' + b64Data,
    blob = window.dataURLtoBlob && window.dataURLtoBlob(imageUrl);
```

## License
The JavaScript Canvas to Blob script is released under the [MIT license](http://www.opensource.org/licenses/MIT).
