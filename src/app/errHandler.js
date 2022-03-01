module.exports = (err, ctx) => {
  let status = 200
  switch (err.code) {
    case 10001:
      status = 400
      break;
    case 10002:
      status = 408
      break;
    case 10003:
    case 10004:
      status = 403
      break;
    case 10005:
      status = 401
      break;
    case 10006:
      status = 500
      break;
    default:
      status = 200
      break;
  }
  ctx.status = 200 // status
  ctx.body = err
}