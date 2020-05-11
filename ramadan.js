const url_post = 'http://localhost:7777/video-request';
const url_get = 'http://localhost:7777/video-request';
const url_put = 'http://localhost:7777/video-request/vote';
const listOfRequests = document.getElementById('listOfRequests');
const formVideoRequest = document.getElementById('formVideoRequest');

document.addEventListener('DOMContentLoaded', function() {
    //fired once the dom content loaded, even before the images are loaded vs window.

    // Submit a video request.
    formVideoRequest.addEventListener('submit', function(event) {
        // ignore any other action on the page which will avoid the post back event
        event.preventDefault();
        // postUsingXMLHttpRequest();
        postUsingFetch(formVideoRequest);
    });

    // Show list of requests below the form
    getItems(url_get);
});

function getItems(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            // Sorting options: new first the default one, and top voted first.
            data.sort((prev, next) => {
                return (next.votes.ups - next.votes.downs) - (prev.votes.ups - prev.votes.downs);
            });
            return data.map(item => {
                // Map through the results and for each run the code below
                append(listOfRequests, getRequestTemplate(item));
                addEventListenerToRequestTemplate(item);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function postUsingXMLHttpRequest() {
    let request = new XMLHttpRequest();
    request.open('POST', url_post, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let responseData = JSON.parse(request.response);
            // console.log(responseData);
        }
    };
    let author_name = document.getElementById('author_name').value;
    let author_email = document.getElementById('author_email').value;
    let topic_title = document.getElementById('topic_title').value;
    let target_level = document.getElementById('target_level').value;
    let topic_details = document.getElementById('topic_details').value;
    let expected_result = document.getElementById('expected_result').value;

    let data = JSON.stringify({
        author_name: author_name,
        author_email: author_email,
        topic_title: topic_title,
        target_level: target_level,
        topic_details: topic_details,
        expected_result: expected_result,
    });
    request.send(data);
}

function postUsingFetch(formVideoRequest) {
    // POST using fetch and new FormData (required backend to accept multi part data - multer)

    //get all form data elements which has already name attribute on it
    const formData = new FormData(formVideoRequest);
    fetch(url_post, {
        method: 'POST',
        body: formData,
    })
        .then(resp => resp.json()) // just to be sure the returned data is in json format
        .then(data => {
            prepend(listOfRequests, getRequestTemplate(data));
            addEventListenerToRequestTemplate(data);
        });
}

function addEventListenerToRequestTemplate(item) {
    const scoreVoteElem = document.getElementById(`score_vote_${item._id}`);

    document.getElementById(`vote_ups_${item._id}`)
        .addEventListener('click', function(event) {
            event.preventDefault();
            updateVoteUsingFetch({ id: item._id, vote_type: 'ups' }, scoreVoteElem);
        });
    document.getElementById(`vote_downs_${item._id}`)
        .addEventListener('click', function(event) {
            event.preventDefault();
            updateVoteUsingFetch({ id: item._id, vote_type: 'downs' }, scoreVoteElem);
        });

}

function updateVoteUsingFetch(data, scoreVoteElem) {
    // Vote up and down on each request

    if (data === undefined)
        return;

    fetch(url_put,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data.votes);
            scoreVoteElem.innerHTML = (data.votes.ups - data.votes.downs);
        });
}
