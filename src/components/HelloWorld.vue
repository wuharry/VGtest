<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <h3>Installed CLI Plugins</h3>
    <h3>街到的資料:{{ showData }}</h3>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { OAuth2Client } from 'google-auth-library';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const showData = reactive(null);
    async function verifyToken(token) {
      const clientId = '800172214658 - 6gee9rsf9aa99mas1fu8dhh8jbrapikv.apps.googleusercontent.com'; // 用戶端 ID
      const client = new OAuth2Client(clientId);
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: clientId,
        });
        const payload = ticket.getPayload();
        const userId = payload.sub;
        const email = payload.email;
       return { userId, email };
      } catch (error) {
        console.error('驗證失敗', error);
        throw error;
      }
    }
    const token = this.userId; // 替換為您的 ID Token
    verifyToken(token)
      .then((user) => {
        showData.value = user;
        console.log('驗證成功', user);
      })
      .catch((error) => {
        console.error('驗證失敗', error);
      });
    return {
      showData
    }

  }
}
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
