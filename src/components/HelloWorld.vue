<template>
  <div class="hello">
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
    </p>
    <h3>Installed CLI Plugins</h3>
    <h3>街到的資料:{{ showData }}</h3>
  </div>
</template>
<script > 
export default {
  name: "HelloWorld",
  data() {
    return {
      reports: [],
    };
  },
  mounted() {
    this.loadGoogleAPI();
  },
  methods: {
    async loadGoogleAPI() {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });

      await gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: 'YOUR_API_KEY',
          clientId: 'YOUR_CLIENT_ID',
          discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
          scope: 'https://www.googleapis.com/auth/analytics.readonly',
        });
      });
    },
    async getAnalyticsData() {
      try {
        const response = await gapi.client.analyticsreporting.reports.batchGet({
          requestBody: {
            reportRequests: [
              {
                viewId: 'YOUR_VIEW_ID',
                dateRanges: [
                  {
                    startDate: '2023-06-01',
                    endDate: '2023-06-11',
                  },
                ],
                metrics: [
                  {
                    expression: 'ga:pageviews',
                  },
                  {
                    expression: 'ga:sessions',
                  },
                ],
                dimensions: [
                  {
                    name: 'ga:pagePath',
                  },
                ],
              },
            ],
          },
        });

        this.reports = response.result.reports;
      } catch (error) {
        console.error('Error retrieving Analytics data:', error);
      }
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
