<template>
  <div class="login">
    <Card style="width:330px;margin:auto;margin-top:200px;" :padding="30">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="username">
          <Input
            type="text"
            v-model="formInline.username"
            placeholder="Username"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="Password"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')"
            >登录</Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { login } from "@/api/login.js";
export default {
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          login(this.formInline).then(res => {
            if (res.data.meta.status === 200) {
              // 登录成功则将用户名保存在状态仓库里，
              this.$store.state.username = res.data.data.username;
              // 如果通过验证，则在本地存储TOKEN值
              let token = res.data.data.token;
              localStorage.setItem("Superman", token);
              this.$router.push({ name: "Home" });
            }
          });
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
}
</style>
