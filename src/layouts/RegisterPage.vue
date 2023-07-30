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
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="password"
              lazy-rules
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
      jwt: localStorage.getItem('jwt'),
      show1: false,
      show2: true,
      regCheck: false,
      username: '',
      email: '',
      password: '',
      loginRules: [
        (value: string) => {
          if (value?.length > 0) return true;
          return 'Поле не должно быть пустым';
        },
      ],
    };
  },
  methods: {
    onSubmit: function () {
      postRequest(`${import.meta.env.VITE_HOST}/auth/signup`, {
        email: this.email,
        password: this.password,
      }).then((res) => {
        console.log(res);
        // localStorage.setItem('jwt', res.data.jwt);
        // localStorage.setItem('username', res.data.name);
        // localStorage.setItem('id', res.data.id);
        // window.dispatchEvent(new CustomEvent('login'));
      });
    },
  },
};
</script>
