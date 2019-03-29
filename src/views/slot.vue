<template>
  <div>
    <h3>通过slot操控联动</h3>

    <el-form-renderer :content="content" ref="form">

      <el-form-item label="数据源">
        <el-select v-model="form.dialect" @change="onDialect">
          <el-option label="mysql" value="mysql"></el-option>
          <el-option label="oracle" value="oracle"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="URL">
        <el-row style="display: inline-block">
          <template v-for="input in inputs">
            <el-col
              :span="input.span || 3"
              :key="input.model"
            >
              <el-input
                v-model="store[input.model]"
                v-bind="input.config"
                :placeholder="input.placeholder"
              ></el-input>
            </el-col>
            <el-col
              v-if="input.text"
              :span="1"
              :key="input.k"
              style="text-align: center"
            >
              {{ input.text }}
            </el-col>
          </template>
        </el-row>
      </el-form-item>

      <el-form-item v-show="form.dialect" label="数据库">
        <el-select v-model="form.className">
          <el-option
            v-for="opt in classNameOpts[form.dialect]"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          ></el-option>
        </el-select>
      </el-form-item>

    </el-form-renderer>

    <el-button @click="logVal">打印数据</el-button>

    <pre>{{ value }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: [],
      form: {
        dialect: '',
        className: '',
        url: ''
      },
      store: {
        driver: '',
        db: '',
        ip: '',
        port: ''
      },
      defaultPort: {
        mysql: '3306',
        oracle: '1521'
      },
      classNameOpts: {
        mysql: [
          {
            label: 'com.mysql.jdbc.Driver',
            value: 'com.mysql.jdbc.Driver'
          },
          {
            label: 'com.mysql.cj.jdbc.Driver',
            value: 'com.mysql.cj.jdbc.Driver'
          }
        ],
        oracle: [
          {
            label: 'oracle.jdbc.driver.OracleDriver',
            value: 'oracle.jdbc.driver.OracleDriver'
          }
        ]
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
      ],
      value: {}
    }
  },
  methods: {
    onDialect(val) {
      this.store = Object.assign({}, this.store, {
        driver: 'jdbc',
        db: val
      })
      if (!this.store.port) {
        this.store.port = this.defaultPort[val]
      }
      this.form.className = ''
    },
    logVal() {
      const { store } = this

      let url = ''
      if (store.driver
        && store.db
        && store.ip
        && store.port) {
        url = `${store.driver}:${store.db}://${store.ip}:${store.port}`
      } else {
        url = ''
      }

      this.value = Object.assign(
        {},
        this.form,
        {
          url
        },
        this.$refs.form.getFormValue()
      )
    }
  }
}
</script>
