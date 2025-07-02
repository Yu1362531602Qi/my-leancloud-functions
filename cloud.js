// Force redeploy
const AV = require('leanengine');
const qiniu = require('qiniu');

// 定义一个名为 getQiniuToken 的云函数
AV.Cloud.define('getQiniuToken', (request) => {
  // 再次确认：这里的 key 和 bucket name 都需要替换成您自己的
  const accessKey = 'XxGFSB8qQunIio0qJWEi6F_I61DfPYnnkh7KCFWD';
  const secretKey = 'Zi0BZozrvz4kmJo2DaIkbuVchq2BYCqDsuSxldbh';
  const bucket = 'mychatapp-avatars'; // 例如 'mychatapp-avatars'

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
    expires: 3600, // token 有效期 1 小时
  };
  const putPolicy = new qiniu.spec.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  
  return { token: uploadToken };
});
