/**
 * Created by leibo on 17/11/6.
 */
function toZear(num) {
  return num<10?'0'+num:''+num;
}
export const getDateName = function(obj,format) {
  return obj.getFullYear()
    + format + toZear((obj.getMonth() + 1))
    + format+ toZear(obj.getDate())
}
