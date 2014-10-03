module.exports = function (grunt) {
    grunt.registerTask('updateData', function () {

        var teamsJsonFile = 'data/generated/teams.json';
        var leaguesJsonFile = 'data/generated/leagues.json';

        var teamsDataFile = 'source/js/data/teams.js';
        var leaguesDataFile = 'source/js/data/leagues.js';


        var dataTemplate = 'define({JSON});';

        grunt.log.ok('Loading teams.json (' + teamsJsonFile + ')');
        var teamsJson = grunt.file.read(teamsJsonFile);
        grunt.log.ok('Loading leagues.json (' + teamsJsonFile + ')');
        var leaguesJson = grunt.file.read(leaguesJsonFile);

        var teamsData = dataTemplate.replace('{JSON}', teamsJson);
        var leaguesData = dataTemplate.replace('{JSON}', leaguesJson);

        grunt.file.write(teamsDataFile, teamsData);
        grunt.log.ok('Wrote teams data file (' + teamsDataFile + ')');

        grunt.file.write(leaguesDataFile, leaguesData);
        grunt.log.ok('Wrote leagues data file (' + leaguesDataFile + ')');

    });
        
};