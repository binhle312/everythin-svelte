<script lang="ts">
  import { enhance } from "$app/forms"
  import { validateEmail, validatePassword } from "../validate"

  import AuthInput from "$lib/components/auth-input.svelte"

  let { form } = $props()

  let email = $state('')
  let emailError = $state('')

  let password = $state('')
  let passwordError = $state('')

  let submitting = $state(false)
</script>

<h4>Hello! let's get started</h4>
<h6 class="font-weight-light">Sign in to continue.</h6>
<form class="pt-3">
  <div class="form-group">
    <AuthInput
      id="email"
      name="email"
      type="text"
      placeholder="everythin@example.com"
      classes={['form-control', 'form-control-lg']}
      disabled={submitting}
      bind:value={email}
      error={emailError}
      onblur={async () => { emailError = validateEmail(email) }}
      onfocus={() => { emailError = '' }}
    />
  </div>
  <div class="form-group">
    <AuthInput
      id="password"
      name="password"
      type="password"
      placeholder="Password"
      classes={['form-control', 'form-control-lg']}
      disabled={submitting}
      bind:value={password}
      error={passwordError}
      onblur={() => { passwordError = validatePassword(password) }}
      onfocus={() => { passwordError = '' }}
    />
  </div>
  <div class="mt-3 d-grid gap-2">
    <a class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" href="/auth/register">SIGN IN</a>
  </div>
  <div class="my-2 d-flex justify-content-between align-items-center">
    <div class="form-check">
      <label class="form-check-label text-muted">
        <input type="checkbox" class="form-check-input"> Keep me signed in </label>
    </div>
    <a href="#" class="auth-link text-primary" aria-disabled="true" >Forgot password?</a>
  </div>
  <div class="mb-2 d-grid gap-2">
    <button type="button" class="btn btn-block btn-facebook auth-form-btn">
      <i class="mdi mdi-facebook me-2"></i>Connect using facebook </button>
  </div>
  <div class="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" class="text-primary">Create</a>
  </div>
</form>