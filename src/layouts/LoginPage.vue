<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App PyShop Вход</q-toolbar-title>

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
              <q-btn label="Войти" type="submit" color="primary" />
              <q-btn
                label="Регистрация"
                color="primary"
                flat
                class="q-ml-sm"
                to="/register"
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
import { useQuasar } from 'quasar';
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
      postRequest('http://localhost:3000/auth/signin', {
        email: this.email,
        password: this.password,
      }).then((res) => {
        console.log(res.data);
        console.log(this.$q);
        // $q.cookies.set('JWT', '');
        this.$q.cookies.set('JWT', res.data.access_token, { expires: '60s' });
        this.$router.push('/profile');
        // localStorage.setItem('jwt', res.data.jwt);
        // localStorage.setItem('username', res.data.name);
        // localStorage.setItem('id', res.data.id);
        // window.dispatchEvent(new CustomEvent('login'));
      });
    },
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();
  },
};
</script>
