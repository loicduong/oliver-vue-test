<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-semibold text-gray-900">Home</h1>
    </div>
    <nav class="flex space-x-4">
      <RouterLink to="/orders" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Orders</RouterLink>
      <RouterLink to="/orders" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Products</RouterLink>
      <RouterLink to="/orders" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Customers</RouterLink>
      <RouterLink to="/orders" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Analytics</RouterLink>
    </nav>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <button class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-md">
          <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar">
          <span class="text-sm font-medium">John Doe</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Desktop header part component
</script>
