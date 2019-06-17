// Get references to page elements
var $name = $('#formName');
var $address = $('#formAddress');
var $submitBtn = $('#submit');
var $time = $('#formTime');
var $image = $('#formImage');

var $testList = $('#testList');

// The API object contains methods for each kind of request we'll make
var API = {
  saveGarageSale: function(garagesale) {
    console.log('attempting to post data');
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/garagesale/',
      data: JSON.stringify(garagesale)
    });
  },
  getGarageSales: function() {
    return $.ajax({
      url: 'api/garagesale/',
      type: 'GET'
    });
  },
  deleteGarageSale: function(id) {
    return $.ajax({
      url: 'api/garagesale/' + id,
      type: 'DELETE'
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getGarageSales().then(function(data) {
    var $Sales = data.map(function(garagesale) {
      var $a = $('<a>')
        .text(garagesale.text)
        .attr('href', '/garagesale/' + garagesale.id);

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': garagesale.id
        })
        .append($a);

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $testList.empty();
    $testList.append($Sales);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log('Submit button was clicked');
  var allVals = [];

  $('#category-input :checked').each(function() {
    allVals.push($(this).val());
  });

  var formData = {
    name: $name.val().trim(),
    address: $address.val().trim(),
    time: $time.val().trim(),
    categories: allVals.join(', '),
    image: $image.val().trim()
  };
  console.log(formData);
  if (
    !(
      formData.name &&
      formData.address &&
      formData.time && //&& formData.categories
      formData.image
    )
  ) {
    alert('You must enter information for all parts of the form!');
    return;
  }

  API.saveGarageSale(formData).then(function() {
    console.log('posted successfully? Time to Get');
    refreshExamples();
  });

  //$exampleText.val("");
  //$exampleDescription.val("");

  //clear form
  $('.form-group input').val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  console.log('deleting ....***********');

  var idToDelete = $(event.target)
    .closest('.garage-sale-item')
    .attr('data-id');

  API.deleteGarageSale(idToDelete).then(function() {
    refreshExamples();
  });

  $(event.target)
    .closest('.garage-sale-item')
    .remove();
};

//Edit Button to change things about your garage sale
// var handleEditBtnClick = function() {
//   console.log('Time to Edit ....***********');

//   var idToEdit = $(event.target)
//     .closest('.list-group-item')
//     .attr('data-id');

//   window.location.href = '/post/' + idToEdit.id;
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$('.garage-group').on('click', '.delete', handleDeleteBtnClick);
//Edit button attempt
//$('.list-group').on('click', '.edit', handleEditBtnClick);
