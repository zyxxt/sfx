<template>
    <div class="welcome">
        <h1>just for test</h1>
        <ul>
            <li v-for="nav in navs">
                <input type="radio" name="nav" v-model="selected" :id="nav.id" :value="nav.id" >
                <label :for="nav.id">{{nav.text}}</label>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    h1 {
        color: red;
    }
    input {
        display: none;
    }
    input:checked ~ label {
        background: greenyellow;
    }
</style>

<script>
    /**
     * Created by zhangyuantao on 2017/3/7.
     */
      export default {
          data () {
              return {
                  selected: '1',
                  navs: [{
                      id: '0',
                      text: 'item0'
                  }, {
                      id: '1',
                      text: 'item1'
                  }, {
                      id: '2',
                      text: 'item2'
                  }, {
                      id: '3',
                      text: 'item3'
                  }]
              };
          }
      };
</script>
