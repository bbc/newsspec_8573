<?php
/*
    Model representing a team
*/

class Team{

    public $name;
    public $league;
    public $cheapSeason;
    public $cheapTicket;
    public $adultShirt;
    public $programme;
    public $pie;
    public $tea;
    public $cheapSeason2013;
    public $goalCost;
    public $cheapestMatchdayTicket2011;

    /* DATA WHICH IS NOT INCLUDED IN JSON */
    /* Make the values public to include them. */

    private $dearSeason;
    private $dearTicket;
    private $juniorShirt;
    private $dayOut;
    private $homeGoals2013;
    private $prettyName;



    /**
     * Gets the value of name.
     *
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * Sets the value of name.
     *
     * @param mixed $name the name 
     *
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Sets the value of name.
     *
     * @param mixed $name the name 
     *
     * @return self
     */
    public function setPrettyName($name)
    {
        $this->prettyName = $name;

        return $this;
    }

    /**
     * Gets the value of name.
     *
     * @return mixed
     */
    public function getPrettyName()
    {
        return $this->prettyName;
    }
    

    /**
     * Gets the value of league.
     *
     * @return mixed
     */
    public function getLeague()
    {
        return $this->league;
    }
    
    /**
     * Sets the value of league.
     *
     * @param mixed $league the league 
     *
     * @return self
     */
    public function setLeague($league)
    {
        $this->league = $league;

        return $this;
    }

    /**
     * Gets the value of cheapSeason.
     *
     * @return mixed
     */
    public function getCheapSeason()
    {
        return $this->cheapSeason;
    }
    
    /**
     * Sets the value of cheapSeason.
     *
     * @param mixed $cheapSeason the cheap season 
     *
     * @return self
     */
    public function setCheapSeason($cheapSeason)
    {
        $cheapSeason = ($cheapSeason=="" || $cheapSeason=="N/A") ? null : $cheapSeason;

        $this->cheapSeason = $cheapSeason;

        return $this;
    }

    /**
     * Gets the value of dearSeason.
     *
     * @return mixed
     */
    public function getDearSeason()
    {
        return $this->dearSeason;
    }
    
    /**
     * Sets the value of dearSeason.
     *
     * @param mixed $dearSeason the dear season 
     *
     * @return self
     */
    public function setDearSeason($dearSeason)
    {
        $dearSeason = ($dearSeason=="" || $dearSeason=="N/A") ? null : $dearSeason;


        $this->dearSeason = $dearSeason;

        return $this;
    }

    /**
     * Gets the value of cheapTicket.
     *
     * @return mixed
     */
    public function getCheapTicket()
    {
        return $this->cheapTicket;
    }
    
    /**
     * Sets the value of cheapTicket.
     *
     * @param mixed $cheapTicket the cheap ticket 
     *
     * @return self
     */
    public function setCheapTicket($cheapTicket)
    {
        $cheapTicket = ($cheapTicket=="" || $cheapTicket=="N/A") ? null : $cheapTicket;

        $this->cheapTicket = $cheapTicket;

        return $this;
    }

    /**
     * Gets the value of dearTicket.
     *
     * @return mixed
     */
    public function getDearTicket()
    {
        return $this->dearTicket;
    }
    
    /**
     * Sets the value of dearTicket.
     *
     * @param mixed $dearTicket the dear ticket 
     *
     * @return self
     */
    public function setDearTicket($dearTicket)
    {

        $dearTicket = ($dearTicket=="" || $dearTicket=="N/A") ? null : $dearTicket;

        $this->dearTicket = $dearTicket;

        return $this;
    }

    /**
     * Gets the value of adultShirt.
     *
     * @return mixed
     */
    public function getAdultShirt()
    {
        return $this->adultShirt;
    }
    
    /**
     * Sets the value of adultShirt.
     *
     * @param mixed $adultShirt the adult shirt 
     *
     * @return self
     */
    public function setAdultShirt($adultShirt)
    {

        $adultShirt = ($adultShirt=="" || $adultShirt=="N/A") ? null : $adultShirt;

        $this->adultShirt = $adultShirt;

        return $this;
    }

    /**
     * Gets the value of juniorShirt.
     *
     * @return mixed
     */
    public function getJuniorShirt()
    {
        return $this->juniorShirt;
    }
    
    /**
     * Sets the value of juniorShirt.
     *
     * @param mixed $juniorShirt the junior shirt 
     *
     * @return self
     */
    public function setJuniorShirt($juniorShirt)
    {
        $juniorShirt = ($juniorShirt=="" || $juniorShirt=="N/A") ? null : $juniorShirt;

        $this->juniorShirt = $juniorShirt;

        return $this;
    }

