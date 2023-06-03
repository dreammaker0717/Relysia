export default function getImage(value) {
  return require(`./${value}`)
}
