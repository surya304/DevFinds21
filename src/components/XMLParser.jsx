


const parseXML = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const nodes = Array.from(xmlDoc.documentElement.children);

  return nodes.map((node) => {
    const name = node.nodeName;
    const attributes = Array.from(node.attributes).map((attr) => attr.name);
    const children = Array.from(node.children).map((child) => child.outerHTML);

    return {
      name,
      attributes,
      children,
    };
  });
};

export { parseXML };