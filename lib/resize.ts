export function handleResize({ fabricRef }: { fabricRef: React.MutableRefObject<any> }) {
  if (fabricRef.current) {
    fabricRef.current.setWidth(window.innerWidth);
    fabricRef.current.setHeight(window.innerHeight);
    fabricRef.current.renderAll();
  }
}
