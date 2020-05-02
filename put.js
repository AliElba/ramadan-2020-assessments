function updateVoteUsingFetch(data, scoreVoteElem) {
    if (data === undefined)
        return;

    fetch(url_put,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            scoreVoteElem.innerHTML = (data.ups - data.downs);
        });
}
