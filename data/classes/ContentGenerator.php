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
        $this->teamList = $teamList;
        $this->teamArray = (array) $this->teamList;
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
        $this->generateTeamJson();
        $this->generateLeagueJson();
        $this->generateDropDownHtml();
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
        Generates the HTML for the team drop down list
    */
    public function generateDropDownHtml(){
        $savePath = ContentGenerator::$GENERATED_FOLDER.ContentGenerator::$DROP_DOWN_HTML;

        /* Delete the old preview file if it exists */
        if(file_exists($savePath)){
            unlink($savePath);
        }

        $dropDownHtml = "<option value=\"0\">Choose your club</option>\n";
        foreach($this->teamArray as $team){
            $dropDownHtml .= "<option value=\"" . $team->getPrettyName() . "\">" . $team->getName() . "</option>\n";
        }


        /* Write the file */
        $this->io->write($savePath, $dropDownHtml);
        
    }

        /* 
       This is a usort function to compate two teams (for sorting alphabetically) 
    */
    public static function compareTeams($a, $b){
        return strcasecmp($a->getName(), $b->getName());
    }

}