var friendsArray = require("../data/friends");


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray);
    });

    app.post("/api/friends", function (req, res) {
        //userData is the object where the values are stored
        // var userResultsArray = userData;
        friendsArray.push(req.body);
        var newFriend = friendsArray.length-1;
        var friendThatMatched = findMatch(newFriend);

        res.status(200).send(friendThatMatched);




    })
};

function findMatch(_indexOfFriend) {
    // var userResultsArray = userData;
    var bestMatchIndex = 0;
    var difference = 0;
    var prevBest = 41; // 5 -1 = 4, 4 * 10  = 40 ( largest possible difference between 2 people )
    for (var i = 0; i < friendsArray.length-1; ++i) {
        
        for (var x = 0; x < friendsArray[i].scores.length; ++x) {

            // add up the difference between scores
            difference += Math.abs(friendsArray[_indexOfFriend].scores[x] - friendsArray[i].scores[x]);
        }
        
            // if the prevBest is greater than the difference than the friend is a better match
            if (prevBest > difference) {
            
                // set the new best and store the index of the friend
                prevBest = difference;
                bestMatchIndex = i;
                //console.log(i);
            }
        difference = 0;
    }

    return friendsArray[bestMatchIndex];
}