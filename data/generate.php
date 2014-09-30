<?php

	require_once "vendor/autoload.php";
	require_once 'classes/iRequire.php';

	require_once 'classes/ProcessSpreadsheet.php';
	require_once 'classes/ContentGenerator.php';

	$shortopts = "d::"; // Optional value

	$options = getopt($shortopts);

	$xlsFile = (array_key_exists("d", $options)) ? $options['d'] : "data.xls";

	echo "================== USING DIRECTORYS: ==================\n";
	echo " 1. Spreadsheet:            ".$xlsFile."\n";
	echo " 2. Team data output:       teams.json\n";
	echo " 3. League data output:     leagues.json\n";
	echo " 3. Team drop down html:    dropdown.html\n";
	echo "================= CONVERTING TO CSV: ==================\n";

	$xlsProcessor = new ProcessSpreadsheet($xlsFile);


	echo "=============== PARSING DATA TO ARRAY: ================\n";

	$teamsArray = $xlsProcessor->getDataObject();

	echo "=============== SAVING ARRAY TO JSON: ================\n";


	$contentGenerator = new ContentGenerator($teamsArray);
	$contentGenerator->generateAll();

	echo "====================== COMPLETE =======================\n";

?>