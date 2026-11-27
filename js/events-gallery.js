const gallery = document.getElementById("events-gallery");

fetch("events-gallery.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.images.forEach(function (photo) {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.style.setProperty("--ratio", photo.width && photo.height ? photo.width / photo.height : 1.5);

      const img = document.createElement("img");

      img.addEventListener("load", function () {
        item.style.setProperty("--ratio", img.naturalWidth / img.naturalHeight);
      });

      img.src = photo.src;
      img.alt = photo.alt || "";
      img.width = photo.width;
      img.height = photo.height;
      img.loading = "lazy";
      img.oncontextmenu = function () { return false; };

      item.appendChild(img);
      gallery.appendChild(item);
    });
  })
  .catch(function (error) {
    console.log("Gallery failed to load:", error);
  });
