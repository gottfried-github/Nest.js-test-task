async function get(successCb, failureCb) {
    const res = await fetch('/get')
    const body = await res.json()

    if (!res.ok) return failureCb(body, res)
    return successCb(body, res)
}

export default {get}