export type Step = 'amount' | 'account' | 'confirm' | 'success'

export type BankAccount = {
  id: string
  bankName: string
  accountType: string
  maskedNumber: string
  iban: string
  isDefault: boolean
}