import fetch from "node-fetch";
import data from "./../assets/locations.json" assert { type: "json" };
let values = data;

Object.keys(values).forEach((element) => {
  Object.keys(values[element]).forEach((el) => {
    values[element][el].forEach((comm) => {
      fetch(
        "https://api.aladhan.com/v1/timingsByCity?city=" +
        encodeURIComponent(comm) +
        "&country=senegal&method=3"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          values[element][el][values[element][el].indexOf(comm)] = {
            [comm]: {
              latitude: data.data.meta.latitude,
              longitude: data.data.meta.longitude,
              departement: el,
            },
          };
        });
    });
  });
});
