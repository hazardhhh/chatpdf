<template>
  <div class="main">
    <div class="content">
      <div class="content-introduce">
        <div class="company-name">
          <span class="name">chatpdf</span>
        </div>
        <div class="brief-introduction">
          {{ introduction }}
          <!-- <div v-if="isLoading" class="loading">
            <div class="loading-bar"></div>
          </div>
          <div v-else>
            {{ introduction }}
          </div> -->
        </div>
        <div class="preview">
          <el-input v-model="questionInput" placeholder="请输入问题"></el-input>
          <el-button :disabled="submitDisable" @click="sendChatMessage"
            >提交</el-button
          >
          <el-upload
            class="upload-demo"
            action="https://api.chatpdf.com/v1/sources/add-file"
            :file-list="fileList"
            :headers="{
              'x-api-key': 'sec_2tJb4DsSggV1EDHGUWALujqp5zADxBUY',
            }"
            :multiple="false"
            :on-success="uploadSuccess"
            :on-remove="uploadRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { startLoading } from "../utils/globalMethods";
import { endLoading } from "../utils/globalMethods";
export default {
  data() {
    return {
      introduction: "示例", // 默认的介绍
      questionInput: "", // 用户输入的问题
      sourceId: null, // 文件上传后返回的 sourceId
      fileList: [],
      submitDisable: true, // 提交按钮是否禁用状态(如未上传文件)
    };
  },
  methods: {
    // 上传成功回调
    uploadSuccess(response, file, fileList) {
      this.sourceId = response.sourceId;
      this.submitDisable = false; // 接触提交按钮禁用状态
    },
    // 上传文件 移除已上传文件回调
    uploadRemove(file) {
      // console.log("file === ", file);
      this.sourceId = ""; // 清空之前上传文件获得的id
      this.submitDisable = true;
    },
    sendChatMessage() {
      startLoading();
      if (this.sourceId && this.questionInput) {
        const data = {
          sourceId: this.sourceId,
          messages: [
            {
              role: "user",
              content: this.questionInput,
            },
          ],
        };

        const headConfig = {
          "x-api-key": "sec_2tJb4DsSggV1EDHGUWALujqp5zADxBUY",
          "Content-Type": "application/json",
        };

        this.postRequest(
          "https://api.chatpdf.com/v1/chats/message",
          data,
          headConfig
        )
          .then((res) => {
            this.introduction = res.data.content;
            this.questionInput = ""; // 清空输入框
            endLoading();
          })
          .catch((error) => {
            console.log("Error:", error.message);
            console.log("Response:", error.response.data);
            endLoading();
          });
      } else {
        this.$message.error("请先输入问题！");
        endLoading();
      }
    },
  },
};
</script>

<style scoped>
.loading {
  width: 60%;
  height: 20px;
  background-color: #f3f3f3;
  position: relative;
  overflow: hidden;
}

.loading-bar {
  width: 30%;
  height: 100%;
  background-color: #3498db;
  position: absolute;
  animation: loading 2s linear infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.content {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  display: flex;
  background-image: url(../assets/images/bg.png);
}
.content-introduce {
  position: absolute;
  top: 200px;
  left: 96px;
}
.company-name {
  display: flex;
  align-items: center;
}
.company-name .name {
  color: #2f2f2f;
  font-size: 72px;
  font-weight: 600;
  display: inline-block;
  margin-right: 21px;
}
.company-name .name-img .img {
  width: 321px;
  height: 40px;
  margin-top: 11px;
}
.company-name .name-img .line {
  width: 322px;
  height: 3px;
  background-color: #5f9ffe;
  margin-top: 10px;
}
.brief-introduction,
.brief-introduction1 {
  width: 560px;
  height: 168px;
  color: #929fa6;
  font-size: 18px;
  margin-top: 68px;
}
.brief-introduction1 {
  margin-top: -30px !important;
}
.content-introduce .preview {
  width: 480px;
  height: 112px;
  border-radius: 16px;
  background-color: #ffffff;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content-introduce .preview input[type="text"] {
  width: 70%; /* 调整输入框的宽度 */
  padding: 10px; /* 增加内边距 */
  font-size: 16px; /* 增加字体大小 */
}
.content-introduce .preview .xt {
  color: #2f2f2f;
  font-size: 24px;
  font-weight: 600;
  margin-left: 32px;
  margin-right: 59px;
}
.content-introduce .preview .btn {
  text-align: center;
  margin-left: 50px;
  margin-right: 50px;
  background-color: #4188f3;
  border-radius: 16px;
  width: 80px;
  height: 66px;
  color: #ffffff;
  font-size: 20px;
  line-height: 66px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0px 20px 60px 0px rgba(95, 159, 254, 0.4);
}
.product {
  margin-top: 100px;
  width: 1250px;
  height: 700px;
  background: #f8f8f8;
  border-radius: 0px 40px 40px 0px;
  opacity: 1;
  padding-left: 96px;
}
.title {
  display: flex;
  padding-top: 60px;
  margin-bottom: 53px;
}
.title .v1 {
  color: #2f2f2f;
  font-size: 48px;
  font-weight: 600;
  line-height: 67px;
  margin-right: 30px;
}
.title .v2 {
  color: #bac0c3;
  font-size: 40px;
  font-weight: 600;
  line-height: 67px;
}
.product .pro-list {
  display: flex;
}
.product .pro-list .pro-item {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  margin-right: 40px;
}
.product .pro-list .pro-item .pro-name {
  color: #2f2f2f;
  font-size: 28px;
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 600;
}
.product .pro-list .pro-item .pro-details {
  color: #929fa6;
  font-size: 16px;
  font-weight: 600;
}
.about {
  padding-left: 96px;
  display: flex;
  justify-content: space-between;
}
.mt {
  margin-top: 88px;
}
.about .nums {
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}
.about .nums .one-line {
  height: 40px;
  width: 0px;
  opacity: 1;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.about .nums .nums-item .txt {
  color: #4188f3;
  font-size: 32px;
  line-height: 45px;
  font-weight: 800;
  margin: 0;
}
.about .nums .nums-item .nums-name {
  color: #929fa6;
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
  margin: 0;
}
.about .about-right {
  margin-top: 70px;
  width: 468px;
  height: 600px;
  background: #f8f8f8;
  border-radius: 40px 0px 0px 40px;
  opacity: 1;
  position: relative;
}
.about .about-right .imgs {
  position: absolute;
  top: 30px;
  left: -150px;
}
.about .about-right .decorate {
  position: absolute;
  top: 155px;
  right: 97px;
}
.contact {
  padding-left: 96px;
  margin-bottom: 100px;
}
.contact .contact-info {
  border-radius: 40px;
  background-color: #f5f5f5;
  opacity: 1;
  display: flex;
  justify-content: flex-start;
}
.contact .contact-info .contact-info-l {
  background-color: #4188f3;
  padding: 60px 60px 60px 60px;
  border-radius: 40px;
  width: 600px;
}
.contact .contact-info .contact-info-l .contact-info-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  margin-bottom: 22px;
}
.contact .contact-info .contact-info-l .contact-info-item .icon {
  margin-right: 30px;
}
.contact-content-k {
  font-size: 24px;
  line-height: 33px;
  font-weight: 600;
}
.contact-content-v {
  font-size: 32px;
  line-height: 44px;
  font-weight: 600;
}
.contact-info-r {
  margin-left: 174px;
}
.contact-info-r .gzh {
  margin-top: 46px;
  text-align: center;
  color: #929fa6;
  font-size: 24px;
  line-height: 33px;
  font-weight: 600;
}
.contact-info-r .qrcode {
  width: 300px;
}
</style>
