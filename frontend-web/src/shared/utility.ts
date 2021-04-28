export const updateObject = (oldObj: any, newObj: any) => {
  return {
    ...oldObj,
    ...newObj
  }
}

export const addDecimals = (num: number): string => {
  return (Math.round(num * 1000) / 1000).toFixed(2)
}
