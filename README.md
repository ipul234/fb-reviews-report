# Facebook Ratings and Reviews Analysis Tool

### Scope

[88% Of Consumers Trust Online Reviews As Much As Personal Recommendations](http://searchengineland.com/88-consumers-trust-online-reviews-much-personal-recommendations-195803)

This feature is trying to aid Facebook page administrators to get more valuable insights from the ratings given by the reviewers, by letting them interact in a **review bar graph** where `x = review_date` and `y = rating_average_per_date`. 

By clicking in a bar, admins may get more insights from the content of the reviews given in a specific date and allow them to co-relate their operation strategies to positive or negative reviews.

### Use case

Let's say that a trend of low ratings in a company's Facebook page under the industry of _Food_ is registered between a period of 3 months. Between that period of time, the company may read from the reviews: 

- (1.5) The delivery guys suck. The one that was supposed to bring my food arrived way passed the estimated time and the food was already cold. Not to mention the quality of the packaging, wonder if he crashed into someone's trunk.
- (2.6) The food is great, but I don't know what's happening with their delivery, they used to be always on time...

But also some positive ones: 

- (4.8) Excellent as always, I loved the featuring of their new kashikume sauce
- (5.0) I wish I could give more stars, the Kashikume sauce is awesome!

From that period of time, the company also knows that:

- They hired 3 delivery guys in an urge for meeting delivery requests but they weren't trained properly
- An update in packaging caused hot content to melt the packaging tapes glue
- They hired a new chef who cooked the Kashikume sauce

The natural language processing tools applied to the content of the reviews may allow admins make better hipothesis from positive or negative reviews by letting them know what they did well or what went wrong.

### JSON response structure

Have a look to the structure of what constitutes the bar graph model: 

```json
{
    "2017-04-17": {
        "average_rating": 3.7,
        "reviews": 19,
        "common_nouns": [
            {
                "noun": "word",
                "times": 4
            }
        ],
        "common_adjectives": [
            {
                "adjective": "great",
                "times": 2
            }
        ],
        "common_adverbs": [
            {
                "adverb": "slow",
                "times": 5
            }
        ],
        "common_phrases": [
            {
                "phrase": "Service sucks",
                "times": 7
            }
        ],
        "contextual_analysis": {
            "customer_service": 3.7,
            "product_quality": 4.8,
            "taste": 2.4,
            "appearance": 4.8,
            "place": 3.6,
            "experience": 2.5
        },
        "mood_analysis": {
            "happiness": 3.4,
            "disappointment": 2.1,
            "anger": 4.7
        }
    }
}
```