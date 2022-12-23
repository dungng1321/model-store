/**
     * *availability filter
     */


/**
 * *category
 */
export const categories = {
    dragonBall: false,
    onePiece: false,
    naruto: false,
    myHeroAcademy: false,
    demonSlayer: false,
    jujutsuKaisen: false,
    marvel: false,
    dc: false,
    genshin: false,
    nendoroid: false,
    transformer: false,
}

export const categoriesArr = [
    {
        id: '1',
        name: 'dragonBall',
        checked: false,
        label: 'Dragon Ball',
    },
    {
        id: '2',
        name: 'onePiece',
        checked: false,
        label: 'One Piece',
    },
    {
        id: '3',
        name: 'naruto',
        checked: false,
        label: 'Naruto',
    },
    {
        id: '4',
        name: 'myHeroAcademy',
        checked: false,
        label: 'My Hero Academia',
    },
    {
        id: '5',
        name: 'demonSlayer',
        checked: false,
        label: 'Demon Slayer',
    },
    {
        id: '6',
        name: 'jujutsuKaisen',
        checked: false,
        label: 'Jujutsu Kaisen',
    },
    {
        id: '7',
        name: 'marvel',
        checked: false,
        label: 'Marvel',
    },
    {
        id: '8',
        name: 'dc',
        checked: false,
        label: 'DC Comics',
    },
    {
        id: '9',
        name: 'genshin',
        checked: false,
        label: 'Genshin Impact',
    },
    {
        id: '10',
        name: 'nendoroid',
        checked: false,
        label: 'Nendoroid',
    },
    {
        id: '11',
        name: 'transformer',
        checked: false,
        label: 'Transformer',
    },
];

/**
 * *price
 */

export function valuetext(value) {
    return `${value}°C`;
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const minDistance = 100000;

/**
 * *company
 */
 export const companies = {
    bandai: false,
    taito: false,
    bellfine: false,
    kotobukiya: false,
    takaraTomy: false,
    f4Figures: false,
    banpresto: false,
    prime1Studio: false,
    fURYUCorporation: false,
    estream: false,
    gSCompany: false,
    hEXCollectibles: false,
    megaHouse: false,
    jimeiPalace: false,
    aniplex: false,
    wonderfulWorks: false,
    aPEX: false,
    miHoYo: false,
    maxFactory: false,
    threezero: false,
    sentinel: false,
    threeAToys: false,
    sideshowCollectibles: false,
    hotToys: false,
    ironStudios: false,
    tweeterhead: false,

 }