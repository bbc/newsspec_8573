<?php

	require_once "vendor/autoload.php";
	require_once 'classes/iRequire.php';

	require_once 'classes/ProcessSpreadsheets.php';
	require_once 'classes/ContentGenerator.php';

	$shortopts = "t::"; // Optional value

	$options = getopt($shortopts);

	$teamsXlsFile = (array_key_exists("t", $options)) ? $options['t'] : "teams.xls";
	$leaguesXlsFile = (array_key_exists("l", $options)) ? $options['l'] : "leagues.xls";

	echo "==================== USING FILES: =====================\n";
	echo " 1. Team spreadsheet:       ".$teamsXlsFile."\n";
	echo " 2. Leagues spreadsheet:    ".$leaguesXlsFile."\n";
	echo " 3. Team data output:       generated/teams.json\n";
	echo " 4. League data output:     generated/leagues.json\n";
	echo " 5. Team drop down html:    generated/dropdown.html\n";
	echo "================= CONVERTING TO CSV: ==================\n";

	$xlsProcessor = new ProcessSpreadsheets($teamsXlsFile, $leaguesXlsFile);


	echo "=============== PARSING DATA TO ARRAYS: ================\n";

	$teamsObject = $xlsProcessor->getTeamsObject();
	$leaguesObject = $xlsProcessor->getLeaguesObject();

	echo "=============== SAVING ARRAY TO JSON: ================\n";


	$contentGenerator = new ContentGenerator($teamsObject, $leaguesObject);
	$contentGenerator->generateAll();

	echo "====================== COMPLETE =======================\n";
?>