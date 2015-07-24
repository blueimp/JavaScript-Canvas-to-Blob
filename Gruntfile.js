/*
 * JavaScript Canvas to Blob Gruntfile
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'js/canvas-to-blob.js',
                'test/test.js'
            ]
        },
        uglify: {
            production: {
                src: [
                    'js/canvas-to-blob.js'
                ],
                dest: 'js/canvas-to-blob.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump-build-git');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['test', 'uglify']);

};
