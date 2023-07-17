async function get(successCb, failureCb) {
    const res = await fetch('/get')
    const body = await res.json()

    if (!res.ok) return failureCb(body, res)
    return successCb(body, res)
}

async function update(email, password, successCb, failureCb) {
    const _body = {}
    if (email) _body.fields = {email}
    if (password) _body.password = password

    console.log('api, update - _body:', _body)

    const res = await fetch('/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(_body)
    })

    const body = await res.json()

    if (!res.ok) return failureCb(body, res)
    return successCb(body, res)
}

export default {get, update}