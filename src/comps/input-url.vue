<template>
  <div style="display: inline-block">
    <el-row>
      <template v-for="(input, k) in inputs">
        <el-col
          :span="input.span || 3"
          :key="input.model"
        >
          <el-input
            v-model="url[input.model]"
            v-bind="input.config"
            :placeholder="input.placeholder"
          ></el-input>
        </el-col>
        <el-col
          v-if="input.text"
          :span="1"
          :key="k"
          style="text-align: center"
        >
          {{ input.text }}
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['value'],

  data() {
    return {
      url: {
        driver: '',
        db: '',
        ip: '',
        port: ''
      },
      inputs: [
        {
          model: 'driver',
          placeholder: 'jdbc',
          text: ':'
        },
        {
          model: 'db',
          placeholder: 'mysql',
          text: '://'
        },
        {
          span: 12,
          model: 'ip',
          placeholder: '127.0.0.1',
          text: ':'
        },
        {
          model: 'port',
          placeholder: '3306',
          config: {
            type: 'number'
          }
        },
      ]
    }
  },

  watch: {
    value: {
      handler(v) {
        if (v) {
          const [, driver, db, ip, port] = v.match(
            /([\w]*):([\w]*):\/\/([\w.]*):([\d]*)/
          )
          this.url = Object.assign({}, this.url, { driver, db, ip, port })
        }
      },
      immediate: true
    },
    url: {
      handler(v) {
        if (v.driver && v.db && v.ip && v.port) {
          this.$emit('input', `${v.driver}:${v.db}://${v.ip}:${v.port}`)
        } else {
          this.$emit('input', '')
        }
      },
      deep: true
    }
  }
}
</script>
