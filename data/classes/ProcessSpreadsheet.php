<?php

iRequire::one('models/Team');
/*
    This class handles the processing the spreadsheet uploaded by the editor.

    It first converts the spreadsheet into a CSV file, then traverses over the CSV file
    creating School objects, these objects are then added to an array and returned.
*/
class ProcessSpreadsheet{

    private $tempCSV = 'data.csv'; /* Where the temp CSV file will be stored */
    private $xlsFile;

    private $dataObject = null; /* Array containing all the Team objects */

    /*
        Process XLS contructor
        @param $xlsFile should be a relative path to the XLS file
    */
    public function __construct($xlFile){
        $this->xlsFile = $xlFile;
    }

    /*
        Converts the XLS into CSV, then parses the CSV into an array of Schools.
     */
    private function process(){
        /* CLEAN UP */
        $this->deleteTemp();

        /* Begin process */
        $this->convertToCSV();
        $this->parseCSV();


        /* CLEAN UP TEMP */
        $this->deleteTemp();
    }

    private function deleteTemp(){
        if(file_exists($this->tempCSV)){
            unlink($this->tempCSV);
        }
    }

    /*
        Converts the XLS file into a readable CSV file.

        DISABLES ERROR REPORTING TEMPORARILY BECAUSE THE SPREADSHEET PROCESSING THROWS WARNINGS
    */
    private function convertToCSV(){

        /* Disable reporting while processing spreadsheet */
        $errorReportNo = error_reporting();
        error_reporting(0);

        $fileType = PHPExcel_IOFactory::identify($this->xlsFile);
        $objReader = PHPExcel_IOFactory::createReader($fileType);
     
        $objReader->setReadDataOnly(true);   
        $objPHPExcel = $objReader->load($this->xlsFile);    
     
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
        $objWriter->save($this->tempCSV);

        /* Turn reporting back to normal */
        error_reporting($errorReportNo);
    }

    /*
        Loads the CSV file created by convertToCSV() and parses it into an array of
        Team objects
    */
    private function parseCSV(){
        $this->dataObject = new stdClass();

        $csvHandle = fopen($this->tempCSV, "r");
        $count = 0;

        $firstRow;

        while (!feof($csvHandle) ) {
            $count++;

            /* Get each line of the CSV file */
            $dataRow = fgetcsv($csvHandle);

            /* Ignore first line */
            if ($count <= 1) { $firstRow = $dataRow; continue; }

            /* Convert the data into a Team object and append to array */
            if($dataRow[0]){

                $newItem = $this->csvRowToTeam($dataRow);
                $prettyName = $newItem->getPrettyName();
                $this->dataObject->{$prettyName} = $newItem;
            }

        }

        // Do stuff with $firstRow
        /* 
            TODO: Validate first data row to ensure the correct table names are being inserted
                    in the correct fields.
        */

        fclose($csvHandle);
    }

    function prettyUrl($url) {
        $clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $url);
        $clean = strtolower(trim($clean, '-'));
        $clean = preg_replace("/[\/_|+ -]+/", '-', $clean);
        return $clean;
    }

    /*
        ======================================================
        = IF SPREADSHEET FORMAT CHANGES, EDIT THIS FUNCTION. =
        ======================================================

        Converts a line from parseCSV() into a school object.
    */
    private function csvRowToTeam($row){
        $team = new Team();

        $team->setName($row[0]);
        $team->setPrettyName($this->prettyUrl($row[0]));
        $team->setLeague($row[1]);
        $team->setCheapSeason($row[2]);
        $team->setDearSeason($row[3]);
        $team->setCheapTicket($row[4]);
        $team->setDearTicket($row[5]);
        $team->setAdultShirt($row[6]);
        $team->setJuniorShirt($row[7]);
        $team->setDayOut($row[8]);
        $team->setProgramme($row[9]);
        $team->setPie($row[10]);
        $team->setTea($row[11]);
        $team->setHomeGoals2013($row[12]);
        $team->setCheapSeason2013($row[13]);
        $team->setGoalCost($row[14]);
        $team->setCheapestMatchdayTicket2011($row[15]);

        
        return $team;
    }


    /*
        Returns an array of team objects (generated from the XLS file).
        If the XLS as not already been processed, this will begin by processing
        the file.

        @return array of Teams 
    */
    public function getDataObject(){
        if(!$this->dataObject){
            $this->process();
        }

        if(count(get_object_vars($this->dataObject))<=0){
            throw new Exception("Failed to extract data from XLS file.");   
        }

        return $this->dataObject;

    }

}