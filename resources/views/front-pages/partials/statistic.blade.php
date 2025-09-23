<section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {{-- <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">
            Statistik Kampus
        </h2> --}}

        <div x-data="{ stats: @js($statistic) }" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <template x-for="stat in stats" :key="stat.id">
                <div class="bg-white shadow rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
                    x-data="{ count: 0 }" x-init="
                        let target = parseInt(stat.value);
                        let step = Math.ceil(target / 100);
                        let interval = setInterval(() => {
                            if(count < target){
                                count += step;
                            } else {
                                count = target;
                                clearInterval(interval);
                            }
                        }, 30);
                     ">
                    <!-- Icon -->
                    <div class="w-12 h-12 flex items-center justify-center rounded-full bg-white mb-4 shadow">
                        <i :class="stat.icon" class="text-orange-600 text-2xl"></i>
                    </div>

                    <!-- Animated Value -->
                    <div class="text-3xl font-bold text-orange-600" x-text="count"></div>

                    <!-- Title -->
                    <div class="text-gray-500 mt-1" x-text="stat.title"></div>
                </div>
            </template>
        </div>
    </div>
</section>