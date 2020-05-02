const listOfRequests = document.getElementById('listOfRequests');

function getItems(url) {

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            data.sort((a, b) => {
                // return a.submit_date < b.submit_date
                //     && (a.votes.ups - a.votes.ups)  < (b.votes.ups - b.votes.ups);
                return (a.votes.ups - a.votes.downs)  < (b.votes.ups - b.votes.downs);
            });
            // console.table(data);
            return data.map((item) => { // Map through the results and for each run the code below
                append(listOfRequests, getRequestTemplate(item));
                addEventListenerToRequestTemplate(item);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}


