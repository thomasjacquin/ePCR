<?php

$content = $_POST['jsonString'];

header("Content-Length: ". strlen($content) .";");
header("Content-Disposition: attachment; filename='reports.epcr'");
header('Content-type: text/plain');
echo $content;

?>