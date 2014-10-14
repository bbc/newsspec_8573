<?php

iRequire::one('IO');

class ContentGenerator{

    /* The names of the generated files */
    private static $GENERATED_FOLDER = "generated/";  //Folder which contains the final files
    private static $TEAM_JSON = "teams.json";  
    private static $LEAGUE_JSON = "leagues.json";  
    private static $DROP_DOWN_HTML = "dropdown.html";  

    private $io;

    private $teamList;
    private $leagueList;

    public function __construct($teamList, $leagueList) {
        $this->io = new IO();
        $this->teamArray = (array) $teamList;
        /* Sort alphabetically */
        usort($this->teamArray, "ContentGenerator::compareTeams");

        $this->leagueList = $leagueList;

        if(!is_dir(ContentGenerator::$GENERATED_FOLDER)){
            if(!@mkdir(ContentGenerator::$GENERATED_FOLDER, 0777, true)){
                throw new Exception("Unable to make Live directory (".ContentGenerator::$GENERATED_FOLDER.")");
            }
        }

    }

    /* 
        Generates all the files needed and places them into the preview
        directory
    */
    public function generateAll(){
        $this->orderTeamsByLeague();
        $this->generateTeamJson();
        $this->generateLeagueJson();
        //$this->generateDropDownHtml();
    }

    private function orderTeamsByLeague() {
        $this->teamList = new stdClass;
        foreach($this->leagueList as $league){
            foreach($this->teamArray as $team){
                if($league->getPrettyName()===$team->getPrettyLeague()){
                    $this->teamList->{$team->getPrettyName()} = $team;
                }
            }
        }
    }

    /*
        Generates the JSON for the teams
    */
    public function generateTeamJson(){
        $savePath = ContentGenerator::$GENERATED_FOLDER.ContentGenerator::$TEAM_JSON;

        /* Delete the old preview file if it exists */
        if(file_exists($savePath)){
            unlink($savePath);
        }


        /* Write the file */
        $this->io->write($savePath, json_encode($this->teamList));
        
    }

    /*
        Generates the JSON for the league
    */
    public function generateLeagueJson(){
        $savePath = ContentGenerator::$GENERATED_FOLDER.ContentGenerator::$LEAGUE_JSON;

        /* Delete the old preview file if it exists */
        if(file_exists($savePath)){
            unlink($savePath);
        }


        /* Write the file */
        $this->io->write($savePath, json_encode($this->leagueList));
        
    }


        /* 
       This is a usort function to compate two teams (for sorting alphabetically) 
    */
    public static function compareTeams($a, $b){
        return strcasecmp($a->getName(), $b->getName());
    }

}