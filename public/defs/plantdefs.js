/**
 * this file exports { plantdefs, plants, weeds }
 *   plantdefs - a dictionary with commonname as key and the plant data object as value
 *   plants - an array of objects with plant properties
 *   weeds - an array of weeds with weed properties
 */ 

// missing properties in plants/weeds will be filled in correspondingly from this defaultplant
let defaultplant =
{
	commonname: "Unknown Plant",
	latinname: "Plant ignotum",
	description: "There is no description written for this plant",
	cultural: "Nothing has been said yet about this plant's cultural connections",
	class: "",
	image: "default.jpg",
	dormant: `<img src="assets/dormant-grass-1.jpg">`,
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
		image: `<img src="assets/carolinaanemone.jpg">`,
		pollinators: "bee fly",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "rhizome",
		spreadrate: 2,
		growthrate: 3,
		plantid: "buttonplant1",
	},
	{
		commonname: "Swamp Milkweed",
		latinname: "Asclepias incarnata",
		image: `<img src="assets/swampmilkweed.jpg">`,
		dormant: `<img src="assets/dormantmilkweed.jpg">`,
		pollinators: "monarch",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "rhizome",
		spreadrate: 10,
		growthrate: 1,
		plantid: "buttonplant2",
	},
	{
		commonname: "Common Milkweed",
		latinname: "Asclepias syriaca",
		cultural: "rope making; eating the pods (can be poisonous if not prepared correctly); clothing insulation",
		image: `<img src="assets/commonmilkweed.jpg">`,
		dormant: `<img src="assets/dormantmilkweed.jpg">`,
		pollinators: "monarch",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "rhizome",
		spreadrate: 4,
		growthrate: 2,
		plantid: "buttonplant3",
	},
	{
		commonname: "Wild Indigo",
		latinname: "Baptisia alba",
		cultural: "dyeing using leaves",
		image: `<img src="assets/wild indigo.jpg">`,
		dormant: `<img src="assets/blue-wild-indigo-dormant.jpg">`,
		pollinators: "bumblebee",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "fireseed",
		spreadrate: 10,
		growthrate: 1,
		plantid: "buttonplant4",
	},
	{
		commonname: "Languid Coneflower",
		latinname: "Echinacea pallida",
		cultural: "tea for immune health",
		image: `<img src="assets/languidconeflower.jpg">`,
		pollinators: "bumblebee goldfinch butterfly",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		growthrate: 3,
		plantid: "buttonplant5",
	},
	{
		commonname: "Rattlesnake Master",
		latinname: "Eryngium yuccifolium",
		cultural: "Used by southeastern indigenous people for millennia to: - make shoes and bags -cure rattlesnake bites",
		image: `<img src="assets/rattlesnakemaster.jpg">`,
		dormant: `<img src="assets/dormantrattlesnake.jpg">`,
		pollinators: "spiderwasp",
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "baby",
		spreadrate: 8,
		growthrate: 1,
		plantid: "buttonplant6",
	},
	{
		commonname: "Southern Sundrops",
		latinname: "Oenothera frucitcosa",
		image: `<img src="assets/sundrop.jpeg">`,
		pollinators: "sphinxmoth",
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 2,
		growthrate: 3,
		plantid: "buttonplant7",
	},
	{
		commonname: "Piney woods Phlox",
		latinname: "Phlox nivalis",
		image: `<img src="assets/phlox.gif">`,
		pollinators: "butterfly",
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 3,
		growthrate: 3,
		plantid: "buttonplant8",
	},
	{
		commonname: "Grey-headed Coneflower",
		latinname: "Ratibida pinnata",
		image: `<img src="assets/conehead.jpg">`,
		dormant: `<img src="assets/Grey+Headed+coneflower.jpg">`,
		pollinators: "goldfinch",
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 5,
		growthrate: 2,
		plantid: "buttonplant9",
	},
	{
		commonname: "Goldenrod",
		latinname: "Ratibida pinnata",
		image: `<img src="assets/goldenrod.jpg">`,
		dormant: `<img src="assets/goldenroddormant.gif">`,
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 5,
		growthrate: 2,
		plantid: "buttonplant10",
	},
	{
		commonname: "Eastern silver aster",
		latinname: "Symphyotrichum concolor",
		image: `<img src="assets/silveryaster.jpg">`,
		growthrateseason: [0,0.5,0.8,0.3],
		spreadrate: 0,
		growthrate: 3,
		plantid: "buttonplant11",
	},
	{
		commonname: "Frost aster",
		latinname: "Symphyotrichum pilosum",
		image: `<img src="assets/forst aster.jpg">`,
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed rhizome",
		spreadrate: 20,
		growthrate: 1,
		plantid: "buttonplant12",
	},
	{
		commonname: "Splitbeard Broomsedge",
		latinname: "Andropogon ternarius",
		class: "plant",
		image: `<img src="assets/splitbeardbroomsedge.jpg">`,
		dormant: `<img src="assets/splitbeardbroomsedge.jpg">`,
		pollinators: "sparrows",
		bloom: {"oct": "white", "nov": "die", "dec": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 5,
		removetool: "pull",
		growthrate: 2,
		plantid: "buttonplant13",
	},
	{
		commonname: "Purple Lovegrass",
		latinname: "Eragrostis spectablis",
		class: "plant",
		image: `<img src="assets/purplelovegrass.jpg">`,
		dormant: `<img src="assets/purplelovegrass.jpg">`,
		bloom: {"jun": "purple", "jul": "purple", "aug": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 5,
		removetool: "pull",
		growthrate: 2,
		plantid: "buttonplant14",
	},
	{
		commonname: "Prairie Dropseed",
		latinname: "Sporobolus heterolepsis",
		class: "plant",
		image: `<img src="assets/dropseed.jpg>`,
		dormant: `<img src="assets/dropseed.jpg>`,
		bloom: {"may": "yes", "jun": "yes", "jul": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 4,
		removetool: "pull",
		growthrate: 2,
		plantid: "buttonplant15",
	},
	{
		commonname: "Indian Grass",
		latinname: "Sorghastrum nutans",
		cultural: "Essential part of Southeastern material culture; used for structural material for houses",
		class: "plant",
		image: `<img src="assets/indiangrass.jpeg">`,
		dormant: `<img src="assets/indiangrass.jpeg">`,
		bloom: {"aug": "brown", "sep": "brown", "oct": "brown", "nov": "die"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 10,
		removetool: "pull",
		growthrate: 1,
		plantid: "buttonplant16",
	},
	{
		commonname: "Durham Grass",
		latinname: "Carex brevior",
		class: "plant",
		image: `<img src="assets/durhamgrass.jpg">`,
		dormant: `<img src="assets/durhamgrass.jpg">`,
		bloom: {"apr": "green"},
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		growthrateseason: [0,0.5,0.8,0.3],
		spread: "seed",
		spreadrate: 2,
		removetool: "pull",
		growthrate: 3,
		plantid: "buttonplant17",
	},
];

let weeds = 
[
	{
		commonname: "Kudzu",
		latinname: "Pueraria montana",
		class: "weed",
		growthratemonth: [1,1,1,1,1,0.5,0,0,0,0,0,0],
		image: "https://www.aces.edu/wp-content/uploads/2018/08/ANR-2221-Fig-2-kudzu-foliage1-573x600.jpg",
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
		image: "https://s3.amazonaws.com/eit-planttoolbox-prod/media/images/SorghumHap.jpg",
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
		image: "https://www.weedalogue.com/japanesehop/jh01.jpg",
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
		image: "https://nyc.books.plantsofsuburbia.com/wp-content/uploads/2015/02/Cerastium-vulgatum-plant.-Photo-by-Richard-Old.-www.xidservives.co_.-anpc.ab_.ca_.jpg",
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
		image: "https://previews.123rf.com/images/alkanc/alkanc1404/alkanc140401039/27847887-yellow-oxalis-in-a-green-meadow.jpg",
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
		image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Stellaria_media_Common_Chickweed_ჟუნჟრუკი.JPG",
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
		image: "https://identifythatplant.com/wp-content/uploads/2014/03/Hairy-bittercress-1024x769.jpg",
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
		image: "https://keyserver.lucidcentral.org/weeds/data/media/Images/vicia_sativa_subsp._sativa/viciasativasativa8.jpg",
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

export { plantdefs, plants, weeds };
