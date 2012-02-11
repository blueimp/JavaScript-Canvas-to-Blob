/*
 * JavaScript Canvas to Blob Test 1.0
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window, describe, it, expect, Blob */

(function (expect, canvasToBlob) {
    'use strict';

    // 80x60px GIF image (color black, base64 data):
	var b64Data = 'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
            'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
            'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7',
	    imageUrl = 'data:image/gif;base64,' + b64Data,
	    blob = canvasToBlob.dataURItoBlob(imageUrl);

    describe('canvasToBlob', function () {

        it('Returns true when supporting canvas to blob conversions', function (done) {
            window.loadImage(blob, function (canvas) {
                expect(canvasToBlob(
                    canvas,
                    function () {
                        done();
                    }
                )).to.be.ok();
            }, {canvas: true});
        });

        it('Returns false when not supporting canvas to blob conversions', function () {
            expect(canvasToBlob(
                {},
                function () {}
            )).to.not.be.ok();
        });

        it('Converts a canvas element to a blob and passes it to the callback function', function (done) {
            window.loadImage(blob, function (canvas) {
                expect(canvasToBlob(
                    canvas,
                    function (newBlob) {
                        done();
                        expect(newBlob).to.be.a(Blob);
                    },
                    blob
                )).to.be.ok();
            }, {canvas: true});
        });

        it('Converts a canvas element to a PNG blob', function (done) {
            window.loadImage(blob, function (canvas) {
                expect(canvasToBlob(
                    canvas,
                    function (newBlob) {
                        done();
                        expect(newBlob.type).to.be('image/png');
                    },
                    {
                        type: 'image/png'
                    }
                )).to.be.ok();
            }, {canvas: true});
        });

        it('Converts a canvas element to a JPG blob', function (done) {
            window.loadImage(blob, function (canvas) {
                expect(canvasToBlob(
                    canvas,
                    function (newBlob) {
                        done();
                        expect(newBlob.type).to.be('image/jpeg');
                    },
                    {
                        type: 'image/jpeg'
                    }
                )).to.be.ok();
            }, {canvas: true});
        });

        it('Keeps the aspect ratio of the canvas image', function (done) {
            window.loadImage(blob, function (canvas) {
                expect(canvasToBlob(
                    canvas,
                    function (newBlob) {
                        window.loadImage(newBlob, function (img) {
                            done();
                            expect(img.width).to.be(canvas.width);
                            expect(img.height).to.be(canvas.height);
                        });
                    }
                )).to.be.ok();
            }, {canvas: true});
        });

        it('Keeps the image data of the canvas image', function (done) {
            window.loadImage(blob, function (canvas) {
                expect(canvasToBlob(
                    canvas,
                    function (newBlob) {
                        window.loadImage(newBlob, function (newCanvas) {
                            var canvasData = canvas.getContext('2d')
                                    .getImageData(0, 0, canvas.width, canvas.height),
                                newCanvasData = newCanvas.getContext('2d')
                                    .getImageData(0, 0, newCanvas.width, newCanvas.height);
                            done();
                            expect(canvasData.width).to.be(newCanvasData.width);
                            expect(canvasData.height).to.be(newCanvasData.height);
                        }, {canvas: true});
                    }
                )).to.be.ok();
            }, {canvas: true});
        });

    });

}(
    this.expect,
    this.canvasToBlob
));
