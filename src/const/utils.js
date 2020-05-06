export const objToArr = function(obj) {
  return Object.keys(obj).reduce((cur, key) => {
    cur.push({
      value: obj[key],
      label: obj[key]
    })
    return cur
  }, [])
}
