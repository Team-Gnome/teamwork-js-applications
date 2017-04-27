function request(url, type, body, headers) {
    const promise = new Promise((resolve, reject) => $.ajax({
        url,
        type,
        contentType: 'application/json',
        headers,
        data: body,
        success: resolve,
        error: reject
    }));

    return promise;
}

function get(url, headers = {}) {
    return request(url, 'GET', '', headers);
}

export {
    get
}
