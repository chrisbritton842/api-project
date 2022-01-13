
document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("http://localhost:8080/tweets");
      const { tweets } = await res.json();
      console.log(tweets);

    if (res.status === 401) {
        res.redirect('/log-in')
        return
        } else {
            
        }
    } catch (e) {
      console.error(e);
    }
  });
