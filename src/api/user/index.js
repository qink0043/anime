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
    const res = await ownInstance.get('/user/login', {
      params
    });
    return res.data;
  } catch (err) {
    return err;
  }
}
