import { plantdefs } from "../public/defs/plantdefs.js";



export const renderCatalog = function() {
  $("#catalog").remove();
  renderModal("catalog", "Catalog");

  insertList("catalog", "Plants", [{name:"hihi"}], createPlantListElement);
  // add any event listeners
};

function createPlantListElement(object) {
  return `

  `;
}

function renderModal(useID, heading) {
	$('body').append(`
    <div id="${useID}" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span id="${useID}-close" class="modal-close">&times;</span>
          <h2>${heading}</h2>
        </div>
        <div id="${useID}-body" class="modal-body">
        </div>
      </div>
    </div>
	`);

	$("#"+useID+"-close").click(function() { $("#"+useID).css('display', 'none');	});
	$("#"+useID+" > .modal-content").click(function(e) { e.stopPropagation(); });
	$("#"+useID).click(function() { $("#"+useID).css('display', 'none'); });
}

function insertList(modalID, listname, objects, createListElement) {
  $("#"+modalID+"-body").append(`
  	<div id=${modalID}-list-${listname} class="modal-list">
  	</div>
  `);


}