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
<form class="pt-3" method="POST" use:enhance={async ({formData, cancel}) => {
  submitting = true

  emailError = validateEmail(email)
  passwordError = validatePassword(password)

  if (emailError || passwordError) {
    submitting = false
    cancel()
    return
  }

  return async ({ update }) => {
    await update()
    submitting = false
  }
}}>
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
  {#if form?.error?.message}
    <div class="form-group" role="alert">
      <span class="invalid-feedback d-block text-center w-100">{form?.error?.message}</span>
    </div>
  {/if}
  <div class="mt-3 d-grid gap-2">
    <button type="submit" disabled={submitting} class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
      {#if submitting}
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {:else}
        SIGN IN
      {/if}
    </button>
  </div>
  <div class="my-2 d-flex justify-content-between align-items-center">
    <div class="form-check">
      <label class="form-check-label text-muted">
        <input type="checkbox" id="rememberMe" name="rememberMe" class="form-check-input"> Keep me signed in </label>
    </div>
    <a href="#" class="auth-link text-primary" onclick={(event) => event.preventDefault()}>Forgot password?</a>
  </div>
  <!-- <div class="mb-2 d-grid gap-2">
    <button type="button" class="btn btn-block btn-facebook auth-form-btn">
      <i class="mdi mdi-facebook me-2"></i>Connect using facebook </button>
  </div> -->
  <div class="text-center mt-4 font-weight-light"> Don't have an account? <a href="/auth/register" class="text-primary">Create</a>
  </div>
</form>
