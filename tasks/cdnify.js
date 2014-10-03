module.exports = function (grunt) {
	grunt.config(['deploy_check_paths', 'default'], {
	    options: {
			base: '//test.example.com/stuff/'
		},
		files: [{
			expand: true,
			cwd: 'content/<%= config.services.default %>/',
			src: '**/*.{css,html,inc}',
			dest: 'content/<%= config.services.default %>/'
		}]
	});

	grunt.registerTask('deploy_check_paths', ['deploy_check_paths:default']);
};