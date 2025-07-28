// Common interfaces for the entire project

export interface TableColumn {
  title: string
  width: string
}

export interface TableConfig {
  headers: boolean
  fixedHeaderWithScrollableBody: boolean
  responsiveHorizontalScroll: boolean
  columns: TableColumn[]
  rowGap: string
  colGap: string
  mobileBreakPoint: string
}

export interface SelectOption {
  value: string | number
  label: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonType = 'button' | 'submit' | 'reset'

// Form component interfaces
export interface InputProps {
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  id?: string
}

export interface FormSelectProps {
  modelValue: string | number
  label?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  error?: string
  id?: string
}

export interface UIButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  type?: ButtonType
}

export interface UIModalProps {
  modelValue: boolean
  title?: string
  showCloseButton?: boolean
}

// Emit interfaces
export interface InputEmits {
  'update:modelValue': [value: string]
}

export interface FormSelectEmits {
  'update:modelValue': [value: string]
}

export interface UIButtonEmits {
  click: [event: MouseEvent]
}

export interface UIModalEmits {
  'update:modelValue': [value: boolean]
}
