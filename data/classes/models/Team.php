<?php
/*
    Model representing a team
*/

class Team{

    public $name;
    public $shortName;
    public $league;
    public $prettyLeague;
    public $cheapSeason;
    public $cheapTicket;
    public $adultShirt;
    public $programme;
    public $pie;
    public $tea;
    public $cheapSeason2013;
    public $goalCost;
    public $cheapestMatchdayTicket2011;
    public $pie2011;
    public $tea2011;
    public $programme2011;

    /* DATA WHICH IS NOT INCLUDED IN JSON */
    /* Make the values public to include them. */

    private $dearSeason;
    private $dearTicket;
    private $juniorShirt;
    private $dayOut;
    private $homeGoals2013;
    private $prettyName;


    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;

        return $this;
    }

    public function setPrettyName($name){
        $this->prettyName = $name;

        return $this;
    }

    public function getPrettyName(){
        return $this->prettyName;
    }
    
    public function getLeague(){
        return $this->league;
    }
    
    public function setLeague($league){
        $this->league = $league;

        return $this;
    }

    public function getPrettyLeague(){
        return $this->prettyLeague;
    }

    public function setPrettyLeague($prettyLeague){
        $this->prettyLeague = $prettyLeague;
    }

    public function getCheapSeason(){
        return $this->cheapSeason;
    }
    
    public function setCheapSeason($cheapSeason){
        $cheapSeason = ($cheapSeason=="" || $cheapSeason=="N/A") ? null : $cheapSeason;

        $this->cheapSeason = $cheapSeason;

        return $this;
    } 

    public function getDearSeason(){
        return $this->dearSeason;
    }
    
    public function setDearSeason($dearSeason){
        $dearSeason = ($dearSeason=="" || $dearSeason=="N/A") ? null : $dearSeason;


        $this->dearSeason = $dearSeason;

        return $this;
    }

    public function getCheapTicket(){
        return $this->cheapTicket;
    }

    public function setCheapTicket($cheapTicket){
        $cheapTicket = ($cheapTicket=="" || $cheapTicket=="N/A") ? null : $cheapTicket;

        $this->cheapTicket = $cheapTicket;

        return $this;
    }

    public function getDearTicket(){
        return $this->dearTicket;
    }

    public function setDearTicket($dearTicket){

        $dearTicket = ($dearTicket=="" || $dearTicket=="N/A") ? null : $dearTicket;

        $this->dearTicket = $dearTicket;

        return $this;
    }

    public function getAdultShirt(){
        return $this->adultShirt;
    }
    
    public function setAdultShirt($adultShirt){

        $adultShirt = ($adultShirt=="" || $adultShirt=="N/A") ? null : $adultShirt;

        $this->adultShirt = $adultShirt;

        return $this;
    }

    public function getJuniorShirt(){
        return $this->juniorShirt;
    }
    
    public function setJuniorShirt($juniorShirt){
        $juniorShirt = ($juniorShirt=="" || $juniorShirt=="N/A") ? null : $juniorShirt;

        $this->juniorShirt = $juniorShirt;

        return $this;
    }

    public function getDayOut(){
        return $this->dayOut;
    }
    
    public function setDayOut($dayOut){

        $dayOut = ($dayOut=="" || $dayOut=="N/A") ? null : $dayOut;

        $this->dayOut = $dayOut;

        return $this;
    }

    public function getProgramme(){
        return $this->programme;
    }
    
    public function setProgramme($programme){
        $programme = ($programme=="" || $programme=="N/A") ? null : $programme;

        $this->programme = $programme;

        return $this;
    }

    public function getPie(){
        return $this->pie;
    }
    
    public function setPie($pie){
        $pie = ($pie=="" || $pie=="N/A") ? null : $pie;

        $this->pie = $pie;

        return $this;
    }

    public function getTea(){
        return $this->tea;
    }

    public function setTea($tea){
        $tea = ($tea=="" || $tea=="N/A") ? null : $tea;

        $this->tea = $tea;

        return $this;
    }

    public function getHomeGoals2013(){
        return $this->homeGoals2013;
    }

    public function setHomeGoals2013($homeGoals2013){
        $homeGoals2013 = ($homeGoals2013=="" || $homeGoals2013=="N/A") ? null : $homeGoals2013;

        $this->homeGoals2013 = $homeGoals2013;

        return $this;
    }

    public function getCheapSeason2013(){
        return $this->cheapSeason2013;
    }
    
    public function setCheapSeason2013($cheapSeason2013){
        $cheapSeason2013 = ($cheapSeason2013=="" || $cheapSeason2013=="N/A") ? null : $cheapSeason2013;

        $this->cheapSeason2013 = $cheapSeason2013;

        return $this;
    }

    public function getGoalCost(){
        return $this->goalCost;
    }
    
    public function setGoalCost($goalCost){
        $goalCost = ($goalCost=="" || $goalCost=="N/A") ? null : $goalCost;

        $this->goalCost = $goalCost;

        return $this;
    }

    public function getCheapestMatchdayTicket2011(){
        return $this->cheapestMatchdayTicket2011;
    }
    
    public function setCheapestMatchdayTicket2011($cheapestMatchdayTicket2011){
        $cheapestMatchdayTicket2011 = ($cheapestMatchdayTicket2011=="" || $cheapestMatchdayTicket2011=="N/A") ? null : $cheapestMatchdayTicket2011;

        $this->cheapestMatchdayTicket2011 = $cheapestMatchdayTicket2011;

        return $this;
    }

    public function getPie2011(){
        return $this->pie2011;
    }

    public function setPie2011($pie2011){
        $pie2011 = ($pie2011=="" || $pie2011=="N/A") ? null : $pie2011;

        $this->pie2011 = $pie2011;

        return $this;
    }

    public function getProgramme2011(){
        return $this->programme2011;
    }

    public function setProgramme2011($programme2011){
        $programme2011 = ($programme2011=="" || $programme2011=="N/A") ? null : $programme2011;

        $this->programme2011 = $programme2011;
        
        return $this;
    }

    public function getTea2011(){
        return $this->Tea2011;
    }

    public function setTea2011($tea2011){
        $tea2011 = ($tea2011=="" || $tea2011=="N/A") ? null : $tea2011;

        $this->tea2011 = $tea2011;

        return $this;
    }

    public function getShortName(){
        return $this->shortName;
    }

    public function setShortName($shortName){
        $this->shortName = $shortName;
    }
} 