/**
 * sortBuildings
 * sort's the buildings array by key, and provided direction
 * 
 * @param data array of buildings
 * @param key key in the object to sort by
 * @param direction sorting direction asc|desc
 * @returns array of sorted buildings
 */
function sortBuildings(data, key, direction) {
    data.sort(function (a, b) {
        if (direction == "asc") {
            if (a[key] > b[key]) {
                return 1;
            }

            return -1;
        } else {
            if (a[key] < b[key]) {
                return 1;
            }

            return -1;
        }
    });

    return data;
}

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
     * building: building object from the building array.
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

    /** 
     * select-node
     * 
     * @props
     * name: name of the select.
     * label: label displayed above the select tag when rendered
     * options: options (as an array of objects with keys value and name) to be selected
     * */
    Vue.component("select-node",
        {
            props: ['name', 'label', 'options'],
            template: `
                <div class="sort-container">
                    <label :for="name">{{label}}</label>
                    <select :name="name" v-on:change="$emit('sort', $event.target.value)">
                        <option v-for="option in options" :value="option.value">{{option.name}}</option>
                    </select>
                </div>`
        });

    var app = new Vue({
        el: '#app',
        data: {
            buildings: [],
            sortingOption: [
                { name: "Name Ascending", value: "name:asc" },
                { name: "Name Descending", value: "name:desc" }
            ]
        },
        methods: {
            sort: function (value) {
                value = value.split(":");
                let key = value[0];
                let direction = value[1];
                this.buildings = sortBuildings(this.buildings, key, direction);
            }
        }
    });

    fetch("https://content.osu.edu/v2/buildings")
        .then(output => output.json())
        .then(output => {
            app.buildings = sortBuildings(output.data.buildings, "name", "asc");
        })
        .catch(err => console.error(err));
})