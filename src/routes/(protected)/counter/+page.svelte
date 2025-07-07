<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  let intervalId: ReturnType<typeof setInterval> | null = null

  const presetDurations = [
    { label: '1  Minutes', value: 1  },
    { label: '5 Minutes' , value: 5  },
    { label: '10 Minutes', value: 10 },
    { label: '20 Minutes', value: 20 },
  ]

  // States
  let isRunning = $state(false)
  let duration = $state(20)
  let timeLeft = $state(0)
  let progress = $derived(duration > 0 ? ((duration * 60 - timeLeft) / (duration * 60)) * 100 : 0)

  const setDuration = (value: number) => {
    duration = value
    timeLeft = value * 60
  }

  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  function startTimer() {
    isRunning = true

    if (timeLeft <= 0) {
      timeLeft = duration * 60
    }

    intervalId = setInterval(() => {
      timeLeft--

      if (timeLeft <= 0) {
        stopTimer()
        playNotificationSound()
      }
    }, 1000)
  }

  function stopTimer() {
    isRunning = false

    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const resetTimer = () => {
    stopTimer()
    timeLeft = duration * 60
  }

  const toggleTimer = () => {
    if (isRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  }

  const playNotificationSound = () => {
    // Create an audio context and play a beep sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800 // 800 Hz tone
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 1)
    } catch (error) {
      // Fallback: try to play a system beep
      console.log('Timer finished!')

      // Use a notification API here
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Finished!', {
          body: 'Your timer has completed.',
          icon: '/favicon.png'
        })
      }
    }
  }

  onMount(() => {
    timeLeft = duration * 60

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  })

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })
</script>

<div class="container-fluid py-5">
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-8">
      <!-- Header -->
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold text-primary mb-3">Timer Counter</h1>
        <p class="lead text-muted">Choose your duration and start focusing</p>
      </div>

      <!-- Timer Card -->
      <div class="card shadow-lg border-0 mb-4">
        <div class="card-body p-5">
          <!-- Duration Selection -->
          <div class="mb-4">
            <h5 class="card-title mb-3">Select Duration</h5>
            <div class="row g-2 mb-3">
              {#each presetDurations as preset, i}
                <div class="col-3">
                  <button
                    class="btn w-100 h-100 {duration === presetDurations[i].value ? 'btn-primary' : 'btn-outline-primary'}"
                    onclick={() => setDuration(presetDurations[i].value) }
                    disabled={isRunning}
                  >
                    {presetDurations[i].label}
                  </button>
                </div>
              {/each}
            </div>

            <!-- Custom Duration -->
            <div class="row g-2">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Custom duration"
                  bind:value={duration}
                  onkeyup={() => {
                    if (duration < 0) duration = 0
                    if (duration > 120) duration = 120
                    setDuration(duration)
                  }}
                  disabled={isRunning}
                />

                <span class="input-group-text">min</span>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="progress" style="height: 8px;">
              <div
                class="progress-bar bg-primary"
                role="progressbar"
                style="width: {progress}%"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          <!-- Timer Display -->
          <div class="text-center mb-4">
            <button
              class="btn btn-link p-0 text-decoration-none"
              onclick={toggleTimer}
              style="background: none; border: none;"
            >
              <div class="timer-display {isRunning ? 'timer-running' : ''}">
                {formatTime(timeLeft)}
              </div>

              <p class="text-muted mt-2 mb-0">
                {#if timeLeft <= 0 && !isRunning}
                  Time's up! Click to start again
                {:else if isRunning}
                  Click to pause
                {:else}
                  Click to start
                {/if}
              </p>
            </button>
          </div>

          <!-- Control Buttons -->
          <div class="d-flex gap-2 justify-content-center">
            <button class="btn {isRunning ? 'btn-warning' : 'btn-success'} btn-lg px-4" onclick={toggleTimer}>
              {#if isRunning}
                <i class="fa fa-pause" style="padding-right: 5px;"></i>Pause
              {:else}
                <i class="fa fa-play" style="padding-right: 5px;"></i>Start
              {/if}
            </button>

            <button class="btn btn-outline-secondary btn-lg px-4" onclick={resetTimer}>
              Reset <i class="fa fa-refresh" style="padding-left: 5px;"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Timer Stats -->
      <div class="card border-0 bg-light">
        <div class="card-body p-4">
          <div class="row text-center">
            <div class="col-4">
              <div class="text-primary fw-bold fs-4">{duration}</div>
              <small class="text-muted">Minutes Selected</small>
            </div>
            <div class="col-4">
              <div class="text-success fw-bold fs-4">{Math.floor((duration * 60 - timeLeft) / 60)}</div>
              <small class="text-muted">Minutes Elapsed</small>
            </div>
            <div class="col-4">
              <div class="text-warning fw-bold fs-4">{Math.ceil(timeLeft / 60)}</div>
              <small class="text-muted">Minutes Remaining</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .timer-display {
    font-size: 4rem;
    font-weight: 700;
    color: #0d6efd;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    user-select: none;
  }

  .timer-display:hover {
    transform: scale(1.05);
    color: #0b5ed7;
  }

  .timer-running {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  .card {
    border-radius: 1rem;
  }

  .btn {
    border-radius: 0.5rem;
    font-weight: 500;
  }

  .progress {
    border-radius: 1rem;
  }

  .progress-bar {
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .timer-display {
      font-size: 3rem;
    }

    .container-fluid {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>