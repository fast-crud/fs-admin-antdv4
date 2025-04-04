import { request, requestForMock } from "../service";
import { env } from "/@/utils/util.env";
/**
 * @description: Login interface parameters
 */
export interface LoginReq {
  username: string;
  password: string;
}

export interface UserInfoRes {
  id: string | number;
  username: string;
  nickName: string;
  avatar?: string;
}

export interface LoginRes {
  token: string;
  expire: number;
}

export async function login(data: LoginReq): Promise<LoginRes> {
  if (env.PM_ENABLED === "false") {
    //没有开启权限模块，模拟登录
    return await requestForMock({
      url: "/login",
      method: "post",
      data
    });
  }
  //如果开启了登录与权限模块，则真实登录
  return await request({
    url: "/login",
    method: "post",
    data
  });
}

export async function mine(): Promise<UserInfoRes> {
  if (env.PM_ENABLED === "false") {
    //没有开启权限模块，模拟登录
    return await requestForMock({
      url: "/sys/authority/user/mine",
      method: "post"
    });
  }
  return await request({
    url: "/sys/authority/user/mine",
    method: "post"
  });
}
