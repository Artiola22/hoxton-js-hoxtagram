const state = {
    images: [],
};

const imageContainer = document.querySelector(".image-container")

function getImages() {
    return fetch("http://localhost:3000/images").then((response) =>
        response.json()
    );
}

getImages().then(function (imagesFromServer) {
    state.images = imagesFromServer;


    render();
});

function render() {

    imageContainer.innerHTML = "";
    for (const image of state.images) {
        const imageCard = document.createElement("article")
        imageCard.setAttribute("class", "image-card")

        const h2El = document.createElement("h2")
        h2El.setAttribute("class", "title")
        h2El.textContent = image.title

        const imageEl = document.createElement("image")
        imageEl.setAttribute("src", image.image)
        imageEl.setAttribute("class", "image")

        const likesSection = document.createElement("div")
        likesSection.setAttribute("class", "likes-section")


        const spanEl = document.createElement("span")
        spanEl.setAttribute("class", "likes")
        spanEl.textContent = image.likes;

        const likeButton = document.createElement("button")
        likeButton.setAttribute("class", "like-button")
        likeButton.textContent = "♥"

        likesSection.append(spanEl, likeButton)


        const commentsSection = document.createElement("ul")
        commentsSection.setAttribute("class", "comments")

        for (const comment of image.comments) {

            const listEl = document.createElement("li")
            listEl.textContent = comment.content;
            commentsSection.append(listEl)

        }
        imageCard.append(h2El, imageEl, likesSection, commentsSection)
        imageContainer.append(imageCard);
    }

}