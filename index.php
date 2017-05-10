<?php 

const PAGE_ID = '1376286872412138'; // rappimx

if (file_exists('vendor/autoload.php')) {
    include 'vendor/autoload.php';
}

$fbLogin = new Source\Auth\FBLogin;
$pageRatings = $fbLogin->getPageRatings(PAGE_ID);
$FBAnalysis = new Source\Analysis\FBRatingsAnalysis($pageRatings);
$FBAnalysis->analyse();