    /**
     * Gets the value of dayOut.
     *
     * @return mixed
     */
    public function getDayOut()
    {
        return $this->dayOut;
    }
    
    /**
     * Sets the value of dayOut.
     *
     * @param mixed $dayOut the day out 
     *
     * @return self
     */
    public function setDayOut($dayOut)
    {

        $dayOut = ($dayOut=="" || $dayOut=="N/A") ? null : $dayOut;

        $this->dayOut = $dayOut;

        return $this;
    }

    /**
     * Gets the value of programme.
     *
     * @return mixed
     */
    public function getProgramme()
    {
        return $this->programme;
    }
    
    /**
     * Sets the value of programme.
     *
     * @param mixed $programme the programme 
     *
     * @return self
     */
    public function setProgramme($programme)
    {
        $programme = ($programme=="" || $programme=="N/A") ? null : $programme;

        $this->programme = $programme;

        return $this;
    }

    /**
     * Gets the value of pie.
     *
     * @return mixed
     */
    public function getPie()
    {
        return $this->pie;
    }
    
    /**
     * Sets the value of pie.
     *
     * @param mixed $pie the pie 
     *
     * @return self
     */
    public function setPie($pie)
    {
        $pie = ($pie=="" || $pie=="N/A") ? null : $pie;

        $this->pie = $pie;

        return $this;
    }

    /**
     * Gets the value of tea.
     *
     * @return mixed
     */
    public function getTea()
    {
        return $this->tea;
    }
    
    /**
     * Sets the value of tea.
     *
     * @param mixed $tea the tea 
     *
     * @return self
     */
    public function setTea($tea)
    {
        $tea = ($tea=="" || $tea=="N/A") ? null : $tea;

        $this->tea = $tea;

        return $this;
    }

    /**
     * Gets the value of homeGoals2013.
     *
     * @return mixed
     */
    public function getHomeGoals2013()
    {
        return $this->homeGoals2013;
    }
    
    /**
     * Sets the value of homeGoals2013.
     *
     * @param mixed $homeGoals2013 the home goals2013 
     *
     * @return self
     */
    public function setHomeGoals2013($homeGoals2013)
    {
        $homeGoals2013 = ($homeGoals2013=="" || $homeGoals2013=="N/A") ? null : $homeGoals2013;

        $this->homeGoals2013 = $homeGoals2013;

        return $this;
    }

    /**
     * Gets the value of cheapSeason2013.
     *
     * @return mixed
     */
    public function getCheapSeason2013()
    {
        return $this->cheapSeason2013;
    }
    
    /**
     * Sets the value of cheapSeason2013.
     *
     * @param mixed $cheapSeason2013 the cheap season2013 
     *
     * @return self
     */
    public function setCheapSeason2013($cheapSeason2013)
    {
        $cheapSeason2013 = ($cheapSeason2013=="" || $cheapSeason2013=="N/A") ? null : $cheapSeason2013;

        $this->cheapSeason2013 = $cheapSeason2013;

        return $this;
    }

    /**
     * Gets the value of goalCost.
     *
     * @return mixed
     */
    public function getGoalCost()
    {
        return $this->goalCost;
    }
    
    /**
     * Sets the value of goalCost.
     *
     * @param mixed $goalCost the goal cost 
     *
     * @return self
     */
    public function setGoalCost($goalCost)
    {
        $goalCost = ($goalCost=="" || $goalCost=="N/A") ? null : $goalCost;

        $this->goalCost = $goalCost;

        return $this;
    }

    /**
     * Gets the value of cheapestMatchdayTicket2011.
     *
     * @return mixed
     */
    public function getCheapestMatchdayTicket2011()
    {
        return $this->cheapestMatchdayTicket2011;
    }
    
    /**
     * Sets the value of cheapestMatchdayTicket2011.
     *
     * @param mixed $cheapestMatchdayTicket2011 the cheapest matchday ticket2011 
     *
     * @return self
     */
    public function setCheapestMatchdayTicket2011($cheapestMatchdayTicket2011)
    {
        $cheapestMatchdayTicket2011 = ($cheapestMatchdayTicket2011=="" || $cheapestMatchdayTicket2011=="N/A") ? null : $cheapestMatchdayTicket2011;

        $this->cheapestMatchdayTicket2011 = $cheapestMatchdayTicket2011;

        return $this;
    }
} 