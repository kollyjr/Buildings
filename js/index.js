document.addEventListener("DOMContentLoaded", (e) => {

    /** 
     * tag
     * 
     * @props
     * text: text of the tag
     * */
    Vue.component("tag", {
        props: ['text'],
        template: `<div class="tag">{{text}}</div>`
    });

    /** 
     * building-card
     * 
     * @props
     * building: building object containing the building name, address, image url, categories.
     * 
     * Note:
     * The object tag is used to render imageUrls, if the url is dead the img tag inside the object will render
     * the default image.
     * */
    Vue.component("building-card",
        {
            props: ['building'],
            template: `
                <div class="building-card" :id="building.id">
                    <img :src="building.imageUrl" :alt="building.name">
                    <h4>{{ building.name }} - {{ building.buildingNumber }}
                        <span v-if="building.buildingCode">| {{ building.buildingCode }}</span>
                    </h4>
                    <p>{{ building.address}}</br>{{building.zipCode}}</p>
                    <div class="tags-container">
                        <tag 
                            v-for="category in building.categories" 
                            v-bind:text="category.name"></tag>
                    </div>
                </div>`
        });

    var app = new Vue({
        el: '#app',
        data: {
            buildings: []
        }
    });

    fetch("https://content.osu.edu/v2/buildings")
        .then(output => output.json())
        .then(output => {
            app.buildings = output.data.buildings;
            buildings = output.data.buildings;
        })
        .catch(err => console.error(err));
})