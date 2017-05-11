<?php 

namespace FBReviewsReport\Auth;

class FBLogin
{
    public function getPageRatings(String $pageId)
    {
        $fb = new \Facebook\Facebook($this->getConfig());

        try {
          $response = $fb->get("/$pageId?fields=access_token");
        } catch(\Facebook\Exceptions\FacebookResponseException $e) {
          echo 'Graph returned an error: ' . $e->getMessage();
          exit;
        } catch(\Facebook\Exceptions\FacebookSDKException $e) {
          echo 'Facebook SDK returned an error: ' . $e->getMessage();
          exit;
        }

        return $response->getGraphObject();
    }

    public function getConfig(): array
    {
        $file = getcwd() . '/config/fb.php';
        $config = require($file);
        return $config;
    }
}