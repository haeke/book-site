export const getBooks = async baseURL => {
  try {
    let data = await fetch(baseURL);
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const addBook = async (baseURL, book) => {
  console.log("book inside of addBook: ", book);
  try {
    const data = await fetch(baseURL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(book) // body data type must match "Content-Type" header
    });
  } catch (error) {
    console.error(error);
  }
};
