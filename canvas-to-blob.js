/*
 * JavaScript Canvas to Blob 2.0.1
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

(function (window) {
    'use strict';
    var CanvasPrototype = window.HTMLCanvasElement &&
            window.HTMLCanvasElement.prototype,
        BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
            window.MozBlobBuilder || window.MSBlobBuilder || window.Blob,
        dataURLtoBlob = BlobBuilder && window.atob && window.ArrayBuffer &&
            window.Uint8Array && function (dataURI) {
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
                // Separate out the mime component:
                mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                if(window.Blob && !BlobBuilder.prototype.append) {
                    try {
                         // Safari 6+
                         return new Blob([arrayBuffer],{type:mimeString});
                    } catch(e) {}
                }
                // Write the ArrayBuffer to a blob:
                bb = new BlobBuilder();
                bb.append(arrayBuffer);
                return bb.getBlob(mimeString);
            };
    if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
        if (CanvasPrototype.mozGetAsFile) {
            CanvasPrototype.toBlob = function (callback, type) {
                callback(this.mozGetAsFile('blob', type));
            };
        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
            CanvasPrototype.toBlob = function (callback, type) {
                callback(dataURLtoBlob(this.toDataURL(type)));
            };
        }
    }
    if (typeof define !== 'undefined' && define.amd) {
        define(function () {
            return dataURLtoBlob;
        });
    } else {
        window.dataURLtoBlob = dataURLtoBlob;
    }
}(this));
