<?php

/**
* iRequire is intended to be PHP's answer to JavaScript's RequireJS.
*
* Example usage:
*
* iRequire::one('moduleA', 'moduleB');		// require_once
*
* iRequire::simply('moduleC');				// include
*
*/
class iRequire {

	private static $root = "classes/";
	private static $config = array(
		"Header" => "../../views/helpers/Header.php",
		"DOMBuilder" => "../../views/helpers/DOMBuilder.php"
	);
	private static $loaded = array();

	/**
	* Given a filename, returns the filepath needed
	* for the require/include call.
	*
	* @param $filename string 	The name of the file.
	* @return string 			The path to the file, including the filename.
	*/
	private static function filePath($filename) {
		$filepath = iRequire::$root . $filename . ".php";

		if (file_exists($filepath)) {
			return $filepath;
		}

		if (array_key_exists($filename, iRequire::$config)) {
			$filepath = iRequire::$config[$filename];
			return $filepath;
		}

		throw new Exception("File '$filename' does not have a path ($filepath) associated with it!");
	}

	/**
	* Converts an array of filenames to an array of filepaths to be called
	* with require/include.
	*
	* @param $filenames array<string> 	The names of the files whose paths we need.
	* @return array<string> 			The paths to all of the files, including the filenames.
	*/
	private static function filePaths($filenames) {
		$filepaths = array();
		foreach ($filenames as $key => $filename) {
			array_push($filepaths, iRequire::filePath($filename));
		}
		return $filepaths;
	}

	/**
	* Checks the given file has been loaded already.
	*
	* @param $filepath string 	The path to the file.
	* @return boolean 			true if already loaded, false if not.
	*/
	private static function alreadyLoaded($filepath) {
		foreach(iRequire::$loaded as $loadedPath) {
			if ($loadedPath == $filepath) {
				return true;
			}
		}
		return false;
	}

	/**
	* Loads files using the given method.
	*
	* @param $loadMethod string 		The way we want to load the file, e.g. 'require_once' or 'include'.
	* @param $filepaths array<string> 	The files we want to load.
	*/
	private static function load($loadMethod, $filepaths) {
		foreach ($filepaths as $filepath) {
			if ($loadMethod == 'require_once') {
				require_once $filepath;
			} else if($loadMethod == 'include') {
				if (iRequire::alreadyLoaded($filepath)) {
					throw new Exception("File '" . $filepath . "' already loaded.");
				}
				include $filepath;
			}
			array_push(iRequire::$loaded, $filepath);
		}
	}

	/**
	* Loads the given files using require_once.
	*/
	public static function one() {
		$filenames = func_get_args();
		iRequire::load("require_once", iRequire::filePaths($filenames));
	}

	/**
	* Loads the given files using include.
	*/
	public static function simply($filenames) {
		$filenames = func_get_args();
		iRequire::load("include", iRequire::filePaths($filenames));
	}

	/**
	* Track what's already been loaded - use for debugging.
	*/
	public static function loaded() {
		return iRequire::$loaded;
	}
}

?>