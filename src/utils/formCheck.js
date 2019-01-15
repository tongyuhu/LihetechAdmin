export let checkPass = (rule, value, callback) => {
  let patrn = /\w{6,17}$/
  if(!value){
    callback(new Error('请输入密码'));
    // console.log('exec',value,patrn.exec(value))
  }else{
    console.log('exec',value,patrn.exec(value))
    if (patrn.exec(value) === null) {
      callback(new Error('请输入6~18位密码,可包含数字、字母、下划线'));
    }else{
      callback();
    }
  }
}
export let checkUserName = (rule, value, callback) => {
  let patrn = /\w{6,17}$/
  if(!value){
    callback(new Error('不能为空'));
    // console.log('exec',value,patrn.exec(value))
  }else{
    // console.log('exec',value,patrn.exec(value))
    if (patrn.exec(value) === null) {
      callback(new Error('请输入6~18位字符,可包含数字、字母、下划线'));
    }else{
      callback();
    }
  }
}
export let checkPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话'));
  } else {
    let patrn = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
    if (patrn.exec(value) === null) {
      callback(new Error('请输入正确的电话'));
    }else{
      callback();
    }
  }
}
export let checkEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱'));
  } else {
    let patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (patrn.exec(value) === null) {
      callback(new Error('请输入正确的邮箱'));
    }else{
      callback();
    }
  }
}
export let checkName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('不能为空'));
  } else {
      callback();
  }
}
export let checkNumber = (rule, value, callback) => {
  if (!value) {
    callback(new Error('不能为空'));
  } else {
    // let patrn = /^\d{n}$/
    callback();
    // if (patrn.exec(value) === null) {
    //   callback(new Error('请输入数字'));
    // }else{
    // }
  }
}
