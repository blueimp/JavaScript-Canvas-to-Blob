/*
 * JavaScript Canvas to Blob Test
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global describe, it, chai, dataURLtoBlob */

;(function () {
  'use strict'

  var expect = chai.expect
  var canvasToBlob = function (canvas, callback, type, quality) {
    setTimeout(function () {
      callback(dataURLtoBlob(canvas.toDataURL(type, quality)))
    })
  }

  // black 60x40 GIF
  // Image data layout (B=black, F=white), scaled to 3x2:
  // BFF
  // BBB
  var b64Data =
    'R0lGODlhPAAoAPECAAAAAP///wAAAAAAACH5BAUAAAIALAAAAAA8ACgAQAJihI+Zwe0Po3Sq' +
    '1okztvzoDwbdSJbmiaaqGbbTCrjyA9f2jef6Ts6+uPrNYEIZsdg6IkG8pvMJjUqnVOgypLxm' +
    'stpXsLv9gr2q8UZshnDTjTUbWH7TqvS6/Y7P6/f8vv9vVwAAOw=='
  var imageUrl = 'data:image/gif;base64,' + b64Data
  var blob = dataURLtoBlob(imageUrl)

  describe('canvas.toBlob', function () {
    it('Converts a canvas element to a blob and passes it to the callback function', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            expect(newBlob).to.be.a.instanceOf(Blob)
            done()
          })
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a PNG blob', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            expect(newBlob.type).to.equal('image/png')
            done()
          }, 'image/png')
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            expect(newBlob.type).to.equal('image/jpeg')
            done()
          }, 'image/jpeg')
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob with lower quality', function (done) {
      var results = {}
      /**
       * Compares blob sizes when both have been converted.
       */
      function compare() {
        if (results.defaultQualityBlob && results.lowerQualityBlob) {
          expect(results.lowerQualityBlob.size).to.be.below(
            results.defaultQualityBlob.size
          )
          done()
        }
      }
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            results.defaultQualityBlob = newBlob
            compare()
          }, 'image/jpeg')
          canvas.toBlob(
            function (newBlob) {
              results.lowerQualityBlob = newBlob
              compare()
            },
            'image/jpeg',
            0.1
          )
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob with higher quality', function (done) {
      var results = {}
      /**
       * Compares blob sizes when both have been converted.
       */
      function compare() {
        if (results.defaultQualityBlob && results.lowerQualityBlob) {
          expect(results.lowerQualityBlob.size).to.be.above(
            results.defaultQualityBlob.size
          )
          done()
        }
      }
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            results.defaultQualityBlob = newBlob
            compare()
          }, 'image/jpeg')
          canvas.toBlob(
            function (newBlob) {
              results.lowerQualityBlob = newBlob
              compare()
            },
            'image/jpeg',
            1
          )
        },
        { canvas: true }
      )
    })

    it('Keeps the aspect ratio of the canvas image', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            window.loadImage(newBlob, function (img) {
              expect(img.width).to.equal(canvas.width)
              expect(img.height).to.equal(canvas.height)
              done()
            })
          })
        },
        { canvas: true }
      )
    })

    it('Keeps the image data of the canvas image', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvas.toBlob(function (newBlob) {
            window.loadImage(
              newBlob,
              function (newCanvas) {
                var canvasData = canvas
                  .getContext('2d')
                  .getImageData(0, 0, canvas.width, canvas.height)
                var newCanvasData = newCanvas
                  .getContext('2d')
                  .getImageData(0, 0, newCanvas.width, newCanvas.height)
                expect(canvasData.width).to.equal(newCanvasData.width)
                expect(canvasData.height).to.equal(newCanvasData.height)
                done()
              },
              { canvas: true }
            )
          })
        },
        { canvas: true }
      )
    })
  })

  describe('dataURLtoBlob', function () {
    it('Converts a canvas element to a blob and passes it to the callback function', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(canvas, function (newBlob) {
            expect(newBlob).to.be.a.instanceOf(Blob)
            done()
          })
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a PNG blob', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(
            canvas,
            function (newBlob) {
              expect(newBlob.type).to.equal('image/png')
              done()
            },
            'image/png'
          )
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(
            canvas,
            function (newBlob) {
              expect(newBlob.type).to.equal('image/jpeg')
              done()
            },
            'image/jpeg'
          )
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob with lower quality', function (done) {
      var results = {}
      /**
       * Compares blob sizes when both have been converted.
       */
      function compare() {
        if (results.defaultQualityBlob && results.lowerQualityBlob) {
          expect(results.lowerQualityBlob.size).to.be.below(
            results.defaultQualityBlob.size
          )
          done()
        }
      }
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(
            canvas,
            function (newBlob) {
              results.defaultQualityBlob = newBlob
              compare()
            },
            'image/jpeg'
          )
          canvasToBlob(
            canvas,
            function (newBlob) {
              results.lowerQualityBlob = newBlob
              compare()
            },
            'image/jpeg',
            0.1
          )
        },
        { canvas: true }
      )
    })

    it('Converts a canvas element to a JPG blob with higher quality', function (done) {
      var results = {}
      /**
       * Compares blob sizes when both have been converted.
       */
      function compare() {
        if (results.defaultQualityBlob && results.lowerQualityBlob) {
          expect(results.lowerQualityBlob.size).to.be.above(
            results.defaultQualityBlob.size
          )
          done()
        }
      }
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(
            canvas,
            function (newBlob) {
              results.defaultQualityBlob = newBlob
              compare()
            },
            'image/jpeg'
          )
          canvasToBlob(
            canvas,
            function (newBlob) {
              results.lowerQualityBlob = newBlob
              compare()
            },
            'image/jpeg',
            1
          )
        },
        { canvas: true }
      )
    })

    it('Keeps the aspect ratio of the canvas image', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(canvas, function (newBlob) {
            window.loadImage(newBlob, function (img) {
              expect(img.width).to.equal(canvas.width)
              expect(img.height).to.equal(canvas.height)
              done()
            })
          })
        },
        { canvas: true }
      )
    })

    it('Keeps the image data of the canvas image', function (done) {
      window.loadImage(
        blob,
        function (canvas) {
          canvasToBlob(canvas, function (newBlob) {
            window.loadImage(
              newBlob,
              function (newCanvas) {
                var canvasData = canvas
                  .getContext('2d')
                  .getImageData(0, 0, canvas.width, canvas.height)
                var newCanvasData = newCanvas
                  .getContext('2d')
                  .getImageData(0, 0, newCanvas.width, newCanvas.height)
                expect(canvasData.width).to.equal(newCanvasData.width)
                expect(canvasData.height).to.equal(newCanvasData.height)
                done()
              },
              { canvas: true }
            )
          })
        },
        { canvas: true }
      )
    })
  })
})()
