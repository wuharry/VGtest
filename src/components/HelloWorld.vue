<template>
  <div class="hello">
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
    </p>
    <h3>Installed CLI Plugins</h3>
    <h3>接到的資料:{{ showData }}</h3>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      reports: [],
    };
  },
  mounted() {
    this.getAnalyticsData();
  },
  methods: {
    async getAnalyticsData() {
      const VIEW_ID = "380344010"; // 替换为您的 Google Analytics 视图 ID
      const API_KEY = "AIzaSyCaADd3bfYV7erEvFJzjmBtcUnV6V5aTTc"; // 替换为您的 Google Cloud API 密钥

      const response = await axios
        .post(
          `https://analyticsdata.googleapis.com/v1beta/123456789:runReport`,
          {
            reportRequests: [
              {
                viewId: VIEW_ID,
                metrics: [
                  { expression: "ga:users" },
                  { expression: "ga:sessions" },
                ],
                dateRanges: [{ startDate: "10daysAgo", endDate: "today" }],
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          // 处理响应数据
          console.log(response);
          this.reports=response;
        })
        .catch((error) => {
          // 处理错误
          console.error(error);
        });
      console.log(response);
      // const data = response.data;
      // 在这里处理返回的数据
      // console.log(data);
    },
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
