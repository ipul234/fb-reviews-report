<?php 

namespace Source\Analysis;

use Facebook\GraphNodes\GraphNode;

class FBRatingsAnalysis
{
    /* 
     * The data from facebook page ratings to be read
     * 
     * */
    protected $data = [];

    /* 
     * The current rating being evaluated
     * 
     * */
    protected $ratingInTurn = [];

    /* 
     * The result to be presented to the frontend as in ./structure.json
     * 
     * */
    protected $result = [];

    /* 
     * new \Source\Analysis\FBRatingsAnalysis($fbGraphObject())
     * 
     * Receives a FB graph object from the fb-graph-sdk
     * 
     * @param FBGraphObject
     * 
     * */
    public function __construct(GraphNode $pageRatings)
    {
        $this->data = $ratings;
    }

    /* 
     * Run the analysis for each data item
     * 
     * @return $result
     * */
    public function analyse(): array
    {
        $result = array_map(function($rating){
            return $rating
                    ->setDate()
                    ->clean()
                    ->calcAverage()
                    ->countReviews()
                    ->getCommonNouns()
                    ->getCommonAdjectives()
                    ->getCommonAdverbs()
                    ->getCommonPhrases()
                    ->makeContextualAnalysis()
                    ->makeMoodAnalysis();
        }, $this->data);

        return $result;
    }

    protected function present(Array $result)
    {
        header('Content-Type: application/json');
        echo json_encode($result);
        exit;
    }
}














