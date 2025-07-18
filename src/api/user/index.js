import ownInstance from "@/utils/user";

//注册
export const registerAPI = async (params) => {
  try {
    const res = await ownInstance.post('/user/register', {
      params
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

//登录
export const loginAPI = async (params) => {
  try {
    const res = await ownInstance.post('/user/login', {
      params
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

//获取用户信息
export const getUserInfoAPI = async () => {
  try {
    const res = await ownInstance.get('/user/userInfo');
    return res.data;
  } catch (err) {
    return err;
  }
  //测试
}


//修改头像
export const updateAvatarAPI = async (file) => {
  const formData = new FormData()
  formData.append('avatar', file)
  try {
    const res = await ownInstance.post('/user/updateAvatar', formData);
    return res.data;
  } catch (err) {
    return err.data.msg;
  }
}
