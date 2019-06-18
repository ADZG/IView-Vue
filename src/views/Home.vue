<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              <span>欢迎登录</span>
            </MenuItem>
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              用户列表
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-keypad"></Icon>
              用户管理
            </MenuItem>
            <a href="#">{{ $store.getters.getusername }}</a>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu theme="light" width="auto" :accordion="true">
            <Submenu
              :name="first.order + ''"
              v-for="first in listrules"
              :key="first.id"
            >
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                <span>{{ first.authName }}</span>
              </template>
              <MenuItem
                :name="second.order + ''"
                v-for="second in first.children"
                :key="second.id"
                :to="'/home/' + second.path"
                >{{ second.authName }}</MenuItem
              >
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">
          <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem to="/home/users">用户管理</BreadcrumbItem>
            <BreadcrumbItem>用户列表</BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
          >
            <!-- 打开占位符，让子组件的内容放进来 -->
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { list } from "@/api/login.js";
export default {
  data() {
    return {
      listrules: [],
      isCollapsed: false
    };
  },
  methods: {
    async getlist() {
      let result = await list();
      this.listrules = result.data.data;
    }
  },
  created() {
    this.getlist();
  },
  mounted() {}
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  /* overflow: hidden; */
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
