<pre>
<?php

shell_exec("{$_ENV['DOCUMENT_ROOT']}\bash-script.sh");

# Execute a shell command
$output = shell_exec("echo | {$_ENV['SYSTEMROOT']}\System32\wbem\wmic.exe path win32_computersystemproduct get uuid");
if ($output) {
    var_dump($output);
} else {
    var_dump("Command failed.");
}

# Open a repository
// $explorer = $_ENV["SYSTEMROOT"] . '\\explorer.exe';
// $folder_to_open = "C:\\Windows";
// shell_exec("$explorer /n,/e,$folder_to_open");

# Environmental variables
// var_dump($_ENV);
?>
</pre>
