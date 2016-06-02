$(document).ready(function() {
    $('.movie-getter').submit(function(event) {
        // zero out results if previous search has run
        $('.results').html('');
        // get the value of the tags the user submitted
        var answerers = $(this).find("input[name='answerers']").val();
        getTopAnswerers(answerers);
        console.log("submit");
    });
});

var getTopAnswerers = function(answerers) {
    //need help with passing correct parameters for Netflix roulette api
    var request = {
        tag: answerers,
        // site: 'netflixroulette',
        // order: 'desc',
        // sort: 'creation'
    };
    var result = $.ajax({
            url: "http://netflixroulette.net/api/api.php?director=" + request.tag + "",
            data: request,
            dataType: "jsonp",
            type: "GET",
        })
        .done(function(result) {
            var searchResults = showSearchResults(request.tagged, result.items.length);
            $('.search-results').html(searchResults);

            $.each(result.items, function(i, item) {
                var answer = showAnswerer(item);
                $('.results').append(answer);
                console.log(results);
            });
        })
        .fail(function(jqXHR, error, errorThrown) {
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
        });
}
var showAnswerer = function(answer) {
    //clone our results 
    var result = $('.templates .answerers').clone();

    console.log("shortAnswerDisplay");
    var posterimage = results.find('.posterimage');
    posterimage.attr('src', answer.user.poster);
    rating.text();

    var rating = result.find('.rating');
    rating.text(answer.rating);

    var runtime = result.find('.runtime');
    runtime.text(answer.runtime);

    var summary = result.find('.summary');
    summary.text(answer.summary);
    console.log('test');
}



var showSearchResults = function(query, resultNum) {
    var results = resultNum + ' results for <strong>' + query;
    return results;
};
// takes error string and turns it into displayable DOM element
var showError = function(error) {
    var errorElem = $('.templates .error').clone();
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
};

