module.exports = function (grunt) {

    grunt.config('cssmin', {
        minify: {
            expand: true,
            cwd: 'content/<%= config.services.default %>/css/',
            src: ['*.css'],
            dest: 'content/<%= config.services.default %>/css/'
        }
    });

    grunt.config('uglify', {
        options: {
            mangle: true
        },
        my_target: {
            files: {
                'content/<%= config.services.default %>/js/lib/news_special/iframemanager__host.js': ['source/js/lib/news_special/iframemanager__host.js']
            }
        }
    });

    grunt.config('passParams', {
        options: {
            staticPath: '<%= env[config.whichEnv].domainStatic %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content/'
        }
    });

    grunt.registerTask('passParams', function () {
        var options = this.options();
        grunt.log.ok(options.staticPath);

        var pathStatic = 'test';
        var staticPathDir = pathStatic + '/english';

        grunt.file.write('source/scss/news_special/grunt-values.scss', '$staticPath: "' + staticPathDir + '";');
    });
        
    grunt.registerTask('css', ['clean:sasscache', 'sass:main', 'sass:inline', 'csslint', 'cssmin']);
};