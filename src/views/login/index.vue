<template>
    <div class="container-view-login">
        <div class="rightBg"></div>
        <div class="rightBgSkew"></div>
        <div class="content">
            <div class="center_l">
                <div class="logo"></div>
                <div class="title">
                    Oh Thank
                    <br />Heaven for
                    <br />7-Eleven
                </div>
                <div class="con">
                    7-ELEVEN 365天24小時營業。
                    <br />為您提供Wi-Fi等服務與食品、酒類、化妝品等
                    <br />多樣化商品。
                </div>
                <div class="tips">※部分門市除外</div>
            </div>
            <div class="center_r">
                <div class="xian"></div>
                <div class="tips">欢迎登录</div>
                <div class="title">会员管理系统</div>
                <a-form
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="handleSubmit"
                >
                    <a-form-item>
                        <a-input
                            v-decorator="['userName',{ rules: [{ required: true, message: '请输入用户名!' }] }]"
                            placeholder="请输入账号"
                            class="input"
                        ></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                            v-decorator="['password',{ rules: [{ required: true, message: '请输入密码!' }] }]"
                            type="password"
                            placeholder="请输入密码"
                            class="input"
                        ></a-input>
                    </a-form-item>
                    <a-form-item>
                        <div class="login-form-forgot" @click="opentips">忘记密码?</div>
                        <a-button
                            type="primary"
                            html-type="submit"
                            :style="background"
                            class="login-form-button"
                            @click="handleSubmit"
                        >登录</a-button>
                        <div class="tel">咨询电话：0571-87291195</div>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
import { loginByUsername } from '@/api/login'
export default {
    name: 'login',
    data () {
        return {
            background: 'background:#008061',
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this)
    },
    methods: {
        handleSubmit (e) {
            e.preventDefault()
            // this.background = 'background:#7AA8F4' // 变色
            // setTimeout(() => {
            //     this.background = 'background:#6699EE'
            // }, 500)
            this.form.validateFields((err, values) => {
                if (!err) {
                    // 调取登录接口
                    loginByUsername(values.userName, values.password).then(res => {
                        if (res.code == '200') {
                            this.$store.dispatch('LoginByUsername', res.data).then(() => {
                                this.$message.success('登录成功')
                                this.$router.push('/dashboard')
                                //   this.$router.push({ path: this.redirect || '/' })
                            }).catch(() => {

                            })
                        } else {
                            this.$message.error(res.msg)
                        }

                    }).catch(error => {

                    })
                }
            })
        },
        // 提示
        opentips () {
            this.$info({
                title: '提示',
                content: '请联系你的客户经理',
                onOk () { },
            })
        }
    }
}
</script>
<style lang="less" scoped>
input:-webkit-autofill {
    box-shadow: 0 0 0 1000px #f2f2f2 inset !important; /*解决input选中后颜色问题*/
}
.container-view-login {
    width: 100%;
    height: 100vh;
    min-height: 666px;
    max-height: 1024px;
    background: url('https://hh-oss-html.miyapay.com/hhops/picture/1582718632732c7be173a340c')
        center top no-repeat;
    background-size: 100%;
    position: relative;
    overflow: hidden;
    .rightBg {
        position: absolute;
        top: 0;
        right: 0;
        width: 25%;
        height: 100vh;
        min-height: 666px;
        max-height: 1024px;
        background: #f2f2f2;
    }
    .rightBgSkew {
        position: absolute;
        top: 0;
        right: 0;
        width: 53%;
        height: 100vh;
        min-height: 666px;
        max-height: 1024px;
        background: #f2f2f2;
        border-radius: 50px;
        transform: skewX(6deg);
        -ms-transform: skewX(6deg); /* IE 9 */
        -webkit-transform: skewX(6deg); /* Safari 和 Chrome */
        -moz-transform: skewX(6deg); /* Firefox */
        -o-transform: skewX(6deg); /* Opera */
    }
    .content {
        width: 1140px;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }
}
.center_l {
    float: left;
    margin-top: 30px;
    .logo {
        background-image: url('https://hh-oss-html.miyapay.com/hhops/picture/1582773094052cbbf9dc450d2');
        background-size: 100%;
        width: 268px;
        height: 64px;
    }
    .title {
        margin-top: 144px;
        color: #ffffff;
        font-size: 64px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        line-height: 70px;
    }
    .con {
        margin-top: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 33px;
    }
    .tips {
        margin-top: 10px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        line-height: 20px;
    }
}
.center_r {
    position: absolute;
    right: 136px;
    width: 320px;
    z-index: 2;
    .xian {
        margin-top: 78px;
        width: 44px;
        height: 4px;
        background: rgba(0, 128, 97, 1);
    }
    .tips {
        margin-top: 94px;
        font-size: 24px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(0, 0, 0, 0.8);
        line-height: 33px;
    }
    .title {
        margin-top: 23px;
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        line-height: 56px;
        letter-spacing: 2px;
    }
    .login-form {
        width: 100%;
        margin: 70px auto 0;
        .login-form-forgot {
            float: right;
            font-size: 14px;
            color: #0091ff;
            line-height: 20px;
            margin-bottom: 38px;
            margin-top: -4px;
            cursor: pointer;
        }
        .login-form-button {
            width: 100%;
            background: #008061;
            height: 50px;
            border: 0;
            border-radius: 4px;
        }
        .input {
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-radius: 0 !important;
            padding-left: 0;
            height: 50px;
            font-size: 18px;
            background-color: #f2f2f2;
        }
        .input:hover {
            border-color: #6699ee !important;
        }
        .input:focus {
            border-color: #6699ee !important;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0);
        }
        .tel {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
            line-height: 20px;
            margin-top: 26px;
            text-align: center;
        }
    }
}
</style>
