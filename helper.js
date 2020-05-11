function append(parentElm, childElm) {
    return parentElm.appendChild(childElm); // Append the second parameter(element) to the first one
}

function prepend(parentElm, childElm) {
    return parentElm.prepend(childElm); // prepend the second parameter(element) to the first one
}

function createNode(element) {
    return document.createElement(element);
}

function getRequestTemplate(item) {

    const vidRequestTemp = `
        <div class="card mb-3">
            <div class="card-body d-flex justify-content-between flex-row">
                <div class="d-flex flex-column">
                    <h3>${item.topic_title}</h3>
                    <p class="text-muted mb-2">${item.topic_details}</p>
                    <p class="mb-0 text-muted">
                        ${item.expected_result && `<strong>Expected Results: </strong> ${item.expected_result}`}
                    </p>
                </div>
                <div class="d-flex flex-column text-center">
                    <a id="vote_ups_${item._id}" class="btn btn-link">🔺</a>
                    <h3 id="score_vote_${item._id}">${item.votes.ups - item.votes.downs}</h3>
                    <a id="vote_downs_${item._id}" class="btn btn-link">🔻</a>
                </div>
            </div>
            <div class="card-footer d-flex flex-row justify-content-between">
                <div>
                    <span class="text-info">NEW</span>
                    &bullet; added by <strong>${item.author_name}</strong> on
                    <strong>${new Date(item.submit_date).toLocaleDateString()}</strong>
                </div>
                <div class="d-flex justify-content-center flex-column 408ml-auto mr-2">
                    <div class="badge badge-success">
                        ${item.target_level}
                    </div>
                </div>
            </div>
        </div>
    `;

    let itemWrapperNode = createNode('div');
    itemWrapperNode.innerHTML = vidRequestTemp;

    return itemWrapperNode;
}


