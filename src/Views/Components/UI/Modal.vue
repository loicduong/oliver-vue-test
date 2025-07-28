<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          @click="handleClose"
        ></div>

        <!-- Modal content -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
            @click.stop
          >
            <!-- Header -->
            <div v-if="$slots['header'] || title" class="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 v-if="title" class="text-lg font-medium text-gray-900">
                {{ title }}
              </h3>
              <slot name="header" />
              <button
                v-if="showCloseButton"
                @click="handleClose"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="p-6">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots['footer']" class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { UIModalProps, UIModalEmits } from '@/types'

withDefaults(defineProps<UIModalProps>(), {
  modelValue: false,
  title: '',
  showCloseButton: true
})

const emit = defineEmits<UIModalEmits>()

const handleClose = (): void => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
