$(document).ready(function(){

  //Form filter events
  $("#filter").change(function() {
    var select = $(this).val();
    // console.log((this));
    switch (select) {
      case 'Teacher':
      $('#filter-teacher').show();
      $('#teacher-form').show();
      $('.submit_button').show();
      $('#volunteer-form').hide();
      $('#intern-form').hide();
      $('#filter-intern').hide();
      $('#filter-volunteer').hide();
      break;
      case 'Volunteer':
      $('#filter-volunteer').show();
      $('#volunteer-form').show();
      $('.submit_button').show();
      $('#teacher-form').hide();
      $('#intern-form').hide();
      $('#filter-teacher').hide();
      $('#filter-intern').hide();
      break;
      case 'Intern':
      $('#filter-intern').show();
      $('#intern-form').show();
      $('.submit_button').show();
      $('#volunteer-form').hide();
      $('#teacher-form').hide();
      $('#filter-volunteer').hide();
      $('#filter-teacher').hide();
      break;
      default:
      $('#volunteer-form').hide();
      $('#teacher-form').hide();
      $('#intern-form').hide();
      $('.submit_button').hide();
      $('#filter-volunteer').hide();
      $('#filter-teacher').hide();
      $('#filter-intern').hide();
      break;
    }
  });



  //Datepicker events
  $(document).on('focus',".calendar",function(){
      $(".calendar").datepicker({
      format: "dd/mm/yyyy",
      startDate: "today",
      todayHighlight: true,
       todayBtn: "linked"
      })
    }
  );

  $('.dob').prop('disabled',false);
  $('#dob-picker').on('changeDate',()=>{
    var a = $('#dob-picker').val();
    if((a).length > 0){
      $('#age').prop('disabled',true);
    }
    else {
      $('.dob').prop('disabled',false);
    }
  })
  $('.dob').change(()=>{
    $('.dob').prop('disabled',false);
    var a = $('#dob-picker').val();
    var b = $('#age').val();
    if((b).length > 0){
      $('#dob-picker').prop('disabled',true);
    }
    if((a).length > 0){
      $('#age').prop('disabled',true);
    }
  })



  //Enrollment events
  $('#enrolled').on('change',()=>{
    switch($(this)[0].activeElement.value){
      case 'yes':
      $('#current-enrolled').show();
      break;
      case 'no':
      $('#current-enrolled').hide();
      break;
      default:
      $('#current-enrolled').hide();
      break;
    }
  });


  //Taught before events
  $('#taught').on('change',()=>{
    switch($(this)[0].activeElement.value){
      case 'yes':
      $('#taught-before').show();
      $('#place-teach').show();
      break;
      case 'no':
      $('#taught-before').hide();
      $('#place-teach').hide();
      break;
      default:
      $('#taught-before').hide();
      $('#place-teach').hide();
      break;
    }
  });


  //Availability period events
  var period = 1;
  $('.add-period').on('click',()=>{
    var content = `<div id = 'period-${++period}' class='container row'><div class='col-md-4 col-sm-12 from-div'>  \
      <input  type='text' name='from-${period}' class='form-control calendar from'>\
    </div>\
    <div class='col-md-2 col-sm-12 to-text' style='text-align:center'>to</div>\
    <div class='col-md-4 col-sm-12 to-div'>\
      <input type='text' name='to-${period}' class='form-control calendar to'>\
    </div>\
    <button type='button' name='add-period' id = 'remove-period-${period}' class='btn btn-sm btn-primary col-md-1 remove-period'>Remove</button></div>`;
    $('#available-period').append(content);
  })

  $(document).on('click',".remove-period",()=>{
     id = $(this)[0].activeElement.id.split('-')[2];
     $("#period-"+id).remove();
  })


  //Geographical area events

  var states = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman & Diu','Delhi', 'Lakshadweep','Puducherry'];
  states.sort();

  var schools = {};
  schools['Delhi'] = "Central pahar ganj|Central-chandni chawk|Central-Karol Bagh|East-noida|East-karkardooma|East-Shahdara|East-Mayurpar|North-Netaji Subhash marg|North-Rohini sector 16|North-Shalimar bagh|North-Azadpur|North-Mongolpuri/Sultanpur|";

  function populateSchools(citiesElement,schoolsElement){
    var selectedCity = $(citiesElement)[0].value;
    var schoolsElement = document.getElementById(schoolsElement);
    schoolsElement.length = 0;
    schoolsElement.options[0] = new Option('Select City', '');
    schoolsElement.selectedIndex = 0;
    var schools_arr = schools[selectedCity].split("|");
    for (var i = 0; i < schools_arr.length; i++) {
         if(schools_arr[i]!="")
          schoolsElement.options[schoolsElement.length] = new Option(schools_arr[i], schools_arr[i]);
    }
  }

  function populateCities(statesElement,citiesElement,schoolsElement){
   var selectedState = $(statesElement)[0].value;
   var citiesElement = document.getElementById(citiesElement);
   citiesElement.length = 0;
   citiesElement.options[0] = new Option('Select City', '');
   citiesElement.selectedIndex = 0;
   var cities_arr = cities[selectedState].split("|");
   for (var i = 0; i < cities_arr.length; i++) {
        if(cities_arr[i]!="")
         citiesElement.options[citiesElement.length] = new Option(cities_arr[i], cities_arr[i]);
   }
   if(schoolsElement){
     citiesElement.onchange = function(){
       populateSchools(citiesElement,schoolsElement);
     }
   }
  }

  var cities = {};
  function getJSON(){
     return $.getJSON('js/cities.json');
  }
  getJSON().done((json)=>{
    for(var i =0; i < states.length; i++){
      cities[states[i]] = "";
      for (var j = 0; j < json.length; j++) {
          if(json[j]!=undefined && json[j].state == states[i])
            cities[states[i]] += (json[j].name+"|");
      }
    }
  });

  function populateStates(statesElement,citiesElement,schoolsElement){
    var statesElement = document.getElementById(statesElement);
    statesElement.length = 0;
    statesElement.options[0] = new Option('Select State', '-1');
    statesElement.selectedIndex = 0;
    for (var i = 0; i < states.length; i++)
         statesElement.options[statesElement.length] = new Option(states[i], states[i]);
    if(citiesElement){
      statesElement.onchange = function(){
        populateCities(statesElement,citiesElement,schoolsElement);
      }
    }
  }
  populateStates("volunteer-states","volunteer-cities","volunteer-schools");
  populateStates("intern-states","intern-cities","intern-schools");
  populateStates("teacher-states","teacher-cities","teacher-schools");

  $.fn.serializeObject = function()
  {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };


  $('form').on('submit',function(event){
    event.preventDefault();
    // event.stopPropagation();
    var $theForm = $(this);
    var data = $theForm.serializeObject();
    var realData = {};
    realData["TableName"] = "jsonData";
    realData["Item"] = data;
    $.ajax({
           method: 'POST',
           url:  "https://pi317tosjb.execute-api.ap-south-1.amazonaws.com/exampleapi/formData",
           data: JSON.stringify(realData),
           dataType: 'json',
           success: function(data) {
             location.href = "success.html";
           },
           error : function(){
             location.href = "failure.html";
           }
    });
  })
});
