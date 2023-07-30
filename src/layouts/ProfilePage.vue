<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App PyShop </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md">
        <div v-if="!isAuth" class="absolute-center" style="max-width: 400px">
          Необходима авторизация
          <br />
          <q-btn
            label="Авторизация"
            color="primary"
            class="q-ml-sm"
            to="/login"
          />
        </div>
        <div v-else class="absolute-center" style="max-width: 400px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled v-model="name" label="Имя" />
            <q-input filled v-model="telNumber" label="Номер телефона" />
            <q-input filled v-model="address" label="Адрес" />
            <q-input
              filled
              v-model="info"
              label="Информация о себе"
              type="textarea"
            />

            <div>
              <q-btn
                label="Обновить информацию"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Выход"
                color="primary"
                @click="logOut"
                class="q-ml-sm"
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
import { useQuasar } from 'quasar';
import { getRequest, postRequest } from '../plugins/api';
export default {
  data() {
    return {
      isAuth: false,
      jwt: localStorage.getItem('jwt'),
      name: '',
      info: '',
      telNumber: '',
      address: '',
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
      postRequest(`${import.meta.env.VITE_HOST}/user/updateInfo`, {
        id: 4,
        name: this.name,
        info: this.info,
        telNumber: this.telNumber,
        address: this.address,
      }).then((res) => {
        console.log(res);
        // localStorage.setItem('jwt', res.data.jwt);
        // localStorage.setItem('username', res.data.name);
        // localStorage.setItem('id', res.data.id);
        // window.dispatchEvent(new CustomEvent('login'));
      });
    },

    logOut: function () {
      console.log('вышел');
      this.$q.cookies.remove('JWT');
      this.$router.push('/login');
    },
  },
  beforeCreate() {
    getRequest(`${import.meta.env.VITE_HOST}/user/4`).then((res) => {
      console.log(res);
      this.name = res.data.name;
      this.info = res.data.info;
      this.telNumber = res.data.telNumber;
      this.address = res.data.address;
    });
  },
  mounted() {
    if (this.$q.cookies.get('JWT')) {
      console.log('cookied');
      this.isAuth = true;
    }
    console.log(this.isAuth);
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();
  },
};
</script>
