// @bug - Selection isn't locked. Selecting more than one element works but ideally shouldn't
// @bug - Water needs to be revamped as component or have an additional area parameter
// @bug - Markers with idential names display incorrectly when switching between maps sharing them (Union City)

window.Event = new Vue();

Vue.component('pro-map', {
    template: `
        <div class="pro-map-wrap" @mouseover="wakeApp" @mouseout="sleepApp">
            <div class="pro-map-contents">
                <valucre-map :model="activeMap"></valucre-map>
                <div class="topanno">
                    <div class="instructions">
                        <div class="topannoL">{{infoL}}</div>
                        <div class="topannoR">{{infoR}}</div>
                    </div>
                    <div class="notes">
                        <div class="notesMain">{{notes}}</div>
                        <div class="notesDetail">{{details}}</div>
                    </div>
                </div>
                <div class="anno">
                    <div class="annoL">{{newName}}</div>
                    <div class="annoR">{{activeCoords}}</div>
                </div>
                <div class="extendedAnno">
                    <div class="extendedAnnoL">{{activeRegion}}</div>
                    <div class="extendedAnnoR">{{activeLabel}}</div>
                </div>
            </div>
            <div class="pro-map-info">
                <mod-keys></mod-keys>
                <revisions></revisions>
            </div>
            <texter></texter>
        </div>
    `,
    data() {
        return {
            msg: 'Hello world-map',
            original: {},
            notelist: ['Poor', 'Poor', 'Okay', 'Very poor', 'Very poor', 'Very poor', 'Good'],
            detaillist: [
                'Quality is low and assets bare. No roads, rivers, regions, oceans, etc.',
                'Quality is low and assets bare. No roads, rivers, regions, oceans, etc.',
                'Quality is good but missing assets: bounds, rivers, roads, regions, etc.',
                'Quality is extremely low and missing crucial information', 
                'Quality is extremely low and missing crucial information',
                'Quality is extremely low and missing crucial information',
                'Quality is okay with additional padding for hovering over waters/areas',
            ],
            // @@ Add new markers here. 
            // If name has apostrophe, must use grave accents `` to wrap string instead of apostrophes ''
            map: {
                west_genesaris: {
                    name: 'west_genesaris',
                    cities: [
                        {
                            name: 'St. Desolatus',
                            area: 'body',
                            link: '',
                            x: 27.4,
                            y: 44.4,
                        },
                        {
                            name: 'Aelindra',
                            area: 'body',
                            link: '',
                            x: 70.1,
                            y: 33.2,
                        },
                        {
                            name: `Raven's Landing`,
                            area: 'body',
                            link: '',
                            x: 66.4,
                            y: 26.7,
                        },
                        {
                            name: 'Joran',
                            area: 'body',
                            link: '',
                            x: 50.3,
                            y: 47.4,
                        },
                        {
                            name: 'Union City',
                            area: 'body',
                            link: '',
                            x: 88.3,
                            y: 53.7,
                        },
                        {
                            name: 'Mezthaluen',
                            area: 'body',
                            link: '',
                            x: 77.1,
                            y: 50.3,
                        }, 
                    ],
                    towns: [
                        {
                            name: 'Dragonsoul Summit',
                            area: 'body',
                            link: '',
                            x: 37.5,
                            y: 61.6,
                        },
                        {
                            name: 'Port Kyros',
                            area: 'body',
                            link: '',
                            x: 52.4,
                            y: 23.8,
                        },
                        {
                            name: 'Wicker City Prison',
                            area: 'body',
                            link: '',
                            x: 55.5,
                            y: 31.6,
                        },
                        {
                            name: 'Crystallo',
                            area: 'body',
                            link: '',
                            x: 48.8,
                            y: 33,
                        },
                        {
                            name: 'Alethea',
                            area: 'body',
                            link: '',
                            x: 44,
                            y: 28.7,
                        },
                        {
                            name: 'Valjer 2',
                            area: 'body',
                            link: '',
                            x: 87.6,
                            y: 65.9,
                        },
                        {
                            name: 'Stormward',
                            area: 'body',
                            link: '',
                            x: 68.6,
                            y: 61.1,
                        },
                    ],
                    places: [
                        {
                            name: 'Shienvar Mtns.',
                            area: 'body',
                            link: '',
                            x: 39.3,
                            y: 55.9,
                        },
                        {
                            name: 'Umbridge Isle',
                            area: 'body',
                            link: '',
                            x: 34.4,
                            y: 43.6,
                        },
                        {
                            name: 'Bloodstone Marsh',
                            area: 'body',
                            link: '',
                            x: 70.4,
                            y: 41.8,
                        },
                        {
                            name: 'Velhatien Desert',
                            area: 'body',
                            link: '',
                            x: 59.4,
                            y: 48.3,
                        },
                        {
                            name: 'Mt. Fulgur',
                            area: 'body',
                            link: '',
                            x: 72.6,
                            y: 63.6,
                        },
                    ],
                },
                east_genesaris: {
                    name: 'east_genesaris',
                    cities: [
                        {
                            name: 'Union City 2',
                            area: 'body',
                            link: '',
                            x: 17.8,
                            y: 53.7,
                        },
                        {
                            name: 'Coastal Grande',
                            area: 'body',
                            link: '',
                            x: 33.1,
                            y: 17.8,
                        },
                        {
                            name: 'Umbra',
                            area: 'body',
                            link: '',
                            x: 65.3,
                            y: 48.2,
                        },
                        {
                            name: 'Strider',
                            area: 'body',
                            link: '',
                            x: 29.3,
                            y: 55.8,
                        },
                        {
                            name: 'Shrine City',
                            area: 'body',
                            link: '',
                            x: 46.4,
                            y: 63.4,
                        },
                        {
                            name: 'Mageside',
                            area: 'body',
                            link: '',
                            x: 48,
                            y: 29.2,
                        },
                        {
                            name: 'Crystal Waters',
                            area: 'nvengaria',
                            link: '',
                            x: 46.4,
                            y: 86.6,
                        },
                        {
                            name: 'Versilla 2',
                            area: 'orisia',
                            link: '',
                            x: 88.1,
                            y: 44.4,
                        },
                    ],
                    towns: [
                        {
                            name: 'Valjer',
                            area: 'body',
                            link: '',
                            x: 18.7,
                            y: 65.9,
                        },
                        {
                            name: 'Sunset Way',
                            area: 'body',
                            link: '',
                            x: 47.4,
                            y: 57.5,
                        },
                        {
                            name: 'Atlus Arcantum',
                            area: 'body',
                            link: '',
                            x: 48.2,
                            y: 41.2,
                        },
                        {
                            name: 'Port Caelum',
                            area: 'body',
                            link: '',
                            x: 72.1,
                            y: 53.9,
                        },
                        {
                            name: 'Scarglas',
                            area: 'nvengaria',
                            link: '',
                            x: 39.4,
                            y: 84.6,
                        },
                    ],
                    places: [
                        {
                            name: 'Bloodmage Mtns.',
                            area: 'body',
                            link: '',
                            x: 45.7,
                            y: 34.5,
                        },
                        {
                            name: 'Cold Mtns.',
                            area: 'body',
                            link: '',
                            x: 45.7,
                            y: 34.5,
                        },
                        {
                            name: 'Abyssal Enclave',
                            area: 'body',
                            link: '',
                            x: 56.4,
                            y: 33.7,
                        },
                        {
                            name: 'Cavern of Blades',
                            area: 'body',
                            link: '',
                            x: 50.8,
                            y: 55.3,
                        },
                    ],
                },
                orisia: {
                    name: 'orisia',
                    cities: [
                        {
                            name: 'Solum Irae',
                            area: 'ceyana',
                            link: '',
                            x: 17.2,
                            y: 47.7,
                        },
                        {
                            name: 'Antigua',
                            area: 'ceyana',
                            link: '',
                            x: 31.2,
                            y: 58.6,
                        },
                        {
                            name: 'Veelos',
                            area: 'body',
                            link: '',
                            x: 58.4,
                            y: 59.5,
                        },
                        {
                            name: 'Versilla',
                            area: 'body',
                            link: '',
                            x: 66.1,
                            y: 61,
                        },
                        {
                            name: 'Morgana',
                            area: 'body',
                            link: '',
                            x: 77.9,
                            y: 37,
                        },
                        {
                            name: 'Coban',
                            area: 'body',
                            link: '',
                            x: 68.8,
                            y: 33.4,
                        },
                        {
                            name: 'Izabal',
                            area: 'body',
                            link: '',
                            x: 74.8,
                            y: 25.6,
                        },
                        {
                            name: 'Drakiss',
                            area: 'body',
                            link: '',
                            x: 84,
                            y: 22.6,
                        },
                    ],
                    towns: [
                        {
                            name: 'Esquipulas Village',
                            area: 'ceyana',
                            link: '',
                            x: 17.2,
                            y: 62.9,
                        },
                        {
                            name: 'Brightstorm Keep',
                            area: 'ceyana',
                            link: '',
                            x: 43.2,
                            y: 66.1,
                        },
                        {
                            name: 'Ubshu',
                            area: '',
                            link: '',
                            x: 51.8,
                            y: 65.6,
                        },
                        {
                            name: 'Banha Village',
                            area: 'body',
                            link: '',
                            x: 67.4,
                            y: 41.5,
                        },

                    ],
                    places: [
                        {
                            name: 'Selah Mtns.',
                            area: 'ceyana',
                            link: '',
                            x: 15.2,
                            y: 45.2,
                        },
                        {
                            name: 'Viridian Pass',
                            area: 'ceyana',
                            link: '',
                            x: 18.2,
                            y: 49.7,
                        },
                        {
                            name: 'Bone Garden',
                            area: 'ceyana',
                            link: '',
                            x: 12.3,
                            y: 57.5,
                        },
                        {
                            name: 'Nameless Desert',
                            area: 'ceyana',
                            link: '',
                            x: 25.4,
                            y: 67.5,
                        },
                        {
                            name: 'Ellwood',
                            area: 'body',
                            link: '',
                            x: 61.4,
                            y: 59.5,
                        },
                        {
                            name: 'Cathedral Mtns.',
                            area: 'body',
                            link: '',
                            x: 65.5,
                            y: 64.8,
                        },
                        {
                            name: 'Dorado Plains',
                            area: 'body',
                            link: '',
                            x: 70.3,
                            y: 63.1,
                        },
                        {
                            name: 'Platiado Plains',
                            area: 'body',
                            link: '',
                            x: 77.2,
                            y: 57.8,
                        },
                        {
                            name: 'The Red Sands',
                            area: 'body',
                            link: '',
                            x: 73.9,
                            y: 50,
                        },
                        {
                            name: 'Valanian Desert',
                            area: 'body',
                            link: '',
                            x: 68.5,
                            y: 46,
                        },
                        {
                            name: 'Hodenaufer Mtn. Range',
                            area: 'body',
                            link: '',
                            x: 64.4,
                            y: 41.2,
                        },
                    ],
                },
                kadia: {
                    name: 'kadia',
                    cities: [
                        {
                            name: 'Axis Mundi',
                            area: 'body',
                            link: '',
                            x: 54.9,
                            y: 40.3,
                        },
                        {
                            name: 'Parime',
                            area: 'body',
                            link: '',
                            x: 20.3,
                            y: 34.4,
                        },
                        {
                            name: 'Mo Chroi',
                            area: 'body',
                            link: '',
                            x: 69.2,
                            y: 71.1,
                        },
                    ],
                    towns: [

                    ],
                    places: [

                    ],
                },
                alterion: {
                    name: 'alterion',
                    cities: [
                        {
                            name: 'Arkadia Prime',
                            area: 'body',
                            link: '',
                            x: 20.4,
                            y: 35.3,
                        },
                        {
                            name: 'Izral',
                            area: 'body',
                            link: '',
                            x: 56.9,
                            y: 23.8,
                        },
                        {
                            name: 'Cosanastre',
                            area: 'body',
                            link: '',
                            x: 69.3,
                            y: 75.3,
                        },
                    ],
                    towns: [
                        {
                            name: 'HQ',
                            area: 'hunter_s-association',
                            link: '',
                            x: 18.9,
                            y: 58.6,
                        },
                        {
                            name: 'Valorous Future Industries',
                            area: 'body',
                            link: '',
                            x: 34.7,
                            y: 40.7,
                        },
                    ],
                    places: [
                        {
                            name: 'Magnus Forest',
                            area: 'body',
                            link: '',
                            x: 40.6,
                            y: 52.8,
                        },
                        {
                            name: 'Dewla Desert',
                            area: 'body',
                            link: '',
                            x: 66.5,
                            y: 49,
                        },
                        {
                            name: 'Kageroth Mtns.',
                            area: 'body',
                            link: '',
                            x: 64.1,
                            y: 21.1,
                        },
                    ],
                },
                // athentha: {
                //     name: 'athentha',
                //     cities: [

                //     ],
                //     towns: [

                //     ],
                //     places: [

                //     ],
                // },
                renovatio: {
                    name: 'renovatio',
                    cities: [
                        {
                            name: 'Avylon',
                            area: 'avylon',
                            link: '',
                            x: 43,
                            y: 47.6,
                        },
                        {
                            name: 'Oo_Xora',
                            area: 'oo_xora',
                            link: '',
                            x: 68.5,
                            y: 64.6,
                        },
                        {
                            name: 'Nu Martyr City',
                            area: 'nu-martyr',
                            link: '',
                            x: 74,
                            y: 52.9,
                        },
                    ],
                    towns: [
                        {
                            name: 'Jeruxalim',
                            area: 'la-guardia',
                            link: '',
                            x: 54.1,
                            y: 18.2,
                        },
                        {
                            name: 'Krishna',
                            area: 'avylon',
                            link: '',
                            x: 30.7,
                            y: 33.6,
                        },
                    ],
                    places: [
                        {
                            name: 'Eteam Resevoirs',
                            area: 'avylon',
                            link: '',
                            x: 41,
                            y: 41.6,
                        },
                        {
                            name: 'Mt. Xion',
                            area: 'avylon',
                            link: '',
                            x: 37.2,
                            y: 46,
                        },
                        {
                            name: 'Ventus Temple',
                            area: 'oo_xora',
                            link: '',
                            x: 58.6,
                            y: 67,
                        },
                        {
                            name: 'Xulu Desert',
                            area: 'La Guardia',
                            link: '',
                            x: 52,
                            y: 15.7,
                        },
                        {
                            name: 'Verde Canyon',
                            area: 'La Guardia',
                            link: '',
                            x: 34.9,
                            y: 28.9,
                        },
                    ],
                },
                terrenus: {
                    name: 'terrenus',
                    cities: [
                        {
                            name: 'Ignatz',
                            area: 'body',
                            link: '',
                            x: 47.5, 
                            y: 50,
                        },
                        {
                            name: 'Casper',
                            area: 'body',
                            link: '',
                            x: 37,
                            y: 59,
                        },
                        {
                            name: 'Tia',
                            area: 'body',
                            link: '',
                            x: 53.1,
                            y: 59.1,
                        },
                        {
                            name: 'Last Chance',
                            area: 'body',
                            link: '',
                            x: 81.3,
                            y: 75.4,
                        },
                        {
                            name: `Hell's Gate`,
                            area: 'body',
                            link: '',
                            x: 69.8,
                            y: 38.9,
                        },
                        {
                            name: 'Blairville',
                            area: 'body',
                            link: '',
                            x: 40.1,
                            y: 31.4,
                        },
                        {
                            name: 'Patia',
                            area: 'body',
                            link: '',
                            x: 26.8,
                            y: 27.6,
                        },
                        {
                            name: 'Weland',
                            area: 'body',
                            link: '',
                            x: 19.8,
                            y: 44.7,
                        },
                        {
                            name: 'Dougton',
                            area: 'body',
                            link: '',
                            x: 34.6,
                            y: 47.8,
                        },
                    ],
                    towns: [
                        {
                            name: 'Chesterfield',
                            area: 'body',
                            link: '',
                            x: 18.7,
                            y: 38.5,
                        },
                        {
                            name: 'Aspyn',
                            area: 'biazo',
                            link: '',
                            x: 11.5,
                            y: 17.2,
                        },
                        {
                            name: `Bi'le'ah`,
                            area: 'biazo',
                            link: '',
                            x: 11,
                            y: 19.7,
                        },
                        {
                            name: 'The Abbey',
                            area: 'biazo',
                            link: '',
                            x: 13.5,
                            y: 21.4,
                        },
                        {
                            name: `Predator's Keep`,
                            area: 'body',
                            link: '',
                            x: 33.2,
                            y: 32.3,
                        },
                        {
                            name: 'Coth',
                            area: 'body',
                            link: '',
                            x: 35.5,
                            y: 38.5,
                        },
                        {
                            name: 'Aligoria',
                            area: 'body',
                            link: '',
                            x: 14.4,
                            y: 50.1,
                        },
                        {
                            name: 'Selemath',
                            area: 'body',
                            link: '',
                            x: 24.3,
                            y: 53.4,
                        },
                        {
                            name: 'Everrun',
                            area: 'body',
                            link: '',
                            x: 26.0,
                            y: 57.8,
                        },
                        {
                            name: 'Taen',
                            area: 'body',
                            link: '',
                            x: 41.7,
                            y: 56,
                        },
                        {
                            name: 'Temple City',
                            area: 'body',
                            link: '',
                            x: 46.7,
                            y: 32.3,
                        },
                        {
                            name: 'Norkotia',
                            area: 'body',
                            link: '',
                            x: 56.4,
                            y: 35.2,
                        },
                        {
                            name: 'Langley Keep',
                            area: 'body',
                            link: '',
                            x: 61.9,
                            y: 41.8,
                        },
                        {
                            name: 'Gaian Academy',
                            area: 'body',
                            link: '',
                            x: 61,
                            y: 53.1,
                        },
                        {
                            name: 'Martial Town',
                            area: 'body',
                            link: '',
                            x: 52.1,
                            y: 69.5,
                        },
                        {
                            name: `Yh'mi`,
                            area: 'body',
                            link: '',
                            x: 54,
                            y: 79.3,
                        },
                        {
                            name: 'Blackspear',
                            area: 'body',
                            link: '',
                            x: 83.3,
                            y: 72.3,
                        },
                        {
                            name: 'Nesthome',
                            area: 'body',
                            link: '',
                            x: 78.3,
                            y: 49.8,
                        },
                        {
                            name: 'Anima',
                            area: 'body',
                            link: '',
                            x: 88.5,
                            y: 45.9,
                        },
                    ],
                    places: [
                        {
                            name: 'Hills of Lost Hearts',
                            area: 'body',
                            link: '',
                            x: 11,
                            y: 28,
                        },
                        {
                            name: 'Shawnee Glacier',
                            area: 'body',
                            link: '',
                            x: 72.8,
                            y: 16.7,
                        },
                        {
                            name: 'Badlands',
                            area: 'body',
                            link: '',
                            x: 49.3,
                            y: 19.8,
                        },
                        {
                            name: 'Wastelands',
                            area: 'body',
                            link: '',
                            x: 61.2,
                            y: 26.3,
                        },
                        {
                            name: 'Blaurg Mtn.',
                            area: 'body',
                            link: '',
                            x: 46.7,
                            y: 29.4,
                        },
                        {
                            name: 'Dead Peaks',
                            area: 'body',
                            link: '',
                            x: 73.1,
                            y: 30.2,
                        },
                        {
                            name: 'High Desert',
                            area: 'body',
                            link: '',
                            x: 84.8,
                            y: 31.3,
                        },
                        {
                            name: 'Forbidding Hills',
                            area: 'body',
                            link: '',
                            x: 75.4,
                            y: 41.4,
                        },
                        {
                            name: 'Dark Forest',
                            area: 'body',
                            link: '',
                            x: 83.2,
                            y: 48.4,
                        },
                        {
                            name: 'Hidden Valley',
                            area: 'body',
                            link: '',
                            x: 75.4,
                            y: 57.4,
                        },
                        {
                            name: 'Forgotten Wood',
                            area: 'body',
                            link: '',
                            x: 75.6,
                            y: 62.0,
                        },
                        {
                            name: 'Haunted Glen',
                            area: 'body',
                            link: '',
                            x: 62.3,
                            y: 61.6,
                        },
                        {
                            name: 'Black Ridge',
                            area: 'body',
                            link: '',
                            x: 56.8,
                            y: 77.6,
                        },
                        {
                            name: 'Moonwood',
                            area: 'body',
                            link: '',
                            x: 47.1,
                            y: 59.7,
                        },
                        {
                            name: 'Blue Hills',
                            area: 'body',
                            link: '',
                            x: 40,
                            y: 54,
                        },
                        {
                            name: 'Scudder Forests',
                            area: 'body',
                            link: '',
                            x: 18.9,
                            y: 50.7,
                        },
                        {
                            name: 'Hills of Noddendody',
                            area: 'body',
                            link: '',
                            x: 16.6,
                            y: 64.9,
                        },
                    ],
                },
            },
        }
    },
    methods: {
        setOriginals() {
            this.original = this.map;
        },
        getOriginals() {
            this.map = this.original;
        },
        wakeApp(evt) {
            this.$root.isWake = true;
        },
        sleepApp(evt) {
            this.$root.isWake = false;
        },
        requestReboot() {
            console.log(`Host has received request for ${this.$root.activeName}`);
            Event.$emit('rebootAgain');
        },
        switchMaps(name) {
            Event.$emit('clearSelection');
            console.log(`Switching map to ${name}`)
            Event.$emit('rebootMap', name);
        },
        addCity(name) {
            console.log(`Adding ${name} in ${this.$root.lastActiveRegion} at ${this.$root.spiritCoords.join(',')}`)
            var child = {
                type: 'city',
                board: this.$root.activeName,
                name: name,
                area: this.$root.lastActiveRegion,
                link: '',
                x: this.$root.spiritCoords[0],
                y: this.$root.spiritCoords[1],
            };
            // if ((!this.$root.lastActiveRegion.length) && (this.$root.activeRegion.length)) {
            //     child.area = this.$root.activeRegion.replace('\s', '');
            // }
            if ((!this.$root.lastActiveRegion.length) || (/Body/i.test(this.$root.lastActiveRegion))) {
                child.area = 'body'
            }
            this.activeMap.cities.push(child);
            Event.$emit('writeRevision', child)
        },
        addTown(name) {
            console.log(`Adding ${name} in ${this.$root.activeRegion} at ${this.$root.spiritCoords.join(',')}`)
            var child = {
                type: 'town',
                board: this.$root.activeName,
                name: name,
                area: this.$root.lastActiveRegion,
                link: '',
                x: this.$root.spiritCoords[0],
                y: this.$root.spiritCoords[1],
            };
            if ((!this.$root.lastActiveRegion.length) || (/Body/i.test(this.$root.lastActiveRegion))) {
                child.area = 'body'
            }
            this.activeMap.towns.push(child);
            Event.$emit('writeRevision', child)
        },
        addPlace(name) {
            console.log(`Adding ${name} in ${this.$root.activeRegion} at ${this.$root.spiritCoords.join(',')}`)
            var child = {
                type: 'place',
                board: this.$root.activeName,
                name: name,
                area: this.$root.lastActiveRegion,
                link: '',
                x: this.$root.spiritCoords[0],
                y: this.$root.spiritCoords[1],
            };
            if ((!this.$root.lastActiveRegion.length) || (/Body/i.test(this.$root.lastActiveRegion))) {
                child.area = 'body'
            }
            this.activeMap.places.push(child);
            Event.$emit('writeRevision', child)
        },
    },
    computed: {
        notes: function() {
            var index = this.$root.active;
            status = `Current status is ${this.notelist[index]}`
            return status;
        },
        details: function () {
            var index = this.$root.active;
            status = `${this.detaillist[index]}`
            return status;
        },
        infoR: function() {
            var status = '';
            if (this.$root.showCrosshair) {
                status = 'Provide the code generated to the right';
            } else {
                status = 'All maps are currently at 5% resolution';
            }
            return status;
        },
        infoL: function() {
            var status = '';
            if (this.$root.showCrosshair) {
                status = 'Use the mousewheel to change marker';
            } else {
                status = 'Hold shift to create a new marker';
            }
            return status;
        },
        activeName: function() {
            return this.$root.activeName;
        },
        newName: function() {
            var result = '';
            console.log(this.activeName)
            if (/east\_/.test(this.activeName)) {
                result = this.activeName.replace('east_', 'E')
            } else if (/west\_/.test(this.activeName)) {
                result = this.activeName.replace('west_', 'W')
            } else {
                result = this.activeName;
            }
            return result;
        },
        activeMap: function() {
            var self = this, which = self.activeName;
            return this.map[which];
        },
        activeRegion: function() {
            var result = this.$root.activeRegion;
            if (/\-/.test(result))
                result = result.replace('-', ' ');
            if (/body/.test(result))
                result = 'mainland'
            return result;
        },
        activeCoords: function() {
            return this.$root.activeCoords;
        },
        activeLabel: function () {
            var result = this.$root.activeLabel;
            if (/\-/.test(result))
                result = result.replace('-', ' ');
            // console.log(result)
            return result;
        },
    },
    mounted() {
        console.log(this.msg);
        var self = this;
        this.setOriginals();
        Event.$on('requestReboot', self.requestReboot);
        Event.$on('resetMaps', self.getOriginals);
        Event.$on('switchMaps', self.switchMaps);
        Event.$on('cityNewMarker', self.addCity);
        Event.$on('townNewMarker', self.addTown);
        Event.$on('placeNewMarker', self.addPlace);
    }
})

Vue.component('valucre-map', {
    props: {
        model: Object,
    },
    data() {
        return {
            active: 6,
            list: ['west_genesaris', 'east_genesaris', 'orisia', 'kadia', 'alterion', 'renovatio', 'terrenus'],
            show: {
                cities: true,
                towns: true,
                places: true,
            }
        }
    },
    computed: {
        activeName: function() {
            var which = this.active;
            return this.list[which];
        },
    },
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <rect class="map-background" x="0" y="0" width="1000" height="1000"/>
            <grid size="1000" rowcol="8"></grid>
            <board :model="model"></board>

            <g id="places">
                <place-marker 
                    v-for="marker in model.places" 
                    v-if="show.places"
                    :xpos="marker.x"
                    :ypos="marker.y" 
                    :key="marker.name"
                    :label="marker.name"
                    :area="marker.area">
                </place-marker>
            </g>
            <g id="towns">
                <town-marker 
                    v-for="marker in model.towns" 
                    v-if="show.towns"
                    :xpos="marker.x"
                    :ypos="marker.y" 
                    :key="marker.name"
                    :label="marker.name"
                    :area="marker.area">
                </town-marker>
            </g>
            <g id="cities">
                <city-marker 
                    v-for="marker in model.cities"
                    v-if="show.cities" 
                    :xpos="marker.x"
                    :ypos="marker.y" 
                    :key="marker.name"
                    :label="marker.name"
                    :area="marker.area">
                </city-marker>
            </g>
            <crosshair v-if="this.$root.showCrosshair"></crosshair>
            <g class="bumper" @click="clickBumper(1)">
                <path class="map-bumper-btn" d="M983,376.5h18.4a0,0,0,0,1,0,0v249a0,0,0,0,1,0,0H983a31.6,31.6,0,0,1-31.6-31.6V408.1A31.6,31.6,0,0,1,983,376.5Z" />
                <polyline class="map-bumper-label" points="961.38 474.13 988.25 501 961.38 527.87" />
            </g>
            <g class="bumper" @click="clickBumper(-1)">
                <path class="map-bumper-btn" d="M31.6,376.5H50a0,0,0,0,1,0,0v249a0,0,0,0,1,0,0H31.6A31.6,31.6,0,0,1,0,593.9V408.1A31.6,31.6,0,0,1,31.6,376.5Z" transform="translate(51.38 1002) rotate(180)" />
                <polyline class="map-bumper-label" points="41.25 474.13 14.38 501 41.25 527.87" />
            </g>
            <mini-map></mini-map>
        </svg>
    `,
    mounted() {
        this.setActive();
    },
    methods: {
        clickBumper(num) {
            if (num > 0) {
                this.active = (this.active < this.list.length - 1) ? this.active + 1 : 0;
            } else {
                this.active = (this.active > 0) ? this.active - 1 : this.list.length - 1;
            }
            // console.log(`${num} : ${this.active} : ${this.list.length}`)
            this.setActive();
            Event.$emit('switchMaps', this.activeName)
        },
        setActive() {
            // console.log('Sending active to parent')
            this.$root.active = this.active;
            this.$root.activeName = this.activeName;
        }
    }
})

Vue.component('revisions', {
    template: `
        <div class="revisions">
            <div class="revision-title">Revisions show here</div>
            <div 
                contenteditable="true"
                spellcheck="false"
                class="revision-input"
                :placeholder="placeholder">
                {{message}}
            </div>
        </div>
    `,
                // @keyup.enter="submitTest(message)" 
    data() {
        return {
            hide: false,
            message: '',
            xRes: 0,
            yRes: 0,
        }
    },
    mounted() {
        Event.$on('writeRevision', this.writeRevision);
    },
    methods: {
        writeRevision(data) {
            // console.log(data)
            this.message += JSON.stringify(data) + ';\r\n'
        }
    },
    computed: {
        placeholder: function () {
            return `revisions will show here`;
        }
    },
})

Vue.component('texter', {
    template: `
        <div v-if="hide" :style="getPos" class="texter">
            <input 
                ref="input"
                class="texter-input"
                @keyup.enter="submitTest(message)" 
                v-model="message" 
                :placeholder="placeholder"/>
        </div>
    `,
    data() {
        return {
            hide: false,
            message: '',
            xRes: 0,
            yRes: 0,
        }
    },
    computed: {
        placeholder: function() {
            return `add new ${this.$root.spirit}`;
        }
    },
    methods: {
        getPos() {
            var style = '';
            style += `top:${this.yRes * 10}px;`
            style += `left:${this.xRes * 10}px;`
            return style;
        },
        checkPosition() {
            console.log(`${this.xRes}, ${this.yRes}`)
        },
        submitTest(data) {
            var self = this;
            console.log(`${this.$root.spirit}NewMarker: ${data} in ${this.$root.lastActiveRegion}`)
            if (!this.$root.lastActiveRegion.length)
                this.$root.lastActiveRegion = this.$root.activeRegion;
            Event.$emit(`${this.$root.spirit}NewMarker`, data);
            this.message = '';
            this.hide = !this.hide;
            this.$root.showTexter = this.hide;
            Event.$emit('clearCrosshair');
            this.$root.selection = [];
            // Event.$emit('hideGhost');
            // Event.$emit('cityNewMarker', self.message);
            // Event.$emit('townNewMarker', self.message);
            // Event.$emit('placeNewMarker', self.message);
        },
        setFocus() {
            this.$nextTick(() => this.$refs.input.focus());
            this.checkPosition();
        },
        displayTexter() {
            this.grabCoords();
            console.log('trying to display')
            if (!this.hide) {
                this.hide = true;
                this.$root.showTexter = true;
                this.setFocus();
            }
        },
        grabCoords() {
            this.xRes = this.$root.activeCoords[0];
            this.yRes = this.$root.activeCoords[1];
            this.$root.setCSS('textX', `${this.xRes*8}px`);
            this.$root.setCSS('textY', `${this.yRes*8}px`);
            this.$root.spiritCoords = this.$root.activeCoords;
            console.log(`Intended coordinates are [${this.xRes}, ${this.yRes}]`)
        },
    },
    mounted() {
        // Event.$on('showTexter', this.grabCoords);
        Event.$on('showTexter', this.displayTexter);
    }
})

Vue.component('ghost-marker', {
    // props: {
    //     spirit: String,
    // }, 
    template: `
        <g @click="testClick" id="ghost" v-if="!hidden">
            <g v-if="index == 0">
                <circle 
                    class="ghost-marker-mask" cx="20" cy="16.79" r="6"
                    :transform="'translate(' + xPos + ' ' + yPos + ')'"/>
                <path 
                    class="ghost-marker" 
                    d="M20,0A15.18,15.18,0,0,0,5,15.37c0,7,10.17,19.75,13.76,24a1.6,1.6,0,0,0,2.47,0c3.59-4.28,13.77-17,13.77-24A15.19,15.19,0,0,0,20,0ZM20,22.3a6,6,0,1,1,6-6A6,6,0,0,1,20,22.3Z" 
                    :transform="'translate(' + xPos + ' ' + yPos + ')'" />
            </g>
            <g v-if="index == 1">
                <path 
                    class="ghost-marker" 
                    d="M18.77,39.25l-9.6-17a1.42,1.42,0,0,1,1.23-2.11H29.6a1.42,1.42,0,0,1,1.23,2.11l-9.6,17A1.41,1.41,0,0,1,18.77,39.25Z" 
                    :transform="'translate(' + (xPos - width/5) + ' ' + (yPos - width/3) + ')'"/>
            </g>
            <g v-if="index == 2">
                <path 
                    <rect 
                        class="ghost-marker" 
                        :x="xPos + width/2" 
                        :y="yPos + width*1.5" 
                        :width="width" 
                        :height="width"/>
            </g>
        </g>
    `,
    data() {
        return {
            hidden: false,
            index: 0,
            realIndex: 0,
            souls: ['city', 'town', 'place']
        }
    },
    computed: {
        spirit: function() {
            var index = this.index;
            return this.souls[index];
        },
        width: function() {
            var result;
            if (this.spirit == 'city')
                result = 20;
            else if (this.spirit == 'town')
                result = 16;
            else if (this.spirit == 'place')
                result = 16;
            return result;
        },
        xPosition: function() {
            return this.$root.activeCoords[0];
        },
        yPosition: function () {
            return this.$root.activeCoords[1];
        },
        xPos: function () {
            return (Number(this.xPosition) * 10 - (this.width));
        },
        yPos: function () {
            return (Number(this.yPosition) * 10 - (this.width * 2));
        },
    },
    methods: {
        testClick(evt) {
            console.log(`Hello ${this.spirit}`)
        },
        setMarker(evt) {
            // var index = this.index, spirit = this;
            var index = this.realIndex, spirit = this.souls[index];

            this.$root.spirit = spirit;
            Event.$emit('showTexter');
            // console.log(`Setting ${spirit} in ${this.$root.lastActiveRegion}`)
            // console.log('Should interrupt this with an input dialogue');
            // console.log(this.$root.lastActiveRegion);
            // console.log(`Setting ${this.spirit} marker at ${this.$root.activeCoords.join(',')}`)
        },
        rollWheel(state) {
            if (state) {
                console.log('roll upward')
                if (this.index < this.souls.length - 1)
                    this.index = this.index + 1;
                else
                    this.index = 0;
            } else {
                console.log('roll downward')
                if (this.index > 0)
                    this.index = this.index - 1;
                else
                    this.index = this.souls.length - 1;
            }
            this.realIndex = this.index;
        },
        showGhost() {
            this.hidden = false;
        },
        hideGhost() {
            this.hidden = true;
        },
    },
    mounted() {
        Event.$on('setMarker', this.setMarker);
        Event.$on('ghostWheel', this.rollWheel);
        Event.$on('hideGhost', this.hideGhost);
        Event.$on('showGhost', this.showGhost);
    },
    beforeDestroy() {
        Event.$off('setMarker');
        Event.$off('ghostWheel');
    }
})

Vue.component('crosshair', {
    template: `
        <g id="crosshair">
            <g v-if="isBasic">
                <circle class="crosshair" :cx="masterX" :cy="masterY" :r="radius"/>
                <line class="crosshair" :x1="masterX" :x2="masterX" y1="0" y2="1000"/>
                <line class="crosshair" x1="0" x2="1000" :y1="masterY" :y2="masterY"/>
            </g>
            <g v-if="!isBasic">
                <line class="crosshair" :x1="masterX" :x2="masterX" :y1="masterY + radius" y2="1000"/>
                <line class="crosshair" :x1="masterX" :x2="masterX" y1="0" :y2="masterY - radius"/>
                <line class="crosshair" x1="0" :x2="masterX - radius" :y1="masterY" :y2="masterY"/>
                <line class="crosshair" :x1="masterX + radius" x2="1000" :y1="masterY" :y2="masterY"/>

                <path class="crosshair" d="M117.64,18.32a30.08,30.08,0,0,1,0,23.36" :transform="'translate(' + (masterX - radius*3) + ' ' + (masterY - radius) + ')'"/>
                <path class="crosshair" d="M78.32,2.36a30.08,30.08,0,0,1,23.36,0" :transform="'translate(' + (masterX - radius*3) + ' ' + (masterY - radius) + ')'"/>
                <path class="crosshair" d="M62.36,41.68a30.08,30.08,0,0,1,0-23.36" :transform="'translate(' + (masterX - radius*3) + ' ' + (masterY - radius) + ')'"/>
                <path class="crosshair" d="M101.68,57.64a30.08,30.08,0,0,1-23.36,0" :transform="'translate(' + (masterX - radius*3) + ' ' + (masterY - radius) + ')'"/>
            </g>
            <ghost-marker></ghost-marker>
        </g>    
    `,
    data() {
        return {
            isBasic: false,
            radius: 30,
            type: ['city', 'town', 'place'],
        }
    },
    computed: {
        masterX: function() {
            return this.$root.activeCoords[0] * 10;
        },
        masterY: function () {
            return this.$root.activeCoords[1] * 10;
        },
    }
})

Vue.component('place-marker', {
    props: {
        xpos: Number,
        ypos: Number,
        area: String,
        label: String,
    },
    // < rect class= "place-marker" : x = "xPosition" : y = "yPosition" width = "50" height = "50" rx = "25" />
    // <rect class="place-marker" x="102" y="272" width="16" height="16" />
    template: `
        <g id="place">
            <rect    
                :x="xPosition" 
                :y="yPosition" 
                :width="width" 
                :height="width" 
                :rx="getRadius(width)"
                @mouseout="hover(false, area)"
                @mouseover="hover(true, area)"
                :class="getType(area)"
                @click="updateSelection"/>
        </g>
    `,
    // :transform="(isHover) ? 'scale(2)' : 'scale(1)'" 
    data() {
        return {
            unit: 0,
            isHover: false,
            isSelected: false,
            xPosition: 0,
            yPosition: 0,
            width: 16,
        }
    },
    methods: {
        getType(area) {
            var result;
            // console.log(`${this.isSelected} : ${this.isHover} : ${area}`)
            if (this.isSelected) {
                result = 'map-marker-place-selected'
            } else {
                if ((this.isHover) && (!this.$root.selection.length)) {
                   result = 'map-marker-place-hover'
               } else {
                   result = 'map-marker-place-idle'
               }
            }
            return result;
        },
        getRadius(width) {
            // console.log(width)
            var result;
            if ((this.isHover) || (this.isSelected)) {
                result = width/2;
            } else {
                result = 0;
            }
            return result;
        },
        getX() {
            return (Number(this.xpos) * 10 - (this.width / 2));
        },
        getY() {
            return (Number(this.ypos) * 10 - (this.width / 2));
        },
        hover(state) {
            if ((state) || (this.isSelected)) {
                if (this.isSelected) {
                    console.log(`${this.label} is already selected`)                    
                    this.width = 50;
                } else if (this.$root.selection.length) {
                    this.width = 16;
                } else {
                    this.isHover = true;
                    Event.$emit('updateRegionAnno', this.area);
                    Event.$emit('updateLabelAnno', this.label);
                    // console.log(`Hovering in area ${this.area}`)
                    this.width = 50;
                }
                Event.$emit('hoverArea', this.area)
            } else {
                Event.$emit('clearLabelAnno');
                this.isHover = false;
                this.width = 16;
            }
            this.xPosition = this.getX();
            this.yPosition = this.getY();
        },
        updateSelection() {
            if (this.$root.isDefault) {
                console.log('Changing the selection');
                this.isSelected = !this.isSelected
                if (this.isSelected) {
                    Event.$emit('updateSelection', this.label);
                } else {
                    Event.$emit('clearSelection');
                }
            }
        },
        clearSelection() {
            this.isSelected = false;
        }
    },
    mounted() {
        Event.$on('clearSelection', this.clearSelection)
        // console.log(`Setting place at ${this.xpos}, ${this.ypos}`)
        this.xPosition = this.getX();
        this.yPosition = this.getY();
        // console.log(`Setting place at ${this.xPosition}px, ${this.yPosition}px`)
    }
})


Vue.component('town-marker', {
    props: {
        xpos: Number,
        ypos: Number,
        area: String,
        label: String,
    },
    template: `
        <g 
            id="town"
            @mouseout="hover(false, area)"
            @mouseover="hover(true, area)"
            @click="updateSelection">
                <path 
                    :class="getType(area)" 
                    d="M18.77,39.25l-9.6-17a1.42,1.42,0,0,1,1.23-2.11H29.6a1.42,1.42,0,0,1,1.23,2.11l-9.6,17A1.41,1.41,0,0,1,18.77,39.25Z" 
                    :transform="'translate(' + xPosition + ' ' + yPosition + ')'"/>
        </g>
    `,
    data() {
        return {
            unit: 0,
            isHover: false,
            isSelected: false,
            xPosition: 0,
            yPosition: 0,
            width: 16,
        }
    },
    methods: {
        getType(area) {
            var result;
            // console.log(`${this.isSelected} : ${this.isHover} : ${area}`)
            if (this.isSelected) {
                result = 'map-marker-town-selected'
            } else if (this.isHover) {
                result = 'map-marker-town-hover'
            } else {
                result = 'map-marker-town-idle'
            }
            return result;
        },
        getX() {
            return (Number(this.xpos) * 10 - (this.width * 1.25));
        },
        getY() {
            return (Number(this.ypos) * 10 - (this.width * 2.5));
        },
        hover(state) {
            if ((state) || (this.isSelected)) {
                if (this.isSelected) {
                    console.log(`${this.label} is already selected`)
                } else if (this.$root.selection.length) {
                    // Already has selection
                } else {
                    this.isHover = true;
                    Event.$emit('updateRegionAnno', this.area);
                    Event.$emit('updateLabelAnno', this.label);
                    console.log(`Hovering in area ${this.area}`)
                }
                Event.$emit('hoverArea', this.area)
                // this.width = 50;
            } else {
                Event.$emit('clearLabelAnno');
                this.isHover = false;
                // this.width = 16;
            }
            this.xPosition = this.getX();
            this.yPosition = this.getY();
        },
        updateSelection() {
            if (this.$root.isDefault) {
                console.log('Changing the selection');
                this.isSelected = !this.isSelected
                if (this.isSelected) {
                    Event.$emit('updateSelection', this.label);
                } else {
                    Event.$emit('clearSelection');
                }
            }
        },
    },
    mounted() {
        // console.log(`Setting town at ${this.xpos}, ${this.ypos}`)
        this.xPosition = this.getX();
        this.yPosition = this.getY();
        // console.log(`Setting town at ${this.xPosition}px, ${this.yPosition}px`)
    }
})


Vue.component('city-marker', {
    props: {
        xpos: Number,
        ypos: Number,
        area: String,
        label: String,
    },
    template: `
        <g 
            id="city"
            @mouseout="hover(false, area)"
            @mouseover="hover(true, area)"
            @click="updateSelection">
                <circle 
                    :style="getMaskStyle(area)" cx="20" cy="16.79" r="6"
                    :transform="'translate(' + xPosition + ' ' + yPosition + ')'"/>
                <path 
                    :class="getType(area)" 
                    d="M20,0A15.18,15.18,0,0,0,5,15.37c0,7,10.17,19.75,13.76,24a1.6,1.6,0,0,0,2.47,0c3.59-4.28,13.77-17,13.77-24A15.19,15.19,0,0,0,20,0ZM20,22.3a6,6,0,1,1,6-6A6,6,0,0,1,20,22.3Z" 
                    :transform="'translate(' + xPosition + ' ' + yPosition + ')'" />
        </g>
    `,
    data() {
        return {
            unit: 0,
            isHover: false,
            isSelected: false,
            xPosition: 0,
            yPosition: 0,
            width: 16,
        }
    },
    methods: {
        getMaskStyle(area) {
            var style = '';
            if ((this.isHover) || (this.isSelected)) {
                style += 'cursor: pointer;';
                // style += 'fill: ' + this.$root.getCSS('color-terrain-hover') + ';';
                style += 'fill: rgba(255,255,255,.001';
            } else {
                style += 'cursor: default;';
                style += 'fill: none;';
            }
            return style;
        },
        getType(area) {
            var result;
            // console.log(`${this.isSelected} : ${this.isHover} : ${area}`)
            if (this.isSelected) {
                result = 'map-marker-city-selected'
            } else if (this.isHover) {
                result = 'map-marker-city-hover'
            } else {
                result = 'map-marker-city-idle'
            }
            return result;
        },
        getX() {
            return (Number(this.xpos) * 10 - (this.width * 1.25));
        },
        getY() {
            return (Number(this.ypos) * 10 - (this.width * 2.5));
        },
        hover(state) {
            if ((state) || (this.isSelected)) {
                if (this.isSelected) {
                    // console.log(`${this.label} is already selected`)
                } else if (this.$root.selection.length) {
                    // Already has selection
                } else {
                    this.isHover = true;
                    Event.$emit('updateRegionAnno', this.area);
                    Event.$emit('updateLabelAnno', this.label);
                    // console.log(`Hovering in area ${this.area}`)
                }
                Event.$emit('hoverArea', this.area)
                // this.width = 50;
            } else {
                Event.$emit('clearLabelAnno');
                this.isHover = false;
                // this.width = 16;
            }
            this.xPosition = this.getX();
            this.yPosition = this.getY();
        },
        updateSelection() {
            if (this.$root.isDefault) {
                console.log('Changing the selection');
                this.isSelected = !this.isSelected
                if (this.isSelected) {
                    Event.$emit('updateSelection', this.label);
                } else {
                    Event.$emit('clearSelection');
                }
            }
        },
    },
    mounted() {
        // console.log(`Setting town at ${this.xpos}, ${this.ypos}`)
        this.xPosition = this.getX();
        this.yPosition = this.getY();
        // console.log(`Setting town at ${this.xPosition}px, ${this.yPosition}px`)
    }
})



Vue.component('mini-map', {
    template: `
        <g id="world">
            <rect id="_2x1bg" class="map-world-bg" y="875" width="250" height="125"/>
            <path id="west_genesaris" :style="getStyle('west_genesaris')" d="M16.44,931.19c.3-.32.88-.06,1-.71,0-.24-.81-1.15-1-1.21-1.62-.53-1.11,1-1.41,1.79-.1.26-1.26,2.22.26,2.24.28,0,1.43-.73,1.37-.94-.12-.43-1.26-.11-1.12-.87C15.6,931,16.37,931.27,16.44,931.19Zm30.43,6c-.24,0-.55.35-.68.4s-.76.51-.82.56c-.62.5-.14.43-.93.86-1.47.78-1.61,0-2.92-.55a3.39,3.39,0,0,0-2.58,0c-1.38.49-.77,1.74-1.77,2.39-.31.21-1.44.37-1.71.11-.57-.54.06-.68.37-1.13s.75-.15,1-.4a6.41,6.41,0,0,0,.86-2c0-1.24-1.08-.83-1.85-.78s-1.7,0-2.4.11-1.47.75-2.28.72c-1.6-.07-1.63-1.37-1.83-2.52-.09-.5-.26-1-.32-1.52,0-.3.29-.78.25-.93-.11-.48-1.62-.22-1.85-.3-.68-.27-.27-.48-.77-.84s-2.19,1.63-2.29,1.7c-.5.33-1.36.33-1.53,1.19s.58.65.76,1.38-.11.7-.05,1.28a7.64,7.64,0,0,0,1,2.91c.24.44.09.72.5,1.06.63.52,1.41.17,1.86.77,0,0,.5,1.81.58,2s.57,1.11.68,1.25c.46.57,1.25.8,1.73,1.29.75.75.69.65.94,1.87a9.2,9.2,0,0,0,1.62,3.75,24,24,0,0,0,3,3.91c.43.4,2.09.9,2,1.54-.08,1.22-1.47.41-2,.14a1.6,1.6,0,0,1-.71.19.75.75,0,0,1-.41-.89l-.81-.56a7.7,7.7,0,0,1-1.41-.42,3,3,0,0,1-1.4-1.26c-.13-.23.24-.56,0-.85s-.79-.48-1.09-.75a9.72,9.72,0,0,1-.79-.8c-.18-.22,0-.72-.45-1-.78-.48-2.77.81-2.19,1.5.23.28.32-.23.53-.06,0,0,0,1.75,0,1.74-.55-1.27-2-1.11-2.89-2.55-.32-.52-.61-1.77-1.1-2.16a6.87,6.87,0,0,0-1.59-.55c-.24-.09-.41-.33-.65-.43.07,0-.88-.17-.88-.09-.34-.32-.38-1-.66-1.36s-2-1.23-2.2-.72a8.43,8.43,0,0,0,.66,1.92A18.79,18.79,0,0,0,18.57,950c.32.18,1,0,1.05,0,1.49,1.38-1,2.17,0,3.59.72,1,1.53.29,2.34.51s1.2.92,1.65,1.73a5.24,5.24,0,0,1,.5,1.76,5,5,0,0,0-.11,2c-.24-.1-.6-.36-.56,0a6.24,6.24,0,0,0,1.13,2.55c.08.12,1.13,1.3,1.15,1.31.28.1,1.12-.36,1.25-.2.77,1-1.59.91.29,1.8.54.25,1.3.13,1.93.5.31.18,1,1.08,1.44,1.08s2.31-1.57,2.42-1.4c0,0-1,1.76-1,1.91-.3,1.09-.37,1.08.43,1.89s1.31.87,1.79,1.76.25,1.46,1.18,1.55,1.16-1.2,1.75-1.67c1-.8.85-.43,2.11-.51.26,0,.58-.49.85-.53s.66.13,1,.1a4.19,4.19,0,0,1,2.39.39c.46.16,0,.43.75.52a14.8,14.8,0,0,0,1.71-.64,3.74,3.74,0,0,1,1.82.21,5.32,5.32,0,0,1,.83.31V938.05C48,937.78,47.7,937.16,46.87,937.24ZM43,959.79c-1.15.92-3.67-1-2.39-2.17C41.71,956.62,44.47,958.61,43,959.79ZM26,948.71c-1.28.29-.9,1.72.13,1.95C26.79,950.74,27.15,948.45,26,948.71Zm-9.6-3.24c-.93,0,.11.64.11.63S17.17,945.46,16.4,945.47Zm-.88.17a.53.53,0,0,0,.32-.5C15.86,944.48,14.84,945.54,15.52,945.64Z"/>
            <path id="east_genesaris" :style="getStyle('east_genesaris')" d="M104.67,943.86c-1.37.2.2.56-.14.95-.09.09-.88-.25-.83-.26-.94,0,.11.68,0,1.14-.17.68-.65.63-.84,1.27a1.43,1.43,0,0,0,2.19,1.69,2.82,2.82,0,0,0,.88-1.62c0-.21.37-1.94.35-2A1.4,1.4,0,0,0,104.67,943.86Zm-1.25,3.81c.1-.24.21-.25.34,0C103.66,948,103.55,948,103.42,947.67Zm-2.36,0c.09.06-2.07-1.36-1.15-1.55a.38.38,0,0,0-.1-.36c-.8-.32-.88,3.06.27,3.65.76.38.5.08,1.36-.17a4.63,4.63,0,0,1,1.11-.07C103.22,948.55,101.11,947.71,101.06,947.68Zm-6.58,17.68c-1.16-1-3.32.23-4.64-.61l-.36.13c-.13.22.49.46.38.61s-.76-.62-1-.34c-.65.72,1.12,2.61,1.68,2.86.75.34,1.37-.06,2.11-.17.32-.05,1.1,0,1.37-.11s.76.11,1-.18C95.41,967,94.89,965.72,94.48,965.36Zm-6.06-.92c0,.68.58.12.65.14C89.36,964.62,88.39,963.57,88.42,964.44ZM98.55,953c-2-.16-2.74-2.92-2.54-4.49s.45-4.76-1.08-6c-1-.81-1.32-.16-2.29-.64a11.84,11.84,0,0,1-1.74-2.09,8,8,0,0,1-1.43-2.61c-.64-1.65-.52-.89-1.82-1.37-1-.35-.93-.76-1.74-.3-.26.15-.37.78-.56,1a4.88,4.88,0,0,1-1.57.84c-.92.47-1.29.81-2.12.41s-1.66-1.4-2.7-1.87-1.76-1.18-2.65-1.61c-.25-.13-.6.26-1,.09s-1-.8-1.46-1.08a6.78,6.78,0,0,0-1.93-.89c-.68,0-.93.67-1.53.74s-1-.43-1.4-.27-.42,1.22-.88,1.22-1.14-3.55-1.77-3.63c-.26,0-.35.35-.5.56v42.71a2.77,2.77,0,0,0,1,0c.35-.06.46-.4.65-.45s1.37,0,1.41,0c1.62-1-2.12-.87-2.62-1.33-1.32-1.23,2.73-.84,3.45-.8a35.69,35.69,0,0,0,4.6.19c.7-.06,1.57-.85,2.13-.82.82.06,1.29,1.06,2.27,0,.43-.45-.43-1.26.73-1.58.52-.14.59.67,1,.69,1.36.06.38-.08,1.32-.47a5.66,5.66,0,0,1,2.06-.23c1.26,0,2.41.87,2.75-1a12.43,12.43,0,0,0-.36-2.17c-.32-.9-1.13-.85-1.46-1.06a3.18,3.18,0,0,1-1.23-1.1c-.22-.44-.08-1-.38-1.39-.16-.19-.66,0-.9-.17a13.35,13.35,0,0,1-1.21-1.28c-.74-.89-.6-.54-.57-.43l-.18-.29a15.1,15.1,0,0,0-.42-1.55c.65-.67,2.26,1.08,2.67,1.26a16.67,16.67,0,0,1,2.62.91c.71.47,1.64,2.35,2.27,2.47l1.84-1c.51-.29.89-.88,1.46-1.11s1.07.05,1.54-.13a3.5,3.5,0,0,0,1.57-1.43c.5-.91.29-.79.14-1.82-.4-2.75.56-.43,2.1-1.14.59-.26,1.08-1.46,1.57-1.91C97.76,954.54,100,953.14,98.55,953ZM76,939.85c.88-.68,2.41-.22,1.51.94S75.45,940.3,76,939.85Zm-8-2.69c.46-.46.72-.37,1.18-.77.22-.18.46-1.39,1.17-1.38.1,0,.68,1.1.82,1.25.5.56,1.06.28,1.36,1.11a1.84,1.84,0,0,1-.46,1.93c-1.21.73-1.72-.58-2.51-1.18l-.33-.6c-.28-.32-.51-.3-.67.07C68.76,937.66,67.48,937.79,68.09,937.16Zm1,30.2s.17,1,.18,1C68.13,969,68.73,966.93,69.13,967.36Zm9.57-11.71c-.26.33-.15,1-.45,1.35a6.5,6.5,0,0,1-1.16.73c-.77.56-1,1.27-2.29,1.15-.41,0-.69-.59-1.11-.7-.24,0-.75.3-1,.31s-.91-.25-1-.26-.48.34-1,.23A13.88,13.88,0,0,1,69.23,957c-.35-.42-.71-.12-.69-.79,0,.45,1.13-1,1.13-1.05.77-.42,1.67-.29,2.38-.75s1.32-2.35,2-2.63c0,1.13.33,1.54,1.52,1.41.36,0,1.45-.71,1.64-.65.63.17-.24,1.35-.15,1.56s.32.17.45.38S79.3,954.9,78.7,955.65Zm2.51-15.74c-.63.45-2.23,1.79-1.83-.06S82.2,939.2,81.21,939.91Zm4.68-1.44c.21,0,.28,1.51.3,1.51-.21,1,0,.62-1.13.26C84.5,940.08,85.48,938.41,85.89,938.47Zm-.61,4.66c-.85-1.31,3.3-.28.52,0A.59.59,0,0,1,85.28,943.13Zm2.78,9.24c-.21-.15-1.71-.15-1.8-.44s1.25-.52,1.45-.46C88.34,951.64,88.46,952.63,88.06,952.37Zm1.6-2.35c.74-.41.24,1.39,0,1.32C89.12,951.21,89.4,950.16,89.66,950Zm.25,4.15c-.72,0,.4-.92.27-.6A.69.69,0,0,1,89.91,954.17Zm-.1-5.41c.15-.08,1.42-.31,1.29.33S89.75,948.74,89.81,948.76ZM77.3,974c-1,.08.3,1.31,0,1.95s-2.23,1-2.86.93a2.55,2.55,0,0,1-2.2-1.78c-.26-.78.11-2.85-1.21-.94-2.32,3.34,2.81,4.71,5.11,4.5a3.78,3.78,0,0,0,2.41-1.67C78.77,976.39,78.11,973.88,77.3,974Z"/>
            <path id="mid_genesaris" :style="getStyle('mid_genesaris')" d="M57.67,934.14c-.81.17-2.53.46-3-.33-1.39-2.3,3.72-2.87,3.68-2.41C58.24,933.12,59.87,933.67,57.67,934.14Zm8.2-3.16v42.71l-.24-.07a7.35,7.35,0,0,1-.84-.4c-.6-.3-1.23-1.05-2-1.09-.27,0-1.1.44-1.43.48a2.15,2.15,0,0,1-1.75-.38c-.63-.51-.42-1-1-1.43s-1.21.18-1.88.07c-1-.16-.46-.39-1.09-.81-.38-.25-.7-.64-1.18-.68-1.24-.12-.78.74-1.58,1.45a2.37,2.37,0,0,1-1.88.63l-.19,0-.24,0-.34-.1a16.68,16.68,0,0,1-1.67-.69V938.05a.66.66,0,0,0,.19.09,1.52,1.52,0,0,1,.55.24,3.21,3.21,0,0,1,.41-.18c.33-.11,0-1.2.65-1.05.91.2-.27,1.33-.05,1.6,0-.07,1.58-.93,2.13-.65,1.37.69.1,1.52,2.45,1.34.41,0,2-.6,2.4-.18.57.65-1.07,1.75-1.55,2.25a6.31,6.31,0,0,0-1.42,2.35c-.55,1.28-1.31,2.38.75,1.95,1.39-.29,1.43-1.19,2.68-1.73.27-.12.48.27.58.24.29-.08.51-.48.74-.54a4.92,4.92,0,0,0,1.84-.74c.37-.37.67-2,1-2.51s.31-.79.84-1.08,1,.54,1.58-.07a6.39,6.39,0,0,0-.42-2.9c-.6-.79-1.35-.59-2.08-1.08-.92-.63-.72-1.74.07-2.76a5.65,5.65,0,0,1,2.45-1.24,8.1,8.1,0,0,1,1.36-.3A.25.25,0,0,0,65.87,931Zm-11,19.65c.12-.7-2.64-.51-3-.43s-2.88,1.23-2.75,1.65C49.27,952.5,54.81,950.78,54.83,950.63Z"/>
            <path id="orisia" :style="getStyle('orisia')" d="M103.7,944.55s.74.35.83.26c.34-.39-1.23-.75.14-.95a1.4,1.4,0,0,1,1.6,1.14c0,.09-.3,1.82-.35,2a2.82,2.82,0,0,1-.88,1.62,1.43,1.43,0,0,1-2.19-1.69c.19-.64.67-.59.84-1.27C103.81,945.23,102.76,944.55,103.7,944.55Zm-.28,3.12c.13.29.24.28.34,0C103.63,947.42,103.52,947.43,103.42,947.67Zm-3.51-1.54a.38.38,0,0,0-.1-.36c-.8-.32-.88,3.06.27,3.65.76.38.5.08,1.36-.17a4.63,4.63,0,0,1,1.11-.07c.67-.63-1.44-1.47-1.49-1.5S99,946.32,99.91,946.13Z"/>
            <path id="kadia" :style="getStyle('kadia')" d="M118.32,961.67v-.23C118.22,961.38,118.26,961.75,118.32,961.67Zm0-.32s-.07.07,0,.07S118.36,961.36,118.35,961.35Zm0,.35s0,.11,0,.06S118.34,961.7,118.33,961.7Zm.91-.44c-.1,0-.16.13-.28.11s0-.21,0-.21-.23-.22-.21-.21-.17.21-.38.16c-.56-.14.34-1,.52-1.19s-.68-.44-.58-.5a1.54,1.54,0,0,0,.35-.42c.1,0,.2-.13.33-.11s-.17.24,0,.27.15-.23.15-.24.4.06.47,0-.16-.15-.09-.16a9.57,9.57,0,0,1,1.44-.22c.52.08.51.2.5.55,0,.1-.06,1-.07,1s0-.1-.11-.06a.2.2,0,0,0,0,.11c.18,0,.32.34.2.35s0,0,0,0-.16,0-.19,0,.18.61,0,.74a3.84,3.84,0,0,1-.9.46c-.07,0,.26-.62.11-.65-.32,0,.25-.45,0-.55,0,0-.06.17-.14.15s.07-.16.07-.16c-.05-.26-.32.32-.32.32a.37.37,0,0,1-.26-.07C120,960.77,119.34,961.21,119.24,961.26Z"/>
            <path id="alterion" :style="getStyle('alterion')" d="M133,959.65a.7.7,0,0,0-.46.16.26.26,0,0,1-.23-.25,7.28,7.28,0,0,0-1-.14c-.7,0-1,.36-1.62.69a3.17,3.17,0,0,1-1.75.28,1.73,1.73,0,0,0-1,.3c-.17.1-.48.53-.65.48s0-.2,0-.26-.7.9-.83,1-.81.66-.71,1,.63.14.88.2c0,0,.11.35.07.38s-.24-.2-.36-.1-.21,1.19-.23,1.15c.06.14.8.33,1,.4.79.36.83.47.67,1.37-.06.36-.28.68-.19,1,.13.56.62.72,1,1a3.32,3.32,0,0,1,1.11,1c.2.23.11.24.3.36s.91.19.89.21a.4.4,0,0,0-.1.15c0,.16.41.14.46.33s-.18.44-.15.6.22,0,.32.15.22.46.42.53.64-.1.61-.2-.41.14-.48-.14c-.13-.49.18-.17.32-.14.54.09.74.45,1.32.5s.84-.29,1.32-.5c.18-.09.73,0,.92-.21.07-.07.07-.66.15-.67s.66.3.9.23c.65-.19,0-.25-.12-.56a3.05,3.05,0,0,1,.62-1.38c.25-.25.61-.19.48-.55s-.49-.12-.57-.22-.08-.11-.08-.45a.5.5,0,0,0,.31-.42.28.28,0,0,0-.3-.09c-.11-.11-.66-.15-.78-.29s0-.37,0-.52a5.28,5.28,0,0,1-.34-.91c0-.21.27-.6.3-.88.17,0,.23-.07.19-.23a2.43,2.43,0,0,1-.2-.25,1.59,1.59,0,0,0,.91-.37c.2-.32-.14-.73-.1-.83s.63-.12.42-.38-.2.14-.3-.34a5.07,5.07,0,0,0,0-.79c0-.81,0-.67-.82-.82a7.38,7.38,0,0,1-1.23-.29c-.19-.07-.12-.31-.36-.35S133.31,959.74,133,959.65Zm-2.61,3.42c-.09,0-3.06.83-2.86.19,0,0,1.55-.62,1.68-.63S130.56,963,130.4,963.07Zm.34,7.92c-.06,0-.13.31-.21.24s.2-.2,0-.3S131,970.87,130.74,971Zm2.13-7.4q.23.12,0,.24C132.72,963.84,132.74,963.59,132.87,963.59Zm-.72,6.37c-.14.18-.6.78-.88.29-.11-.19.22-.41.28-.53-.05.11.56-.46.48-.46C132.13,969.26,132.18,969.91,132.15,970Zm.84-5.19c-.1.4-.41.34-.37.87,0,.22.27.2.27.44s-.39.51-.24.7.55-.13.26.4c-.07.13-.35.31-.52.22s.05-.66,0-.82c-.12-.49-.65-.66-.64-1s.64-.67.76-.85.26-.16.3-.19-.14-.4,0-.48.59.38.57.42C133.32,964.68,133.08,964.38,133,964.77Zm.55,3.49c-.28.3-.53-.62-.49-.73s.52-.4.47-.12-.3,0-.21.41C133.34,967.94,133.65,968.13,133.54,968.26Zm.3.24c-.34,0-.12-.24-.13-.26S134.17,968.49,133.84,968.5Zm-8.71-.85c-.06-.31.84-.92.8-.53s-.28.27.34.82c.08.07.84.3.55.64s-.73.1-1-.12c0,0-.09-.34-.14-.42C125.5,967.77,125.13,968.22,125.13,967.65Zm10.75-1.42c-.58,0-.43-.91.19-.9C137.05,965.35,136.53,966.1,135.88,966.23ZM137,964.8c.68.35-.15,1.07-.58.44-.08-.12-.16-.47-.06-.6l.77-.23C137.32,964.47,137.1,964.78,137,964.8Zm-1.44.53c-.34,0-.08-1.2.28-.93S136.13,965.47,135.58,965.33Zm-10.55,3c.26,0,.83.59.4.61C125.29,969,124.54,968.33,125,968.36Zm7.51-2.81c-.06.11-.13.11-.19,0S132.52,965.46,132.54,965.55Z"/>
            <path id="athentha" :style="getStyle('renovatio')" d="M144.66,949.27s-.59.18-.68.15a1.21,1.21,0,0,1-.54-.9c-.05-.41,0-1,.38-1.23a.88.88,0,0,1,1.25.7c0,.3-.29.39-.34.59C144.65,949,145,948.92,144.66,949.27Zm-2.39-1.55c0-.12-.65-.34-.46.36C142,948.59,142.25,948.23,142.27,947.72Zm.3.77c-.23,0-.67.33-.34.5S142.64,948.49,142.57,948.49Z"/>
            <path id="renovatio" :style="getStyle('renovatio')" d="M158.3,945.25v.18s.31-.14.37-.07-.13.15.23.36a1,1,0,0,0,.63.21,3.46,3.46,0,0,0,.72-.39c.23.27-.2.64-.36.82-.34.35-.24.26-.69.23-.11,0-.28-.17-.42-.18s-.37.07-.44.07-.66.21-.62.18c-.19.16,1.09,1.19,0,1.13-.82,0-.27-.73-.42-1s-.59-.14-.68-.4c-.19-.52.57-.15.81-.23S158.06,945.25,158.3,945.25Zm7.88,8.89a.58.58,0,1,0-.92.71c.19.3.32.3.52.19C165.66,955.11,166.18,954,166.18,954.14ZM156,949.68c-.68.09-.36.54-.68.71a8.14,8.14,0,0,1-1.34.16c-.59-.11-.7-.72-.73.16,0,.16.21.37.26.55,0-.1-.7.19-.77.16a2.58,2.58,0,0,1-.56,1.55c-.13.15-.73.9-.89.87.12.14.11.24-.17.24.19-.73-.66-.71-.61-.19s1.11.77.78.34c.2.07.39-.32.51-.26.33.17.42.87.49,1.19.21.92.34.68,1.14.85.25.06,2.38,1.19,1.56,1.75-.63.42-.84-.77-1.2-.93a.85.85,0,0,0-.36,0c-.36.21.31.3.32.35.06.35,0,.6.08.89.16.59.22.29.63.6.2.15.41.56.59.66s.37-.17.45-.14.33.41.52.32.72-1.22.83-.91c.21.61.79-.14.18,0l-.13-.07a.78.78,0,0,1,.34-.09c.09-.15-.35-.72-.3-.92a1.94,1.94,0,0,1,1.35-.69.19.19,0,0,1,0-.18c.46,0-.47.75-.51.7a1.72,1.72,0,0,0,.62.25c.21-.05.13-.43.37-.48s.49.34.73.46c0-.72.42-.23.66-.63a2.26,2.26,0,0,0,0-.93c0-.13-.41-.34-.4-.62,0-.49.51-.29.56-.33s.16-.3.17-.3c.15-.22.14-.63.25-.81s.24-.47.56-.38,0,.45.37.37c.06,0,.25-.36.31-.39a1.59,1.59,0,0,1,.54-.2c.12,0,1,0,.4-.12.75,0,.1-.49.14-.67a.44.44,0,0,1,.16-.06c0-.12-.57-.41-.62-.46-.4-.45-.32-1.16-.84-1.32-.13-.05-.66.12-.72,0s.28-.39.29-.43c0,.13-1.11-1.34-1.07-1.32-.18-.09-.37.2-.41.18s-.32-.36-.42-.42-.65.52-.72.66c-.07-.39-.4-.12-.57-.25s0-.31-.14-.44a.71.71,0,0,0-1.13.21c-.09.13.3.19.09.35a.79.79,0,0,1-.36.11c.24-.23-.47.08-.35,0-.19.08.06.26-.06.38C156.22,949.68,156.15,949.64,156,949.68Zm2.68,5.53c.06,0-.14.58-.17.6s-.34-.42-.34-.5.48-.54.54-.59.08-.26.21-.35a6.58,6.58,0,0,1,.94,0c-.22.66-.79.57-1.23.72C158.6,955.12,158.62,955.18,158.72,955.21Zm-2.26-2.39c0,.06-.29.11-.4.3a5.6,5.6,0,0,1-.12,1c-.18.07-.86-.53-.93-.67s-.27-.71,0-.85c-.08.05,1.58-.13,1.34-.22C156.33,952.34,156.44,952.85,156.46,952.82Zm-.87-1.81a2.69,2.69,0,0,1,.55-.69c.52-.09.6.87.79.85-.29.2,0,.64-.17.81-.33.37-.45-.51-.45-.59s.22-.34.23-.51-.43-.07-.39,0,.24,0,.12.12S155.62,951.07,155.59,951Zm5.45.2c0,.4-.91.25-1,.14s-.29-.94-.36-.78.67-.14.74-.12A1.23,1.23,0,0,1,161,951.21Zm-7.18,1.17c-.25,0-.09-.47,0-.42A.22.22,0,0,1,153.86,952.38Zm4.41,4.14Zm4.27-2.58c.19.12-.77.38-.72.36-.11.06,0,.26-.22.29s-.33-.11-.47-.1-.67.7-.69.78c-.1.46.39,1.12.18,1.56,0-.12-.45.46-.39.39-.29.32-.1.36-.5.62a.38.38,0,0,1-.73,0c-.14,0-.36.19-.5.2-.81,0-.71,0-.84.79,0-.23.17.8-.08.53.22.23.25.05.65,0a5.1,5.1,0,0,0,3.13-1.08c.43-.44.47-1.1.9-1.53s.6-.17.6-.75c0-.33-.48-.63-.45-.85s.33-.21.39-.34.14-.66.27-.79c.42-.43.65,0,1.2-.31.33-.2.68-1.28.07-1.45-.27-.07-.23.17-.45.36l-.3.29c-.14.13-.85.47-.56.79-.17-.12-.33,0-.48.08C162.58,953.81,162.71,954,162.54,953.94Zm-.15,1.75c-.11.06-.58,1.82-1,1.18s1.06-1.2,1-1.33C162.46,955.59,162.46,955.63,162.39,955.69Zm1.52,3.53-.43.16a.18.18,0,0,1,.14.11,12.81,12.81,0,0,1-1.67.9,7.22,7.22,0,0,1-1.65,1c-.36.09-.41-.27-.82.08s-.35.38-.06.69a3.5,3.5,0,0,0,1,.38c.46.14-.06.32.45.09.28-.13.25-.35.43-.47s.5-.08.68-.36c.3-.47-.08-.69.47-1.06.06,0,.23.1.33,0s.15-.3.26-.39l.45-.38C163.7,959.81,164.27,959.52,163.91,959.22Zm-2.68,2.24c.2.25-.41,1-.53.75C160.69,962.19,160.89,961,161.23,961.46Zm-9.54-10.26c.33.5.84-.8.88-.83s.26.14.44-.13.12-.37.24-.58,1-1,.62-1.13c-.55-.25-1.33.94-1.59,1.21S151.22,950.5,151.69,951.2ZM152,957a.81.81,0,0,1-.62-.25c-.21-.36.16-.3.15-.57s-.12-1.43-.46-1.2c-.57.41,0,1,.08,1.55s-.12.75.33,1.26C153.45,959.94,152.09,957,152,957Zm2.86,3.22c.07.12.82.68.59.2.3.2,1.54,1.44,1.54.15,0-.84-.49-.34-.85-.38-.13,0-.26-.53-.44-.16-.23-.5-.3.21-.35.22S155,960.09,154.89,960.2Zm.5-13.31s-1.38-1.4-1.51.2c.11,0-.41-.23-.31-.22-.14,0-.77.81.32.61.4-.07,1.09-.58,1.48-.27Zm.51.91c.66-1.25-2,.32-1.76.55.06.06.14-.11.18-.1.29,0,0,.71.64.29.15-.09.32-.41.46-.52S155.74,948.11,155.9,947.8Zm-3.93,12a1.11,1.11,0,0,0,0,1.29c.11.15.12.35.39.38s0-.12.06-.36c0,0,0-.44,0-.52s.23-.23.23-.32C152.68,960,152.25,959.38,152,959.76Zm8.31-12c-.3.09-.52-.2-.59.29,0,.25.36.53.52.57,1,.28,1.15-1.09.15-.71C160.43,947.8,160.41,947.75,160.28,947.76Zm4.11,1.68c0-.45-.34-1.18-.78-1.27-.09,0-.23.71-.2.81S164.37,949.79,164.39,949.44Zm-14.8,3.15c.45.08,1.29-.88.61-1.23S149.52,952.57,149.59,952.59Zm8.84,9.69a5.62,5.62,0,0,0-1,0c-.29.12-.49-.09-.26.35C157.61,963.47,159.06,962.54,158.43,962.28Zm5-11.86c-.21-.39-.09-.49-.47-.69s-.52,0-.33.53a3.16,3.16,0,0,0,.28.45C163,950.76,163.66,950.85,163.44,950.42Zm-9.28,11.26c1.16.17.29-1-.3-1C153,960.76,153.94,961.65,154.16,961.68Zm-3.24-11.58c.4.08,0-.4.05-.44s.46.07.49-.13-.15-.79-.64-.51C150.48,949.21,150.62,950.05,150.92,950.1Zm8.51,10.38c-.22.12-.85.27-.8.56,0-.18.77.13.75.14C159.82,961.05,160.42,960,159.43,960.48Zm-3.72-11c.34.07.49-.35.15-.45-.17-.05-.7.44-.71.52C155.12,950.27,156,949.57,155.71,949.52Zm8,7.58c-.3-.19-.73,1-.18,1C163.73,958,163.82,957.2,163.67,957.1Zm-2.24,2.15c0-.14-.65,1.59.38.34A.42.42,0,0,1,161.43,959.25Zm-11.1-2.17c-.73,0,.53,1.14.61.95a5.12,5.12,0,0,0-.49-.45C150.84,957.46,150.36,957.08,150.33,957.08Zm-.71-1.81,0-.53s-.69-.06-.62.28C149,955,149.58,955.41,149.62,955.27Zm-.07-.62c.2.2.37-.44.34-.52C149.73,953.77,149.22,954.3,149.55,954.65Zm.68-5.47c-.3-.09.1.77.18.75a2.87,2.87,0,0,0,.23-.7C150.55,949.14,150.35,949.21,150.23,949.18Zm.08,7.6c0-.79-.54-.27-.36-.1C149.93,956.66,150.32,957,150.31,956.78Zm9.42-7.66c.14.13.22-.19,0-.23Zm-4.82,11.06c.06-.09-.06-.25-.16-.15S154.83,960.24,154.91,960.18Zm-.75-3.45c-.3-.29,0,.32,0,.2A.24.24,0,0,0,154.16,956.73Zm2.09-6c0-.17-.22-.09-.2,0S156.26,950.87,156.25,950.72Z"/>
            <path id="terrenus" :style="getStyle('terrenus')" d="M172.16,907.19c0-.06-.48,0-.38.24C172,907.87,172.13,907.43,172.16,907.19Zm4.78-.78c-.75-.85-.47-4.61-2.61-3.92-1,.31-1.6,2-1.66,2.69-.11,1.13.39,1,.63,1.6.07.17.87-.28,1.11-.18s-.12.77.38.83A6.34,6.34,0,0,0,176.94,906.41Zm.56-1.64C177.07,904.8,177.62,904.88,177.5,904.77Zm.72-1.45c-.19-.14-.57.09-.8.09C176.48,903.41,178.92,903.81,178.22,903.32Zm4.86,34.89c-1.17-.38-.08.36-.33.56C182.68,938.83,183.61,938.38,183.08,938.21Zm7.79,10c0-.31-1.09-.14-1,.37C190.15,949.56,191,948.27,190.87,948.25ZM192,946.4a1.39,1.39,0,0,0-.4-.5C191,945.84,191.85,948.05,192,946.4Zm3.89.78c0-.64-3.44.17-2.26,1.42a6.82,6.82,0,0,0,1.71.47C195.93,948.78,195.93,947.85,195.9,947.18Zm6.08,5.91c-.73-.53-.27,0-.74-.08C201.05,953,202.45,953.42,202,953.09Zm1.73.31a5,5,0,0,1-.06-.81c-.24-.28-.8.2-.5.55C203.22,953.23,203.75,953.85,203.71,953.4Zm16.4-4.56a1.11,1.11,0,0,0-.44-.12c.11,0-.27.48-.08.51A.66.66,0,0,0,220.11,948.84Zm2.5-1.4c0-.43-.4.22-.27.23A.31.31,0,0,0,222.61,947.44Zm.13,2.06s-.14-.14-.14-.11V949c-.21-.35-1.35.45-.6.74C222.1,949.77,223.05,950,222.74,949.5Zm5-34.69c-.14-.12-.88-.54-.88,0a4.48,4.48,0,0,1,.07.68C227.11,915.83,227.78,914.85,227.74,914.81Zm-19.6,12.72c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm20.32-15.73a15.19,15.19,0,0,1-2.11-2.85c-.18-.73,0-1.55-.15-2.18a4.48,4.48,0,0,0-1.19-2.4c-.46-.53-1.35-1.92-1.95-2.21-.93-.44-2.17-.5-3.16-.93a6,6,0,0,0-1.79-.7c-.39-.07-2-.57-2.13-1l.15-.12c.09.35-3.07-.57-3.22-.33.21-.33-.3-.37-.66-.38-.13,0,.09.31.16.33l-.15.15c-.25-.18-1-.81-1.18-.64a2.71,2.71,0,0,1-1.48.68,10.55,10.55,0,0,1-1.89.38c-.67,0-.93-.4-1.52-.5s-.92.3-1.39.21c-.78-.15-1-1-1.85-.65-.3.11-1.3,1.49-1.38,1.2-.43,0-.12,1.06-.84.29-.1-.11.81-.64.86-.71s-1.89-1.81-2.43-1.79c-.87,0-.83.82-1.48,1.19-.38.22-1-.32-1.31-.11-1.24.8-.21,2.79-.21,3.72,0,1.59-.84,1.16-1.88,1.26s-1.85.54-3,.77c-.31.06-.23.55-.82.4a6.34,6.34,0,0,1-1.24-1.47,3.67,3.67,0,0,1,.4-1,1.07,1.07,0,0,1,.28.19c1.19-.89-.21-1.06-.48-1.47,0-.08-.78-1.1-.45-1.11l.38.14a.76.76,0,0,0-.31-.94,14.5,14.5,0,0,1-2.2.12c-.4,0-.3-.55-.8,0-.29.33.46.88.36,1.11-.47,1.08-1.89-1.06-2.3-.95-.67.2-.47,1.69-.38,2.2.25,1.39,1.28,2.34-.78,2.41-.58,0-.56-.38-1.42,0a2.92,2.92,0,0,0-1.54,1.93c-.12,1.46,1.05,1.7,1.71,2.23.47.37,1.58,1.46,1.29,2.09-.15.33-1,.09-1.4.26-1.13.47-.92,1.21-2.34.26-.61-.4-1.1-.87-1.69-1.19-.13-.07-.8-.42-.88-.43a5.22,5.22,0,0,1-.67-.27c-.4-.14-.26.5-.54.45s-.63-1.26-1.27-1.4c0,0-1.78.4-1.69.24-.92,1.75-.4,2.23.6,3.94a9.37,9.37,0,0,1,1.08,2.4c0,.51-.46.67-.43,1.1a1.81,1.81,0,0,0,.36.93c.19.29-.45.41-.42.5a.37.37,0,0,1,.18-.29c.17-.42-1,.09-1.05.16-.17.28,0,.57.05.83s.76,1.21.71.84c.14,1-.26.36.54,1.33.09.12.64.17.83.41.38.45-.24,1.82.63,1,.54-.2,0,2.66,0,2.81-.17.58-.12,1-.67,1.5s-.81.2-1.06.33c-.84.4-2.09,1-1.35,2.11.37.55,1.29.36,1.84.36-.68,0,.74,2.61.75,2.68.25,1.21-1.12,2-.86,3.35.09.45.72.57.72,1.11,0,.36-.75.51-.75,1,0,.84.12.77.57,1.23.91.92.68.56,1.58.22s.76-.66,1.74-.8c.63-.09,1.32.22,1.93.14s2.17-.56,2.53-1.18c.47-.82-.25-1.45.46-2.32s2.18-.85,3.1-.63c1.43.34,1.75.6,3.08,0,.93-.44,1.88-.59,2.49-1.35s0-2.3.21-2.48a.14.14,0,0,1,.24.13c.11.11,1.49,2.06,1.47,2,.11.38-.37,3.8-.27,3.75-.07,0-.1.39.13.27,0,0-.4,2,.16,2.05.08,0,.17-.18.31-.08-.06,0-.06.1,0,.13a.82.82,0,0,1-.38,0,1.26,1.26,0,0,0,.14.57.22.22,0,0,0,0-.13c.19-.07.33,1.56.33,1.57s1.7,1,1.19,1.06c.12-.55,2.26,0,1.6.83-.06.07.84.26,1.13.45s.85.78,1,.85c.4.16.38-.38.63-.38.45,0,1.4,1.55,1.06,1.93a1.22,1.22,0,0,1,.44.32s-.57.25-.29.38c.24-.08.9,2.7,1,3.17a2.75,2.75,0,0,0,.41,1.15c.14.2-.05.61.19.74-.19-.1,1.48-.48,1.27-.3-.64-.23,1.08-1.29,1.29-1.41.61-.33,2.5-1,2.74-2.14.66-.42,1.7,1.91,2.65.5.1-.16-.18-2.07.59-1.87.94.24-.06.63,1.22.29.58-.15,1-.89,1.58-1,1.33-.33,2.42.76,3.59-.1.57-.42-.24-1,.85-.95.47,0,.46.07.34.29-.33.6.72.33.82.29.54-.21.33-.61.55-.81,1.26-1.13.81.12,2.39.2,1,0,2.41-1.64,2.52-2.82.07-.89-.91-1.33-1.11-2s.37-1.23.31-1.77c-.12-1-1.44-2-2-2.74s-.61-.15-.76-1.13,0-.76.54-1.58c.42-.63,1.43-2.24,2.41-2.15.65.07.86.93,1.5.81.34-.07.62-.87.67-.9s-.07-2.08,0-1.89a6.86,6.86,0,0,1-.54-1.23c0-.07.5-1.64.87-1.32-.14,0-.12,0,0,0-.11.09-.28-.34-.19-.48s.61-.17.54-.08c.15-.2.26-.58.06-.76.35.31.81-.74.66-1.15s-2.08-1-1.57-1.65c-.34.43-.25,0-.37.08-.46.16.36.79.39.75s-1,.75-.94.74c-.7.24-.43-.91-.38-.83s-.88-.18-.67-.33,1,0,1.12-.07-.68-.2-.46-.75c.15-.37,1.11-.5.91-.92s-.83.11-.76-.55c0-.28.86-.55,1-.77s.6-1.94.84-1.87c-.65-.19-.21.21-.38-.4a2.93,2.93,0,0,1,.08-1.68S228.77,911.7,228.46,911.8Zm-28.65,5a6,6,0,0,1-1.16,2.24c-.55.32-2.42-.57-2.2.26a.22.22,0,0,1-.21,0c-.13.17.59.32.55.53,0-.08-.6.28-.6.28a1,1,0,0,0-.19-.41c-.22,0-.9,1.77-1.24,1.9-.88.34-1-.18-1.41-.82-.08-.12-.32.5-.22.49a.42.42,0,0,1-.27-.25c.16-.4-.74-1-1.17-1.4s-.76.49-.61-.83c0-.47.62-.41.86-1,.15-.37-.2-.92,0-1.42.51-1.46,1-.78,2-.9.45-.06,1.51-.66,1.82-.61s.37.49.65.52,0,.5,0,.55c.19.24.89,0,.81,0s.75.55.83.58c.77.27.07-.14.57-.21a.79.79,0,0,1-.22.19C198.1,916.44,200,916.29,199.81,916.78Zm6.35-1s-1.53-1.5-1.45-.94a.45.45,0,0,0,.16-.31c-.34,0-1.8.45-2,.26s1.86-.64,2-.63a2.36,2.36,0,0,1,1.21.51c-.36-.23.85.93.67.65a2.07,2.07,0,0,1,.44,1.91s.27-.56.11-.49S206.47,916.15,206.16,915.77Zm3.49,10.78c-.41-.18,0,1.06,0,1.15s-.92,1.36-.67,1.53c.06,0,.11,1.65-1,1.56-.67,0-.68-.67-.6-1.3,0-.17-.2.2-.26.12s-.44-1.21-.44-1.21a8.68,8.68,0,0,1-.08-2.7c.08-.27.56-1.16.95-1.19C208.22,924.45,208.78,926.17,209.65,926.55Zm4.84,7.26c-.37.71-1.23-.12-1.34,0C212.8,933.82,215,932.82,214.49,933.81Zm6.1,4.65a3,3,0,0,1-.32.69,5.45,5.45,0,0,1-1.68-1.39c.16-1.29,1.55.3,1.44.19C220.2,938,220.65,938.21,220.59,938.46Zm-12.5-11c-.09,0-.42,0-.3.08S208.24,927.58,208.09,927.5Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Zm0,0c0-.15-.39-.15-.39,0S208.17,927.63,208.14,927.53Z"/>
        </g>
    `,
    computed: {
        active: function() {
            return this.$root.active;
        }
    },
    data() {
        return {
            list: ['west_genesaris', 'east_genesaris', 'orisia', 'kadia', 'alterion', 'renovatio', 'terrenus']
        }
    },
    methods: {
        getStyle(name) {
            // console.log(`${this.activeName} : ${name}`)
            var style = '';
            style += 'stroke-miterlimit: 10;'
            if (/^mid/.test(name)) {
                if (/genesaris/.test(this.activeName)) {
                    style += 'fill: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke-width: 1px;'
                } else {
                    style += 'fill: ' + this.$root.getCSS('color-bg') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-bg') + ';';
                    style += 'stroke-width: 1px;'
                }
            } else if (/^orisia/.test(name)) {
                if (/east_genesaris/.test(this.activeName)) {
                    style += 'fill: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke-width: 0px;'
                } else {
                    style += 'fill: ' + this.$root.getCSS('color-bg') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-bg') + ';';
                    style += 'stroke-width: .2px;'
                }
            } else {
                if (this.activeName == name) {
                    style += 'fill: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke-width: 0px;'
                } else {
                    style += 'fill: ' + this.$root.getCSS('color-bg') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-bg') + ';';
                    style += 'stroke-width: .2px;'
                }
            }
            return style;
        }
    },
    computed: {
        activeName: function () {
            var which = this.$root.active;
            // for (var i = 0; i < this.list.length; i++) {
            //     if (this.list[which] == )
            // }
            return this.list[which];
        },
    },
})
    
Vue.component('grid', {
    props: {
        size: String,
        rowcol: String,
    },
    computed: {
        realsize: function() {
            var self = this;
            return Number(self.size);
        },
        realrowcol: function() {
            var self = this;
            return Number(self.rowcol);
        },
        gridNum: function() {
            return (this.realrowcol - 1) * 2;
        }
    },
    template: `
        <g class="map-bg-grid">
            <rect class="map-bg-gridline" x="0" y="0" :width="realsize" :height="realsize"/>
            <line 
                v-for="index in gridNum"
                class="map-bg-gridline"
                :x1="index < realrowcol ? 0 : countdown(index - realrowcol + 1, realsize)"
                :y1="index < realrowcol ? countdown(index - realrowcol, realsize) : 0"
                :x2="index < realrowcol ? realsize : countdown(index - realrowcol + 1, realsize)"
                :y2="index < realrowcol ? countdown(index - realrowcol, realsize) : realsize"/>
        </g>
    `,
    methods: {
        countdown(index, total) {
            return (index > 0) ? total - ((index) * (total / this.realrowcol)) : total - ((index + this.realrowcol) * (total / this.realrowcol));
        }
    },
    mounted() {
        console.log('Hello grid')
    }
})

// Vue.component('terrenus', {
//     props: {
//         model: Object,
//     },

// })

Vue.component('board', {
    props: {
        model: Object,
    },
    template: `
        <g id="board">
            <g v-if="terrain == 'terrenus'" id="terrenus">
                <path :class="getBoundsClass('body')" :style="getBoundsStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M922.48,305.85a12,12,0,0,0,.12-3.16c0-1.4.19-4.34.3-5.24v0c1-8.4-5.8-13.24-12.22-17.12a43.35,43.35,0,0,0-8.3-3.63,15.38,15.38,0,0,0-.4-3c-1.49-6.28-5.75-9.87-8.57-12.25-.49-.41-1.19-1-1.57-1.37A19.17,19.17,0,0,1,891,249a16.14,16.14,0,0,0,3.24-11.26,15.16,15.16,0,0,0-4.29-9.61c1.07-3.62,2.17-8.79.26-14.48-1.83-5.43-5.77-8.89-8.37-11.19l-.94-.82c-.23-1.38-.5-3.21-.62-4.07-.47-3.23-.91-6.27-4-9.29a17.34,17.34,0,0,0-8.52-4.47c-.56-1-1.24-2.23-2.2-3.62a25.71,25.71,0,0,0-5.42-5.47l-.57-.45-.06-.14a19.57,19.57,0,0,0-4.28-6.16,29,29,0,0,0-7-4.47c-.61-.3-1.5-.74-1.86-1l0,0a12.15,12.15,0,0,1-2.11-2.21A12.42,12.42,0,0,0,840,153a16.29,16.29,0,0,0-13.53-4l-.16,0-2.52-.14a35.15,35.15,0,0,1-6.1-.63,41.62,41.62,0,0,1-5.85-3c-1.16-.66-2.36-1.35-3.53-2-.14-.09-.53-.39-.82-.61a23.72,23.72,0,0,0-7.84-4.28,20,20,0,0,0-6.49-.76l-.83-.27a16.45,16.45,0,0,0-1.61-2.26c-4.79-5.79-9.65-8-16.1-7.34a15.16,15.16,0,0,0-4.15-1.64c-1.43-.33-2.78-.57-4.09-.8-1.15-.21-2.23-.4-3.15-.62a62,62,0,0,0-10.18-1.31,48.37,48.37,0,0,1-6.79-.77A22,22,0,0,0,744,118a17.14,17.14,0,0,0-4.87-4.8c-.23-.16-.47-.3-.71-.44a16.41,16.41,0,0,0-8.74-3.7,21.6,21.6,0,0,0-4.71-.39,24,24,0,0,0-8.85,2.46l-.82.36a25.55,25.55,0,0,1-4.77-2.14c-1.36-.71-2.9-1.51-4.58-2.26a36.64,36.64,0,0,0-13.15-3.44c-4-3.52-8.86-4-12.3-3.9a12.34,12.34,0,0,0-9.17-.72,16,16,0,0,0-2.5-.64A28.64,28.64,0,0,0,662,98c-3-1.47-8.57-2.9-14.82,2.26-.89.72-1.8,1.57-2.76,2.46l-.2,0a25.36,25.36,0,0,0-7.5,2.85c-.39.2-1,.49-1.29.65l-1.43-.35c-10.15-2.39-23.49,3.07-27.34,4.8-1.74.78-3.22,1.54-4.4,2.15-.59.3-1.26.64-1.77.88l-.59-.23c-2.19-1-2.19-1-3.9-3-6.6-7.71-13.44-9.32-22.85-5.38a41,41,0,0,0-4.81,2.54l-.56.33-.68-.49c-.91-.65-1.74-1.24-2.42-1.68-1-.66-1.91-1.3-2.76-1.9-5.35-3.76-12-8.44-24.53-6.62-4.8.7-10.55,4-12.57,5.56a21,21,0,0,0-4.44,4.59l-.39-.24a22.12,22.12,0,0,0-7.34-2.57l-.49-.1a20.39,20.39,0,0,1-1.61-2.23l-.62-.92a12.9,12.9,0,0,0-1.29-5.1,22,22,0,0,0-6-7.54c-4.57-3.48-10.61-4.16-15.93-4.77-1-.11-2.11-.24-2.64-.33-10.27-1.84-18.1,1.43-23.27,9.71-1,1.61-1.84,3.27-2.65,4.87-.41.82-1,1.93-1.52,2.9a19.12,19.12,0,0,0-3.86-.62c-1.15-.06-2.13-.08-3.06-.09a15.69,15.69,0,0,1-2.77-.17l-.78-.14c-10.34-1.85-17.38,1.67-21,10.45a20.76,20.76,0,0,0-1.26,7.79V119l-.21.38c-.33.63-.78,1.49-1.28,2.62a52.51,52.51,0,0,0-4.37,18.63c0,.62-.12,1.22-.19,1.8-.45,3.75-1.2,10,2.93,16.74a44.09,44.09,0,0,0,3.29,4.54l.4.51a25.89,25.89,0,0,0-5.46,10.22c-1.4-.35-2.88-.78-4.39-1.21-2.36-.69-4.77-1.39-7.31-1.92a13.92,13.92,0,0,0-10.86-2c-5.88,1.4-8.76,5.93-10.79,9.64a12.59,12.59,0,0,0-6.67,1.25l-.84-.11c-3.65-.5-13.31-1.81-20.13,5.06a42.7,42.7,0,0,0-5.61-5.93c4.61-3,6.57-9.11,8.14-14.54a12.84,12.84,0,0,0,4.11-7c1.35-6-1.88-10.61-2.94-12.12a15.63,15.63,0,0,0-12.07-6.79c-.33-.13-.61-.24-.86-.36,1.43-3.35,1.27-7,1.13-10.34-.08-1.79-.18-3.35-.37-4.74a13.76,13.76,0,0,0-5.39-14.68,15.38,15.38,0,0,0-18.7-.11l-.22.17a20.63,20.63,0,0,0-4.7,2.3c-.6.39-1.13.75-1.62,1.09-.49-.19-1.09-.44-1.58-.65a31.63,31.63,0,0,0-9.56-2.81l-.56-.05a13.9,13.9,0,0,0-10.5-5.29c-7.34-.27-11.77,5.06-13.91,7.63l-.12.15-.83.63a16.64,16.64,0,0,0-4.32,4.59c-2.35-2.59-5.95-4.88-11.74-5.74-13.59-2-18.39,7.7-20.19,11.37l-.06.11c-.18.36-.33.71-.46,1a12.49,12.49,0,0,0-2.29,16.13.31.31,0,0,1,0,.1,16.25,16.25,0,0,0-.8,7.38,13.86,13.86,0,0,0,1.38,4.53,29,29,0,0,0-1.5,3.43c-3.94,10.74,2.4,18.23,6.34,22-.46.15-.9.32-1.32.5-5.54-5-11.68-6.09-18.29-3.27a41.89,41.89,0,0,0-6.73,4c-.58.39-1.37.92-1.67,1.1a48.08,48.08,0,0,0-9.3,7.18c-1.09,1.06-2.09,2.1-3.06,3.1-1.46,1.52-2.86,3-4.2,4.1l-.48.15a24.39,24.39,0,0,0-6.53,2.74c-7.65,4.73-13.66,15.15-7.55,30.2a46.61,46.61,0,0,0,2.07,4.38,5.77,5.77,0,0,1,.89,2.13,11,11,0,0,0,.32,1.37,13.72,13.72,0,0,0,.22,5.2,18.82,18.82,0,0,0,5.68,9.79,13.85,13.85,0,0,0,3.13,5.55,15.13,15.13,0,0,0,6.07,3.94,15.43,15.43,0,0,0,12.88,5.93,44.6,44.6,0,0,0,5,5.37c-5.54,1.69-9,6.21-11.2,9-.27.34-.5.66-.68.87a56,56,0,0,0-4.34,5.67c-.27.39-.58.85-.87,1.25-2.83-.33-5.69-2.44-10.2-5.9l-1-.8c-1.5-1.14-3-2.09-4.22-2.93a26.47,26.47,0,0,1-3.53-2.55c-.28-.37-.82-1.24-1.19-1.83a28,28,0,0,0-6.35-7.74,23,23,0,0,0-6.86-3.49,13.77,13.77,0,0,0-2.63-1.47,12.92,12.92,0,0,0-3.29-.91,13.68,13.68,0,0,0-5.11-1.39,13.22,13.22,0,0,0-2.44,0,23,23,0,0,0-7-4.42,20.35,20.35,0,0,0-5.15-1.29A14,14,0,0,0,139,248.88a40.09,40.09,0,0,0-5.81-6.92c-5.32-4.94-15.11-8.73-24-5.38a17.46,17.46,0,0,0-6.69,4.65h0c-3.18-1.36-12.86-5.51-20.56,2.52a17.26,17.26,0,0,0-3.54,5.42,15.37,15.37,0,0,0-3.22,2c-4.55,3.7-5.59,8.89-6.09,11.39l-.11.53c-2,7.93-.5,13.13,2.66,18.9l-.09.32c-1.18,4.31-2.07,9.47,2.39,16.18a12.81,12.81,0,0,0,4.52,4.13,18.11,18.11,0,0,0,3.08,5.52,19.64,19.64,0,0,0,5.66,4.5c.2.82.43,1.53.61,2.07v0a36.9,36.9,0,0,0,4.05,10.75l.43.84c1,2,2.09,3.9,3.1,5.7a70.2,70.2,0,0,1,3.81,7.37,67.46,67.46,0,0,0,3.17,6.26c.34.62.72,1.29,1.06,1.94-2.16,2.87-6.37,8.83-6.15,16.22-.63.15-1.13.3-1.48.42-2.29.85-8.36,3.12-11.13,9.87a14.79,14.79,0,0,0-1.2,5.84,16.48,16.48,0,0,0-1.54,12.55,12.4,12.4,0,0,0,.86,2.24,11.8,11.8,0,0,0,.68,5.1c-.92,7,4.12,11.55,5.93,13.18a12.15,12.15,0,0,0,1,.78,15.37,15.37,0,0,0,1.74,7.42c2.21,4.26,5.76,6.32,8.11,7.68l1.13.67c.73.44,1.81,1.23,2.85,2a41.57,41.57,0,0,0,8.65,5.24,18.67,18.67,0,0,0,2,.91c0,.5,0,1,0,1.54,0,.37,0,.91,0,1.55,0,6.39,0,11.9,4.08,16.24a16.59,16.59,0,0,0,7.16,4.42,26.43,26.43,0,0,0-3.69,12.86,20.89,20.89,0,0,0,1.51,7.5,19,19,0,0,0-.79,10.05c-1,1.34-2.75,3.31-3.92,4.6-1,1-1.87,2.06-2.71,3-.32.38-.53.6-.64.71l-.64.32c-.27-.09-.55-.16-.83-.23a14.13,14.13,0,0,0-10.5,1.24c-.32.12-.63.24-.92.37a15.21,15.21,0,0,0-3.7.13c-.25,0-.45,0-.62.07A16.91,16.91,0,0,0,89.1,506c-8.14,6.32-11.71,22.89-11.86,23.6-.08.41-.18.82-.27,1.23-1,4.78-3,13.68,3.85,20.21A15.46,15.46,0,0,0,87,554.65a14.78,14.78,0,0,0,6.12,5,12.33,12.33,0,0,0,7.64.87l.28.15c.21.11.39.22.55.32a20.6,20.6,0,0,0,3.75,1.89A23.22,23.22,0,0,0,106.7,565l.24.34c.11.36.27,1,.41,1.58a21.46,21.46,0,0,0-1,8.18c.43,4.59,3,7.75,5.52,10.8l.52.63a12.44,12.44,0,0,0,2.54,6.89,14.5,14.5,0,0,0,4.11,3.73,14.1,14.1,0,0,0-.83,1.24A47.07,47.07,0,0,1,115,602.9a53.73,53.73,0,0,0-6.52,10c-2.37,4.9-3.63,10.84-4.37,14.89-1.81,9.8,1,14.32,4.92,19.22l.27.34c.85,1.06,1.86,2.18,2.93,3.36l0,0c-3.63,3.59-8.75,9-9.69,18.29a24.38,24.38,0,0,0,5.19,17.51,75,75,0,0,0,5.78,5.64,12.48,12.48,0,0,0,5.37,2.67c.45.59,1,1.41,1.45,2,2,2.83,4.4,6.34,8.5,8.84,3.38,2,10.4,4.8,19.47.08a24.21,24.21,0,0,0,10-10.23c.32-.55.75-1.3,1-1.55,2.11-1.75,6.92-4.47,8.71-4.91a107.63,107.63,0,0,1,13.35-.49h2.81A68.13,68.13,0,0,1,196.57,690a14.92,14.92,0,0,0,8.48,1.33c.07,0,8.45-1.42,12.38-5.37l.38-.39a15.9,15.9,0,0,0,2.52.56,14.25,14.25,0,0,0,4.37-.12,17.58,17.58,0,0,0,.18,8,17.16,17.16,0,0,0,5.84,8.89,20.12,20.12,0,0,0,5.37,4.78,13.15,13.15,0,0,0,7.86,2.08c10.38-.57,15.12-12.1,15.78-17.59a14.42,14.42,0,0,0-4.48-12.62,14.65,14.65,0,0,0-10.16-7.26,19,19,0,0,0,7.59-7.7c2.42-4.77,1.54-9.51,1-12.34-.08-.41-.2-1-.22-1.24,0-.52,0-1-.07-1.54a27.09,27.09,0,0,0-2.27-10.94l-.17-.34c.78-.79,1.56-1.54,2.2-2.1a23.42,23.42,0,0,0,8.81-1.54,28.71,28.71,0,0,0,10.27-7.63c.3-.32.66-.71,1-1,.6.23,1.48.63,2.18,1a35.88,35.88,0,0,0,8.53,3,54.24,54.24,0,0,0,5.77.74c2.27.21,2.59.27,3.39.67,6.52,3.24,17.43,8.66,29,5.67a18.26,18.26,0,0,0,5.86-2.88l.85-.22a28.88,28.88,0,0,0,8-3.1c2.71-1.6,5.56-3,8.58-4.52l3.66-1.83,2.31-1.2c3.38-1.77,5-2.57,7.24-2.9.59-.09,1.41-.15,2.26-.21,4.42-.33,11.81-.87,17.55-7.39a22.94,22.94,0,0,0,4.24-8c.13-.36.3-.86.44-1.2.35-.4.76-.82,1.21-1.3s.79-.81,1.23-1.29a12.79,12.79,0,0,0,1.07,5.65,13.45,13.45,0,0,0,.43,1.69q-.08.75-.09,1.59c-2,4-4,9.46-3.5,14.68-.17.4-.26.67-.36,1a22.33,22.33,0,0,0-1.16,8.76,16.1,16.1,0,0,1,0,1.71c0,.52-.08,1.07-.12,1.61a35.48,35.48,0,0,0-.11,6.7,17,17,0,0,0,.5,2.57,12.64,12.64,0,0,0-.05,2,13.41,13.41,0,0,0,.22,4.82,13,13,0,0,0,2.32,4.86,12.68,12.68,0,0,0-2.13,3A12.49,12.49,0,0,0,383.88,675a68.84,68.84,0,0,1,2.24,6.68s0,.1.05.15c-.26,3.14.53,6.83,3.35,10.93a12.74,12.74,0,0,0,1,2.73,13.63,13.63,0,0,0,2,8,13,13,0,0,0,2.49,3,12.51,12.51,0,0,0,.29,10.84,14,14,0,0,0,2,2.88,18.9,18.9,0,0,0,4.69,4,12.55,12.55,0,0,0,5,1.74,13.19,13.19,0,0,0,2.8,0A12.6,12.6,0,0,0,417,736.49,14.74,14.74,0,0,0,430.53,740a13.68,13.68,0,0,0,3.65-1.42c.66,5.15,2.59,8.35,4.92,10.33a13.12,13.12,0,0,0,2,1.73c4,2.85,8.43,3.54,11.35,4l.94.15c3.64.61,6.53,2.18,11.24,5.26.7.46,1.37.86,2,1.24l.28.17a16.87,16.87,0,0,0,20.83,8.79,12.54,12.54,0,0,0,4.12,5.94,13.18,13.18,0,0,0-.18,1.82c0,.29,0,.62,0,1a12.71,12.71,0,0,0,.66,5.69,12.55,12.55,0,0,0,1.51,2.91,20.51,20.51,0,0,0,.4,6.7c.13.42.28.84.45,1.25a25.09,25.09,0,0,0,1.9,8.12c.17.4.31.82.46,1.23a24.22,24.22,0,0,0,5.38,9.32c.16,1,.32,2,.38,2.52a12.81,12.81,0,0,0,3.51,8.46,19.06,19.06,0,0,0,.74,2.52,17.8,17.8,0,0,0,0,3.61l0,.12s0,0,0,.08v0a12.41,12.41,0,0,0,1.69,8.35l.22.41a12.55,12.55,0,0,0,1.95,9.75c.2.37.39.73.59,1.07a12.75,12.75,0,0,0-.11,1.63,12.46,12.46,0,0,0,3.66,8.84c.32.31.64.61,1,.88,0,.13.07.27.1.39a14,14,0,0,0,5.22,11.84,12.75,12.75,0,0,0,7.82,2.66,13.38,13.38,0,0,0,8.31-2.93c.58-.38,2.16-1.16,3.22-1.69l1.41-.7a16.77,16.77,0,0,0,7.56.64A12.5,12.5,0,0,0,560.34,859a12.43,12.43,0,0,0,4.34-3.83l1.61-1.06a12.57,12.57,0,0,0,7.62-1.29,17.56,17.56,0,0,0,2.72-.62,20.41,20.41,0,0,0,8.43-4.5c.25-.22.56-.48,1-.8.88-.71,1.69-1.44,2.44-2.16a13.25,13.25,0,0,0,3.94-2,12.42,12.42,0,0,0,3.31-3.62l1.35-.71a41.26,41.26,0,0,0,8-5.06,17.69,17.69,0,0,0,4-5.41c.1-.19.23-.41.37-.66a13,13,0,0,0,2.13-1.52c.7.28,1.35.52,2,.72l.14.13a225.76,225.76,0,0,0,12.88,9.31,16.68,16.68,0,0,0,12.28-2.69l1.05-.21A42.33,42.33,0,0,0,644.3,832l.77-.23a20.4,20.4,0,0,0,8.29-4.17,15.08,15.08,0,0,0,4.74-8.45,12.4,12.4,0,0,0,2.29-6.1.07.07,0,0,0,0,0,22.32,22.32,0,0,0,.09-2.53,12.52,12.52,0,0,0,3.85-.52,32.91,32.91,0,0,0,8.29-3.12c.23-.11.46-.22.69-.35l0,0c2.54-1.42,4.73-2.86,6.85-4.25,1.65-1.07,3.21-2.09,4.73-3a85.52,85.52,0,0,0,8.68-5.87c3.87-2.88,6.19-4.53,8.81-5.06l.12,0a16.16,16.16,0,0,1,3.08,1c6.55,2.55,12.56,4.74,19.82,5.8a31.93,31.93,0,0,0,9.43-.43h.25c3.39-.14,7.6-.3,12.55-3.89a23.87,23.87,0,0,0,3.11-2.7c.88-.25,1.91-.54,2.86-.85a15.9,15.9,0,0,0,7.73-4.88,16.87,16.87,0,0,0,5.92,2.77c7.49,2.53,14.39-2.69,19.11-6.26l.1-.07c.19-.13.36-.23.51-.32a18.42,18.42,0,0,0,5.82-5.15,14.66,14.66,0,0,0,3.93-5.45,12.33,12.33,0,0,0,.73-2.48,12.59,12.59,0,0,0,6.57.81c.49.33,1,.67,1.59,1,2.31,1.36,5.45,3.33,7.47,4.68,1.71,1.14,7.13,4.24,11.57,4.81,2.1.27,4.94.23,10.13-2.08.7-.32,1.69-.76,2.77-1.38.36-.1.72-.22,1.08-.35l.09,0a60.8,60.8,0,0,0,9.85-13.62,25.21,25.21,0,0,0,4.06-5.43,22,22,0,0,0,1.95-5.78c0-.11.05-.23.08-.36s.31-.39.46-.6a11.74,11.74,0,0,0,1.59-1.83l.17-.24a15,15,0,0,0,2-4.72c.11-.36.23-.79.34-1.14l.09-.21c.27-.59.7-1.54,1-2s.89-.91,1.31-1.32c2.76-2.71,6.53-6.42,7.52-12.11.84-4.9-.74-9.19-1.79-12,0-.13-.1-.29-.16-.44a23.91,23.91,0,0,0,0-4.48,22.23,22.23,0,0,0-6.19-13c-.24-.27-.5-.56-.76-.87a41.31,41.31,0,0,0-6.78-6.31l-.38-.29a60.36,60.36,0,0,1,2.91-11.4,13.1,13.1,0,0,0,3-8.82,16.78,16.78,0,0,0-4.14-10.71,33.48,33.48,0,0,0-15.33-20.28c-1.07-.7-2.09-1.25-2.95-1.71l-.76-.41a12.14,12.14,0,0,0-1.44-.84l-.78-1.45a21.08,21.08,0,0,1-2.21-5c-2.48-10.59-9.13-13.45-13.53-14.32a15.68,15.68,0,0,0,.09-5.8,15.24,15.24,0,0,0-1.37-4.2,25.87,25.87,0,0,0,7.71-9.16c.31-.66.53-1.08.68-1.35a13.56,13.56,0,0,0,1.67-8.08l.62-.28a44.66,44.66,0,0,0,7.94-4.32,33.71,33.71,0,0,0,4.44-4c.54-.55,1.36-1.39,1.62-1.59,1.67-1.1,3.35-2.21,4.88-3.41a16,16,0,0,0,3.58,2.14,15.31,15.31,0,0,0,3.43,1c2.53,3.93,6.79,9.23,14.36,9.1,5.35-.1,9.1-3.1,14.56-9,4.2-4.51,6.41-7.58,7.4-10.55a15,15,0,0,0,3.55-5.75,14,14,0,0,0,.13-9.09c1.74-3.21,2.55-7.84.51-14.39a11.83,11.83,0,0,0-.4-1.32,12.54,12.54,0,0,0-1.59-16.9c-1-1.15-3.4-4-4.23-5l0,0,0,0-.07-.09-.84-1.19c-.42-.58-.66-.91-.82-1.17l.83-1.1a12.45,12.45,0,0,0,2.37-5.3c0-.26.1-.52.13-.78a13.07,13.07,0,0,0,4.47-2.72,12.45,12.45,0,0,0,4.29-7.05,16,16,0,0,0,7.4-10.8,12.84,12.84,0,0,0,.23-1.6c.88-.71,1.61-1.41,2.18-2,4.87-4.65,6.56-12.17,7-14.37a27.2,27.2,0,0,0-.58-9.4,15.24,15.24,0,0,0-.45-4c-2.2-8.83-10.8-12.69-19.11-16.42l-1.38-.62a13.43,13.43,0,0,0-8.93-15.77,15.67,15.67,0,0,0-1-11.57,14.74,14.74,0,0,0-1.63-2.63c5.44-4.45,7.51-9.84,6.18-16.06.88-.93,2.36-2.2,3.34-3a58.21,58.21,0,0,0,4.75-4.38,14.92,14.92,0,0,0,5.68-10.06,31.54,31.54,0,0,0,.43-3.16,45,45,0,0,0,5.65-6.45,36.82,36.82,0,0,0,2.4-3.65c4.1-7.27,1.37-13.52-2.21-16.68-.34-.29-.63-.59-.91-.87a27.57,27.57,0,0,0-3.42-3l.74-.68c1.66-1.56,3.37-3,5.17-4.57,1.56-1.35,3.19-2.74,4.8-4.21.18-.16.42-.35.67-.55C917.87,320.69,925.16,314.78,922.48,305.85ZM241.62,696.41l.72-.17C242.55,697.12,242.15,696.93,241.62,696.41Z"/>
                <path :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M612.92,532.52c.45,1.63-4.13,1.59-5.19,1.23C606,531.31,611.9,529.28,612.92,532.52ZM910.48,296c.1-.85-5.17-4.32-6.26-5-2.93-1.77-7.21-2.74-10.36-4.23-1.6-.76-5.34-1.82-5.81-3.77-.32-1.34,2.28-4.28,1.76-6.44-1-4.39-7.29-6.35-9.29-11.15-2.94-7.06-3.18-13.81-1.3-21.27.64-2.51,2.74-2.31,2.5-5.53-.22-3-4.59-3.79-5-4.84-2-4.82,3.48-10.63,1.61-16.17-1.42-4.23-7.37-6.84-9-10.58-.76-1.76-1.66-9.71-1.8-9.85-1.76-1.72-4.69-1.16-6.09-2-3.5-2.07-4-4.81-6.19-7.95-1.3-1.89-4.39-3.57-5.75-5.42-.85-1.16-1.87-3.88-2.69-4.63-2.23-2-6-3-8.57-5.18a23.56,23.56,0,0,1-5.58-6.63,11.83,11.83,0,0,1-.77-2.94c-2.41-2.08-3.2-.8-6.17-1-3.87-.27-8.57-.25-12-1.43-3.83-1.31-7.71-3.9-11.22-5.74-2.42-1.28-3.73-3.14-6.43-4-1.62-.5-3.47,0-5.13-.38a38.45,38.45,0,0,1-6.79-2.48c-2.82-1.81-1.21-2.28-3-4.41-3.93-4.74-4.06-2.35-9.52-2.55-1.89-.07-2.21-1.83-3.93-2.23-2.35-.55-4.91-.86-7.34-1.45-7.43-1.79-17.52.05-23.49-5.38-2.32-2.1-1.75-5.94-4.57-7.78.93.6-9.69.57-2.58-1.58,1.18-.36-3.84-.94-4.1-.93-3.05.16-5.93,2.77-9.36,2.89-5.75.22-10.26-3.25-15.38-5.53a24.81,24.81,0,0,0-13-2.4c.41,0-6,2-5.21.63.37-.58,2.49-1.38,2.47-2.36-.08-3.17-6.45-1.82-7.37-2-3.29-.48-1.63-3-5.22.07.13-.11,2.55,3.34,1.76,3.05,2.81,1.06-1.64,1.68-1.32,2.59-.83-2.38-3.44-6.94-6.34-7.44-4.27-.75-7.4.5-10.52.5-.61,0,.67-1.74.32-2-.76-.58-8.18,8-9.71,7.24a2.09,2.09,0,0,0-.44-1.33c-1.8.3-4.72,2.28-6.81,3-4.19,1.47-4,1-8.34,0-5.34-1.26-14.75,2-19.35,4-7.21,3.24-9.31,6.11-16.83,2.88a18.72,18.72,0,0,1-8.46-6.3c-3.1-3.63-4-3.85-8.51-2-3.22,1.34-8.15,5.53-11.8,4.74-2.29-.49-6.21-3.71-8.35-5.11-6.59-4.3-9.47-8-18.65-6.61a22.33,22.33,0,0,0-6.9,3.22c-2,1.46-3,4.08-4.75,6.79C526,122.24,520.72,130,517.32,130a1.42,1.42,0,0,1-.32-1.42c.1,1-2.61,2.9-3,4a17.13,17.13,0,0,1-1.11,1.43c-.48.86,1,2.22.74,2.43-3.25,2.75-7.24-6.54-9-4.18.57-.38,1.16-.74,1.75-1.09-.77-2.06.65-.64,2.64-2.25,0,0,2.25-2.28,2.65-2-4.56-3.06,4.4-3.46,5.6-4.69,0,0-3.41-4-3.62-4.11-2-1.21-5.13-1-7.5-2.4-3.24-2-4.48-4.16-6.57-7.21-.76-1.11-2.05-1.92-2.49-3.23-.29-.9.58-2.89.35-3.36a9.51,9.51,0,0,0-2.32-3.06c-2.51-1.92-9.79-2.14-13.19-2.75-4.71-.84-7.81-.24-10.48,4-2.95,4.71-5.39,13.12-11.84,14.56-2.46.55-5-1.43-7.46-1.56a53.93,53.93,0,0,1-7.24-.42c-3.73-.63-6.37-1.5-8.08,2.71-.57,1.38-.13,4.63-.59,6.36-.65,2.48-1.38,3.2-2.3,5.29a39.74,39.74,0,0,0-3.34,14.51c-.29,4-1.41,7.3.92,11.09,1.9,3.09,4.72,5.44,6.06,9.08,2.84,7.66-6.31,10.33-6.54,17.26,0,1.67,1.61,2.76,1.68,3.94.26,4.27-4.9,4.9-8.6,4.84-7.8-.11-15.26-3.93-22.33-4.7.12,0-1.3-1.83-2.37-1.57-1.51.35-3.7,5.83-4.69,6.84-1.13,1.16-4,4.17-5.37,4.5.2-.05-7.27,1.11-4.73-1.42-4.57,4.54-15.31-4-19.38,5.25-1.26,2.87.67,2.76-2,4.82-2.82,2.2-3.75.54-6.32.16-6.57-1-5.83-1.86-8-7.53s-20.29-15.12-11.61-20.57c.24-.15,2.16,2.13,3.1.45s-1.18-1.94-1-3.71c.11-.95.67-3.83,1.47-4.23,3.38-1.72,2.05,2.54,4.7,2.57,1.27,0,3.68-10.31,4.13-11.07,1.58-2.64,4.3-1.26,1.83-4.77-1.57-2.23-3.19-1.13-5-1.82a25.45,25.45,0,0,1-7.25-3.79c-.95-.7-5-2.82-5.33-3.48-1-1.71,1.49-6.08,1.18-6.4-1.72-1.93-3.82-2.71-3.11-4.87,1.66-5,3.95,2.42,5.32,1.12.49-.47.09-9.3-.4-9.93a1.77,1.77,0,0,0-.9.41c-.32-.27.66-3.56.34-3.59,3.23.29-.66-3.9-3.26-1.92a1.5,1.5,0,0,1,.15,1.36c-1.7.33-3.58.17-5.81,1.63-3.25,2.13-4.14,3.39-8,3.38-4.7,0-8.34-3.31-12.87-3.77-2.48-.26-4.36,0-6.3-1-1.37-.68-2-4.27-3.93-4.34-1.71-.06-4.06,3.65-5.07,4.47-3.62,3-3.15,1.79-3,4.85a9.31,9.31,0,0,1,1.8.73c-.09,1.15-.19,2.31-.29,3.46a30.29,30.29,0,0,0,1.54,3.85,1.87,1.87,0,0,0,.3,2.7,1.82,1.82,0,0,1,2.07.1c.4,4.64,1.11-.63,0,2.1a71.61,71.61,0,0,1-6.66,5.08c-2.64.16-6.4-5.29-8.33-7.26a48.33,48.33,0,0,0-3.73-3.28c-2.37-1.91-1.91-.59-3.75-2.88-2.65-3.31-1-5.87-7.15-6.79-4.61-.69-5.49,1.21-7.19,4.64-.52,1.07-.07,6-3.43,4.93,3.21,1.07,2,4.82,1.88,8.7-.05,1.44-1,2.43-.83,3.91s1.88,1.85,2.11,3c1.31,6.28-.92,5.52-2.89,10.89-2.29,6.25,4.74,8.86,8.46,13.8,3.08,4.07,6.75,13.3-.34,16.44-2.94,1.3-6.34-1.74-9.48-.74-2.51.8-3,3.74-5.68,4.07-5.69.71-6.81-9.84-13.06-7.17-2,.83-5.18,3.28-6.94,4.32a35.5,35.5,0,0,0-6.94,5.37c-2.77,2.71-5.3,5.66-8.3,8.13s-5.39,2-8.12,3.64c-5.51,3.41-4.55,9.91-2.54,14.88,1.47,3.62,3,5,3.69,9,.07.4,1.28,1.74,1.32,2.24.11,1.23-1.17,2.61-.93,3.61.79,3.32,2.56,3.49,4.44,6.15.54.76,1,3.17,1.32,3.53,1.2,1.28,2.7.57,4.12,1.83,1,.91,3.12,3.83,4.42,4.05,3.45.59,4.23-4.07,8.33-.59,1.52,1.29,1.07,2.74,1.91,4.12,2.45,4,6.51,6.34,9.17,10.09,3,4.19,8.86,12.21,7.38,17.33-1.66,5.74-6.62,5.91-10.89,3-1.68-1.13-2.4-4.59-5.46-4.21-2.44.3-5.12,4.67-6.65,6.38-4.88,5.47-5.83,11-13.35,11.14-8.15.18-13.9-4.62-20-9.31-3.06-2.34-6.45-4-9.17-6.75-2.17-2.2-3.93-6.58-6.25-8.41a15.84,15.84,0,0,0-5.47-2.07c.3.05-.87-1.08-1.12-1.18-1.24-.52-1.1,1.93-2.55,1.31,0,0-.66-2.59-1.87-2.67s-2.21,1.79-2.78,1.75c-4.35-.28-5.93-5.21-10.41-7-2.31-.92-4.37-.32-6.46-1-1.8-.59-1.36-3.51-4.29-2.6s-1.77,5.92-4.26,7.86c-.69.54-3.35-8.25-3.69-9a31.11,31.11,0,0,0-6.47-9.24c-2.7-2.49-7.58-4.17-11.13-2.84-2,.77-3.2,3.56-4.87,4.68-2.85,1.89-3.79,1.73-7.41,1.06s-7.81-4.29-10.36-1.63c-3.35,3.5,2.39,4.36-1.33,7.37-1.65,1.34-4.85-.29-6.57,1.1-1.35,1.1-1.56,3.71-2,5.31-1,4.11-.52,6.11,1.58,9.93,2.23,4,2.37,3.68,1.39,7.76-.91,3.79-1.75,4.62.29,7.68.24.36,2.9.93,3.4,1.38s.6,1.56,1,2.17c.92,1.28,1.5,4,2.27,4.92,2.5,2.92,8.41,3.13,9.47,6.6.33,1.09-1.36,1.73-1.27,2.6s.74,2.26.84,3.05c.35,2.8,2,5.75,3.35,8.39,2.42,4.75,5.21,8.92,7.3,13.89,1.75,4.16,5.05,8.61,6.16,12.93,1.2,4.66-.8,4.14-3.15,7.22-2.52,3.31-4.82,6.94-3.64,10.55.39,1.21,2.19,2.3,2.37,3.15.25,1.11-.75,3.38-.67,3.68.28,1.06.6,2.23.86,3.27,0-.17,1.74-.75,2,.25.79,2.59-5.87,7.33-6,6.65-.4-1.88,3.18-3.49,3.11-5-.12-2.56-10-1.92-11.64-1.31s-3.27,1.3-3.93,2.9c-.93,2.25.73-.17,1.41,2.07.38,1.26-4.68,4.64-3.69,8.17.19.65,2.89,3.2,3.27,3.6a26.11,26.11,0,0,0-2,3c.14.33,2.42-.08,2.22,1-.1.6-1.12.61-1.06,1.31.34,3.91-2.14,2.57,1.35,5.71.14.13,4.36,3.27,4.17,3.24,1.24.16,5.29-1.52,5.18-2.26.4,2.71-2.87,4.6-3.43,6-2.18,5.3.09,5.73,4.14,8.2,3.09,1.88,6.92,5.27,9.85,6.38a9.27,9.27,0,0,0,2.65,1c.58.06,2-1.7,1.84-1.77,7,2.42,4.85,6.84,5.24,14.12.1,1.91-.19,8.9.73,9.89,2.8,3,5-1.39,7.53-1.39.54,0-1-1.52-1-1.5a8.23,8.23,0,0,0,1.9-1c4.2,7.26,9.82,11.05,3.48,18.9-2.48,3.06-4.93,6.18-5.05,11.1,0,1.52,3.68,10.45,3.27,10.47-5.22.18-1.57,5.87-2.54,9.47-1.17,4.37-6.22,9.05-9.62,13-3,3.48-4,3.4-8,5.47-.18.1-2.41,2.35-2,2.33-1.5.07-1.17-.26-2.59-.69-.47-.14-1.23-2.09-1.93-2.26-2.12-.51-1.3.57-2.92.75-.89.09-2,1.3-2.93,1.58-1.13.33-3.11-.6-4.35-.4-2.3.37-2.65,0-4.58,1.45-3.16,2.45-6.39,12-7.29,16.3-.81,3.89-2,7.93,0,9.82,1.72,1.64,3.58.33,5.63,1.72s1,3.6,3.24,4.62c-.65-.3,4.15-1,4.76-.91,3.48.65,1.49,1,3.69,2.18s3,2.4,6,1.59c2.12-.58,4.2-3.36,5.67-2.87,3.5,1.16-1.36,3.52-1.92,4.9-1.57,3.87.65,3.79,2.16,7.76a35,35,0,0,1,1.38,5.84c.17,2.07-1.46,5-1.25,7.17.12,1.28,3.85,5.11,4.5,6.35s1.78,1.67,2.39,2.84a7.78,7.78,0,0,0-.77,2.77c1.54,2,5.42-.07,6.8,1.77.93,1.24,0,5.64.25,7.16.35,2,2.06,1.93,1.46,4.36-.17.68-4,4.8-4.51,5.67-2.95,4.88-6.72,8.29-9.21,13.44A49.88,49.88,0,0,0,116.35,630c-.95,5.17-.11,6,2.69,9.53,1.87,2.35,6.55,6.87,7.62,9.45,1.26,3.06,1.08,2.66-1,5.49-4,5.55-9.94,8.06-10.72,15.78a11.84,11.84,0,0,0,2.58,8.55c.24.3,3.66,3.5,4,3.82,9.74.67,9.81,17.83,20.92,12,4.58-2.39,4.68-6.91,8.58-10.2,3-2.55,10.35-7,14.73-7.73,5-.81,13-.64,18.19-.66a82.77,82.77,0,0,1,16.3,1.89c1.84.37,1.22,1.14,3.36.91a43.46,43.46,0,0,0,4.92-1.79c3.07-3.06-1.13-4,1.79-6.54-2.45,2.14,6.3.32,3.84,0,1.44.19,2.75.06,4.24.36s1.17,2.47,3.59,2.81c1.06.15,5.86-2.08,6.88-2.92,2.07-1.7,2.36-4.2,4.33-6.08s6.84-3,8.27-5.79c.76-1.5-.33-4.53-.52-7-.22-2.89,0-5.51-1.21-8.14-2.16-4.63-6.12-4.34-1.34-10.39,2-2.52,7.1-7.91,9.8-9.14s6.11-.16,9-1.33c6.41-2.6,7.6-10.53,16.67-9.68,4.44.41,8,3.42,12.34,4.25,5,1,7.81.22,12.39,2.49,6.39,3.18,13.55,6.51,20.27,4.77,1-.27,2.47-1.61,3.51-2.08,2.56-1.14,5.16-1.12,8-2.78,4.24-2.51,8.53-4.49,12.93-6.73,4.74-2.41,8.08-4.55,13.41-5.33,4.38-.64,9.14,0,12.23-3.49,1.6-1.81,2.07-6,3.92-8.31,3-3.8,6.85-5.86,6.69-11.29-.09-2.76-6.83-16.71-3.45-18.77a.89.89,0,0,1-1,.44c-.86-1.35,1.66-1.14,1.66-1.47,0-.65-4.6-6.49.77-4-.72-.32-1.33,3.1.73,2.65.47-.32.34-.6-.41-.82,1.25.86,1.63-.69,2.28,1.37.17.53-.1,3.43.24,4.43.39,1.18,2.94,4.49,3.95,5.58,2.57,2.74,4,3.51,5.38,6.63.25.55,1.51.54,1.75,1,.53,1-1.37.87-.72,1.73.95,1.25,2.37,1.27,3,2.17.07.89-.48,1.4-1.64,1.52.46-.65,2.25,2.83,2.32,2.86,1.66.6.35-2.24.41-2.26,2.22-.74.17,3.93,3.59,4.11.09,0-.86-2-.28-1.73a49.38,49.38,0,0,1,2.42,5.63c-.05,1.08-4,4.91-2,6.34.84.64-.67,2.65,1.4,2.53,1-.09-1,5.13-.54,5.52a1.41,1.41,0,0,0,.66-.92,17.45,17.45,0,0,0,.19,2.84c-1-.47-7.32,13.13-2.94,12.37-.09,0-2.28,4.43-2.4,4.81-1,3-.38,3.63-.53,7.13a47.94,47.94,0,0,0-.28,6.5c.06.63,1.53,4.8.49,5.16.24-.09,1.56-1.16,1.83-.52-.4-1-3.16,3.69-1.36,3.4a3.07,3.07,0,0,1,1.15-.77c0,.61-.25,2,.6,2.21s.59-1.8,1.36-1c1.74,1.78-1.87,17.16-4.55,15.78,1.6.82,4.52,11.14,4.53,11.14a1.2,1.2,0,0,1,1.51-.32c1,.9-1.57,1.8.15,2.75.89.49,2.32-.55,2-1,.61.86,1.78,2,2.88.52-.76,1-1,.76.15,1.49.15.09-6.21.61-5.82,0-1.89,3.13,3.87,5.77,2.64,8.15.2-.39,0-1.91.64-1.81,1.94.33-1.95,4.7,2.21,3,.67-.27.06,3.56-.1,3.37a1,1,0,0,0-.89-.92c-1.7,5.59.73,2.4,3.49,5,1.1,1.06.7,5.88,3.28,6-2.22-.09-1.61,1.2-2.64,3,.53-.93-.13,6.11-1.27,3.91a6.79,6.79,0,0,0,2.06,2c.34,0,2.5-1.8,3.67-.45q-.94-.3-.9-1.11c1-.07,4.31,1.94,4.06,2.72-.09.27-.36-2,.07-1.47,1.19,1.44.82,1.89,2.78,3,1,.58,3.82,1,4.33,1.62.77,1-.66,7.15-.18,7.31a26.34,26.34,0,0,0,3.28.37c-1.13-.23-.61,2.93,2.14,2.29.92-.21,2.42-2.28,3.34-2.85a19.78,19.78,0,0,1,4.06-1.78,43.49,43.49,0,0,1,4.44-1.37c.77.16.24,1.82,1,2.38a21.38,21.38,0,0,0,2.16,2.9c.9.83,3.56.46,4.41,1a4.62,4.62,0,0,1-1,1.71c0,.8,1.91.37,1.75,1.91-.05.54-1.4,1.6-1.39,1.32,0,.3.09,8.08,1.14,5.93.24-.51-.4-1-.26-1.53.54-1.92,1.41,3.33.95,3,1.88,1.33,4.6,1.59,7.11,2,6.18,1,10.8,3.72,16,7.13,1.92,1.26,3.53,1.89,5.07,3.63s1.6,4,3.63,5c4.68,2.2,6.39-3.12,8-5.81.27-.44,2.4,4.32,2.87,4.67,1.54,1.15,3-.85,4.15,0a1.56,1.56,0,0,0,.23,1.32c.55.49,5.4,8,4.22,8,2.5-.07,3.34,3.09,5.27,6.06.34.52,2.83,2.26,2.73,3.17-.17,1.67-5.81,2-2.35,4-.44-.24-1.25.79-1.2.79.46,0,1.72-.75,2.1,0-.17.41-.33.83-.48,1.25.12-1.3,2.94,4.68,4.17,2.57-.14.24.05,1.1.48.93-1.25.5-2.94-.25-3.64.91a28.59,28.59,0,0,0-.48,4.68c.42.21,1.31-1.3,1.28-1.37.33.72-.5,3.25-.42,4.3a14,14,0,0,0,1,5.19c1.33,3.2,1.86,7,5.77,7.9-.17,0,1.46,8.2,1.41,9.59,0,.95,1.78-.91,1.48-1,.31.47.18.92-.4,1.36a7.8,7.8,0,0,0,1.65,0s.07,8.12,1.43,7.24c-.43.28,1.48,1.46.44,3.78-1,1.93.07,2.21-.46,5.75,0-.18,1.42,3.22,2.4,2.9-.37.12-.21,6.52-.63,6.63.75-.19.84-.92,1.59,0,.08.09-1.4,0-1,.91.9,2,4.47,6.62,2.13,9,1-1,2.62,2.07,3.75,1.44-1,.47,1.13,7.35,1.14,7.69,0-.15-.64,4,.94,2.75,2.06-1.69,6.68-3.52,9.45-5.21,1-.61.2-1.24,1.54-1.55,2.35-.54-.08.3,1.52.52,1.3.17,3.13,2.28,5.65,1.92a16.28,16.28,0,0,1-2.84-1.3s8.13-13.46,9.39-11.09c-.58-.06-1.17-.11-1.75-.14.58.24,9.88-6.71,9.86-5.75,0-.43-.78-2.4-.52-2.38,2.15.17,3.41.76,4.91,0,.71-.35,1,2.32,1.2,2,1.42-1.79,2.91-.87,4.68-1.43,3.25-1,2.84-1.11,5.34-3.13,1.55-1.24,3.09-2.94,4.56-4.31.22-.2,1.68.26,2.24-.15.34-.25-.07-1.54,1-2.26,3.51-2.46,8.35-4.29,10.95-6.54.71-.61,5.06-10.35,6.36-7.49-.64-1.4,3.64-6.68,3.82-6.21a1.81,1.81,0,0,1,0-1.8c.71.21.57,2,1.54,2.43,1.71.78,3.44,1.47,5.19,2.28a30.72,30.72,0,0,0,3.69,1.53c1,.25,2.9-.63,4,.11s.24,2.36.58,2.68c.82.75,2.14,1.07,3,2.18,1.17,1.44,1.65,3.66,3.7,4s3.76-1.51,4.82-1.91c2.21-.85,4.48-1,7-1.73,3.71-1.14,5.74-1.42,5.17-5.13a.88.88,0,0,1-1.09.27c-.48-1.59,1-.41,1.65-1.35-.89,1.35,1.81-4.11,1.6-2,.29-3-.89-2.47-1.26-5.13,0,.34,1.59-8.55-.47-8.46-.73,0-.86,1.38-1.14-.2s8.62-10.78,9.49-9.62c1.69,2.28,2.6,2.75,4.09,4.79.77,1.06.42,4.28,2.13,4.74a1.23,1.23,0,0,0,.42-1c-1.49,2.52,6.35-1.57,6-1.39,4.11-2.3,7.57-4.92,11.49-7.17,7.84-4.5,12.78-10.63,21.22-12.34,3.67-.75,6.46.13,10.22,1.59,5.64,2.19,11,4.19,17.1,5.08,2,.3,6.1-.51,6.44-.52,3.35-.15,4.55,0,6.64-1.56s2.35-2.9,5.22-4.08c.46-.19,7-1.84,5.86-2.12a.85.85,0,0,1-.86,0c.11.32,1.73-3,1.39-2.83-2.76,1.34-3-5.19-2.51-6.51,1.24-3.23-.13-.75,3.07-2.77.88-.56,2.89-2.24,3.6-2.31,3.78-.36,2.57,2.2,5.33,3.2.78.28,3.36-1.52,4-1.17a15.21,15.21,0,0,0,1.59,1.55,1.5,1.5,0,0,0-1.23,1.2c1.05,1.17,1.14-.9,1.14,1.52,0,.88-3,.26-.24,4,.79,1.09,4,3.77,4.11,2.06-.3,3.13,7.87-3.37,8.47-3.78,2-1.42,3.26-1.55,4.33-4.29-.11.28,1.27-.31,1.61-1.15s-2-.52-1.63-.94c2.66-3.09,1.86-3.42,3.15-6.95.54-1.45,2.33-3.85,4.13-4.49,3.09-1.09.18,1.56,2.43,1.85,1.86.24,5-.32,4.57-2.22-.15-.67,4.91,3.11,4.43,3.41,4.86-3.08,5.14-.11,9.75,2.62,2.58,1.53,5.94,3.63,8,5a22.27,22.27,0,0,0,6.22,2.81c1.06.13,7.77-2.71,6.22-3.41,1.17.53.42.79,1.91.25-1.35.5,1.28-5.61,2.56-6.44-1.28.83,1-2.23,1-2.31,1.23-1.59,2.67-2.67,3.68-4.53.78-1.44,1.42-8.22,3.34-8.1-1.67-.16,1.8-2.12,1.56-1.78.1-.15.8-2.87,1.14-3.61a30.42,30.42,0,0,1,2.43-4.67c1.76-2.53,6.23-5.57,6.7-8.31s-2-6.73-2.24-9.19a41.83,41.83,0,0,0,.17-4.25c-.38-3.5-2.13-4.87-4.11-7.24-4.83-5.77-10.56-6.18-10.16-14,.24-4.8,2-10.95,3.66-16,.19-.59-.36-2.16-.2-3,.26-1.38,2.57,0,2.53-1.4-.11-3.64-3.36-3.92-4.56-6.83-.82-2,1.13-5.33.29-7-1.19-2.4-5.82-1.72-6.5-2.73a5.81,5.81,0,0,0,.54-1.73,2.93,2.93,0,0,0-2.54-1.73c-1.18-1.2-3.52-2.12-4.88-3-.34-.23-2.07-.26-2.72-.76.5.38-2.26-3.54-2.23-3.47-1.66-3.38-3.69-6.33-4.69-10.59-1.69-7.21-4.81-3.83-10.15-6.12-3.88-1.65-5.18-6.32-4.82-9.66.18-1.71,1.71-3.19,1.38-5.1s-3.09-3.41-3.62-5.2c-.89-3,.89-5.06,2.68-7.2,2.68-3.2,6.41-4.52,8.34-8.5,2.05-4.24,1-.8.31-5.22-1.31-8.53,8.71-9.31,14.56-13.52,2-1.46,4.06-4.26,6.48-5.86.09-.06,5.63-3.74,5.23-3.81-2-.34,2.25-4.67,4-5,3.51-.66,6.05,2.09,7.46,3.27,1.24,1,2.24,2.66,3.58,3.24s3.88-.29,5.28.56c2.09,1.26,4.62,8.58,7.31,8.53,1.35,0,10.24-9.56,10.36-11.15.25-3.31-2.84-2.31-1.29-5.24.78-1.47,1.91-.23,2.62-.38,1.58-.34,1.41,2.21,2.27-.21.48-1.35-.87-2.27-1.29-3.92-1.15-4.57-2-5.13,1.48-6.25,2.25-.81,0-6,.09-6.11-2.59,2.18-3.93-7.28-2.92-9.12a9.7,9.7,0,0,0,2.16-.11c.45-.11-1.47-.55-1-.27a3.56,3.56,0,0,1,.92-.67.85.85,0,0,1-.9-.45,20.26,20.26,0,0,0,3.54-1.29,94,94,0,0,1-6.12-7.17c-1.94-2.77-2.81-3.64-3.86-6.87-.69-2.12-1.18-2.38-1-4.61.17-1.72.17-.44.82-2a48.45,48.45,0,0,1,3.4-4.91c.56-3-1.45-3,1.6-6.36.88-1,5.8-4.76,6.72-4,.15.11-1.71.44-1.14,0a3.21,3.21,0,0,0,1.77-.57c-2-2-4.39-2.63-4-5.23.62-4.16,4.19-1.18,7.06-4.56-1.28,1.5,3.35,3.88,4.33-.94,0,0-1.25-8.45,0-7.86-1-.46-2.91-2,.48-2.3,4.51-.38.92,4.51,5.51.11,1.63-1.56,2.9-5.37,3.3-7.59.12-.65-.51-6.86-1.5-5.59,5.36-6.9-20.79-11.89-22-17.3a1.2,1.2,0,0,1,1.09-.44c.67-.31-1.35-1.56-1.37-1.78,0,.18,5.48-9.33-.36-6.42-1.72.85-3.32,8-5.08,1.3.09.33-2,2.76-2,3.35,0,1.62,2.16,4,3.26,5.08s6.16.16,3.78,3c-.58.71-5.77.07-6.64.59-1.91,1.15-4.28,8.72-6.29,9.2-3.37.8-6.22-7.16-9.16-7.16-.37,0,3.49-4.57,3.23-4.77-1.48-1.13-5.12,0-6.48-.56-2.57-1,.46-.62-1.22-2.44.31.33-3.33-.08-2.57-1.38s4.25-1.7,5.5-1.81a14.36,14.36,0,0,1,3.41,1.12c.54-.09,1.68-1.56,1.21-1.61.91.09,1.68-.88,2.67-1s-.25,3,2.42,2.14c4-1.27,2.18-2.54-.72-4.06-2.38-1.25-5.35.57-5.7-3-.07-.71,2.31-4.91,2.51-5.33.42-.9-1.59-1.13-.24-2.68a16.8,16.8,0,0,1,2.6-1.15c1.25-.74,7.93-1.51,8.37-2.46.86-1.85,1.89-2.86.86-5-.91-1.88-4-.53-6.83-2.32-1.92-1.23-4.51-3.74-4.27-5.06a71.08,71.08,0,0,0,4-6.38c-.71.63,3.9-1.2,4-1.24a18.68,18.68,0,0,0,4-2.13c5.19-3.7,1.52-3.94,2.16-8.81.83-6.39,8.53-10.43,12.21-14.7,1.22-1.41,1.52-.25,2-3,.64-3.8.53-3.37-2.12-3.25-2.2.1-1.56,2.94-4.69,1.57a5.06,5.06,0,0,1-2.43-5.31c1.68-5.7,7-2.62,4-10-1.07-2.69-2.15-2.51-2.67-5.23-.48-2.57.48-4.37.9-6.76-.06.36.24-3.18.19-3.07,1.53-3.41,2.11-1.94,4-2.93a35.57,35.57,0,0,0,9.23-6.55c3.4-3.17,6.75-5.84,10.16-8.94,1.63-1.49,7.61-5.56,3.26-5.76-1.11-.05,1-4.59,1.19-4.94A62.52,62.52,0,0,1,910.48,296ZM794.6,693.35c-1,.34-3.13,5.2-3.57,6.38.15-.41-.72.37-.75,2.53,0,1-4.6-2.82-5.2-3.25-1.58-1.15-2,.57-3.72-.18,1.79.79-1.23-2.46-.87-2-1.36-1.78-1.89-5.39-4.85-7.43-2.77-1.9-7.92-.31-10.15-2.34-4.23-3.87,6.81-15.46,13.27-11.6,1.47.89,2.08,4,3.65,5.1,1,.65,3.25.07,4.51,1.25,2.19,2.07,1.81,4.65-.53,3,.38,2.71,4.86,1.17,5.25,1.84S795.14,693.18,794.6,693.35ZM705,625.4c-2.61,1.31-5.42,4.17-8.69,3.75-.56-.07-8.34-4.26-8.48-2.41,0-.35-1.16-3.2-1.75-2.59,2.81-2.73,7.64-10,13.42-7.45.43.2-1.1.45-.58.75,2,1,3.36,1.13,4.88,3.56C704.46,622,707.2,624.31,705,625.4ZM634,518.13c-.16.79-2.6,1.28-2.8,2.44-.39,2.23,5,2.51.85,3.17-2.28.37.78,11,2.82,11.36-4.24-.82-5.56,5.46-6,8.06-.41,2.79,1.08,7.43-.14,10-.61,1.27-3.81,2-3.65,4-.23-2.82,2.63,2.19,1.07,1.44,3.44,1.79,2.21,5.66.83,8.85-.78,1.81-.42,2.68-1.16,3.5-1.27,1.41-3.55,2.4-5.24,3.94-3.07,2.8-4.83,6.86-9.23,5.61-2.36-.68-2.09-1.14-3.94-1.85-1.12-.44.66-1-.37-1.49-2-1-1.29,1-1.19,1-2.49,0-4.64-2.28-5.91-4.06-2.37-3.31-1.41-3.55-.35-6.3.57-1.5,5.38-7.26.67-7.73-.93-.09.5,3.44-1.86,2.71-.94-.29-2-2.45-1.92-3.77.21-2.48,4-5,1.47-6.94-1.14-.87-3.2.33-3.44.12-1.35-1.17-.27-1-1.39-4-1.22-3.22-4.25-4.85-5.45-8.41-2.66-7.88,5.78-11.25,5-18.44-.09-.85-2.41-1.88-2.66-2.49a26.12,26.12,0,0,1-.59-3.71c-.24-1.18-1.6-6.12-1.51-6.73.59-4.34,5.38-7.53,7.74-10.85.38-.52-1.56-.85-1.2-2.09a13.54,13.54,0,0,1,1.6-3.54c2.11-1.92,5.27-.42,6.34-1.43,2.2-2.35,4.4-6.73,8.3-2,2.21,2.66,1.32,9,3.12,12,3.17,5.31,8.83,5.42,13.1,8,2.92,1.75,5.7,8.61,8.1,9.67C634.62,517.75,634.26,517.73,634,518.13ZM603.1,379.61c-.21.35-5.29,5.17-4.84,2.06.12-.85,2.58-4.65,2.58-4.57-.06-6.13-4.66-.53-4.73-.64-1.66-2.83-1.43-7.14-3.67-9.84-.92-1.12-2.19-.45-2.93-1.06s-.36-2.29-.72-2.52c-1.64-1.06-2.91-.72-4.48-2-1.22-1,.25-2.35-1.42-3.23-1.33-.7-4.17.38-3.54.75-1.73-1-.34-1.77-1.51-2.67,1,.74-1.16-2.67-1-2.06a22.44,22.44,0,0,1-2.38-.55c1.57,1.74,1.11-4.12,1.08-4.31a12.72,12.72,0,0,0-2.57-4.87c1,.8-5.27-.36-5-.41-.74.13.12,2.22-.67,2.43-1.27.34-2.83.45-4.25.68.26,0,2.47-4.2,2-4.59-1.9-1.52-4.62,1.94-5.78,2.3a21,21,0,0,1-7.69.61c-1-.06-1.22-1.44-2.5-1.33-.47,0-2.65,1.49-3.12,1.49-.11,0-1.62.25-1.82.25-.84,0-2.09-1.48-2.74-1.48-1.9,0-4.42,3.62-6,2-2.86-2.93,3.58-4.66,4.69-5,2.75-.92,2.75-.34,5.08-.44,1.15-.05,5.34.07,5.9-.07,2.57-.66,3.77-2.7,6.13-3.34,3-.79,3.8.79,6.63.65,3.23-.17,1.35-2.67,5.62-1.24,2.26.75,1.3,2.12,4.26,2.72,2.29.46,7.61-2.82,9,2.22.62,2.24-2.4,3.24-2.26,5.45.19,3,2.7,3.68,3.15,6.62-.44-2.82,5.77,0,6.69.15,3.72.67,4-.07,6.48,3.09,1.39,1.8,1.49,3.06,2.15,5.15.78,2.43,2.32,4.14,3.11,6.27C603.21,371.29,604.86,376.67,603.1,379.61Zm-112.28-3.07c-1.07-1.39-1.85,6.37-1.75,6.22-1.09,1.74-3.7,2.4-5,4.46-1.73,2.67-1.14,4.06-2,7.49-.58,2.17-1.78,1.9-2.41,2.86.23-.34-.09,4-.15,4.25-.71,3.06,0,1.82-1.93,4.09-1.37,1.57-12.19,5-12.29,5.32,1.06-3.85-7.15-2.86-10.65-3.74-1.69-.42-7.31-2.88-8.69-2.67-1.89.29-5.94,5.55-6.29,5.5,3.11.42,2.53,1.93-.08,1.36-.28-.06-.72,2.61-.26,3.14,1.59,1.82,2.76-.13,3.76.54s4.49,2.76,3.71,4.5c-.55,1.24-9,.48-8.69,3.74-.64-7.07-4-4.61-5.91-.19-1.54,3.49-4,5.94-5.75,9.72-1.86,4-1.63,6.49-4.59,9.82-3.19,3.61-4.9,4.88-9.1,5.31-5.49.57-6.86,0-8.8-3.33-1.67-2.89-1.93-5.23-3.89-8-.22-.3-3.26-3.5-3.52-3.62-2.28-1-2.84,7.24-2.86,7.39-.21,1.55-4-3.17-4-3.16,2.59,3.08.22-3.25.36-2.54a17.86,17.86,0,0,0-4.34-8.31c-1.94-1.8-6.47-2.29-8.54-4.35-1.76-1.76-3.36-5.5-5.92-6.42-3.65-1.31-7.84,5.47-9.95-.2-.28-.76,2-5.4,2.19-6.44a22.72,22.72,0,0,0,.12-4.56c0,.31-5-1.88-3.23-5.11.32-.6,5.3-2.11,6.34-2.52a1.41,1.41,0,0,0,1.9,0c1.12-.84,1.63-2.34,2.61-3.39,2.16-2.33,3.76-3.18,5.49-5.33-.82,1-3-3.7-3-4.1-.25-1.79,1.34-2.89.69-5-.46-1.53-2.88-1-3.19-2.42-.35-1.63,1.48-3.88,2.58-5.09,1.75-1.91,2.87-2.33,4.11-4.17.42-.63-.28-2.57.18-3.57s2-1.38,2.51-2.57c1.42-3.32-.2-3.64,3.12-6a23.34,23.34,0,0,1,7.55-3A1.47,1.47,0,0,1,391,354c.4.82,6.17.54,7,.6,2.92.22,1.42-2.44,4.5.35.27.24-.82,1-.86,1s10.2.6,9.19,1.39c.81-.64,1.58-2.26,3.26-3.08s3.87.18,5.92-1c3.93-2.24,3.65-5.82,9.1-5.77,2.74,0,4.14.87,6.12,3.6.85,1.17,2.48,8.94,4.77,3.78.74-1.68,1.12,8.72.24,7.85,1.87,1.85,5.31-1.45,7.18-.17.81.55-.65,2.45,1.61,3.17a3.06,3.06,0,0,0,.82-1.7.86.86,0,0,1,.24,1.12c-.19-.61.92-1.65,1.52-1.61-2-.11,2.17-3.81,3.31-4.06,0,0,2.77,3.21,2.84,3.3.8,1.06.84,2.22,1.38,2.9,1.3,1.63,4.73,3,6.27,4.84a46.62,46.62,0,0,1,2.82,4.24,1.21,1.21,0,0,1-.83.9c-.13.88,2.59-.33,2.05-.7,2,1.39,5.35-4.63,3.51-6.9,0,0-3.18,3-4.09,2.32-1.54-1.24,1.81-3.6,3-4,1.54-.52,1.72.41,3.15.69a17,17,0,0,1,2.84.18c1.21.51,3.17.85,4.41,2s.76,3.25,2.41,4.26,2.37-1,3.43-.64C490.14,373.41,489.85,375.26,490.82,376.54Zm408.6-30c.6.52-8,12.77-11.62,10.59.06,0-1.22-3.46-.49-3.77,1.78-.76,3,.21,3.23-2.82.05-.52-4.34-3.77-3.7-5.2a46.26,46.26,0,0,1,5.35-2.82C895.71,342,896.88,344.28,899.42,346.51ZM246.55,688.69c3,.91-3.16,12-4.21,7.55.49,2.08-2.4-1.83-2.41-1.83-1.23-1.24-2.54-1.94-3-3.51a5.13,5.13,0,0,1,4-6.32C245.52,683.92,244.25,687.93,246.55,688.69Z"/>
                <path :class="getBoundsClass('off-tropic')" :style="getBoundsStyle('off-tropic')" @mouseover="hoverOn('off-tropic')" @mouseout="hoverOff('off-tropic')" d="M836.91,847a14,14,0,0,0-6-11.83c4.53-4,6.57-9.65,5.36-15A13.65,13.65,0,0,0,821,809.57c-7.23,1-14.93,8-14.43,16.68a14.17,14.17,0,0,0,3.94,9.08c-3.85,2.23-8.27,5-10.1,7.9a12.51,12.51,0,0,0-8.65-11.05l-.13,0c-1-.41-2.53-1-4.07-1.52-9.35-3-14.24,1.77-16.09,4.3a12.59,12.59,0,0,0-3.28,5.14h0a.14.14,0,0,1,0,.06,16.42,16.42,0,0,0-.38,8.41A12.51,12.51,0,0,0,785,861.35h0a19.1,19.1,0,0,0,7.18-3.17l.5-.37a18.25,18.25,0,0,0,6.42-7.25c.33,5.12,2.45,11.06,5.65,14.46a17,17,0,0,0,10,5.07,12.49,12.49,0,0,0,13,.45,12.36,12.36,0,0,0,3.15-2.51C843.08,859.08,838.64,849.76,836.91,847Zm-3.21,9.5a11.54,11.54,0,0,1,.37,2.27A13.6,13.6,0,0,0,833.7,856.52Z"/>
                <path :class="getAreaClass('off-tropic')" :style="getAreaStyle('off-tropic')" @mouseover="hoverOn('off-tropic')" @mouseout="hoverOff('off-tropic')" d="M826.34,853.69c1.52,2.38-5.16,5.2-4.75,5.94-1.51-2.69-5.54-.86-7.73-3.18-1-1.08-1.5-5.93-1.09-6.82,1-2.19,7.37-5.8,9.4-5,3.86,1.44,1.42,2.93,2.27,6.14C824.93,852.56,825.17,851.85,826.34,853.69ZM824.06,823c-.56-2.68-5.1.6-5,2.57C819.27,828.9,824.63,825.29,824.06,823ZM788,844.09c0,.16-9.11-4.16-5.61-.44,0,0-2.44.86-2.28.36-.68,2,1.48,5.09.18,5.77,1.57-.75,3-.54,4.57-1.71C786.88,846.57,788,846,788,844.09Z"/>
                <path :class="getBoundsClass('san-yara')" :style="getBoundsStyle('san-yara')" @mouseover="hoverOn('san-yara')" @mouseout="hoverOff('san-yara')" d="M560.62,911.63c0,9.13-6.33,12.51-8.37,13.36a13.53,13.53,0,0,1-5.16,1c-3.63,0-8.39-1.47-13.15-7.21a20.59,20.59,0,0,1-1.48-2l-.25-.24c-3,3.35-7.08,5.08-9.51,6.12-.41.17-.8.33-1.12.48a12.5,12.5,0,0,1-16.91-4.88,12.88,12.88,0,0,1-1.14-2.8,14.69,14.69,0,0,1-4.18-8.35c-.05-.41-.09-.68-.12-.85a12.68,12.68,0,0,1,5.66-13c4.48-4.85,11.35-8.67,18.54-6.07a13.33,13.33,0,0,1,6.24,4.64,1.46,1.46,0,0,1,.16-.19c.55-.69,1.83-2.27,5.88-4.57,2.9-1.65,7.36-3.68,12.56-2.33a13.14,13.14,0,0,1,7.19,4.82,12.51,12.51,0,0,1,3.18,14.36,13.2,13.2,0,0,1,1.88,5.68C560.59,910.3,560.62,911,560.62,911.63Z"/>
                <path :class="getAreaClass('san-yara')" :style="getAreaStyle('san-yara')" @mouseover="hoverOn('san-yara')" @mouseout="hoverOff('san-yara')" d="M548.08,910.78c.68,7.17-6.63-2.08-5.5-1.75-.71-.19-4.08-4.35-4.73-3.81,1.48-1.23.42-4.15,1.71-5.75.22-.27,5.7-4.08,6-2.12a1.17,1.17,0,0,0,0,1.37c1.52-.36.58-.52,1.55.2-2.13-1.6-4.33,4.85-4.08,6.07C543.46,906.73,548,909.5,548.08,910.78Zm-26.44-6.59c-1.08-.84-1-4.73-2.46-5.25-1.64-.6-4.62,2.12-5.74,3.53-2.22,2.77-2.08-.26-1.68,3.21.1.86,5.61,5.51,3.83,6.5C518.54,910.54,527.1,908.52,521.64,904.19Z"/>
                <path :class="getBoundsClass('ursa-madeum')" :style="getBoundsStyle('ursa-madeum')" @mouseover="hoverOn('ursa-madeum')" @mouseout="hoverOff('ursa-madeum')" d="M445.64,827.79c0,.34,0,.67-.08,1a12.61,12.61,0,0,1-.17,4,13.84,13.84,0,0,0,0,1.89c0,1.12,0,2.52,0,4.25-.21,4.64-1.29,7.78-3.05,10.35a12.87,12.87,0,0,1-4.61,6.75,13.5,13.5,0,0,1-4.23,2.19,12.51,12.51,0,0,1-4.79,2.69,12.87,12.87,0,0,1-3.75.56,12.62,12.62,0,0,1-7.65-2.58,19.77,19.77,0,0,1-6.89-3.54c-.58-.09-1.45-.19-2.14-.26a37.14,37.14,0,0,1-7-1.29c-.36-.11-.75-.19-1.14-.29-3-.73-8.56-2.08-12.78-7.27a18.48,18.48,0,0,1-4.11-11.22,12.61,12.61,0,0,1-.7-7.86,13.36,13.36,0,0,1,2-4.44,18,18,0,0,1-10,5.59,22.2,22.2,0,0,1-2.55.32,15.22,15.22,0,0,1,.92,6.06.86.86,0,0,1,0,.16,15.74,15.74,0,0,1-.5,7.42l0,.11-.09.34c-2.53,9.5-15,16.17-23.52,14.94-5.32-.76-15.6-6.68-15.3-16.9a13.62,13.62,0,0,1,1.91-6.35c.87-3.53,3.14-6.32,5.36-8.65,2.74-2.88,6.58-6.2,11.92-6.34a13,13,0,0,1,3.72.44,16.62,16.62,0,0,1-.25-12.13,16.14,16.14,0,0,1,3.49-10.26A12.6,12.6,0,0,1,382.07,795c.18.17.43.38.63.54.56.49,1.21,1,1.89,1.69l.15.15a17.35,17.35,0,0,1,4.2,17.77,20,20,0,0,1-2.58,5.31,33.54,33.54,0,0,1,7.64-6,18.63,18.63,0,0,1,2.05-.82,14.15,14.15,0,0,1,6.29-2.49,48.72,48.72,0,0,1,3.81-3.22c.3-.24.58-.45.79-.63,6.59-5.76,13.95-8.1,21.87-6.93h.07a20.54,20.54,0,0,1,14.51,8.52,33.22,33.22,0,0,0,2.52,7.45,12.28,12.28,0,0,1,.48,2.95,33.9,33.9,0,0,1-.53,6.84C445.76,826.77,445.65,827.49,445.64,827.79Z"/>
                <path :class="getAreaClass('ursa-madeum')" :style="getAreaStyle('ursa-madeum')" @mouseover="hoverOn('ursa-madeum')" @mouseout="hoverOff('ursa-madeum')" d="M433.9,819.82c.11,2.61-.64,5-.75,7.42.08-1.74-.87,3-.68,2,0,.26.7,1,.68,1.07-.54,2.62-.15,4.56-.31,8.12s-.89,4.11-2.82,5.89c-.7.65.81,1.26,0,1.87-.58.44-2.07.14-2.47.47.6-.49-2.37.53-1.66.32,0,0-.46,1.9-.92,2s-.75-1.17-.67-1.3c-.87,1.55-1.43-1.36-1.22-1.5-3.2,2.23-4.94-1.2-7.41-2.23-3.48-1.45-7.41-1.05-10.8-2.08-2.64-.81-5.86-1-7.88-3.5-2.41-3-.36-5.79-2.33-8.27-.26-.34,4-4,4.64-4.34,3-1.39,3.14,1.33,3.93-1.84.22-.87,5.82-.41,6-.11-1.13-2.09,4.18-5.57,5.92-7.09,3.37-3,7.11-4.69,11.83-4,2.8.41,1.49-.46,3.59,1.62.4.4,1.32-.49,1.7.25.27.52-.63,1.66-.23,2.22-.16-.23,1.46,1.67.69,2.49C432.5,819.5,433.72,819.2,433.9,819.82Zm-58-13.57c-1.38-1.34-3.4-2.65-4.37-4.49a.1.1,0,0,0-.18,0c-.08,2.32-4.35,4.68-2.14,6.53a.48.48,0,0,1,.09.62c-1,1.67-4.47,8.42,3.05,7.08C375.93,815.4,379.28,809.63,375.9,806.25Zm-16.7,30a3.55,3.55,0,0,0,1.22-2c.13-3.19-1.81-.08-2.19.72a.27.27,0,0,1-.29.15,38.05,38.05,0,0,1-4.62-1.6,1.77,1.77,0,0,1,0-1.16c-.1-1.93-5.82,4.18-5.82,5.18a1,1,0,0,0,.85,1c-.85,0-2.4,2.59-2.4,2.62-.05,1.84,3.59,4,4.59,4.16,3,.43,9-3.17,9.66-5.78H359l.06-1,1.38.19C361.06,836.6,360.31,836.8,359.2,836.23Z"/>
                <path :class="getBoundsClass('biazo')" :style="getBoundsStyle('biazo')" @mouseover="hoverOn('biazo')" @mouseout="hoverOff('biazo')" d="M182.75,168.32a16,16,0,0,0-12-2.74l-.86.17a13.46,13.46,0,0,0-2.49-.3,17.9,17.9,0,0,0-11.9,4.68h0a18.12,18.12,0,0,0-1.95-3.43c-3.37-4.68-8.29-7-12.25-8.85-.93-.44-2.33-1.1-2.72-1.35-13-9.48-24.89-2.92-30-.11-8,4.42-10.65,11.58-12.24,15.86-.31.84-.76,2-1.07,2.66a17.23,17.23,0,0,0-7,6c-.21.11-.41.23-.61.36a13.34,13.34,0,0,0-6.1,9.71A13.77,13.77,0,0,0,81,202a21.06,21.06,0,0,0,.12,3.14,66.19,66.19,0,0,0,1.25,7l.06.22a23.27,23.27,0,0,0-1.62,9.94,11.56,11.56,0,0,0-1.47.59c-6.63,3.07-10.69,8.23-11.15,14.15a15.05,15.05,0,0,0,7,13.67,16.82,16.82,0,0,0,9.37,3A14.45,14.45,0,0,0,95,249.33a15.64,15.64,0,0,0,4.1-8.12c.28.11.57.22.87.32a13.63,13.63,0,0,0,11.23,1.52,12.38,12.38,0,0,0,4.28,4.11l.75.74a13.65,13.65,0,0,0,1.54,1.4c5.28,4.09,12.56,4.49,19.47,1.06a23,23,0,0,0,8-6.39l.51-.1a38.69,38.69,0,0,0,8-2.14c4.52-2,12.43-8.6,14.08-14a17.61,17.61,0,0,0-1.09-14,12.58,12.58,0,0,0,10-11.08l0-.1a13.48,13.48,0,0,0,.26-7c1.81-1,10.58-6.15,11.4-14.87A13.49,13.49,0,0,0,182.75,168.32Zm-31.6,42.23a.55.55,0,0,1,.08-.15C151.27,210.54,151.25,210.59,151.15,210.55Zm12.39-9.41c-.07-.07-.11-.29-.08-.74,0,.18.19.37.38.56a1.89,1.89,0,0,1,.42.49A2.55,2.55,0,0,1,163.54,201.14Zm5.16-20.59a.06.06,0,0,1-.11,0h.14Z"/>
                <path :class="getAreaClass('biazo')" :style="getAreaStyle('biazo')" @mouseover="hoverOn('biazo')" @mouseout="hoverOff('biazo')" d="M175.48,178.49c2.11,1.49-3.43,5.57-4,5.83-2.26,1-1.41,1.22-3.63.52-.63-.21-1.17-1.4-1.83-1.65-1.35-.52-3.33-.75-5-1.4a.1.1,0,0,1,0-.17,16.78,16.78,0,0,1,2.5-1.77.18.18,0,0,0,.12-.13A5.15,5.15,0,0,1,167,178c.85,0,1.52,1.84,1.57,2.57a.06.06,0,0,0,.11,0C169.87,178.88,173.11,176.77,175.48,178.49Zm-10.81,20.69c1-2.21-2.36-.12-2.45,0-1.15,1,2.07,2.39,2,2.3-.1-.3-.82-.72-.8-1.06C163.31,202.88,165,198.59,164.67,199.18Zm-8.86,24.9c1.67-5.5-2.5-6-4.57-9.65.1.18,2.69.3,2.72-.41a13,13,0,0,0-2.37-4.19,3,3,0,0,0-.44.72c1,.43-5.75-8.93-5.76-8.46,0,.13,1.92-4.21.05-3.67a.77.77,0,0,1-.74.83c-1.42-1.36-1.22-7.76-1.19-9s-.72-4.06-.6-5.45c.3-3.57,2.91-7.33.44-10.75s-8.93-5-12.19-7.41c-5.59-4.08-10.22-2.77-16.56.73-7.28,4-5.6,12.71-11.5,17.42-2.85,2.27-2.85.5-5.4,4.48-.84,1.31-1.9,3.32-3.25,2.63-.65-.34-.65,2.51-.63,3.16a.29.29,0,0,1-.11.22c-2.94,2.52,1.16,3.57,0,6a6.07,6.07,0,0,0-.17,2.56c0,.23.57,3.94.83,4.83.87,3,1.71.72,1.24,4.13-.29,2.15-5.62,9.82.72,12.24,2.81,1.07,3.59-6.08,8.1-1.25,1.86,2-.18,1.65-.25,2.69-.06.86-2.27,4.72,1.52,2.76-.39.18.59,2.59,2,1.79.53-.29.25-2.17,1.1-2.65,1.08-.63,3.44-2.62,4.28-2.65,4.46-.14,8.22,1,6.74,5.56.6-1.68,1.81,4.58,1.81,5.11,0-.73,3.52,3,3.67,3.06,3.45,2.67,10.15-2.27,10.14-3.59a3.41,3.41,0,0,1,1.39-2.38c.34-1,9.56-2.18,11.74-3.14C152.05,228.79,155.76,224.26,155.81,224.08ZM84.64,234.16c-2.79,1.29-5.86,3.83-2.47,6.09C88.55,244.51,87.35,232.88,84.64,234.16Z"/>
                <path :class="getBoundsClass('lake-ashville')" @click="selectWater('lake-ashville')" :style="getWaterBoundsStyle('lake-ashville')" @mouseover="hoverOn('lake-ashville')" @mouseout="hoverOff('lake-ashville')" d="M799.29,695.17a5.19,5.19,0,0,1-1.55,2.07,34.35,34.35,0,0,0-2,4.23,4.31,4.31,0,0,1-.43.89,5.25,5.25,0,0,1-5.17,5.1c-2.19,0-4.28-1.51-6.83-3.51a6.94,6.94,0,0,1-3.89-.52l0,0a5,5,0,0,1-2.9-3.61,16.11,16.11,0,0,1-1.77-3.27,7.63,7.63,0,0,0-1.83-3,13.62,13.62,0,0,0-2.62-.28c-2.52-.12-5.65-.28-8.12-2.53-2.67-2.44-4.21-7.43.26-13.44s12.49-10,19-6.14a10.34,10.34,0,0,1,3.66,4.47l.19.38a8.6,8.6,0,0,1,5.17,2.15,10.12,10.12,0,0,1,2.46,3.52,5.08,5.08,0,0,1,3.14,2.39l.08.14C800,691.58,800.11,693.13,799.29,695.17Z"/>
                <path :class="getWaterClass('lake-ashville')" @click="selectWater('lake-ashville')" :style="getWaterStyle('lake-ashville')" @mouseover="hoverOn('lake-ashville')" @mouseout="hoverOff('lake-ashville')" d="M794.6,693.35c-1,.34-3.13,5.2-3.57,6.38.15-.41-.72.37-.75,2.53,0,1-4.6-2.82-5.2-3.25-1.58-1.15-2,.57-3.72-.18,1.79.79-1.23-2.46-.87-2-1.36-1.78-1.89-5.39-4.85-7.43-2.77-1.9-7.92-.31-10.15-2.34-4.23-3.87,6.81-15.46,13.27-11.6,1.47.89,2.08,4,3.65,5.1,1,.65,3.25.07,4.51,1.25,2.19,2.07,1.81,4.65-.53,3,.38,2.71,4.86,1.17,5.25,1.84S795.14,693.18,794.6,693.35Z"/>
                <path :class="getBoundsClass('great-sine')" @click="selectWater('great-sine')" :style="getWaterBoundsStyle('great-sine')" @mouseover="hoverOn('great-sine')" @mouseout="hoverOff('great-sine')" d="M710.72,625.51a6.26,6.26,0,0,1-3.46,4.36,19.17,19.17,0,0,0-1.79,1.1c-2.11,1.38-4.92,3.22-8.46,3.22a9.94,9.94,0,0,1-1.32-.08,9.53,9.53,0,0,1-2.88-1c-.67-.31-2.37-1.1-3.56-1.54a5,5,0,0,1-1.81.18,5,5,0,0,1-4.4-3.62,3.7,3.7,0,0,1-.48-.42,5,5,0,0,1,0-7l.14-.14c.37-.36.86-.91,1.38-1.49,3.06-3.4,9.42-10.49,17.51-6.91a5.22,5.22,0,0,1,2.41,2.18,11.31,11.31,0,0,1,4,4l.27.32C709.36,619.89,711.39,622.3,710.72,625.51Z"/>
                <path :class="getWaterClass('great-sine')" @click="selectWater('great-sine')" :style="getWaterStyle('great-sine')" @mouseover="hoverOn('great-sine')" @mouseout="hoverOff('great-sine')" d="M705,625.4c-2.61,1.31-5.42,4.17-8.69,3.75-.56-.07-8.34-4.26-8.48-2.41,0-.35-1.16-3.2-1.75-2.59,2.81-2.73,7.64-10,13.42-7.45.43.2-1.1.45-.58.75,2,1,3.36,1.13,4.88,3.56C704.46,622,707.2,624.31,705,625.4Z"/>
                <path :class="getBoundsClass('ponkapoag-lake')" @click="selectWater('ponkapoag-lake')" :style="getWaterBoundsStyle('ponkapoag-lake')" @mouseover="hoverOn('ponkapoag-lake')" @mouseout="hoverOff('ponkapoag-lake')" d="M637.78,531.19a5.1,5.1,0,0,1,1.44,5.48A5,5,0,0,1,634.9,540a12.85,12.85,0,0,0-1.08,3.87,17.18,17.18,0,0,0,.16,2.83c.28,2.72.59,5.8-.74,8.58a7.32,7.32,0,0,1-1.48,2c.14.26.26.52.38.8,1.58,3.73.68,8.42-.57,11.31a3.61,3.61,0,0,0-.25.93,7.47,7.47,0,0,1-1.78,3.93,18,18,0,0,1-3.65,2.9,18,18,0,0,0-1.94,1.39c-.56.51-1.12,1.16-1.72,1.83-1.84,2.09-4.7,5.34-9.26,5.34a11,11,0,0,1-3-.44,12.22,12.22,0,0,1-3.7-1.65,2.58,2.58,0,0,0-.68-.35l-.35-.15c-2.9-.28-7.81-4-9.37-6.16-2.71-3.78-3.06-6.3-1.39-10l.28-.65a9.75,9.75,0,0,1-3.27-7.8,8.33,8.33,0,0,1,.46-2.08,5.52,5.52,0,0,1-.72-.53,6.49,6.49,0,0,1-2.51-4.84,3,3,0,0,0-.29-1.13,9.38,9.38,0,0,0-1.72-2.45,18.37,18.37,0,0,1-3.79-6.13c-2.21-6.55.79-11.32,2.77-14.48a16.5,16.5,0,0,0,1.86-3.51,6.31,6.31,0,0,1-2.14-2.63,17.18,17.18,0,0,1-.87-4.5l0-.27c-.08-.37-.24-1-.42-1.72-1.08-4.26-1.29-5.29-1.12-6.54.63-4.55,3.75-7.79,6.26-10.4l.33-.35a5.92,5.92,0,0,1,.11-2.91c.28-1,1.34-4.29,3-5.84a10,10,0,0,1,7.08-2.36c1.56-1.87,3.87-4.48,7.61-4.49h0c2.59,0,5,1.31,7.13,3.88s2.54,6,2.9,9a17.52,17.52,0,0,0,.67,3.71c1.18,2,3,2.71,6.07,3.86a32,32,0,0,1,5.31,2.39c1.5.9,11,8.6,11,13.27a5.48,5.48,0,0,1-1.78,4.12l-.3.26a5,5,0,0,1,.1,2.21,4.92,4.92,0,0,1-2.08,3.3A15,15,0,0,0,637.78,531.19Z"/>
                <path :class="getWaterClass('ponkapoag-lake')" @click="selectWater('ponkapoag-lake')" :style="getWaterStyle('ponkapoag-lake')" @mouseover="hoverOn('ponkapoag-lake')" @mouseout="hoverOff('ponkapoag-lake')" d="M634,518.13c-.16.79-2.6,1.28-2.8,2.44-.39,2.23,5,2.51.85,3.17-2.16.35.46,9.86,2.48,11.21a0,0,0,0,1,0,.09c-3.94-.38-5.19,5.6-5.57,8.12-.41,2.79,1.08,7.43-.14,10-.61,1.27-5.06,3.69-3.65,4s-1.28.55,1.07,1.44,2.21,5.66.83,8.85c-.78,1.81-.42,2.68-1.16,3.5-1.27,1.41-3.55,2.4-5.24,3.94-3.07,2.8-4.83,6.86-9.23,5.61-2.36-.68-2.09-1.14-3.94-1.85-1.12-.44.66-1-.37-1.49-2-1-.84.65-1.19,1s-4.64-2.28-5.91-4.06c-2.37-3.31-1.41-3.55-.35-6.3.57-1.5,5.38-7.26.67-7.73-.93-.09.5,3.44-1.86,2.71-.94-.29-2-2.45-1.92-3.77.21-2.48,4-5,1.47-6.94-1.14-.87-3.2.33-3.44.12-1.35-1.17-.27-1-1.39-4-1.22-3.22-4.25-4.85-5.45-8.41-2.66-7.88,5.78-11.25,5-18.44-.09-.85-2.41-1.88-2.66-2.49a26.12,26.12,0,0,1-.59-3.71c-.24-1.18-1.6-6.12-1.51-6.73.59-4.34,5.38-7.53,7.74-10.85.38-.52-1.56-.85-1.2-2.09a13.54,13.54,0,0,1,1.6-3.54c2.11-1.92,5.27-.42,6.34-1.43,2.2-2.35,4.4-6.73,8.3-2,2.21,2.66,1.32,9,3.12,12,3.17,5.31,8.83,5.42,13.1,8,2.92,1.75,8.56,8,8.56,9S634.26,517.73,634,518.13Z"/>
                <path :class="getBoundsClass('sidereal-lake')" @click="selectWater('sidereal-lake')" :style="getWaterBoundsStyle('sidereal-lake')" @mouseover="hoverOn('sidereal-lake')" @mouseout="hoverOff('sidereal-lake')" d="M607.39,382.17a17.94,17.94,0,0,1-2.65,2.81c-1.59,1.38-3.74,2.73-6,2.73a5.45,5.45,0,0,1-1.84-.32,5.67,5.67,0,0,1-3.58-6.43c0-.1,0-.21.05-.32a5,5,0,0,1-1.54-1.62,20.11,20.11,0,0,1-2-5.75,23.11,23.11,0,0,0-.71-2.56,6.28,6.28,0,0,1-2.74-1.3,5.82,5.82,0,0,1-1.83-2.67,10.09,10.09,0,0,1-3.32-1.78,6.35,6.35,0,0,1-1.31-1.41,5,5,0,0,1-3-.65h0a6.42,6.42,0,0,1-3.31-4.48,5.81,5.81,0,0,1-2.73-1.75l0,0a5,5,0,0,1-.13-6.53.66.66,0,0,1,0-.14,5.61,5.61,0,0,1-2,1,26,26,0,0,1-3.48.61c-.43.06-.86.11-1.28.18h0a5,5,0,0,1-4.83-2,28.27,28.27,0,0,1-7.71.37,6.12,6.12,0,0,1-2.4-.63,6.83,6.83,0,0,1-2.49.78l-.44.06a13.39,13.39,0,0,1-1.78.21,6.3,6.3,0,0,1-3.06-.79c-3.73,2.38-6.86,2.31-9.31-.2a6.83,6.83,0,0,1-2-6.51c1.1-4.39,6.23-6,8.42-6.68l.22-.07a11.49,11.49,0,0,1,5.33-.73,8,8,0,0,0,1.12,0c.49,0,1.47,0,2.52,0,.77,0,2,0,2.6,0a7.89,7.89,0,0,0,1.26-.83,13.28,13.28,0,0,1,4.56-2.39,10.75,10.75,0,0,1,6.51.24c.29.09.49.15.64.18,2.67-2.29,5.63-1.72,8-.94a8.1,8.1,0,0,1,3.69,2.43l.63-.12c6.6-1.32,10.7.71,12.2,6a7.59,7.59,0,0,1-1.7,7l.13.17,0,.05a22.73,22.73,0,0,1,4.9,1.28l.49.17c.58.1,1.07.16,1.48.21,3.27.41,5.08,1.15,7.84,4.7a14.5,14.5,0,0,1,2.64,5.56c.1.35.21.73.34,1.15A12.59,12.59,0,0,0,605,363a22.25,22.25,0,0,1,1.78,3.56C609.34,373.46,609.54,378.58,607.39,382.17Z"/>
                <path :class="getWaterClass('sidereal-lake')" @click="selectWater('sidereal-lake')" :style="getWaterStyle('sidereal-lake')" @mouseover="hoverOn('sidereal-lake')" @mouseout="hoverOff('sidereal-lake')" d="M603.1,379.61c-.21.35-5.29,5.17-4.84,2.06.12-.85,2.58-4.65,2.58-4.57-.06-6.13-4.66-.53-4.73-.64-1.66-2.83-1.43-7.14-3.67-9.84-.92-1.12-2.19-.45-2.93-1.06s-.36-2.29-.72-2.52c-1.64-1.06-2.91-.72-4.48-2-1.22-1,.25-2.35-1.42-3.23-1.33-.7-4.17.38-3.54.75-1.73-1-.34-1.77-1.51-2.67,1,.74-1.16-2.67-1-2.06a22.44,22.44,0,0,1-2.38-.55c1.57,1.74,1.11-4.12,1.08-4.31a12.72,12.72,0,0,0-2.57-4.87c1,.8-5.27-.36-5-.41-.74.13.12,2.22-.67,2.43-1.27.34-2.83.45-4.25.68.26,0,2.47-4.2,2-4.59-1.9-1.52-4.62,1.94-5.78,2.3a21,21,0,0,1-7.69.61c-1-.06-1.22-1.44-2.5-1.33-.47,0-2.65,1.49-3.12,1.49-.11,0-1.62.25-1.82.25-.84,0-2.09-1.48-2.74-1.48-1.9,0-4.42,3.62-6,2-2.86-2.93,3.58-4.66,4.69-5,2.75-.92,2.75-.34,5.08-.44,1.15-.05,5.34.07,5.9-.07,2.57-.66,3.77-2.7,6.13-3.34,3-.79,3.8.79,6.63.65,3.23-.17,1.35-2.67,5.62-1.24,2.26.75,1.3,2.12,4.26,2.72,2.29.46,7.61-2.82,9,2.22.62,2.24-2.4,3.24-2.26,5.45.19,3,2.7,3.68,3.15,6.62-.44-2.82,5.77,0,6.69.15,3.72.67,4-.07,6.48,3.09,1.39,1.8,1.49,3.06,2.15,5.15.78,2.43,2.32,4.14,3.11,6.27C603.21,371.29,604.86,376.67,603.1,379.61Z"/>
                <path :class="getBoundsClass('coconino-marsh')" @click="selectWater('coconino-marsh')" :style="getWaterBoundsStyle('coconino-marsh')" @mouseover="hoverOn('coconino-marsh')" @mouseout="hoverOff('coconino-marsh')" d="M494.94,373.71c0-.11-.08-.22-.11-.33a7.8,7.8,0,0,0-5.17-5.35,5.82,5.82,0,0,0-2.25-.24,7.15,7.15,0,0,0-1.71-2.31,13.2,13.2,0,0,0-5-2.6,8,8,0,0,1-.79-.27,13.84,13.84,0,0,0-4-.64,6.9,6.9,0,0,0-5.56-.35,13,13,0,0,0-4.41,2.82l-1-.67c-.5-.31-1.19-.76-1.57-1a10.51,10.51,0,0,0-1.54-3l-1-1.22-1.82-2.1-.21-.25a5,5,0,0,0-4.81-1.58,12.6,12.6,0,0,0-5,3.11,7,7,0,0,0-3.19-.42,23.69,23.69,0,0,0-.31-2.8c-.76-4-3.74-4.65-4.63-4.76l-.62,0a8.16,8.16,0,0,0-.84-1.54c-2.45-3.37-5.1-5.62-10.13-5.66h-.14a11.33,11.33,0,0,0-9.62,4.69,7.36,7.36,0,0,1-1.77,1.69c-.2,0-.64,0-1,0a10.23,10.23,0,0,0-4.76.87,10.34,10.34,0,0,0-2.63,1.85c-.82-.12-1.7-.2-2.63-.29l-.81-.08q-4.56-4.11-8.32-1.63H395.2a5,5,0,0,0-4.61-2.05,27.84,27.84,0,0,0-9.86,3.88c-3.26,2.29-4.11,4.19-4.48,6.7a6.15,6.15,0,0,1-.15.81,7.06,7.06,0,0,0-3.27,6.82l-.5.44a24.73,24.73,0,0,0-2.34,2.24c-3.17,3.47-4.4,6.58-3.78,9.5a6,6,0,0,0,2.65,3.85,8.11,8.11,0,0,0-.21,3.2,19,19,0,0,0,1.16,3.08,30,30,0,0,0-2.32,2.27,13,13,0,0,0-1.38,1.81,5.57,5.57,0,0,0-1.31.32c-.23.1-.69.24-1.23.43-4.32,1.46-6.49,2.19-7.66,4.37a7.77,7.77,0,0,0,1.13,9.07,12,12,0,0,0,1.54,1.42c0,.15,0,.31-.05.49-.13.35-.43,1.08-.64,1.59-1.37,3.34-2.2,5.36-1.35,7.65a8.08,8.08,0,0,0,4.58,5.08c3.16,1.23,5.95-.19,7.79-1.14l.86-.43a22.6,22.6,0,0,1,1.41,1.89,22,22,0,0,0,2.39,3,16.82,16.82,0,0,0,6.34,3.51,17,17,0,0,1,2.33,1,13,13,0,0,1,2.76,5.28,5,5,0,0,0-.18,3.31,9.62,9.62,0,0,0,1,1.77l0,0c.12.14.23.27.35.39,1.59,2.18,4.44,5.09,7.57,4.85a5.21,5.21,0,0,0,4-2.41,28.57,28.57,0,0,0,1.8,3.8c2.68,4.65,5.73,6,10.2,6a33.32,33.32,0,0,0,3.45-.2c5.76-.6,8.57-2.73,12.32-7a19.56,19.56,0,0,0,4.19-7.81,27.08,27.08,0,0,1,1.2-3.24,30.85,30.85,0,0,1,2.55-4.25c.66-1,1.34-2,2-3.09a5,5,0,0,0,7-1.89c.65-.13,1.45-.24,2-.32,2.61-.37,5.57-.78,6.9-3.78,1.56-3.49,0-6.89-4.61-10.1a5.66,5.66,0,0,0-.07-1.48c.08-.08.16-.15.23-.23,1,.32,2.35.82,3.2,1.13,1.53.57,2.51.93,3.3,1.13a28,28,0,0,0,4.72.59c.72.06,1.72.13,2.55.23a5,5,0,0,0,7.2,2.35c.49-.2,1.53-.58,2.4-.9,7-2.58,9.6-3.72,11.07-5.42l.68-.77a7,7,0,0,0,2.08-4.13c.05-.29.12-.7.27-1.34a17.29,17.29,0,0,0,.29-3,8.2,8.2,0,0,0,2.23-3.95,28.05,28.05,0,0,0,.71-3.69,4.37,4.37,0,0,1,.71-2.36,7.19,7.19,0,0,1,1.3-1,12.17,12.17,0,0,0,3.76-3.52l0,0a5,5,0,0,0,.76-2.71c.05-.62.21-1.79.37-2.71A5,5,0,0,0,494.94,373.71Zm-44.79-8.58a.75.75,0,0,1,.09-.55A1.15,1.15,0,0,1,450.15,365.13Zm-79.42,29.13a1.14,1.14,0,0,1,.15.23l-.15-.22-.17-.24A2,2,0,0,1,370.73,394.26Z"/>
                <path :class="getWaterClass('coconino-marsh')" @click="selectWater('coconino-marsh')" :style="getWaterStyle('coconino-marsh')" @mouseover="hoverOn('coconino-marsh')" @mouseout="hoverOff('coconino-marsh')" d="M490.82,376.54c-1.07-1.39-1.85,6.37-1.75,6.22-1.09,1.74-3.7,2.4-5,4.46-1.73,2.67-1.14,4.06-2,7.49-.58,2.17-1.78,1.9-2.41,2.86.23-.34-.09,4-.15,4.25-.71,3.06,0,1.82-1.93,4.09-1.37,1.57-12.19,5-12.29,5.32,1.06-3.85-7.15-2.86-10.65-3.74-1.69-.42-7.31-2.88-8.69-2.67-1.89.29-5.94,5.55-6.29,5.5,3.11.42,2.53,1.93-.08,1.36-.28-.06-.72,2.61-.26,3.14,1.59,1.82,2.76-.13,3.76.54s4.49,2.76,3.71,4.5c-.55,1.24-9,.48-8.69,3.74-.64-7.07-4-4.61-5.91-.19-1.54,3.49-4,5.94-5.75,9.72-1.86,4-1.63,6.49-4.59,9.82-3.19,3.61-4.9,4.88-9.1,5.31-5.49.57-6.86,0-8.8-3.33-1.67-2.89-1.93-5.23-3.89-8-.22-.3-3.26-3.5-3.52-3.62-2.28-1-2.84,7.24-2.86,7.39-.21,1.55-4-3.17-4-3.16,2.59,3.08.22-3.25.36-2.54a17.86,17.86,0,0,0-4.34-8.31c-1.94-1.8-6.47-2.29-8.54-4.35-1.76-1.76-3.36-5.5-5.92-6.42-3.65-1.31-7.84,5.47-9.95-.2-.28-.76,2-5.4,2.19-6.44a22.72,22.72,0,0,0,.12-4.56c0,.31-5-1.88-3.23-5.11.32-.6,5.3-2.11,6.34-2.52a1.41,1.41,0,0,0,1.9,0c1.12-.84,1.63-2.34,2.61-3.39,2.16-2.33,3.76-3.18,5.49-5.33-.82,1-3-3.7-3-4.1-.25-1.79,1.34-2.89.69-5-.46-1.53-2.88-1-3.19-2.42-.35-1.63,1.48-3.88,2.58-5.09,1.75-1.91,2.87-2.33,4.11-4.17.42-.63-.28-2.57.18-3.57s2-1.38,2.51-2.57c1.42-3.32-.2-3.64,3.12-6a23.34,23.34,0,0,1,7.55-3A1.47,1.47,0,0,1,391,354c.4.82,6.17.54,7,.6,2.92.22,1.42-2.44,4.5.35.27.24-.82,1-.86,1s10.2.6,9.19,1.39c.81-.64,1.58-2.26,3.26-3.08s3.87.18,5.92-1c3.93-2.24,3.65-5.82,9.1-5.77,2.74,0,4.14.87,6.12,3.6.85,1.17,2.48,8.94,4.77,3.78.74-1.68,1.12,8.72.24,7.85,1.87,1.85,5.31-1.45,7.18-.17.81.55-.65,2.45,1.61,3.17a3.06,3.06,0,0,0,.82-1.7.86.86,0,0,1,.24,1.12c-.19-.61.92-1.65,1.52-1.61-2-.11,2.17-3.81,3.31-4.06,0,0,2.77,3.21,2.84,3.3.8,1.06.84,2.22,1.38,2.9,1.3,1.63,4.73,3,6.27,4.84a46.62,46.62,0,0,1,2.82,4.24,1.21,1.21,0,0,1-.83.9c-.13.88,2.59-.33,2.05-.7,2,1.39,5.35-4.63,3.51-6.9,0,0-3.18,3-4.09,2.32-1.54-1.24,1.81-3.6,3-4,1.54-.52,1.72.41,3.15.69a17,17,0,0,1,2.84.18c1.21.51,3.17.85,4.41,2s.76,3.25,2.41,4.26,2.37-1,3.43-.64C490.14,373.41,489.85,375.26,490.82,376.54Z"/>
            </g>
            <g v-if="terrain == 'west_genesaris'" id="west_genesaris">
                <path id="stonehaven" :class="getAreaClass('stonehaven')" :style="getAreaStyle('stonehaven')" @mouseover="hoverOn('stonehaven')" @mouseout="hoverOff('stonehaven')" d="M873.41,171.09A60.55,60.55,0,0,0,875.05,188c.76,3.14,1.92,6.12,4.78,8.44,3.56,2.89,2.65,7.73,3.63,11.72.26,1.05-.8,2.27-1.79,2.76-5.92,2.92-11.49,7.52-18.84,4.26a3.91,3.91,0,0,0-3.34,0,3.86,3.86,0,0,1-3.9-.36c-.58-.34-1.4-.84-1.88-.66-3.27,1.24-6.68.19-10.12,1a158.36,158.36,0,0,1-16.06,2.76c-2.51.32-4.54-1.42-6.67-2.45a15.65,15.65,0,0,1-7.21-21.88,7.16,7.16,0,0,0,1-2.54c.44-4.3,1.69-7.8,6.73-8.55,1.47-.21,1.46-1.81,1.72-3.05,1.45-6.74,4.85-8.23,10.81-4.81,3.23,1.85,8.72.87,12.55-2.29.88-.74,1.69-1.81,2.83-1.84,6.62-.12,11.43-4.68,17.19-6.88C871.05,161.89,874,164.48,873.41,171.09Z"/>
                <path id="antigone" :class="getAreaClass('antigone')" :style="getAreaStyle('antigone')" @mouseover="hoverOn('antigone')" @mouseout="hoverOff('antigone')" d="M170.53,174.28c-7.3-.11-10.87-3.75-10.68-11a4.59,4.59,0,0,0-1.53-3.62c-3.87-3.86-3.45-7.27,1.63-9.8a43,43,0,0,0,8.05-5c.82-.67,1.91-1.57.74-2.47-3.15-2.44-2.66-5.74-2-8.78,1-4.63-1.57-8.68-1.48-13.17.17-8.31,7-13.45,14.73-10.69a2.67,2.67,0,0,0,2.3.14c5.16-2.91,8.84.51,12.16,3.36,2.58,2.21,5.15,5,5.35,8.88a2.57,2.57,0,0,0,1.58,2.09c3.91,2.17,5,6.65,2.15,10.12-3.58,4.37-8.76,5.47-14.05,6a3.59,3.59,0,0,1-2.67-1.33c-2.41-2.26-4.65-1.72-6.07,1.13-1,1.92-2.42,3.42-4.87,3-2.17-.4-2.23.47-1.3,2a16.58,16.58,0,0,1,2.31,6c.25,1.59,1.31,2.24,2.83,3a27.15,27.15,0,0,0,9.25,2.36c4,.43,4.95,4.24,2.24,7.39-2.49,2.93-5.87,3.41-9.31,3.51-2,0-3,.55-3.56,2.69C177.36,173.68,175.79,174.36,170.53,174.28Z"/>
                <path id="body" :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M176.61,361.11c-2.58,0-4.93,3.16-4.9,6.78,0,2.2.28,4.56,3,4.95,2.09.31,5-4.57,5.11-8.09A3.39,3.39,0,0,0,176.61,361.11Zm12.27,8.9c-3.3,0-6.27,2.26-6.22,4.66.05,2.13,4.82,5.5,7.9,5.58,2.2.06,4.45-2.32,4.5-4.74C195.11,372.5,192.28,370,188.88,370Zm165.86,59.43c-.85-3.75-3.54-6.34-6-9-1.37-1.52-3.65-1.39-4.3.5-1,2.95-3.26,2.78-5.42,3.12-5,.79-10.07,9.52-8,14.14a4.82,4.82,0,0,1,0,4.46c-1.52,3.48-.12,6.57,3.31,8.2,3.8,1.8,7.94,2.06,11,2.74,4.19.52,5.44-1.62,6.5-4,2.63-6,.89-12.69,3.08-18.76A2.8,2.8,0,0,0,354.74,429.44Zm633.1,351.22q6.07-.46,12.16-.83V141.43a92.87,92.87,0,0,0-4.3-10.52c-1.77-3.78-3.49-3.88-6.33-.82-2.1,2.25-2.87,5.18-4.34,7.74-1.06,1.87-2.17,2.79-3.61.28-1.11-2-2.94-2.34-5-2.16-4.2.35-7.47,2.67-10.72,5-1.57,1.14-3,2.71-5.07,2.64-6.44-.22-12.25,2.64-16.8,6.09s-8.56,6.59-13.77,8.56c-1.48.56-2.74,1.53-4.45,1.33-2.93-.35-4.17,1.19-4.41,3.94a29.48,29.48,0,0,1-2.77,9.14c-1,2.2-3.06,4-3,6.46,0,4.49-2.43,7.22-5.45,10.11-5.25,5-3,14.23,3.54,17.16a26.87,26.87,0,0,0,6.61,1.52c5.15.92,9.12,4.52,14.2,5.59,2.2.47,4.49-.95,6.59.84,4.28,3.65,9.07,6.8,12.73,11.08,2,2.31,4.49,5.21,3.64,8.54-1,3.73-.21,7.14.89,10.41,1.38,4.1,1.07,8,.61,12.13-.48,4.31-2.32,9.11,1.77,13a1.68,1.68,0,0,1-.22,2.49c-2.91,2.44-5.86,4.91-10.1,4-5.09-1.07-10-3-15.38-2.82-2.12.08-3.78.27-5.21,1.76a24.55,24.55,0,0,0-3.54,5.4c-1.82,3.29-2.69,7.12-4.68,10.16A51.58,51.58,0,0,0,915,305.73c-.61,2.29-.68,4.49-3.63,5a2.74,2.74,0,0,0-2.06,2.54c-.33,6.12-2.87,11.74-3.94,17.68-.71,3.92-2.45,5.15-6.5,4.73-3.49-.36-6.84-.49-9.59,2.33a3.79,3.79,0,0,1-3.57.71c-5.49-1.06-10.86,1.85-12.22,6.94-1.06,4-4.67,4.8-7.48,6.44-1.86,1.08-2.64-1.65-4-2.5-2.33-1.46-4.55-3.56-7.5-2-4.39,2.31-9.14,3.53-13.81,5a4.1,4.1,0,0,0-3.1,2.93c-.62,3.43-2.46,6.34-3.52,9.5-1.67,5-5.08,6.63-9.52,7.58-5.82,1.24-11.8,2-17.38,3.95a35,35,0,0,1-12.78,1.64c-5.51-.14-8.15-3.95-6.18-9.09a74.86,74.86,0,0,1,4-8c1.55-2.93,3.35-5.76,3.05-9.3s1.37-5.91,4.16-7.71c1.16-.76,2.65-1.5,2.47-3-.31-2.68.87-4.61,2.43-6.49s1.87-3.57.18-5.54a3.16,3.16,0,0,1,.49-4.88c3.84-2.29,5.22-6.21,7.37-9.65a10.85,10.85,0,0,1,6.69-5,8,8,0,0,0,6.23-6.5,11.81,11.81,0,0,1,7.83-8.87,9.17,9.17,0,0,0,5.73-5.08,6,6,0,0,1,4-3.48,13.74,13.74,0,0,0,8.22-7.34c1-2,1.09-4.16-.78-5.63s-3.73-4.51-7.06-2.36c-1.18.78-2.4,1.37-3.82.46-5-3.17-10.79-1.28-16.1-2.58-.84-.2-2,.5-2.88.9-5.15,2.21-10.21,4.79-16,4.6-5.61-.17-11.09,1.3-16.73,1.13-2.69-.09-5.25-.78-6.16-2.91-1.82-4.23-5.47-8-4.24-13.25.41-1.75-.78-3.12-2.13-4a53.91,53.91,0,0,0-6-3.31,4,4,0,0,0-4.55.38c-2.65,2.38-4.57,2-6.78-.73s-5.31-2.55-8.25-1.65c-2.74.84-3.88,3-3.65,5.89.08,1.08-.16,2.29-1.43,2.39-2.85.23-4.73,2.08-6.85,3.61-.71.52-1.77,1.64-2.68.56-.64-.76.17-1.83.69-2.47,3.21-4,2.68-9.35,5.19-13.6.61-1,.43-2.76.09-4-.74-2.72-1.93-5.25-5.28-5.54a6,6,0,0,0-6.66,4.25c-.67,1.82-1.56,3.73-1.54,5.59.08,5.62-3.45,9-7,12.41-1.3,1.24-2.83,1.65-4.38.65-2.73-1.74-5.14-3.79-6.21-7.06-1.41-4.33-4-6.39-8.5-6.55-2.34-.09-4-.78-4.66-3.16-.81-2.94-2.88-3.9-5.75-3.69-2,.13-3.92.18-5.6-1.1-2-1.58-4-1.1-6.06.06-1.67.94-3.13,2.29-5.19,2.51-5.13.55-5.85,1.29-6.51,6.39-.73,5.59-2.09,6.3-7.37,5-3.86-.93-7.43.49-10.36,3.16s-.58,4.74.67,7a2.67,2.67,0,0,1-.54,3.16c-.79,1-1.86,1.58-3,.9-1.9-1.13-3.43-.51-5.08.53a5.34,5.34,0,0,1-3.51,1.19c-4.83-.59-9,1.26-12.75,3.9-6,4.25-8.93,4.17-13.68-1.6-3.05-3.71-7.27-5.17-11.5-6.58-3-1-5.9-2-7.37-5-1.88-3.85-5-5.68-9.13-5.24a10.13,10.13,0,0,1-3.06-.14,10.4,10.4,0,0,0-7.32.95,10.45,10.45,0,0,1-7.3,1,11,11,0,0,0-9.11,2.06,5.54,5.54,0,0,1-5.51,1c-4-1.64-7.18,0-10.06,2.41a91.2,91.2,0,0,0-8.24,7.72,11.39,11.39,0,0,0-2.4,12.15c2.83,8,.26,13.06-7.78,16.29a42.45,42.45,0,0,1-10.24,2.6c-5.75.76-11.65,1.3-17.3-.9a7,7,0,0,1-4.6-6.66c-.07-2.69,1.26-5.1,4-5.76a8.24,8.24,0,0,0,6.53-5.8c1.15-3.37,4.73-4.13,7.26-6,1.71-1.24,2.87.76,4.28,1.29,2.81,1.06,5.18-.3,5.21-3.42a10.35,10.35,0,0,1,2.34-6.93,5.3,5.3,0,0,0,1.28-3.84c-.29-3,1.31-4.55,3.56-6.07,4.57-3.09,6.29-7.61,5.88-13-.17-2.28-.35-4.56-.42-6.85-.15-5.12-.24-5.24-5.2-5.27-4,0-7.72-.08-11.57-2.74-6.44-4.44-7.9-3.69-12.67,2.32-2.1,2.64-4.45,4.28-8,2.49a6.17,6.17,0,0,0-2.69-.42c-4.9,0-9.8,0-14.54,1.57a7.93,7.93,0,0,1-6.35-.37,15,15,0,0,0-7-1.43c-5.46-.12-10.56,1.81-15.84,2.7a6.88,6.88,0,0,0-5.15,4.08c-.76,1.47-1.84,3.35-4,2.06-2.54-1.54-4.07-.32-5.53,1.51-1.78,2.23-3.57,2.32-6.28,1.17q-10.38-4.4-20.33-9.63c-1.65-.87-4.08-1.18-4.63-3.23-1.6-5.88-4-11.62-2.9-18a13.15,13.15,0,0,0-1.59-9.63,15.1,15.1,0,0,1-2.47-10.43c.78-6.76-.47-12.9-4.86-18.32-1.78-2.19-1-4.05,1.58-5.15a11.3,11.3,0,0,0,2.12-1.12c1.54-1.07,3.06-2.3,2.55-4.44s-2.39-3-4.47-3c-6.12.14-12-.59-17.4-3.77a3.75,3.75,0,0,0-4.25.38c-2.09,1.81-4.83,1.92-7.19,3-1.31.61-3.17.73-4.21-.49-2.46-2.86-5.8-5.48-3.63-10.13a3.38,3.38,0,0,0-1-4.36c-1.44-1.06-2.73-.16-4.12.49-2.38,1.11-3.94,3.6-6.76,3.89a8.85,8.85,0,0,0-6.9,4.58c-3.36,6.19-7.71,9.87-15.24,9.32-3.66-.27-4.72,1.63-4.18,5.3a26.29,26.29,0,0,1,.25,3.76c0,3.84-.61,4.33-4.51,3.78-1.8-.26-3.64-.93-5.3.33a14.88,14.88,0,0,1-6.66,2.56,7.12,7.12,0,0,0-4.48,2.85c-2.31,2.85-5,5.39-3.68,9.62.15.46-.19,1.12-.4,1.63-1.95,4.65,0,11.1,4.45,13.55a30,30,0,0,1,8.26,7.13,14.66,14.66,0,0,1,3.9,9.29c.12,3.21-.68,5.74-3.2,7.87-.85.72-1.19,2.21-1.46,3.41a14.53,14.53,0,0,1-3,6.45c-1.83,2.15-1.55,4.21.44,6,1.76,1.63,3.8,3,5.39,4.77,3.15,3.52,7.34,6.89,5.61,12.41s0,9.53,4.62,12.65c1.6,1.08,3.12,2.25,3.57,4.4a71.88,71.88,0,0,0,2,7.62c1.2,3.69,2.33,7.51,6.1,9.56,5.49,3,10.84,6.26,17.55,5.78A22.28,22.28,0,0,1,356.5,305c2.5,1.11,3,2.66,1.68,4.87a12.13,12.13,0,0,0,.32,13.51,11,11,0,0,1,1.36,4.22,12.93,12.93,0,0,0,1.93,5.79c3.84,5.41,7.26,11.12,11.63,16.13a5.68,5.68,0,0,1,1.56,5.34c-.73,3.13.59,5.4,3.37,6.75S382.88,365,385,367c4,3.76,7.3,8.78,12.31,10.76,6.34,2.51,11.61,6.86,18,9.16,1.29.46,2.74,1,2.9,2.6.43,4.66,2.48,9,2.06,13.86a21,21,0,0,0,1.09,9.13,9,9,0,0,1-.33,7.36c-1.65,3.09-.82,5.54,1.61,7.63,7.26,6.26,8.25,14.89,8.6,23.56.15,3.69.52,6.89,2.9,9.89a17.8,17.8,0,0,0,6.39,5.55,16.11,16.11,0,0,1,7,6.35c6.37,10.14,12.3,20.51,19.53,30.17,6.21,8.28,14,15.07,20,23.41a6.27,6.27,0,0,0,1.55,1.34,17.39,17.39,0,0,1,6.73,8,6.72,6.72,0,0,0,4.78,4.08,57,57,0,0,0,7.34,1.72c2.36.31,3.45,1.35,4.33,3.6,2,5,5.24,8.57,11.26,8.34,2.83-.11,4.8.8,4,4.26-.27,1.13.7,1.86,1.16,2.76,1.66,3.17.56,6.25-2.76,7.08a27,27,0,0,0-9.7,4.11c-1.43,1-3.45,2.1-5,.37-2.3-2.56-5.3-4.39-7.26-7.27-.44-.65-.75-1.57-1.66-1.6-4.21-.14-8.39-1.31-12.32,1.93-3,2.52-8.29.52-10.11-3s-1.35-7-1.88-10.58c-.29-2-.69-4-2.65-4.36-2.57-.48-3.94-2.12-5.32-3.92s-3.19-2-5.08-.73a22.94,22.94,0,0,0-2.94,2.35c-2.36,2.3-4.86,2.29-7.44.53a24.24,24.24,0,0,1-6.19-5.89,8.14,8.14,0,0,0-6.21-3.74,31.82,31.82,0,0,1-9.48-2.89c-2.5-1.07-4.57-2.69-4.32-5.92a4,4,0,0,0-2.17-3.66c-3-2-4.8-4.82-6.47-7.86-1.2-2.19-1.46-4.05,1-5.55,1.84-1.09,2.07-2.63.78-4.34a8.18,8.18,0,0,1-1.35-3.84,2.84,2.84,0,0,0-2.39-2.58,28.81,28.81,0,0,0-5-1c-3.73-.07-6.15-1.76-8-4.91-1.32-2.2-2.44-5.36-5.2-5.6-3.51-.31-5.32-2.31-7.49-4.54-3.1-3.18-3.68-4.67-1.56-8.51a4,4,0,0,0-.31-5c-1.48-1.88-2.84-3.87-4.15-5.88a7.19,7.19,0,0,0-3.32-2.85c-2.74-1.15-5.43-2.41-8.18-3.53-5.32-2.16-8.46-1.25-11.54,3.64a20.28,20.28,0,0,1-7.4,6.94c-3.25,1.86-5.92,4.39-5.67,8.68.09,1.66-.9,2.72-2.07,3.74-1.51,1.32-1.8,3-.5,4.58s2.87,1.09,4.38.24c.39-.23.73-.56,1.1-.82,1-.69,2.05-1.16,3.14-.28,1.34,1.08.3,2.06-.26,3-.83,1.37-1.76,2.66-1.44,4.44.48,2.7.93,5.4,1.27,8.12a39.34,39.34,0,0,1-.22,12.39c-1.54-3.53-3.89-6.5-3.9-10.53,0-3.43-2.18-4.82-4.63-3.34-4.48,2.7-8.4,1.34-12.11-1.26-2.34-1.63-4.81-2.87-7.58-2.86-3.51,0-5.45-1.5-6.66-4.68a20,20,0,0,1-1.36-4.91,10,10,0,0,0-3-6.73c-2.46-2.22-4.86-4.5-7.3-6.76s-3.62-5-2.4-8.58c1.82-5.37-1.05-8.61-6.62-7.71-3,.48-4.47-1-4.71-3.58-.48-5.16-3-9.74-4-14.78-.84-4.18-5.1-5.44-8.92-3.25-1.28.73-2,.43-3-.42-2.77-2.36-5.9-3.87-9.69-3.33-1.76.26-3.15-.12-4-1.86-1.36-2.85-3.91-4.1-6.79-4.71a4.76,4.76,0,0,1-3.57-2.3c-4.28-7.62-4.95-7.71-11.34-1.59a5.11,5.11,0,0,1-5.43,1.06c-1.85-.59-1.6-2.38-1.49-3.81a9.91,9.91,0,0,0-2.35-7.31,4,4,0,0,1-.61-4.77c1.15-2.11,1.36-4.11-.38-6a5.82,5.82,0,0,0-6.56-1.77c-2.09.73-3.49,0-4.82-1.49-5.55-6.41-13-9.9-20.62-13-4.27-1.77-8.9,2.33-7.43,6.67a43.58,43.58,0,0,0,5.62,10.75c1.62,2.33,3.43,4.58,4.82,7.06s2.41,4.92.38,7.67c-1.44,2-.65,3.81,1.21,5a14.75,14.75,0,0,1,5.59,6.7c1.12,2.5,2.79,4.49,6,4.27a2.2,2.2,0,0,1,2.26,1.3c1.39,4.08,3.88,7.85,4.32,12.13.52,5,3,7,7.87,5.18a7.29,7.29,0,0,0,4.71-4.22c1-2.76,2.63-2.46,4.37-.67a15.4,15.4,0,0,1,4.37,8.34,72.08,72.08,0,0,0,2.66,11.66c.85,2.41,1.57,5.34,0,7.24s-3.08,5.19-6.84,3.88c-.45-.16-1.3.38-1.78.8-1.64,1.47-3.27,8.8-2.09,10.65a22.37,22.37,0,0,1,3.31,15.07,4.5,4.5,0,0,0,3.21,5.11c2.88.9,5.37,3.35,8,3.67,4.72.57,9.28,1.9,14,2.33,1.44.14,2.94-.26,4.4.19a6.56,6.56,0,0,0,8.05-3c1.87-3.15,3.48-2.47,5.16-.29,3.2,4.16,7.38,7.09,11.62,10,3.22,2.23,6.53,4.19,8.23,8.35,2.64,6.41.87,13.08,2.08,19.57.56,3,1.13,5.17,3.67,6.65a12,12,0,0,1,5.15,4.86c.57,1.14,1,2.29-.09,3.12-2.55,2-2.26,4.71-2.48,7.47-.32,4-.79,8.18-3.37,11.51-2.34,3-2.36,4.49.88,6.68a19,19,0,0,1,5.55,5.53,4,4,0,0,1-.55,5.35c-1.75,1.76-3.1.25-4.45-.77-1-.75-2-1.56-3-2.25a2.71,2.71,0,0,0-3.47.29c-2.46,2-3.2,10.11-.7,12,3.2,2.4,4.65,6.17,5.81,9.28a38.7,38.7,0,0,0,7.46,12.1,11.67,11.67,0,0,1,3.19,7.7,9.23,9.23,0,0,0,8,8.63c4,.45,5.76,2,6.57,6.23a16.94,16.94,0,0,0,5.18,9.09c1.51,1.48,3.85,2.93,5.51,1.37,3.18-3,7.5-2.53,10.95-4.47,1.12-.63,2.6-1.41,3.75,0s0,2.55-.56,3.77c-1.91,4.13-3.76,8.22-6.72,11.83-2.49,3-2.15,7.17.17,8.65a81.37,81.37,0,0,0,9,5,5.07,5.07,0,0,0,5.52-.6c1.05-.82,2.43-1.48,3.51-.84,3.67,2.16,7.63,2,11.63,2,1.34,0,2.29.94,3.18,1.85,1.83,1.87,3.79,3.23,6.67,2.62,2-.42,2.85.82,3.2,2.68a10.18,10.18,0,0,0,10.79,8.66,5,5,0,0,1,5,2.78,34.88,34.88,0,0,1,2.26,3.85c1,2.48,3,2.77,5.1,2.16,3.27-1,6.61-2,9.15-4.47a22.48,22.48,0,0,1,6-4c5.25-2.64,9.83-6.26,14.3-10,2.35-2,5.18-2.83,7.7-4.37a1.25,1.25,0,0,1,1.83.23,1,1,0,0,1-.49,1.46c-5.1,2-6.37,6.19-6.75,11a4.77,4.77,0,0,1-1.19,2.45c-3.84,4.68-5.6,10.37-7.9,15.83a44,44,0,0,1-3.69,7.32c-3.54,5.34-2,10.42.44,15.5a4.1,4.1,0,0,0,2.95,2.15,11,11,0,0,1,7.18,5.4,9.43,9.43,0,0,0,6.34,4.87,5.15,5.15,0,0,1,2.37,1.28,43.22,43.22,0,0,0,9.81,6.22c3.26,1.55,6.26,3.56,7.09,7.4a25.86,25.86,0,0,0,3.25,8.6c3,4.66,4.51,10,7,14.85a6.06,6.06,0,0,1,.48,3.69c-.75,4.88.6,6.39,5.43,5.31a8,8,0,0,1,6.09,1.06c4,2.16,8,.74,10.07-3.27,2.75-5.34,5.65-10.41,12.13-12.18,2.38-.65,3.5-2.92,3.25-5.48s1-4.13,2.67-5.91c3.68-3.83,8.92-6,11.42-11.14.74-1.51,2.59-1.9,4.25-1.07a55.21,55.21,0,0,0,11,3.8c5.75,1.53,9.68.29,12.78-4.64,3.74-6,5.94-6.55,11.52-2.44a8.24,8.24,0,0,0,8,1.24c1.38-.43,2.87-1.61,4.26-.85,3,1.64,5.51.75,8.08-.76,5.32-3.13,10.82-3.39,16.81-1.94,3.2.78,4.23,3.21,6.09,5.09a9.94,9.94,0,0,0,3.29,1.79c2.84,1.29,6.07,2.12,7,5.87.21.85,1.25,1.64,2.08,2.19,5.1,3.44,9.57,3.33,13.94-1.15,5.87-6,13-8,20.87-6.8a41,41,0,0,0,20.58-1.48c3.75-1.33,5.62-.54,7.63,3,.34.6.64,1.22,1,1.82,3,5.8,6.65,7.63,13.12,6.9,3.51-.4,7.09,0,9.53,2.74s5.57,5.08,8.27,7.7c3.12,3,6.68,3.18,10.13.54,1.21-.92,2.48-2.08,4-1.61,5.57,1.7,11.41.1,17,1.49,3.37.84,6.06.19,8.26-2.55,1.79-2.23,3.89-3.7,7-3.5a6.45,6.45,0,0,0,5.55-2.94,27.06,27.06,0,0,0,4.29-7.77c1.77-5.44,6-9.62,8-15,.49-1.32,2.15-2.65,3.27-1.72,3.26,2.68,6.53,2,10,1a3.64,3.64,0,0,1,2.28.53c3.75,1.94,8.62,2,10.87,6.51.17.33.74.53,1.17.67,3.73,1.27,5.48,5.13,8.9,6.82a1.37,1.37,0,0,1,.6,1.14c-1.06,3.66,1.82,5.4,3.69,7.54a6.52,6.52,0,0,0,9,.89,6.72,6.72,0,0,1,4.67-1.7,6.59,6.59,0,0,0,4.16-1.42,34.16,34.16,0,0,1,6.45-3.17c2.22-1,4-.65,5.44,1.3.61.79,1.2,1.75,2.42,1.72,5.59-.13,9.1,3.46,12.62,7a3,3,0,0,1,.63,3.49,16.31,16.31,0,0,0-1,6.06c-.18,3.74,2.93,7.11,6.6,6.66,2.1-.25,3.49.17,4.71,1.85,3,4.09,6.87,6.22,12.1,5.47a5.81,5.81,0,0,1,4.48,1.32c4.16,3.21,8,3.23,11.47-.68,2.88-3.27,5.88-3.58,9.44-2,4,1.71,6.78.15,9.2-3,2.75-3.53,6.15-3.55,8.68.11,1.66,2.41,3.89,2.85,6.52,3.62,5.08,1.49,11.74-.8,15,5.66a3.15,3.15,0,0,0,2,1.28c2.35.54,3.17,2.18,3.86,4.27,1.5,4.55,4.45,6.71,9.2,6.77a13.7,13.7,0,0,1,8,2.52,8.82,8.82,0,0,0,10.78-.63,6.55,6.55,0,0,1,4.47-1.6V796.65a7.49,7.49,0,0,0-1.8.47c-2.63,1-5.44.47-6.64-2-1.74-3.62-4.25-6.71-6-10.27C984.22,782.21,985.09,780.88,987.84,780.66Zm-371-180.2c-.09.07-.21.18-.29.16-5.53-.91-10.4,3.59-16.3,1.43-7.15-2.61-14.8-3.83-21.53-7.71-1.14-.66-2.4-1.14-2.46-2.53-.19-4.22-2.26-8.21-1.33-12.83-.18-1.76-.32-3.81-.6-5.84-.75-5.5,1.51-8.35,7-8.77.23,0,.5,0,.67-.07,6.57-4.27,13.44-1.42,19.77.07,5.51,1.28,11.34,3.39,15.33,8.16a8.25,8.25,0,0,1,2,4.29c.3,2.93.68,5.68,3.62,7.3a1.79,1.79,0,0,1,.65,1.49C622.77,591.22,621.62,596.65,616.85,600.46ZM807.27,453c-.42,2.49-2.66,2.38-4.61,2.61-2.15.25-4.28.69-6.33,1-3.17-.24-6.1-1.27-9.26-1.17a15.49,15.49,0,0,0-11.28,4.92c-1.43,1.49-2.91,2.92-4.37,4.38a4.16,4.16,0,0,1-3.28,1.6c-6-.51-11.44,1.09-16.74,3.85-2.17,1.13-4.81,1.36-7.25,1.95a32.61,32.61,0,0,0-6.95,2.86c-4.54,2.29-9.34,2.93-14.2.92a18.65,18.65,0,0,0-5.35-1.08,3.37,3.37,0,0,1-3.19-2.22c-.43-1.31.58-2.09,1.34-2.94a21.5,21.5,0,0,1,11.89-7,8.66,8.66,0,0,0,4.68-2.68c2.88-3.11,6.54-5.39,9.17-8.76.91-1.17,2.14-1.13,3.43-.88,1.47.28,3.14.68,4.36-.23,5.55-4.15,13.17-3.67,18.49-8.39,1.59-1.42,3.76-1.89,5.54.07,3.84,4.2,8.93,4.68,14.14,4.87,5.46.19,11-.51,16.21,2C805.67,449.66,807.7,450.49,807.27,453Z"/>
                <g id="waters">
                    <path id="lake-vipuris" :class="getWaterClass('lake-vipuris')" @click="selectWater('lake-vipuris')" :style="getWaterStyle('lake-vipuris')" @mouseover="hoverOn('lake-vipuris')" @mouseout="hoverOff('lake-vipuris')" d="M623.46,585.61c-.69,5.61-1.84,11-6.61,14.85-.09.07-.21.18-.29.16-5.53-.91-10.4,3.59-16.3,1.43-7.15-2.61-14.8-3.83-21.53-7.71-1.14-.66-2.4-1.14-2.46-2.53-.19-4.22-2.26-8.21-1.33-12.83-.18-1.76-.32-3.81-.6-5.84-.75-5.5,1.51-8.35,7-8.77.23,0,.5,0,.67-.07,6.57-4.27,13.44-1.42,19.77.07,5.51,1.28,11.34,3.39,15.33,8.16a8.25,8.25,0,0,1,2,4.29c.3,2.93.68,5.68,3.62,7.3A1.79,1.79,0,0,1,623.46,585.61Z"/>
                    <path id="great-lake" :class="getWaterClass('great-lake')" @click="selectWater('great-lake')" :style="getWaterStyle('great-lake')" @mouseover="hoverOn('great-lake')" @mouseout="hoverOff('great-lake')" d="M807.27,453c-.42,2.49-2.66,2.38-4.61,2.61-2.15.25-4.28.69-6.33,1-3.17-.24-6.1-1.27-9.26-1.17a15.49,15.49,0,0,0-11.28,4.92c-1.43,1.49-2.91,2.92-4.37,4.38a4.16,4.16,0,0,1-3.28,1.6c-6-.51-11.44,1.09-16.74,3.85-2.17,1.13-4.81,1.36-7.25,1.95a32.61,32.61,0,0,0-6.95,2.86c-4.54,2.29-9.34,2.93-14.2.92a18.65,18.65,0,0,0-5.35-1.08,3.37,3.37,0,0,1-3.19-2.22c-.43-1.31.58-2.09,1.34-2.94a21.5,21.5,0,0,1,11.89-7,8.66,8.66,0,0,0,4.68-2.68c2.88-3.11,6.54-5.39,9.17-8.76.91-1.17,2.14-1.13,3.43-.88,1.47.28,3.14.68,4.36-.23,5.55-4.15,13.17-3.67,18.49-8.39,1.59-1.42,3.76-1.89,5.54.07,3.84,4.2,8.93,4.68,14.14,4.87,5.46.19,11-.51,16.21,2C805.67,449.66,807.7,450.49,807.27,453Z"/>
                </g>
            </g>
            <g v-if="terrain == 'east_genesaris'" id="east_genesaris">
                <path id="body" :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M802.29,491.57c-3.26-.26-6-1.2-7.83-4.14a3.73,3.73,0,0,0-4.44-1.75c-1.77.45-3.55.37-4.74-1.14a107.38,107.38,0,0,0-15.12-15.84,4.82,4.82,0,0,1-1.62-5.54c1.48-4.85,1.23-5.28-3.45-7.61-1.78-.88-3.58-1.83-3.94-4-.77-4.6-1.86-9.2.14-13.83.75-1.75,1.85-3.71,1.23-5.61-1.37-4.28,0-8.84-1.13-12.88-1.36-4.95.16-9.09.94-13.69.63-3.73,1.5-6.73,4.42-9.15,2.53-2.1,2.63-4.72.14-6.74-4.2-3.43-4.23-8.55-5.09-13-1.31-6.71-3.38-13.52-1.95-20.57a3.57,3.57,0,0,0-.24-2.36c-2.32-3.81-1.65-8-1.49-12.07.18-4.44-1.94-7.43-4.92-10.43s-6.57-5.69-9.18-9c-2.78-3.54-7-5.11-9.82-8.4a2.27,2.27,0,0,0-2.27-.51,7.66,7.66,0,0,1-6.28-.75,2.56,2.56,0,0,0-2.62.17c-3.55,2-7,1.16-10.44-.35a3.26,3.26,0,0,0-2.26-.21c-5.3,1.21-8.29-.68-9.49-5.92a19.61,19.61,0,0,1-.54-3.39,5,5,0,0,0-2.77-4.46c-2-1-3.29-2.66-4.71-4.33-2.72-3.22-5.42-6.64-8.78-9.08a12.22,12.22,0,0,1-4.8-6.69c-.73-2.33-1.81-4.82-4-5.76-3.8-1.6-5.46-5.05-7.92-7.82-3.94-4.43-5-10.83-10-14.58a3.74,3.74,0,0,1-.93-2.51c-.21-3.73-1.33-7.4-.16-11.22.55-1.79,1-4.27-.29-5.67-3.14-3.52-4.12-8.11-6.56-11.93-2.06-3.23-7.35-6-9.12-4.32-2.7,2.51-5.08,2.39-7.91.65a4.4,4.4,0,0,0-2-.39c-4.67-.28-9.41-.32-12.39-4.91a2.52,2.52,0,0,0-2.35-1.23c-3.16.33-4.68-1.77-6.31-3.92-2.21-2.92-5.83-2.95-8.22-.16a8.66,8.66,0,0,0-2.22,4.95c-.17,2.33-.81,4.08-3.19,5.14-1.53.69-1.89,2.47-1.94,4.16-.09,2.86-1.54,4.8-3.81,6.52-4.07,3.08-8.16,6.07-12.49,8.81-4.05,2.56-7.82,5.06-12.88,4.58-2.69-.25-4.51.95-5.44,3.69-.76,2.26-2.58,3.69-5.07,3.08-4.32-1.06-6.91.89-9.63,4A8.68,8.68,0,0,1,535,252c-2.89-1-4.2-3.35-4.41-6.66-.23-3.78-3-6.17-6-8.32-4.44-3.21-10.66-4.26-12.72-10.46-.37-1.14-1.74-1.67-2.9-2.25-3.15-1.58-6.8-2.82-9.24-5-5.2-4.63-11.11-4.18-17.1-4.21a7,7,0,0,1-4.45-1.44c-3-2.31-6-4.62-8.79-7.12a7,7,0,0,0-4.86-2.16c-7.36.09-11.71-4.35-15-10.16s-6.24-6.55-11.58-2.86c-3.75,2.6-6,2.51-9.05-.61-6-6.16-13.35-10.7-20.1-15.95a8.29,8.29,0,0,0-3.45-1.42c-8.46-1.78-15.23-7-22.18-11.6-4.35-2.88-13.24-4.24-17.67-.95-5,3.74-9.72,7.8-15.75,10.1-2.62,1-5,1.47-7.17.23-2.82-1.6-5.95-2.27-8.81-3.73-5.18-2.65-9.06-.87-10.86,4.7-.49,1.55-.75,3.43-2.11,4.2a8.37,8.37,0,0,0-4.63,7.43c-.09,1.78-1.53,2.49-3.17,2.47s-3-1-2.87-2.75c.18-3.59-.19-6.85-3.44-9.12-.31-.21-.43-.8-.5-1.24-.94-5.94-4.18-10.78-7.43-15.62-2.31-3.44-4.83-6.29-5.8-11a73.34,73.34,0,0,0-5.68-15.62c-1.77-3.78-3.49-3.88-6.33-.82-2.1,2.25-2.87,5.18-4.34,7.74-1.06,1.87-2.17,2.79-3.61.28-1.11-2-2.94-2.34-5-2.16-4.2.35-7.47,2.67-10.72,5-1.57,1.14-3,2.71-5.07,2.64-6.44-.22-12.25,2.64-16.8,6.09s-8.56,6.59-13.77,8.56c-1.48.56-2.74,1.53-4.45,1.33-2.93-.35-4.17,1.19-4.41,3.94a29.48,29.48,0,0,1-2.77,9.14c-1,2.2-3.05,4-3,6.46,0,4.49-2.43,7.22-5.45,10.11-5.24,5-3,14.23,3.54,17.16a26.87,26.87,0,0,0,6.61,1.52c5.15.92,9.12,4.52,14.2,5.59,2.2.47,4.5-.95,6.59.84,4.28,3.65,9.07,6.8,12.73,11.08,2,2.31,4.49,5.21,3.64,8.54-.95,3.73-.21,7.14.89,10.41,1.38,4.1,1.07,8,.61,12.13-.48,4.31-2.32,9.11,1.78,13a1.68,1.68,0,0,1-.23,2.49c-2.91,2.44-5.86,4.91-10.09,4-5.1-1.07-10-3-15.39-2.82-2.12.08-3.78.27-5.21,1.76a24.55,24.55,0,0,0-3.54,5.4c-1.82,3.29-2.69,7.12-4.67,10.16a51.34,51.34,0,0,0-6.37,15.22c-.61,2.29-.68,4.49-3.63,5a2.76,2.76,0,0,0-2.06,2.54c-.33,6.12-2.87,11.74-3.94,17.68-.71,3.92-2.45,5.15-6.5,4.73-3.49-.36-6.84-.49-9.59,2.33a3.79,3.79,0,0,1-3.57.71c-5.49-1.06-10.86,1.85-12.22,6.94-1.06,4-4.67,4.8-7.48,6.44-1.86,1.08-2.64-1.65-4-2.5-2.33-1.46-4.55-3.56-7.5-2-4.39,2.31-9.14,3.53-13.81,5a4.1,4.1,0,0,0-3.1,2.93c-.62,3.43-2.46,6.34-3.52,9.5-1.67,5-5.08,6.63-9.52,7.58-5.81,1.24-11.8,2-17.38,3.95A35,35,0,0,1,86,378.27c-5.5-.14-8.14-3.95-6.18-9.09a74.86,74.86,0,0,1,4-8c1.55-2.93,3.35-5.76,3.05-9.3S88.16,346,91,344.2c1.16-.76,2.65-1.5,2.47-3-.31-2.68.88-4.61,2.44-6.49s1.86-3.57.17-5.54a3.16,3.16,0,0,1,.49-4.88c3.84-2.29,5.22-6.21,7.37-9.65a10.85,10.85,0,0,1,6.69-5,8,8,0,0,0,6.23-6.5,11.81,11.81,0,0,1,7.83-8.87,9.17,9.17,0,0,0,5.73-5.08,6,6,0,0,1,4-3.48,13.74,13.74,0,0,0,8.22-7.34c1-2,1.09-4.16-.78-5.63s-3.73-4.51-7.06-2.36c-1.18.78-2.4,1.37-3.82.46-5-3.17-10.79-1.28-16.1-2.58-.84-.2-2,.5-2.88.9-5.15,2.21-10.21,4.79-16,4.6-5.61-.17-11.09,1.3-16.72,1.13-2.7-.09-5.26-.78-6.17-2.91-1.82-4.23-5.47-8-4.24-13.25.41-1.75-.78-3.12-2.13-4a53.91,53.91,0,0,0-6-3.31,4,4,0,0,0-4.55.38c-2.65,2.38-4.57,2-6.78-.73s-5.31-2.55-8.25-1.65c-2.73.84-3.88,3-3.65,5.89.08,1.08-.16,2.29-1.42,2.39-2.86.23-4.73,2.08-6.86,3.61-.71.52-1.77,1.64-2.68.56-.64-.76.17-1.83.69-2.47,3.21-4,2.68-9.35,5.2-13.6.6-1,.42-2.76.08-4-.74-2.72-1.93-5.25-5.28-5.54a6,6,0,0,0-6.66,4.25c-.67,1.82-1.56,3.73-1.54,5.59.08,5.62-3.45,9-7,12.41-1.3,1.24-2.83,1.65-4.38.65-2.73-1.74-5.14-3.79-6.21-7.06A12.53,12.53,0,0,0,0,249.19v527c2.81,0,5.51.63,7.47,2.87,2.52,2.87,5.57,5.08,8.27,7.7,3.12,3,6.68,3.18,10.14.54,1.2-.92,2.47-2.08,4-1.61,5.57,1.7,11.41.1,17,1.49,3.37.84,6.07.19,8.26-2.55,1.79-2.23,3.89-3.7,7-3.5a6.45,6.45,0,0,0,5.55-2.94A26.82,26.82,0,0,0,72,770.4c1.77-5.44,6-9.62,8-15,.48-1.32,2.14-2.65,3.26-1.72,3.26,2.68,6.53,2,10,1a3.64,3.64,0,0,1,2.28.53c3.75,1.94,8.62,2,10.87,6.51.17.33.74.53,1.17.67,3.73,1.27,5.48,5.13,8.9,6.82a1.37,1.37,0,0,1,.6,1.14c-1.06,3.66,1.82,5.4,3.69,7.54a6.53,6.53,0,0,0,9,.89,6.73,6.73,0,0,1,4.68-1.7,6.63,6.63,0,0,0,4.16-1.42,33.78,33.78,0,0,1,6.44-3.17c2.22-1,3.95-.65,5.44,1.3.61.79,1.2,1.75,2.42,1.72,5.59-.13,9.1,3.46,12.62,7a3,3,0,0,1,.63,3.49,16.31,16.31,0,0,0-1,6.06c-.18,3.74,2.93,7.11,6.6,6.66,2.1-.25,3.49.17,4.72,1.85,3,4.09,6.86,6.22,12.09,5.47a5.81,5.81,0,0,1,4.48,1.32c4.16,3.21,8,3.23,11.48-.68,2.87-3.27,5.87-3.58,9.43-2,4,1.71,6.78.15,9.21-3,2.74-3.53,6.14-3.55,8.67.11,1.67,2.41,3.89,2.85,6.52,3.62,5.09,1.49,11.74-.8,15,5.66a3.15,3.15,0,0,0,2,1.28c2.35.54,3.17,2.18,3.86,4.27,1.5,4.55,4.45,6.71,9.2,6.77a13.7,13.7,0,0,1,8,2.52,8.82,8.82,0,0,0,10.78-.63,6.93,6.93,0,0,1,5.05-1.61c6.63.07,8.46-1.13,10.56-7.32.85-2.51,2.41-3.53,4.91-3.23,6,.74,12.12.53,17.68,3.44a5.68,5.68,0,0,0,3.7.47,6.27,6.27,0,0,0,5-4.66c.64-2.22-1.29-3.26-2.82-4.21-2.52-1.57-5.24-2.83-7.2-5.19a1.78,1.78,0,0,0-2.13-.72c-4.57,2-8.5.49-12.27-2.1-2.85-2-5.87-3.1-9.36-1.91a4.66,4.66,0,0,1-4.26-.6,6.35,6.35,0,0,0-6.19-.56c-2.63,1-5.44.47-6.64-2-1.74-3.62-4.25-6.71-6-10.27-1.31-2.63-.44-4,2.31-4.18q7.86-.6,15.75-1c2.79-.16,5.54-.11,7.15,2.85a2.14,2.14,0,0,0,2.1,1c4.44-.45,8.88.24,13.3.33,5.28.11,10.47-2.75,15.76-.38.76.34,1.57-.16,2.24-.63a3.61,3.61,0,0,1,2.95-.47c4.58,1,9.15,2,13.74,2.84,3.56.69,7.25,2.84,10.54-.77a1.6,1.6,0,0,1,1.94,0c5.84,3.42,11.2,1.35,16.39-1.57,1.84-1,3.65-1.62,5.51-.67,3.41,1.75,7,1.92,10.69,1.82a7.83,7.83,0,0,1,5.5,1.48c3.28,2.72,6.51,2.24,9.73-.07,1.2-.86,2.29-2,3.94-1.85,5.3.5,10.42-1.43,15.7-1.16,3.58.18,5.71-1.77,6.17-5.12.36-2.56,1.71-3.52,4-3.88a6.88,6.88,0,0,0,2.95-.81c2.57-1.88,3.66-.32,5.58,1.38,4.21,3.74,8.76,7.28,15.14,6.19,4.87-.83,9.38-2.77,14-4.4,4-1.4,4.49-3.89,2.45-7.69-.45-.85-.91-1.74-.45-2.6,1.91-3.55,1.64-7.55,2.47-11.32.51-2.32,1.48-4.4,4.06-5.07,2.21-.57,4.45-1,6.66-1.58a6,6,0,0,1,4.9.73,12.42,12.42,0,0,1,4,4c4.15,6.07,10.54,8,17.42,9,6.63,1,11.88-3.4,11.59-10.15-.08-2,.57-2,1.92-1.3,1.74.84,3.49,1.68,5.2,2.59,2.49,1.34,4.19.38,5.35-1.86,5.21-10,13.23-8.89,20.61-3.27,4.49,3.42,8.7,7.19,15.32,5.41,5.17-1.39,10.75,0,16.05-1.13,4.51-1,8.51-2.9,10.25-7.59.68-1.82,1.32-3.64,2.12-5.42a9.78,9.78,0,0,0-3.39-12.35,4.32,4.32,0,0,1-1.63-4.88,16.35,16.35,0,0,0,.35-6.81,7.1,7.1,0,0,1,1.07-5.49c2.52-4,1.65-9.5-1.58-12.19-3.45-2.88-6.67-5.86-6.66-10.93,0-1.64-1.31-2.87-2.48-4a26.54,26.54,0,0,0-6.29-4.11c-5-2.58-5-2.65-8.1,2a4.33,4.33,0,0,1-4,2.08c-1.23,0-2.55-.36-2.65-1.67a10.35,10.35,0,0,0-4.8-8.21,3.47,3.47,0,0,1-.89-2.14c-.92-5.12-2.57-6.87-7.47-7.78a1.76,1.76,0,0,1-1.41-1.33,4.62,4.62,0,0,0-1.78-2.46c-1.61-1.15-1.76-2.46-.77-4.14,2.12-3.59.88-7.43.35-11.07-.46-3.1-3.89-4.38-7.11-4.18-3.39.22-7.86,1.23-9.8-2-3-4.93-7.34-8.41-10.89-12.7a36.9,36.9,0,0,0-19.19-12.7c-.89-.24-2.21-.63-1.76-1.64,1.52-3.47-.58-6.84-.13-10,.94-6.65-.51-12-5.94-16.09a2.4,2.4,0,0,1-.39-3.88c1.2-1.26,2.75-2,4.23-.58,2.31,2.19,5.08,2.51,8,2.29a10.46,10.46,0,0,1,8.53,2.88c1.81,1.94,3.42,2.38,5.6,1.84,3.32-.82,4.71.16,4.31,3.74-.32,2.9.89,5.53,4,5.88a11.07,11.07,0,0,1,6.55,3.24c2.39,2.21,5,2.8,7.58.27,1.33-1.28,2.71-1.33,3.83.13,1.46,1.9,3.32,2.07,5.5,1.94a10.25,10.25,0,0,1,7.72,2.22,7.75,7.75,0,0,0,4.46,1.62c2.46.22,3.77,1.36,4.68,3.74,1.9,5,4.52,6.27,10.16,5.69a2.51,2.51,0,0,1,2.24.54c1.79,1.9,4.29,2.26,6.57,2.66,3.54.62,5.45,2.69,6.49,5.83a7.51,7.51,0,0,0,3.06,4.41,5.12,5.12,0,0,1,2.61,5.5,10.07,10.07,0,0,0,3.86,9.71,7.11,7.11,0,0,1,2.62,4c.64,3.35,3.15,4.92,5.67,6.48,5.34,3.28,9.34,1.51,10.84-4.7.11-.45.11-.92.22-1.36,1.07-4.38,3.95-6,8.19-4.48,1.24.44,2.61,1,3.53,0,2.17-2.52,6.12-1.92,8-4.84.43-.65,1.45-.37,2.27-.18,3.84.91,7.71-.41,9.14-3.82,1.87-4.45,5.46-7.6,7.86-11.61,1.45-2.41,3.59-3.44,6.45-2.38a9.46,9.46,0,0,0,4.4.14c4.74-.55,9.45-1.52,14.29-.94,2.12.25,5.07.61,6-1.41,1.52-3.31,4-2.87,6.57-2.92,3.61-.06,5.88-1.71,7.31-5.1,3.39-8.09,8.36-15,16.48-18.93,3-1.47,3.71-3.36,3.32-6.59-.72-6.13-4.51-10.94-6.55-16.48-.72-2-.58-3.17,1-4.46,1.83-1.52,3.29-3.36,2.42-5.95-1.27-3.77-2-7.72-4.48-11.07-1.86-2.52-.71-4.64,2.45-4.91a10.37,10.37,0,0,1,5.38.76c2.49,1.17,5.06,2.15,7.47,3.46,6.47,3.52,13.24,2.88,20.07,1.66A5.49,5.49,0,0,0,767,545a112.1,112.1,0,0,0,12.62-22.28,5.15,5.15,0,0,1,2.79-2.94c4.44-1.53,8.07-4.85,12.69-5.88,6.25-1.41,9.94-6,13.19-10.79C811.07,499.06,807.17,492,802.29,491.57ZM98.83,453c-.42,2.49-2.66,2.38-4.61,2.61-2.15.25-4.28.69-6.33,1-3.17-.24-6.1-1.27-9.26-1.17a15.49,15.49,0,0,0-11.28,4.92c-1.42,1.49-2.91,2.92-4.36,4.38a4.2,4.2,0,0,1-3.29,1.6c-6-.51-11.44,1.09-16.74,3.85-2.17,1.13-4.81,1.36-7.25,1.95a32.61,32.61,0,0,0-6.95,2.86c-4.54,2.29-9.34,2.93-14.2.92a18.65,18.65,0,0,0-5.35-1.08A3.37,3.37,0,0,1,6,472.69c-.43-1.31.58-2.09,1.34-2.94a21.5,21.5,0,0,1,11.89-7,8.66,8.66,0,0,0,4.68-2.68c2.88-3.11,6.54-5.39,9.17-8.76.92-1.17,2.14-1.13,3.43-.88,1.47.28,3.14.68,4.36-.23,5.56-4.15,13.17-3.67,18.49-8.39,1.59-1.42,3.76-1.89,5.54.07,3.84,4.2,8.93,4.68,14.15,4.87,5.45.19,11-.51,16.2,2C97.24,449.66,99.26,450.49,98.83,453ZM440.12,279.59c5.15-4,10.27-7.87,17.16-8.41,4-.31,9.67,4.67,9.43,8.63,0,.69-.1,1.37-.15,2.05h.12c-.2,3.3-.3,6.6-.61,9.88-.51,5.48-5.14,8.32-10.52,7.46-2.9-.46-6-1.16-9.14-.17-2.53.78-4.54-1-4.83-3.59-.49-4.37.26-8.9-2.52-12.87C438.39,281.62,439.15,280.33,440.12,279.59Zm-128-43.19c2.12-2.15,5.46-3,6.57-6.28.38-1.16,1.44-.43,2.24.16,4,2.89,6.42,2.15,8.25-2.32a38,38,0,0,1,2-4c1.28-2.3,1.67-4.32-.59-6.45-1.74-1.65-.84-3.89,1.78-5a5.81,5.81,0,0,1,2.66-.46c6.19.52,10.31-2.15,12.55-7.89.44-1.15.77-2.53,2.41-2.52a3.55,3.55,0,0,1,3.32,2.58c1.45,3.84,2.95,7.67,3.4,11.81.57,5.12,1.36,5.63,6.43,5.81,4.9.18,9.16,2.34,13.3,4.89a13.6,13.6,0,0,1,6.47,8.93c.74,2.82,4.29,4.9,2,8.54,3.25,5.09-.48,9.72-1.11,14.52-.29,2.17-.67,4.13-.1,6.33,1,3.93.14,5-3.74,5.34a6.44,6.44,0,0,0-2.34.43c-5.64,2.88-11.89,1.78-17.35,2.73-2,.15-3.15-.37-3.86-1.77-2.31-4.55-6.8-7.4-9.25-11.85a3,3,0,0,0-1.46-1.41c-8-2.64-10.29-10.05-13.84-16.42a6.19,6.19,0,0,0-6.53-3.49c-2.68.33-3.93,2-4.2,4.64a2.64,2.64,0,0,1-.69,1.5c-1.43,1.4-6.44.31-8.52-1.81S310,238.63,312.15,236.4ZM331.8,738.91a41.2,41.2,0,0,1-4.24,1.75c-2.37,0-3.31-1.43-4.43-2.54-7.36-7.29-7.38-7.31.38-13.78a15.46,15.46,0,0,1,3.22-1.89c.66-.32,1.47-.94,2.19-.18.56.6,0,1.27-.13,1.92-.67,4.19-.79,8.18,3.31,11C333.89,736.43,333.68,737.91,331.8,738.91Zm151.11-205c-2.33,2.94-2.45,6.34-2.2,9.79a10.17,10.17,0,0,1-2.91,8.43,7.42,7.42,0,0,0-2.1,3.49c-.9,3.76-3.56,5.23-7.1,5.11-5.3-.17-8.93,2.48-11.59,6.63-1.87,2.91-4.36,5.46-4.5,9.42-.07,2.12-2.4,2.9-4.53,2.61a5.31,5.31,0,0,0-4.43,1.24c-3.19,2.62-7.26,3.07-11.05,4.2-1.52.45-3.21.37-4.7.9-5.6,2-10-.56-14.14-3.7-1.72-1.3-3.12-3-4.75-4.46-4.4-3.89-9-3.9-13.37-.11-5.21,4.54-6.93,4.66-12.44.56a48.23,48.23,0,0,1-4.56-4.15c-2.25-2.17-4.72-1.74-7.34-.85s-2.31,2.73-2.24,4.75c.07,2.46-1.2,3.53-3.71,4-5.5.9-9.59-2.41-14.15-4.28-1.09-.45-1.16-1.6-1.09-2.68.31-4.2-.83-7.2-5.05-9.43-3.52-1.86-6.26-5.24-9.23-8.07-1.52-1.44-3.17-2.37-5.23-2-2.73.54-4.73-.79-6.42-2.49-1.85-1.86-3.48-3.92-5.37-5.76-1.61-1.57-1.26-3.37.64-4.61,3.41-2.23,6.76-4.57,10.35-6.48a14,14,0,0,0,7.71-10.26c.56-3,2.27-4.48,5.36-4.78,3.36-.33,6.55-1.32,10.11-.34a10.11,10.11,0,0,0,7.33-1,5.39,5.39,0,0,1,4.64-.35c5.28,2,9.19-.61,11-5.65a42.53,42.53,0,0,1,6.1-10.68,13.57,13.57,0,0,1,7.46-5.06c3.86-1.18,6.38-4.44,7.76-8.13a21,21,0,0,1,5.59-8.85,7,7,0,0,0,2.41-5.48c0-1.42-.08-3,2.34-4.07,0,5.14-.06,9.79,0,14.44.1,5.88,3.12,7.76,8.7,6.4,5.27-1.28,10.71-2.19,15.61,1.82,2.94,2.42,6.13,1.4,8.83-.69a13.11,13.11,0,0,1,6.77-2.88c3.37-.42,6.36-1.88,8-5.21.59-1.19,1.32-2.19,2.91-1.74s2.9,1.11,3.31,3c.84,3.86-.66,7.36-1.41,11-.8,3.94-3.67,7-4.39,11.06-.64,3.61-.19,4.9,3.36,5.16,5.51.41,10.2,3.84,15.91,3.74,3.19-.06,5,3.53,4.33,6.76-.56,2.62,1,4.34,2.68,5.88C483.39,531.27,484.08,532.45,482.91,533.91Zm40.38-253.32c-2.14,1.53-3.71,3.21-4,6-.24,2.41-2,3.79-4.22,4.45a21.33,21.33,0,0,1-5.67,1.19c-2.9,0-5.27.53-7.06,3.15-1.23,1.8-3.35,1.67-5.34,1.16s-1.93-2-2.05-3.51a7.61,7.61,0,0,0-3.09-5.85c-2.13-1.57-2.47-3.51-.3-5A14.33,14.33,0,0,0,498,270.41a6.24,6.24,0,0,1,5.42-5.84,35,35,0,0,0,7.12-2.36c4.89-2.09,9.34.44,13.84,1.86a2.38,2.38,0,0,1,1.38,2.23c.19,2.95,0,5.95,1.25,8.48C526.75,277.6,525.15,279.26,523.29,280.59ZM585.18,286c-3-.91-4-2.83-1.78-5.16,2.58-2.75,3.63-5.41,2.37-9.26-.8-2.41.9-4.58,3.23-5.82a18.48,18.48,0,0,0,7.13-6.23c.6-.92,1-2.28,2.44-2.05s2.08,1.69,2.5,3a18.88,18.88,0,0,1,.42,2.85c-.58,2.66-1.19,5.43-1.78,8.2A9.23,9.23,0,0,0,602.8,281c.43.37.8.82,1.19,1.23,4.46,4.75,3.16,9.6-3.14,11.61-2.29.73-4.26.32-5.71-1.82C592.76,288.53,589,287.11,585.18,286Zm12,46.84c-1.81.2-3.61.56-4.9.76-3.61,0-4.66-1.82-3-4.48a5.89,5.89,0,0,1,2.33-2.43c2.66-1.07,4.13-3.11,5.36-5.5a3.38,3.38,0,0,1,4.68-1.63c2.09,1,4.33,1.43,6.43,2.33,2.84,1.21,3.14,3.25,1,5.56C605.77,330.86,601.7,332.32,597.14,332.81Zm41.28,145.67c-.27,3.43-2.11,4.42-4.92,2.53-2.3-1.55-4.83-1.21-7.3-1.09-3.81.19-7.28.38-10.4-2.88-2.23-2.33-6-1.67-9.15-2.14-.79-.12-1.75,0-2-1-.34-1.08.47-1.75,1.32-2.12,6-2.58,11.8-5.59,18.23-5.63,1.44.13,2.58.28,3.72.34C634.71,466.84,639,471.64,638.42,478.48Zm20-14c-1.83-.48-2.12-2.22-2.38-3.82a16,16,0,0,1,0-2.2c.53-1.75-.77-3.05-1.52-4.56-2.57-5.2-2.12-8.41,3.73-10.3.65-.21,1.3-.42,1.94-.67,1.57-.62,3.2-1.69,4.65.09s1.95,4,.47,5.69c-2.32,2.71-2.44,5.74-2.26,9a6,6,0,0,1-1.09,4.21C661,463.06,660.47,465,658.41,464.44Zm9.18,35.92a17,17,0,0,0-1.07,5.64c-.12,2.08-1.12,4.15-3.27,4.12-2.45,0-2.69-2.63-3.3-4.24-.08-2.44,4.4-7.36,6.53-7.4C667.81,498.46,668,499.41,667.59,500.36Zm14.78-72.11c-.49,2.37-2.57,2.21-4.44,2.29a20.55,20.55,0,0,1-7.91-2,8.64,8.64,0,0,0-4.63-1c-2.14.18-4.06,0-4.15-2.74s.78-5.4,3.6-5.35c4.09.07,8.5,0,11.85,3.21a9.58,9.58,0,0,0,2.83,1.88C681.16,425.22,682.81,426.14,682.37,428.25Z"/>
                <path id="stonehaven" :class="getAreaClass('stonehaven')" :style="getAreaStyle('stonehaven')" @mouseover="hoverOn('stonehaven')" @mouseout="hoverOff('stonehaven')" d="M167.47,171.09A60.55,60.55,0,0,0,169.11,188c.76,3.14,1.92,6.12,4.78,8.44,3.55,2.89,2.65,7.73,3.63,11.72.26,1.05-.8,2.27-1.79,2.76-5.93,2.92-11.5,7.52-18.84,4.26a3.91,3.91,0,0,0-3.34,0,3.88,3.88,0,0,1-3.91-.36c-.57-.34-1.39-.84-1.87-.66-3.27,1.24-6.68.19-10.12,1a158.84,158.84,0,0,1-16.06,2.76c-2.51.32-4.54-1.42-6.67-2.45a15.65,15.65,0,0,1-7.21-21.88,7.14,7.14,0,0,0,1-2.54c.45-4.3,1.7-7.8,6.74-8.55,1.46-.21,1.45-1.81,1.72-3.05,1.45-6.74,4.85-8.23,10.81-4.81,3.23,1.85,8.72.87,12.55-2.29.88-.74,1.68-1.81,2.83-1.84,6.61-.12,11.42-4.68,17.19-6.88C165.11,161.89,168,164.48,167.47,171.09Z"/>
                <path id="arlais" :class="getAreaClass('arlais')" :style="getAreaStyle('arlais')" @mouseover="hoverOn('arlais')" @mouseout="hoverOff('arlais')" d="M662.16,680.28c5.16,3.26,12.08,1.17,18,4,1.93.91,4,.76,6.07.76,10.87,0,21.73-.08,32.59.13,3.86.07,7.71.69,11.6.76a7.2,7.2,0,0,1,6.33,4.14c3.13,6.1,6.86,11.87,9.49,18.22.21.52.63,1.08.58,1.59-.44,5.2-.66,10.45-1.58,15.57-.46,2.51-3.19,3.07-5.35,2.06a7.38,7.38,0,0,0-7.44.61,6.23,6.23,0,0,1-5.9.19c-3.48-1.41-7.31-1.41-10.95-2.28-2.84-.68-6.2,1.46-8.28,4-2.74,3.35-5.83,4-10.15,4-3.51,0-7.17-.74-11,.6-6,2.11-11.87-.16-16.68-3.91-4.1-3.19-8.85-5.84-10.34-11.82-.75-3-4.46-4.75-7.06-6.76-2.85-2.19-4.49-4.67-4.08-8.44a10,10,0,0,0-2.31-7.33c-2.36-3.06-2-6.77.6-9.68,1.1-1.23,2.34-1.61,3.48-.23,2.36,2.87,5.82,4,8.86,5.72,1.16.66,2.86,1.36,3.79.09s-.84-2.06-1.59-2.94-1.61-1.62-2.37-2.47c-1.15-1.3-3.37-2.3-2.14-4.49C657.39,680.48,659.51,680.33,662.16,680.28Zm-22.8-4.94c.09,2.57,3.63,6.07,6.15,6.08,1.82,0,5.17-3.68,5.22-5.77.07-2.38-3-4.56-6.3-4.55C641.25,671.12,639.27,672.78,639.36,675.34Z"/>
                <path id="nvengaria" :class="getAreaClass('nvengaria')" :style="getAreaStyle('nvengaria')" @mouseover="hoverOn('nvengaria')" @mouseout="hoverOff('nvengaria')" d="M462.73,892.25c-14.51,1.32-27.84-1.53-41.2-2.32-10.51-.62-21.35-5.11-30.88-10.11-7.95-4.17-12.39-12.78-13.86-22-1.09-6.88-.84-13.87-2.07-20.82-1.58-9,10.61-27,19.21-29.93,2.2-.77,4.64-1,6,1,2.39,3.57,3.41,7.67,1.65,11.83-5,11.9-3.18,19.55,6.91,27.28a9,9,0,0,1,3,4.17c2.43,6.66,8.2,10,13.59,13.69,1.81,1.26,3.45,1.21,5.46.16a29.11,29.11,0,0,1,19.64-2.72c4,.81,7.46.41,10.27-2.54,4.39-4.6,11-3.22,16.18-6.35,5-3,5.91-6.54,5.45-11.29a39.26,39.26,0,0,0-6-16.49c-1.93-3.22-2.24-6.46,1.24-8.6,3.24-2,5,1,7.07,2.91,8.69,7.83,13.71,17.77,16.73,28.82,2.74,10,2,24.26-11.42,29.26-4.81,1.8-9,4.35-12.06,8.63C473.73,892.46,467.62,892.18,462.73,892.25Z"/>
                <path id="orisia" :class="getAreaClass('orisia')" :style="getAreaStyle('orisia')" @mouseover="hoverOn('orisia')" @mouseout="hoverOff('orisia')" d="M849.57,461.38c1.34-1-3.57-4.87-4.42-6.19a18.38,18.38,0,0,1-1.67-4.16c.12-2.09,2.36-1.61,2.68-2.57-.09.28-1.66-1.9-1.67-1.91a1.86,1.86,0,0,0-1,.25,5.06,5.06,0,0,0-.46-3c-.42-.39-3.37-.34-3.53-.33s-.38-3.17-.46-3.39,0-1-.22-1.4c-.11-.23-1.23-.07-1.22-.06,0-1.66-.25-2.72-1.16-3.46-1.6-1.3-4.06-1.05-5.07-1.15a8.87,8.87,0,0,0-5,.55c-.76.32-1.71.6-2.2.81-1,.41-2,1.11-3.08,1.57-2.6,1-3.17,1.05-5.81.52a6,6,0,0,1-3.53-1.73c-1.11-1.06-1.76-2.66-3.28-3.26-1.2-.47-1.74,2-2.34,0-.07-.24,1.57-1.78,1.61-2.57s-1-1.91-1.28-2.59c.17.41-.95-2.31-.65-1.86-.32-.48-1.91-1.33-2-1.7-.11-1.06,1.31-1.61,1.21-2.74-.16-1.69-2.58-2.05-3.35-2.87a7.38,7.38,0,0,1-2.16-3.94c-.17-.87,1.33-3.37-1-3.71-1.08-.15-2.85,3.35-3.22,4.48-1.08,3.22.43,6.65-2.52,9.18-1.87,1.61-3.22,1.55-4.51,3.76a25.06,25.06,0,0,1-1.36,2.55c-.51.69-1.63,1.17-2,2.19-.47,1.4.28,3.43.37,4.48.12,1.25-1.28,4.38,1.82,3.78,2,.3-.19,5.33-.11,5.66.38,1.57.45.31,1.49,1.39.88.92-.1,1.27,2,2-.58-.19.48,2,1.71,2.45.85.29.54-1.19,1.3-1,1.19.34,1.68,1.36,2.2,2,.12.14-.48.88-.24,1.24.38.54.93.21,1.18.61.53.83,1.48,1.4,2,2.29s0,1.2.49,1.94a7.84,7.84,0,0,0,1.54,2c.4.29,2.58,0,2.65.08.42.52,3,4.52,3.4,4.61,1.39.33,1-.75,2-1a14.09,14.09,0,0,1,3-.32c1-.07,1.4-.5,2.74-.29.61.1,1.81,1,2.72,1.14,1.33.21,3-.87,4.74-.68,2.13.23,3.19,1.68,5.37-1.2.3-.39,0-1.15.83-2,.54-.59,1.76-.69,2.19-1.22s-.28-.89.07-1.36c1.46-2,2.67-3.44,5.06-3.31a7.11,7.11,0,0,1,2.85.94c.31.17,1-.1,1.13,0a.94.94,0,0,1,.46,1c1.43,1.26,2.52,2.63,3.78,3.65,0,0-.48.72.1,1.17.39.31,1.44.11,1.93.23s2.39-.07,2.66.07c.5.26.38,2.05,1.42.43C850,463.12,848.57,462.09,849.57,461.38Zm-19.34-16.26c-1.31.94-.24,2.43-.31,2.51s-3.88-.39-4-.43c-.61-.3.19-2.37.7-2.7S830.26,445.1,830.23,445.12Zm87.27-67c.19-1.14-1.18-1.19-1.48-1.9s.37-1.49,0-2.18c-.66-1.38-2.35-1.84-2.82-3s0-3.28-.91-4.11c-2.31-2.2-2.52,2.2-4.8,1.06-.36-.18-.48-.81-1.1-1-1.46-.54-.32.12-1.31-1s-3.78,1.63-3.51,2.89c-.42-2.12-3-.64-4.06-.58-2.25.13-2.1-.27-3.74-1-2.36-1.11-3.57-3.5-5.82-4-2-.5-2.73.76-3.85,1.33-.69.35-3.78,1-4.15,1.39a2.2,2.2,0,0,0-.64,2.15c0-.73,1.53,1.95,1,1.46a6.31,6.31,0,0,0,3.37,1.43c-1.34,0,1,3.27,1.27,3.42-2.53-1.4-.45,4-.57,3.49a2.9,2.9,0,0,0,1.3,2.22c.87.5,3.55.36,3.84,1.55a18.22,18.22,0,0,0-.65,2.5c0,.19,2,1.12.94,1.92s-1.46-1.42-2.46-1.1c-.64.2-1.28,2.13-.34,2.3-2.65-.49-4.65-1.09-6.2-1-.92.06-1.16,1-2.95.68a22.93,22.93,0,0,0-3.55-.95c.19,0-.25-2.66-.08-2.89s-8.08-4.07-8.08-.14a9.62,9.62,0,0,0,1.77.72c.05,0-.37.43-.36.42s1,.19,1.06.2c-1.41-.35-.09,2.63.63,3.22,1.08.91,2.22.18,3.33,1.71a41.73,41.73,0,0,1,2.14,4,6,6,0,0,1,.5,3.83c-.16.75-.68.88-.78,1.51-.14.82.55,1,.49,1.61,0,.36-.12,1.69-.15,1.8-.19.62-.92.83-.95.89a17.64,17.64,0,0,1-2.23,3.75c-1.05,1.06-2.29.32-3.45,2-1.56,2.29,0,1-.19,2.91a7.45,7.45,0,0,1-2.06,3.86c-1.51,1.49-4,4-6.12,4.07-1.83.05-3-1.36-4,.34s.68,1.9,1.45,3c1.3,1.87.49.57.74,2.74.1.85.8.83.71,1.89a17,17,0,0,1-.64,2.08,12.69,12.69,0,0,0-.44,2.45c-.06,1,.41,2.35.38,2.94-.12,2.37-.59,2.87.13,5,0,.1,1.06,1.67,1,1.13.11,1-1,1.44-.83,2.31.43,2,1.44,1.73,3.55.3-.73.48,3.09.28,2.8.22-1-.19,4.43,6.46,4.48,6.56.45.91.36,3.59.75,4.37.11.22-.52.62-.3,1s1.13.58,1.3.94a5.62,5.62,0,0,0,1.66,2.39c3,2.18,9.09,1.15,11.52-1.5.77-.85,1.35-2.57,2.37-3.14s2.28-.06,3.36-.78c.15-.1,1.48-2,1.5-2,.31-.75-.41-2.08.18-2.59.86-.73,2.71.29,3.82-.31s.36-1.38,1.42-2.27c.8-.67,2-.4,2.93-1,.23-.15-.15-.58-.45-.83a.23.23,0,0,1,0-.35,20.86,20.86,0,0,0,3.08-4.72c.06-.22.42-5.74.61-5.84,1.13-.54,2.95.91,4.07.57,2.15-.64,1.05-.94,1.57-2,.06-.11,2.26-1.35,2.82-2.22s2.5-3.18,2.38-3.81c-.36-1.93-.88-1.14-2.67-2.46-1.15-.84-1.69-2.19-3.13-2.09,1.66-.12.28-2.84-.26-3.16-.76-.44.28-3.3.32-3.16-.15-.6-1.43-1-1.38-1.59.1-1,1.27-1.06,1.42-1.88.18-1-1-3.39-.88-4.61a14.77,14.77,0,0,1,.48-1.95,15.79,15.79,0,0,0,.57-2.7c0-.21-.23-2.28-.27-2.49s.54-.88.36-1.46-1.09-.82-1.25-1.2c-.45-1.07-1.67-1.13-.93-2.62.51-1,2.44-.94,3.54-1.8a18.12,18.12,0,0,0,3.44-4.38c.21-.7-.53-1.8-.44-2,.26-.62.9-.58,1.47-1.59C915.5,382.78,917,381.34,917.5,378.13ZM875,439.69c-1.22,2.45-4.31,1.89-7,1.6-.71-.08-1.19-.93-2-1-.29,0-1.72,1-2,.89-1.72-.95-.56-2.67-.33-4.2a19.15,19.15,0,0,0-.06-3.08c.07-2.23.6-1.73,2.12-3,.7-.56-.64-1.08,1.61-1.39.82-.11,2,.84,2.69.85.17,0,4.34-.89,4.11-.49-1.25,2.14-2.33,2.51-2,5.17C872.36,436.6,875.12,439.35,875,439.69ZM890.77,444c-.11.58-.78.27-.92.36-1,.64-.42-5.16-.29-5.05a1.35,1.35,0,0,0,.48.24C889.87,439.83,890.93,443.06,890.77,444ZM895,402c-.33.73-2.56,1.65-2.46.35C892.63,400.78,895.39,400.91,895,402ZM868,397.39c.14.15-.3.58-.36.66a.47.47,0,0,0-.52-.23,2.62,2.62,0,0,1,.33-1.1C867.65,396.61,868,397.32,868,397.39Zm-1.25-4.18c2.14,1.69,3-2.11.65-.36C867.34,392.92,866.56,393,866.79,393.21Z"/>
                <g id="waters">
                    <path id="unknown2" :class="getWaterClass('unknown2')" @click="selectWater('unknown2')" :style="getWaterStyle('unknown2')" @mouseover="hoverOn('unknown2')" @mouseout="hoverOff('unknown2')" d="M331.8,738.91a41.2,41.2,0,0,1-4.24,1.75c-2.37,0-3.31-1.43-4.43-2.54-7.36-7.29-7.38-7.31.38-13.78a15.46,15.46,0,0,1,3.22-1.89c.66-.32,1.47-.94,2.19-.18.56.6,0,1.27-.13,1.92-.67,4.19-.79,8.18,3.31,11C333.89,736.43,333.68,737.91,331.8,738.91Z"/>
                    <path id="jade-sea-lakes" :class="getWaterClass('jade-sea-lakes')" @click="selectWater('jade-sea-lakes')" :style="getWaterStyle('jade-sea-lakes')" @mouseover="hoverOn('jade-sea-lakes')" @mouseout="hoverOff('jade-sea-lakes')" d="M667.59,500.36a17,17,0,0,0-1.07,5.64c-.12,2.08-1.12,4.15-3.27,4.12-2.45,0-2.69-2.63-3.3-4.24-.08-2.44,4.4-7.36,6.53-7.4C667.81,498.46,668,499.41,667.59,500.36Zm-39.7-33.83c-1.14-.06-2.28-.21-3.72-.34-6.43,0-12.27,3.05-18.23,5.63-.85.37-1.66,1-1.32,2.12.28.92,1.24.84,2,1,3.13.47,6.92-.19,9.15,2.14,3.12,3.26,6.59,3.07,10.4,2.88,2.47-.12,5-.46,7.3,1.09,2.81,1.89,4.65.9,4.92-2.53C639,471.64,634.71,466.84,627.89,466.53ZM664.82,443c-1.45-1.78-3.08-.71-4.65-.09-.64.25-1.29.46-1.94.67-5.85,1.89-6.3,5.1-3.73,10.3.75,1.51,2,2.81,1.52,4.56a16,16,0,0,0,0,2.2c.26,1.6.55,3.34,2.38,3.82,2.06.53,2.59-1.38,3.53-2.6a6,6,0,0,0,1.09-4.21c-.18-3.22-.06-6.25,2.26-9C666.77,446.94,666.24,444.73,664.82,443Zm14.7-18.45a9.58,9.58,0,0,1-2.83-1.88c-3.35-3.18-7.76-3.14-11.85-3.21-2.82-.05-3.69,2.75-3.6,5.35s2,2.92,4.15,2.74a8.64,8.64,0,0,1,4.63,1,20.55,20.55,0,0,0,7.91,2c1.87-.08,4,.08,4.44-2.29C682.81,426.14,681.16,425.22,679.52,424.53Z"/>
                    <path id="unknown1" :class="getWaterClass('unknown1')" @click="selectWater('unknown1')" :style="getWaterStyle('unknown1')" @mouseover="hoverOn('unknown1')" @mouseout="hoverOff('unknown1')" d="M609,327.42c-3.22,3.44-7.29,4.9-11.85,5.39-1.81.2-3.61.56-4.9.76-3.61,0-4.66-1.82-3-4.48a5.89,5.89,0,0,1,2.33-2.43c2.66-1.07,4.13-3.11,5.36-5.5a3.38,3.38,0,0,1,4.68-1.63c2.09,1,4.33,1.43,6.43,2.33C610.85,323.07,611.15,325.11,609,327.42Zm-5-45.15c-.39-.41-.76-.86-1.19-1.23a9.23,9.23,0,0,1-3.09-9.56c.59-2.77,1.2-5.54,1.78-8.2a18.88,18.88,0,0,0-.42-2.85c-.42-1.29-.92-2.72-2.5-3s-1.84,1.13-2.44,2.05a18.48,18.48,0,0,1-7.13,6.23c-2.33,1.24-4,3.41-3.23,5.82,1.26,3.85.21,6.51-2.37,9.26-2.18,2.33-1.23,4.25,1.78,5.16,3.81,1.14,7.58,2.56,10,6.09,1.45,2.14,3.42,2.55,5.71,1.82C607.15,291.87,608.45,287,604,282.27Z"/>
                    <path id="phoenix-falls" :class="getWaterClass('phoenix-falls')" @click="selectWater('phoenix-falls')" :style="getWaterStyle('phoenix-falls')" @mouseover="hoverOn('phoenix-falls')" @mouseout="hoverOff('phoenix-falls')" d="M527,274.78c-.22,2.82-1.82,4.48-3.68,5.81-2.14,1.53-3.71,3.21-4,6-.24,2.41-2,3.79-4.22,4.45a21.33,21.33,0,0,1-5.67,1.19c-2.9,0-5.27.53-7.06,3.15-1.23,1.8-3.35,1.67-5.34,1.16s-1.93-2-2.05-3.51a7.61,7.61,0,0,0-3.09-5.85c-2.13-1.57-2.47-3.51-.3-5A14.33,14.33,0,0,0,498,270.41a6.24,6.24,0,0,1,5.42-5.84,35,35,0,0,0,7.12-2.36c4.89-2.09,9.34.44,13.84,1.86a2.38,2.38,0,0,1,1.38,2.23C525.91,269.25,525.73,272.25,527,274.78Z"/>
                    <path id="dragonclaw-spring" :class="getWaterClass('dragonclaw-spring')" @click="selectWater('dragonclaw-spring')" :style="getWaterStyle('dragonclaw-spring')" @mouseover="hoverOn('dragonclaw-spring')" @mouseout="hoverOff('dragon-claw-spring')" d="M466.56,281.86h.12c-.2,3.3-.3,6.6-.61,9.88-.51,5.48-5.14,8.32-10.52,7.46-2.9-.46-6-1.16-9.14-.17-2.53.78-4.54-1-4.83-3.59-.49-4.37.26-8.9-2.52-12.87-.67-1,.09-2.25,1.06-3,5.15-4,10.27-7.87,17.16-8.41,4-.31,9.67,4.67,9.43,8.63C466.67,280.5,466.61,281.18,466.56,281.86Z"/>
                    <path id="kethlerin-lake" :class="getWaterClass('kethlerin-lake')" @click="selectWater('kethlerin-lake')" :style="getWaterStyle('kethlerin-lake')" @mouseover="hoverOn('kethlerin-lake')" @mouseout="hoverOff('kethlerin-lake')" d="M383.78,265.07c1,3.93.14,5-3.74,5.34a6.44,6.44,0,0,0-2.34.43c-5.64,2.88-11.89,1.78-17.35,2.73-2,.15-3.15-.37-3.86-1.77-2.31-4.55-6.8-7.4-9.25-11.85a3,3,0,0,0-1.46-1.41c-8-2.64-10.29-10.05-13.84-16.42a6.19,6.19,0,0,0-6.53-3.49c-2.68.33-3.93,2-4.2,4.64a2.64,2.64,0,0,1-.69,1.5c-1.43,1.4-6.44.31-8.52-1.81s-2.05-4.33.15-6.56,5.46-3,6.57-6.28c.38-1.16,1.44-.43,2.24.16,4,2.89,6.42,2.15,8.25-2.32a38,38,0,0,1,2-4c1.28-2.3,1.67-4.32-.59-6.45-1.74-1.65-.84-3.89,1.78-5a5.81,5.81,0,0,1,2.66-.46c6.19.52,10.31-2.15,12.55-7.89.44-1.15.77-2.53,2.41-2.52a3.55,3.55,0,0,1,3.32,2.58c1.45,3.84,2.95,7.67,3.4,11.81.57,5.12,1.36,5.63,6.43,5.81,4.9.18,9.16,2.34,13.3,4.89a13.6,13.6,0,0,1,6.47,8.93c.74,2.82,4.29,4.9,2,8.54,3.25,5.09-.48,9.72-1.11,14.52C383.59,260.91,383.21,262.87,383.78,265.07Z"/>
                    <path id="great-lake" :class="getWaterClass('great-lake')" @click="selectWater('great-lake')" :style="getWaterStyle('great-lake')" @mouseover="hoverOn('great-lake')" @mouseout="hoverOff('great-lake')" d="M98.83,453c-.42,2.49-2.66,2.38-4.61,2.61-2.15.25-4.28.69-6.33,1-3.17-.24-6.1-1.27-9.26-1.17a15.49,15.49,0,0,0-11.28,4.92c-1.42,1.49-2.91,2.92-4.36,4.38a4.2,4.2,0,0,1-3.29,1.6c-6-.51-11.44,1.09-16.74,3.85-2.17,1.13-4.81,1.36-7.25,1.95a32.61,32.61,0,0,0-6.95,2.86c-4.54,2.29-9.34,2.93-14.2.92a18.65,18.65,0,0,0-5.35-1.08A3.37,3.37,0,0,1,6,472.69c-.43-1.31.58-2.09,1.34-2.94a21.5,21.5,0,0,1,11.89-7,8.66,8.66,0,0,0,4.68-2.68c2.88-3.11,6.54-5.39,9.17-8.76.92-1.17,2.14-1.13,3.43-.88,1.47.28,3.14.68,4.36-.23,5.56-4.15,13.17-3.67,18.49-8.39,1.59-1.42,3.76-1.89,5.54.07,3.84,4.2,8.93,4.68,14.15,4.87,5.45.19,11-.51,16.2,2C97.24,449.66,99.26,450.49,98.83,453Z"/>                    
                    <path id="strulent-loch" :class="getWaterClass('strulent-loch')" @click="selectWater('strulent-loch')" :style="getWaterStyle('strulent-loch')" @mouseover="hoverOn('strulent-loch')" @mouseout="hoverOff('strulent-loch')" d="M482.91,533.91c-2.33,2.94-2.45,6.34-2.2,9.79a10.17,10.17,0,0,1-2.91,8.43,7.42,7.42,0,0,0-2.1,3.49c-.9,3.76-3.56,5.23-7.1,5.11-5.3-.17-8.93,2.48-11.59,6.63-1.87,2.91-4.36,5.46-4.5,9.42-.07,2.12-2.4,2.9-4.53,2.61a5.31,5.31,0,0,0-4.43,1.24c-3.19,2.62-7.26,3.07-11.05,4.2-1.52.45-3.21.37-4.7.9-5.6,2-10-.56-14.14-3.7-1.72-1.3-3.12-3-4.75-4.46-4.4-3.89-9-3.9-13.37-.11-5.21,4.54-6.93,4.66-12.44.56a48.23,48.23,0,0,1-4.56-4.15c-2.25-2.17-4.72-1.74-7.34-.85s-2.31,2.73-2.24,4.75c.07,2.46-1.2,3.53-3.71,4-5.5.9-9.59-2.41-14.15-4.28-1.09-.45-1.16-1.6-1.09-2.68.31-4.2-.83-7.2-5.05-9.43-3.52-1.86-6.26-5.24-9.23-8.07-1.52-1.44-3.17-2.37-5.23-2-2.73.54-4.73-.79-6.42-2.49-1.85-1.86-3.48-3.92-5.37-5.76-1.61-1.57-1.26-3.37.64-4.61,3.41-2.23,6.76-4.57,10.35-6.48a14,14,0,0,0,7.71-10.26c.56-3,2.27-4.48,5.36-4.78,3.36-.33,6.55-1.32,10.11-.34a10.11,10.11,0,0,0,7.33-1,5.39,5.39,0,0,1,4.64-.35c5.28,2,9.19-.61,11-5.65a42.53,42.53,0,0,1,6.1-10.68,13.57,13.57,0,0,1,7.46-5.06c3.86-1.18,6.38-4.44,7.76-8.13a21,21,0,0,1,5.59-8.85,7,7,0,0,0,2.41-5.48c0-1.42-.08-3,2.34-4.07,0,5.14-.06,9.79,0,14.44.1,5.88,3.12,7.76,8.7,6.4,5.27-1.28,10.71-2.19,15.61,1.82,2.94,2.42,6.13,1.4,8.83-.69a13.11,13.11,0,0,1,6.77-2.88c3.37-.42,6.36-1.88,8-5.21.59-1.19,1.32-2.19,2.91-1.74s2.9,1.11,3.31,3c.84,3.86-.66,7.36-1.41,11-.8,3.94-3.67,7-4.39,11.06-.64,3.61-.19,4.9,3.36,5.16,5.51.41,10.2,3.84,15.91,3.74,3.19-.06,5,3.53,4.33,6.76-.56,2.62,1,4.34,2.68,5.88C483.39,531.27,484.08,532.45,482.91,533.91Z"/>
                </g>
            </g>
            <g v-if="terrain == 'orisia'" id="orisia">
                <path :class="getAreaClass('ceyana')" :style="getAreaStyle('ceyana')" @mouseover="hoverOn('ceyana')" @mouseout="hoverOff('ceyana')" d="M469.73,706.46c2.15-1.54,2.31-1,2.32-1.81s-.13-2.69,0-4.11-.69-1.77-1.46-2.27-1.12-.12-1.81-.54-.23-1.23-.5-2.23-2-.42-2.62-.46a5.56,5.56,0,0,1-2.61-1.62,18.45,18.45,0,0,0-3.92-2.5c-1.16-.57-.39-1.19-.08-1.69a10,10,0,0,0,.38-3c.12-1.27-.27-1.46-1.23-2a27,27,0,0,1-3.23-1.61,4.44,4.44,0,0,1-1.61-2.85c-.23-1.5-1-.19-2.27-1.54s-2-1.23-3-1.88a3.94,3.94,0,0,1-1.2-2.5,5.57,5.57,0,0,0-2.54-2.39c-1.34-.69.08-2.11-.38-3.88s-.15-2.43-.54-3.5a14.56,14.56,0,0,0-2-3.54,7.92,7.92,0,0,1-1.31-2.19c-.46-1-.15-1.39-1.42-3.39s-2-2-2.23-3-.46-1.38-1.85-2.69-.23-1.46-.23-2.69.39-1.27,1-1.58,1.23-2,1.65-2.81a10,10,0,0,0,.81-3.42,5.39,5.39,0,0,1,.19-2.08c.23-.54,1.73-.54,3-.77s.81-.84,1.2-2.15,1.61.11,3.3,0,2.89-.12,3.08-.73,1-.43,1.27-1.35-1.38-1.23-2-1.58a12,12,0,0,1-1.42-1.11,34.86,34.86,0,0,0-3.5-2.08c-2.12-1.19-2.36-2.91-3-4s.51-1.85.28-2.31-2.43-.23-3,.23-1.93,1.54-3.05,1.21-.54-.92-.57-2.21,1.08-1.89,1.23-2.41a23.26,23.26,0,0,1,1.41-2.18c.41-.71-.82-1.77-1.66-2.69s-.52-1.43-.7-2.08.59-1.12,1.52-1.82-.18-1-.41-1.74-1.05-.9-1.93-1.26-.69-.74-1.53-1a19.07,19.07,0,0,0-2.93,0,7.3,7.3,0,0,0-2.54.55c-.69.24-1.15-.55-2.38-1.24s-1.39.54-2.69.69a22.62,22.62,0,0,1-3.46.54c-1.08-.08,0-1.08,0-1.85s-1.16-1.38-1.93-1.77-1.46-1.54-2-1.15-1.15,2.23-2.54,2.31.16-1.7.16-2.47-.93-1.46-1.69-1.84a2,2,0,0,1-.85-2.23c.15-1,1.61-1.93,1.61-2.54a18.65,18.65,0,0,1,1.54-3.62c.46-1-.61-2.07-2.07-3.3s-1.77-1.54-1.93-2.47.85-1.76,1.16-2.3,1.46-2,1.84-2.62-.69-2.54-1.15-3.77-2.54-.23-3.46-.48-.62.33-1.54-.9-1.62.54-3.44.84-1-.84-.87-1.3a12.53,12.53,0,0,0,.85-4.08,22.61,22.61,0,0,1,0-3.31c0-.77-1.77-2.69-3.15-3.61s-.85-.93-1.62-2.08,1-.92,1.46-1.69-.15-2.16-1.15-3.46-1.08.84-2.62.3-.23-1.46-.77-2.84-1.84-1.46-3.08-1.93a8.58,8.58,0,0,0-4.61-.15c-1.31.38-3.54-1-6.39-2.38s-4.38.92-5.92,1.38-2.54-1.31-2.54-2.15a6.81,6.81,0,0,0-1.3-3.31c-.77-1.08-2.24.31-3.39.54s-1.54,1.23-2.08,3.07-1.53,2.77-2.53,2.54-1.62-1.54-2.54-2.54-2.46-.46-3.46-1a15.67,15.67,0,0,1-2.85-2.07c-.77-.7-2.46,1-3.92.77s-2.54.53-3.85.92-2.08,2-2.85,3.15a2.85,2.85,0,0,1-3.61,1.39,4.64,4.64,0,0,0-3.31,0c-.85.15-1.31,1.23-2.69,1.15s-.39-.54-1.85-.84-4.69.23-6.15-.16-1.16,0-1.16,1.31-.3,1.46-.92,3.23-.69,1.62-1.69,2.23-1.62.85-2.23,1.23-.92,1.69-1.77,2.23-3.15,1.54-4.54,1-2.92.16-4.15.77-2,1.69-3.39,1.62-1.23.23-2.23,1.77-7,2.61-7.77,2.61-1,.92-1.54,2.16-1.46.76-2.77.71-2.23-.56-3.92-.79-2.84.61-3.61.77a5.18,5.18,0,0,1-3.47-1.31c-.61-.77-2.92-1.23-3.92-1.69s-2.15.61-3.15.69-1.23-1.31-1.23-1.92-1.08-1.77-1.85-3.16-1.77-1.07-2.46-1.61-3,.46-4.69,1.71-1.46-.17-2.46-1-1,.46-1.7.69-4.15.62-5.69,0,.08-2.54,0-3.84a4.43,4.43,0,0,0-1.61-2.77c-.7-.77-.62-1.85-.62-3.62s-1.92-1.77-2.46-2.08-1.23.39-2.16,0-.76-2.07-1.15-3.07-1.85-1.46-2.46-3.69-1.54.23-2.85,0a32.25,32.25,0,0,1-4.23-1c-.92-.36-.31-1.42-.46-2.57s-1.44-2.13-2.56-2.74-2.46,1-3.14,1.84a19.52,19.52,0,0,1-4.66,3.08c-1.64.82-2.25.1-4.1,0s-1.85-.82-1.85-1.54a16.44,16.44,0,0,0,.21-3.49c-.21-1.43-.82-1.43,1.84-3.28s3.08-.1,3.9-1.43,1.23-2.77,1.95-4.11a44.5,44.5,0,0,1,2-4.1c1.23-2.05.92-2.26-.62-3.9s-1.64-1.23-2.05-3.07-.41-4-.61-4.82-1.64-2.26-2.05-3.39-4-2.56-6.14-2.77-1.56-1.13-1.56-2.77a7.63,7.63,0,0,1,.82-3.18,9.87,9.87,0,0,0,.72-3.79,3.57,3.57,0,0,0-1.74-2.87,12.68,12.68,0,0,1-2.77-2.26,6,6,0,0,0-3.39-2.46c-2.15-.72-1.74-.41-3.17-1.44s.1-1.84.51-3.59,1-1.43,1.54-1.95,1.12-2.66,1.64-3.79,1.74-1.64,3.07-2.56.31-3.08,0-4.72-1.43-1.23-2.15-2.67a8.19,8.19,0,0,0-3-3c-1-.72-3.29-2.16-3.08-3.18s1.33-1.95,1-2.67-.71-1-1.84-1.6-2.36.57-3.08,0-2.36-.35-3.79,0-2.36-1-2-1.85-1.85-1.54-2.26-2.15-2.46-.1-3.49,0-1.53-1.74-1.53-2.26-.82-1.23-1.13-1.84.2-1.75,0-2.88-1.54-3-2.43-4.2-1.26-1.44-.65-2.87-1.43-1.23-3.11-2.05-.68-3.18,0-4.93.14-1,2-1.64.52-1.84,1.34-3.48.3-2.06,0-3.8a11.1,11.1,0,0,1,0-3.38,9.76,9.76,0,0,0-2.26-4.11,3,3,0,0,1-.92-3.38c.2-1.13-3.9-3.49-3.9-3.49-.61-.36-1,.31-1.49.57s-.2.87,0,1.38-1.07,1.54-1.43,2.51-1.29,1.08-2.11,2-2,.52-3.12.67a12.56,12.56,0,0,0-4.06,1.33,40.14,40.14,0,0,1-2.77,3c-1.07.82-1.12,2.1-1.28,3.79s1.85,2.93,1.08,3.9-1.64,2.67-2.51,3.08-1.54,2.05-2.46,4.25-1.39,3-1.85,4.05a4.92,4.92,0,0,0-.41,3.08c.15,1.49.67,1.8.46,3.54s-1.18.87-2.2,2.05-.47,4.26-.26,5,2.31,2.05,3.59,2.51.2,2.15.2,2.82-.66,1.44-1.43,2.21,0,2.05.05,3.94-.87.57-2.62,1.34-.41,3.07-1.53,4.1-.57,2.41-.67,3.85-.16,4-.26,4.51-.82,1.54-1,2.15,1.13,1.44,1.33,2.21-1.13.61-2,.82-1.69,1.95-2.77,2.41a11.77,11.77,0,0,0-3.28,2.51,2.56,2.56,0,0,1-2.46.82c-.92-.05-2.36.72-3.38.82s-1.49,1.49-2.06,2.16a6.5,6.5,0,0,1-3.28,1.33c-1.18.2-3.23,1.69-3.9,1.69a23.34,23.34,0,0,0-2.66.46c-.93.16-.57,2.21-1.18,2.88s-.67,1.43-1.23,2.92-1.13,1-1.9,1.18-.82,1.28-1.08,2.2-.3,2.87-.61,3.7-1.64,1.33-2.36,1.58-.62.62-.72,1.59.26,1.44-.51,2.88-.62,1.74-1.9,2.61-.72,2.72-1.74,3.23-1.13,1.18-1.64,1.69a5.4,5.4,0,0,0-1.34,2.77,12.82,12.82,0,0,1-.56,3.59c-.62,1.64-2.87.93-3.75,1.23s-1.48.41-2.3.77-3.54,5.18-4.11,5.44-1,1.28-1.38,3.28.15,2.82-.21,3.8a6.06,6.06,0,0,0-.51,1.89,6.89,6.89,0,0,0,0,3c.16.56,2.57,2.51,2.82,3.33s-.25,1.28-.66,2.51,1.07.77,1.48,1.18,2.47,3.9,2.82,4.31-.3,1.08-.82,2a10.57,10.57,0,0,1-2.1,2.26c-.92.92-1.38,1.54-2.41,1.54s-.56.15-1.28,1.18-.1,7.23,0,8.15.72,1.59.92,2.92,1.13,1.13,2.31,1.49,1.49,1.44,2.1,2.26,0,.77-.77,2.36.67,1,1.44,1.74a9.06,9.06,0,0,0,2.51,1.44c.87.41,2.87-.83,3.49-1.13a5.42,5.42,0,0,1,2.2-.08c1,.15.16,1.42-.07,2.31s.92,2.07,1.5,3.34,1.81,1.81,2.31,2.93,1.3,1,1,2.19-.31,1.27-1,1.61-.43,2.47-.27,4.12-.89,2.08-1,3.15,1.34.7,1.81,1.08a3.36,3.36,0,0,1,.8,1.92c.12.7-.42.85-1.23.73a1.15,1.15,0,0,0-1.42,1.12,30.12,30.12,0,0,1-.31,4.35c-.31,1.07-.08,1.57-1,2.84s-2.65,1.16-3.5,2.16-.11,2.19-.5,3.15a1.6,1.6,0,0,0,.58,2.15c.73.47,3.54.62,4.58,1.08s2-.92,3.57-1.35,1.62,1.16,2.16,1.93a5.62,5.62,0,0,1,.53,3.07c0,.93-.61,1.27-1.19,1.66s.77,1.38,1.43,2.08.69,1.19,1.73,2.53,2.73,1,4.07,1.58a4.46,4.46,0,0,0,2.81.23,3.66,3.66,0,0,1,2,.16c.81.26.54,1.42.11,2.07s-2.26.81-2.65,2.27.46,2.27.46,2.85,1.62,2.34,2.85,3.54a8.93,8.93,0,0,0,4.77,2c1.31.11,3.69,1.3,4.31,1.46s3.15-.69,3.71-.69,1-.77.21-2.24,1.15-1.26,1.84-1.53a10.16,10.16,0,0,0,1.81-1.16,3.32,3.32,0,0,1,2.66.35c1,.54,1.77,1.5,2.65,2.08a10.61,10.61,0,0,1,2.08,2c.42.5,2.8,1.54,4.11,2.58s1.69.81,2,2.31-.23,1.46-.73,2.08a4.17,4.17,0,0,0-1,2.15c-.38,1.42-.46,3.46-1,4s1,1.46,1.12,2,.07,1.15,1.57,1.73,2.77-.08,4,0,1.26.77,1.46,1.81,1.61,1.5,2.23,1.88a28.36,28.36,0,0,1,3.31,2.39c1.23,1.08,1.88,2,1.76,3.23s.89,1.23,1.74,2.81,1.34,1.38,1.92,2,3.23,2.73,3.92,3.26-.73,1.24-1.34,1.66-.7,1.54-.85,2.54.46,1.92.35,2.8.69,1.35,1.42,1.85,1,.77,1,2.12,1.15,1.8,1.46,2.11,1.42.62,2.35,1.16.92,2.07,1.11,3.3,1.39,1.35,2.31,1.89,2.65-.08,3.58,0a7.2,7.2,0,0,1,3.42.92c.92.66,3.23.43,5,.73s1.46-.88,2-1.3.85-.43,1.31.15-.31,1.85-.35,2.85,1.42,1.8,1.58,2.92,1.57,1.34,2.61,1.92a4.35,4.35,0,0,1,1.62,3.39c0,1,.42,1.3.84,1.92s1.77.42,3.66.65a8.56,8.56,0,0,1,3.19,1.2c.85.3,1.46.38,2.35.73s.88.65,1.34,1.27.31,1.61.39,2.3,1.38,2,2.11,3,.12,1.54-.23,1.85a2.15,2.15,0,0,0-.42,1.61c0,.62,1.08,1,2,2s.65,1,2.12,1.08,1.19-1,1.65-1.08,1.85.39,2.31-.34.84-2,1.27-2.66,1.65-.88,2.34-1,.54-1.77.81-2.65a6,6,0,0,1,1.19-2.08c.31-.31,2.2-.23,3.5-.15s1.58-.73,1.89-1.23,1.31-.85,1.65-1.19,1.27,1.15,1.5,1.88,1.58.38,3,.85,3-.27,4.81.11,1.81-.58,2.77-1,.23-1.88.5-2.34,1.92,0,2.73,0a18.85,18.85,0,0,0,3.11-.39c.62-.15,1.85,0,3.7-.27s1.61.66,2.54,1.39a2.09,2.09,0,0,1,1,1.88,4.72,4.72,0,0,0,1.34,2.15c.62.74,1.93-.07,2.66-.57s1.42.15,2.61,0,4.31,2.34,5,2.73a20.66,20.66,0,0,0,2,1,10.26,10.26,0,0,0,3.23.46c1.69.11.81.27,1.35.88s1.5,0,2.46-.08-.12-1.61,0-2.07,2.85-.73,3.46-1.19,1.73-.39,2.46-.74,1.62.39,2.08.85,3.15.58,4.77.77,3.54-.19,4-1a5.38,5.38,0,0,1,1.77-1.54c.5-.35,2.42,0,3.46-.08a21.59,21.59,0,0,0,3.35-.73c.73-.23,1.15,1.46,1,2.39s.53,1.23,1.46,2.3a10.94,10.94,0,0,0,2.5,1.93c.65.5,3.46-.81,5.27-1.08s4.46.58,4.69,0,2.46-1.19,3-1.88.73-2.08,1.3-2.85,2.35-.88,3.08-1.77,1.89-2.46,2.31-3,2-1.35,3.08-2.27,1-.81.73-1.58a5.29,5.29,0,0,0-2.23-2.3c-1.27-.89.42-1.93.61-3.16s2-.88,3.23-1.42a2.13,2.13,0,0,0,1.23-2.16c.08-.69,1.77-2,2.46-2.42s2.81-1.58,3.93-2.34,1.65-.5,2.92-1.81,3.15-1.08,4.58-1.69a2.78,2.78,0,0,0,1.46-2.66,1.75,1.75,0,0,0-1-1.73c-.73-.38-.73-1.35-.93-2.35s1.08-1,1.62-2.23a7.1,7.1,0,0,1,2.69-2.84c1.16-.81,1.66-1.23,1.89-2a10.23,10.23,0,0,0,.07-3.58c-.15-1.65,1.81-1.65,3.23-2.81a26.89,26.89,0,0,0,2.77-2.46c.85-.84,2.5-.61,4-.46s2-.12,2.62-.88a22.67,22.67,0,0,0,1.88-3.12c.19-.38,1,.77,1.46,1.88s2.23.35,3.39.5a1.76,1.76,0,0,0,2-.92,3.72,3.72,0,0,1,2.42-1.34,4.88,4.88,0,0,0,2.54-.62c.38-.42,1.81.35,2.65.23s1.85,1.12,2.54,1.73,1.23,2.58,1.46,3.23,1.77.81,2.77.93a23.93,23.93,0,0,0,3.16-.2,17.65,17.65,0,0,1,2.77.23c.73.08,1,.58,2.07.89s1.31-.42,1.93-.81a4.36,4.36,0,0,1,2.3-.11,11.62,11.62,0,0,1,3.08,1.76c1.15.85.35,1.89.23,2.31a2,2,0,0,1-1.31,1.43c-.92.34-.77.57-1,1.15s1.15,1.81,1.92,2.65,1.54,1.2,2.15,1.81a6.49,6.49,0,0,0,2.39,1.19,1.58,1.58,0,0,1,1,1.5c0,.73.34,1,.65,2.08a5.18,5.18,0,0,0,.81,1.58c.23.5.92.92,2.73,1.5s1.85.19,2.27-.08,1.27,0,2.08-.19a4.89,4.89,0,0,1,2.57-.08c.77.27.39,1.08-.19,1.27s.12,1.08.31,2.54,2.08,1.34,2.15,2,1.2,1.34,2,2.11-.15,1-.73,1.19-.5,1.12-1.42,1.93a2.08,2.08,0,0,0-.81,2.11c0,.89,2,1.73,3.16,2.16a8.06,8.06,0,0,0,3.15.23,4.35,4.35,0,0,1,2.73.84c1,.66,1.62.27,2.46.12a7.55,7.55,0,0,1,2.81.15c.61.2,1.5,2.27,2,2.73s2.19-.69,2.46-1a6.37,6.37,0,0,1,2.16-1.19c1-.34,3.5,1.19,4.42,1.35s1.73,0,1.81-.39a9,9,0,0,1,1.3-1.84c.47-.58.27.19,1.31.73s-.15.81-1,1.38-.07,1.43.62,1.58.84.27,1.38,2.08,1.81,1.11,2.89,1.15,1.84-.12,3.61,0,.69-2.62.66-3.73-1-1.39-1.58-2-1.65-1.08-2.46-1.89-.19-1,.54-1.27,1.5-3,.77-3.07-.77-.85-.85-1.81S467.58,708,469.73,706.46Zm-111.88-94c-.81.58-.62.73-1.73,1.46s-1.81,1.5-1.66,1.81-.54.85-1.08,1.19a1.39,1.39,0,0,0-.84,1.58,7.88,7.88,0,0,1-.89,3.23c-.27.54-.69.77.47,1.46s2.38,1,2.88,1.85,1.5,1.38,1,1.92-2.23,1-2.46.43-.27-.5-1.16-.73a2.38,2.38,0,0,0-1.8.34,2,2,0,0,1-2.24.19c-1.3-.61-1.42-1.23-1.46-1.69s.08-.81-1.07-1.11-1.58-1.54-2.27-1-.62,1.23-1.43,1a4.83,4.83,0,0,1-1.8-1.16,1.62,1.62,0,0,0-2,.16c-.54.38-.39.77-1.31,1.23s-2,.88-2.62.46-2.26-.69-1.23-1.12,2-.92,1.27-1.8a8.89,8.89,0,0,0-2-1.62c-.57-.42-1.79-1.22-.54-2.31a7.49,7.49,0,0,0,1.77-1.73c.47-.73,1-1.27.73-2s-.5-1.31-.84-2.11-.81-1.58.15-1.89,2.35-.23,2.77-1.15.69-1.19,1.39-1,2.07,1.23,2.88,1.15,1.27-.54,2.12-.54a2.65,2.65,0,0,1,1.92.85,4.34,4.34,0,0,0,1.5,1.27,5.79,5.79,0,0,0,2,.07c.88,0,2.07.35,2.84-.27a9.9,9.9,0,0,1,2.23-1.38c.85-.38,1.35-.65,2-.35a10.35,10.35,0,0,1,2.85,1.77A1,1,0,0,1,357.85,612.42Z" transform="translate(1 1)"/>
                <path :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M902.9,224.85c.13-.77-.13-1.12,0-2s-.38-.76-.53-1.53-.54-.81-.93-1.35a3.4,3.4,0,0,0-1.07-1.12c-.43-.23-.62-.92-.81-1.34s-.62-.77-1.66-1.27-1-.08-2.07-.85-.35-.88-.73-1.11-1-.62-1.46-.85-.12-.77,0-1.5-.38-.77-.53-1.34a4.92,4.92,0,0,1,0-1.54c0-.39.5-.43.57-.77a5.21,5.21,0,0,1,.43-1.54c.26-.42.73-.77.65-1.19s0-.85,0-1.5,0-1.27,0-2.27-.31-.85-.46-1.12.07-1-.39-1.57-1.07-1-1.42-1.43a9.12,9.12,0,0,1-.88-1.54c-.43-.77-.77-.53-1.24-.69a3.67,3.67,0,0,1-1.46-.5c-.57-.42-1.23-.19-1.73-.27s-1,.27-1.54.27-.34-.69-1.15-1.34-.58-.66-.58-1.16.12-.38.46-.61a1.48,1.48,0,0,0,.74-1.12,10.39,10.39,0,0,0,0-1.85,1.41,1.41,0,0,0-.74-1.34c-.5-.27-.25-1.26-.51-2.13s-.77-.72-1.69-.76a12.53,12.53,0,0,0-1.95,0,4.67,4.67,0,0,1-2-.51,3.81,3.81,0,0,1-.46-1.34c-.15-.71-.1-.92-.59-1.28s-.18-.92,0-1.33-.46-1.28-.87-1.59-.56-.77-1.28-1.44.72-1.07.77-1.38.41-.62.56-1.23.36-.62.47-1a12.19,12.19,0,0,0,0-1.84c0-.76-.57-.82-.47-1.44s.41-.82.46-1.33-.76-.72-1.43-1.23-.72-.57-1.39-1a4.27,4.27,0,0,1-1.28-1.38c-.51-.72.62-.31.82-1.08s-.15-.77-.56-1.49.26-1.33,0-2.41-.57-.25-1.33-.3-.93.1-1.49-.21a5.12,5.12,0,0,1-1.39-1.13,5.08,5.08,0,0,0-1.74-1.48,2.23,2.23,0,0,1-1.54-1.54c-.2-.77-.72-.52-1.38-.57s-1.23,1.23-1.85,1.64-.92.93-1.44,1.29-.46,1.38-.61,2.3.26,1.39,0,1.9-1.13.46-2,.46-1,.05-1.74.05-.72.82-1.18,1.13-1.49-.1-2.57,0-.92.87-1.38,1.39-1.18.15-2.46.2-1.08.67-1.64.92a2.38,2.38,0,0,1-2.06.11c-.72-.36,0-.87-.15-2s.41-1.49,0-2.26-.62-1.18-.87-1.74a4.35,4.35,0,0,0-2-1.64c-.62-.21-.82.77-1.44,1s-1.23.36-2,.62-1.07.87-2.2.25-1.49-.25-2.31-.1-1.43.36-1.68.21a2,2,0,0,1-.16-1.85,4.74,4.74,0,0,0-1.23-4.49c-.83-.95-1,1-1.54,1.21s-1.54.1-2.36.36-.82.51-1.69.41-1.8-.05-3.13-.26-2.11.1-3.23-.1-.82.36-1.29.61-.66.72-1.59,1.29,0,1.28,0,2.1a2.18,2.18,0,0,1-.51,1.49,4.74,4.74,0,0,1-1.08,1.17,9.41,9.41,0,0,1-1.69,1.59c-.66.36-.25,1-.92,1.85s-.46,1-1.26,1.59-.18,2.67,0,3.44-.67.46-1.34,0-.35-1-.56-1.33a7.76,7.76,0,0,1-1.38-1.9,2,2,0,0,0-.93-1.29c-.51-.36-.87-.25-1.54-.77a16.41,16.41,0,0,0-1.48-1.12c-.72-.47-.93-.16-1.44-.16a3.32,3.32,0,0,1-1.49-.36c-.56-.25-1.28-.1-1.89-.46s-.57-.15-1.18-.1-1.13.2-1.8.2a4.39,4.39,0,0,0-1.59.36c-.41.16-.92.67-1.49,1A3,3,0,0,1,791,166a3.86,3.86,0,0,0-2,.76,14.73,14.73,0,0,1-1.54,1.08c-.67.31-1.13,0-1.84-.15a9.42,9.42,0,0,0-2.41.15c-.77,0-.93-.31-1.18-.31s-.77.52-1.24.52-.76.61-1.12,1-.41.31-1.23.67-1,0-2.16,0h-1.79a3,3,0,0,1-1.8-.31c-.56-.36-.77-.82-1.28-1s-1.28-.26-1.69-.41a1.85,1.85,0,0,1-1.08-1.13c-.26-.67-.77-.67-1.28-1.13a3.66,3.66,0,0,1-.87-1.23c-.36-.62.1-.92,0-1.75s0-.56-.67-.92-.67,0-1.38-.46-.88-.67-1.34-.77a2,2,0,0,1-1.38-.77c-.51-.61-.51-.66-.87-1.08a8.46,8.46,0,0,0-1.64-1.07,3.56,3.56,0,0,1-1.34-1.36c-.25-.55-1,0-2.1,0s-1.28,0-1.9,0a1.5,1.5,0,0,1-1.43-.71c-.47-.67-1.08.1-2,0s-.49-.16-.9-.67-.59-.67-.54-1.18.36-.56.46-1a3.14,3.14,0,0,0,0-1.43c-.1-.52-.3-.62-1.07-1s-.47-.36-.67-.82-1-.25-1.71-.46-.29-.41-.08-1-.06-.62,0-1.18-.25-.62-.76-.77-.72-.67-1.08-1.34-.77-.46-1.34-.75-1,0-1.38,0a11.28,11.28,0,0,0-1.79,0,1.7,1.7,0,0,1-1.44-.41c-.51-.35-.72-.66-1.18-.82s0-.66,0-1.33-.31-.82-.46-1.18a3.51,3.51,0,0,0-.77-1c-.26-.26-.82,0-1.44,0s-1-.52-1.28-.79-1.23-.14-1.79,0-1.23-.85-1.85-1.11-.72.41-1.33.55a5.65,5.65,0,0,1-2.05,0c-.57-.1-.57.31-1.39,1.29s-1,0-1.79,0-1.44.06-3,0c-1-.05-.92.1-1.69-.21a11.41,11.41,0,0,0-2.46-.56c-1.13-.21-.82.92-1.34,1.43a5.93,5.93,0,0,1-1.69,1.08,5.8,5.8,0,0,1-1.49.77c-.77.2-.41.61.26.72s.46,1.28.56,1.84-.46.62-1.12,1-.16.46-1,.87-1.28.1-1.9,0-.41.77-.66,1.74-1.08,1.85-1.64,1.85a2.89,2.89,0,0,1-2-.87c-.72-.67-1.18-1.13-1.8-1.13s-.77.41-1.18,1-1.13.67-1.64.93a4.71,4.71,0,0,0-1.33,1.64,5.25,5.25,0,0,1-1.44,1.33,13.56,13.56,0,0,0-1.79,1.59c-.41.46-.77.41-1.44.46a1,1,0,0,1-1.08-.41,9.46,9.46,0,0,1-1-1.64c-.41-.72-1-.61-1.64-.72s-1.18.57-1.8,1.13a4.78,4.78,0,0,1-1.69,1.13c-.67.26-1.08,1.18-1.49,1.49a2.42,2.42,0,0,0-1.18,1.79,2.93,2.93,0,0,1-1.12,2,4.48,4.48,0,0,0-1.13,1.9c-.16.56-.11,1.08-.72,1.59a2.09,2.09,0,0,0-.72,1.64,1.37,1.37,0,0,0,1.08,1.13c.51,0,.87.72,1.59.87s.82.41,1.74.87.62.82.87,1.18,1.23.26,1.7.26.82-.21,1.48-.77,1.39.56,1.08.92,0,1.54-.1,2.41-.93.77-1,1.23a19.35,19.35,0,0,1-.1,2.36c-.21.57-.36.31-.87.87s.77,1.08,1.18,1.59a4.75,4.75,0,0,1,.61,1.34c.16.31,1.39.56,2.1.61s.88-.46,1.29-1.23,1.59-.05,1.84-.1a13.2,13.2,0,0,1,1.59-.26c.36,0,.67,1,.72,1.39s1.23.72,1.59,1.13,1.18.3,1.8.35.76,1.75,1,2.11a6.52,6.52,0,0,0,.87,1.69c.62.77.72.15,1.18.31a8.35,8.35,0,0,0,2,.46c.57,0,.72-.31,1.18-.62s.77-1.38,1.44-1.38.46,1.13.46,1.54a3.58,3.58,0,0,1-.41,1.74,15,15,0,0,0-.67,2c-.2.41-.51,1-.92,1.69a2.93,2.93,0,0,0-.05,2.1c.1.47.71.93.82,1.39a7.91,7.91,0,0,1-.21,2.36,2.59,2.59,0,0,0,.41,2,1.62,1.62,0,0,0,1.49,1c.56.05,1.18-.46,1.69-.36s.26,1-.36,1.23-.51.93-.25,1.59,1,.82,1.23,1.08,1,0,1.23-.15a3.19,3.19,0,0,1,1.54-.31c.46.1.77.67,1.33,1s.26,1-.41,1-1,.67-1.33.72a1.92,1.92,0,0,1-1.34-.82c-.25-.41-.61-.57-1.38-.57s-.62.82-1,1a5.77,5.77,0,0,1-1.43.1c-.62,0-.67.46-1,1.33s.57,1.18.62,1.49a13.71,13.71,0,0,1,.2,1.85,1.23,1.23,0,0,1-.82,1.18c-.46.2-.61,2.2-.61,3s.15,1.23.15,1.74.05,1.18,0,2.16-.41.92-.87,1.13.31,1.38.56,1.84,1,.82,1.24,1.44,0,1.18.2,1.54a3,3,0,0,0,1.54,1.07c.61.21.72-.51,1.38-1.12s.93-.06,1,.15a8.37,8.37,0,0,1,.46,1.74c0,.52-.46.62-.82.93s-.41,1-1,1.18-.51.61-1.07,1.07,1,1.54,1.48,1.8a5.89,5.89,0,0,0,2.47.61c1,0,.82-.51,1.12-.66s1.08-.31,1.49-.52.77-.15,1.59.31.51,1.18.67,1.74a19.81,19.81,0,0,1,.87,2c.15.77-.05.82-.51,1.8s.51,1,1.48,1.69,1.18,0,1.7-.05.71-.05,1.66.26a13.85,13.85,0,0,1,1.93.92c.82.36,1.33-.62,2.2-.56s2.67.3,3.28.41a6.09,6.09,0,0,1,1.54.71,4.56,4.56,0,0,1,1.9,1.85,2.51,2.51,0,0,0,2,1.28,4.07,4.07,0,0,0,1.49.16c.3,0,.36,1.59,1.28,2.41s1-.31,1.49-.47.92.77,1,1.18-.51,1-.82,1.7-1.18,1.12-1.69,1.53-1.18.72-1.59,1.08,0,1,0,1.95a1.79,1.79,0,0,1-.57,1.44c-.2.3-.66,1.28-1.12,1.89s.46,1.08.56,1.44.62,1.64.72,2.1a2.76,2.76,0,0,0,.72,1.34,10.21,10.21,0,0,0,3,.56c1,0,.82.61.82.92a12.13,12.13,0,0,0,.46,1.44c0,.25.16.31,1.18,1.23s.77.77,1.08,1-.31.77-.46,1.08a4.54,4.54,0,0,0-.26,1.85c0,.92.57.51.77.87s-.46.87-.67,1.33a16.07,16.07,0,0,1-.87,1.64c-.36.62-1.84.16-2.51.06a14.52,14.52,0,0,1-1.74-.26c-.47-.15-.67-.46-1-.92s-.92-.67-1.74-1.13-.72-.93-.93-1.64-.82-.93-1.23-1.44-1.43-.61-1.89-1.18-.93-.56-1.8-.82-1.49.21-2,.26-.66,1.07-1.28,1.43-.92.87-1.79,1.39-.26,1.48,0,2a4.71,4.71,0,0,1,.41,1.54c0,.25-.47.82-.72,1.07s-.21,1.44-.51,1.75,0,1.07.15,1.69,1.59.92,2.67,1.85-.41.2-1.39.2a7.47,7.47,0,0,1-2.13-.15c-.89-.21-2.79-.36-3.3.15s-1,0-1.75-.2a12.53,12.53,0,0,0-2.15-.62c-.87-.15-1.23.92-2,.87s-2.51-.15-2.87-.2a2.66,2.66,0,0,1-1.44-.62c-.67-.51-1-.1-1.74-.26s-.82.62-1.13.83a6.65,6.65,0,0,1-1.85.35.9.9,0,0,1-1.07-.66c0-.26.15-.36.66-1.13s-.51-1-1.18-1.39a9.62,9.62,0,0,1-1.28-.76c-.51-.36-.61-.16-1.28.05a1,1,0,0,1-1.13-.88c.1-.25.57-.61.82-.92s0-.92-.2-1.23a3.65,3.65,0,0,0-2.46-.61c-1.24,0-1.24-.06-1.49-.47s-1-.05-2-.35a2.84,2.84,0,0,0-2.26.51c-.41.2-.2,1.13-.31,1.84s-1,.31-1.84.72a15.61,15.61,0,0,1-1.59.82,3.37,3.37,0,0,0-1.23,2c-.16.72.46,1,1.13,1.44s.05.56-.57,1.08-1-.47-2.51-.47-1.08.36-1.54.26a4.1,4.1,0,0,1-1.85-.72,3.63,3.63,0,0,0-1.18-.82,6,6,0,0,0-2.15-.05c-.72,0-1.08.56-2,1.08s-1.38-.21-2-.46a6.85,6.85,0,0,1-1.38-1.23,7.22,7.22,0,0,0-1.59-1.39c-.62-.26-.72-.87-.82-1.44s-.62-1-1.59-1.33-1.34.21-1.8.1-1.13-.77-1.33-.87-2.67,0-3.54-.31a7.2,7.2,0,0,1-1.59-.56c-.51-.26-1.49.51-1.92.23a1.94,1.94,0,0,0-1.34-.26,1.49,1.49,0,0,1-1.15.54,1.93,1.93,0,0,0-1.13.18,4.71,4.71,0,0,1-2.05.21c-.95-.08-.15-.77-.1-1s.51-.59.82-.84.15-.7.2-1.21a5.31,5.31,0,0,0-.12-1.64,1.58,1.58,0,0,0-.75-1.15,1.41,1.41,0,0,1-.38-1.23c0-.29.31-.62.46-.82a2.24,2.24,0,0,0,.13-1.44,7.42,7.42,0,0,0-.54-1.23c-.13-.36-.51-.44-.77-.72s.23-.59.23-1-.44-.54-.74-.85-.13-.72-.23-1.05a4.27,4.27,0,0,1-.16-1.13c0-.28.44-.46.57-.61s.74-.57.92-.82-.62-.44-1.05-.72-1.49.13-1.95,0-.56-.44-.64-.77a3.78,3.78,0,0,1,0-1c0-.33,0-.72,0-1s-.49-.67-.77-.93,0-.64.05-1-.49-.36-.92-.46-1.08.18-1.21.1a9.17,9.17,0,0,0-2.13,0c-1.41,0-1.38,0-1.76-.23s-.34-.67-.59-1-.47-.25-.8-.61-.38-.59-.87-.7-1.41.16-2,0-.46.83-.57.88-.79,0-.66-.39-.64-.25-1.23-.38a9.28,9.28,0,0,1-1.49-.64c-.33-.13-.38.59-1,.64s-.93.54-1.18.72a9.36,9.36,0,0,1-1.21.82c-.41.18-.79-.34-1.08-.59a3.18,3.18,0,0,0-1.25-.65c-.54-.15-.93.11-1.34,0s-.56-.31-.92-.82-.59-.18-.84-.51a2.78,2.78,0,0,0-1.34-.62c-.43-.13-1,.23-1.23.44s-.49.48-.72.33-.25-.38-.64-.41a7.3,7.3,0,0,1-1.61-.41,4.25,4.25,0,0,1-1.26-.95c-.33-.38-.87,0-1.31.13s-.59.49-.92.64a2.78,2.78,0,0,1-1.15.21,5.22,5.22,0,0,1-1.65-.31c-.69-.23-1.12.31-1.74.38s-.61-.18-1-.36-.54.34-.9.8a3.74,3.74,0,0,0-.61,1.2c-.11.31-.44,1.08-.72,1.77s-.31.29-.82.23-.57,1.11-.67,1.44a10.74,10.74,0,0,1-1,1.67,8.45,8.45,0,0,0,0,2.12c0,.44.51.42.89.16s2.85.13,3.52.28.43.54.53,1.28,0,.9.06,1.46.87.49,1.23.72,1.64-.15,1.87-.15,1.59.43,2.15.43-.07.72-.51.93-.46.43-.85.69-.74.54-.77.79,1.16.18,1.36.39a2.94,2.94,0,0,0,1.08.49,17.78,17.78,0,0,0,1.85.25,12,12,0,0,1,1.84.05c.64.16-.15,1.11-.25,1.47a9.92,9.92,0,0,0-.11,1.46c-.07.84,0,.79-.1,1.36s-.64.66-1.9.74a8.59,8.59,0,0,1-1.51,0c-.61,0-.64.23-.74.64a23.14,23.14,0,0,0-.11,2.46,3.07,3.07,0,0,1-.79,2.13c-.51.74.2.69.56,1.36a7.54,7.54,0,0,0,.82,1.38c.31.36,1.11.52,2,1s.49.49,1,.92a1.47,1.47,0,0,1,.69,1.05,5,5,0,0,0,.81,1.5c.5.75,1,.5,1.83.79a5,5,0,0,0,1.44.36,4.12,4.12,0,0,0,1.5-.23,1,1,0,0,1,1.15.4c.2.24,1,.12,1.46.2s1.16.19,1.62.3,1.08-.34,1.54-.61a7,7,0,0,1,2.11-.42c1-.16,1.23.27,2,.27s.46.3.88,1.07a5,5,0,0,1,.77,1.58,9.63,9.63,0,0,1,0,1.42c0,.62.19.66.5,1.35s1,.54,1.42.77.73.65,1.62,1.15,1,.16,1.19.19a6.3,6.3,0,0,1,1.69,1.58c.31.5-.11,1.27-.38,1.65a8.75,8.75,0,0,0-.54.93c-.16.27.19,1.07.19,1.54s0,.65,0,1.77a7,7,0,0,0,.12,2.57c.23.39.34.35,1.27.89a3.84,3.84,0,0,1,1.3.92c.66.62.2,1.35.39,1.85s.84,1.46,1,1.88.73.81,1.11,1.08a5,5,0,0,0,1.39.54,1.67,1.67,0,0,1,1.19,1.15,3.8,3.8,0,0,0,1,1.85,8.78,8.78,0,0,1,1.46,2.07c.5.89,1.08,1.58,1.58,2.31s.61.58,1.15,1.19,1,.93,1.43,1.5a19.39,19.39,0,0,1,1.19,2,4.15,4.15,0,0,0,1.38,1.27c.43.35.43.85.35,1.46s-.65,1-1,1.35a10.07,10.07,0,0,0-.88,1.46c-.35.5,0,1.08.19,1.58a1.2,1.2,0,0,1,0,1.42c-.39.73-.23,1.77-.42,2.38s.07.5.34,1.2.73.07,1.31.42a8.14,8.14,0,0,1,1.5,1.12c.5.46.19.8-.31,1s-.65.81-.77,1.43a5,5,0,0,1-.84,1.77,15.93,15.93,0,0,1-1.12,1.42,8.46,8.46,0,0,0-.85,1.69,1.46,1.46,0,0,0,.12,1.35c.19.46.38.31,1.15,1s-.27.61-1,1.07a2.33,2.33,0,0,1-1.77.43c-.84,0-.38.42-.77,1.23a3,3,0,0,1-.88,1.27c-.46.46-.31,1-.27,1.61a1.27,1.27,0,0,1-.83,1.16c-.34.18-.29.51,0,1.15s.2.28.74.95.46.38.74.69a9,9,0,0,1,.93,1.26c.35.56.35.41,1.1,1s.43,1.13.51,1.46a4.37,4.37,0,0,1-.18,1.56c-.13.52-.43.72-.84,1.29s-.31.71-.57,1.1a9,9,0,0,0-.87,1.1c-.23.46.2.95.05,2s-.28.87-.1,1.41,1,1.13,1.18,1.41a4.07,4.07,0,0,0,.92,1.1,1.45,1.45,0,0,1,.56.75,4.46,4.46,0,0,1,0,1.82c-.07.79-.28.95-.48,1.1a7.61,7.61,0,0,1-1.49.46c-.15,0-.26.72-.49,1.21s-1.23.05-1.69.05-1.28.2-1.59-.08a4.54,4.54,0,0,0-.79-.69c-.41-.26-.64.44-1.23.05s-1.08.33-1.44.62-.62,1.33-.92,1.71a12.12,12.12,0,0,1-1.23,1.57,3.77,3.77,0,0,0-.82,1.08,4.88,4.88,0,0,1-1.47,1c-.64.39-.2.77-.07,1.8a6.25,6.25,0,0,1,.18,1.94c-.11.72-.47.77-.62,1.26a13.94,13.94,0,0,0,.15,3.33c.13.57-.43,1.34-.69,1.75a7.23,7.23,0,0,1-1.23,1.13,2.71,2.71,0,0,1-1,.74c-.61.33-1.28,1.56-1.54,1.74a6.6,6.6,0,0,0-1,1.95c-.25.72-.61.54-1.12.72a4,4,0,0,1-2,0c-.9-.15-.67.13-1.08.39a3.38,3.38,0,0,1-1.39.51,6,6,0,0,1-1.41,0,3.8,3.8,0,0,1-1.43-.87,1.53,1.53,0,0,0-1.57-.38,7.51,7.51,0,0,0-1.92,1.07,12.19,12.19,0,0,1-1.28,1.18c-.82.62-.67.31-1.15.67s-.26,1-.31,1.69-.05,1-.16,1.85a2,2,0,0,1-.89,1.54c-.49.41-.7.56-1.16.94a5.87,5.87,0,0,1-1.92.8c-.23,0-.82.77-1.18,1.59a4.54,4.54,0,0,1-.79,1.25c-.24.34-.67.59-.93,1s-.61.64-1.72,1.13a3.88,3.88,0,0,1-2.1.2c-.46,0-.77.18-.82.59a2.25,2.25,0,0,1-.79,1.31c-.49.44-.29,2.15-.18,2.46s.61.87.56,1.13a5.05,5.05,0,0,0,.15,1.74c.09.5.11.64.11.68s0,0,.1.2c.21.51.67.66,1.38.76s.62.21,1.24.62a10.55,10.55,0,0,1,1.53,1.44c.26.25,1.23,1,1.39,1.38s-.26.77-.46,1.95,0,1.38-.16,2.2a5.18,5.18,0,0,1-.92,1.85c-.41.72-.56,1-.87,1.49a15.05,15.05,0,0,1-1.39,1.59,3.4,3.4,0,0,1-1.07,1c-.67.41-.62,1.13-.93,1.49s-.2,1.08-.41,1.38,0,1.29-.25,1.85.15,1,.25,1.49.72.66.77,1.07-.87.67-1.54,1.18a3.7,3.7,0,0,1-2,.82,3.42,3.42,0,0,0-1.74.77c-.56.41-.36,1.29-.46,1.8a2,2,0,0,1-1,1.33,2.67,2.67,0,0,1-1.53.46c-.72.11-.36.21-.93.62s-.41.92-.61,1.64-.52.77-1.13,1.49a4.11,4.11,0,0,1-1.49,1.18c-.77.46-1.48,1.74-1.69,1.79a4.39,4.39,0,0,0-1.64.77c-.51.46-.41.51-.87.77a3.75,3.75,0,0,1-2.11-.2c-.46-.16-.92-.52-1.53-.72s-.57.25-1.08.51a4.57,4.57,0,0,0-1.33.92c-.62.57-.57,1-.82,1.23a4.64,4.64,0,0,0-1.24,1.08,3.67,3.67,0,0,0-.15,1.85,3.32,3.32,0,0,1-.1,1.18,2.69,2.69,0,0,1-1.13,1c-.41.21-.21.82-.1,1.44s.36.61.87,1-.51.52-1,.62a10.37,10.37,0,0,1-1.84.2,16.83,16.83,0,0,1-2-.2c-.82-.1-.46.15-.82.46s-.46.77-1,1-1,.05-1.33.16-.67.46-1.28,1.07-1.18.31-1.8.31-.82.21-1.43.67a5.57,5.57,0,0,0-1.24,1.23,1.94,1.94,0,0,1-1.48.56,1.91,1.91,0,0,1-1.49-.51c-.41-.41-.82-.31-1.59-.67a2.27,2.27,0,0,0-1.64-.25,9.17,9.17,0,0,1-2.62.41,8.94,8.94,0,0,0-1.59-.05c-.71,0-.77.1-1.48.1s-1.16.36-1.75-.08-.89-.25-2-.69-.84-.15-1.35-.33-.72-.57-1.16-1.18-.61-.31-1.23-.62a3.81,3.81,0,0,1-1.38-1.33c-.44-.59-.64.18-1.18.43s-.85.85-1.39,1.31a8.15,8.15,0,0,0-1.31,1.41c-.25.39-.76,1.69-1,2.13a7.3,7.3,0,0,0-.61,1.39c-.21.51-.18.53-.39,1a14.31,14.31,0,0,1-1,1.87c-.3.44-.79.85-1.23,1.39a3,3,0,0,0-.41,1.84,5.11,5.11,0,0,0,0,1.36,1.89,1.89,0,0,0,.59,1c.31.36.77.36,1.31.48s1.46,0,1.57.06a9.19,9.19,0,0,1,1.28,2.58c.28,1.11.15.8.79,1.44a1.6,1.6,0,0,1,.59,1.21c0,.23.57,1.25.28,1.79s.44.44,1.06.56a4.72,4.72,0,0,1,1.1.39,10.07,10.07,0,0,0,1.77.64c.33,0,1.61-.26,2.13-.31s.89.46,1.1.59a4.71,4.71,0,0,1,1.41,1.23c.25.52.2,1.08.43,1.54a8.88,8.88,0,0,0,1.34,1.44c.41.43.33.28,1,.64s1.18,0,1.69.08.49.61.41.82a4.87,4.87,0,0,1-.87,1.25,6.26,6.26,0,0,0-.64.77c-.18.23-.29,1-.67,1.36s-.54.9-.85,1-.51,1-.56,1.18a15.43,15.43,0,0,0,.31,1.59,1.75,1.75,0,0,1-.72,1.44c-.44.23-.21.61-.13,1s.56.67,1,1.18a13.59,13.59,0,0,0,1.79,1.9,5,5,0,0,0,1.64,1.08c.72.43.49.92.64,1.61a1.87,1.87,0,0,1-.13,1.51,4.37,4.37,0,0,0-.28,1.8c0,.77-.56.87-.79,1.23a1.11,1.11,0,0,0,.36,1.26c.33.28.05.59,0,1.64s-.59.84-1,1.15a2.32,2.32,0,0,0-.9,1.64c-.1.82-.34.85-.75,2s.08,1.28.47,1.77.56.61.43,1.05a3.6,3.6,0,0,1-1.49,1.43,4.11,4.11,0,0,0-1.2,1.31,6.53,6.53,0,0,1-1,1.08,5,5,0,0,0-2.65,3.28,9.68,9.68,0,0,1-1.2,2.67c-.49,1.13-.13,1.51.1,2.51s.92,1.23,1.49,1.77.49.18.87.64a7.27,7.27,0,0,1,.92,3.13,6.87,6.87,0,0,1-.51,2.79,13.69,13.69,0,0,1-.64,1.52c-.38.79-.36.59-.72.87s-.82,3.18-.2,4.15.3,1.16.25,2a4.37,4.37,0,0,0,1.13,2.56c.67,1,1.69,1.08,2.41,1.52a5,5,0,0,1,1.54,1.51c.54.69.23.72,0,1.74a5.71,5.71,0,0,0,.07,2c0,.72.21.92,0,1.6,0,0-.39,1.39-.54,1.89a26,26,0,0,0-1,2.42c-.2.81-.5.42-1,1s-.93,1.5-1.39,2.12a6.19,6.19,0,0,1-1.31,1.34,3.17,3.17,0,0,1-1.46.7c-.77.23-.08,1-.31,2.19s.16,1.19,0,2.11a1.77,1.77,0,0,0,.27,1.43c.23.54,1,.77,1.76,1.46s.09.84,0,2,.35.92.77,1.54a7.22,7.22,0,0,0,2.58,1.5c.73.3.65.54,1.3,1.11s.27.69.27,1.19-.38.74-1.11,1-.46.27-.69.81.46.73,1.23,1.77.23.69.34,1,1.27.62,2,.46,1.47-.23,2-.38.81-.2,1,.07.23.58.54,1,.23.62.31,1.43-.23.5-.46.57-.08,1.46-.39,2.16a5,5,0,0,1-1,1.42,3.63,3.63,0,0,1-1.73,1.08c-.89.38-.65.88-1.27,1.53a2.49,2.49,0,0,0-.77,2.16,5.22,5.22,0,0,1-.11,2c-.2,1.15-.89,1.31-1.66,1.77s-.69.77-.88,1.84.38,1,.84,1.77.23,1,.54,2,.31,1.16.77,1.47,1.58-.35,2.54-.16a10.21,10.21,0,0,0,2.54.39c1.38,0,1.07-.31,1.54-.46a5.9,5.9,0,0,1,1.92-.24,4.65,4.65,0,0,0,2.38-.34c.93-.42.89-.66,1.31-1a4.38,4.38,0,0,1,.92-.69c.16,0,.89-.08,1.54-.23s.58-.62.81-1,.73-.46,1.23-.73a1.8,1.8,0,0,1,1.16-.15c.42,0,1.73-1.46,2.15-1.77s.58-.5.92-.73,1,.35.89,1.23a1.81,1.81,0,0,0,0,.92c0,.27,1.07.77,1.07.77s1.31-.07,1.85,0,1.15.31,1.85.43a8.41,8.41,0,0,0,2.8-.23,7.72,7.72,0,0,1,1.66-.39,6.28,6.28,0,0,1,2.38.35,2.1,2.1,0,0,0,1.81-.23c.65-.27.42-.77.77-1.27s.69-.35,1.11-.27.08.88-.07,1.5a13.72,13.72,0,0,1-.66,1.84c-.23.54-.53.89-.77,1.5a4.77,4.77,0,0,0,0,1.81c0,.46.2.89.93,1.54s1,.15,1.15.15a2.62,2.62,0,0,1,1.08.7c.34.34.31.77.46,1a3.33,3.33,0,0,1,0,1.23s.46.84.62,1.23a4.69,4.69,0,0,0,.65,1.11,5.11,5.11,0,0,0,.77,1,5.65,5.65,0,0,0,1.11.65,7.19,7.19,0,0,0,.89.27c.27.08.81,1.08,1.11,1.5a5.72,5.72,0,0,1,.66,1,12.73,12.73,0,0,0,1,1.46c.34.46.42.69.73,1.12a3.07,3.07,0,0,0,1.27.92,12,12,0,0,1,1.61.69c.73.42.46.54.85,1.08s.23,1,.27,1.69,0,1.12,0,1.35.5.65.57.77a7.72,7.72,0,0,0,1.85.84c.27,0,1.15.85,1.38,1.19s.54.16,1.24.5a10.27,10.27,0,0,1,1.69,1.12,19.22,19.22,0,0,1,1.34,1.69c.47.54-.15.77,0,1.58a8.75,8.75,0,0,0,.89,2c.23.5,1,.88,1.59,1.23a8.39,8.39,0,0,0,1.64.65c.38.12.54.81.35,1.31a5.4,5.4,0,0,1-.93,1.27c-.38.5-.31,1.42-.46,2a5.32,5.32,0,0,0-.23,1.5,3.24,3.24,0,0,1-.27,1.42,1.91,1.91,0,0,0,0,1.2,18.79,18.79,0,0,1,0,2.69,4.4,4.4,0,0,0,.27,2.15c.19.42.69.62,1.46,1.23a3.13,3.13,0,0,1,1.31,1.93c.07.65-.23,1.42,0,2.07s.69.66,1.07,1a5.54,5.54,0,0,0,1.74.85c.57.19.69.81,1.07,1.92s.58.73.77,1.46-.84.73-1.58.77-.5.62-.5,1.12a1,1,0,0,1-.76,1.11c-.62.2-1.58,3-1.43,3.35s1.12,1.58,1.35,2,1.65,1.69,1.84,2a3.78,3.78,0,0,0,1.89,1.07,7.39,7.39,0,0,1,1.88.66c.58.34,1.81.88,2.58,1.38s1.23,1.7,1.58,2.08a24.08,24.08,0,0,1,1.69,2.19,3.09,3.09,0,0,1,.54,1.66,22.83,22.83,0,0,1,.11,2.8c0,.7-.23.77-1,1s.23.93.5,1.66,1.43,1.07,1.93,1.19,2.34.38,2.92.5a4.25,4.25,0,0,0,2.08,0,11.43,11.43,0,0,1,3.27-.46,3.82,3.82,0,0,1,2.11.73c.66.38,1.23,1.57,1.89,2.42s.5,1.08,1,1.5,1.38.12,2.27.35a5.44,5.44,0,0,0,2.8-.23,8.48,8.48,0,0,1,2.66-.23c.61,0,1.92,1,2.84,1a8.36,8.36,0,0,0,2.47-.73c.77-.27,2.07.73,2.5.61s.88-.5,2.15-.92.85.84,1.31,1.15a5.54,5.54,0,0,0,2.57.66,5.77,5.77,0,0,1,1.81.3,11.15,11.15,0,0,0,2.5.47,17.94,17.94,0,0,0,2.93-.66c.8-.23,1-.15,1.5-.31a6.25,6.25,0,0,0,2.19-1c.61-.53,1.11-.16,2.23-.35a4.66,4.66,0,0,1,2.23.34,2.55,2.55,0,0,0,1.61-.61c.27-.27,2.35,0,3-.5a6.87,6.87,0,0,1,1.85-1,4.76,4.76,0,0,0,1.73-.73,22.07,22.07,0,0,1,1.92-1.93c.93-.76,1.54-.3,2-.38a2.85,2.85,0,0,0,1.58-1.19,6.19,6.19,0,0,1,2.08-1.62c.65-.34,1.58-.46,2-.69s.83-1.46.26-1.77,0-1.38.33-1.54a1.81,1.81,0,0,0,1-1.34c0-.62,0-1.54,0-2.23s-.42-.35-.77-.7a1,1,0,0,1,0-1.3,3.55,3.55,0,0,1,1.24-.5,14.51,14.51,0,0,1,1.65-.62c1-.35.61-.31,1.61-1.15a5.92,5.92,0,0,1,1.39-.93,10.8,10.8,0,0,0,1.35-1.27c.23-.3,1-1.07,1-1.42a2.61,2.61,0,0,1,.35-1.35c.27-.42,1.45-1.26,1.57-1.76s-.54-1.39-.66-1.7a11.27,11.27,0,0,0-.8-1.23c-.35-.54.19-1.11.57-1.23a7.51,7.51,0,0,0,2.17-.77c.59-.42,2.26,0,3,0s1.42.19,2,.19,2.27.54,3.46.54,1.35-.58,2.5-1,2.58.2,3.23,0a9,9,0,0,0,1.88-1.11,10.09,10.09,0,0,1,2.62-.62,4.54,4.54,0,0,0,2.12-1.5c.34-.54.5-.38,1.69-1s1-.92,1.27-1.27a5.12,5.12,0,0,1,1.5-.88c.54-.27.34-1.39.07-1.85s-.46-.46-.42-1a17.22,17.22,0,0,0-.27-1.92,4,4,0,0,1,.12-2.08c.27-.57,1.88-.38,2.42-.65a13.8,13.8,0,0,1,2.31-1.12,2.57,2.57,0,0,0,1.69-.84c.42-.58.31-1.5.46-2.46A2.14,2.14,0,0,0,751,647a2.82,2.82,0,0,1-.31-1.38c0-.54.5-1.2.39-1.46s.65-1.24.53-2-.23-1-.38-1.16-.35-1.8-.81-2.07.08-1.12.27-1.77.58-.46,1.31-1,.77-.93,1.19-1.31.77-.39,1.54-.23a6.13,6.13,0,0,0,1.92.42,5.47,5.47,0,0,1,2.43.54,2.44,2.44,0,0,0,2.07-.31,11.2,11.2,0,0,1,3.54.08,11.29,11.29,0,0,0,2.85.23,4.67,4.67,0,0,0,2.23-.54,22.63,22.63,0,0,1,4.34-.65,4.39,4.39,0,0,0,2.12-.89,4.25,4.25,0,0,1,1.61-1.15c.39-.08,1.16-.77,1.16-1.27a1.68,1.68,0,0,0-.54-1.15c-.31-.39-.08-1-.38-1.66s0-2-.12-2.69,1.35-1.42,1.62-2,1-.84,1.42-1.11.92-1.12,1.31-1.2a17.31,17.31,0,0,1,2.27-.53c.53,0,4,.57,4.34.5s1.81.11,2.39,0,.42-1.12.53-2-.07-.77-.23-1-.11-2.11.31-2.38a2.83,2.83,0,0,1,2.35.11c.88.43,1.46.08,2.65,0a4,4,0,0,0,2.31-.54c.65-.42.23-1.19,0-1.88s-.81-.88-1.23-1.54-.65-1-1.19-2-.93-.38-1.81-.62,0-1,.58-1.5,1.27-.38,1.57-1,1.35-.84,1.93-1.07.5-1.08.5-1.35a8.49,8.49,0,0,0-.27-1.31c-.12-.46-.16-1.47-.31-2s.51-1.18.82-1.74,1.18-.2,2.15-.67a8.28,8.28,0,0,1,2.26-.46c.56-.15,2.15-.31,2.87-.41s.72-.72.93-1.64-.62-.92-.88-1.44a5,5,0,0,1-.36-1.64,4.12,4.12,0,0,1,.93-2,7,7,0,0,1,1.9-1.59,13.62,13.62,0,0,1,1.87-.82c.74-.36.84-1.38.84-2.1s0-1.54,0-2.15a6.09,6.09,0,0,1,.21-1.7c.15-.51,1-.51,1.28-.61a3,3,0,0,0,1.13-1.9,12.56,12.56,0,0,0,.51-2.66,3.27,3.27,0,0,0-.51-2c-.21-.57-1.08-1.08-1.69-1.9s-1-.77-1.82-1.18,0-1.64,0-2.67,1.41-1,1.72-1.28,1.12-.41,1.58-.67a11.24,11.24,0,0,0,2.42-1.12c.41-.47,0-2,0-2.36s.66-.57,1.23-1.18a7.85,7.85,0,0,0,1.18-2.46,25.83,25.83,0,0,0,.05-2.88,4.24,4.24,0,0,0-.21-1.18c0-.41-.3-.87-.56-.92s-.14-2.79-.14-3.25a4,4,0,0,1,.5-1.39,2.35,2.35,0,0,0-.35-1.61c-.19-.35-1.15-.81-1.42-1.16s.23-.92.46-1,.92.46,1.81,1.08,1.65-.15,2.46-.38a8.26,8.26,0,0,1,2.77.07c.73.08,1.27.62,2.11.5a8.59,8.59,0,0,0,1.77-.46c.12,0,3.62,0,4.31.08s.62.54,1,1.34,1.54.77,1.92.89a13.9,13.9,0,0,0,2,.27,13.66,13.66,0,0,0,2.3,0c.89,0,1.43.11,2.27,0s1.43-.27,2.27-.35a8.56,8.56,0,0,0,2-.38,5,5,0,0,0,1.58-1.31,4.72,4.72,0,0,1,1.85-1.15c.69-.31,1-.12,1.27-.31a4.1,4.1,0,0,0,.84-2.15c.12-1-.34-1.16-.5-1.62s.35-.54.66-.77-.13-1.22-.39-1.78-1-.31-1.44-.51-.41-.57-.15-1.08,1.18-.67,1.74-.62.26.77.41,1.08,1.65-.26,2.47-.51,1.07.25,1.48,0,.62-2.1.72-2.57,1.18-.82,1.75-1a2.25,2.25,0,0,0,1.07-1.39,12.23,12.23,0,0,1,1.39-1.79,12.6,12.6,0,0,1,1.74-1.39c.51-.41,1.23-.71,1.69-1a2,2,0,0,0,.57-1.75c0-.71.87-1.53,1.28-1.89a5.36,5.36,0,0,0,1.23-1.54,2.62,2.62,0,0,1,1.54-1.18,9.09,9.09,0,0,0,2-1.23c.67-.41,2.36-2.21,2.82-2.46s.72-1.54.77-2.16-.92-1.74-1.08-2.46-.77-1-1.28-1.49-.41-1.94-.36-2.41,1.9-1.12,2.36-1.59a8.28,8.28,0,0,1,2.56-.92,8.85,8.85,0,0,0,2.16-.92c.41-.31.2-1.85.36-2.62a7.46,7.46,0,0,1,1.23-2.15,7.65,7.65,0,0,0,1-2.87c0-.93.26-1.7.21-2.26s-1-.41-1.75-.82-.66-.92-1-1.5-1.64-.24-2.46-.35-1.54.06-2.26-.1-.67.05-1.33.16-1.59.61-2.41,0a5.86,5.86,0,0,1-1.54-2.16,2.92,2.92,0,0,0-2.05-1.23,2.73,2.73,0,0,1-1.75-1.18,4.92,4.92,0,0,0-1.38-1.59c-.77-.61-1.33.1-2-.51s-.57-.16-2-.87-1.59.15-2.62,0-.61-1.44-.61-2.11a5.06,5.06,0,0,0-.31-1.84c-.26-.82-.72-1.49-.92-2.05s-.36-.87-.57-1.34a15.8,15.8,0,0,0-.92-2.48c-.46-.75-.77-.59-1.38-1.21s-1.44-.1-2,.21-1.24.56-1.85.87-1.49-.05-2.21,0-.1-.92.11-1.59a5.44,5.44,0,0,1,1.12-2,3.81,3.81,0,0,1,1.65-1.13,3.11,3.11,0,0,0,1.18-.87c.46-.46.56-.67,1-.82s1-2.21.56-3-.92-.36-1.33-.87-.61-.92-1-1.49-1.08-.71-1.59-1.17.41-.31.87-.62.46-1.54.2-2.21-.77-.82-1-1.33-1.08-.61-1.44-.77-1.28,0-1.89-.41,0-.87.56-1,.31-1.18.26-1.75.51-1,.92-1.69a2.39,2.39,0,0,0,.1-2.2c-.31-.57-1-1.08-1.18-1.75a17.56,17.56,0,0,0-.61-2.2c-.31-.67-.67-.41-1.7-.36s-1.07,0-1.18-.62-.66-.77-1.28-1.23-.2-.82.26-1.38,1.18-.31,1.64-.82a25.28,25.28,0,0,1,2-1.59,14.86,14.86,0,0,1,1.9-1c.77-.46.82-1,.31-1.33a3.55,3.55,0,0,1-1.29-1.34,7.66,7.66,0,0,0-1.43-1.64,9.54,9.54,0,0,1-1.23-1.38,3.27,3.27,0,0,0-2.11-1.49c-1.18-.26-1.18-.26-1.53-.72a5,5,0,0,1-.52-1.95,13.9,13.9,0,0,1,0-2.46c0-1,.62-.82,1.08-1.07a6.75,6.75,0,0,0,1.39-1c.61-.56,1-1.18,1.59-1.74s1-.62,1.69-1.18,2.51-.52,2.36-1a17.8,17.8,0,0,1,.05-2.36,4,4,0,0,0-.82-2.15c-.41-.51-1-.46-1.75-1s-.61-1-1-1.53.46-1.23.56-2.11a6,6,0,0,0-.25-2.3,5,5,0,0,1,0-2.47c.25-.87.72-1.33.72-2.1a3.36,3.36,0,0,1,.51-1.84,17.92,17.92,0,0,0,.77-2.57c.31-1-.26-1.33-.77-2.1s-.41-1.08-.87-1.23-.44-1.13-1-1.67-.62-2.08-.77-2.38a8.08,8.08,0,0,1-.85-2.54c-.23-1.39-1.69-.85-2.69-1.23s-.46-1-.46-1.93a2,2,0,0,1,.92-1.84c.54-.31,1.85-.54,2.31-.85s.54-2.23.92-3,1.62-.69,2.15-1.15,1.62-1.46,2.16-2a9.2,9.2,0,0,0,1.38-3.62c.08-.84,1.62-2.92,2.16-2.92s1.38-1.46,1.07-2.15-1.38-1.23-2.07-1.77-1.08-2.23-1.39-3.16-1.07-1.92-1.61-3.07a19.17,19.17,0,0,0-1.93-2.62c-.53-.85-1-1.31-1.38-1.92s.38-.85,1.38-1.85a5,5,0,0,0,1.54-2.31,25.76,25.76,0,0,0,.46-2.61c.16-.85,1-1.31,2.08-1.85s.54-1.46.54-2.15-.08-2.23-.15-3.08a14.68,14.68,0,0,0-.77-2.77c-.31-.92-1.16-.69-1.93-1.38a7.42,7.42,0,0,1-1.92-2.85c-.23-.84-1.46-.84-3-1.31a16.65,16.65,0,0,1-4.23-2.69,31.12,31.12,0,0,1-2.69-2.54c-1.23-1.23.61-2.46,1-2.69a4.19,4.19,0,0,0,1.54-2.92c0-1.39-.7-1.08-.93-2.16s0-3.23-.15-4.3.31-1,1.08-1.31.92-.23,2.46-.69,2.69,0,4.54,0,2.3-.62,3.69-1.54a6.53,6.53,0,0,1,3.15-1.39,18.5,18.5,0,0,0,4.46-1.92,5.58,5.58,0,0,0,2.31-2.92c.08-.46,2.39-2.23,2.92-2.85s1.23-2.15,2-3.38,1.39-1,1.47-1.85,2-4,2.5-4.81.84-.61,1.76-1,1.12-.5,1.39-1.42a12.7,12.7,0,0,0,.46-2c.12-.73,1.23-1.73,1.5-2.15a6.06,6.06,0,0,1,2.19-1.62c1-.46,1.31-.69,1.58-1.27s1-1,1-1.42-.12-1.77-.15-2.35a1.85,1.85,0,0,1,.73-1.57,2.36,2.36,0,0,0,.77-1.77,4.31,4.31,0,0,0-.93-2.66c-.69-.88-.77-.69-1.69-.92s-.46-.54-.73-1.77-.65-.88-1.12-1.34-1-.77-1.15-1.62.81-1.15,1.42-1.59a3.29,3.29,0,0,1,2.39,0c.46.15,2.08-.54,2.69-.74s.54-.42,1.19-.53,1.5-2.25,2-2.94a6.18,6.18,0,0,0,1-2.08c.18-.61,1.15-1.07,1.77-1.54s.61-1,.79-1.82a2.62,2.62,0,0,1,.92-1.46c.36-.33.57-1.95.7-2.3s-.29-.95-.95-1.42.2-1,.28-1.64-.41-.87-.28-1.43.61-.44,1-.62a5.09,5.09,0,0,0,1.2-.92c.64-.56,1.46-.39,1.62-.49a5,5,0,0,0,1.36-.95c.51-.56,1.25,0,1.82,0a3.85,3.85,0,0,0,1.33-.51c.33-.15.36-1.08.54-1.56a2.59,2.59,0,0,1,.79-1,5.76,5.76,0,0,0,.72-2.11c.18-.66.49-.77.9-1.13a3.23,3.23,0,0,0,.79-1.17,1.29,1.29,0,0,1,.67-.59c.18-.13,1-1.39,1.16-1.54a9.36,9.36,0,0,0,.73-1.08,3.43,3.43,0,0,0-.31-2.23,6.18,6.18,0,0,1-.42-2c-.12-.92.38-1,.57-1.31a10.64,10.64,0,0,0,.66-1.46c.38-1,0-.81-.12-1.73a17.5,17.5,0,0,1-.08-1.89,5.08,5.08,0,0,1,.16-1.8c.23-.77.57-.62,1.13-1S902.77,225.62,902.9,224.85ZM656.77,581a4.11,4.11,0,0,0-.08,2.38c.23.7.69,1,.39,1.93a14.76,14.76,0,0,1-.7,1.92,5.51,5.51,0,0,1-1.3,1.46,4.79,4.79,0,0,1-1.77,1.16c-1,.38-1.46.15-2.46.84s-.77,1.62-2.31,1.85-2.46.84-2.46,0-.7-1.31-2.23-1.54l-4.54-.69s-2.08-.93-2.62-.31a3.11,3.11,0,0,1-2.54.62c-.61-.16-1.38-.93-2.3-.54s-1.93.15-2.93.61-1.3,1.16-2.3,1.31-1.54.38-1.93.15a10.31,10.31,0,0,0-1.92-1.53c-1.15-.62-2.08-.47-2.85-1.31s-.54.61-1.61.77a12.94,12.94,0,0,1-2.16.15,2.91,2.91,0,0,1-2.46-1.15c-.39-.43-.47-.51-.49-.5l-.58-.66a3.14,3.14,0,0,0-2.77-1.3c-.62,0-1-.7-2.16-1.24s-2.61-1.3-3.07-.84a9.75,9.75,0,0,1-2.08,1.84,4.54,4.54,0,0,1-2.31.39c-.77-.15-.85.77-2.08.77s-1.84-.31-2.3.31a3.55,3.55,0,0,1-1.7,1.46c-.77.23-.38,1.07-2,.77s-2.15.3-2.3-1.08a27,27,0,0,0-.85-3.08c-.23-1.15.08-2.61-.62-3.15s-2-1.23-1.46-2.23.23-1.92,1.16-2.54,1.3-1.38,1.15-1.77-1.31-1.23-1.31-2.08-.15-1.92.93-2.53,1.77-.7,1.84-1.54a20.58,20.58,0,0,0,.16-2.54c0-1.23,0-1.69.38-2.16s.62-1.38,1.54-1.69a2.3,2.3,0,0,0,1.69-1.54,8.28,8.28,0,0,0,.31-2.84c-.08-.23-.15-1.68-.77-1.84s-.92.15-1.15-.93-.08-1.54.38-1.85a5.08,5.08,0,0,0,1.23-1.46c.54-.77.54-.85.31-1.69s-.77-.31-1.54-.85a13.29,13.29,0,0,1-1.77-1.54c-.38-.38-.84-1.07-.54-1.61s.23-1.62.62-2,.69-1.31,1.15-1.77a4.07,4.07,0,0,0,1.08-1.92c.08-.62.85-1.85-.23-2.47s-2-.92-2.16-1.53-.41-1.45.16-2c.87-.85.92-1.77,1.92-1.93s.77,1.08,2.08.46a4,4,0,0,0,2.23-1.92c.61-1,.92-.84,1.77-.69a2.41,2.41,0,0,0,1.84-.11c1.24-.35,1.47,0,1.77-1.2s-.3-1.61-.84-2.23-1.77-1.15-.69-2,.31-2.08,1.62-2.38,1.14-1.23,2.76-1.16,3.46-.92,4.54-.69,3.31.23,3.92.85a3.43,3.43,0,0,0,2.23,1.23c1.16.15,1.69-.08,2.93.07s2.15-.38,3.07.16,1.69-.69,2.31.38a6.93,6.93,0,0,0,3.08,2.62,4.25,4.25,0,0,0,1.77.15,11.89,11.89,0,0,0,3.15-.61,10.43,10.43,0,0,0,1.77-1.23c.46-.39.31-.85,1.77-.77s2-.62,2.84-.77a21.82,21.82,0,0,1,2.85-.39,4,4,0,0,0,1.92-.92c.54-.39.54-1.15,1.39-.23s1.46.69,1.77,1.38,1.23-.15,2.31.08,2.76-.46,2.23.46a2.64,2.64,0,0,1-1.77,1.46c-.7.16-1.7.77-1.7,1.08a3.37,3.37,0,0,1-.15,1.91,16.21,16.21,0,0,1-1.46,1.71c-.39.46-1.15,1-1.23,1.38s-1.08.54-.92,1.31-.16,2.38-.62,2.54a5.38,5.38,0,0,0-1.62.69c-.15.23-.53,1.15-1.07,2s-.69,1.15-1.31,1.38-1,.77-1.08,1.85.54,2.54-.38,3.15-.85,1.39-.77,2.39-.54,1.92.08,2.61,1.15.7,1.15,1.77.38,1.85,1.23,2,.77-.31.62,1.39a22.65,22.65,0,0,0-.16,3.84,7.43,7.43,0,0,1-.38,2.93,3.71,3.71,0,0,0,.46,2.69c.46.69.69,1.31,1.61,1.31s1.62.15,1.85,1.07a8.4,8.4,0,0,0,1.08,2.39c.38.61.84,1.54,1.69,1.54a16,16,0,0,1,2.77,0c.85.15,1.51-.39,2.18.46a3.23,3.23,0,0,1,.74,2.15c0,.54-.69,1.08-.84,1.69s.38,1.23.84,1.62a2.69,2.69,0,0,0,2.08,1c1.08-.08,1.92-.6,2.23,0a4.5,4.5,0,0,1,.85,2C657.85,580.54,657,580.54,656.77,581Zm91.48,25.08c-.1.54-.63,1.3-1,1.3s-.69-.69-1,0-.31,1-.85,1.39.31.92-.53.38-2.27-.77-1.91-1a7.8,7.8,0,0,0,1.06-1s.69-.61.31-1,.07.23-.39-.38-.33-1.86-.83-1.71-.92,0-1.22.07-.34.4-.64.55-.26.47-.73.15-.33-.42-.73-.8-.54-.32-.65-.71.25-.61-.07-.88-.48-.28-.63-.44c-.31-.35-.65-.38-.69-1s-.11-1,.35-1.5.34-.58.65-1.27.46-.07.89-.73.23-.5.23-1.65a3.28,3.28,0,0,0-.54-2.08,3.15,3.15,0,0,1-.51-1.42c-.22-.89-.44-.89,0-1.46s.47-1,.82-1.54,1.16-.62.27-1.43a3.5,3.5,0,0,1-1.31-1.73c-.31-.77-1.26-1-.88-1.38a4.71,4.71,0,0,0,1.25-1.58,6.08,6.08,0,0,1,.78-1.81c.42-.57,1-1.19,1-1.76s-.23-1.39.58-.7.77.81,1.5.93,1.69-.2,1.27.46-1.31.5-1.16,1.34,0,1.27.58,1.43.89,0,1.58.19.92.19,1.08.73.65.81.5,1.08-.93.5-1,1,.11.61.23,1.26a2.34,2.34,0,0,0,.79,1.31,3.88,3.88,0,0,1,.82,2.19c-.11.58-.47,1.24,0,1.43s.6.5.56.73.17.84,0,1.27.07,1-.36,1.31-.77.19-.73,1-.27,1.5.19,2,1.14.38,1,1,.32,1.31,0,1.77-.68.07-.76.69-.69.85-.3,1.46,1.31,1,1.15,1.39S748.34,605.54,748.25,606.08Zm24.24-243a2.63,2.63,0,0,1-.7.9c-.28.18-.69.43-.92.61s-.49.64-.77.87a4.35,4.35,0,0,1-1.15.64c-.41.16-.72-.12-1.16-.18a8.43,8.43,0,0,0-1.74.36,3.62,3.62,0,0,1-1.33,0c-.36,0-.49.46-.9.77s-.33.46-.41,1.57-.44.71-1.2,1.23-.88.05-1.77,0-.29-.31-.44-.85-.33-.61-.67-.72a2.93,2.93,0,0,1-1.05-.56c-.56-.43.54-.92.59-1.31s-.28-.72-.59-1.31.57-.94.72-1.29-.08-.63-.18-.89a2.08,2.08,0,0,1-.33-1.3c.07-.7.48-.44,1-.67s.18-.51.59-.82a3.11,3.11,0,0,1,.85-.44,16.38,16.38,0,0,0,1.2-1.64c.29-.31.9,0,1.49.08a4,4,0,0,0,1.76-.54c.55-.2.83.13,1.19.2a4.09,4.09,0,0,0,1.95.06c.69-.23,1.13.31,1.36.41a8.18,8.18,0,0,0,1.66.64c.34,0,.67.49.75,1.05a12.48,12.48,0,0,1,.18,1.79C772.46,362.33,772.56,363,772.49,363.13ZM616.74,336.26a1,1,0,0,1,0,1.25c-.2.31-.61.67-1,1.18s-.57.82-1,1.39-.87-.93-1.69-1.29-1.08.26-1.33,0,.05-.92.46-1.38.66-.31,1-.77-.25-.82-.77-.92-.41-.36-.66-.87.51-1,.77-1.27a6.2,6.2,0,0,1,1.07-1.2c.41-.25,1.13.26,1.39.77s.82,1.13.77,1.7A15.19,15.19,0,0,0,616.74,336.26Zm-7.23-24.13c.15.11.62.25.82.61a1.53,1.53,0,0,0,1.24.57c.56.05.81-.77,1.17,0s.47,1.07,1.13,1.13a15.44,15.44,0,0,0,2.16,0c.41-.06,1.28-.54,1.74,0a1.67,1.67,0,0,0,1.69.58,7.11,7.11,0,0,0,1.9-.67c.36-.2,1.18-.58,1.54-.77s.56-.61,0-.87-.87-.2-1.08-.61-.77-1-.41-1.18a2.79,2.79,0,0,0,.72-.57,1.63,1.63,0,0,0,.31-1.23c-.11-.2-.72-.15-1-.61a4.54,4.54,0,0,1-.92-1.59c0-.51-1.13-.26-1.39-.72s-.92-1.18-1.07-1.44-.5-1.64-1.07-1.07a3.78,3.78,0,0,1-1.75.82c-.52.15-.14.72-.94.87s-2-.1-2,.67-1.32,1-.66,1.33A4,4,0,0,1,613,308.9c.26.41.72.82.31,1.13s-1.52,1.23-1.74,1.07a1.65,1.65,0,0,0-1.29-.2C609.77,311.05,608.26,311.14,609.51,312.13Z" transform="translate(1 1)"/>
                <g id="waters">
                    <path id="lake-cayur" :class="getWaterClass('lake-cayur')" @click="selectWater('lake-cayur')" :style="getWaterStyle('lake-cayur')" @mouseover="hoverOn('lake-cayur', 'ceyana')" @mouseout="hoverOff('lake-cayur')" d="M331.88,618.15a7.49,7.49,0,0,0,1.77-1.73c.47-.73,1-1.27.73-2s-.5-1.31-.84-2.11-.81-1.58.15-1.89,2.35-.23,2.77-1.15.69-1.19,1.39-1,2.07,1.23,2.88,1.15,1.27-.54,2.12-.54a2.65,2.65,0,0,1,1.92.85,4.34,4.34,0,0,0,1.5,1.27,5.79,5.79,0,0,0,2,.07c.88,0,2.07.35,2.84-.27a9.9,9.9,0,0,1,2.23-1.38c.85-.38,1.35-.65,2-.35a10.35,10.35,0,0,1,2.85,1.77,1,1,0,0,1-.42,1.5c-.81.58-.62.73-1.73,1.46s-1.81,1.5-1.66,1.81-.54.85-1.08,1.19a1.39,1.39,0,0,0-.84,1.58,7.88,7.88,0,0,1-.89,3.23c-.27.54-.69.77.47,1.46s2.38,1,2.88,1.85,1.5,1.38,1,1.92-2.23,1-2.46.43-.27-.5-1.16-.73a2.38,2.38,0,0,0-1.8.34,2,2,0,0,1-2.24.19c-1.3-.61-1.42-1.23-1.46-1.69s.08-.81-1.07-1.11-1.58-1.54-2.27-1-.62,1.23-1.43,1a4.83,4.83,0,0,1-1.8-1.16,1.62,1.62,0,0,0-2,.16c-.54.38-.39.77-1.31,1.23s-2,.88-2.62.46-2.26-.69-1.23-1.12,2-.92,1.27-1.8a8.89,8.89,0,0,0-2-1.62C331.85,620,330.63,619.24,331.88,618.15Z" transform="translate(1 1)"/>
                    <path id="lake-atitlan" :class="getWaterClass('lake-atitlan')" @click="selectWater('lake-atitlan')" :style="getWaterStyle('lake-atitlan')" @mouseover="hoverOn('lake-atitlan')" @mouseout="hoverOff('lake-atitlan')" d="M591.54,535.85c.87-.85.92-1.77,1.92-1.93s.77,1.08,2.08.46a4,4,0,0,0,2.23-1.92c.61-1,.92-.84,1.77-.69a2.41,2.41,0,0,0,1.84-.11c1.24-.35,1.47,0,1.77-1.2s-.3-1.61-.84-2.23-1.77-1.15-.69-2,.31-2.08,1.62-2.38,1.14-1.23,2.76-1.16,3.46-.92,4.54-.69,3.31.23,3.92.85a3.43,3.43,0,0,0,2.23,1.23c1.16.15,1.69-.08,2.93.07s2.15-.38,3.07.16,1.69-.69,2.31.38a6.93,6.93,0,0,0,3.08,2.62,4.25,4.25,0,0,0,1.77.15,11.89,11.89,0,0,0,3.15-.61,10.43,10.43,0,0,0,1.77-1.23c.46-.39.31-.85,1.77-.77s2-.62,2.84-.77a21.82,21.82,0,0,1,2.85-.39,4,4,0,0,0,1.92-.92c.54-.39.54-1.15,1.39-.23s1.46.69,1.77,1.38,1.23-.15,2.31.08,2.76-.46,2.23.46a2.64,2.64,0,0,1-1.77,1.46c-.7.16-1.7.77-1.7,1.08a3.37,3.37,0,0,1-.15,1.91,16.21,16.21,0,0,1-1.46,1.71c-.39.46-1.15,1-1.23,1.38s-1.08.54-.92,1.31-.16,2.38-.62,2.54a5.38,5.38,0,0,0-1.62.69c-.15.23-.53,1.15-1.07,2s-.69,1.15-1.31,1.38-1,.77-1.08,1.85.54,2.54-.38,3.15-.85,1.39-.77,2.39-.54,1.92.08,2.61,1.15.7,1.15,1.77.38,1.85,1.23,2,.77-.31.62,1.39a22.65,22.65,0,0,0-.16,3.84,7.43,7.43,0,0,1-.38,2.93,3.71,3.71,0,0,0,.46,2.69c.46.69.69,1.31,1.61,1.31s1.62.15,1.85,1.07a8.4,8.4,0,0,0,1.08,2.39c.38.61.84,1.54,1.69,1.54a16,16,0,0,1,2.77,0c.85.15,1.51-.39,2.18.46a3.23,3.23,0,0,1,.74,2.15c0,.54-.69,1.08-.84,1.69s.38,1.23.84,1.62a2.69,2.69,0,0,0,2.08,1c1.08-.08,1.92-.6,2.23,0a4.5,4.5,0,0,1,.85,2c0,.77-.85.77-1.08,1.23a4.11,4.11,0,0,0-.08,2.38c.23.7.69,1,.39,1.93a14.76,14.76,0,0,1-.7,1.92,5.51,5.51,0,0,1-1.3,1.46,4.79,4.79,0,0,1-1.77,1.16c-1,.38-1.46.15-2.46.84s-.77,1.62-2.31,1.85-2.46.84-2.46,0-.7-1.31-2.23-1.54l-4.54-.69s-2.08-.93-2.62-.31a3.11,3.11,0,0,1-2.54.62c-.61-.16-1.38-.93-2.3-.54s-1.93.15-2.93.61-1.3,1.16-2.3,1.31-1.54.38-1.93.15a10.31,10.31,0,0,0-1.92-1.53c-1.15-.62-2.08-.47-2.85-1.31s-.54.61-1.61.77a12.94,12.94,0,0,1-2.16.15,2.91,2.91,0,0,1-2.46-1.15c-1.07-1.16.16.23-1.07-1.16a3.14,3.14,0,0,0-2.77-1.3c-.62,0-1-.7-2.16-1.24s-2.61-1.3-3.07-.84a9.75,9.75,0,0,1-2.08,1.84,4.54,4.54,0,0,1-2.31.39c-.77-.15-.85.77-2.08.77s-1.84-.31-2.3.31a3.55,3.55,0,0,1-1.7,1.46c-.77.23-.38,1.07-2,.77s-2.15.3-2.3-1.08a27,27,0,0,0-.85-3.08c-.23-1.15.08-2.61-.62-3.15s-2-1.23-1.46-2.23.23-1.92,1.16-2.54,1.3-1.38,1.15-1.77-1.31-1.23-1.31-2.08-.15-1.92.93-2.53,1.77-.7,1.84-1.54a20.58,20.58,0,0,0,.16-2.54c0-1.23,0-1.69.38-2.16s.62-1.38,1.54-1.69a2.3,2.3,0,0,0,1.69-1.54,8.28,8.28,0,0,0,.31-2.84c-.08-.23-.15-1.68-.77-1.84s-.92.15-1.15-.93-.08-1.54.38-1.85a5.08,5.08,0,0,0,1.23-1.46c.54-.77.54-.85.31-1.69s-.77-.31-1.54-.85a13.29,13.29,0,0,1-1.77-1.54c-.38-.38-.84-1.07-.54-1.61s.23-1.62.62-2,.69-1.31,1.15-1.77a4.07,4.07,0,0,0,1.08-1.92c.08-.62.85-1.85-.23-2.47s-2-.92-2.16-1.53S591,536.4,591.54,535.85Z" transform="translate(1 1)"/>
                    <path id="unknown" :class="getWaterClass('unknown')" @click="selectWater('unknown')" :style="getWaterStyle('unknown')" @mouseover="hoverOn('unknown')" @mouseout="hoverOff('unknown')" d="M738.42,602c-.31-.35-.65-.38-.69-1s-.11-1,.35-1.5.34-.58.65-1.27.46-.07.89-.73.23-.5.23-1.65a3.28,3.28,0,0,0-.54-2.08,3.15,3.15,0,0,1-.51-1.42c-.22-.89-.44-.89,0-1.46s.47-1,.82-1.54,1.16-.62.27-1.43a3.5,3.5,0,0,1-1.31-1.73c-.31-.77-1.26-1-.88-1.38a4.71,4.71,0,0,0,1.25-1.58,6.08,6.08,0,0,1,.78-1.81c.42-.57,1-1.19,1-1.76s-.23-1.39.58-.7.77.81,1.5.93,1.69-.2,1.27.46-1.31.5-1.16,1.34,0,1.27.58,1.43.89,0,1.58.19.92.19,1.08.73.65.81.5,1.08-.93.5-1,1,.11.61.23,1.26a2.34,2.34,0,0,0,.79,1.31,3.88,3.88,0,0,1,.82,2.19c-.11.58-.47,1.24,0,1.43s.6.5.56.73.17.84,0,1.27.07,1-.36,1.31-.77.19-.73,1-.27,1.5.19,2,1.14.38,1,1,.32,1.31,0,1.77-.68.07-.76.69-.69.85-.3,1.46,1.31,1,1.15,1.39.11.69,0,1.23-.63,1.3-1,1.3-.69-.69-1,0-.31,1-.85,1.39.31.92-.53.38-2.27-.77-1.91-1a7.8,7.8,0,0,0,1.06-1s.69-.61.31-1,.07.23-.39-.38-.33-1.86-.83-1.71-.92,0-1.22.07-.34.4-.64.55-.26.47-.73.15-.33-.42-.73-.8-.54-.32-.65-.71.25-.61-.07-.88S738.57,602.16,738.42,602Z" transform="translate(1 1)"/>
                    <path id="lake-ipala" :class="getWaterClass('lake-ipala')" @click="selectWater('lake-ipala')" :style="getWaterStyle('lake-ipala')" @mouseover="hoverOn('lake-ipala')" @mouseout="hoverOff('lake-ipala')" d="M758.28,367.77a2.93,2.93,0,0,0,1.05.56c.34.11.52.18.67.72s-.46.8.44.85,1,.51,1.77,0,1.12-.13,1.2-1.23,0-1.26.41-1.57.54-.79.9-.77a3.62,3.62,0,0,0,1.33,0,8.43,8.43,0,0,1,1.74-.36c.44.06.75.34,1.16.18a4.35,4.35,0,0,0,1.15-.64c.28-.23.54-.69.77-.87s.64-.43.92-.61a2.63,2.63,0,0,0,.7-.9c.07-.18,0-.8,0-1.34a12.48,12.48,0,0,0-.18-1.79c-.08-.56-.41-1.05-.75-1.05a8.18,8.18,0,0,1-1.66-.64c-.23-.1-.67-.64-1.36-.41a4.09,4.09,0,0,1-1.95-.06c-.36-.07-.64-.4-1.19-.2a4,4,0,0,1-1.76.54c-.59-.08-1.2-.39-1.49-.08a16.38,16.38,0,0,1-1.2,1.64,3.11,3.11,0,0,0-.85.44c-.41.31-.05.59-.59.82s-1,0-1,.67a2.08,2.08,0,0,0,.33,1.3c.1.26.33.54.18.89s-1,.7-.72,1.29.64.93.59,1.31S757.72,367.34,758.28,367.77Z" transform="translate(1 1)"/>
                </g>
            </g>
            <g v-if="terrain == 'kadia'" id="kadia">
                <path :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M366.7,721.9c-6.8-.18-3.26,6.1-7.29,7.45-6.13,2.06-4.54-1.53-11.14-1.91-15.41-.88-10.28,1.61-13.9,11.92-4.75,13.52-7.85,10.93-19.86,8.65a49.6,49.6,0,0,0-5.87-3.27c-5.6-1.6-6.73,2.55-13.22-1.36-6.85-4.14-9.77-10.26-6.13-17.51,3.82-7.61,16.43-5,18.87-8.92,1.87-3.05-2.17-4.81-1.5-6.72a47.05,47.05,0,0,1,3.86-8.56c.5-1,4.84-1.66,6-2.89-2.25,2.48,3.38-15.36,3.44-12-.11-6.34-5.83-12.09-10.83-18.2-7.65-9.34-8.23-6.3-19.9-7.76-6.25-.78-12.95-5-20.08-2.69-6.65,2.15-8.1,4.6-15.14,5.52a9.64,9.64,0,0,0-10.92.24,24.39,24.39,0,0,0-4,8.56c-6.94,5.43-9.82,4.61-19.06,5.36-6.26.51-11.82.67-17.23,3.75-2.32,1.32-8,11.26-12.27,9.12s-1.54-6.51-3.43-9.39c-1.1-1.67-4.94-2.49-5.55-3.54-4.48-7.7-6.48-15.61-7.77-24.11-2.34-15.47-1.71-7,9.09-13.45,4-2.37,9.26-12.76,9.3-17.16,0-3.19-3-10.26-5.16-12.67-.37-.41-7.09-5.06-6.64-4-4.48-11,4.17-10,10-17.1,7.56-9.22,1.65-5.73-.93-11.32-.42-.92,2.35-4.78,1.75-5.67-2.32-3.42-5.06-1.41-7.09-5.8-2.79-6-.41-7.82-1.21-14l.36-6.56c-.17-2.71-1.65-4-4.46-3.89-.27-.82-3.69,1.35-4.35-1.29-.88-3.49,4.63-8.72,7.14-10.77,5.27-4.31,14-8.44,20.53-10.73,5.29-1.83,10.4-1.28,15.23-4.8,8.31-6.07,2.93-2.71,5.69-9.7,2.1-5.31-2.69-4.38,2.53-10.67,1.83-2.2,6.26-4,8.82-5.52,10.22-6.17,18.77-10.15,26.12-20,4.75-6.34,7.86-14.26,14.92-18.74,4.91-3.12,21.46-5.18,24.57-8.73,9.61-10.94-21-28.28-27.25-34.12-4.59-4.28-12.92-16.27-14.06-22.45-1.37-7.47,4.13-14.09-4.65-19.51-6-3.68-26.9-5.08-33.82-4.63-5.64.37-10,7.93-19.57,2.91-7.75-4.08-7.75-11.93-12.71-18.12-7.15-8.95-15.77-7.54-6.95-16.14.36-.35,8.28-4.51,9.06-4.86a12.81,12.81,0,0,1,5.76-5.58,47.21,47.21,0,0,1,9.06,3.91c4.32-1.84,5.59-3,7.76-7.57,3.61-7.66-.58-3.58-.18-9.08.29-4,18-12.5,20.63-15.36,3-3.23,4.89-7.42,8-10.95,6.83-7.76,6.52-1.64,5.86-12.37-.25-4.15-4.84-18.33,4.38-17.5,2.87.25-.41,5,1.83,5.93,7.55,3.05,9.77,3.72,16.7-.4,3.6-2.14,7-7.19,9.15-10s-1.56-4.51,3.07-7.72c5.31-3.68,8.39,1,13,1.05,6.77,0,12.7-2.91,17.51-6.39,4.56-3.31-.78-6.62,8.07-5.6,7,.81,9.64,9.59,9.77,13.92.25,8.67-7.26,13-12.26,18.33-5.16,5.46-6.86,5.84-5.13,11.78,1.17,4,8.94,12,13,12.56,3.09.42,12.36-4.11,14.29-6.29,6.92-7.88,1.3-5.46-.21-12.32-5.8-26.41,17.07-4.61,22.72-15,3.23-5.92-9.08-11.32-4.59-15.84,2.45-2.47,11.6,5.9,13.2,7.09,4.4,3.28,3.21,6.57,9.81,7.53,2,.29,1.89-1.4,3.1-1.32-4.11-.25,10.54-1.59,8.48-.86,4.85-1.73,3,1.78,7.11-1.42,1.79-1.37,3.17-8.78,5.72-11.28,7.18-7,12.89-4.43,20.94-5.47,4.93-.64,5.13-1.51,9.85-1.9s15.66,2.35,18.92-2.46c2.76-4.06-1.94-15.51-3.57-19.86-.56-1.48-5.39-4.36-5.81-5.26.54,1.17,1.32-8.06,1-8.26-5.18-3.09-17.46,3.87-6.33-3.59,6.06-4.07,10.7-1.75,17.36-2.84,2.93-.48,3.4-3.78,6.17-4.35,4.74-1,9.52.6,14-.09,3.16-.48,4.06-4.56,7.29-3.65,4.5,1.25,3.38,4.23,5.72,5.7,7.16,4.47,2.81,5.53,12.21,1.31,15.28-6.85,27.16-15.08,44.76-15.69,9.78-.34,12.5,4,21.43,5.71,8.06,1.56,7.74-2.41,14.37-3.27,3.63-.46,5,.14,8.16.46,2.23.24,2.38,3.61,5.05,4.11,2.19.4.33-4.65,1.84-5.23-1,.39,6.9,1.09,6.25,1.13,2.62-.14,7,.65,9.15.5-.27,0,1.48,4.14,3.46,4.36,3.13.35,1.44-5.79,3-6.3,2.45-.83,3.29,5.21,6.26,4.8,2-.28.92-3.79,3-4,.16,0,6.44-1.11,6.57-1.17-.3.15,7.8-3.94,5.64-4,3,.12,1.7,5.92,4.44,4.91,5.53-2,13.78-17.71,23-17,6.3.51,3.35,7.83,9.12,7.4,8.54-.63,2.55-10.59,5.51-12.69,2.14-1.52,6.05,6.45,7.93,6.49,1.34,0,8.13-8.35,9.35-7.17,2.41,2.35-6.13,8.65,1.28,12.57,8.69,4.6,3.35-9.3,5.81-11.4,2.68-2.31,13.1,6.41,17.2,5,2.27-.78,5.58-7.22,8.35-8.37-1.61.67,16.81,6.49,23.31,5.83,9.27-1,16.57-9.77,27.25-7.76,3.23.61,5.92,2.5,9.33,3.12,5.75,1.06,9.11-1.56,14.92,3.84,1.53,1.42,4.17,1.06,5.69,2.85,1.18,1.38-2.19,5.31-.62,6.6,3.41,2.82,6.7,1.57,10.39,3.91,4.42,2.81,7.4,7.5,11.72,10.66,9.71,7.1,7.89,7.09,13.41,17.62,4.46,8.52,15.77,11.76,11.75,21.35-2.09,4.95-9.68,5.72-9.93,11.15-.23,5,10.26,12.16,12.05,16.6,1.47,3.68,5.61,7.8-.86,10.09-4.61,1.63-7-5.21-10.68-5-5.17.28-13.78,17.63-9.78,23.17.25.35,7.29.92,9.11,2,9.32,5.46,6,9.61,6.62,17.33.14,1.65-3.06,1.42-3.24,3.49s3.46,5.52,3.72,9.27c.84,12-14.51,19.31-23.4,26.45A140.79,140.79,0,0,0,824.34,336c-1,.95-3.2,1-3.86,1.74-2.1,2.47-2.83,4.14-5.05,7-2.89,3.68-11,13.19-10.84,18.8.13,4.31,5.5,5.64,7.41,10.28,4.2,10.16-5.74,22.31,8.81,19.15,7-1.52,6.28-6.36,13.5-3.19,2.8,1.23,14.32,12.4,15.16,15.14,3.31,10.7-11,16.46-14.7,24.2-5.11,10.64,3.93,24.53-6.11,34.41-3.48,3.43-8.41,3.66-11.54,1.29-4.65-3.51-.79-11.95-1.53-12.35,1.39.76-11.88-.6-10-1.5-3.44,1.63-3.66,5.07-5,7.95.37-.8-2.84,13-2.81,13.54,1.68,30.61,33,4.42,39.5,19.36,2.24,5.15-4.42,7-3.66,11.19.4,2.21,3.91.9,4.65,2.54,2.89,6.35,9.27,10.43,10.54,14.27.92,2.82,2,18.74-1.29,20.58,4.17-2.33-31.06-6.53-19.21,4.91.68.66,17.91-2.6,12.55,2.78-5,5-17.4-1.13-23.14.29-3.48.86-5.78,4.88-9.69,5.73-3.1.67-7.91-2.17-10.55-1-9.41,4-.56,4.68,2.19,9.12,8.41,13.57,22.27,24.55,19.55,40.82-3.09,18.46-14,33.17-20.5,50.77-1.9,5.15-3.81,15.67-3.26,20.06.3,2.48-2.44,3-.34,7,2.64,5,11.22,4.45,14.19,8.25,10.73,13.75-8.65,27.78-20.27,24-2.11-.68-.07-5.58-2.65-5.64-6.49-.16-2.82,3-7.37,5.1-6.44,2.94-6.57,4.84-12.28,8.82-3.36,2.33-26.3,6.19-26.33,11.47-.06,11-.18,1.72-7.57,3.13-6.2,1.18-14,8.18-20.76,10-4.48,1.22-9.26-.47-13.61,1.54-1.52.7-3.62,6.2-5.86,7.44-3.68,2.05-9.07.5-12.36,3-2.58,2-3,6.85-5,9.19-5,5.76-13,9.25-20,13.15-.58.32-8.46,2.06-8.53,2.14-1.95,2.44.8,7.07-1,9.62-4.4,6.26-20.8,26.3-26.56,11.44-3.7-9.54,14.42-32.55,19.44-40.7,4.14-6.74,11.55-11.29,13.87-18.92,1.9-6.29,2.15-18.86,1.16-25.57s-4.7-7.89-5.89-13.27c-.82-3.67,1.16-6.55.13-10.5-2.41-9.22-3.4.29-2.74.32,1.31.07-.66,3.82-3.15,3.31-1.32-.27-4.36-10.28-4.36-10.72,0-1.36,8.47-17.9,3.57-18.65-3.22-.5-8,9.59-12.89,9.16-6.4-.57-11.22-11.86-12-16.41-3.13-17.47,15.85-24,25.57-34.28,6.05-6.44,4.45-5.61,5-13.5.12-1.66-.52-12.06-.6-12.56-.22-1.33-.51-4.31-.64-5.75-.65-7.56-7.47-14.54,1.14-21.87,7.39-6.29,5.45,1.41,9.78.43,3.77-.85-1.9-7.93-1.86-7.53.1,1.09-2.08-10.82-.92-8.31-1-2.18,4-2.62-.52-4.8-1.1-.54-8.87,1.35-9.48,3-5.5,14.46,18.57,3.37-1.21,12.88-6.32,3-7.16,2.16-11.52,6.69-3,3.15-2.39,9.48-8.14,8.26,2.24-4.5,8.57-13,9.53-17.44,1-4.58-2.16-5.34-2.19-8.33,0-3.77,8.49-1.18,7.43-6.82-.73-3.89-12.43-3.07-14.22-3.18-5.08-.3-14-2-18.58.53-2.34,1.29-2.73,8-4.29,8.44-4.67,1.18-2.82-4.42-6-3.93-5.34.8-9.28,4.08-12.09,7.65-8.4,10.68-1.26,7.51,3.69,12.54,7.3,7.42,10.13,24.92,3.5,33.66-3.58,4.72-10.55,5.09-14.76,9-6,5.49-4.24,15.14-8.85,20.4-4,4.61-10,5.47-15,10.23-4.35,4.2-5.57,7-10.66,10.64-8.64,6.16-9.63,9.15-18.69,5.6-1.43-.56-1.13-4.84-3.13-5.83-2.47-1.23-6,0-7.76-.78-5.28-2.31-7.47-.25-5.34-9,2.09-8.6,9.79-12.51,11.52-21.49.77-4,2.19-20.64-.49-24-7.44-9.2-18.14,9.11-19.39,16.19-1.61,9.15,4.66,13.8-.75,24-17.82,33.53-4.63-3.41-17.78-4-12.88-.63-9.3,15.27-11.13,21.68-3.49,12.21-13.21,8.86-20.7,14.35-10.84,7.94-16.57,21.28-30.53,26a36.69,36.69,0,0,1-20.07.54c2.94.85-6,.14-6.15,0-1.67-1.6.47-6.15.35-6.2-3.47-1.55.15-4.61-4.37-1.18-3.58,2.71-1.43,11.11-8.82,14.32-7.08,3.08-7.29-2.2-9.34,3.23C366.11,715.61,374.41,718.1,366.7,721.9ZM174.56,807.7c-.2.26,0-13.31,0-13.22-1.8-1.91-3.66-3.76-5.6-5.54a10.69,10.69,0,0,1,5-5.52q4.72-1.41,4.35-6.07a30.78,30.78,0,0,1-3.28-7.37c-.45-4.15,9.19-5.7.12-10.43-8.73-4.55-6.45,8.27-8.35,11.82-3,5.51-11.08,10-9.57,17.12C155.51,795.54,168.6,815.3,174.56,807.7Zm547.56-46.57c3.88-13.31-12.27-8.8-15.69-2-2.75,5.48,4,9.55-4.73,11.83-4.2,1.09,2.6-9.06-6.31-4.44-7.63,4,8.1,22.32,13.55,15.39C701,773.49,719.9,768.73,722.12,761.13Zm-353.44-31c6,2,9.05-5.48,14.43-6.68,3.87-.87,25.61,8.74,27.18,6.88.16-.18-4.52-13.58-3.79-13.1-3.18-2.09-5.46,3.63-8.18,3.41s-5.88-2.91-8.31-2.82c-6.3.22-17.66,6.29-23.37,4.12C363.69,724.26,363.27,728.32,368.68,730.12ZM633.83,593.36c-4.71,2.21-9.1,29.34-3.32,29.45C634.23,622.57,640.77,590.11,633.83,593.36Zm-15,226.39c-2.08-13.57-12.93-2.1-14.25,3.4C603.72,832.74,619.82,825.87,618.88,819.75Zm56.47-28.58c1.94,10.83,10.09,4.76,8.11-3.73C682.77,775.72,673.49,780.83,675.35,791.17ZM174.92,553.77c-4.77-.94-16,6.66-7.4,8.26C172.45,562.42,183.91,555.53,174.92,553.77ZM179.25,742c-2.92-1-14.14,13-4.36,13C179.06,755,183,743.33,179.25,742ZM414,713.31c5.28-2.38-.61-4.13-1.3-6.14-.55-1.57,3-4.3-.38-4.82-4-.6-5.15.84-5.17,5.09C407.14,711,410,715.1,414,713.31ZM635.23,815.22c1.12-3.37-11.79-6.25-13.64-4.85-5,3.78,6.26,7,8.46,6.75A5.1,5.1,0,0,0,635.23,815.22Zm-458.39-.33c-7.47,1.68,5.06,21.32,6.39,11.36C183.08,824.51,178.82,814.45,176.84,814.89ZM471.39,651.53c.38,8.92,6.61,3.33,7.55-2.11C477.71,640.44,471.12,645.42,471.39,651.53Zm-192-230.38c-.5-.25,7,10.18,6.59,2.6C286.27,414.37,277.39,420.14,279.37,421.15Z"/>
            </g>
            <g v-if="terrain == 'alterion'" id="alterion">
                <path id="body" :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M577.65,476.78c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78ZM826,619.54a5.06,5.06,0,0,1-4.86-3.16c-5.43-11-10.05-13-22.21-10.21-3.49.89-6.89,2.1-10.62,1.7-5.92-.65-7.94-3.57-5.67-9,1.21-3,2.35-5.83,2.19-9.16-.25-3.73,1.7-6.32,4.54-8.51,5.67-4.13,10.29-9.32,15.15-14.43,2.35-2.51,3.89-5.67,2.44-9.24s-4.63-5-8.19-5.18c-6.08-.25-12.32-.65-18.32.24-5.67.89-8.92-.65-12.24-5.19-5.43-7.46-12.48-12.64-22.45-11.59-3.49.32-3.81-1-2.35-3.49a47.56,47.56,0,0,0,4.94-11.67c1.46-5.51-2.19-16.21-6.08-18-8.35-3.81-9.16-8.11-2.59-14.43,2.67-2.51,4.05-5.11,2.1-8.35-3.48-5.84-6.72-12.08-14-13.86-3.16-.73-3.65-2.59-4.05-5.35-1.3-8.84,5.1-13.29,10.13-18.64,9.89-10.46,17.51-21.56,8.59-36.56,9.41.49,13.05-4.3,10.78-13.37-1.37-5.19-3.16-9.49-9.16-10.62a2.71,2.71,0,0,1-2.43-3.33c2.19-.32,4.79,0,6.57-1,8.51-4.78,19.13-3.81,27.23-9.81,1.14-.81,3.25-.65,4.87-.65,9.8-.4,14.43-5,14.59-15.07a18.18,18.18,0,0,1,2.91-10.7c5.76-8.51,4.14-17.51-3.89-23.91-1.7-1.3-3.4-2.52-5-3.89-.73-.73-1.54-1.63-1.06-2.76s1.71-1.22,2.68-1.05c11,2.35,16.21-4.46,20.35-12.89,1.29-2.6,2.43-5.11.24-7.7-1.86-2.27-4.54-2.27-7-1.46-4.3,1.46-8.27.57-12.4-.73-4.38-1.3-4.7-3.41-2.11-6.89,2.35-3,4.78-6.24,4.86-10.13.25-6.65.81-13,4.62-18.73,1.54-2.35-.48-4.86-.65-7.37-.48-12.41-5.75-24.73-1-37.29a39.44,39.44,0,0,0,2.27-8.59c1.3-10.21-1.7-13.54-12-13.3a38.72,38.72,0,0,0-8.1,1.06c-11.27,2.67-21.64,3-30-7.13-4.14-5-9.57-6.81-16.46-4-5.35,2.11-11.26-.56-16.94-.64-1.94,0-2.43-1.79-2.84-3.57-1.94-7.94-3.72-9.24-11.83-8.59a62.29,62.29,0,0,0-8.67,1.78c-9.89,2.35-17.67-1.7-21.16-11.11a43.16,43.16,0,0,0-3.16-6.88c-2-3.57-5.27-5.44-9-3.17-10.13,6.08-21.23,4-32.1,4.62a41.34,41.34,0,0,1-18.7-.53c-9.38-2.73-17.55,5.14-26.32,8.77s-6.66-6.81-13-14.07-22.85,1.06-30.6-.49c-7.15-1.42-12.06-1.17-25.68-7.29s-28.75,0-28.75,0c-2.51,1.05-5.35,1.94-8.27,2.91-7.13,2.36-13.37,6.08-17.18,13-5.35,9.49-15.08,13.54-24.16,17.19-9.48,3.73-18.24,7.54-24.8,15.4a17.83,17.83,0,0,1-12.4,6.81c-10.38,1.05-20.19,4.21-31.13,2.59-9.32-1.38-18.8-1.46-27.72-4.62-4.22-1.54-8-2.59-11.67,1-1.3,1.3-2.84,1.3-4.7.73-12.33-3.81-24.24-.48-35.59,3.57-7.7,2.76-16.13,5.59-20.83,13.46-.89,1.45-2.76,1.86-4.46,2.1-2.43.25-4.78,1.06-6.16,2.92-4.94,6.65-12.16,11.11-17.18,17.59-2.35,3-4.95,5.76-9,4.38-4.46-1.46-1.46-5-1.22-7.62.49-6.89-2.35-9-8.59-6.16-10.21,4.54-14.51,13.21-15.24,23.67-.32,5.83-.89,9.4-8.18,7.86-3.81-.73-7.62,1.13-7,5.92,1.14,9-4.13,14.34-9.64,20.18-9.08,9.56-20.67,16.7-27.4,28.69-3.56,6.41-7,13-11.91,18.65-2.35,2.67-3,6.48-.81,9.48,5.59,8,11.91,15.08,22.77,16.29,8.51,1,16.94,3.65,24-4.05,1.29-1.46,4.78-1.7,4.21,1.86-.81,4.79.89,8.6,2.92,12.65,1.05,2,1.46,4.78-.57,6.48-2.19,1.87-4.38.08-6.32-1.21-2.59-1.79-4.7-4.38-7.94-5-2-.4-4.3-.89-6.08.65-1.87,1.78-.81,4-.17,5.92,2,6.32,1.63,16.78-.24,22.69-2.84,8.92-6.08,17.35-13.86,23.43-3.16,2.43-2.67,6.73-1.78,10.13,1,3.73,4.54,2.51,7,2.51,3.89-.08,7,1.46,9.81,3.9a13.46,13.46,0,0,0,9.72,3.8c6.81-.32,11.19,3,13.46,9.25.57,1.45.89,3.08,2.67,3.16,5.27.32,10.14,2.67,15.57,2.91a84.68,84.68,0,0,1,32.83,8.19c3.64,1.7,5.75,4.7,5.26,8.59-.73,5.68,1.3,10.38,4.38,14.84,2.11,3,2.76,5.91,1.38,9.4-4.62,11.67-7.54,23.59-6.16,36.23.32,3.16-1.38,5.68-3.24,8-6.16,7.7-4.46,18.07-9.08,26.42-1.22,2.27,1.13,5.19,2.92,7.38s2.35,4.62.08,6.81c-4.62,4.54-3.33,8.91-.25,13.61s5.6,9.81,11.51,12c3.25,1.22,4.87,4.62,6.49,7.62a75.21,75.21,0,0,1,6.4,16.45c.81,2.84,2.43,3.57,5,4.63,9.24,3.89,19.45,4.7,28.37,9.88,11.43,6.65,23.58,12,35.74,17.35,3.57,1.54,4.87,2.27,2.84,6-1.86,3.4-3.48,7.62.08,10.54,7,5.75,13.94,11.83,21.89,16,4.78,2.44,5.83,4.14,4.13,8.76-1.21,3.08-2.67,7.13,1.54,8.83,3.65,1.46,3.41,3.25,2.6,6.08-.41,1.62-.49,3.49,1.29,4.54,1.46.81,3.33.73,4.14-.48,3.4-5.27,7.29-2.84,11.51-1.3a16.7,16.7,0,0,0,8,.24c3.73-.65,7.7.08,9.57,2.35,6.08,7.62,13.78,5.27,21.39,4.87,1.22-.09,2.52-.49,3.73-.49,2.43,0,3,1.38,1.71,3.32a20.31,20.31,0,0,1-2.6,2.76c-4.62,5-4.21,7.05,2.11,9.4s12.64,4,18.64,7.38c4.7,2.59,4.14,4.54,1.95,7.7-1.38,2.11-3.65,3.48-4.22,6.16-1.94,9.16-5.43,17.91-4,27.64.57,4.13.81,8.1,4.86,10.29,3.89,2.11,6.73-.48,9.41-3,3.64-3.4,6.16-2.51,6.89,2.27,1.54,10.3,7.86,18.08,13.13,26.43,3.4,5.27,6,5,10.62.48,1-1,1.7-3.24,3.32-2.18,8.27,5.18,15.72-1.63,23.59-1.46,2.92.08,5.51-2.27,4.54-5.51-1.06-3.41-4.06-4.71-7.62-3.65a14,14,0,0,0-4.06,1.78c-5.1,3.73-9.07,2.19-13.37-1.86-5.76-5.27-5.84-11.11-3.57-17.84,1.38-4.29,4.3-6.08,8.51-6.24s7.14,2,7.79,6c1.86,10.94,9.72,13.62,19,14.51,3.08.24,5.6,1.3,7.38,4.13,4.7,7.62,5.51,7.62,9.89-.56,4.7,12.24,11.35,15.32,23.51,11.43,3.56-1.14,7.13-2.76,11.1-2.36,2.27.17,3.81.82,4.54,3.41,2,7.13,5.76,8.59,12.16,4.54,3.16-2.11,6.56-2.35,10.05-3.16,6.65-1.54,13.78,1.86,19.86-1.7,8.51-5,19.78-6.73,22.21-19.05.49-2.35,3-4,5.1-5.52,2.6-1.86,5.19-2.18,7.54-.16,8.11,6.89,21,3.73,28.7-2.43,7.62-6,13.7-8.43,23.75-9,4.7-.24,5.75-2.18,3.16-6-1.87-2.68-3.89-5.35-1-8.43,5.18-5.68,4-12.65,3.81-19.3-.09-2.51-.33-4.13,2.43-4.45,2.35-.25,4.78.64,4.54,3.24-.9,7.94,3.4,6.4,8.1,5a9.48,9.48,0,0,1,4.95-.24c6.48,1.78,12.8,2.43,19.37.32a4.11,4.11,0,0,1,3.49.65c6.32,6.33,14.5,3.16,21.8,4.22,4.21.65,7.7-2,8.1-6.89s-2.27-7.62-6.72-8.35a16.1,16.1,0,0,1-8.35-4.22,14.35,14.35,0,0,0-7.3-3.48c-6.16-1-7.37-3.65-4-8.92,3.49-5.51,7-10.94,10.86-16.29a15.71,15.71,0,0,0,3.08-10.05c-.24-7-.56-13.94-.81-20.91-.16-3.49.73-7.06,4.54-7.14,9.65-.16,11.59-6.4,14.11-14,2-6.16,3.4-14.1,11.34-16.54s13.38-9.07,21-12.15c1.13-.49,2-2.11,2.75-3.41C833.26,623.19,831.56,620,826,619.54ZM460.88,339.81c-3.48.73-7.05,1.71-10.54,1.71-6,.16-11,2.91-16.37,4.37-9.32,2.52-16,9.41-24.15,12s-15.73,6.65-24.24,8a12.46,12.46,0,0,1-6.24-.16c-1.54-.4-3.65-1.54-4.87-1-10.61,5.35-19.29-1.78-28.69-4.3-2.84-.73-5.35-.73-7.78.89a20,20,0,0,1-12.65,3.73c-9.56.25-17.1-5.1-24.56-10.13-3.4-2.35-1.86-6.81,2.43-8.19s8.44-.08,12.24,2c4.06,2.35,7.79,3,11.19-1.22,2.59-3.08,5.92-2.75,9.32-1.62,5.35,1.79,9.32.33,12.32-4.54,4.87-7.7,12.49-13.21,16.46-21.56,1.13-2.35,3.73-4.21,6.32-3.16,5.19,2,10.3.73,15.48,1.06.73.08,1.87.32,2.27-.08,5.27-5,6.89-4,6.41,3.16-.17,2.59,2.67,1.7,3.89.81,6.56-4.87,12-3.08,17.5,2,4.06,3.81,8.68,1.95,13-.24,10.38-5.27,17.27-4.05,25.29,4.46a8.37,8.37,0,0,0,6,3.16c2.68.08,4.38,1.13,4.38,4.21C465.18,338.19,463.39,339.33,460.88,339.81ZM480.25,788c-4.05,1.7-8.18,3-4.94,8.91,1,1.79-.89,3.49-2.67,4.54-1.3.81-2.92,1.22-4.14.17-2-1.71.89-2.76.81-4.38,0-1,0-2.35.57-3,3.24-3.81,3-6.89-3.24-9.4,4.7-1.54,7.94-2.92,11.34-3.65,2-.49,4.46-.24,5.11,2.43C483.66,785.87,482,787.17,480.25,788Zm120.37-418.9c3.81,0,6.33,2.43,6.08,6.48-.24,4.54-3.16,6.65-7.37,7.13s-4.62-2.51-4.62-5.67C594.71,372.88,595.68,369.16,600.62,369.08ZM559.85,729.62c-7.29,9.08-13.29,19.45-24.8,24.15-1.38.57-2.76.89-3.73,1.22-8.1-1.54-14.75-5.35-21.24-9.08a4.45,4.45,0,0,1-1.54-5.67c1.38-3.41,2.6-6.89,5.76-8.92,4.62-3.08,7.13-6.89,6.81-12.65-.25-4,2.35-4,5-2.35,4.38,2.84,7.78,4.14,7.7-3.4,0-3,2.43-3.89,4.87-3.57,7.13,1,8.59-3.48,9.16-9,.08-1.06.16-2.11.16-3.17-.08-3.64.48-7.45,4.94-7.37s6.16,3.89,6.24,8.1c.09,3.65-1.37,7.06-2.59,10.38-1.86,5-2,9.4,2.27,13.37C561.23,723.94,562.12,726.7,559.85,729.62Zm47.5-294c-.4,1.62-1.38,3.41-3,3.89-10.13,3.17-12.64,13.7-19.61,20-2.43,2.18-1.87,5.43.16,8a12,12,0,0,1,2,10.78c-2.83,12.73-1.13,17,10.87,21.8,5.59,2.27,6.48,5.84,4.13,9.65-6.16,9.65-5.19,22.37-14.1,30.8-2.84,2.68-1.79,6.41.4,9.24s4.95,1.3,7.54.25c5.27-2,7-1,6.81,4.7a107.63,107.63,0,0,0,.49,17.67,8.86,8.86,0,0,1-11.6,9.48c-4.86-1.62-8.59-1.54-12.8,1.7-4,3.16-7.46,1.54-6.73-3.48,1.22-8.27-2.67-17.35,3.65-24.81a1.69,1.69,0,0,0,.24-.56c-3.57-10.46,2.19-22.54-5.75-32.1a11.6,11.6,0,0,1-2.92-8.19c.24-5.11-2.43-7.62-6.89-9.24-7.78-2.92-16.13-4.21-22.7-10.46-2.75-2.59-4.29-4.21-2.84-7.53a49.2,49.2,0,0,1,17.43-21.08c3.81-2.59,5.68-4.86,5.35-9.56-.81-10.38,20.27-27.64,30.32-25.21,7.94,1.94,11.18-.41,10.7-9.24,3.81-5.68,1.78-12.4-1.22-19.29-1-2.44-.4-6.25,2.84-7.62,3.73-1.54,4.62,1.86,5.83,4.21,2.76,5.51,7.79,4.95,12.65,5.11,7.21.08,11.75,3.16,13.54,9.08,1.21,4,.64,7-4.3,6.72C616.51,419.49,609.86,424.6,607.35,435.62Zm31.13,197.54c-2,2.19-4.62,2.43-6.81.65-4.14-3.33-8.67-5.92-13-8.84-5.84-3.89-3.73-10.13-4.22-15.88a27.54,27.54,0,0,0-3.32-16.78c-3.4-6.24-1.78-8.76,4.95-10.46,3.24-.89,6.32-2.27,9.56-3.24s6.65-1.46,9.56,1c1.63,1.46,2.84,3.24,2.44,5.59s-2.52,2.27-4.38,2.68c-10.05,2.19-14,12.24-7.62,20.34,4.46,5.76,6,13.46,13,17.51C641,627.16,640.67,630.73,638.48,633.16Zm17.18,14c-4,.25-13.13-5.27-13-7.7.17-4.13,4.95-8.91,8.68-8.67s9.48,7.46,9.24,12.24C660.36,645.56,658.58,647.1,655.66,647.18Zm-78-170.4c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Zm0,0c-2.72.45-6.49.35-6.51,4.28,0,2.46,2.39,3.86,5,3.85a5.56,5.56,0,0,0,5.88-4.7C581.5,477.87,580.08,476.37,577.65,476.78Z"/>
                <path id="magnus" :class="getAreaClass('magnus')" :style="getAreaStyle('magnus')" @mouseover="hoverOn('magnus')" @mouseout="hoverOff('magnus')" d="M850.46,464.24c-4.37,3.46-9,6.62-13.09,10.4-6.55,6.09-13.61,6.24-20-.32-4.4-4.54-8.42-9.47-14.57-11.92a5,5,0,0,1-3.16-5.06c.22-6.16-.95-12.09-2.24-18.1-1.91-8.9,2.81-14.16,12-14.3,6.54-.11,13.08-.09,19.63,0,3.23,0,5.62-.5,6.41-4.41.73-3.64,3.29-6.44,7.29-5,4.34,1.55,4.41,5.44,2.6,9-2.43,4.75-2.27,11.53-9.86,13,9,4.73,14.09,11.85,17.15,20.76C853.61,461,853,462.24,850.46,464.24Z"/>
                <path id="isra" :class="getAreaClass('isra')" :style="getAreaStyle('isra')" @mouseover="hoverOn('isra')" @mouseout="hoverOff('isra')" d="M772.85,462.66c-6.22,2.16-12,6.71-18.54,5.11-11.36-.2-10.21-.48-9.79-10.8a52.66,52.66,0,0,1,6.19-23.9c2.32-4.35,1.21-10.68,3.49-15.82,1.92-4.35,4.68-7.89,9.63-7.89s5.39,4.88,7.66,8.05c6.58,9.17,3.51,21,9.45,30.39C783.37,451.63,778.51,460.7,772.85,462.66Z"/>
                <path id="mi_sral" :class="getAreaClass('mi_sral')" :style="getAreaStyle('mi_sral')" @mouseover="hoverOn('mi_sral')" @mouseout="hoverOff('mi_sral')" d="M814.36,494.82c-7.22,6.74-14.18,14.25-22.62,19-6.41,3.63-14.92,3.54-20.44,4.69-11-.06-16.86-5.44-17.28-14.34a22.71,22.71,0,0,0-2.79-9.58c-6-11.64-1.51-20.89,11.25-23.76a44.81,44.81,0,0,0,8.5-2.32c5.07-2.26,9.83-3.53,14.63.54,1.82,1.54,4,.69,6.09.21,5.41-1.27,10,.54,14,4,3.64,3.17,6.23,7.31,9.72,10.7S817.48,491.91,814.36,494.82Z"/>
                <path id="hunter_s-association" :class="getAreaClass('hunter_s-association')" :style="getAreaStyle('hunter_s-association')" @mouseover="hoverOn('hunter_s-association')" @mouseout="hoverOff('hunter_s-association')" d="M184.67,673.83c-4.06,2.18-6.64-1.23-9.13-3.75-3.46-3.49-7-6.67-12.19-7.35a4.72,4.72,0,0,1-3.17-1.9,44.12,44.12,0,0,0-13.58-15.45c-2.08-1.46-1.59-3.8,1.25-4.73a24.76,24.76,0,0,1,9.31-1.46c10.55.86,29.27,9.61,30.37,23.88C187.84,667.07,189.05,671.48,184.67,673.83Zm73.5-25.8c-3.14-3.71-4.17-8.81-8.09-12-3.76-3-4.82-7-2.89-11.33,2.61-6-.87-7.45-5.57-8.21a11,11,0,0,0-6.8.89c-3.16,1.55-5.52.84-7.56-2.16-7-10.3-15.89-18.46-27.69-23.08-1.75-.69-4.39-2-2.3-3.91,5-4.64,3.41-10.08,2.73-15.4-.52-4.07.34-5.45,4.22-3.18,1.47.86,3.33,2.4,3.67-.57.56-4.93-2.87-7.39-6.64-9.74-3.31-2.05-5.09-.61-7.68,1.45-8.53,6.78-18,12.57-22.51,23.21a4.38,4.38,0,0,1-1.79,1.75c-5.35,3.2-7.44,7.86-6.45,13,0,17.58,5.76,22.46,22.19,19.72,4.68-.79,16.43,5.14,18.49,9.31.7,1.39,1.17,3.06.34,4.26-4.17,6-.17,11.38.51,17.22,1.38,11.79,7.27,14.65,18,14.45,9.53-.17,17.59-2.19,23.61-9.79,2.47-3.11,4.81-5.45,8.92-2.67,1,.69,2.21,1.66,3.35.34A2.71,2.71,0,0,0,258.17,648Z"/>
                <path id="xangri-la" :class="getAreaClass('xangri-la')" :style="getAreaStyle('xangri-la')" @mouseover="hoverOn('xangri-la')" @mouseout="hoverOff('xangri-la')" d="M338.13,114.54l-10.67,15.78s16,28.94,17.23,28.94,37.41-9.44,37.41-9.44l7.72-29.13Z"/>
                <g id="waters">
                    <path id="unknown1" :class="getWaterClass('unknown1')" @click="selectWater('unknown1')" :style="getWaterStyle('unknown1')" @mouseover="hoverOn('unknown1')" @mouseout="hoverOff('unknown1')" d="M465.26,335.27c-.08,2.92-1.87,4.06-4.38,4.54-3.48.73-7.05,1.71-10.54,1.71-6,.16-11,2.91-16.37,4.37-9.32,2.52-16,9.41-24.15,12s-15.73,6.65-24.24,8a12.46,12.46,0,0,1-6.24-.16c-1.54-.4-3.65-1.54-4.87-1-10.61,5.35-19.29-1.78-28.69-4.3-2.84-.73-5.35-.73-7.78.89a20,20,0,0,1-12.65,3.73c-9.56.25-17.1-5.1-24.56-10.13-3.4-2.35-1.86-6.81,2.43-8.19s8.44-.08,12.24,2c4.06,2.35,7.79,3,11.19-1.22,2.59-3.08,5.92-2.75,9.32-1.62,5.35,1.79,9.32.33,12.32-4.54,4.87-7.7,12.49-13.21,16.46-21.56,1.13-2.35,3.73-4.21,6.32-3.16,5.19,2,10.3.73,15.48,1.06.73.08,1.87.32,2.27-.08,5.27-5,6.89-4,6.41,3.16-.17,2.59,2.67,1.7,3.89.81,6.56-4.87,12-3.08,17.5,2,4.06,3.81,8.68,1.95,13-.24,10.38-5.27,17.27-4.05,25.29,4.46a8.37,8.37,0,0,0,6,3.16C463.56,331.14,465.26,332.19,465.26,335.27Z"/>
                    <path id="unknown2" :class="getWaterClass('unknown2')" @click="selectWater('unknown2')" :style="getWaterStyle('unknown2')" @mouseover="hoverOn('unknown2')" @mouseout="hoverOff('unknown2')" d="M660.61,643.05c-.25,2.51-2,4.05-5,4.13-4,.25-13.13-5.27-13-7.7.17-4.13,4.95-8.91,8.68-8.67S660.85,638.27,660.61,643.05Zm-22.05-17.27c-7-4-8.51-11.75-13-17.51-6.4-8.1-2.43-18.15,7.62-20.34,1.86-.41,4-.24,4.38-2.68s-.81-4.13-2.44-5.59c-2.91-2.51-6.24-2-9.56-1s-6.32,2.35-9.56,3.24c-6.73,1.7-8.35,4.22-4.95,10.46a27.54,27.54,0,0,1,3.32,16.78c.49,5.75-1.62,12,4.22,15.88,4.38,2.92,8.91,5.51,13,8.84,2.19,1.78,4.78,1.54,6.81-.65C640.67,630.73,641,627.16,638.56,625.78Zm-37.94-256.7c-4.94.08-5.91,3.8-5.91,7.94,0,3.16.32,6.16,4.62,5.67s7.13-2.59,7.37-7.13C607,371.51,604.43,369.08,600.62,369.08Zm31.54,44.58c-1.79-5.92-6.33-9-13.54-9.08-4.86-.16-9.89.4-12.65-5.11-1.21-2.35-2.1-5.75-5.83-4.21-3.24,1.37-3.89,5.18-2.84,7.62,3,6.89,5,13.61,1.22,19.29.48,8.83-2.76,11.18-10.7,9.24-10.05-2.43-31.13,14.83-30.32,25.21.33,4.7-1.54,7-5.35,9.56a49.2,49.2,0,0,0-17.43,21.08c-1.45,3.32.09,4.94,2.84,7.53,6.57,6.25,14.92,7.54,22.7,10.46,4.46,1.62,7.13,4.13,6.89,9.24a11.6,11.6,0,0,0,2.92,8.19c7.94,9.56,2.18,21.64,5.75,32.1a1.69,1.69,0,0,1-.24.56c-6.32,7.46-2.43,16.54-3.65,24.81-.73,5,2.68,6.64,6.73,3.48,4.21-3.24,7.94-3.32,12.8-1.7a8.86,8.86,0,0,0,11.6-9.48,107.63,107.63,0,0,1-.49-17.67c.24-5.68-1.54-6.73-6.81-4.7-2.59,1-5.35,2.51-7.54-.25s-3.24-6.56-.4-9.24c8.91-8.43,7.94-21.15,14.1-30.8,2.35-3.81,1.46-7.38-4.13-9.65-12-4.78-13.7-9.07-10.87-21.8a12,12,0,0,0-2-10.78c-2-2.59-2.59-5.84-.16-8,7-6.33,9.48-16.86,19.61-20,1.62-.48,2.6-2.27,3-3.89,2.51-11,9.16-16.13,20.51-15.24C632.8,420.71,633.37,417.63,632.16,413.66Zm-56.07,71.25c-2.56,0-5-1.39-5-3.85,0-3.93,3.79-3.83,6.51-4.28,2.43-.41,3.85,1.09,4.32,3.43A5.56,5.56,0,0,1,576.09,484.91Z"/>
                    <path id="unknown3" :class="getWaterClass('unknown3')" @click="selectWater('unknown3')" :style="getWaterStyle('unknown3')" @mouseover="hoverOn('unknown3')" @mouseout="hoverOff('unknown3')" d="M559.85,729.62c-7.29,9.08-13.29,19.45-24.8,24.15-1.38.57-2.76.89-3.73,1.22-8.1-1.54-14.75-5.35-21.24-9.08a4.45,4.45,0,0,1-1.54-5.67c1.38-3.41,2.6-6.89,5.76-8.92,4.62-3.08,7.13-6.89,6.81-12.65-.25-4,2.35-4,5-2.35,4.38,2.84,7.78,4.14,7.7-3.4,0-3,2.43-3.89,4.87-3.57,7.13,1,8.59-3.48,9.16-9,.08-1.06.16-2.11.16-3.17-.08-3.64.48-7.45,4.94-7.37s6.16,3.89,6.24,8.1c.09,3.65-1.37,7.06-2.59,10.38-1.86,5-2,9.4,2.27,13.37C561.23,723.94,562.12,726.7,559.85,729.62Z"/>
                </g>
            </g>
            <g v-if="terrain == 'renovatio'" id="renovatio">
                <path id="avylon" :class="getAreaClass('avylon')" :style="getAreaStyle('avylon')" @mouseover="hoverOn('avylon')" @mouseout="hoverOff('avylon')" d="M486.37,340.8c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8ZM589.48,525.06a27.55,27.55,0,0,0,2.89,2.91ZM486.37,340.8c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8ZM427.18,735.38c-1.56-1.53-3.22-.11-4.57,1.2-1.92,1.86-.62,3.72.07,5.45,1.09,2.71,3.76,1.35,5.71,1.87l1.1-.88C431.72,739.59,429.18,737.34,427.18,735.38Zm-29.41-139c-1.73-1.66-5-.12-6.23,1.8-2.73,4.22,4.15,3.27,4.17,6.57C395.6,601.46,400.72,599.26,397.77,596.41Zm88.6-255.61c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm-8.92-65.27c-1.28-6-13.51-6.84-17.63-1.35-3.5,4.66-6.81,8.25-13.24,9.35-8,1.36-9.91,7.11-6.19,13.49,2.33,4,3.49,7.92,9.25,6.61.7-.17,1.64,1.19,2.52,1.26,3,.26,8.62-.58,8.47-1-2-5.14,4.28-10.36-.73-15,1.88-.95,2.51.65,3.56.85,3.77.75,7.43,1.88,11.15-.9C479.6,285.15,478.34,279.72,477.45,275.53Zm-274.27,252c-3.31-3.3-6.71-6,.21-9.33,2-1,1.31-4.35.33-6.58-.41-.94-1.91-1.62-2.4-.6-3.38,6.92-6.09,3.15-9.07-.3a3.88,3.88,0,0,0-2.73-.81c-5,0-12.79,6.21-14.12,11.16-.83,3.12.45,5.24,3.53,5.43,1.83.12,3.66.59,5.75,0,3.19-.83,6.34-.06,4.44,4.67-1.08,2.68,1.24,3.57,2.64,3.5a31.93,31.93,0,0,1,8.11,1c2-.12,4.07.28,4.59-1.52A6.63,6.63,0,0,0,203.18,527.57Zm30-155.77c-3.18-2-6.82-3.34-8.3-7.65-.68-2-3.61-3.13-6.21-2.14-2.35.89-4.06,2.32-3.46,5.34.48,2.47-1.06,4.5-1.81,6.72-2.32,6.78-6.6,13.08-5.12,20.82.27,1.36.22,3.2-1.55,3.39-7.9.87-7.36,6.94-7.94,11.72.18,4.56-.65,9.33,4.46,10.3,2,.39,4.52-.19,6.86.39,1.92.47,2.65.08,2.81-2.71.18-3.42,1.93-7.72,7.29-5.13,2.77,1.34,4.67-.19,6.21-2,1.33-1.51,2.32-3,4.6-3.3s3.12-1.94,3.93-4.36c1.9-5.69,1.27-11.72,3.87-17.47C241.8,379.11,239.6,375.9,233.17,371.8Zm-19,109.9c-1.67-2.82-3.54-3.58-6.33-1.92-6.57,3.93-12.73,8.15-12,17.37A25.84,25.84,0,0,0,201.69,508c1.14,1.17,2.73,3.75,5.31,2.47s4.29-2.73,4.18-6.1c-.05-1.93-.37-4.2,1.36-6.15C219.48,490.45,219.32,490.44,214.16,481.7Zm19.76,116.65c-.28-7-.81-14.52-6.94-19.73-1.45-1.23-3-2.49-4.51-.42-2.92,4.11-7.76,7.71-4.11,13.9a5.08,5.08,0,0,1,.54,4c-1.69,3.85.9,3.86,3.3,4,1.55.09,3.13-.11,5.49-.23C229.14,598.57,234.12,603.34,233.92,598.35Zm11.72-322.2c-4.32,2.18-8.12-2.3-11.65-.77a15.74,15.74,0,0,1-3.59,0,5.39,5.39,0,0,0-6.54,2.66c-1.36,2.29,1.37,3.44,2.42,4.86,4.45,6,6.32,12.79,7.74,19.92.38,1.89.78,5.25,4.16,4.54S242,304,241,301.23c-1.46-4.22-1-8.2,2.49-10.81,4.2-3.11,2.2-8.16,4.59-11.79C249.06,277.21,246.29,275.82,245.64,276.15Zm35.54-2.71c-8.31-5.81-15.66-10.23-25.7-4.82-3.4,1.84-5.44,3.59-2.4,7.14,2.31,2.7,2.11,4-.92,6.5A15.71,15.71,0,0,0,247,292c-.69,4.39,3.93,7.57,2.77,9.54-3.06,5.19.73,9.13.57,13.82a21.18,21.18,0,0,1,9.53-.66c2.77.53,6.41.55,7.32-3.16.84-3.47,2.62-7.29-1.06-10.5-1.68-1.48-5.7-1.51-4.19-5.16s4.73-1.82,7.36-1.75c1.19,0,2.39,0,3.58,0,5.4,0,10.46-.89,12.72-6.7S287.31,277.73,281.18,273.44ZM437,163.21c-3-.77-5.63-1.85-7.68-4.14-3-3.36-6.88-4.47-11.23-4.44-5.34,0-10.66.35-15.73-2.19-3.69-1.85-7.71-1.34-9.56,2.53-2.17,4.55-4.43,9.58-4.52,14.44-.12,6.08-2.12,11.53-2.6,17.22-2.86-1.13-5.19-2.19-7.62-3-1.35-.44-2.73-.47-2.69-2.43s-1-3.81-2.87-4c-2.11-.22-2.38,2.28-3.18,3.7-3.09,5.51-4.77,11.84-11.15,15.19-2.29,1.2-3.42,4.49-2.17,7.44,1.16,2.71,3.64,3.35,6.44,3.34,1.55,0,3.1.65,4.66.75a33.07,33.07,0,0,0,14.24-1.87C388,203.32,393,197,400.89,197.5c5.57.36,11-.18,14.9-5.25,1.1-1.43,3.24-1.26,5-1.15a7.87,7.87,0,0,0,5-1.14c7.52-4.5,15.13-4.73,23.34,1.72-.4-5.45-1.22-9.39.87-13.78C452.23,173.31,444.62,165.15,437,163.21ZM482.8,203c-.59-3.16-2.28-5.44-6.07-5.3s-8-.68-11.12,2.81c-.87,1-2.71,2.45-4,.37-1.92-3.1-2.82-.57-4.5.28-6.8,3.38-13.08,9.7-21.7,4.84-1.41-.79-2.28-.16-3.14.66-4.18,4.05-9.47,5.66-15,6.46a8.33,8.33,0,0,0-5.86,3.7c-4.17,6.12-6.72,13.39-14.14,17-2.08,1-1.93,4.89-.37,6.5,2.18,2.23,2.92-1.44,4.47-2.1,1.31-.55,1.08-2.82,3-2.45,1.21.25,5.09,9.41,4.19,10.32-4.74,4.76.7,5.19,2.84,5.64,3.44.75,6.85,1.21,10,2.89,3,1.57,5.53.75,7.85-1.84a19.31,19.31,0,0,0,5-9.19c1.07-5,3.7-9.46,6.31-14,4.51-7.92,9.53-2.44,14.37-2.45,1.19,0,2.37-.13,3.69-.21,8.51,2.17,10.37-5.32,13-10.25,1.81-3.47,2.95-5.92,7.1-6.72C482,209.26,483.41,206.3,482.8,203ZM257.74,648.4c-6.94-4-11.51-10.6-17.78-15.85,6.07-1.85,7.66-4.56,6.14-9.58-2.49-8.2-5.31-10.11-11.78-7.7-.45-1.78,1.89-4,.29-3.94-3,.09-5.42-4.29-8.66-1-3,3.07-.28,6.57,1,7.87,4,4,6.59,7.7,3.49,13.34-.23.42.26,1.61.75,2,6.26,5.09,10.48,12.78,19,15,1.32.34,2.8.93,2.28,2.83-.68,2.44.82,2.67,2.57,2.61,2.18-.08,4.71-.34,5.56-2.36C261.22,650.29,259.14,649.23,257.74,648.4Zm77,14.74c-1.42-5.35-2.86-10.6-10.07-11.11-1.42-.1-6.76-2-3.22-4.78,4-3.15,1.43-5.28.32-7.3-4.14-7.5-1.18-16.67-6-23.93-.09-.12,0-.39.06-.58.22-4.15-5.09-9.89-8.61-8.43-4.31,1.79-6.76-.21-10.06-2a22.39,22.39,0,0,0-8.88-3.17c-9.1-.71-7.82-9.12-10.36-14.56-1.79-3.84,1.84-5.41,4.2-7.5,3.18-2.84,7.37-5.61,5.42-10.79-1.17-3.08-.51-5.14,1.23-7.63,1.57-2.23,3.36-6.09.27-7.36-7.63-3.15-6.52-10.61-6.37-15.32.33-9.91-7.29-12.23-12.42-17.12a2.06,2.06,0,0,0-2.73-.3c-.84.6-1.38,1.42-.66,2.52,2.5,3.84.05,4.3-3.06,5.44-4.91,1.77-8.76,5.79-8.41,11,.68,10.48.88,21.12,4.38,31.26a11.83,11.83,0,0,0,3.91,5.64c3.17,2.62,6.74,5.24,7.12,9.94.32,4.13-1,9.56,1.11,12.12,3.69,4.41-.75,6.66-.68,9.86,0,1.58.51,3.14.5,4.71,0,2.15.45,4.37-.82,6.4-2.68,4.28-1.12,7,3.26,8.73a17.38,17.38,0,0,1,10.88,11.74c.84,2.84,2.53,5.11,5.4,5.9,10.81,3,18,10.81,25.38,18.48,4.11,4.27,7.85,7.82,15.15,4.77C335.27,668,335.56,666.4,334.7,663.14Zm57-413.46c-2.12-3.32-5.8-1.7-8.75-1.57s-5.68,1.77-7.92,3.79c-5.77,5.2-12.21,7.59-20,5.71-2.3-.55-5.34-.58-6.45,1.88-2.54,5.62-7.74,9.57-9.7,15.37-3.78,11.14-11.77,18.44-21.3,24.38-7.8,4.86-16.29,8.88-18.78,19a3.28,3.28,0,0,1-3.6,2.58c-4.67-.5-6,2.9-6.36,6.23-.46,4.34-2.2,8.53-1.63,11.92-.34,8.71.94,16,5.21,22.46a40.56,40.56,0,0,0,4.35,4.76c2.32-3,8.26-3,8.3-6.91.05-6,4-4.57,6.66-4.4,4.82.33,10,2.54,11.25-5,.11-.65,1.23-1.08,1.5-1.77,2.41-6.14,9.72-11.06,4.74-19.07a2.41,2.41,0,0,1,.66-3.24c1.28-1,1.49.68,2.23,1,2.63,1.09,5.74,2,7.38-1,2.12-3.88,5.37-4.83,9.25-5.37,5.85-.81,9.29-6,9.93-12,.46-4.32-2.62-8.55,0-12.7,2.18-3.4,3.92-6.88,3.62-11.1a6.18,6.18,0,0,1,2.15-4.73c6.86-7.19,14.95-12.83,23.2-18.23C390.68,259.72,393.52,252.46,391.74,249.68Zm94.63,91.12c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm0,0c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Zm72.46,98.63c1.85-1.5,3.72-2.63,3.72-4.69s-2.27-4.89-2.92-7.52a26.72,26.72,0,0,0-2.92-7.33c-1.49-2.63-2.05-3.38-2.61-6.76s0-4.8,0-7.85-2.45-5.12-3.2-5.87-4.13-3.76-2.25-5.83,3.38-2.25,3.38-5.45-4.89-5.82-3.94-9.39.74-3,2.62-6.77,3.95-6.58,3-10.52-3-9-3-12.4.19-4.89,2.26-6.4,3.19-1.68,4.13-4.69,1.7-4.7.75-7.89-2.44-7.71-3.94-10-5.08-3.95-3.38-6,1.87-4.13,2.25-5.63.94-3.2-1.31-5.45-3.77-4.14-5.08-5.64-3.57-2.07-2.44-3.95.37-9.77-3.38-12.4-4.52-1.21-7-5.68-3.19-7.48-3.94-8.6-3-2.44-3.95-5.26a20.35,20.35,0,0,1-1-5.33,7.81,7.81,0,0,1-3.63,1.63c-2.7.49-6.32.49-6.08,4.13.23,3.41-1.81,8.21,3.93,9.76a3.82,3.82,0,0,1,2.55,4.81c-1.61,6.76-8.62,7.19-13.16,10.34-2.32,1.6-4.44-2.55-6.14-4.43-6.8-7.56-9.53-7.15-12.92,2.34-.26.72-.61,1.66-1.2,2-4.37,2.34-2.93,6-1.11,8.51,2.08,2.93,1.12,4.46-.94,6.38-2.19-5.81-2.2-5.85-8.52-5-9.25,1.25-14.69,9.34-22.72,12.82-.69.31-1.07,1.66-1.33,2.59-.78,2.77.31,5.42.62,8.14.49,4.19-1.23,7.43-5.67,6.84-7.7-1-15.07,2.07-22.69,1.08-1.3-.17-3.11-.05-4,.72-3.32,2.93-6.76,2-10,.45-2.89-1.36-6-1.56-8,.29-6.24,5.87-9.07,6.76-16.25,2.82-3.94-2.17-7.31-5.48-11.4-7.2-3.31-1.4-7.06-1.11-9.73-4.65-1.2-1.58-5.65-2.05-5.75,1.87-.13,5-.79,10.15-.33,15.12.35,3.74-.38,8.86,5.95,9.87,2.08.33,1.35,3.32.23,5.13-.63,1-1.56,2.93-.48,3,4.56.27,3.08,4.3,4.51,6.45.73,1.09,2.16,2.76-.33,2.95-1.82.13-3.93,3.39-5.63,0-2.79-5.57-4.82-2.5-7.89.05-4.9,4.06-9.59,9.74-17.52,5.8-.65,6.11,1.23,11.29,2.46,16.34,1.13,4.63-.31,8-2.87,10.9-7.71,8.75-12.25,19.61-19.48,28.59-3.18,3.94-2,9.81-5.52,12.78-7.06,6-12.31,13.93-20.85,18.27-3.7,1.88-7.34,5-7.62,9.27-.32,4.89-1.47,7.64-7.76,6.6,2,2.4,4.87,4.22,2.61,6.91-2.58,3-6.22,3.18-10,3.11,1-3.7,2-6.76,5.56-8.23a2,2,0,0,0,.34-3.45c-2.86-1.37-1.53-3.05-1.09-5,.22-1,1.41-2.47,0-3.21-6-3.26-12.76-4.61-19.34-6.28-.45-.11-1.11.38-1.59.71-3.6,2.45-7.49,4.5-10.47,7.81-3.55,4-3.43,6.65.83,9.84,1.59,1.18,3.25,2.58,5.08,3,7.25,1.86,7.72,9.58,12.22,13.75a1.91,1.91,0,0,1,.46,1.66c-3.21,7.23,3,8.51,7,9.8,6.31,2,6.87-5,10.13-7.89s-.44-4-2.07-6.15c5.1,1.77,8,.72,8.56-4.19.3-2.87,1.05-3.61,3.64-1.67,2.76,2.07,5.14,1.14,3.85-2.26-.85-2.19.17-2.61,1.12-2.89,1.4-.41,3.28-.65,4.46,0,1.6.83.65,2.54-.22,3.56-2.22,2.59-.66,3.67,1.19,5.72,3.65,4.06,8.17,7.16,11.14,12.14,2.23,3.72,4.15,9.19,10.41,9.42,1.84.07,2,2.48,2.15,4.39.36,4.25-3.8,8.19-3.17,10.82,1.63,6.74-2.46,11.7-3.24,17.54-.54,4.11.39,6.61,2.94,10,5,6.59,13.63,7.84,18.82,14,1.39,1.66,4.52,3,7.06,1.37,3.41-2.23,7.61-1.67,11.1-3.81,2.93-1.79,6.22-2.19,8.62,1.71,1.14,1.88,3.18,2.09,5,.26,4.51-4.45,6.67-2.6,9.6,2.39,2.51,4.27,3.92,11.1,12.23,9.64,2.39-.41,7.06,1.73,8.5,5.42,2.37,6.07,8.1,8.28,12.77,11.68,1,.7,2.57,2.07,3.77.92,2.93-2.79,4.88,1,7.56.88,3.92-.22,4.55,2.7,3.63,6.16-.32,1.22.9,2.09,1.85,2.86,6,4.89,9.19,11.19,10.53,18.86.52,3-2.2,4.24-1.6,7.17a7.86,7.86,0,0,1-8.25,9.46c-4.8-.32-9.72-1.34-14.3-2-6.54-.92-15.59-6.55-15.73-13.44-.17-8.38-10.78-9.87-8.77-18,.05-.24-.86-1-1.32-1-4.05,0-5-3.09-6.25-6-.53-1.3-1.43-3-2.89-1.11-2.52,3.2-4.35.74-6.61-.26s-4.28-2.95-7-.72-3.66,4.68-3,7.85c.72,3.53,4,2.32,6.19,3.28,3.46,1.52,9.71-1,10.25,3.92.77,7.27,5.09,15-1.29,22.21-4,4.49-2.36,12.67,2.88,13.86s4.32,4.7,4,7.53c-.54,4.46.61,8.45,1.61,12.63a7.4,7.4,0,0,0,2.15,4c2.28-1.09,12.6-6,14.77-6.66,2.44-.76,5.82-3.58,7.33-4.7s6.93-1.51,8.44-2.63,6.6-6.39,8.76-6.76,5.73-.75,7.23,0,10.14.81,12-.44a23.65,23.65,0,0,0,6.57-7.64c1.31-2.83,1.88-6.21,4.32-9.6s4.32-4.13,5.45-7.32,1.32-8.08,1.7-10,2.06-5.83,2.62-8.26-1.31-6.69,0-10,1.72-4.46,3.87-6.91,4.59-7.13,6.09-9.76,3.2-13.53,9.4-16.73,8.26-3.38,9.21-7.33,2.44-3.38,0-7.51-6.77-10.15-4-11.65,4.89-4.7,8.08-5.65,7.52-3.38,8.65-4.88a48,48,0,0,1,7-7c2.63-2.06,8.46-5.26,6.58-7.51s-7.15-2.45-5.45-6,2-6.39,5.82-6.76c1.91-.2,3.18-2.46,3.92-2.54h0a6.19,6.19,0,0,0,.41-2.34c0-1.88,1.5-5.28,0-6.4s-3.57-2.62-1.7-4.5,1.34-1.32,2.36-5.64,2.9-4.51,3.85-7.51,1.87-4.89,4.88-6,2.82-3.94,5.45-2.25,4.51.82,6.95-.53,5.45-3.42,6.39-2.48a7.77,7.77,0,0,0,1.32-4.51c0-2.82,1.69-3.19,1.32-5.82s-3.2-2-3.77-5.79S557,440.94,558.83,439.43Zm-173.92-28c-4.94.53-4.58-4.65-5.61-7.58-.91-2.56,5.64-11,7.63-10.37,5.45,1.79,5.55,6.68,5.65,12.22C394.8,412.52,388.32,411.05,384.91,411.43ZM495.2,430.07c-.72,1.63-1.63,3.76-3.77,1.56-3.25-3.33-6.87-1.78-8.95.42-2.66,2.78-5.64,6.25-4,11a51.12,51.12,0,0,1,2.25,7.36c.68,3.82.3,7.11-3.14,10.13-4.31,3.77-7.37,8.52-2.95,14.5,1.29,1.73.73,3.94.21,5.8-.65,2.32-2,3.77-3.84.69-1.36-2.29-4-3.78-5.87-3.39-7.85,1.58-11.38-4.74-16.52-8.13-1.86-1.22-1.39-3.07-1.92-4.69-.67-2.07-3.32-3.71-4.43-3.53-9.48,1.58-7.85-6.39-9.6-11.08-.74-2-.49-2.83-3.19-2.57a5.19,5.19,0,0,1-5.25-3.9c-.66-2.89.65-4.87,3.17-6.31,5.85-3.34,7.45-8.75,4.62-14.56-.66-1.35-2.72-3.08-.26-4.59,1.74-1.07,4.39-1.76,5.44,0,2.42,4.09,6.12,3.05,9.67,3.65,9.67,1.64,19-.51,28.44-1.87,3.28-.48,4.63-4.25,6.22-6.82,1.9-3,4.4-5.44,7.5-4.3s1.83,5.23,2.14,8c.2,1.8-.95,3.74-1.51,5.66C495.92,423.61,497.28,425.39,495.2,430.07Zm16.06-67.88c1.49,4.39-2.13,5.17-4.09,7.39-2.91,3.28-2.51,7.54-1.56,11.39.61,2.47,1.52,4.84,2,7.4,1.27,7.09,1.4,7.08-5.29,5.85-1.94-.36-3.85-1.15-5.79-1.19-5.46-.11-7.8-2.1-5.45-7.69,1.45-3.43-3-4.31-3.29-7.12-.13-1.29-1.73-3.34-1.38-3.65,6.25-5.72,4.54-14.84,9.2-21.17,1.24-1.69,4.38-2.11,3-5.57-2-4.91-5.21-6.38-10.5-3.83a27.92,27.92,0,0,0-5.27,3.75,2.44,2.44,0,0,0-.83,2c.33,1,1.14,1.58,2.23.5,1.48-1.47,2.35-.57,3.19.84a2.85,2.85,0,0,1-.26,3.8c-1.12,1.21-2.27,2.13-4.14,1.2a24.74,24.74,0,0,0-6.51-2.68c-2.67-.47-5.87-.8-5.81,3.64,0,2.71-1.79,2.11-3.24,1.54a9.64,9.64,0,0,0-7.25.17,36.58,36.58,0,0,0-1.91-5.46c-2.18-4.07-1.16-7.31,3.26-7.37,3.08,0,3.19-1.42,4.13-3.44,1.25-2.72,2.48-5.67,6.67-5.65,2.31,0,4.7-1.09,4.68-4.76,0-3.19,2.73-5.61,4.55-8.18,1-1.38,3.38-2.14,4.17-.87,4.22,6.83,12.62,7,18.19,11.91s5.72,10.46,5,16.74c-.52,4.38-1.81,9.25,6.45,8.21C513.45,361.17,510.52,360,511.26,362.19Zm-29.91-25.32c-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74.66-.69,3.19.48,3-2.09C486.16,337.83,483.63,336.89,481.35,336.87Zm5,3.93c-.21-3-2.74-3.91-5-3.93-1.12,0-4.37-.12-3.65,2.28.58,1.9,2.08,4.47,5.67,3.74C484,342.2,486.56,343.37,486.37,340.8Z"/>
                <path id="tree-of-life" :class="getAreaClass('body')" :style="getAreaStyle('body')" @mouseover="hoverOn('body')" @mouseout="hoverOff('body')" d="M571.76,491.29c-.38,3-4.51,3.21-5.07,6.4s-.76,7-1.51,7-2.07-2.42-5.82,0-6,4.48-9.4,2.61-1.83-1.46-7.3-2.61-4.72-4.54-9.24-2.66c0,0-1.89,2.06-4-2h0a6.19,6.19,0,0,0,.41-2.34c0-1.88,1.5-5.28,0-6.4s-3.57-2.62-1.7-4.5,1.34-1.32,2.36-5.64,2.9-4.51,3.85-7.51,1.87-4.89,4.88-6,2.82-3.94,5.45-2.25,4.51.82,6.95-.53,5.45-3.42,6.39-2.48a15.56,15.56,0,0,1,3,4.7c.75,1.88,3,3.95,4.51,5.26s4.75,2.82,4.91,4.7-.72,3,0,6.27S572.14,488.28,571.76,491.29Z"/>
                <path id="nu-martyr" :class="getAreaClass('nu-martyr')" :style="getAreaStyle('nu-martyr')" @mouseover="hoverOn('nu-martyr')" @mouseout="hoverOff('nu-martyr')" d="M842.25,426.32c-4.67-5.62-8.25-11.83-11.72-18.2-1.22-2.26-3.85-4.15-7-1.68-5.65,4.47-6.11,12.67-12.17,16.9-.46.32.11,2.25.33,3.39,1.13,6.12-1.62,9.16-7.79,9.08-3.7,0-8.13-1.33-9.8,4a1.76,1.76,0,0,1-2.41,1.16c-4.84-2.27-6.82,1.29-8.67,4.45-3.13,5.31-9.43,8.62-8.92,16.49.13,2.14-1.81,4.81.54,7.37-4.68-3.3-12.77-2.28-18.21,2.53-.93.84-4,.31-2.64,2.84.79,1.45,2.51,2.55,5,.69-1.31,3.3-2.77,3.75-5,2.36a3.63,3.63,0,0,0-5.75,2.07c-1.33,5.2-6.67,7.76-7.76,13-.25,1.13-1.72,2-2.19,1.5-3.91-3.82-7.77-3.28-11.83-.37-.2.13-1-.57-1.5-.87-3.39-1.85-4.85.32-4.43,3,.88,5.55-2,7.54-6.44,9.58-2.16,1-4.44,1-6.53,2.1-6.1,3.14-8.23,2.3-11.49-4.09-.55-1.1-1-2.56-2.18-2.5a3.25,3.25,0,0,0-3.16,3.06c.28,4.6-2.91,5.14-6.07,5.52-3.44.41-5.32,2.05-4.31,5.45.88,2.91-.32,3.9-2.68,4.84-2.71,1.08-5.06,2.72-8.13,3.35-5.59,1.16-8.85,9.75-4.87,11.11,6.91,2.37,4.17,7.15,5,11.4,1.15,5.8-1.6,11.74.07,17,3.09,9.79,7.39,19.17,9.3,29.4.53,2.79.13,5.2-1.1,6.77,0,0,8.56,1.13,10.06,4.52a13.28,13.28,0,0,0,2.14,3.35,11.66,11.66,0,0,0,5.46,3.52l.29.08c3.38.89,6.76,4,7.75,5.09a2,2,0,0,1,.15.18,2.18,2.18,0,0,0,.93.53h0c1.57.54,4.42.91,5.43,2.09a4.39,4.39,0,0,1,.79,1.91c.4,1.75.59,3.65,2.35,2.59.29-.17.57-.36.85-.53,2.09-1.36,3.66-2.72,4.66-1.72a35.42,35.42,0,0,1,4,4.13c1.21,1.64,3.09,5,3.2,5.24h0A56.88,56.88,0,0,0,730,616.51a15.48,15.48,0,0,1,3.86-7.63c5.56-6.54,10.8-13.36,16-20.18,2.29-3,8.42-4.88,11.57-3,1.68,1,3.34,2,4.79.37,1.67-1.86,4.83-5,3.29-6.37-4.54-4-1.68-8.46-2-12.69a25.09,25.09,0,0,0-8.38-17c-2.69-2.54-8.45-5.37-4.54-11.51,1-1.63-1.22-1.51-2.65-1.52-4.43,0-5.6-2.51-3.86-6.29,1.18-2.58,3.29-4.71,6.18-5,4.79-.54,9-1.2,8.2-7.66-.06-.49,1.38-1.25,2.2-1.75,7.67-4.55,12.85-17.21,8.43-25-3.17-5.54.23-6.36,3-8.25s5.64-3.21,3.49-7.38a2,2,0,0,1,2-2.85c2.63.43,3.35-1.22,4.58-2.81,2.12-2.75,4.4-3.46,7.44-.66,8.47,7.82,18.14,6.79,28,3.13,2-.74,5.62-1.74,5.63-2.63,0-6.84,6.56-6.52,9.86-9.6,2-1.86,5.39-3.36,4.28-6.5-2.2-6.24,0-11.7,2-17.24C844.78,432.82,844.61,429.16,842.25,426.32ZM747.78,548.1a.7.7,0,0,1,1.21-.47c1.18,1.24,2,2.52-1.45,4.33-1.68.89-1.87,3.74-.68,6.4,1.62,3.62,2.75,7.87-3.26,9.26-2.16.5-2.85,2.41-3.64,4.31-1.36,3.33-3.07,6.21-7.32,6.85-2.63.38-3.26,3.16-3.3,5.51a16.59,16.59,0,0,0,.79,6.46c2.11,5.31-1.12,8.6-4.88,9.94-4.18,1.49-7.56,3.88-11.28,6-5.12,2.91-12.88-2.26-12.05-8,.9-6.24.59-13.18,7-17.31a3.77,3.77,0,0,0,1.21-2.57c.23-2.91.85-4.27,4.45-3.37,3,.74,5.93.27,5.49-4.69a16.88,16.88,0,0,1,7.52-15.59c3.75-2.35,9.52-3.21,14.65-2.64C745.74,552.85,747.76,551.16,747.78,548.1Zm40.47-117.41c-5-1.77-5.49-7.6-9.59-10.25-1-.62-1.42-3.86,2.15-3.57,5,.4,4.67-2.17,2.72-5.39a10.48,10.48,0,0,0-10.37-5.2c-2.4.16-4.92-.29-4.86-2.91.12-5.42-1.33-8.11-7.26-6.29a3.37,3.37,0,0,1-2.6-1.11c-2.34-2.51-5-4.86-6.93-7.7-.1.07-1.83,1.4-3.3,2.31s-4.13,3-7,3.57-3,2.07-4.89,4.7-3.57,2.25-8.08,3.75-4.5,4.14-5.07,6.21-2.44,3.75-4,5.63-2.81,2.25-5.07,2.07-3.39-1.88-5.64-4.7-4.7.75-6.7,1.32-5.51,1.88-8.52,1.88-7.32,3.75-7.89,4.5-1.31,4.51-2.63,7.53-3.38,2.81-5.83,5.45-5.82,1.87-8.83,2.89-4.7,1.61-7.68.29-4.35,2.07-7.17,4.33-1.5,2.63-3.19,5.07-6,5.83-8.53,7.14-4.25.94-6.69,1.69-4.33,3.39-5.64,5.26-4.13,0-7.14-1.31-3.57-.19-6.2,1.31-4.32,3-6,3.2a100.08,100.08,0,0,1-10.71,0c-2.82-.18-2.45,1.32-3.76,4.32s-4.89.38-7,1.31-3.77,3.2-6.2,4.7-2.64,1.51-4.52,5.27-7.3,5.33-7.3,5.33c.72,3.31,1.67,5,1.29,8s-4.51,3.21-5.07,6.4-.76,7-1.51,7c0,0,4.44,2,4.67,2.79s3.06,3.11,3.43,4.7a6.4,6.4,0,0,0,2.8,4,24.33,24.33,0,0,1,4.6,2.81c.66.66,1.79,3.2,3.29,3.29a8.9,8.9,0,0,1,3.48,1.5l1.61.92c-1.52-5.32-1.41-10.35,3.68-13.72,4.43-2.94,2.13-7.71,3.57-11.48,1.14-2.93.87-5.32,5.25-3.42,2.31,1,5.42-.73,8.07-.94,9.76-.75,19.73.8,29.11-3.48,1.63-.75,3.44-.14,2.66,2.3-1.23,3.86-1.6,8.29-5.77,10.51-6.16,3.27-9.51,9.54-14.82,13.83-3.38,2.73-6.16,4-10,3.29-2.44-.44-4.1-1.4-3.66,2.65.33,3-1.57,4.14-4.62,2.11a14.43,14.43,0,0,0-13.37-1.54l0,0,.06.08a.38.38,0,0,1,.09.09l.1.11,2.89,2.91,0,0a4.74,4.74,0,0,0,1.89,1.11c1.69.28,5.92,1.12,7.19,2.53s1.53,2.26,4.21,3.81,5.09,2.26,5.65,5.22a12.54,12.54,0,0,0,4.24,6.62c1.26,1,6.19,8.66,7.18,11a6.8,6.8,0,0,0,.83,1.4,10.92,10.92,0,0,0,1.65,1.68,25.32,25.32,0,0,0,2.73,1.88c1.82,1.13,4.92,3.65,5.21,6.18v0a10.94,10.94,0,0,0,3.57,7.48c2.63,2.44,5.16,1.59,6.67,4.13s8.59,7.92,10.08,9a16.92,16.92,0,0,1,2.38-11.72c2.63-4.56,4-9.26-2.66-12.44,1.91-1.83,5.07-2.57,4.49-4.87-.35-1.37-2.9-2.76-4.66-3.08-8-1.49-11.51-4.84-12.68-12.67a7,7,0,0,0-1.26-2.68c-4-6.25-3.34-10.17,3.4-13.48,4-2,7.2-4.86,10.25-7.69,3.31-3.06,4.33-2.06,6,1.08.52,1,.15,4,2.83,2.21,2.06-1.39,2-2.61,0-4.66-3.89-4.06-2.91-6.08,2.78-7.07,2.82-.49,6.4-1.25,6.22-4.41-.39-6.71,2.25-11,6.92-15.78,5.82-6,2-14,.93-21.06-.62-4.31,2.07-6,4.76-7.92,3-2.13,4.16,1,5.77,2.36,1.28,1.1,3.57,3.59,3.75,2.89,1.18-4.32,5.46-3.82,7.86-6,.81-.73,1-2.38,2.49-1.95,1.66.47,1.76,2.12,1.56,3.48-.57,4,2.1,6.69,3.68,9.82,2.05,4.06,6.33,3,9.53,3.38,2.72.31,3-3.09,3.22-5.49.21-2.16,1.06-3.27,3.49-4,2.74-.83,7.44-3.62,7.21-4.49-1.54-5.85,2.21-8.65,5.32-12.21,3.64-4.15,6.81-5.06,10.72-1,2.59,2.71,4.47,2.38,7.22,1.14,4.11-1.85,7.92-.9,10.59,2.54,1.69,2.19,4.17,2.25,5,1,1.9-2.94,5-3.33,7.46-5.07,1.37-1,3.27-2.13,2.83-5.08-2.62,1.47-4.9,2.73-8.87,1.67,8.58-.49,10.91-8.07,16.73-11C790.9,434.68,791.18,431.73,788.25,430.69Zm109.64,43.75c-2-3.7-7.71-4.07-10.87-1.14-1.35,1.24-2.69,3.1-4.35,2.72-5.62-1.27-7.74,2.16-9.77,6.27-1.32,2.65-2.58,5.53-4.6,7.6-8.06,8.26-5,19.47,1,26.68a45.45,45.45,0,0,0,11.5,9.84c2.76,1.72,5,4.83,8,2.45s4.5-6.08,2.25-10.17c-2.68-4.86-.81-8.32,2.9-12,5.22-5.21,9.71-11.17,14.52-16.81v-3.58C905.11,482.15,900.48,479.34,897.89,474.44ZM803.32,630.16c-1.35-4.26,1.29-8.61-.75-12.31,1-2.44,1.29-4.36-.84-5.74s-3.83.17-5.54,1c-4.14,2-6.9,5.6-10,8.78a5,5,0,0,0-.87,6.09c1.56,2.56.91,4-.61,6.27-3.52,5.24-1.26,14.33,3.9,17.94,4.08,2.87,7.65-.17,11.29-1,2.14-.5,2.26-3.16,1.26-5.08-2-3.84-1.62-7.08,1.51-10.21C804.15,634.37,803.89,632,803.32,630.16Z"/>
                <path id="oo_xora" :class="getAreaClass('oo_xora')" :style="getAreaStyle('oo_xora')" @mouseover="hoverOn('oo_xora')" @mouseout="hoverOff('oo_xora')" d="M334.49,745.54c-7.14,1.31-5.05,9.3-9.66,13.08-7.08,5.8-5.78,14.67-.53,22.14,2.56,3.65,3.77,8.57,6.33,12.64.9,1.44-1.32,3.41-3,3.76-4.17.85-8.82.42-11.71-2.36-3.07-2.93-5.94-6.12-9.23-8.87-2-1.64-1.87-4.22-1.18-6.11,1.43-4-.92-6.17-3-8.74-7.18-9-9.58-19.39-6.32-30.19a49.81,49.81,0,0,1,8.06-15.6c2.7-3.53,5.26-5.81,9.83-4.89,5-1,8.47,1.15,10.76,5.41,1.08,2,2.39,3.89,4.34,4.79,6.31,2.93,4.82,8.76,5.49,13.81C334.71,744.78,334.62,745.51,334.49,745.54Zm89.58,48.29c-4-10.3-9.16-19.48-22.55-19.43a10,10,0,0,1-9.2-5.66c-2.3-4.78-6.13-4.9-10.57-3.44a34,34,0,0,0-10.67,5.61c-1.14.92-4.35-1.26-4.75,2.37-.32,3,1.33,4.7,3.56,6.34,5.13,3.8,10.9,7.12,14.93,11.88a43.93,43.93,0,0,0,10.12,9.21,2.07,2.07,0,0,1,.72,2.69c-2.23,2.47.36,3.22,1.73,3.42,3.56.53,7.32.53,9.78-2.73a13,13,0,0,1,12.25-4.82C425.07,800,425.18,796.7,424.07,793.83Zm95-41.33c-3-3.69-4.79-8.1-7.09-12.21-3.72-6.63-11.15-8.41-16.41-3.6-3.7,3.39-8.51,3.85-12.65,6-2,1-5.41.53-4.26-3.27,2.2-7.29-5.1-6.6-8-8.93s-4.91,2.06-6.43,5.14c-1.84-4-3.57-7.52-8.19-6.65-3.72.72-7.32,8.2-5.78,11.94a3.31,3.31,0,0,1-.74,4.17c-3.4,3.72-6.53,2.73-9.67-.23s-6.34-4.62-10.41-1.84l-1.1.88c3.45,5.34,7.09,10.47,12.19,14.42,3.14,2.45,6.67,5.76,10.37,4.11,2.78-1.24,5.17-5.07,2.91-10,1.38.94,1.89,1.23,2.33,1.59s.77.64.74.89c-1.4,8.34,5.66,10.8,10.32,14.92,2.37,2.08,4.4,5.13,7.15,6,9.46,3.2,19.16,5.68,28.8,8.34a4.25,4.25,0,0,0,4.31-1.4c2.22-2.3,11-20.52,11.5-24.14C519.28,756.65,520.84,754.66,519.08,752.5Zm100.44,32.94c2.88-.75,5.25-2.14,5-6.11-.24-3.25,1.48-5.52,5.32-5.73,5.57-.32,10.27-2.12,12.46-8a13.25,13.25,0,0,1,4.63-6.71c1.69-1.2,1.9-4.58-.58-4.45-4.15.21-7.56-2.6-11.42-1.81-4.91-.47-9.42,1.41-13.2,3.33-9.38,4.78-17.31,12.2-28.7,13.09-4.49.35-5.27,5.67-6.32,9.6a1.55,1.55,0,0,0,1.64,2c4.31-.34,8.91-.05,12.87-1.48,5.58-2,7.22-2.06,10.59,3.33A6.53,6.53,0,0,0,619.52,785.44Zm74.91-52.22a2.74,2.74,0,0,0,3.93,2.32c9.21-3.87,17.38-9.12,24.36-17.6-8.9-2.18-14.64-6.13-16-14.52-.33-2-.83-3.47-3.2-3.31-2.1.14-2.93,1.43-3.61,3.33-1.11,3.14-.31,6.9-2.77,9.54C691.41,719.09,695.07,726.45,694.43,733.22Zm119.73-25c-5.51-.87-.38-3.47-1-5.08l-1-.88c-2.41.78-3.71,2.74-5.13,4.64-.9,1.19-2.23,3.11-3.81,1.41-3.9-4.26-6.33-.49-9.4.83,1.12,2.58,3.52,1.43,4.8,2.61.52.48,1.15,1.32,1.07,1.9a3.07,3.07,0,0,1-1.5,1.49c-5.81-4.12-8-.1-12.33,3.46-5,4-11.29,6.78-16.77,10.84-8.44,6.23-18,10.9-27.12,16.28-1.31.77-2.87,1.22-4,.61-6.56-3.56-8,.29-9.2,5.67-.64,2.79-1.09,6.87-4.4,7.58-9,2-17.72,4.14-23.66,12a3.48,3.48,0,0,1-1.9,1.36c-10.7,1.7-17.4,11.37-27.71,13.86a3.87,3.87,0,0,0-1.53.9c-9.19,7.9-12.4,8.16-22.69,1.41-1.49-1-2.61-1.38-4.31-.7-3.25,1.32-6.35,2.76-10.26,1.68a4.25,4.25,0,0,0-5.12,3.83c-.47,4.11-2.38,5.94-6.71,6.72-5.27,1-8.82,4.34-10.14,10.19-1.08,4.79,3.2,5.58,4.95,7.93,4,5.43,6.88,11.94,15.71,12.83,5.87.59,12.65,1.09,17.8,5.33a15.64,15.64,0,0,0,11.88,3.82c2.69-.25,4.14,1.68,5,4.21a39,39,0,0,0,3.74,8c.72,1.12,2.23,3.41,3.57,2.53,3.67-2.4,8.71-3.91,9.48-9,.41-2.74,1.53-2.46,3.5-3,3.69-1,7.13-2.9,10.69-4.43-2.29-5.24,3.14-8.06,3.81-12.3.48-3.09,2.54-3.69,4.66-3.21,7.49,1.68,13.51-1.41,19.93-4.61,5.46-2.7,6.25-5.93,4-10.84-1.42-3.05-1.29-5.8,1.5-8,6-4.73,6.15-6.19.33-10.94-3.61-3-3.8-6.46-.69-9.16,3.6-3.15,4.27-10.38,11.59-8.8.73.16,2.39-1.19,2.62-2.1,1.26-4.92,3.92-3.17,7.24-2.34,3.86,1,8.68,4.15,11.87,1,4.67-4.68,11.89-8.46,11.14-16.54-.58-6.26,3.52-6.45,7.09-5.86,6.32,1.06,8.92-1.88,9.73-7.32a7.28,7.28,0,0,1,4.91-6.15c1.79-.68,3.59-1.52,4.11-3.17,1.76-5.58,6.58-5.61,11-6.53,1.51-.32,3.28.4,4.47-1C816.8,720.24,815.31,708.43,814.16,708.26Zm-229.57,130c1.41-4.82-3.26-4.95-5.32-5.81-3.47-1.43-7.35-3.45-11.27.77-6.1,6.57-10.34,6.94-15,1.52-2.38-2.8-3.38-2.43-6-.64-3.08,2.11-6.76,3.32-10-.43-3-3.42-6.44-3.29-9.92-.55-.9.72-2,2.15-2.7,2-1.79-.43-3.45-1.68-3.74,1.42-.22,2.34.13,4.46,2.83,5.18,1.61.43,3,.38,2,3-1.61,4.21,2.86,11.72,7.25,13.32,8.23,3,16,3,24.7.32,6.23-2,13.37-5.21,20.44-.77,2.24,1.4,4-1,4-2.89s.18-3.41,2.09-4.26c2.87-1.28,2.09-4.46,1.35-5.62A6.89,6.89,0,0,1,584.59,838.27Zm68.8-233.68c.57.17-2.54,4.75-5.68,5.12a86.23,86.23,0,0,1-9,.15c-9.8.14-13.61,4-13.42,13.72,0,2.15,0,4.31,0,7.53-8.72-4.49-17.4-6.51-21.7-16.05-3.53-7.85-7-7.59-13.15-1.2-3.44,3.56-6.21,6.73-6.35,12.45-.08,2.79-2.49,8.35-9,6.91-3.74-.83-8.44,1.84-10.06-4.05-.42-1.5-1.18-2.91-1.65-4.28-1.47-4.26-3.14-6.39-7.38-2.9-1.37,1.14-2.64.77-3.57-.56A2.17,2.17,0,0,1,553.5,618c6.64-1.89,11-8,18-9.34a10,10,0,0,0,6.85-5.1c1.86-3.21,2.74-6-1.19-7.88-1.87-.88-.56-3.74-3.12-3.83-2.15,2.56.38,4.83.79,7.63-8.59-2.61-15.18-2.13-22.83,4.22-7.17,6-13.9,13.92-24.11,16-2.54.52-4.23,3.2-5,5.54s-1.12,3.59-4.27,3.08c-2.74-.44-1.87,2.13-1.5,3.89.91,4.31,4.71,7.68,4.22,12.4-.75,7.36,6,11.26,7.87,17.56s2,6.84-4.39,6.3c-3.22-.28-6.29-.37-9.12,3.33,3.1-.33,6.28,7.42,7.79-1.57.4-2.38,8.95-.2,10.48,2.94,2,4.07,1.17,8-1,11.82a2.69,2.69,0,0,1-3.64,1.1c-5.23-2.18-10.34-4.47-16.09-5.24-2.72-.36-2.78-3-1.45-5.17.33-.54,2.7,1.54,1.7-1.28-.5-1.43-1.08-1.56-2.58-1.46-3.71.26-7.08,1.25-9.77,3.81-6.23,5.89-13.29,11-10.3,21.82,1.46,5.29-5.3,7.55-8.12,11.34-3.22,4.31-5.38,4.38-7.77-.87-1.49-3.23-3.75-.13-4.56.89-1.89,2.36-4.05,3.45-6.73,2.48-3-1.09.17-4-1.18-5.7-2.07-2.64-3.69-6.46-6.39-7.52-2.27-.88-3.49,3.18-3.86,5.67-.54,3.66-2.52,3.3-5.47,3.25-7.77-.14-12.58-4.09-15.85-10.61-.43-.86-1.31-2.19-1-2.62,4.34-6.22-1-6.74-4.52-9.89-8.49-7.5-17.9-10-28.67-9.31-2.4.15-4.27-.22-5.63-1.4,2.28-1.09,12.6-6,14.77-6.66,2.44-.76,5.82-3.58,7.33-4.7s6.93-1.51,8.44-2.63,6.6-6.39,8.76-6.76,5.73-.75,7.23,0,10.14.81,12-.44a23.65,23.65,0,0,0,6.57-7.64c1.31-2.83,1.88-6.21,4.32-9.6s4.32-4.13,5.45-7.32,1.32-8.08,1.7-10,2.06-5.83,2.62-8.26-1.31-6.69,0-10,1.72-4.46,3.87-6.91,4.59-7.13,6.09-9.76,3.2-13.53,9.4-16.73,8.26-3.38,9.21-7.33,2.44-3.38,0-7.51-6.77-10.15-4-11.65,4.89-4.7,8.08-5.65,7.52-3.38,8.65-4.88a48,48,0,0,1,7-7c2.63-2.06,8.46-5.26,6.58-7.51s-7.15-2.45-5.45-6,2-6.39,5.82-6.76c1.91-.2,3.18-2.46,3.92-2.54,2.08,4,4,2,4,2,4.52-1.88,3.77,1.5,9.24,2.66s3.92.72,7.3,2.61,5.64-.2,9.4-2.61,5.07,0,5.82,0c0,0,4.44,2,4.67,2.79s3.06,3.11,3.43,4.7a6.4,6.4,0,0,0,2.8,4,24.33,24.33,0,0,1,4.6,2.81c.66.66,1.79,3.2,3.29,3.29a8.9,8.9,0,0,1,3.48,1.5l1.61.92c-4.55,3.89-10.37,4.61-15.82,6.11-3.24.88-3.43,1.92-3.39,5.26.09,7.78,7.66,12.11,8.06,19.67.07,1.39,3.52,3.85,6.45,1.8s.94-4-.32-5.52c-2.85-3.48-1.58-5.13,2.19-6.05,1.33-.33,2.68-.63,4-1,3-.83,5.79-2.64,6.13-5.7.36-3.37-2.07-6.29-5.1-7.31-4.75-1.59-4.27-3.94-2.08-7.15l0,0,.06.08a.38.38,0,0,1,.09.09l.1.11a27.55,27.55,0,0,0,2.89,2.91l0,0a4.74,4.74,0,0,0,1.89,1.11c1.69.28,5.92,1.12,7.19,2.53s1.53,2.26,4.21,3.81,5.09,2.26,5.65,5.22a12.54,12.54,0,0,0,4.24,6.62c1.26,1,6.19,8.66,7.18,11a6.8,6.8,0,0,0,.83,1.4,10.92,10.92,0,0,0,1.65,1.68,25.32,25.32,0,0,0,2.73,1.88c1.82,1.13,4.92,3.65,5.21,6.18v0a10.94,10.94,0,0,0,3.57,7.48c2.63,2.44,5.16,1.59,6.67,4.13s8.59,7.92,10.08,9c.09.53.22,1.07.37,1.62.71,2.66-1.14,5.07-1,7.58C653,600.83,647.92,603,653.39,604.59ZM576.08,585c-.56-1.51-1.26-2.61-3-2.55s-2.73.67-2.57,2.49c.11,1.23.7,2.8,2,2.36S575.74,586.89,576.08,585Zm149.85,45h0c-.11-.21-2-3.6-3.2-5.24a35.42,35.42,0,0,0-4-4.13c-1-1-2.57.36-4.66,1.72-.28.17-.56.36-.85.53-1.76,1.06-2-.84-2.35-2.59a4.39,4.39,0,0,0-.79-1.91c-1-1.18-3.86-1.55-5.43-2.09h0a2.18,2.18,0,0,1-.93-.53,2,2,0,0,0-.15-.18c-1-1.13-4.37-4.2-7.75-5.09l-.29-.08a11.66,11.66,0,0,1-5.46-3.52,13.28,13.28,0,0,1-2.14-3.35c-1.5-3.39-10.06-4.52-10.06-4.52-1.17,1.49-3.09,2.21-5.69,1.75-7.39-1.31-11.6,3.3-16.46,7.61-3.88,3.46-2,5.86-.28,9,.37.65-.13,1.94-.5,2.81-1.75,4.06-2.27,8.37-2.92,12.67-.53,3.51-2,6.19-6.24,6.68-8.83,1-15.7,5.2-19.15,13.75-1.28,3.18-2.86,3.7-6.34,3.21-7.8-1.11-13-5.6-17-11.64-2.7-4-5.63-3-8.86-1.57-3.58,1.62-4.72,5.74-8.49,7.75-3.38,1.8-4.76,3.88-6.86,1.34-2.73-3.32-6.11-2.87-9.26-2.38A94.66,94.66,0,0,1,559.15,651c-2.18.11-3.68,1.27-5.5,2.7-6.69,5.27-8,13-10,20.27-1.15,4.25-.88,10.52,2.79,13,6.91,4.69,8.17,8.3,2.47,15.15-2,2.42-4.83,4.18-6.06,7.28-1.36,3.45.63,8,3.29,7.08,8.06-2.68,16.92-2.4,24.5-6.58a6.45,6.45,0,0,1,5.66-.66c4.09,1.72,9-2.74,12.65,1.83.22.27,1.8-.45,2.7-.83,1.47-.62,2.92-1.48,4.56-1,11.68,3.41,20.66-6,31.54-6.75,1.93-.13,4-2.23,6.51-1.42,1.14.37,2.38-.28,2.4-1.12.1-4,2.73-4.86,5.84-6.66,5.73-3.33,11-6.82,18-7.06,4.19-.14,8.93-.15,12.41-2.07,4.74-2.62,8.94-5.82,14.64-6.59,3.6-.49,7.25-1.85,9.2-5.78,3.2-6.47,10.67-8.91,14.34-15.41,2.67-4.72,10.18-6.61,8-14.3-.24-.85.78-2.22,1.48-3.14A46.43,46.43,0,0,0,725.93,630Z"/>
                <path id="la-guardia" :class="getAreaClass('la-guardia')" :style="getAreaStyle('la-guardia')" @mouseover="hoverOn('la-guardia')" @mouseout="hoverOff('la-guardia')" d="M749.46,383.67c-2.83-12-7.41-23.36-12.44-34.59a29.7,29.7,0,0,0-5.73-8.88c-2.23-2.3-4-4.19-6.5-.23-.88,1.39-2.63,2.47-4.09-.27-1-1.92-3.88-3.6-5.32-1.95-3.46,4-7.25,3-11.37,2.32a6.71,6.71,0,0,0-6.48,2.08c-2.95,3.18-5.64.41-6.64-1.79-1.77-3.88,3.67-11.13,8.13-11.58.72-1.43-5-7.18,2.66-4.08,1.35.55,2.53.07,2.83-1.24.43-1.86-1.17-2.09-2.5-2.59-5-1.9-10.43-3.34-11-10.16a4.83,4.83,0,0,0-3.35-3.95c-6.18-2.07-8.37-8.78-13.89-11.61-.85-.44-1.38-2-1.56-3.1-1.62-9.6-9-16.17-13-24.56-.9-1.88-6-5.32-7.61-2.53-2.48,4.37-7.47,5.53-9.78,9.88-.81,1.51-4.52,5.7-7.45,1.53-1.93-2.75-4.66-4.28-7-6.33-2.77-2.41-4-4.81-2.64-8.28.73-1.86.71-3.67-1.12-4.74-2-1.15-5-1.57-6.21-.1-3,3.54-7.27,6.06-8.52,11A17.23,17.23,0,0,1,600,278.88a13,13,0,0,0-6.7,6.33c-1.22-6.74-10.16-12.64-16.22-10.27-3,1.18-6,2.18-8.19-.32-1.85-2.12-1.09-5.13-.09-7.88,1.81-5-.62-8.83-5.73-10.69-6.29-2.28-12.74-4-18.5-7.83-7.27-4.8-12.59-3.27-17,4.35a12.45,12.45,0,0,1-2.88,3.58,20.35,20.35,0,0,0,1,5.33c.94,2.82,3.19,4.13,3.95,5.26s1.5,4.13,3.94,8.6,3.2,3.05,7,5.68,4.5,10.53,3.38,12.4,1.12,2.45,2.44,3.95,2.82,3.38,5.08,5.64,1.68,3.94,1.31,5.45-.56,3.57-2.25,5.63,1.87,3.77,3.38,6,3,6.76,3.94,10S558,335,557.1,338s-2.07,3.19-4.13,4.69-2.26,3-2.26,6.4,2.07,8.45,3,12.4-1.12,6.76-3,10.52-1.69,3.2-2.62,6.77,3.94,6.2,3.94,9.39-1.5,3.39-3.38,5.45,1.5,5.08,2.25,5.83,3.2,2.82,3.2,5.87-.57,4.46,0,7.85,1.12,4.13,2.61,6.76a26.72,26.72,0,0,1,2.92,7.33c.65,2.63,2.92,5.45,2.92,7.52s-1.87,3.19-3.72,4.69-2.48,3-1.92,6.81,3.39,3.16,3.77,5.79-1.32,3-1.32,5.82a7.77,7.77,0,0,1-1.32,4.51,15.56,15.56,0,0,1,3,4.7c.75,1.88,3,3.95,4.51,5.26s4.75,2.82,4.91,4.7-.72,3,0,6.27c0,0,5.42-1.57,7.3-5.33s2.07-3.76,4.52-5.27,4.13-3.75,6.2-4.7,5.63,1.7,7-1.31.94-4.5,3.76-4.32a100.08,100.08,0,0,0,10.71,0c1.69-.18,3.38-1.69,6-3.2s3.19-2.63,6.2-1.31,5.82,3.19,7.14,1.31,3.2-4.5,5.64-5.26,4.17-.37,6.69-1.69,6.84-4.69,8.53-7.14.38-2.82,3.19-5.07,4.21-5.64,7.17-4.33,4.68.73,7.68-.29,6.39-.26,8.83-2.89,4.51-2.45,5.83-5.45,2.07-6.77,2.63-7.53,4.9-4.5,7.89-4.5,6.51-1.32,8.52-1.88,4.45-4.14,6.7-1.32,3.38,4.51,5.64,4.7,3.57-.19,5.07-2.07,3.39-3.56,4-5.63.57-4.7,5.07-6.21,6.21-1.12,8.08-3.75,2.07-4.14,4.89-4.7,5.45-2.63,7-3.57,3.2-2.24,3.3-2.31A13.85,13.85,0,0,1,749.46,383.67Zm-66-16.29c-2.18.37-4,.86-4.53,3.05-1.13,4.86-4,4.57-7.63,3.05-6.07-2.57-12-4.79-19-3.87-5.63.74-8-2.86-6.46-8.23,1.19-4.24-1.26-6.79-3.74-9.31-1-1-2.48-1.78-2.14-3.27,1.54-6.78-1-10.67-7.82-11.95a1.83,1.83,0,0,1-1.16-2.41,1.19,1.19,0,0,1,2-.18c2,2.34,5.05,1.45,7.53,2.49,6,2.47,9.53-3.27,12.27-6.46,3.6-4.21,6.51-.68,9.54-1,2.53-.26,3.07,2.91,3.24,5.38.23,3.5,1.85,5.13,5.62,6.31,6,1.86,11.49,5.33,17.22,8.05a2.77,2.77,0,0,1,1.81,3c-1.51,3-.3,6.15,0,9.48C690.54,365.42,686.69,366.83,683.42,367.38Zm148.84-80.76c-.11,2.74-3.67,4.49-8.75,3.51a52.84,52.84,0,0,0-9.83-1.94,71.67,71.67,0,0,1-12.91-2.59c-10.11-2.78-12.52-8.5-10.11-18.84,1-4.31.71-8.88,4.52-12.75,2.5-2.54-1.18-6.59-2.15-9.92s-1.42-6,1.39-8.67c4.38-4.25,6.14-4,8.44,1.74,1.49,3.71,8.52,7.18,12.13,6,4.69-1.56,8.61,2.4,6,8.11-3.64,8.08,2.52,10.95,5.85,15.48.75,1,3,1.76,2.59,2.93C827.18,276,832.49,281,832.26,286.62ZM792,328.34a10.2,10.2,0,0,1,.75,2.7c0,9.31-2,11.49-10.61,12.09-1.79.13-3.73-.33-5.35.2-5.79,1.91-7.85-.3-7.31-6,.07-.72,0-2.1-.22-2.13-4.91-.75-4.53-6.43-6.76-8-4.67-3.27-5.35-8.55-6.34-12.22-1.41-5.22-3.85-10.8-3.24-16.48.83-7.48,5.52-9.49,11.7-5.38,2.64,1.75,5.19,3.64,7.67,5.6a6,6,0,0,0,4.28,1.64c5.77-.32,9,2,8.84,7.83C785.1,316,788.64,322,792,328.34ZM690.6,242.05c-6.62-.19-12.23,3.79-16.36,9-4.47,5.68-11.86,6.8-17.43,2.19-2.89-2.39-5-5.09-9.92-2.55-2.73,1.43-5.43-3.31-4.9-5.79,1.22-5.69-2-8.77-5.58-11.28-5.36-3.78-3.56-8.92-3.17-13.5.37-4.34,4.39-5.66,8.25-6.36,4.41-.79,8.88-2.3,13,1a3.47,3.47,0,0,0,3.39.36c6.16-1.79,4.95,1.76,3.44,6.27,1.76-.67,3.12-.77,3.47-1.41,3.78-7,9.64-4.3,14.87-3,6,1.47,8.58,6.31,10.53,11.74,1,2.76,3.14,5.13,4,7.91C694.88,239.17,696.38,242.22,690.6,242.05ZM652.24,144.5c-2.78,3.43-5.19,6.47-9.06,8.66-3.61,2.06-3.67,6.45-4.48,10-1,4.33-3,5.92-7.43,6.85-7.4,1.56-13,.87-19.13-4.65-3.61-3.27-8.61-5.34-11.77-9.6-1-1.4-2.44-1.21-3.46.22-3,4.15-7.14,3.24-11.51,3.59-6.48.52-13.55.92-18.69,6-2.33,2.31-5.15,3.65-7.93,5.18-2.14,1.16-3.85,1.37-5.74-.71-.79-.88-1.78-3.39-3.71-1.76s-2,3.62-1,6c3.46,8.12,7.46,15.61,16.18,19.4,5.11,2.22,6.51,5.48,3.83,11.24-2.49,5.33-4.6,10.14-10.51,12.43-3,1.13-5.49,1-7.73-.93a81.38,81.38,0,0,0-15.55-10.77c-3.46-1.76-5.35-5.14-7.24-8.42a3.23,3.23,0,0,1,.06-3.86c4.05-5.64,4.46-12.25,5.09-18.84.35-3.74-1.91-5.66-4.78-5.21-6.13,1-10.17-2.22-14.71-5.28-2.51-1.69-5.15-3.59-8.52-4-2.51-.3-4.06-2.24-2.24-4.69,1-1.36.38-2.15,0-3.14-.57-1.46-3.14-2.75-.71-4.43a6.68,6.68,0,0,1,6.45-1.24c5.75,1.7,11.73,2.12,17.72-.55,3-1.35,7-2.05,9.79,1.27a3.53,3.53,0,0,0,4.8,1c3.32-2.09,6.36-4.59,10.34-5.44.79-.18,1.6-.7,1.34-1.63-2.26-8.15,5.92-9.46,9.2-14,.64-.88,2.34-1.44,1.64-2.65-4.54-7.85,3.62-10.87,5.94-16.09h4.78c.72,2.39,1.38,4.79.31,7.74,3.27-4.17,7.7-2.57,11.43-3.48,1.5-.36,2.92-1.42,4.36.22,1.62,1.83.09,3.43-.4,5-.38,1.22-1.55,2.21-2.39,3.28-1.4,1.8-1.81,3.39,1.17,3.56,2.67.14,4.35,2.74,7.77,1.8s4.32,3.86,5.19,5.92c1.76,4.16,4.15,4.62,7.29,3,6-3.15,11.45,1.82,17.27.65,1-.21,1.1,1.83,1.65,2.61,1.43,2,3.11,4.78,6.26,1.32,1.65-1.82,4.12-2.45,6.93-2.63,5-.34,7-4.43,4.59-8.81-1.32-2.36-.74-3.69.89-5.11,2.77-2.43,5.31-6,9.43-5.16,2.06.41,1.46,3.83,2.29,5.56C661.85,132.54,657.46,138,652.24,144.5ZM640,270.23c-.5-4.76-3-6.51-7.63-7.19-.13,3.67-.82,7,1.87,9.68.93.92.91,3.69,3.2,2.18C639,273.92,640.29,272.93,640,270.23Z"/>
                <path id="athentha" :class="getAreaClass('athentha')" :style="getAreaStyle('athentha')" @mouseover="hoverOn('athentha')" @mouseout="hoverOff('athentha')" d="M190,203.59H140.37V89.71H190l13.17,56.94ZM126.28,99.86H92.45v33.83l16.91,5.46,16.92-5.46Zm-2.07,50.35-37.16,19.3L70.84,203.59h53.37Z"/>
                <path id="vechynacht" :class="getAreaClass('vechynacht')" :style="getAreaStyle('vechynacht')" @mouseover="hoverOn('vechynacht')" @mouseout="hoverOff('vechynacht')" d="M124.21,702.3,92.45,720.17,85.92,743.9l23.44,12.72s31-17.46,31-17.31,18.48-9.85,18.48-9.85L151.46,713Z"/>
                <g id="waters">
                    <path id="ysmir-sea" :class="getWaterClass('ysmir-sea')" @click="selectWater('ysmir-sea')" :style="getWaterStyle('ysmir-sea')" @mouseover="hoverOn('ysmir-sea')" @mouseout="hoverOff('ysmir-sea')" d="M641.4,493.89c-1.23,3.86-1.6,8.29-5.77,10.51-6.16,3.27-9.51,9.54-14.82,13.83-3.38,2.73-6.16,4-10,3.29-2.44-.44-4.1-1.4-3.66,2.65.33,3-1.57,4.14-4.62,2.11a14.43,14.43,0,0,0-13.37-1.54c-2.19,3.21-2.67,5.56,2.08,7.15,3,1,5.46,3.94,5.1,7.31-.34,3.06-3.09,4.87-6.13,5.7-1.33.37-2.68.67-4,1-3.77.92-5,2.57-2.19,6.05,1.26,1.54,3.16,3.53.32,5.52s-6.38-.41-6.45-1.8c-.4-7.56-8-11.89-8.06-19.67,0-3.34.15-4.38,3.39-5.26,5.45-1.5,11.27-2.22,15.82-6.11-1.52-5.32-1.41-10.35,3.68-13.72,4.43-2.94,2.13-7.71,3.57-11.48,1.14-2.93.87-5.32,5.25-3.42,2.31,1,5.42-.73,8.07-.94,9.76-.75,19.73.8,29.11-3.48C640.37,490.84,642.18,491.45,641.4,493.89Z"/>
                    <path id="cialo-great-lake" :class="getWaterClass('cialo-great-lake')" @click="selectWater('cialo-great-lake')" :style="getWaterStyle('cialo-great-lake')" @mouseover="hoverOn('cialo-great-lake')" @mouseout="hoverOff('cialo-great-lake')" d="M683.42,367.38c-2.18.37-4,.86-4.53,3.05-1.13,4.86-4,4.57-7.63,3.05-6.07-2.57-12-4.79-19-3.87-5.63.74-8-2.86-6.46-8.23,1.19-4.24-1.26-6.79-3.74-9.31-1-1-2.48-1.78-2.14-3.27,1.54-6.78-1-10.67-7.82-11.95a1.83,1.83,0,0,1-1.16-2.41,1.19,1.19,0,0,1,2-.18c2,2.34,5.05,1.45,7.53,2.49,6,2.47,9.53-3.27,12.27-6.46,3.6-4.21,6.51-.68,9.54-1,2.53-.26,3.07,2.91,3.24,5.38.23,3.5,1.85,5.13,5.62,6.31,6,1.86,11.49,5.33,17.22,8.05a2.77,2.77,0,0,1,1.81,3c-1.51,3-.3,6.15,0,9.48C690.54,365.42,686.69,366.83,683.42,367.38Z"/>
                    <path id="unknown1" :class="getWaterClass('unknown1')" @click="selectWater('unknown1')" :style="getWaterStyle('unknown1')" @mouseover="hoverOn('unknown1')" @mouseout="hoverOff('unknown1')" d="M515.33,359.86c-8.26,1-7-3.83-6.45-8.21.75-6.28.68-11.71-5-16.74s-14-5.08-18.19-11.91c-.79-1.27-3.18-.51-4.17.87-1.82,2.57-4.56,5-4.55,8.18,0,3.67-2.37,4.77-4.68,4.76-4.19,0-5.42,2.93-6.67,5.65-.94,2-1,3.39-4.13,3.44-4.42.06-5.44,3.3-3.26,7.37a36.58,36.58,0,0,1,1.91,5.46,9.64,9.64,0,0,1,7.25-.17c1.45.57,3.28,1.17,3.24-1.54-.06-4.44,3.14-4.11,5.81-3.64a24.74,24.74,0,0,1,6.51,2.68c1.87.93,3,0,4.14-1.2a2.85,2.85,0,0,0,.26-3.8c-.84-1.41-1.71-2.31-3.19-.84-1.09,1.08-1.9.48-2.23-.5a2.44,2.44,0,0,1,.83-2,27.92,27.92,0,0,1,5.27-3.75c5.29-2.55,8.49-1.08,10.5,3.83,1.41,3.46-1.73,3.88-3,5.57-4.66,6.33-2.95,15.45-9.2,21.17-.35.31,1.25,2.36,1.38,3.65.3,2.81,4.74,3.69,3.29,7.12-2.35,5.59,0,7.58,5.45,7.69,1.94,0,3.85.83,5.79,1.19,6.69,1.23,6.56,1.24,5.29-5.85-.46-2.56-1.37-4.93-2-7.4-.95-3.85-1.35-8.11,1.56-11.39,2-2.22,5.58-3,4.09-7.39C510.52,360,513.45,361.17,515.33,359.86Zm-32-17c-3.59.73-5.09-1.84-5.67-3.74-.72-2.4,2.53-2.29,3.65-2.28,2.28,0,4.81,1,5,3.93C486.56,343.37,484,342.2,483.37,342.89Z"/>
                    <path id="ysis-sea" :class="getWaterClass('ysis-sea')" @click="selectWater('ysis-sea')" :style="getWaterStyle('ysis-sea')" @mouseover="hoverOn('ysis-sea')" @mouseout="hoverOff('ysis-sea')" d="M495.2,430.07c-.72,1.63-1.63,3.76-3.77,1.56-3.25-3.33-6.87-1.78-8.95.42-2.66,2.78-5.64,6.25-4,11a51.12,51.12,0,0,1,2.25,7.36c.68,3.82.3,7.11-3.14,10.13-4.31,3.77-7.37,8.52-2.95,14.5,1.29,1.73.73,3.94.21,5.8-.65,2.32-2,3.77-3.84.69-1.36-2.29-4-3.78-5.87-3.39-7.85,1.58-11.38-4.74-16.52-8.13-1.86-1.22-1.39-3.07-1.92-4.69-.67-2.07-3.32-3.71-4.43-3.53-9.48,1.58-7.85-6.39-9.6-11.08-.74-2-.49-2.83-3.19-2.57a5.19,5.19,0,0,1-5.25-3.9c-.66-2.89.65-4.87,3.17-6.31,5.85-3.34,7.45-8.75,4.62-14.56-.66-1.35-2.72-3.08-.26-4.59,1.74-1.07,4.39-1.76,5.44,0,2.42,4.09,6.12,3.05,9.67,3.65,9.67,1.64,19-.51,28.44-1.87,3.28-.48,4.63-4.25,6.22-6.82,1.9-3,4.4-5.44,7.5-4.3s1.83,5.23,2.14,8c.2,1.8-.95,3.74-1.51,5.66C495.92,423.61,497.28,425.39,495.2,430.07Z"/>
                    <path id="unknown2" :class="getWaterClass('unknown2')" @click="selectWater('unknown2')" :style="getWaterStyle('unknown2')" @mouseover="hoverOn('unknown2')" @mouseout="hoverOff('unknown2')" d="M384.91,411.43c-4.94.53-4.58-4.65-5.61-7.58-.91-2.56,5.64-11,7.63-10.37,5.45,1.79,5.55,6.68,5.65,12.22C394.8,412.52,388.32,411.05,384.91,411.43Z"/>
                    <path id="unknown3" :class="getWaterClass('unknown3')" @click="selectWater('unknown3')" :style="getWaterStyle('unknown3')" @mouseover="hoverOn('unknown3')" @mouseout="hoverOff('unknown3')" d="M746.86,558.36c1.62,3.62,2.75,7.87-3.26,9.26-2.16.5-2.85,2.41-3.64,4.31-1.36,3.33-3.07,6.21-7.32,6.85-2.63.38-3.26,3.16-3.3,5.51a16.59,16.59,0,0,0,.79,6.46c2.11,5.31-1.12,8.6-4.88,9.94-4.18,1.49-7.56,3.88-11.28,6-5.12,2.91-12.88-2.26-12.05-8,.9-6.24.59-13.18,7-17.31a3.77,3.77,0,0,0,1.21-2.57c.23-2.91.85-4.27,4.45-3.37,3,.74,5.93.27,5.49-4.69a16.88,16.88,0,0,1,7.52-15.59c3.75-2.35,9.52-3.21,14.65-2.64,3.48.37,5.5-1.32,5.52-4.38a.7.7,0,0,1,1.21-.47c1.18,1.24,2,2.52-1.45,4.33C745.86,552.85,745.67,555.7,746.86,558.36Z"/>
                </g>
            </g>
        </g>
    `,
    // :class="getWaterClass('great-sine')" @click="selectWater('great-sine')" : style = "getWaterStyle('great-sine')" @mouseover="hoverOn('great-sine')" @mouseout="hoverOff('great-sine')"
    data() {
        return {
            terrain: 'terrenus',
            status: [],
            waterStatus: [],
            ready: false,
            areas: {
                terrenus: ['body', 'off-tropic', 'san-yara', 'ursa-madeum', 'biazo'],
                west_genesaris: ['body', 'antigone', 'stonehaven'],
                east_genesaris: ['body', 'stonehaven', 'nvengaria', 'orisia', 'arlais'],
                orisia: ['body', 'ceyana'],
                kadia: ['body'],
                alterion: ['body', `hunter_s-association`, 'xangri-la', 'isra', `mi_sral`, 'magnus'],
                renovatio: ['body', 'avylon', 'nu-martyr', `oo_xora`, 'la-guardia', 'athentha', 'vechynacht'],
            },
            waters: {
                terrenus: ['lake-ashville', 'great-sine', 'ponkapoag-lake', 'sidereal-lake', 'coconino-marsh'],
                west_genesaris: ['lake-vipuris', 'great-lake'],
                east_genesaris: ['great-lake', 'strulent-loch', 'kethlerin-lake', 'dragonclaw-spring', 'phoenix-falls', 'jade-sea-lakes', 'unknown1', 'unknown2'],
                orisia: ['lake-atitlan', 'lake-ipala', 'lake-cayur', 'unknown'],
                kadia: ['unknown'],
                alterion: ['unknown1', 'unknown2', 'unknown3'],
                renovatio: ['ysmir-sea', 'cialo-great-lake', 'ysis-sea', 'unknown1', 'unknown2', 'unknown3'],
            } 
        }
    },
    mounted() {
        this.startStatus();
        console.log(`Hello ${this.terrain}`)
        console.log(this.model);
        Event.$on('rebootMap', this.rebootMap);
        Event.$on('hoverArea', this.hoverArea);
        Event.$on('clearAllAppearance', this.clearStatus);
        Event.$on('clearAllAppearance', this.clearWaterStatus);
        Event.$on('rebootAgain', this.rebootStatus);
    },
    computed: {
        activeWater: function() {
            var terrain = this.terrain;
            return this.waters[terrain];
        },
        activeArea: function() {
            var terrain = this.terrain;
            return this.areas[terrain];
        },
        hasActiveWater: function () {
            var result = false;
            for (var i = 0; i < this.waterStatus.length; i++) {
                var target = this.waterStatus[i];
                if ((target.selected) || (target.hover))
                    result = true;
            }
            return result;
        },
        hasActiveAreas: function() {
            var result = false;
            for (var i = 0; i < this.status.length; i++) {
                var target = this.status[i];
                if ((target.hover) || (target.selected))
                    result = true;
            }
            return result;
        },
        activeAny: function() {
            if ((this.hasActiveWater) || (this.hasActiveAreas))
                return true;
            else
                return false;
        }
    },
    methods: {
        // @@ fix water cursor and active click selection.
        // 
        rebootMap(terrain) {
            this.terrain = terrain;
            console.log(`Rebooting to ${this.terrain}`)
            this.status = [];
            this.waterStatus = [];
            Event.$emit('requestReboot')
        },
        rebootStatus() {
            // This doesn't work, decided to change identical names instead.
            console.log(`Received request to reboot ${this.terrain}`)
            this.startStatus();
            console.log('Forcing hover on all')
            for (var i = 0; i < this.status.length; i++) {
                var child = this.status[i];
                child.hover = true;
            }
            for (var i = 0; i < this.status.length; i++) {
                var child = this.status[i];
                child.hover = false;
            }
            console.log('Hover cleared')
        },
        selectWater(name) {
            if (this.ready) {
                var elt = this.getWaterStatus(name);
                elt.active = !elt.active;
                console.log(`Selecting ${name} : ${elt.active}`)
                if (!elt.active) {
                    Event.$emit('clearSelection')
                } else {
                    this.$root.selection = elt.name;
                }
            }
        },
        hoverArea(name) {
            // console.log(`Receiving message for ${name}`)
            if (!this.$root.selection.length)
                this.setStatus(name, 'hover', true)
        },
        startStatus() {
            var self = this, mirror = [], terrain = this.terrain;
            for (var i = 0; i < this.areas[terrain].length; i++) {
                var child = {
                    name: self.areas[terrain][i],
                    hover: false,
                    active: false,
                };
                mirror.push(child)
            }
            self.status = mirror;
            for (var w = 0; w < this.waters[terrain].length; w++) {
                var child = {
                    name: self.waters[terrain][w],
                    hover: false,
                    active: false,
                };
                mirror.push(child)
            }
            self.waterStatus = mirror;
            self.ready = true;
        },
        getAreaClass(area) {
            var result = 'map-bounds-' + area
            return result;
        },
        getBoundsClass(bounds) {
            var result = 'map-bounds-' + bounds
            return result;
        },
        getWaterClass(bounds) {
            var result = 'map-water-' + bounds
            return result;
        },
        getWaterStyle(area) {
            var style = '';

            if (this.ready) {
                var elt = this.getWaterStatus(area);
                // console.log(elt)
                for (var i = 0; i < this.status.length; i++) {
                    if (this.status[i].name == elt.name)
                        result = this.status[i];
                }
                // console.log(`${this.status[i].name} ? ${elt.name} in ${area} ? ${result}`)
                if ((!elt.hover) && (!elt.active)) {
                    // console.log('Default')
                    style += 'fill: ' + this.$root.getCSS('color-water') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-shore') + ';';
                } else if (elt.active) {
                    // console.log(`Hovering over water: ${elt.name}`)
                    style += 'cursor:pointer;'
                    style += 'fill: ' + this.$root.getCSS('color-water-select') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-blue') + ';';
                } else if (elt.hover) {
                    // console.log(`Hovering over water: ${elt.name}`)
                    style += 'cursor:pointer;'
                    style += 'fill: ' + this.$root.getCSS('color-water-hover') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-shore-hover') + ';';
                }
                return style;
            } else {
                this.startStatus();
                // console.log('Not ready yet')
            }
        },
        getAreaStyle(area) {
            if (this.ready) {
                var style = '', elt = this.getStatus(area);
                for (var i = 0; i < this.status.length; i++) {
                    if (this.status[i].name == name)
                    result = this.status[i];
                }
                if ((!elt.hover) && (!elt.active)) {
                    style += 'fill: ' + this.$root.getCSS('color-terrain') + ';';
                    style += 'stroke: ' + this.$root.getCSS('color-shore') + ';';
                } else if (elt.hover) {
                    // console.log(`Hovering over ${elt.name}`)
                    if (/ursa-madeum|san-yara|amalia|stonehaven|antigone|arlais|off-tropic/.test(elt.name)) {
                        style += 'fill: ' + this.$root.getCSS('color-water-hover') + ';';
                        style += 'stroke: ' + this.$root.getCSS('color-shore-hover') + ';';
                    } else {
                        style += 'fill: ' + this.$root.getCSS('color-terrain-hover') + ';';
                        style += 'stroke: ' + this.$root.getCSS('color-shore-hover') + ';';
                    }
                }
                return style;
            } else {
                this.startStatus();
                // console.log('Not ready yet')
            }
        },
        getBoundsStyle(bounds) {
            var style = '';
            style += 'fill: ' + this.$root.getCSS('color-coast') + ';';
            return style;
        },
        getWaterBoundsStyle(bounds) {
            var style = '';
            if (!this.$root.selection.length) {
                style += 'cursor:pointer;';
            }
            style += 'fill: ' + this.$root.getCSS('color-coast') + ';';
            return style;
        },
        hoverOn(name,area='body') {
            // console.log('Hover on')
            if (!this.$root.selection.length) {
                if (!/(lake|ysmir-sea|sine|marsh|unknown|loch|dragonclaw-spring|phoenix-falls)/.test(name)) {
                    var elt = this.getStatus(name);
                    this.clearStatus(name);
                    this.setStatus(name, 'hover', true);
                    Event.$emit('updateRegionAnno', name)
                } else {
                    // console.log('Hovering over some water')
                    var water = this.getWaterStatus(name);
                    if (!water.active) {
                        Event.$emit('updateRegionAnno', 'body')
                        Event.$emit('updateLabelAnno', name)
                        // @@ FORCED -- This assumes all water sections will be inside main continent body.
                        console.log(`${name} is a water in region ${area}`)
                        this.setStatus(area, 'hover', true)
                        this.setWaterStatus(name, 'hover', true)
                    }
                }
            }
            // console.log(`ON:: area: ${this.hasActiveAreas}, water: ${this.hasActiveWater}, any: ${this.activeAny}`)
        },
        hoverOff(name) {
            // console.log('Hover off')
            if (!this.$root.selection.length) {
                Event.$emit('clearLabelAnno');
                this.clearStatus();
            } else if (!this.activeAny) {
                Event.$emit('clearLabelAnno');
                Event.$emit('clearRegionAnno');
            }
            if (!this.activeAny) {
                // console.log('Should be clearing all annotation')
                Event.$emit('clearLabelAnno');
                Event.$emit('clearRegionAnno');
            }
            // console.log(`OFF:: area: ${this.hasActiveAreas}, water: ${this.hasActiveWater}, any: ${this.activeAny}`)
        },
        setStatus(name, attr, state) {
            for (var i = 0; i < this.status.length; i++) {
                var targ = this.status[i];
                if (targ.name == name) {
                    targ[attr] = state;
                }
            }
        },
        getStatus(name) {
            var result;
            for (var i = 0; i < this.status.length; i++) {
                // console.log(`${this.status[i].name} ? ${name}`)
                if (this.status[i].name == name)
                    result = this.status[i];
            }
            // console.log(`Status of ${name} is ${result}`)
            return result;
        },
        clearStatus(except=null) {
            for (var i = 0; i < this.status.length; i++) {
                var targ = this.status[i];
                if (targ.name !== except) {
                    targ.hover = false;
                    targ.active = false;
                }
            }
        },
        setWaterStatus(name, attr, state) {
            for (var i = 0; i < this.waterStatus.length; i++) {
                var targ = this.waterStatus[i];
                if (targ.name == name) {
                    targ[attr] = state;
                }
            }
        },
        getWaterStatus(name) {
            var result;
            if (this.waterStatus.length) {
                for (var i = 0; i < this.waterStatus.length; i++) {
                    if (this.waterStatus[i].name == name)
                        result = this.waterStatus[i];
                }
                return result;
            } else {
                return false;
            }
        },
        clearWaterStatus(except = null) {
            for (var i = 0; i < this.waterStatus.length; i++) {
                var targ = this.waterStatus[i];
                if (targ.name !== except) {
                    targ.hover = false;
                    targ.active = false;
                }
            }
        },
    }
})

Vue.component('mod-keys', {
    template: `
    <div 
      v-mousemove-outside="onMouseOutside"
      v-keydown-outside="onKeyDownOutside"
      v-keyup-outside="onKeyUpOutside"
      v-click-outside="onClickOutside"
      class="visualizerModKeys" 
      :style="'grid-template-columns: repeat(' + this.activeList.length + ', 1fr);'">
      <div v-for="modKey in activeList" :class="getModKeyClass(modKey)"></div>
    </div>
  `,
    data() {
        return {
            activeList: [
                { name: 'Ctrl' },
                { name: 'Shift' },
                { name: 'Alt' },
            ],
            Shift: false,
            Ctrl: false,
            Alt: false,
        }
    },
    mounted() {
        var self = this;
        this.activeMods();
        Event.$on('updateModsUI', self.updateMods);
        Event.$on('clearMods', self.clearMods);
    },
    methods: {
        activeMods() {
            var mirror = [], child = {};
            if (this.Ctrl) {
                child = { name: 'Ctrl', key: 0 }
                mirror.push(child);
            }
            if (this.Shift) {
                child = { name: 'Shift', key: 1 }
                mirror.push(child);
            }
            if (this.Alt) {
                child = { name: 'Alt', key: 2 }
                mirror.push(child);
            }
            this.activeList = mirror;
        },
        clearMods() {
            this.Shift = false;
            this.Alt = false;
            this.Ctrl = false;
            this.activeList = [];
        },
        updateMods() {
            this.Ctrl = this.$root.Ctrl;
            this.Shift = this.$root.Shift;
            this.Alt = this.$root.Alt;
            this.activeMods();
        },
        getModKeyClass(type) {
            return 'modKey-' + type.name + '-Active'
        },
        onMouseOutside(e, el) {
            // console.log(e)
            this.$root.parseModifiers(e);
        },
        onClickOutside(e, el) {
            // console.log(e)
            if (this.$root.showCrosshair) {
                Event.$emit('setMarker');
            }
        },
        onKeyDownOutside(e, el) {
            // console.log(e)
            this.$root.parseModifiers(e);
        },
        onKeyUpOutside(e, el) {
            // console.log(e)
            this.$root.parseModifiers(e);
        },
    },
    computed: {
        isDefault: function () { return this.$root.isDefault },
    },
})

var app = new Vue({
    el: '#app',
    data: {
        msg: 'Hello world-app',
        isWake: false,
        showCrosshair: false,
        selection: [],
        lastSelection: [],
        active: 6,
        activeName: 'terrenus',
        lastActiveRegion: '',
        activeRegion: '',
        activeLabel: '',
        activeCoords: [50, 75],
        spiritCoords: [0, 0],
        Shift: false,
        Ctrl: false,
        Alt: false,
        macOS: false,
        spirit: 'city',
        showTexter: false,
    },
    computed: {
        isDefault: function() {
            var result = true;
            if ((this.Ctrl) || (this.Shift) || (this.Alt))
                result = false
            return result;
        }
    },
    mounted() {
        console.log(this.msg)
        if (navigator.platform.indexOf('Win') > -1) { this.macOS = false; } else if (navigator.platform.indexOf('Mac') > -1) { this.macOS = true; }
        Event.$on('updateSelection', this.updateSelection);
        Event.$on('clearSelection', this.clearSelection);
        Event.$on('updateRegionAnno', this.updateRegionAnno);
        Event.$on('updateLabelAnno', this.updateLabelAnno);
        Event.$on('clearLabelAnno', this.clearLabelAnno);
        Event.$on('clearRegionAnno', this.clearRegionAnno);
        Event.$on('clearCrosshair', this.clearCrosshair);
        document.addEventListener('wheel', this.handleWheel);
        document.addEventListener('scroll', this.handleScroll);

        // Event.$on('clearMods', clearMods)
    },
    methods: {
        handleScroll(evt) {
            // Firefox may not work with wheel
            // this.handleWheel(evt);
        },
        handleWheel(evt) {
            Event.$emit('ghostWheel', (evt.deltaY < 0 ? true : false));
        },
        updateRegionAnno(msg) {
            msg = this.relayMsg(msg);
            console.log(msg)
            if (this.lastActiveRegion !== msg) {
                console.log(`Updating region to ${msg}`)
                this.lastActiveRegion = this.activeRegion;
                this.activeRegion = msg;
            }
        },
        updateLabelAnno(msg) {
            var msg = this.relayMsg(msg);
            // const upper = lower.replace(/^\w/, c => c.toUpperCase());
            // console.log(`Updating label to ${msg}`)
            this.activeLabel = msg;
        },
        relayMsg(str) {
            var segments;

            if (/\-/.test(str)) {
                segments = str.split('-');
            } else {
                segments = [str]
            }
            var newstr = '';
            for (var i = 0; i < segments.length; i++) {
                newstr += ' ' + segments[i].charAt(0).toUpperCase() + segments[i].substr(1);
            }
            return newstr;
        },
        clearLabelAnno() {
            // console.log('Hello label')
            this.activeLabel = '';
        },
        clearRegionAnno() {
            // console.log('Hello region')
            this.activeRegion = '';
        },
        clearSelection() {
            console.log('Clearing master selection')
            this.selection = [];
            console.log(this.selection)
        },
        updateSelection(label) {
            if (typeof label === 'String') {
                this.selection = [label];
                console.log('Label is a string')
            } else {
                this.selection = [].concat(this.selection, label)
            }
            console.log(this.selection)
        },
        wake() {
            this.isWake = true;
        },
        sleep() {
            this.isWake = false;
        },
        getCSS(prop) {
            return window.getComputedStyle(document.documentElement).getPropertyValue('--' + prop);
        },
        setCSS(prop, data) {
            document.documentElement.style.setProperty('--' + prop, data);
        },
        parseCoordinates(evt) {
            var ratioX = (1000/(window.innerWidth*.8)), ratioY = (1000/(window.innerWidth*.8))
            var xpos = Math.floor(evt.clientX * ratioX), ypos = Math.floor(evt.clientY * ratioY);
            xpos = xpos/10, ypos = ypos/10;
            if (((xpos >= 0) && (ypos >= 0)) && ((xpos <= 100) && (ypos <= 100))) {
                if (!this.showTexter) {
                    this.$root.activeCoords = [xpos, ypos];
                } else {
                    console.log('Texter is still showing....')
                }
            } else {
                if (xpos < 0)
                    xpos = 0;
                else if (xpos > 100)
                    xpos = 100;
                if (ypos < 0)
                    ypos = 0;
                else if (ypos > 100)
                    ypos = 100;   
            }
        },
        percentage(total, num) {
            return(total/num);
        },
        clearCrosshair() {
            this.showCrosshair = false;
        },
        parseModifiers(evt) {
            this.parseCoordinates(evt)
            // if (this.selection !== this.lastSelection)
            //     this.lastSelection = this.selection;
            // console.log(evt)
            var lastMods = [this.Ctrl, this.Shift, this.Alt]
            if (this.isWake) {
                if (((!this.macOS) && (evt.ctrlKey)) || ((this.macOS) && (evt.metaKey))) {
                    this.Ctrl = true;
                } else {
                    this.Ctrl = false;
                }
                if (evt.shiftKey)
                    this.Shift = true;
                else
                    this.Shift = false;
                if (evt.altKey) {
                    evt.preventDefault();
                    this.Alt = true;
                } else {
                    this.Alt = false;
                };
                var thisMods = [this.Ctrl, this.Shift, this.Alt]
                if (!this.isEqualArray(lastMods, thisMods)) {
                    // change
                    // console.log(`${thisMods} : ${lastMods}`)
                    if (this.Shift) {
                        this.selection = ['default'];
                        this.showCrosshair = true;
                        console.log(`Freezing selection at ${this.selection}`)
                        // Event.$emit('clearSelection');
                        Event.$emit('showCrosshair')
                        Event.$emit('clearAllAppearance')
                    } else {
                        if (!this.showTexter) {
                            // Event.$emit('hideCrosshair')
                            this.showCrosshair = false;
                            this.selection = this.lastSelection;
                        } else {
                            console.log('Texter is currently showing')
                        }
                        // console.log(`Changing ${this.selection} back to ${this.lastSelection}`)
                    }
                }
                Event.$emit('updateModsUI');
            } else {
                Event.$emit('clearMods');
            }
        },
        flushModifiers() {
            this.Ctrl = false;
            this.Shift = false;
            this.Alt = false;
            Event.$emit('clearMods');
        },
        isEqualArray(array1, array2) {
            array1 = array1.join().split(','), array2 = array2.join().split(',');
            var errors = 0, result;
            for (var i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i])
                    errors++;
            }
            if (errors > 0)
                result = false;
            else
                result = true;
            return result;
        },
    }
})