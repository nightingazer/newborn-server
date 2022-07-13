export const printDelimiter = (delimiterSymbol: string = '=', newLines: number = 1) => {
  console.log(Array(process.stdout.columns).fill(delimiterSymbol).join(''))
  console.log(Array(newLines).fill('\n').join(''))
}
