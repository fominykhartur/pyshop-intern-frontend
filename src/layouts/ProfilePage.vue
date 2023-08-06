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
      id: 0,
      name: '',
      info: '',
      telNumber: '',
      address: '',
    };
  },
  methods: {
    onSubmit: function () {
      postRequest(`${import.meta.env.VITE_HOST}/user/updateInfo`, {
        id: this.id,
        name: this.name,
        info: this.info,
        telNumber: this.telNumber,
        address: this.address,
      }).then((res) => {
        console.log(res);
      });
    },

    logOut: function () {
      console.log('вышел');
      this.$q.cookies.remove('JWT');
      this.$q.cookies.remove('id');
      this.$router.push('/login');
    },
  },
  beforeMount() {
    this.id = parseInt(this.$q.cookies.get('id'));
    getRequest(`${import.meta.env.VITE_HOST}/user/${this.id}`).then((res) => {
      console.log(res);
      this.name = res.data.name;
      this.info = res.data.info;
      this.telNumber = res.data.telNumber;
      this.address = res.data.address;
      if (this.$q.cookies.has('JWT')) {
        console.log('cookied');
        this.isAuth = true;
      }
    });
  },
  // beforeMount() {
  // },
  mounted() {
    console.log(this.isAuth);
    console.log(this.id);
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();
  },
};
</script>
