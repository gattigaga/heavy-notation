export const getCursorPosition = () => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).cloneRange();

    if (range.getClientRects) {
      range.collapse(true);

      const rect = range.getClientRects()[0];

      if (rect) {
        return {
          x: rect.left,
          y: rect.top,
        };
      }
    }
  }

  return null;
};
