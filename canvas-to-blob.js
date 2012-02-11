/*
 * JavaScript Canvas to Blob 1.0.1
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/*jslint nomen: true, regexp: true */
/*global window, atob, ArrayBuffer, Uint8Array, define */

(function ($) {
    'use strict';

    var BlobBuilder = window.MozBlobBuilder ||
            window.WebKitBlobBuilder || window.BlobBuilder,
        blobTypes = /^image\/(jpeg|png)$/,

        // Converts a canvas element to a Blob or File object:
        canvasToBlob = function (canvas, callback, options) {
            options = options || {};
            if (canvas.toBlob) {
                canvas.toBlob(callback, options.type);
                return true;
            } else if (canvas.mozGetAsFile) {
                var name = options.name;
                callback(canvas.mozGetAsFile(
                    (blobTypes.test(options.type) && name) ||
                        ((name && name.replace(/\..+$/, '')) || 'blob') + '.png',
                    options.type
                ));
                return true;
            } else if (canvas.toDataURL && BlobBuilder && window.atob &&
                    window.ArrayBuffer && window.Uint8Array) {
                callback(canvasToBlob.dataURItoBlob(
                    canvas.toDataURL(options.type)
                ));
                return true;
            }
            return false;
        };

    // Converts a dataURI to a Blob:
    canvasToBlob.dataURItoBlob = function (dataURI) {
        var byteString,
            arrayBuffer,
            intArray,
            i,
            bb,
            mimeString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            // Convert base64 to raw binary data held in a string:
            byteString = atob(dataURI.split(',')[1]);
        } else {
            // Convert base64/URLEncoded data component to raw binary data:
            byteString = decodeURIComponent(dataURI.split(',')[1]);
        }
        // Write the bytes of the string to an ArrayBuffer:
        arrayBuffer = new ArrayBuffer(byteString.length);
        intArray = new Uint8Array(arrayBuffer);
        for (i = 0; i < byteString.length; i += 1) {
            intArray[i] = byteString.charCodeAt(i);
        }
        // Write the ArrayBuffer to a blob:
        bb = new BlobBuilder();
        bb.append(arrayBuffer);
        // Separate out the mime component:
        mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        return bb.getBlob(mimeString);
    };

    if (typeof define !== 'undefined' && define.amd) {
        define(function () {
            return canvasToBlob;
        });
    } else {
        $.canvasToBlob = canvasToBlob;
    }
}(this));
