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

function safe(field, alternativeField) {
  if (field == 'Other') {
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