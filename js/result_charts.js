$(document).ready(function() {
  data_strength = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
    datasets: [{
      data: [2, 2, 5, 11, 14, 40],
      backgroundColor: 'rgba(244, 65, 65, 0.7)',
      pointBackgroundColor: 'rgb(255, 0, 0)',
      pointRadius: 4
    }]
  };

  options_strength_chart = {
    //responsive: true,
    //maintainAspectRatio: false,
    legend: {
        display: false
    },
    fill: true,
  };

  let strenght_chart = document.getElementById('strength_chart').getContext('2d');
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#141313';
  Chart.defaults.global.defaultFontStyle = 'bold';

  let sc = new Chart(strenght_chart, {
    type: 'line',
    data: data_strength,
    options: options_strength_chart
  });
});
