<template>
  <div class="hello-world">
    <button @click="fetchData">获取数据</button>
    <button @click="oauthSignIn">登陸OAuth</button>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    const CLIENT_ID = '800172214658-6gee9rsf9aa99mas1fu8dhh8jbrapikv.apps.googleusercontent.com'; // 替换为您的 OAuth 2.0 客户端 ID
    const CLIENT_SECRET = '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'; // 替换为您的 OAuth 2.0 客户端密钥
    const API_URL = 'https://analyticsdata.googleapis.com/v1beta/properties/380344010/metadata?key=AIzaSyCaADd3bfYV7erEvFJzjmBtcUnV6V5aTTc'; // Google Analytics 数据 API 端点

    const ACCESS_TOKEN = '';
    return {
      reports: [],
      CLIENT_ID,
      CLIENT_SECRET,
      API_URL,
      ACCESS_TOKEN
    };
  },
  methods: {
    // 发起 API 请求
    async fetchData() {
      try {
        let url = window.location.href
        let urlarry = url.split('&');
        let tokenurl = urlarry[1].split('=');
        this.ACCESS_TOKEN = tokenurl[1];
        const headers = {
          Authorization: 'Bearer ' + this.ACCESS_TOKEN,
          'Access-Control-Allow-Origin': 'http://localhost:8080' 
        };

        const requestBody = {
          reportRequests: [
            {
              viewId: 'G-TM9FT02FW3', // 替换为您的 Google Analytics 视图 ID
              dateRanges: [
                {
                  startDate: '2023-06-01',
                  endDate: '2023-06-11',
                },
              ],
              metrics: [
                {
                  expression: 'ga:sessions',
                },
              ],
              dimensions: [
                {
                  name: 'ga:country',
                },
              ],
            },
          ],
        };

        await fetch(
          this.API_URL, requestBody, {
          method: 'POST',
          headers: headers,
          body: requestBody
        }).then((response) => {
          console.log('成功获取 Google Analytics 数据：', response.data);
          console.log(response);
        })
          .catch((error) => {
            console.error('获取 Google Analytics 数据失败：', error);
          });
      } catch (error) {
        console.error('API 请求失败', error);
        throw error;
      }
    },
    // 获取访问令牌
    oauthSignIn() {
      // Google's OAuth 2.0 endpoint for requesting an access token /Google OAuth 2.0 Token 端点
      let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
      let params = new URLSearchParams();
      params.append('client_id', '800172214658-6gee9rsf9aa99mas1fu8dhh8jbrapikv.apps.googleusercontent.com');
      params.append('redirect_uri', 'http://localhost:8080/VGtest/');
      params.append('response_type', 'token');
      params.append('scope', 'https://www.googleapis.com/auth/drive.metadata.readonly');
      params.append('include_granted_scopes', 'true');
      params.append('state', 'pass-through value');
      window.location.href = `${oauth2Endpoint}?${params.toString()}`;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
