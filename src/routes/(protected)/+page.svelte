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
    // Visit and Sales Statistics Chart (Line Chart)
    if (document.getElementById('visit-sale-chart')) {
      const visitSaleCtx = document.getElementById('visit-sale-chart').getContext('2d');
      new Chart(visitSaleCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales',
            data: [40, 39, 10, 40, 39, 80, 40, 20, 12, 11, 60, 55],
            borderColor: '#587ce4',
            backgroundColor: 'rgba(88, 124, 228, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }, {
            label: 'Visits',
            data: [30, 25, 16, 30, 25, 60, 30, 15, 8, 7, 40, 35],
            borderColor: '#ede190',
            backgroundColor: 'rgba(237, 225, 144, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2.5,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: false // We'll use the custom legend div
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                borderDash: [2, 2]
              }
            }
          }
        }
      });

      // Custom legend for visit-sale-chart
      const legendContainer = document.getElementById('visit-sale-chart-legend');
      if (legendContainer) {
        legendContainer.innerHTML = `
          <div class="d-flex">
            <div class="me-3">
              <span class="legend-dots" style="background: #587ce4;"></span>
              <span class="legend-text">Sales</span>
            </div>
            <div>
              <span class="legend-dots" style="background: #ede190;"></span>
              <span class="legend-text">Visits</span>
            </div>
          </div>
        `;
      }
    }

    // Traffic Sources Chart (Doughnut Chart)
    if (document.getElementById('traffic-chart')) {
      const trafficCtx = document.getElementById('traffic-chart').getContext('2d');
      new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
          labels: ['Search Engines', 'Direct Click', 'Bookmarks Click', 'Other'],
          datasets: [{
            data: [40, 35, 15, 10],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          cutout: '60%',
          plugins: {
            legend: {
              display: false // We'll use the custom legend div
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });

      // Custom legend for traffic-chart
      const trafficLegendContainer = document.getElementById('traffic-chart-legend');
      if (trafficLegendContainer) {
        trafficLegendContainer.innerHTML = `
          <div class="legend-item">
            <span class="legend-dots" style="background: rgba(255, 99, 132, 0.8);"></span>
            <span class="legend-text">Search Engines (40%)</span>
          </div>
          <div class="legend-item">
            <span class="legend-dots" style="background: rgba(54, 162, 235, 0.8);"></span>
            <span class="legend-text">Direct Click (35%)</span>
          </div>
          <div class="legend-item">
            <span class="legend-dots" style="background: rgba(255, 206, 86, 0.8);"></span>
            <span class="legend-text">Bookmarks Click (15%)</span>
          </div>
          <div class="legend-item">
            <span class="legend-dots" style="background: rgba(75, 192, 192, 0.8);"></span>
            <span class="legend-text">Other (10%)</span>
          </div>
        `;
      }
    }
  }
</script>

<style>
  .legend-dots {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .legend-text {
    font-size: 14px;
    color: #6c7293;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .legend-item:last-child {
    margin-bottom: 0;
  }
</style>

<div class="row">
  <div class="col-md-4 stretch-card grid-margin">
    <div class="card bg-gradient-danger card-img-holder text-white">
      <div class="card-body">
        <img src="/images/dashboard/circle.svg" class="card-img-absolute" alt="circle" />
        <h4 class="font-weight-normal mb-3">Weekly Sales <i class="mdi mdi-chart-line mdi-24px float-end"></i>
        </h4>
        <h2 class="mb-5">$ 15,0000</h2>
        <h6 class="card-text">Increased by 60%</h6>
      </div>
    </div>
  </div>
  <div class="col-md-4 stretch-card grid-margin">
    <div class="card bg-gradient-info card-img-holder text-white">
      <div class="card-body">
        <img src="/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
        <h4 class="font-weight-normal mb-3">Weekly Orders <i class="mdi mdi-bookmark-outline mdi-24px float-end"></i>
        </h4>
        <h2 class="mb-5">45,6334</h2>
        <h6 class="card-text">Decreased by 10%</h6>
      </div>
    </div>
  </div>
  <div class="col-md-4 stretch-card grid-margin">
    <div class="card bg-gradient-success card-img-holder text-white">
      <div class="card-body">
        <img src="/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
        <h4 class="font-weight-normal mb-3">Visitors Online <i class="mdi mdi-diamond mdi-24px float-end"></i>
        </h4>
        <h2 class="mb-5">95,5741</h2>
        <h6 class="card-text">Increased by 5%</h6>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-7 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="clearfix">
          <h4 class="card-title float-start">Visit And Sales Statistics</h4>
          <div id="visit-sale-chart-legend" class="rounded-legend legend-horizontal legend-top-right float-end"></div>
        </div>
        <canvas id="visit-sale-chart" class="mt-4"></canvas>
      </div>
    </div>
  </div>
  <div class="col-md-5 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Traffic Sources</h4>
        <div class="doughnutjs-wrapper d-flex justify-content-center">
          <canvas id="traffic-chart"></canvas>
        </div>
        <div id="traffic-chart-legend" class="rounded-legend legend-vertical legend-bottom-left pt-4"></div>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Recent Tickets</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th> Assignee </th>
                <th> Subject </th>
                <th> Status </th>
                <th> Last Update </th>
                <th> Tracking ID </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="/images/faces/face1.jpg" class="me-2" alt="image"> David Grey
                </td>
                <td> Fund is not recieved </td>
                <td>
                  <label class="badge badge-gradient-success">DONE</label>
                </td>
                <td> Dec 5, 2017 </td>
                <td> WD-12345 </td>
              </tr>
              <tr>
                <td>
                  <img src="/images/faces/face2.jpg" class="me-2" alt="image"> Stella Johnson
                </td>
                <td> High loading time </td>
                <td>
                  <label class="badge badge-gradient-warning">PROGRESS</label>
                </td>
                <td> Dec 12, 2017 </td>
                <td> WD-12346 </td>
              </tr>
              <tr>
                <td>
                  <img src="/images/faces/face3.jpg" class="me-2" alt="image"> Marina Michel
                </td>
                <td> Website down for one week </td>
                <td>
                  <label class="badge badge-gradient-info">ON HOLD</label>
                </td>
                <td> Dec 16, 2017 </td>
                <td> WD-12347 </td>
              </tr>
              <tr>
                <td>
                  <img src="/images/faces/face4.jpg" class="me-2" alt="image"> John Doe
                </td>
                <td> Loosing control on server </td>
                <td>
                  <label class="badge badge-gradient-danger">REJECTED</label>
                </td>
                <td> Dec 3, 2017 </td>
                <td> WD-12348 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
