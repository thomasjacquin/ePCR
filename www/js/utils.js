var headSurface = {
  0: 9.5,
  1: 8.5,
  5: 6.5,
  10: 5.5,
  15: 4.5,
  adult: 3.5
};

var upperLegSurface = {
  0: 2.75,
  1: 3.25,
  5: 4,
  10: 4.5,
  15: 4.5,
  adult: 4.75
};

var lowerLegSurface = {
  0: 2.5,
  1: 2.5,
  5: 2.75,
  10: 3,
  15: 3.25,
  adult: 3.5
};

function deleteDatebase() {

  db.dropTable('report');
  db.dropTable('vitals');
  db.dropTable('chief_complaint');
  db.dropTable('patient_hx');
  db.dropTable('neuro');
  db.dropTable('abc');
  db.dropTable('trauma');
  db.dropTable('trauma_auto');
  db.dropTable('trauma_fall');
  db.dropTable('trauma_blunt');
  db.dropTable('trauma_fall');
  db.dropTable('trauma_burn');
  db.dropTable('gi_gu');
  db.dropTable('field_delivery');
  db.dropTable('apgar');
  db.dropTable('muscular_skeletal');
  db.dropTable('airway');
  db.dropTable('invasive_airway');
  db.dropTable('ventilator');
  db.dropTable('cpap_bipap');
  db.dropTable('suction');
  db.dropTable('iv_io');
  db.dropTable('splinting');
  db.dropTable('medication');
  db.dropTable('c_spine');
  db.dropTable('in_out');
  db.dropTable('ecg');
  db.dropTable('signatures');
  db.dropTable('call_info');
  db.dropTable('no_transport');
  db.dropTable('narrative');
  db.dropTable('code');
}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

function muscularToString(str){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    var symptoms = [];
    angular.forEach(val, function(symptom, index){
      symptoms.push(symptom);
    });
    stringArray.push(ind + ': ' + symptoms.join(', '));
  });
  return stringArray.join('; ');
}

function TimesToString(str, timesString){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    stringArray.push(timesString[ind] + ': ' + val);
  });
  return stringArray.join('\n');
}

function apgarToString(str){
  str = str == "" ? null : str;
  if (str != null) {
    var obj = JSON.parse(str);
    var sum = 0;
    for (key in obj) {
      sum += parseInt(obj[key]);
    };
    return sum + ' ' + str.replace('{','(').replace('}',')').replace(/"/g,'').replace(/,/g,', ');
  } else
    return "";
}

function JSONtoString(str){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    stringArray.push(val);
  });
  return stringArray.join(', ');
}

function burnsToString(str, body_parts_names, burnDegrees){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    stringArray.push(body_parts_names[ind] + ': ' + burnDegrees[val]);
  });
  return stringArray.join(', ');
}

function gastroPainToString(str, gastroMap){
  var gastro = str.split(',');
  var out = [];
  for (part in gastro){
    out.push(gastroMap[gastro[part]]);
  }
  return out.join(', ');
}

function defined(field){
  return (field != "" && field != 'undefined' && field != undefined && field != null);
}

function safeImage(base64Img){
  if (!defined(base64Img))
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
  else
    return base64Img;
}

function safe(field, alternativeField) {
  
  if (alternativeField && field == 'Other') {
    return alternativeField;
  }
  
  if (alternativeField && field == 'true' && (alternativeField == 'Left' || alternativeField == 'Right')) {
    return alternativeField;
  }
  
  if (!field || field == 'undefined') {
    return ''
  }
  
  if (field == 'true')
    return 'Yes'
    
  if (field == 'false')
    return 'No'
    
  return field;
}