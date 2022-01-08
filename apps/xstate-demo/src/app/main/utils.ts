export const toNumber = (value: string) => Number(value)

export const isStringifiedNumber = (value: string | null) =>  (value && !Number.isNaN(toNumber(value)))

export function validate(value: string | null) {
  return new Promise((resolve, reject) => {
    console.log(`validating ${value}`)
    console.log(isStringifiedNumber(value))
    return isStringifiedNumber(value) ? resolve(true) : reject();
    //setTimeout(() => {
//      return isNumber(value) ? resolve(true) : reject();
    //}, 1000);
  });
}

// export function submit(values) {
//   console.log("Submitting", values);
//
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return Math.random() < 0.4 || values.one === "error"
//         ? reject()
//         : resolve();
//     }, 1000);
//   });
// }


