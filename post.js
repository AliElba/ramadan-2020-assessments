function postUsingXMLHttpRequest() {

        let request = new XMLHttpRequest();
        request.open("POST", url_post, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                let responseData = JSON.parse(request.response);
                console.log(responseData);
            }
        };
        let author_name = document.getElementById("author_name").value;
        let author_email = document.getElementById("author_email").value;
        let topic_title = document.getElementById("topic_title").value;
        let target_level = document.getElementById("target_level").value;
        let topic_details = document.getElementById("topic_details").value;
        let expected_result = document.getElementById("expected_result").value;

        let data = JSON.stringify({
            author_name: author_name,
            author_email: author_email,
            topic_title: topic_title,
            target_level: target_level,
            topic_details: topic_details,
            expected_result: expected_result
        });
        request.send(data);
}

// POST using fetch and new FormData (required backend to accept multi part data - multer)
function postUsingFetch(formVideoRequest) {

        const formData = new FormData(formVideoRequest); //get all form data elements which has already name attribute on it
        fetch(url_post, {
            method: 'POST',
            body: formData
        })
            .then((resp) => resp.json()) // just to be sure the returned data is in json format
            .then((data) => {
                prepend(listOfRequests, getRequestTemplate(data));
                addEventListenerToRequestTemplate(data);
            });

}
