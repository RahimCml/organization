<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      confirmPasswordDirty: false,
      loading: false,
      validationRules: {
        name: [
          'name',
          {
            rules: [
              { required: true, message: 'Your name is required.' },
              { min: 2, message: 'Name should have a minimum length of 2 characters.\n' },
              { max: 64, message: 'Name should have a maximum length of 64 characters.\n' },
            ],
          },
        ],
        email: [
          'email',
          {
            rules: [
              { type: 'email', message: 'E-mail is not valid.' },
              { required: true, message: 'E-mail is required.' },
            ],
            normalize: value => value?.toLowerCase(),
          },
        ],
        password: [
          'password',
          {
            rules: [
              { required: true, message: 'Password is required.' },
              { min: 8, message: 'Password should have a minimum length of 8 characters.\n' },
              {
                pattern: /[a-zA-Z]/,
                message: 'Password should include at least one letter.\n',
              },
              { pattern: /\d/, message: 'Password should include at least one digit.\n' },
              { pattern: /[\W_]/, message: 'Password should include at least one symbol.\n' },
              { pattern: /^\S+$/, message: 'Password should not include spaces.\n' },
              { validator: this.validateToNextPassword },
            ],
          },
        ],
        passwordConfirmation: [
          'passwordConfirmation',
          {
            rules: [
              { required: true, message: 'Password confirmation is required.' },
              { validator: this.compareToFirstPassword },
            ],
          },
        ],
      },
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['registerUser', 'registerSuperAdmin', 'registerOrganizationAdmin']),
    registerForUser() {
        this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return
        this.loading = true
        try {
          await this.registerUser(values)
          this.$router.push('/login?registerSuccess=1')
        } catch (e){
          console.log('error', e)
        }
      })
    },
    registerForSuperAdmin() {
        this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return
        this.loading = true
        try {
          await this.registerSuperAdmin(values)
          this.$router.push('/login?registerSuccess=1')
        } catch (e){
          console.log('error', e)
        }
      })
    },
    registerForOrganizationAdmin() {
        this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return
        this.loading = true
        try {
          await this.registerOrganizationAdmin(values)
          this.$router.push('/login?registerSuccess=1')
        } catch (e){
          console.log('error', e)
        }
      })
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmPasswordDirty) {
        form.validateFields(['confirmPassword'], { force: true })
      }
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('The passwords you entered are inconsistent.')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      console.log('handleConfirmBlur', value)
      this.confirmPasswordDirty = this.confirmPasswordDirty || !!value
    },
    onValuesChange() {
      this.backendError = null
    },
  },
  beforeCreate() {
    const component = this
    this.form = this.$form.createForm(this, {
      name: 'register',
      onValuesChange() {
        component.backendError = null
      },
    })
  },
}
</script>

<template lang="pug">
.register
  a-card
    a-form(:form="form")
      h1 Create an account
      a-form-item(label="Name" )
        a-input(placeholder="Your name" v-decorator="validationRules.name")
      a-form-item(label="Email address" )
        a-input(placeholder="Your email" v-decorator='validationRules.email')
      a-form-item(label="Password" )
        a-input(type="password" placeholder="Your password" v-decorator="validationRules.password")
      a-form-item(label="Confirm password" )
        a-input(type="password" placeholder="Your password again" v-decorator="validationRules.passwordConfirmation" @blur="handleConfirmBlur")
      a-form-item(v-if="backendError")
        a-alert(class="backend-errors" :message="backendError.message" type="error")
      a-form-item()
        a-button(type="primary" v-on:click="registerForSuperAdmin") Register Super Admin
        a-button(type="primary" v-on:click="registerForOrganizationAdmin") Register Organization Admin
        a-button(type="primary" v-on:click="registerForUser") Register User
</template>

<style lang="scss">
.ant-form-explain {
  white-space: pre-line;
}
</style>
<style lang="scss" scoped>
.backend-errors {
  white-space: pre-line;
}
</style>
