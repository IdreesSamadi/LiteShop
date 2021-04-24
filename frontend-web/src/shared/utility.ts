export const updateObject = (oldObj: any, newObj: any) => {
  return {
    ...oldObj,
    ...newObj
  }
}
