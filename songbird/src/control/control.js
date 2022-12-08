class Control {
  node
  constructor(
    parentNode,
    tagName = 'div',
    className = '',
    content = '',
    attribute = '',
    type = ''
  ) {
    const el = document.createElement(tagName)
    el.className = className
    el.innerHTML = content
    if (parentNode) {
      parentNode.append(el)
    }
    if (attribute) {
      el.setAttribute(attribute, type)
    }
    this.node = el
  }

  destroy() {
    this.node.remove()
  }
  setOnClick(onclick) {
    this.node.onclick = onclick
  }

}

export default Control
