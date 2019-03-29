<template>
  <div>
    <h3>通过自定义component操控联动</h3>

    <el-form-renderer ref="form" :content="content"></el-form-renderer>

    <el-button @click="logVal">打印数据</el-button>

    <pre>{{ value }}</pre>
  </div>
</template>

<script>
import InputUrl from '@comps/input-url.vue'

const defaultPort = {
  mysql: '3306',
  oracle: '1521'
}

const classNameOpts = {
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
}

export default {
  data() {
    return {
      content: [
        {
          $type: 'select',
          $id: 'dialect',
          label: '数据源',
          $options: [
            {
              label: 'mysql',
              value: 'mysql'
            },
            {
              label: 'oracle',
              value: 'oracle'
            }
          ],
          atChange: (id, val) => {
            this.$refs.form.setOptions('className', classNameOpts[val])
            this.$refs.form.updateForm({
              className: ''
            })
            const { url } = this.$refs.form.getFormValue()
            this.$refs.form.updateForm({
              url: !url
                ? `jdbc:${val}://:${defaultPort[val]}`
                : url.replace(/mysql|oracle/, val)
            })
          }
        },
        {
          $id: 'url',
          label: 'URL',
          component: InputUrl
        },
        {
          $type: 'select',
          $id: 'className',
          label: '数据库',
          $enableWhen: 'dialect'
        }
      ],
      value: {}
    }
  },
  methods: {
    logVal() {
      this.value = Object.assign(
        {},
        this.$refs.form.getFormValue()
      )
    }
  }
}
</script>
