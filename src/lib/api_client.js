export const sendPost = async (url, body = {}, options = {}) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options,
    body: JSON.stringify(body)
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) throw response
  return response
}

export const sendGet = async (url, options = {}) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) throw response
  return response
}
