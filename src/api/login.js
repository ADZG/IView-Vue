import axiosTool from "@/api/index.js";
// 登录
export const login = data => {
  return axiosTool({
    url: "login",
    method: "post",
    data
  });
};

// 左侧菜单的列表
export const list = () => {
  return axiosTool({
    method: "get",
    url: "menus"
  });
};

// 获取数据列表
export const showlist = params => {
  return axiosTool({
    method: "get",
    url: "users",
    params
  });
};
// 管理开关
export const switchstat = (type, id) => {
  return axiosTool({
    method: "put",
    url: `users/${id}/state/${type}`
  });
};
// 新增用户
export const addpre = data => {
  return axiosTool({
    method: "post",
    url: "users",
    data
  });
};

// 编辑用户
export const editpre = (id, data) => {
  return axiosTool({
    method: "put",
    url: `users/${id}`,
    data
  });
};
// 删除用户
export const removepre = id => {
  return axiosTool({
    url: `users/${id}`,
    method: "delete"
  });
};

// 获取所有分配角色的列表
export const selectpre = () => {
  return axiosTool({
    url: "roles"
  });
};

// 分配角色
export const rolespre = (id, rid) => {
  return axiosTool.put(`users/${id}/role`, { rid }).then(result => {
    return result.data;
  });
};
