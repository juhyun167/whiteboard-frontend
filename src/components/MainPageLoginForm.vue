<template>
  <Toast />

  <div class="form-wrapper">
    <Card class="shadow-7">
      <template #content>
        <div class="input-wrapper">
          <label for="username">아이디</label>
          <InputText
            id="username"
            type="text"
            v-model="data.username"
            placeholder="아이디를 입력해주세요"
          />

          <label for="password">비밀번호</label>
          <Password
            id="password"
            :feedback="false"
            v-model="data.password"
            placeholder="비밀번호를 입력해주세요"
          />

          <a class="button-submit" @click.prevent="login"> 로그인 </a>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    Card,
    InputText,
    Password,
    Toast,
  },
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });

    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const login = async () => {
      const result = await store.dispatch("login", {
        username: data.username,
        password: data.password,
      });

      if (result.success) {
        router.push({ name: "home" });
      } else {
        let errorMessage = "";

        if (result.status) {
          if (result.status < 500) {
            errorMessage = "아이디와 비밀번호를 다시 한번 확인해주세요.";
          } else {
            errorMessage =
              "화이트보드 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          }
        } else {
          errorMessage =
            "로그인 요청이 전송되지 못했습니다. 인터넷 상태를 확인해주세요.";
        }
        toast.add({
          severity: "error",
          summary: "로그인에 실패했습니다.",
          detail: errorMessage,
          life: 2000,
          closable: false,
        });
      }
    };

    return {
      data,
      login,
    };
  },
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/MainPageForm.styl'
</style>
