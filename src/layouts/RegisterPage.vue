<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App PyShop Регистрация</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md">
        <div class="absolute-center" style="max-width: 400px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="email"
              lazy-rules
              :rules="[(val) => !!val || 'Введите email', isValidEmail]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="password"
              lazy-rules
              :rules="[(val) => !!val || 'Введите пароль', isValidPassword]"
            />

            <div>
              <q-btn label="Регистрация" type="submit" color="primary" />
              <q-btn
                label="Войти"
                color="primary"
                flat
                class="q-ml-sm"
                to="/login"
              />
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { postRequest } from '../plugins/api';
export default {
  data() {
    return {
      email: '',
      password: '',
      validInput: false,
    };
  },
  methods: {
    onSubmit: function () {
      postRequest(`${import.meta.env.VITE_HOST}/auth/signup`, {
        email: this.email,
        password: this.password,
      }).then((res) => {
        console.log(res);
      });
    },
    isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || 'Неправильный email';
    },
    isValidPassword() {
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
      return passwordPattern.test(this.password) || 'Слабый пароль';
    },
  },
};
</script>
