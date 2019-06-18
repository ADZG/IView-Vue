<template>
  <div>
    <!-- 搜索框 -->
    <Input
      :search="true"
      enter-button="Search"
      placeholder="Enter something..."
      :earch="true"
      :clearable="true"
      :autofocus="true"
      v-model="listtoto.query"
      @on-search="serch"
    />
    <!-- 新增用户 -->
    <Modal v-model="modal1" title="添加新用户" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formItem" :label-width="80">
        <FormItem label="用户名">
          <Input v-model="formItem.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="formItem.password" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="formItem.mobile" placeholder="请输入手机号"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 列表 -->
    <Button type="warning" ghost style="margin-top: 5px" @click="modal1 = true">添加用户</Button>
    <Table border :columns="columns" :data="list" :stripe="true">
      <template slot-scope="{ row }" slot="switch">
        <i-switch v-model="row.mg_state" @on-change="change($event, row.id)"></i-switch>
      </template>
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">编辑</Button>
        <Button style="margin-right: 5px" type="error" size="small" @click="remove(row)">删除</Button>
        <Button type="success" size="small" @click="impower(row)">授权</Button>
      </template>
    </Table>
    <!-- 编辑对话框 -->
    <Modal v-model="editmodel" title="编辑" @on-ok="edit" @on-cancel="canceledit">
      <Form :model="formedit" :label-width="80" label-position="left">
        <FormItem label="用户名">
          <Input v-model="formedit.username" disabled></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formedit.email"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="formedit.mobile"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="modaltree" title="角色分配" @on-ok="impowertree" @on-cancel="cancelimpower">
      <i-input type="text" v-model="modeselect.username" disabled style="width:300px">
        <Icon type="ios-person-outline"></Icon>
      </i-input>
      <Select v-model="modeselect.rid" prefix="ios-home" style="width:200px;margin-top:30px">
        <Option
          v-for="item in cityList"
          :value="item.id"
          :key="item.id"
          :label="item.roleName"
        >{{ item.roleName }}</Option>
      </Select>
    </Modal>
    <!-- 分页器 -->
    <Page
      :total="total+0"
      show-elevator
      show-sizer
      show-total
      :transfer="true"
      :current="current"
      :page-size="pagesize"
      @on-change="changepage"
      :page-size-opts="[5, 10, 15, 20]"
      @on-page-size-change="changesize"
      :expand="true"
    />
  </div>
</template>
<script>
import {
  showlist,
  switchstat,
  addpre,
  editpre,
  removepre,
  selectpre,
  rolespre
} from "@/api/login.js";
export default {
  data() {
    return {
      modeselect: {
        rid: "",
        username: "",
        id: ""
      },
      approve: "",
      cityList: [],
      modaltree: false,
      id: "",
      formedit: {
        username: "",
        email: "",
        mobile: ""
      },
      editmodel: false,
      formItem: {
        username: "",
        email: "",
        mobile: ""
      },
      modal1: false,
      list: [],
      listtoto: {
        query: "",
        pagenum: 1,
        pagesize: 6
      },
      total: 0,
      current: 1,
      pagesize: 6,
      columns: [
        {
          title: "职位",
          key: "role_name",
          align: "center"
        },
        {
          title: "角色",
          key: "username",
          align: "center"
        },
        {
          title: "手机",
          key: "mobile",
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "状态",
          slot: "switch",
          width: 150,
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center"
        }
      ]
    };
  },
  methods: {
    async change(type, id) {
      let result = await switchstat(type, id);
      this.$Message.info("开关状态：" + result.data.meta.msg);
    },
    getAlllist() {
      showlist(this.listtoto).then(res => {
        let newdata = res.data.data;
        this.list = res.data.data.users;
        this.columns.key = res.data.data.users.role_name;
        this.total = newdata.total;
        this.current = newdata.pagenum;
      });
    },
    serch() {
      this.getAlllist();
    },
    async ok() {
      let result = await addpre(this.formItem);

      // eslint-disable-next-line no-empty
      if (result.data.meta === 201) {
        this.$Message.info(result.data.meta.msg);
        this.getAlllist();
      }
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    changepage(num) {
      this.listtoto.pagenum = num;
      this.getAlllist();
    },
    changesize(num) {
      this.listtoto.pagesize = num;
      this.getAlllist();
    },
    show(row) {
      this.editmodel = true;
      this.formedit.username = row.username;
      this.formedit.email = row.email;
      this.formedit.mobile = row.mobile;
      this.id = row.id;
    },
    async edit() {
      let result = await editpre(this.id, this.formedit);
      if (result.data.meta.status === 200) {
        this.$Message.info(result.data.meta.msg);
        this.getAlllist();
      }
    },
    canceledit() {
      this.$Message.info("取消操作");
    },
    remove(row) {
      removepre(row.id).then(result => {
        if (result.data.meta.status === 200) {
          this.$Message.info(result.data.meta.msg);
          this.getAlllist();
        }
      });
    },
    impower(row) {
      this.modaltree = true;
      this.modeselect.username = row.username;
      this.modeselect.rid = row.rid;
      this.modeselect.id = row.id;
    },

    async impowertree() {
      let result = await rolespre(this.modeselect.id + 0, this.modeselect.rid);
        if (result.meta.status === 200) {
        this.$Message.info(result.meta.msg);
        this.getAlllist();
      }
    },
    cancelimpower() {}
  },
  mounted() {
    this.getAlllist();
    selectpre().then(result => {
      this.cityList = result.data.data;
    });
  }
};
</script>
<style lang="less" scoped></style>
