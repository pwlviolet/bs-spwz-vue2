function jsonRes(err, msg, data) {
  return {
    err,
    msg,
    data
  }
}

module.exports = jsonRes
