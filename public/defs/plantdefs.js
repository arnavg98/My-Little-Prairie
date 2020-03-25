// this file exports { plantdefs }
// plantdefs - a dictionary with commonname as key and the plant data object as vlaue

// missing properties in plants/weeds will be filled in correspondingly from this defaultplant
let defaultplant =
{
	commonname: "Unknown Plant",
	latinname: "Plant ignotum",
	description: "There is no description written for this plant",
	cultural: "Nothing has been said yet about this plant's cultural connections",
	class: "",
	image: "default.jpg",

	pollinators: "",
	bloom: {},
	growthratemonth: [0,0,0,0,0,0,0,0,0,0,0,0],
	growthrateseason: [0,0,0,0],
	spread: "none",
	spreadrate: 0,
	removetool: "pull",

	unlock: 0,
};

// split into two arrays: plants and weeds

let plants =
[
	{
		commonname: "Carolina Anemone",
		latinname: "Anemone caroliniana",
		cultural: "sacred space plant (like gravesites); very rare; treat with respect",

		pollinators: "bee fly",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "rhizome",
		spreadrate: 2,
		growthrate: 3,
	},
	{
		commonname: "Swamp Milkweed",
		latinname: "Asclepias incarnata",

		pollinators: "monarch",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "rhizome",
		spreadrate: 10,
		growthrate: 1,
	},
	{
		commonname: "Common Milkweed",
		latinname: "Asclepias syriaca",
		cultural: "rope making; eating the pods (can be poisonous if not prepared correctly); clothing insulation",

		pollinators: "monarch",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "rhizome",
		spreadrate: 4,
		growthrate: 2,
	},
	{
		commonname: "Wild Indigo",
		latinname: "Baptisia alba",
		cultural: "dyeing using leaves",

		pollinators: "bumblebee",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "fireseed",
		spreadrate: 10,
		growthrate: 1,
	},
	{
		commonname: "Languid Coneflower",
		latinname: "Echinacea pallida",
		cultural: "tea for immune health",

		pollinators: "bumblebee goldfinch butterfly",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		growthrate: 3,
	},
	{
		commonname: "Rattlesnake Master",
		latinname: "Eryngium yuccifolium",
		cultural: "Used by southeastern indigenous people for millennia to: - make shoes and bags -cure rattlesnake bites",

		pollinators: "spiderwasp",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "baby",
		spreadrate: 8,
		growthrate: 1,
	},
	{
		commonname: "Southern Sundrops",
		latinname: "Oenothera frucitcosa",

		pollinators: "sphinxmoth",
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 2,
		growthrate: 3,
	},
	{
		commonname: "Piney woods Phlox",
		latinname: "Phlox nivalis",

		pollinators: "butterfly",
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 3,
		growthrate: 3,
	},
	{
		commonname: "Grey-headed Coneflower",
		latinname: "Ratibida pinnata",

		pollinators: "goldfinch",
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 5,
		growthrate: 2,
	},
	{
		commonname: "Goldenrod",
		latinname: "Ratibida pinnata",

		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 5,
		growthrate: 2,
	},
	{
		commonname: "Eastern silver aster",
		latinname: "Symphyotrichum concolor",

		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 0,
		growthrate: 3,
	},
	{
		commonname: "Frost aster",
		latinname: "Symphyotrichum pilosum",

		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed rhizome",
		spreadrate: 20,
		growthrate: 1,
	},
	{
		commonname: "Splitbeard Broomsedge",
		latinname: "Andropogon ternarius",
		class: "plant",
		image: "asdf.jpg",

		pollinators: "sparrows",
		bloom: {"oct": "white", "nov": "die", "dec": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 5,
		removetool: "pull",
		growthrate: 2,
	},
	{
		commonname: "Purple Lovegrass",
		latinname: "Eragrostis spectablis",
		class: "plant",
		image: "asdf.jpg",

		bloom: {"jun": "purple", "jul": "purple", "aug": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 5,
		removetool: "pull",
		growthrate: 2,
	},
	{
		commonname: "Prairie Dropseed",
		latinname: "Sporobolus heterolepsis",
		class: "plant",
		image: "asdf.jpg",

		bloom: {"may": "yes", "jun": "yes", "jul": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 4,
		removetool: "pull",
		growthrate: 2,
	},
	{
		commonname: "Indian Grass",
		latinname: "Sorghastrum nutans",
		cultural: "Essential part of Southeastern material culture; used for structural material for houses",
		class: "plant",
		image: "asdf.jpg",

		bloom: {"aug": "brown", "sep": "brown", "oct": "brown", "nov": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 10,
		removetool: "pull",
		growthrate: 1,
	},
	{
		commonname: "Durham Grass",
		latinname: "Carex brevior",
		class: "plant",
		image: "asdf.jpg",

		bloom: {"apr": "green"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "pull",
		growthrate: 3,
	},
];

let weeds = 
[
	{
		commonname: "Kudzu",
		latinname: "Pueraria montana",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 4,
		removetool: "pickaxe",
		growthrate: 2,
	},
	{
		commonname: "Johnson Grass",
		latinname: "Sorghum halepense",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "pull",
		growthrate: 3,
	},
	{
		commonname: "Star Vine",
		latinname: "Humulus japonicus",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "gloves",
		growthrate: 3,
	},
	{
		commonname: "Mouse-ear Chickweed",
		latinname: "Cerastium vulgatum",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "burn",
		growthrate: 3,
	},
	{
		commonname: "Sorrel",
		latinname: "Oxalis stricta",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "burn",
		growthrate: 3,
	},
	{
		commonname: "Common Chickweed",
		latinname: "Stellaria meadia",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "burn",
		growthrate: 3,
	},
	{
		commonname: "Hairy Cress",
		latinname: "Cardamine hirsuta",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "burn",
		growthrate: 3,
	},
	{
		commonname: "Common Vetch",
		latinname: "Vicia sativa",
		class: "weed",
		image: "asdf.jpg",

		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "burn",
		growthrate: 3,
	},
]

let plantdefs = {};

function fillinmissing(arr, type) {
	for(let ele of arr) {
		for(let key in defaultplant) {
			if(defaultplant.hasOwnProperty(key) && // if it is a property we defined
				 !ele.hasOwnProperty(key)) {         // if the plant doesn't have that property
				ele[key] = defaultplant[key];
			}
		}
		if(!ele.class.includes(type)) {
			if(ele.class !== "") ele.class += " ";
			ele.class += type;
		}
		plantdefs[ele.commonname] = ele;
	}
}

fillinmissing(plants, "plant");
fillinmissing(weeds, "weed");

export { plantdefs };
