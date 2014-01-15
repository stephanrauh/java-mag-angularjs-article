angular.module("cubeApp")
    .factory("flickr", function ($http) {

        var API_KEY = "4e0e99bf242015aee01bffea1efff314";
        var getPhotosFn = function (tag) {
            var tags = tag || "party";
            return $http.get("http://api.flickr.com/services/rest/", {
                params: {
                    method: "flickr.photos.search",
                    api_key: API_KEY,
                    format: "json",
                    nojsoncallback: 1,
                    per_page: "6",
                    tags: tags,
                    page: Math.floor(Math.random() * 20 + 1)
                }
            })
                .then(function (response) {
                    var array = response.data.photos.photo.map(function (photo) {
                        return "http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"
                            .replace("{farm-id}", photo.farm)
                            .replace("{server-id}", photo.server)
                            .replace("{id}", photo.id)
                            .replace("{secret}", photo.secret);
                    });
                    return array;
                });
        };

        // Public API
        return {
            getPhotos: getPhotosFn
        };
    });