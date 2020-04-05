import { plants, weeds } from "../public/defs/plantdefs.js";



export const renderCatalog = function() {
  $("#catalog").remove();
  renderModal("catalog", "Catalog");

  insertList("catalog", "Plants", plants, "commonname", createItemLayoutPlant);
  insertList("catalog", "Weeds", weeds, "commonname", createItemLayoutPlant);

  var events = [{name:"Monarch Migration",description:"Monarch butterfly migration is the phenomenon, mainly across North America, where the subspecies Danaus plexippus plexippus migrates each summer and autumn to and from overwintering sites on the West Coast of California or mountainous sites in Central Mexico."}];
  insertList("catalog", "Events", events, "name", createItemLayoutEvent);
};

function createItemLayoutPlant(plant) {
  return `
    <p><strong>Common name:</strong> ${plant.commonname}</p>
    <p><strong>Latin name:</strong> ${plant.latinname}</p>
    <p><strong>Description:</strong> ${plant.description}</p>
  `;
}

function createItemLayoutEvent(event) {
  return `
    <p><strong>Description:</strong> ${event.description}</p>
  `;
}

function renderModal(modalID, heading) {
	$('body').append(`
    <div id="${modalID}" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-close">&times;</span>
          <h2>${heading}</h2>
        </div>
        <div id="${modalID}-body" class="modal-body">
        </div>
      </div>
    </div>
	`);

  let mymodal = $(`#${modalID}`);
	mymodal.find('.modal-close').click(function() { mymodal.css('display', 'none');	});
	mymodal.children('.modal-content').click(function(e) { e.stopPropagation(); });
	mymodal.click(function() { mymodal.css('display', 'none'); });
}

function insertList(modalID, categorylabel, arrdata, itemlabel, createItemLayout) {
  var categoryID = modalID+"-l-"+categorylabel;
  var downarrow = "&#9660;";
  var uparrow = "&#9650;";

  // Add category list
  $(`#${modalID}-body`).append(`
  	<div id=${categoryID} class="list-container">
      <div class="list-header list-category" unselectable="on">
        <span class="list-expand category-expand">${downarrow}</span>
        <h2 class="label-category">${categorylabel}</h2> 
      </div>
      <div class="list-body"></div>
  	</div>
  `);

  // Add all the list items to inside category list
  var categorybody = $(`#${categoryID} > .list-body`);
  for(let item of arrdata) {
    categorybody.append(`
      <div class="list-container">
        <div class="list-header list-item">
          <span class="list-expand item-expand">${downarrow} </span>
          <h3 class="label-item">${item[itemlabel]}</h3>
        </div>
        <div class="list-body list-content">
          ${createItemLayout(item)}
        </div>
      </div>
    `);
  }

  // Click event to toggle expansion of list
  $(`#${categoryID} .list-header`).click(function() {
    let body = $(this).siblings('.list-body');
    $(this).children('.list-expand').html(body.is(':hidden') ? uparrow : downarrow);
    body.slideToggle(200);
  });

}