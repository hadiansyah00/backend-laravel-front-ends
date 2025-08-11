<x-app-layout>
    <x-slot name="header">
        {{-- Changing the header text color for dark mode --}}
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Edit User: ') . $user->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {{-- Changing the card's background color --}}
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                {{-- Changing the default text color inside the card --}}
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{-- The included 'users.form' is already dark-mode ready --}}
                    @include('users.form', ['user' => $user, 'roles' => $roles])
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
