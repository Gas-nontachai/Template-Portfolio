<script setup lang="ts">
import Swal from "sweetalert2"
import defaultUserImage from "@/assets/images/default-user.png"
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { public: publicCtx } = useRuntimeConfig()
const { getUserBy } = useUser();

const { $auth } = useNuxtApp();

const { changePassword, } = useAuth();

const submitting = ref(false)
const password_dialog = ref(false);
const current_password = ref('')
const new_password = ref('')
const confirm_password = ref('')

async function onSubmit() {
  try {
    if (submitting.value || !validatePassword()) return
    submitting.value = true

    const { error } = await changePassword({
      current_password: current_password.value,
      new_password: new_password.value,
    });

    if (error) {
      Swal.fire({ title: t('alert.mistake'), text: error.message, icon: "error" })
    } else {
      Swal.fire({ title: t('alert.success'), text: t('msg.data_save'), icon: "success" })

      closeDialog()
    }

    submitting.value = false
  } catch (e) {
    console.log(e)

    submitting.value = false
  }
}

function validatePassword(): boolean {
  if (pwdRule(current_password.value) !== true) return false
  if (pwdRule(new_password.value) !== true && isNotDuplicated() !== true) return false
  if (pwdRule(confirm_password.value) !== true && isConfirmMatch() !== true) return false

  return true
}

const pwdRule = (pwd: string) => {
  pwd = pwd.trim()

  const isPassword = /^[\da-zA-Z@#]+$/.test(pwd)

  if (pwd.length == 0) return 'Required.'
  if (pwd.length < 6 || pwd.length > 30) return 'Password must 8 to 30 characters.'
  if (!isPassword) return 'Invalid password format.'

  return true
}

const isNotDuplicated = () => {
  return new_password.value !== current_password.value ? true : 'Should not be same as old password'
};

const isConfirmMatch = () => {
  return new_password.value === confirm_password.value ? true : 'Passwords do not match'
};

const closeDialog = () => {
  password_dialog.value = false
  current_password.value = ''
  new_password.value = ''
  confirm_password.value = ''
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn class="profile-btn custom-hover-primary mr-3" variant="text" v-bind="props" icon>
        <v-avatar size="40" class="elevation-3 avatar-border">
          <v-img :src="`${publicCtx.apiBaseUrl}${$auth.profile?.user_img}`" cover alt="User Profile Image">
            <template v-slot:error>
              <v-img cover :src="defaultUserImage"></v-img>
            </template>
          </v-img>
        </v-avatar>
      </v-btn>
    </template>

    <v-sheet rounded="lg" width="260" elevation="10" class="profile-menu mt-3">
      <v-list class="py-0 profile-list" density="comfortable">
        <router-link :to="`/user/detail?id=${$auth.profile?.user_id}`" class="no-underline">
          <v-list-item>
            <template v-slot:prepend>
              <v-avatar size="45" class="elevation-2 avatar-border">
                <v-img :src="`${publicCtx.apiBaseUrl}${$auth.profile?.user_img}`" cover alt="User Avatar">
                  <template v-slot:error>
                    <v-img cover :src="defaultUserImage"></v-img>
                  </template>
                </v-img>
              </v-avatar>
            </template>
            <v-container style="margin-left: -10px;">
              <v-list-item-title class="font-weight-bold text-primary">
                {{ $auth.profile?.user_firstname + " " + $auth.profile?.user_lastname || $t('profile.guest') }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-grey">
                {{ $auth.profile?.user_username || $t('profile.no_email') }}
              </v-list-item-subtitle>
            </v-container>
          </v-list-item>
        </router-link>
        <v-divider class="my-3"></v-divider>

        <router-link :to="`/user/update?id=${$auth.profile?.user_id}`" class="no-decoration">
          <v-list-item value="edit-profile">
            <template v-slot:prepend>
              <v-icon color="primary">mdi-account-edit</v-icon>
            </template>
            <v-list-item-title class="text-primary">
              {{ $t('any.edit_profile') }}
            </v-list-item-title>
          </v-list-item>
        </router-link>

        <v-list-item value="change-password" @click="password_dialog = true">
          <template v-slot:prepend>
            <v-icon color="primary">mdi-lock</v-icon>
          </template>
          <v-list-item-title class="text-primary">
            {{ $t('c_psw.change_password') }}
          </v-list-item-title>
        </v-list-item>

        <v-divider class="my-3"></v-divider>

        <div class="d-flex py-2 px-4">
          <v-btn class="logout-btn" color="error" variant="outlined" block @click="$auth.logout">
            <v-icon>mdi-logout</v-icon>&nbsp;{{ $t('button.logout') }}
          </v-btn>
        </div>
      </v-list>
    </v-sheet>
  </v-menu>


  <v-dialog v-model="password_dialog" max-width="500" :persistent="true">
    <v-card>
      <v-toolbar color="muted">
        <v-toolbar-title>{{ $t('c_psw.change_password') }}</v-toolbar-title>
        <v-btn icon dark @click="closeDialog">
          <v-icon size="tiny">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col class="text-md-right pt-2" cols="12" md="5">
            <v-label>{{ $t('c_psw.current_password') }}</v-label>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field v-model="current_password" density="compact" variant="outlined"
              :rules="[pwdRule]"></v-text-field>
          </v-col>
          <v-col class="text-md-right pt-2" cols="12" md="5">
            <v-label>{{ $t('c_psw.new_password') }}</v-label>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field v-model="new_password" density="compact" variant="outlined"
              :rules="[pwdRule, isNotDuplicated]"></v-text-field>
          </v-col>
          <v-col class="text-md-right pt-2" cols="12" md="5">
            <v-label>{{ $t('c_psw.confirm_password') }}</v-label>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field v-model="confirm_password" :rules="[pwdRule, isConfirmMatch]" density="compact"
              variant="outlined"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="border-opacity-100"></v-divider>
      <v-card-text class="d-flex justify-center gap-2 py-4">
        <v-btn color="save" @click="onSubmit">
          <template v-if="submitting">
            <v-progress-circular class="mr-2" indeterminate color="save" :size="16"></v-progress-circular>
          </template>
          {{ $t('button.save') }}
        </v-btn>
        <v-btn color="secondary" @click="closeDialog">{{ $t('button.cancel') }}</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.no-underline {
  text-decoration: none;
}

.profile-btn {
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

.profile-btn:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.avatar-border {
  border: 2px solid var(--v-primary-base);
}

.profile-menu {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.profile-list .v-list-item {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-list .v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.text-primary {
  color: var(--v-primary-base);
}

.text-grey {
  color: rgba(0, 0, 0, 0.6);
}

.no-decoration {
  text-decoration: none;
}

.logout-btn {
  font-weight: bold;
  border-color: var(--v-error-base) !important;
}

.logout-btn:hover {
  background-color: rgba(255, 0, 0, 0.1) !important;
}
</style>
