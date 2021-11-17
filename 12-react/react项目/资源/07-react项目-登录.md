### 登录

#### 01-登录-展示

`目的：` 将准备好的Login组件进行展示(`02-其它资源/准备组件/Login`)

`步骤：`

1. 在根组件中app.js，配置路由
2. 访问登录组件



#### 02-登录-表单-基本功能

`目的：`完成登录的基本功能

`步骤：`

1. 添加状态：username（账号） 和 password（密码）
2. 使用**受控组件**方式获取表单元素值(value+onChange)
3. 给 form 表单添加 onSubmit。 
4. 创建方法 handleSubmit，实现表单提交。 
5. 在方法中，通过 username 和 password 获取到账号和密码。 
6. 使用 API 调用登录接口，将 username 和 password 作为参数。 
7. 判断返回值 status 为 200 时，表示登录成功。
8. 登录成功后，将 **token 保存到本地**存储中。 
   * utils下定义=》`TOKEN= 'hkzf_token'`键名
   * 调用封装的存储方法
9. 返回登录前的页面。（随后实现）

```js
// 示例代码
handlerLogin = async e => {
    e.preventDefault()
    const { username, password } = this.state
    const res = await axios.post(`http://localhost:8080/user/login`, {
      username,
      password
    })
    // console.log(res)
    const { status, body, description } = res.data
    if (status === 200) {
      window.localStorage.setItem('token', body.token)
      Toast.success(description, 2)
    } else {
      Toast.fail(description)
    }
  }
```



#### 03-登录-表单验证-介绍

`目的`: 表单提交前，需要先进行表单验证，验证通过后再提交表单

`分析：` 

1. antd-mobile 组件库=> InputItem 文本输入组件 -> **rc-form**（没有提供form能力）
2. 使用**主流**的 [formik](https://jaredpalmer.com/formik/docs/overview) 库，React 中专门用来进行表单处理和表单校验的库
   * 通过Formik组件名去使用

   * 通过withFormik()这个HOC去使用 -> **推荐**
     * 为自己的组件(form input等)增加表单处理和验证的功能



#### 04-登录-formik-重构Login

`目的：`使用formik库完成登录=》表单处理基本功能

`步骤：`

1. 安装：`npm i formik`。 
2. 导入 withFormik，使用 withFormik 高阶组件包裹 Login 组件。
3. 为 withFormik 提供配置对象：mapPropsToValues / handleSubmit。 
4. 在 Login 组件中，通过 props 获取到 values（表单元素值对象）、 handleSubmit、handleChange。 
5. 使用 values 提供的值，设置为表单元素的 value，使用 handleChange 设置为表单元素的 onChange。
6. 使用 handleSubmit 设置为表单的 onSubmit 。 
7. 在 handleSubmit 中，通过 values 获取到表单元素值。
8. 在 handleSubmit 中，完成登录逻辑。 

`代码：`

```js
export default withFormik({
  // 1. 提供表单的状态数据；2. 当前表单的input的name属性值一一对应
  mapPropsToValues: () => ({ username: '', password: '' }),
  // 处理表单提交
  handleSubmit: async (values, formikBag) => {
    const { username, password } = values
    const res = await axios.post(`http://localhost:8080/user/login`, {
      username,
      password
    })
    // console.log(res)
    const { status, body, description } = res.data
    if (status === 200) {
      window.localStorage.setItem('token', body.token)
      Toast.success(description, 2)
      formikBag.props.history.push('/')
    } else {
      Toast.fail(description)
    }
  }
})(Login)
```



#### 05-登录-表单验证-formik-两种验证方式-介绍

`目的`: formik提供了多种验证的方式

`解决方案：`

1. [validate](https://jaredpalmer.com/formik/docs/api/withFormik#validate-values-values-props-props--formikerrorsvalues--promiseany) =》 手动验证方式
2. 推荐：[`validationSchema`](https://jaredpalmer.com/formik/docs/api/withFormik#validationschema-schema--props-props--schema)和[yup](https://github.com/jquense/yup) =》 配置方式 (使用独立的yup包完成表单验证)



#### 06-登录-表单验证-formik&yup-完成验证

`目的：` 使用`validationSchema`和`yup`完成表单验证

`步骤：`

1. 安装：`npm i yup` ，导入 [Yup](https://github.com/jquense/yup#usage)
2. 在 withFormik 中添加配置项 [validationSchema](https://jaredpalmer.com/formik/docs/api/withformik)，使用 Yup 添加表单校验规则
3. 在 Login 组件中，通过 props 获取到 **errors**（错误信息）
4. 在表单元素中通过errors对象获取对应的表单校验错误信息 
5. 根据有无错误=》控制错误提示的显示和隐藏

`代码：`

```js
// Login class组件
...
render() {
    const {
      values,
      // touched,
      errors,
      handleChange,
      handleSubmit } = this.props;
    // console.log(touched, errors)
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {errors.username && <div className={styles.error}>{errors.username}</div>}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {errors.password && <div className={styles.error}>{errors.password}</div>}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// 使用高阶组件处理Login
export default withFormik({
  // 提供表单的状态数据和当前表单的input的name属性值一一对应
  mapPropsToValues: () => ({ username: 'test2', password: 'test2' }),
  // 验证表单
  validationSchema: yup.object().shape({
    username: yup.string().required('账号为必填项！').matches(REG_UNAME, '账号长度为5到8位，只能出现数字、字母、下划线'),
    password: yup.string().required('密码为必填项！').matches(REG_PWD, '密码长度为5到12位，只能出现数字、字母、下划线'),
  }),
  // 处理表单提交
  // handleSubmit: (values: Values, formikBag: FormikBag) => void | Promise<any>
  handleSubmit: async (values, formikBag) => {
    console.log(formikBag)
    const { username, password } = values;
    console.log(username, password)
    let data = {
      username,
      password
    }
    let res = await login(data);
    console.log(res)
    if (res.status === 200) {
      setLocalData(TOKEN, res.data.token);
      formikBag.props.history.push('/')
    } else {
      Toast.offline(res.description)
    }
  },
})(Login)
```



#### 07-总结

