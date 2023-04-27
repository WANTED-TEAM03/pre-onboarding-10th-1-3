const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>, handler: () => void) => {
  if (
    e.currentTarget.value.length !== 0 &&
    e.key === 'Enter' &&
    !e.shiftKey &&
    e.nativeEvent.isComposing === false
  ) {
    e.preventDefault();
    handler();
  }
};

export default onKeydown;
