// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended', 
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  // 自定义规则
  rules: {
    "no-console": 2, //禁止使用console
    "no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
    "no-func-assign": 2,//禁止重复的函数声明
    "no-implicit-coercion": 1,//禁止隐式转换
    "no-irregular-whitespace": 2,//不能有不规则的空格
    "no-lonely-if": 2,//禁止else语句内只有if语句
    "no-multi-spaces": 1,//不能用多余的空格
    "eqeqeq": 2,//必须使用全等
    "no-multi-str": 2,//字符串不能用\换行
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "no-var": 0,//禁用var，用let和const代替
    "arrow-spacing": 0,//=>的前/后括号
    "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
    "curly": [2, "all"],//必须使用 if(){} 中的{}
    'indent': [2, 2, {
      'SwitchCase': 1
    }],//缩进风格
    "semi": [2, "never"],//语句强制分号结尾
    "semi-spacing": [0, {"before": false, "after": false}],//分号前后空格
    "space-in-parens": [0, "never"],//小括号里面要不要有空格
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": ["error", {
      "singleline": 5,
      "multiline": {
        "max": 5,
        "allowFirstLine": true
      }
    }],
  }
}
