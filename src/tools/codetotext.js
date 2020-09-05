
import { CodeToText } from 'element-china-area-data'
function codeToText (item) {
  let val = item.split(',')
  return CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]]
}
export default codeToText
