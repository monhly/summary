function loader(sources) {
  let str = `
    let style=document.createElement('style');
    style.innerHTML=${JSON.stringify(sources)};
    document.head.appendChild(style)

    `
  return str
}
module.exports = loader
