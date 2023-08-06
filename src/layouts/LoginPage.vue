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
              :rules="[(val) => !!val || 'Введите email', isValidEmail]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="password"
              lazy-rules
              :rules="loginRules"
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
        console.log(res);
        console.log('logged');
        this.$q.cookies.set('JWT', res.data.access_token, {
          expires: res.data.expiresIn,
        });
        this.$q.cookies.set('id', res.data.id);
        console.log(this.$q.cookies.getAll());
        this.$router.replace('/profile');
      });
    },
    isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || 'Неправильный email';
    },
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();
    console.log($q.cookies.getAll());
  },
};
</script>
