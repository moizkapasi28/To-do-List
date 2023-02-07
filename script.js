let taskList = [];
let task = $("#form3").val()
let id = taskList.length
var index;
var content;
$(document).ready(function () {
  $("#btnsubmit").click(function (e) {
    e.preventDefault();
    let task = $("#form3").val()
    if (validation(task)) {
      let taskItem = {
        id: taskList.length,
        task: task,
      };
      taskList.push(taskItem)
      $("ul").append(`<li
            class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
            <div class="d-flex align-items-center">
              <span class="checked"><input class="form-check-input" id="checkbx" type="checkbox" value="" aria-label="..." /></span>
              ${task}<button class="btnremove"><span class="span">Delete</span></button>
            </div>
          </li>`);
      $("#form3").val("");
    }
  });
  //check event
  $('ul').on('change', '.checked', function (event) {
    if ($(this).attr('checked')) {
      $(this).removeAttr('checked');
    } else {
      $(this).attr('checked', 'checked');
    }
    $(this).parent().toggleClass('completed');
    $("#form3").val("");
    $("#btnedit").hide();
    $("#btnsubmit").show();
  });
  //edit function
  $(document).on('click', 'li', function () {
    index = $('li').index(this)
    content = taskList[index].task;
    $("#form3").val(content)
    $("#btnedit").show();
    $("#btnsubmit").hide();
  });
  $(document).on('click', '#btnedit', function (e) {
    e.preventDefault();
    string = $("#form3").val()
    if (validation(string)) {
      taskList[index].task = string
      document.getElementsByTagName('li')[index].innerHTML = `<div class="d-flex align-items-center">
      <span class="checked"><input class="form-check-input" id="checkbx" type="checkbox"  value="" aria-label="..." /></span>
      ${string}<button class="btnremove"><span class="span">Delete</span></button></div>`;
      $("#form3").val("");
      $("#btnedit").hide();
      $("#btnsubmit").show();
    }
  });
  //delete function
  $('ul').on('click', '.span', function (event) {
    event.stopPropagation();
    index = $('.span').index(this)
    taskList.splice(index, 1)
    $(this).parent().parent().parent().remove();
    $("#form3").val("");
    $("#btnedit").hide();
    $("#btnsubmit").show();
    console.log(taskList)
  });
});

function validation(input) {
  let returnVal = true
  if (input == "") {
    $("#error").css("display", "block");
    $("#error").text("*Input is Empty");
    returnVal = false
  } else {
    $("#error").text("");
  }
  return returnVal
}