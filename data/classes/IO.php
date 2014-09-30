<?php

class IO{

    public function recursiveMkdir($directory, $overwrite) 
    {
        if ($overwrite === false && is_dir($directory)) {
            return false;
        }
        // path, permissions, recursive
        if (!@mkdir($directory, 0777, true) && !$overwrite) {
            return false;
        }
        return true;
    }

    public function write($filename, $contents, $append = false)
    {
        if($append) {
            $writtenSuccessfully = @file_put_contents($filename, $contents, FILE_APPEND);
        } else {
            $writtenSuccessfully = @file_put_contents($filename, $contents);
        }

        if(!$writtenSuccessfully) {
            throw new Exception('Could not write to file ' . $filename . ' from location ' . getcwd());
        }
        return true;
    }

    // credit: http://stackoverflow.com/a/2050909
    public function recursiveCopy($src, $dst) { 
        $dir = opendir($src); 
        @mkdir($dst); 
        while(false !== ( $file = readdir($dir)) ) { 
            if (( $file != '.' ) && ( $file != '..' )) { 
                if (is_dir($src . '/' . $file)) { 
                    $this->recursiveCopy($src . '/' . $file,$dst . '/' . $file); 
                } 
                else { 
                    copy($src . '/' . $file,$dst . '/' . $file); 
                } 
            } 
        } 
        closedir($dir); 
    }
    
    /* http://stackoverflow.com/a/1653776 */
    public function emptyDir($dir) {
        if (!file_exists($dir)) {
            return true;
        }

        if (!is_dir($dir)) {
            return unlink($dir);
        }

        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }

            if (!$this->emptyDir($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }

        }

        return true;
    }

}