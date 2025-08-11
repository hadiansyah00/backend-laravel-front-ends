document.addEventListener('alpine:init', () => {
    Alpine.data('carousel', () => ({
        currentIndex: 0,
        itemWidth: 0,
        totalItems: 0,

        init() {
            this.$nextTick(() => {
                const item = this.$refs.slider.querySelector('.carousel-item');
                if (item) {
                    this.itemWidth = item.offsetWidth + 24; // Include gap
                }
                this.totalItems = this.$refs.slider.querySelectorAll('.carousel-item').length;
            });
        },

        scrollLeft() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.$refs.slider.scrollTo({
                    left: this.currentIndex * this.itemWidth,
                    behavior: 'smooth'
                });
            }
        },

        scrollRight() {
            if (this.currentIndex < this.totalItems - 1) {
                this.currentIndex++;
                this.$refs.slider.scrollTo({
                    left: this.currentIndex * this.itemWidth,
                    behavior: 'smooth'
                });
            }
        },

        goToSlide(index) {
            this.currentIndex = index;
            this.$refs.slider.scrollTo({
                left: index * this.itemWidth,
                behavior: 'smooth'
            });
        }
    }));
});
