export const get = async (url: string, method: 'GET' | 'POST', body?: any) => {
  try {
    const res = await fetch(`/api/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // discard statuses of 4xx and 5xx
    if (['4', '5'].includes(res.status.toString().slice(0, 1)))
      throw new Error(`${res.status} Error`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
