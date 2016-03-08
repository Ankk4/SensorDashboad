var data = {
  // A labels array that can contain any sort of values
  labels: [   '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'
  			, '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
  			, '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  			, '22:00', '23:00'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [0, 1, 2, 4, 5,6,7,8,9,10,11,12,13,14,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
  ]
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line('.temp-chart', data);

console.log("data: ", sensors);