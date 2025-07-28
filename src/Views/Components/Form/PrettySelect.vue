<template>
  <div class="form-select-container">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
      :class="{ 'border-red-500': error }"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FormSelectProps, FormSelectEmits } from '@/types'

withDefaults(defineProps<FormSelectProps>(), {
  modelValue: '',
  label: '',
  placeholder: 'Select an option',
  options: () => [],
  disabled: false,
  error: '',
  id: ''
})

const emit = defineEmits<FormSelectEmits>()

const handleChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
