<script lang="ts">
  import { enhance } from "$app/forms"
  import {
    validateFullname,
    validatePassword,
    validateConfirmPassword,
    validateEmailForRegister,
  } from "../validate"

  import AuthInput from "$lib/components/auth-input.svelte"

  let { form } = $props()

  let fullName = $state('')
  let fullNameError = $state('')

  let email = $state('')
  let emailError = $state('')

  let password = $state('')
  let passwordError = $state('')

  let rePassword = $state('')
  let rePasswordError = $state('')

  let submitting = $state(false)
</script>

<h4>New here?</h4>
<h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
<form class="pt-3" method="POST" action="?/register" use:enhance={async ({cancel}) => {
  // `formElement` is this `<form>` element
  // `formData` is its `FormData` object that's about to be submitted
  // `action` is the URL to which the form is posted
  // calling `cancel()` will prevent the submission
  // `submitter` is the `HTMLElement` that caused the form to be submitted
  submitting = true

  emailError = await validateEmailForRegister(email)
  fullNameError = validateFullname(fullName)
  passwordError = validatePassword(password)
  rePasswordError = validateConfirmPassword(rePassword, password)

  if (emailError || fullNameError || passwordError || rePasswordError) {
    submitting = false
    cancel()
    return
  }

  return async ({ result, update }) => {
    // `result` is an `ActionResult` object
    // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
    await update()
    submitting = false
  }
}}>
  <div class="form-group">
    <AuthInput
      id="fullName"
      name="fullName"
      type="text"
      placeholder="Full Name"
      classes={['form-control', 'form-control-lg']}
      disabled={submitting}
      bind:value={fullName}
      error={fullNameError}
      onblur={() => { fullNameError = validateFullname(fullName) }}
      onfocus={() => fullNameError = ''}
    />
  </div>
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
      onblur={async () => { emailError = await validateEmailForRegister(email) }}
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
      onfocus={() => {
        passwordError = ''
        rePasswordError
      }}
    />
  </div>
  <div class="form-group">
    <AuthInput
      id="rePassword"
      name="rePassword"
      type="password"
      placeholder="Confirm Password"
      classes={['form-control', 'form-control-lg']}
      disabled={submitting}
      bind:value={rePassword}
      error={rePasswordError}
      onblur={() => { rePasswordError = validateConfirmPassword(rePassword, password) }}
      onfocus={() => rePasswordError = ''}
    />
  </div>
  <div class="mb-4">
    <div class="form-check">
      <!-- <label class="form-check-label text-muted">
        <input type="checkbox" class="form-check-input">I agree to all Terms & Conditions
      </label> -->
      {#if form?.error?.message}
        <span class="invalid-feedback d-block text-center w-100">{form?.error?.message}</span>
      {/if}
    </div>
  </div>
  <div class="mt-3 d-grid gap-2">
    <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" disabled={submitting}>
      {#if submitting}
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {:else}
        SIGN UP
      {/if}
    </button>
  </div>
  <div class="text-center mt-4 font-weight-light"> Already have an account? <a href="/auth/login" class="text-primary">Login</a>
  </div>
</form>
