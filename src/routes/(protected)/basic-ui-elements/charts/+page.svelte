<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // Load Chart.js if not already loaded
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = initializeCharts;
      document.head.appendChild(script);
    } else {
      initializeCharts();
    }
  });

  function initializeCharts() {
    // Line Chart
    if (document.getElementById('lineChart')) {
      const lineCtx = document.getElementById('lineChart').getContext('2d');
      new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ["2013", "2014", "2015", "2016", "2017", "2018"],
          datasets: [{
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: '#587ce4',
            backgroundColor: 'rgba(88, 124, 228, 0.1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Bar Chart
    if (document.getElementById('barChart')) {
      const barCtx = document.getElementById('barChart').getContext('2d');
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Area Chart
    if (document.getElementById('areaChart')) {
      const areaCtx = document.getElementById('areaChart').getContext('2d');
      new Chart(areaCtx, {
        type: 'line',
        data: {
          labels: ["2013", "2014", "2015", "2016", "2017"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          elements: {
            line: {
              tension: 0.4
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Doughnut Chart
    if (document.getElementById('doughnutChart')) {
      const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
      new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pink', 'Blue', 'Yellow'],
          datasets: [{
            data: [30, 40, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }

    // Pie Chart
    if (document.getElementById('pieChart')) {
      const pieCtx = document.getElementById('pieChart').getContext('2d');
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            data: [30, 50, 20],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }

    // Scatter Chart
    if (document.getElementById('scatterChart')) {
      const scatterCtx = document.getElementById('scatterChart').getContext('2d');
      new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Scatter Dataset',
            data: [
              { x: -10, y: 0 },
              { x: 0, y: 10 },
              { x: 10, y: 5 },
              { x: 0.5, y: 5.5 }
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
</script>

<div class="row">
  <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Line chart</h4>
        <canvas id="lineChart"></canvas>
      </div>
    </div>
  </div>
  <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Bar chart</h4>
        <canvas id="barChart"></canvas>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Area chart</h4>
        <canvas id="areaChart"></canvas>
      </div>
    </div>
  </div>
  <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Doughnut chart</h4>
        <div class="doughnutjs-wrapper d-flex justify-content-center">
          <canvas id="doughnutChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Pie chart</h4>
        <div class="doughnutjs-wrapper d-flex justify-content-center">
          <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Scatter chart</h4>
        <canvas id="scatterChart" style="height:250px"></canvas>
      </div>
    </div>
  </div>
</div>
